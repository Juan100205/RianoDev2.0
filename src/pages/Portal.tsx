import type { RefObject } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  GlobeAltIcon,
  LinkIcon,
  BoltIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  ShieldExclamationIcon,
  PencilSquareIcon,
  PlusIcon,
  CodeBracketIcon,
  ArrowPathIcon as RefreshIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import IsotipoWhite from "../assets/IsotipoNoBgWhite.png";
import IsotipoBlack from "../assets/IsotipoNoBgBlack.png";
import Header from "../Components/Header";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

type Tab = "blog" | "flujos" | "paginas" | "dominios" | "automatizaciones" | "profile" | "settings" | "admin" | "blog-admin" | "proyectos";



const webPages = [
  { id: 1, domain: "rianodevz.net", status: "live", lastDeploy: "2026-03-01", score: 98, tech: "React + Vite", route: null as string | null },
  { id: 2, domain: "cataly.co", status: "live", lastDeploy: "2026-02-20", score: 95, tech: "Next.js", route: null as string | null },
  { id: 3, domain: "arcovxr.com", status: "live", lastDeploy: "2026-01-15", score: 92, tech: "React", route: null as string | null },
  { id: 4, domain: "conjuntocallejas.co", status: "maintenance", lastDeploy: "2026-03-10", score: 88, tech: "WordPress", route: null as string | null },
  { id: 5, domain: "Método Levántate", status: "live", lastDeploy: "2026-03-26", score: 100, tech: "React + Vite", route: "/metodo-levantate" },
];

const domainsList = [
  { id: 1, domain: "rianodevz.net", registrar: "Namecheap", expires: "2027-03-01", ssl: true, autoRenew: true },
  { id: 2, domain: "cataly.co", registrar: "GoDaddy", expires: "2027-01-10", ssl: true, autoRenew: false },
  { id: 3, domain: "arcovxr.com", registrar: "Namecheap", expires: "2026-11-22", ssl: true, autoRenew: true },
  { id: 4, domain: "conjuntocallejas.co", registrar: "Porkbun", expires: "2026-08-05", ssl: true, autoRenew: true },
];

const automations = [
  {
    id: 1,
    name: { en: "Lead capture bot", es: "Bot de captura de leads" },
    trigger: "WhatsApp",
    status: "active",
    lastRun: { en: "2 min ago", es: "hace 2 min" },
  },
  {
    id: 2,
    name: { en: "CRM sync", es: "Sincronización CRM" },
    trigger: "Scheduled",
    status: "active",
    lastRun: { en: "1 hour ago", es: "hace 1 hora" },
  },
  {
    id: 3,
    name: { en: "Weekly report", es: "Reporte semanal" },
    trigger: "Weekly",
    status: "paused",
    lastRun: { en: "3 days ago", es: "hace 3 días" },
  },
  {
    id: 4,
    name: { en: "Email follow-up", es: "Seguimiento por email" },
    trigger: "Form submit",
    status: "active",
    lastRun: { en: "34 min ago", es: "hace 34 min" },
  },
];

// ── Status badge ─────────────────────────────────────────────────────────────

