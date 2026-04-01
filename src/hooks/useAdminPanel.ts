import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { GitHubRepo } from "./useGitHubRepos";
import { CURATED_REPOS, LIVE_URL_OVERRIDES } from "./useGitHubRepos";

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

export interface AiWorkflow {
  id: string;
  name: string;
  description: string | null;
  type: string;
  status: string;
  n8n_webhook_url: string | null;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowAccessEntry {
  user_id: string;
  workflow_id: string;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAdminPanel(enabled = false) {
  const [repos, setRepos] = useState<DbRepo[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [access, setAccess] = useState<AccessEntry[]>([]);
  const [workflows, setWorkflows] = useState<AiWorkflow[]>([]);
  const [workflowAccess, setWorkflowAccess] = useState<WorkflowAccessEntry[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load repos, users, access, workflows and workflow access from Supabase
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [reposRes, usersRes, accessRes, workflowsRes, wfAccessRes] = await Promise.all([
        supabase.from("github_repos").select("*").order("stars", { ascending: false }),
        supabase.from("profiles").select("*").order("created_at", { ascending: true }),
        supabase.from("user_repo_access").select("user_id, repo_id"),
        supabase.from("ai_workflows").select("*").order("created_at", { ascending: true }),
        supabase.from("user_workflow_access").select("user_id, workflow_id"),
      ]);

      if (reposRes.error) throw reposRes.error;
      if (usersRes.error) throw usersRes.error;
      if (accessRes.error) throw accessRes.error;
      if (workflowsRes.error) throw workflowsRes.error;
      if (wfAccessRes.error) throw wfAccessRes.error;

      setRepos((reposRes.data as DbRepo[]) ?? []);
      setUsers((usersRes.data as Profile[]) ?? []);
      setAccess((accessRes.data as AccessEntry[]) ?? []);
      setWorkflows((workflowsRes.data as AiWorkflow[]) ?? []);
      setWorkflowAccess((wfAccessRes.data as WorkflowAccessEntry[]) ?? []);
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

  // Sync curated repos from GitHub API → Supabase
  const syncFromGitHub = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const headers = { Accept: "application/vnd.github+json" };
      const results = await Promise.all(
        CURATED_REPOS.map((slug) =>
          fetch(`https://api.github.com/repos/${slug}`, { headers })
            .then((r) => (r.ok ? (r.json() as Promise<GitHubRepo>) : null))
            .catch(() => null)
        )
      );

      const rows = results
        .filter((r): r is GitHubRepo => r !== null)
        .map((r) => ({
          id: r.id,
          name: r.name,
          full_name: r.name,
          description: r.description,
          html_url: r.html_url,
          homepage: LIVE_URL_OVERRIDES[r.name] || r.homepage || null,
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

  // Grant a user access to a workflow
  const grantWorkflowAccess = useCallback(
    async (userId: string, workflowId: string) => {
      const { error } = await supabase
        .from("user_workflow_access")
        .insert({ user_id: userId, workflow_id: workflowId });
      if (error && error.code !== "23505") {
        setError(error.message);
        return;
      }
      setWorkflowAccess((prev) => [...prev, { user_id: userId, workflow_id: workflowId }]);
    },
    []
  );

  // Revoke a user's access to a workflow
  const revokeWorkflowAccess = useCallback(
    async (userId: string, workflowId: string) => {
      const { error } = await supabase
        .from("user_workflow_access")
        .delete()
        .match({ user_id: userId, workflow_id: workflowId });
      if (error) {
        setError(error.message);
        return;
      }
      setWorkflowAccess((prev) =>
        prev.filter((a) => !(a.user_id === userId && a.workflow_id === workflowId))
      );
    },
    []
  );

  // Convenience: set of workflowIds for a given userId
  const workflowsForUser = useCallback(
    (userId: string): Set<string> =>
      new Set(
        workflowAccess
          .filter((a) => a.user_id === userId)
          .map((a) => a.workflow_id)
      ),
    [workflowAccess]
  );

  // Update a workflow's fields (e.g. name)
  const updateWorkflow = useCallback(
    async (id: string, data: Partial<Omit<AiWorkflow, 'id' | 'created_at'>>) => {
      console.log('[updateWorkflow] updating', id, data);
      const { error } = await supabase
        .from("ai_workflows")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) {
        console.error('[updateWorkflow] error:', error);
        setError(error.message);
        throw new Error(error.message);
      }
      console.log('[updateWorkflow] success');
      setWorkflows((prev) =>
        prev.map((wf) => (wf.id === id ? { ...wf, ...data } : wf))
      );
    },
    []
  );

  return {
    repos,
    users,
    access,
    workflows,
    workflowAccess,
    loading,
    syncing,
    error,
    syncFromGitHub,
    grantAccess,
    revokeAccess,
    reposForUser,
    grantWorkflowAccess,
    revokeWorkflowAccess,
    workflowsForUser,
    updateWorkflow,
    reload: load,
  };
}
