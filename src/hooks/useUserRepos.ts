import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { DbRepo } from "./useAdminPanel";

export function useUserRepos(userId: string | null) {
  const [repos, setRepos] = useState<DbRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setRepos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    supabase
      .from("user_repo_access")
      .select("repo_id, github_repos(*)")
      .eq("user_id", userId)
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          const mapped = (data ?? [])
            .map((row: any) => row.github_repos as DbRepo)
            .filter(Boolean)
            .sort((a: DbRepo, b: DbRepo) => b.stars - a.stars);
          setRepos(mapped);
        }
        setLoading(false);
      });
  }, [userId]);

  return { repos, loading, error };
}
