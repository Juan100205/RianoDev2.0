import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { GitHubRepo } from "./useGitHubRepos";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DbRepo {
  id: number;
  name: string;
  full_name: string | null;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  github_updated_at: string | null;
  synced_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface AccessEntry {
  user_id: string;
  repo_id: number;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAdminPanel(enabled = false) {
  const [repos, setRepos] = useState<DbRepo[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [access, setAccess] = useState<AccessEntry[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load repos, users and access from Supabase
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [reposRes, usersRes, accessRes] = await Promise.all([
        supabase.from("github_repos").select("*").order("stars", { ascending: false }),
        supabase.from("profiles").select("*").order("created_at", { ascending: true }),
        supabase.from("user_repo_access").select("user_id, repo_id"),
      ]);

      if (reposRes.error) throw reposRes.error;
      if (usersRes.error) throw usersRes.error;
      if (accessRes.error) throw accessRes.error;

      setRepos((reposRes.data as DbRepo[]) ?? []);
      setUsers((usersRes.data as Profile[]) ?? []);
      setAccess((accessRes.data as AccessEntry[]) ?? []);
    } catch (e: any) {
      setError(e.message ?? "Error loading admin data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) load();
    else setLoading(false);
  }, [load, enabled]);

  // Sync all public repos from GitHub API → Supabase
  const syncFromGitHub = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.github.com/users/Juan100205/repos?sort=updated&per_page=100"
      );
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data: GitHubRepo[] = await res.json();

      const rows = data
        .filter((r) => !r.fork)
        .map((r) => ({
          id: r.id,
          name: r.name,
          full_name: r.name,
          description: r.description,
          html_url: r.html_url,
          homepage: r.homepage || null,
          language: r.language,
          topics: r.topics ?? [],
          stars: r.stargazers_count,
          github_updated_at: r.updated_at,
          synced_at: new Date().toISOString(),
        }));

      const { error } = await supabase
        .from("github_repos")
        .upsert(rows, { onConflict: "id" });

      if (error) throw error;
      await load();
    } catch (e: any) {
      setError(e.message ?? "Sync failed");
    } finally {
      setSyncing(false);
    }
  }, [load]);

  // Grant a user access to a repo
  const grantAccess = useCallback(
    async (userId: string, repoId: number) => {
      const { error } = await supabase
        .from("user_repo_access")
        .insert({ user_id: userId, repo_id: repoId });
      if (error && error.code !== "23505") {
        // 23505 = unique violation (already exists) → ignore
        setError(error.message);
        return;
      }
      setAccess((prev) => [...prev, { user_id: userId, repo_id: repoId }]);
    },
    []
  );

  // Revoke a user's access to a repo
  const revokeAccess = useCallback(
    async (userId: string, repoId: number) => {
      const { error } = await supabase
        .from("user_repo_access")
        .delete()
        .match({ user_id: userId, repo_id: repoId });
      if (error) {
        setError(error.message);
        return;
      }
      setAccess((prev) =>
        prev.filter((a) => !(a.user_id === userId && a.repo_id === repoId))
      );
    },
    []
  );

  // Convenience: set of repoIds for a given userId
  const reposForUser = useCallback(
    (userId: string): Set<number> =>
      new Set(access.filter((a) => a.user_id === userId).map((a) => a.repo_id)),
    [access]
  );

  return {
    repos,
    users,
    access,
    loading,
    syncing,
    error,
    syncFromGitHub,
    grantAccess,
    revokeAccess,
    reposForUser,
    reload: load,
  };
}
