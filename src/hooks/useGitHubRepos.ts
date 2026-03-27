import { useState, useEffect } from "react";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

// Repos in OTHER orgs/users that should also be shown
const EXTRA_REPOS = ["ArcovXr/ArcovXr", "vykymoon/Connect"];

export function useGitHubRepos(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const headers = { Accept: "application/vnd.github+json" };

    const fetchOwn = fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    ).then((r) => {
      if (!r.ok) throw new Error(`GitHub API ${r.status}`);
      return r.json() as Promise<GitHubRepo[]>;
    });

    const fetchExtras = Promise.all(
      EXTRA_REPOS.map((slug) =>
        fetch(`https://api.github.com/repos/${slug}`, { headers })
          .then((r) => (r.ok ? (r.json() as Promise<GitHubRepo>) : null))
          .catch(() => null)
      )
    );

    Promise.all([fetchOwn, fetchExtras])
      .then(([own, extras]) => {
        const seen = new Set<number>();
        const all: GitHubRepo[] = [];

        for (const r of own) {
          seen.add(r.id);
          all.push(r);
        }
        for (const r of extras) {
          if (r && !seen.has(r.id)) {
            seen.add(r.id);
            all.push(r);
          }
        }

        // Sort: starred first, then by most recently updated
        all.sort((a, b) => {
          if (b.stargazers_count !== a.stargazers_count)
            return b.stargazers_count - a.stargazers_count;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        setRepos(all);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  return { repos, loading, error };
}