const statusMap: Record<string, { en: string; es: string; cls: string }> = {
  published: { en: "Published", es: "Publicado", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  draft: { en: "Draft", es: "Borrador", cls: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
  active: { en: "Active", es: "Activo", cls: "text-[#10dffd] bg-[#10dffd]/10 border-[#10dffd]/20" },
  paused: { en: "Paused", es: "Pausado", cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  live: { en: "Live", es: "En línea", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  maintenance: { en: "Maintenance", es: "Mantenimiento", cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
};

import { useAuth } from "../context/AuthContext";
import Auth from "../Components/Auth";
import { useAdminPanel } from "../hooks/useAdminPanel";
import { useUserRepos } from "../hooks/useUserRepos";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { useWorkflows, type AiWorkflow } from "../hooks/useWorkflows";
import WorkflowDashboard from "../Components/WorkflowDashboard";

const StatusBadge = ({ status, l }: { status: string; l: boolean }) => {
  const s = statusMap[status] ?? statusMap.draft;
  return (
    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border ${s.cls}`}>
      {l ? s.en : s.es}
    </span>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const Portal = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("flujos");
  const l = languageState;

  const sidebarStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };
  const sidebarItem: Variants = {
    hidden: { opacity: 0, x: -14 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };
  const tabFade: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
  };
  const contentStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const contentItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10dffd]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
        <div ref={scrollRef} className="page_scroll scrollbar_exp flex items-center justify-center py-20 bg-black">
          <Auth />
        </div>
      </>
    );
  }
  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Cliente";
  const userEmail = user.email || "";
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(",") || [];
  const isAdmin = adminEmails.includes(userEmail);

  // ── Admin panel state (only fetches when isAdmin) ─────────────────────────
  const adminPanel = useAdminPanel(isAdmin);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // ── User repos: admin sees all from GitHub API, clients see Supabase-assigned ──
  const githubRepos = useGitHubRepos("Juan100205");
  const userRepos = useUserRepos(isAdmin ? null : user.id);

  // ── AI Workflows ──────────────────────────────────────────────────────────
  const workflows = useWorkflows(isAdmin);
  const [selectedWorkflow, setSelectedWorkflow] = useState<AiWorkflow | null>(null);

  // ── Add workflow modal state ───────────────────────────────────────────────
  const [showAddWorkflow, setShowAddWorkflow] = useState(false);
  const [newWfName, setNewWfName] = useState('');
  const [newWfType, setNewWfType] = useState<AiWorkflow['type']>('conversational');
  const [newWfDesc, setNewWfDesc] = useState('');
  const [newWfWebhook, setNewWfWebhook] = useState('');
  const [savingWf, setSavingWf] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      // ── Flujos de IA ───────────────────────────────────────────────────────
      case "flujos": {
        const totalInteractions = workflows.workflows.reduce((acc, _wf) => acc, 0);
        const activeCount = workflows.workflows.filter((wf) => wf.status === "active").length;

        const handleAddWorkflow = async () => {
          if (!newWfName.trim()) return;
          setSavingWf(true);
          try {
            await workflows.createWorkflow({
              name: newWfName.trim(),
              description: newWfDesc.trim() || null,
              type: newWfType,
              status: "active",
              n8n_webhook_url: newWfWebhook.trim() || null,
            });
            setNewWfName('');
            setNewWfDesc('');
            setNewWfWebhook('');
            setNewWfType('conversational');
            setShowAddWorkflow(false);
          } catch {
            // silent
          } finally {
            setSavingWf(false);
          }
        };

        const TYPE_MAP: Record<string, { en: string; es: string }> = {
          conversational: { en: "Conversational", es: "Conversacional" },
          classification: { en: "Classification", es: "Clasificación" },
          generation: { en: "Generation", es: "Generación" },
          voice: { en: "Voice", es: "Voz" },
        };

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">
                {l ? "AI Flows" : "Flujos de IA"}
              </h2>
              {isAdmin && (
                <motion.button
                  onClick={() => setShowAddWorkflow((v) => !v)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 text-[10px] tracking-widest uppercase bg-[#10dffd] text-black px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <PlusIcon className="w-3 h-3" />
                  {l ? "Add flow" : "Agregar flujo"}
                </motion.button>
              )}
            </div>

            {/* Add workflow form */}
            {showAddWorkflow && isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#10dffd]/20 rounded-xl p-5 mb-6 bg-[#10dffd]/[0.02]"
              >
                <div className="text-[10px] text-[#10dffd] tracking-widest uppercase mb-4">
                  {l ? "New AI Flow" : "Nuevo Flujo de IA"}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={newWfName}
                    onChange={(e) => setNewWfName(e.target.value)}
                    placeholder={l ? "Flow name" : "Nombre del flujo"}
                    className="border border-[#10dffd]/15 bg-transparent text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/40 placeholder-gray-600"
                  />
                  <select
                    value={newWfType}
                    onChange={(e) => setNewWfType(e.target.value as AiWorkflow['type'])}
                    className="border border-[#10dffd]/15 bg-black text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/40"
                  >
                    <option value="conversational">{l ? "Conversational" : "Conversacional"}</option>
                    <option value="classification">{l ? "Classification" : "Clasificación"}</option>
                    <option value="generation">{l ? "Generation" : "Generación"}</option>
                    <option value="voice">{l ? "Voice" : "Voz"}</option>
                  </select>
                  <input
                    value={newWfDesc}
                    onChange={(e) => setNewWfDesc(e.target.value)}
                    placeholder={l ? "Description (optional)" : "Descripción (opcional)"}
                    className="border border-[#10dffd]/15 bg-transparent text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/40 placeholder-gray-600 md:col-span-2"
                  />
                  <input
                    value={newWfWebhook}
                    onChange={(e) => setNewWfWebhook(e.target.value)}
                    placeholder="n8n webhook URL (optional)"
                    className="border border-[#10dffd]/15 bg-transparent text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/40 placeholder-gray-600 md:col-span-2"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <motion.button
                    onClick={() => void handleAddWorkflow()}
                    disabled={savingWf || !newWfName.trim()}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#10dffd] text-black text-xs px-5 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
                  >
                    {savingWf ? (l ? "Saving..." : "Guardando...") : (l ? "Create" : "Crear")}
                  </motion.button>
                  <button
                    onClick={() => setShowAddWorkflow(false)}
                    className="border border-[#10dffd]/15 text-gray-400 text-xs px-4 py-2 rounded-lg hover:border-[#10dffd]/30 transition-colors cursor-pointer"
                  >
                    {l ? "Cancel" : "Cancelar"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
              variants={contentStagger}
              initial="hidden"
              animate="show"
            >
              {[
                { label: { en: "Total flows", es: "Flujos totales" }, value: String(workflows.workflows.length) },
                { label: { en: "Active", es: "Activos" }, value: String(activeCount) },
                { label: { en: "Total interactions", es: "Interacciones totales" }, value: String(totalInteractions) },
              ].map((stat) => (
                <motion.div
                  key={stat.label.en}
                  variants={contentItem}
                  className="border border-[#10dffd]/15 rounded-xl p-4 bg-[#10dffd]/[0.02]"
                >
                  <div className="text-[#10dffd] text-xl font-light">{stat.value}</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    {l ? stat.label.en : stat.label.es}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Loading */}
            {workflows.loading && (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10dffd]" />
              </div>
            )}

            {/* Error */}
            {workflows.error && (
              <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs mb-4">
                {workflows.error}
              </div>
            )}

            {/* Empty state */}
            {!workflows.loading && workflows.workflows.length === 0 && (
              <div className="border border-[#10dffd]/10 rounded-2xl p-10 text-center">
                <CpuChipIcon className="w-8 h-8 text-[#10dffd]/30 mx-auto mb-3" />
                <p className="text-gray-500 text-sm font-light">
                  {l
                    ? "No flows yet. Click + to add one."
                    : "No hay flujos. Haz clic en + para agregar."}
                </p>
              </div>
            )}

            {/* Flow cards */}
            {!workflows.loading && workflows.workflows.length > 0 && (
              <motion.div
                className="grid md:grid-cols-2 gap-4"
                variants={contentStagger}
                initial="hidden"
                animate="show"
              >
                {workflows.workflows.map((wf) => (
                  <motion.div
                    key={wf.id}
                    variants={contentItem}
                    onClick={() => setSelectedWorkflow(wf)}
                    className="border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-xl p-5 bg-[#10dffd]/[0.01] cursor-pointer"
                    whileHover={{ borderColor: "rgba(16,223,253,0.3)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white text-sm font-light">{wf.name}</div>
                        <div className="text-gray-500 text-[11px] mt-0.5">
                          {l
                            ? (TYPE_MAP[wf.type]?.en ?? wf.type)
                            : (TYPE_MAP[wf.type]?.es ?? wf.type)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={wf.status} l={l} />
                        {isAdmin && (
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              void workflows.updateWorkflow(wf.id, {
                                status: wf.status === "active" ? "paused" : "active",
                              });
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-600 hover:text-[#10dffd] transition-colors cursor-pointer"
                            title={wf.status === "active" ? (l ? "Pause" : "Pausar") : (l ? "Activate" : "Activar")}
                          >
                            <PencilSquareIcon className="w-3.5 h-3.5" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                    {wf.description && (
                      <p className="text-gray-600 text-[11px] mb-3 leading-relaxed">{wf.description}</p>
                    )}
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-[#10dffd]/10">
                      <span className="text-[#10dffd] text-xs">
                        {l ? "Open dashboard →" : "Ver dashboard →"}
                      </span>
                      <span className="text-gray-600 text-[10px]">
                        {new Date(wf.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        );
      }

      // ── Páginas Web ────────────────────────────────────────────────────────
      case "paginas":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">
                {l ? "Web Pages" : "Páginas Web"}
              </h2>
            </div>

            <motion.div
              className="flex flex-col gap-4"
              variants={contentStagger}
              initial="hidden"
              animate="show"
            >
              {webPages.map((page) => (
                <motion.div
                  key={page.id}
                  variants={contentItem}
                  onClick={() => page.route ? navigate(page.route) : undefined}
                  className={`border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-xl p-5 bg-[#10dffd]/[0.01] ${page.route ? "cursor-pointer" : ""}`}
                  whileHover={{ borderColor: "rgba(16,223,253,0.3)", x: page.route ? 2 : 0 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#10dffd]/10 flex items-center justify-center flex-shrink-0">
                        <GlobeAltIcon className="w-4 h-4 text-[#10dffd]" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-light">{page.domain}</div>
                        <div className="text-gray-500 text-[11px]">{page.tech}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={page.status} l={l} />
                      {page.route && (
                        <span className="text-[#10dffd] text-xs opacity-60">→</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#10dffd]/10">
                    <div>
                      <div className="text-gray-600 text-[10px] mb-0.5">
                        {l ? "Last deploy" : "Último deploy"}
                      </div>
                      <div className="text-gray-400 text-xs">{page.lastDeploy}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-[10px] mb-0.5">
                        {l ? "Performance score" : "Score de rendimiento"}
                      </div>
                      <div
                        className={`text-xs font-light ${
                          page.score >= 95
                            ? "text-emerald-400"
                            : page.score >= 90
                            ? "text-[#10dffd]"
                            : "text-amber-400"
                        }`}
                      >
                        {page.score} / 100
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );

      // ── Dominios ───────────────────────────────────────────────────────────
      case "dominios":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">
                {l ? "Domains" : "Dominios"}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#10dffd]/10 text-left">
                    {[
                      { en: "Domain", es: "Dominio" },
                      { en: "Registrar", es: "Registrador" },
                      { en: "Expires", es: "Vence" },
                      { en: "SSL", es: "SSL" },
                      { en: "Auto-renew", es: "Auto-renovación" },
                    ].map((col) => (
                      <th
                        key={col.en}
                        className="pb-3 pr-8 text-[10px] text-[#10dffd] tracking-widest uppercase font-normal"
                      >
                        {l ? col.en : col.es}
                      </th>
                    ))}
                  </tr>
                </thead>
                <motion.tbody
                  variants={contentStagger}
                  initial="hidden"
                  animate="show"
                >
                  {domainsList.map((d) => (
                    <motion.tr
                      key={d.id}
                      variants={contentItem}
                      className="border-b border-[#10dffd]/5 hover:bg-[#10dffd]/[0.02] transition-colors"
                    >
                      <td className="py-4 pr-8 text-white font-light">{d.domain}</td>
                      <td className="py-4 pr-8 text-gray-400 text-xs">{d.registrar}</td>
                      <td className="py-4 pr-8 text-gray-400 text-xs">{d.expires}</td>
                      <td className="py-4 pr-8">
                        {d.ssl ? (
                          <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-4">
                        {d.autoRenew ? (
                          <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowPathIcon className="w-4 h-4 text-gray-600" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </div>
        );

      // ── Automatizaciones ───────────────────────────────────────────────────
      case "automatizaciones":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">
                {l ? "Automations" : "Automatizaciones"}
              </h2>
            </div>

            <motion.div
              className="flex flex-col gap-3"
              variants={contentStagger}
              initial="hidden"
              animate="show"
            >
              {automations.map((auto) => (
                <motion.div
                  key={auto.id}
                  variants={contentItem}
                  className="border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-xl p-5 flex items-center justify-between gap-4 bg-[#10dffd]/[0.01]"
                  whileHover={{ borderColor: "rgba(16,223,253,0.3)", x: 2 }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        auto.status === "active" ? "bg-[#10dffd]" : "bg-gray-600"
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="text-white text-sm font-light truncate">
                        {l ? auto.name.en : auto.name.es}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-gray-500 text-[11px]">{auto.trigger}</span>
                        <span className="text-gray-600 text-[11px]">
                          {l ? auto.lastRun.en : auto.lastRun.es}
                        </span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={auto.status} l={l} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        );

      // ── Profile ────────────────────────────────────────────────────────────
      case "profile": {
        const initials = displayName.slice(0, 2).toUpperCase();
        return (
          <div className="max-w-lg">
            <h2 className="text-white text-xl font-light mb-8">{l ? "Profile" : "Perfil"}</h2>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#10dffd]/15 border border-[#10dffd]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[#10dffd] text-xl font-light">{initials}</span>
              </div>
              <div>
                <div className="text-white text-sm font-light">{displayName}</div>
                <div className="text-gray-500 text-xs mt-0.5">{userEmail}</div>
              </div>
            </div>

            <motion.div
              className="flex flex-col gap-4"
              variants={contentStagger}
              initial="hidden"
              animate="show"
            >
              {[
                { label: { en: "Display name", es: "Nombre" }, value: displayName, type: "text" },
                { label: { en: "Email", es: "Correo electrónico" }, value: userEmail, type: "email" },
                { label: { en: "Company", es: "Empresa" }, value: "", type: "text" },
                { label: { en: "Phone", es: "Teléfono" }, value: "", type: "tel" },
              ].map((field) => (
                <motion.div key={field.label.en} variants={contentItem} className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-500">{l ? field.label.en : field.label.es}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="border border-[#10dffd]/15 rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none focus:border-[#10dffd] transition-colors"
                  />
                </motion.div>
              ))}

              <motion.button
                variants={contentItem}
                className="mt-2 bg-[#10dffd] text-black text-xs px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer w-fit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {l ? "Save changes" : "Guardar cambios"}
              </motion.button>
            </motion.div>
          </div>
        );
      }

      // ── Settings ───────────────────────────────────────────────────────────
      case "settings":
        return (
          <div className="max-w-lg">
            <h2 className="text-white text-xl font-light mb-8">{l ? "Settings" : "Configuración"}</h2>

            {/* Notifications */}
            <section className="mb-8">
              <span className="text-[10px] text-[#10dffd] tracking-[0.25em] uppercase block mb-4">
                {l ? "Notifications" : "Notificaciones"}
              </span>
              <div className="flex flex-col gap-3">
                {[
                  { label: { en: "Email notifications", es: "Notificaciones por email" }, defaultOn: true },
                  { label: { en: "WhatsApp alerts", es: "Alertas por WhatsApp" }, defaultOn: false },
                  { label: { en: "Weekly summary", es: "Resumen semanal" }, defaultOn: true },
                ].map((item) => (
                  <div key={item.label.en} className="flex items-center justify-between border border-[#10dffd]/10 rounded-xl px-5 py-3">
                    <span className="text-gray-300 text-sm font-light">{l ? item.label.en : item.label.es}</span>
                    <div className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${item.defaultOn ? "bg-[#10dffd]/30" : "bg-white/10"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all ${item.defaultOn ? "left-[18px]" : "left-[3px]"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Security */}
            <section className="mb-8">
              <span className="text-[10px] text-[#10dffd] tracking-[0.25em] uppercase block mb-4">
                {l ? "Security" : "Seguridad"}
              </span>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between border border-[#10dffd]/10 hover:border-[#10dffd]/30 rounded-xl px-5 py-3 transition-colors cursor-pointer w-full text-left">
                  <span className="text-gray-300 text-sm font-light">{l ? "Change password" : "Cambiar contraseña"}</span>
                  <span className="text-[#10dffd] text-xs">{l ? "Update →" : "Actualizar →"}</span>
                </button>
                <button className="flex items-center justify-between border border-[#10dffd]/10 hover:border-[#10dffd]/30 rounded-xl px-5 py-3 transition-colors cursor-pointer w-full text-left">
                  <span className="text-gray-300 text-sm font-light">{l ? "Two-factor authentication" : "Autenticación en dos pasos"}</span>
                  <span className="text-gray-600 text-xs">{l ? "Not enabled" : "No activado"}</span>
                </button>
              </div>
            </section>

            {/* Account */}
            <section>
              <span className="text-[10px] text-[#10dffd] tracking-[0.25em] uppercase block mb-4">
                {l ? "Account" : "Cuenta"}
              </span>
              <button className="flex items-center justify-between border border-red-500/15 hover:border-red-500/35 rounded-xl px-5 py-3 transition-colors cursor-pointer w-full text-left">
                <span className="text-red-400 text-sm font-light">{l ? "Delete account" : "Eliminar cuenta"}</span>
                <span className="text-red-500/50 text-xs">→</span>
              </button>
            </section>
          </div>
        );

      // ── Blog Admin ─────────────────────────────────────────────────────────
      case "blog-admin":
        return (
          <div className="max-w-2xl">
            <h2 className="text-white text-xl font-light mb-2">{l ? "Write Article" : "Nuevo Artículo para el Blog"}</h2>
            <p className="text-gray-400 text-sm mb-8">{l ? "Submit a new article to be published." : "Redacta un nuevo artículo y envíalo para publicación."}</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert(l ? "Article saved locally. Supabase connection will be configured soon." : "Artículo guardado localmente. La conexión a Supabase 'posts' se configurará pronto."); }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#10dffd] tracking-widest uppercase">{l ? "Title" : "Título"}</label>
                <input required type="text" placeholder={l ? "E.g. The future of AI" : "Ej. El futuro de la IA"} className="border border-[#10dffd]/15 bg-black text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#10dffd] transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#10dffd] tracking-widest uppercase">{l ? "Category" : "Categoría"}</label>
                <select required className="border border-[#10dffd]/15 bg-black text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#10dffd] transition-colors appearance-none">
                  <option value="AI">AI</option>
                  <option value="Automation">Automation</option>
                  <option value="Data">Data</option>
                  <option value="Web">Web</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#10dffd] tracking-widest uppercase">{l ? "Content (Markdown)" : "Contenido (Markdown)"}</label>
                <textarea required rows={8} placeholder={l ? "Write your post in Markdown..." : "Escribe tu artículo usando formato Markdown..."} className="border border-[#10dffd]/15 bg-black text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#10dffd] transition-colors resize-y"></textarea>
              </div>
              <button type="submit" className="mt-4 bg-[#10dffd] text-black px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-medium w-fit flex items-center gap-2 cursor-pointer">
                <PlusIcon className="w-4 h-4" />
                {l ? "Publish Article" : "Publicar Artículo"}
              </button>
            </form>
          </div>
        );

      // ── Proyectos ──────────────────────────────────────────────────────────
      case "proyectos": {
        // Admin → live from GitHub API. Client → Supabase-assigned repos.
        const activeRepos  = isAdmin ? githubRepos.repos  : userRepos.repos;
        const activeLoading = isAdmin ? githubRepos.loading : userRepos.loading;
        const activeError   = isAdmin ? githubRepos.error   : null;

        const LANG_COLORS: Record<string, string> = {
          TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
          Java: "#b07219", CSS: "#563d7c", HTML: "#e34c26", "C#": "#178600",
          Go: "#00ADD8", Rust: "#dea584",
        };

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white text-xl font-light">
                  {l ? "Projects" : "Proyectos"}
                </h2>
                {isAdmin && (
                  <p className="text-gray-600 text-xs mt-1">
                    {l ? "All GitHub repositories — Juan100205" : "Todos los repositorios GitHub — Juan100205"}
                  </p>
                )}
              </div>
              {!activeLoading && (
                <span className="text-[#10dffd]/50 text-xs">
                  {activeRepos.length} repos
                </span>
              )}
            </div>

            {activeError && (
              <div className="mb-4 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">
                {activeError}
              </div>
            )}

            {activeLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10dffd]" />
              </div>
            )}

            {!activeLoading && activeRepos.length === 0 && (
              <div className="border border-[#10dffd]/10 rounded-2xl p-10 text-center">
                <CodeBracketIcon className="w-8 h-8 text-[#10dffd]/30 mx-auto mb-3" />
                <p className="text-gray-500 text-sm font-light">
                  {isAdmin
                    ? (l ? "Could not load GitHub repositories." : "No se pudieron cargar los repositorios de GitHub.")
                    : (l ? "No projects assigned yet. Contact your account manager." : "Aún no tienes proyectos asignados. Contacta a tu gestor de cuenta.")}
                </p>
              </div>
            )}

            {!activeLoading && activeRepos.length > 0 && (
              <motion.div
                className="grid md:grid-cols-2 gap-4"
                variants={contentStagger}
                initial="hidden"
                animate="show"
              >
                {activeRepos.map((repo) => {
                  // GitHubRepo has stargazers_count, DbRepo has stars
                  const stars = "stargazers_count" in repo
                    ? (repo as any).stargazers_count
                    : (repo as any).stars ?? 0;
                  const htmlUrl = "html_url" in repo ? (repo as any).html_url : "#";
                  const homepage = "homepage" in repo ? (repo as any).homepage : null;
                  const language = "language" in repo ? (repo as any).language : null;
                  const topics: string[] = "topics" in repo ? ((repo as any).topics ?? []) : [];
                  const repoName: string = (repo as any).name ?? "";

                  return (
                    <motion.div
                      key={(repo as any).id}
                      variants={contentItem}
                      whileHover={{ borderColor: "rgba(16,223,253,0.35)" }}
                      className="border border-[#10dffd]/10 rounded-xl p-5 flex flex-col gap-3 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white text-sm font-light leading-snug">
                          {repoName.replace(/-/g, " ")}
                        </h3>
                        {stars > 0 && (
                          <span className="text-[#10dffd]/50 text-xs shrink-0">★ {stars}</span>
                        )}
                      </div>

                      {(repo as any).description && (
                        <p className="text-gray-500 text-xs leading-relaxed flex-1">
                          {(repo as any).description}
                        </p>
                      )}

                      {topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {topics.slice(0, 4).map((t: string) => (
                            <span key={t} className="text-[10px] text-[#10dffd]/60 border border-[#10dffd]/15 rounded-full px-2 py-0.5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                        {language ? (
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[language] ?? "#8b949e" }} />
                            {language}
                          </span>
                        ) : <span />}

                        <div className="flex gap-2">
                          <a
                            href={htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] tracking-widest uppercase text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1 rounded-full transition-all"
                          >
                            GitHub
                          </a>
                          {homepage && (
                            <a
                              href={homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
                            >
                              {l ? "Live" : "Ver"}
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        );
      }

      // ── Admin Panel ────────────────────────────────────────────────────────
      case "admin":
        if (!isAdmin) return null;
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">{l ? "Admin Dashboard" : "Panel de Administración"}</h2>
            </div>

            {adminPanel.error && (
              <div className="mb-4 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">
                {adminPanel.error}
              </div>
            )}

            {/* ── GitHub Repos ── */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-[#10dffd] tracking-[0.25em] uppercase">
                  {l ? "GitHub Repositories" : "Repositorios GitHub"}
                  {adminPanel.repos.length > 0 && (
                    <span className="ml-2 text-gray-600">({adminPanel.repos.length})</span>
                  )}
                </span>
                <motion.button
                  onClick={adminPanel.syncFromGitHub}
                  disabled={adminPanel.syncing}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 text-[10px] tracking-widest uppercase bg-[#10dffd] text-black px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  <RefreshIcon className={`w-3 h-3 ${adminPanel.syncing ? "animate-spin" : ""}`} />
                  {adminPanel.syncing
                    ? (l ? "Syncing…" : "Sincronizando…")
                    : (l ? "Sync GitHub" : "Sincronizar GitHub")}
                </motion.button>
              </div>

              {adminPanel.loading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10dffd]" />
                </div>
              ) : adminPanel.repos.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">
                  {l ? "No repos synced yet. Click 'Sync GitHub'." : "Sin repositorios. Haz clic en 'Sincronizar GitHub'."}
                </p>
              ) : (
                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto scrollbar_exp pr-1">
                  {adminPanel.repos.map((repo) => (
                    <div key={repo.id} className="flex items-center justify-between border border-[#10dffd]/10 rounded-xl px-4 py-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <CodeBracketIcon className="w-3.5 h-3.5 text-[#10dffd]/50 flex-shrink-0" />
                        <span className="text-white text-xs font-light truncate">{repo.name}</span>
                        {repo.language && (
                          <span className="text-gray-600 text-[10px] hidden sm:block">{repo.language}</span>
                        )}
                      </div>
                      {repo.stars > 0 && (
                        <span className="text-gray-600 text-[10px] ml-3 shrink-0">★ {repo.stars}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ── Users + Access management ── */}
            <section>
              <span className="text-[10px] text-[#10dffd] tracking-[0.25em] uppercase block mb-4">
                {l ? "Users & Access" : "Usuarios y Accesos"}
              </span>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Users list */}
                <div className="border border-[#10dffd]/15 rounded-2xl p-4 flex flex-col gap-2 max-h-96 overflow-y-auto scrollbar_exp">
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">
                    {l ? "Select user" : "Selecciona usuario"}
                  </p>
                  {adminPanel.users.filter((u) => !u.is_admin).map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedUserId(selectedUserId === u.id ? null : u.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        selectedUserId === u.id
                          ? "bg-[#10dffd]/10 border-[#10dffd]/30 text-[#10dffd]"
                          : "border-transparent hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <UserCircleIcon className="w-5 h-5 flex-shrink-0 opacity-50" />
                      <div className="min-w-0">
                        <div className="text-xs font-light truncate">{u.full_name || u.email}</div>
                        {u.full_name && (
                          <div className="text-[10px] text-gray-600 truncate">{u.email}</div>
                        )}
                      </div>
                      <span className="ml-auto text-[10px] text-gray-600 shrink-0">
                        {adminPanel.reposForUser(u.id).size} repos
                      </span>
                    </button>
                  ))}
                  {adminPanel.users.filter((u) => !u.is_admin).length === 0 && !adminPanel.loading && (
                    <p className="text-gray-600 text-xs text-center py-4">
                      {l ? "No users registered yet." : "Sin usuarios registrados aún."}
                    </p>
                  )}
                </div>

                {/* Repos access toggles for selected user */}
                <div className="border border-[#10dffd]/15 rounded-2xl p-4 flex flex-col gap-2 max-h-96 overflow-y-auto scrollbar_exp">
                  {!selectedUserId ? (
                    <div className="flex items-center justify-center h-full py-10 text-center">
                      <p className="text-gray-600 text-xs">
                        {l ? "← Select a user to manage their access" : "← Selecciona un usuario para gestionar sus accesos"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                          {l ? "Repo access" : "Acceso a repos"}
                        </p>
                        <button
                          onClick={() => setSelectedUserId(null)}
                          className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {adminPanel.repos.length === 0 && (
                        <p className="text-gray-600 text-xs text-center py-4">
                          {l ? "Sync repos first." : "Sincroniza repos primero."}
                        </p>
                      )}
                      {adminPanel.repos.map((repo) => {
                        const hasAccess = adminPanel.reposForUser(selectedUserId).has(repo.id);
                        return (
                          <div key={repo.id} className="flex items-center justify-between border border-[#10dffd]/8 rounded-xl px-3 py-2">
                            <span className="text-xs text-gray-300 font-light truncate mr-2">{repo.name}</span>
                            <button
                              onClick={() =>
                                hasAccess
                                  ? adminPanel.revokeAccess(selectedUserId, repo.id)
                                  : adminPanel.grantAccess(selectedUserId, repo.id)
                              }
                              className={`shrink-0 w-9 h-5 rounded-full relative cursor-pointer transition-colors ${
                                hasAccess ? "bg-[#10dffd]/40" : "bg-white/10"
                              }`}
                            >
                              <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all ${hasAccess ? "left-[18px]" : "left-[3px]"}`} />
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  // ── Tabs configuration ───────────────────────────────────────────────────

  const mainTabs = [
    { id: "flujos" as Tab, icon: CpuChipIcon, label: { en: "AI Flows", es: "Flujos de IA" } },
    { id: "paginas" as Tab, icon: GlobeAltIcon, label: { en: "Web Pages", es: "Páginas Web" } },
    { id: "proyectos" as Tab, icon: CodeBracketIcon, label: { en: "Projects", es: "Proyectos" } },
    { id: "dominios" as Tab, icon: LinkIcon, label: { en: "Domains", es: "Dominios" } },
    { id: "automatizaciones" as Tab, icon: BoltIcon, label: { en: "Automations", es: "Automatizaciones" } },
    { id: "blog-admin" as Tab, icon: PencilSquareIcon, label: { en: "Write Article", es: "Aportar al Blog" } },
  ];

  if (isAdmin) {
    mainTabs.push({ id: "admin" as Tab, icon: ShieldExclamationIcon, label: { en: "Admin", es: "Admin" } });
  }

  const accountTabs = [
    { id: "profile" as Tab, icon: UserCircleIcon, label: { en: "Profile", es: "Perfil" } },
    { id: "settings" as Tab, icon: Cog6ToothIcon, label: { en: "Settings", es: "Configuración" } },
  ];

  const allTabs = [...mainTabs, ...accountTabs];

  const SidebarBtn = ({ tab }: { tab: typeof mainTabs[0] }) => {
    const Icon = tab.icon;
    const active = activeTab === tab.id;
    return (
      <motion.button
        variants={sidebarItem}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-light transition-all text-left w-full cursor-pointer border ${
          active
            ? "bg-[#10dffd]/10 text-[#10dffd] border-[#10dffd]/20"
            : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border-transparent"
        }`}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        {l ? tab.label.en : tab.label.es}
      </motion.button>
    );
  };

  return (
    <>
    {selectedWorkflow && (
      <WorkflowDashboard
        workflow={selectedWorkflow}
        onClose={() => setSelectedWorkflow(null)}
        languageState={l}
        isAdmin={isAdmin}
        getCredentials={workflows.getCredentials}
        saveCredential={workflows.saveCredential}
        deleteCredential={workflows.deleteCredential}
      />
    )}
    <div className="flex flex-col bg-black" style={{ height: "100vh", overflow: "hidden" }}>

      {/* Dashboard top bar */}
      <motion.header
        className="flex items-center justify-between px-5 py-3 border-b border-[#10dffd]/15 flex-shrink-0"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <div className="flex items-center gap-3">
          <img src={IsotipoWhite} alt="RIANODEVZ" className="h-8 w-8 object-contain hidden dark:block" />
          <img src={IsotipoBlack} alt="RIANODEVZ" className="h-8 w-8 object-contain dark:hidden" />
          <span className="text-[10px] text-[#10dffd]/60 tracking-[0.2em] uppercase hidden sm:block">
            {l ? "Client Portal" : "Portal de Clientes"}
          </span>
        </div>
        <motion.button
          onClick={() => signOut()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-gray-500 hover:text-gray-300 transition-all cursor-pointer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
          <span className="text-xs font-light hidden sm:block">{l ? "Log out" : "Salir"}</span>
        </motion.button>
      </motion.header>

      <div
        ref={scrollRef}
        className="flex flex-1 overflow-hidden"
      >
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-[#10dffd]/15 flex-shrink-0">
          <motion.nav
            className="flex flex-col gap-1 p-2 flex-1"
            variants={sidebarStagger}
            initial="hidden"
            animate="show"
          >
            {mainTabs.map((tab) => <SidebarBtn key={tab.id} tab={tab} />)}
          </motion.nav>
          <motion.div
            className="border-t border-[#10dffd]/10 p-2 flex flex-col gap-1"
            variants={sidebarStagger}
            initial="hidden"
            animate="show"
          >
            {accountTabs.map((tab) => <SidebarBtn key={tab.id} tab={tab} />)}
            <motion.button
              variants={sidebarItem}
              onClick={() => signOut()}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-light transition-all text-left w-full cursor-pointer border border-transparent text-red-400 hover:text-red-300 hover:bg-red-400/5 mt-auto"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowLeftStartOnRectangleIcon className="w-4 h-4 flex-shrink-0" />
              {l ? "Logout" : "Cerrar sesión"}
            </motion.button>
          </motion.div>
        </aside>

        {/* Right panel: mobile tab bar + content */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile horizontal tab bar */}
          <div className="md:hidden flex border-b border-[#10dffd]/15 overflow-x-auto scrollbar_exp flex-shrink-0">
            {allTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 text-[10px] uppercase tracking-widest border-b-2 transition-colors cursor-pointer ${
                    active
                      ? "border-[#10dffd] text-[#10dffd]"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {l ? tab.label.en : tab.label.es}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <main className="flex-1 overflow-y-auto scrollbar_exp">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabFade}
                initial="hidden"
                animate="show"
                exit="exit"
                className="p-6 md:p-10 max-w-4xl"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
    </>
  );
};

export default Portal;
