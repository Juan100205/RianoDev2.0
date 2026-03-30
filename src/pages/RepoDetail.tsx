import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { DbRepo } from "../hooks/useAdminPanel";
import {
  ArrowLeftIcon,
  CodeBracketIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Rust: "#dea584", Go: "#00ADD8", CSS: "#563d7c", HTML: "#e34c26",
  Shell: "#89e051", Vue: "#41b883", "C++": "#f34b7d",
};

// Repos that have a dedicated internal route instead of an external deploy
const INTERNAL_ROUTES: Record<string, string> = {
  "Metodo-Levantate": "/metodo-levantate",
  "RianoDev2.0": "/",
};

// Repos that are desktop/Electron apps — can't run in browser
const DESKTOP_APPS = new Set(["Sistema-de-Gestion-Residencial"]);

type ViewTab = "live" | "readme";

interface Props {
  languageState: boolean;
}

const RepoDetail = ({ languageState }: Props) => {
  const { repoName } = useParams<{ repoName: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const l = languageState;

  const [repo, setRepo] = useState<DbRepo | null>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ViewTab>("live");
  const [iframeError, setIframeError] = useState(false);

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

        try {
          const res = await fetch(
            `https://api.github.com/repos/Juan100205/${repoName}/readme`,
            { headers: { Accept: "application/vnd.github.raw+json" } }
          );
          if (res.ok) setReadme(await res.text());
        } catch { /* non-fatal */ }
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
        <div className="w-6 h-6 border-2 border-[#10dffd]/20 border-t-[#10dffd] rounded-full animate-spin" />
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

  // Validate live URL — skip github.io URLs
  const liveUrl = (() => {
    if (internalRoute) return null; // handled separately
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

          {/* Tabs */}
          {!isDesktopApp && (
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
              {hasLive && (
                <button
                  onClick={() => setActiveTab("live")}
                  className={`flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-full transition-all ${
                    activeTab === "live"
                      ? "bg-[#10dffd] text-black font-medium"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <GlobeAltIcon className="w-3 h-3" />
                  {l ? "Live" : "En vivo"}
                </button>
              )}
              <button
                onClick={() => setActiveTab("readme")}
                className={`flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-full transition-all ${
                  activeTab === "readme"
                    ? "bg-[#10dffd] text-black font-medium"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <DocumentTextIcon className="w-3 h-3" />
                README
              </button>
            </div>
          )}

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
                    <span key={t} className="text-xs text-[#10dffd]/70 border border-[#10dffd]/20 bg-[#10dffd]/5 rounded-full px-3 py-1">{t}</span>
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
              {readme && (
                <div className="mt-12 prose prose-invert prose-sm max-w-none prose-headings:font-light prose-p:text-gray-400 prose-code:text-[#10dffd]/80 prose-code:bg-[#10dffd]/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-[#10dffd] prose-li:text-gray-400 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
                  <ReactMarkdown>{readme}</ReactMarkdown>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* ── LIVE TAB ── */}
        {!isDesktopApp && activeTab === "live" && hasLive && (
          <motion.div
            key="live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {internalRoute ? (
              // Internal route — show a full-page link button
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
              // External URL — iframe
              iframeError ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                  <p className="text-gray-500 text-sm text-center max-w-sm">
                    {l
                      ? "This site can't be embedded. Open it directly:"
                      : "Este sitio no permite ser embebido. Ábrelo directamente:"}
                  </p>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase text-black bg-[#10dffd] px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                    {l ? "Open in new tab" : "Abrir en nueva pestaña"}
                  </a>
                </div>
              ) : (
                <iframe
                  src={liveUrl}
                  className="flex-1 w-full border-0"
                  style={{ minHeight: "calc(100vh - 57px)" }}
                  title={repo.name}
                  onError={() => setIframeError(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              )
            ) : null}
          </motion.div>
        )}

        {/* ── LIVE TAB — no live URL yet ── */}
        {!isDesktopApp && activeTab === "live" && !hasLive && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <GlobeAltIcon className="w-8 h-8 text-white/10" />
            <p className="text-gray-500 text-sm text-center max-w-sm">
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

        {/* ── README TAB ── */}
        {!isDesktopApp && activeTab === "readme" && (
          <motion.div
            key="readme"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-6 py-10 w-full"
          >
            {/* Repo meta */}
            <div className="mb-8">
              <h1 className="text-3xl font-light mb-2">{repo.name.replace(/-/g, " ")}</h1>
              {repo.description && <p className="text-gray-400 text-base leading-relaxed max-w-2xl">{repo.description}</p>}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {langColor && repo.language && (
                  <span className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: langColor }} />
                    {repo.language}
                  </span>
                )}
                {stars > 0 && (
                  <span className="flex items-center gap-1.5 text-sm text-gray-400">
                    <StarIcon className="w-3.5 h-3.5 text-[#10dffd]/50" />
                    {stars}
                  </span>
                )}
              </div>
              {topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {topics.map((t) => (
                    <span key={t} className="text-xs text-[#10dffd]/70 border border-[#10dffd]/20 bg-[#10dffd]/5 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              )}
            </div>

            {readme ? (
              <div className="border border-white/5 rounded-2xl p-8 prose prose-invert prose-sm max-w-none
                prose-headings:font-light prose-headings:tracking-tight prose-headings:text-white
                prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-sm
                prose-a:text-[#10dffd] prose-a:no-underline hover:prose-a:underline prose-a:font-normal
                prose-strong:text-white prose-strong:font-medium
                prose-code:text-[#10dffd]/90 prose-code:bg-[#10dffd]/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/8 prose-pre:rounded-xl prose-pre:text-xs prose-pre:overflow-x-auto
                prose-li:text-gray-400 prose-li:text-sm prose-li:marker:text-[#10dffd]/40
                prose-ul:space-y-1 prose-ol:space-y-1
                prose-hr:border-white/8
                prose-blockquote:border-l-[#10dffd]/30 prose-blockquote:text-gray-500 prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
                prose-th:text-[#10dffd]/70 prose-th:font-normal prose-th:text-xs prose-th:tracking-widest prose-th:uppercase
                prose-td:text-gray-400 prose-td:border-white/8">
                <ReactMarkdown>{readme}</ReactMarkdown>
              </div>
            ) : (
              <div className="border border-white/5 rounded-2xl p-16 text-center">
                <DocumentTextIcon className="w-8 h-8 text-white/10 mx-auto mb-4" />
                <p className="text-gray-600 text-sm">
                  {l ? "No README available." : "Sin README disponible."}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RepoDetail;
