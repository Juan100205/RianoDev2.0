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

// Repos curados manualmente — solo estos se muestran públicamente
export const CURATED_REPOS = [
  "Juan100205/RianoDev2.0",
  "Juan100205/Cataly_ai",
  "ArcovXr/ArcovXr",
  "Juan100205/WhatsappDashboard",
  "Juan100205/Metodo-Levantate",
  "Juan100205/Oveja-Music-World",
  "Juan100205/Sistema-de-Gestion-Residencial",
  "Juan100205/Callejas-App",
];

export function useGitHubRepos(_username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const headers = { Accept: "application/vnd.github+json" };

    Promise.all(
      CURATED_REPOS.map((slug) =>
        fetch(`https://api.github.com/repos/${slug}`, { headers })
          .then((r) => (r.ok ? (r.json() as Promise<GitHubRepo>) : null))
          .catch(() => null)
      )
    )
      .then((results) => {
        const all = results.filter((r): r is GitHubRepo => r !== null);

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
  }, []);

  return { repos, loading, error };
}
