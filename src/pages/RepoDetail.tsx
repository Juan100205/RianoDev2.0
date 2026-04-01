import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { DbRepo } from "../hooks/useAdminPanel";
import { LIVE_URL_OVERRIDES } from "../hooks/useGitHubRepos";
import {
  ArrowLeftIcon,
  CodeBracketIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Rust: "#dea584", Go: "#00ADD8", CSS: "#563d7c", HTML: "#e34c26",
  Shell: "#89e051", Vue: "#41b883", "C++": "#f34b7d",
};

// Repos that have a dedicated internal route instead of an external deploy
const INTERNAL_ROUTES: Record<string, string> = {
  "RianoDev2.0": "/",
};

// Repos that are desktop/Electron apps — can't run in browser
const DESKTOP_APPS = new Set<string>([]);

interface Props {
  languageState: boolean;
}

const RepoDetail = ({ languageState }: Props) => {
  const { repoName } = useParams<{ repoName: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const l = languageState;

  const [repo, setRepo] = useState<DbRepo | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/portal"); return; }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: repoData, error: repoErr } = await supabase
          .from("github_repos")
          .select("*")
          .eq("name", repoName)
          .single();

        if (repoErr || !repoData) {
          setError(l ? "Project not found." : "Proyecto no encontrado.");
          setLoading(false);
          return;
        }
        setRepo(repoData as DbRepo);

        if (isAdmin) {
          setHasAccess(true);
        } else {
          const { data: accessData } = await supabase
            .from("user_repo_access")
            .select("repo_id")
            .eq("user_id", user.id)
            .eq("repo_id", repoData.id)
            .single();
          if (!accessData) {
            setError(l ? "You don't have access to this project." : "No tienes acceso a este proyecto.");
            setLoading(false);
            return;
          }
          setHasAccess(true);
        }
      } catch (e: any) {
        setError(e.message ?? "Error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [repoName, user, isAdmin, authLoading, navigate, l]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#10dffd]/38 border-t-[#10dffd] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !repo || !hasAccess) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">{error ?? (l ? "Project not found." : "Proyecto no encontrado.")}</p>
        <button
          onClick={() => navigate("/portal")}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#10dffd] hover:underline"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          {l ? "Back to portal" : "Volver al portal"}
        </button>
      </div>
    );
  }

  const stars = repo.stars ?? 0;
  const topics: string[] = repo.topics ?? [];
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#8b949e") : null;
  const isDesktopApp = DESKTOP_APPS.has(repoName ?? "");
  const internalRoute = INTERNAL_ROUTES[repoName ?? ""];

  // Validate live URL — overrides take priority, then homepage (skip github.io)
  const liveUrl = (() => {
    if (internalRoute) return null; // handled separately
    if (LIVE_URL_OVERRIDES[repoName ?? ""]) return LIVE_URL_OVERRIDES[repoName ?? ""];
    const h = repo.homepage;
    if (!h) return null;
    try {
      const url = new URL(h);
      if (url.hostname.endsWith("github.io")) return null;
      return h;
    } catch { return null; }
  })();

  const hasLive = !!internalRoute || !!liveUrl;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top nav */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-white/5 shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/portal")}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/40 hover:text-[#10dffd] transition-colors shrink-0"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            <span className="hidden sm:inline">{l ? "Back" : "Volver"}</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {repo.html_url && (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all"
              >
                <CodeBracketIcon className="w-3 h-3" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
                title={l ? "Open in new tab" : "Abrir en nueva pestaña"}
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-0">

        {/* ── DESKTOP APP INFO ── */}
        {isDesktopApp && (
          <div className="max-w-4xl mx-auto px-6 py-12 w-full">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-3 mb-8">
                <ComputerDesktopIcon className="w-8 h-8 text-[#10dffd]/40" />
                <div>
                  <h1 className="text-3xl font-light">{repo.name.replace(/-/g, " ")}</h1>
                  <p className="text-gray-500 text-sm mt-1">
                    {l ? "Desktop application — not available in browser" : "Aplicación de escritorio — no disponible en navegador"}
                  </p>
                </div>
              </div>
              {repo.description && (
                <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8">{repo.description}</p>
              )}
              {topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {topics.map((t) => (
                    <span key={t} className="text-xs text-[#10dffd]/70 border border-[#10dffd]/38 bg-[#10dffd]/5 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              )}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black bg-[#10dffd] px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                <CodeBracketIcon className="w-3.5 h-3.5" />
                {l ? "View on GitHub" : "Ver en GitHub"}
              </a>
            </motion.div>
          </div>
        )}

        {/* ── LIVE VIEW ── */}
        {!isDesktopApp && hasLive && (
          <motion.div
            key="live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {internalRoute ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
                <div className="text-center">
                  <h2 className="text-2xl font-light text-white mb-2">{repo.name.replace(/-/g, " ")}</h2>
                  {repo.description && <p className="text-gray-500 text-sm max-w-md">{repo.description}</p>}
                </div>
                <Link
                  to={internalRoute}
                  className="flex items-center gap-2 text-sm tracking-widest uppercase text-black bg-[#10dffd] px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <GlobeAltIcon className="w-4 h-4" />
                  {l ? "Open live page" : "Abrir página en vivo"}
                </Link>
              </div>
            ) : liveUrl ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
                <div className="text-center">
                  <GlobeAltIcon className="w-8 h-8 text-[#10dffd]/30 mx-auto mb-4" />
                  <h2 className="text-2xl font-light text-white mb-2">{repo.name.replace(/-/g, " ")}</h2>
                  {repo.description && <p className="text-gray-500 text-sm max-w-md mx-auto">{repo.description}</p>}
                  <p className="text-[#10dffd]/40 text-xs font-mono mt-3 tracking-tight">{liveUrl}</p>
                </div>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm tracking-widest uppercase text-black bg-[#10dffd] px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  {l ? "Open site" : "Abrir sitio"}
                </a>
              </div>
            ) : null}
          </motion.div>
        )}

        {/* ── NO LIVE URL ── */}
        {!isDesktopApp && !hasLive && (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
            <div className="text-center">
              <GlobeAltIcon className="w-8 h-8 text-white/10 mx-auto mb-4" />
              <h2 className="text-2xl font-light text-white mb-2">{repo.name.replace(/-/g, " ")}</h2>
              {repo.description && <p className="text-gray-500 text-sm max-w-md mx-auto">{repo.description}</p>}
            </div>
            {langColor && repo.language && (
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: langColor }} />
                {repo.language}
              </span>
            )}
            {stars > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <StarIcon className="w-3.5 h-3.5 text-[#10dffd]/50" />
                {stars}
              </span>
            )}
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {topics.map((t) => (
                  <span key={t} className="text-xs text-[#10dffd]/70 border border-[#10dffd]/38 bg-[#10dffd]/5 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            )}
            <p className="text-gray-600 text-sm text-center max-w-sm">
              {l
                ? "No live URL configured for this project yet."
                : "Aún no hay URL de live configurada para este proyecto."}
            </p>
            {isAdmin && (
              <p className="text-gray-600 text-xs text-center max-w-sm">
                {l
                  ? "Deploy the project and update the homepage field in Supabase → github_repos."
                  : "Deploya el proyecto y actualiza el campo homepage en Supabase → github_repos."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoDetail;
