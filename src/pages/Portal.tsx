import type { RefObject } from "react";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowPathIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  ShieldExclamationIcon,
  PencilSquareIcon,
  PlusIcon,
  CodeBracketIcon,
  XMarkIcon,
  BoltIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

const RefreshIcon = ArrowPathIcon;
import IsotipoWhite from "../assets/IsotipoNoBgWhite.png";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

type Tab = "automatizaciones" | "documentos" | "proyectos" | "profile" | "settings" | "admin" | "blog-admin";



import { useAuth } from "../context/AuthContext";
import Auth from "../Components/Auth";
import { useAdminPanel } from "../hooks/useAdminPanel";
import { useUserRepos } from "../hooks/useUserRepos";
import { useGitHubRepos, LIVE_URL_OVERRIDES } from "../hooks/useGitHubRepos";
import { useUserWorkflows } from "../hooks/useUserWorkflows";
import { useWorkflows, type AiWorkflow } from "../hooks/useWorkflows";
import WorkflowDashboard from "../Components/WorkflowDashboard";
import ClientDocPanel from "../Components/ClientDocPanel";
import ClientDocViewer from "../Components/ClientDocViewer";

// ── WorkflowNameRow ───────────────────────────────────────────────────────────

function WorkflowNameRow({
  wf,
  onSave,
}: {
  wf: { id: string; name: string; phone_number: string | null };
  onSave: (id: string, name: string) => Promise<void>;
}) {
  const [value, setValue] = useState(wf.name);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const isDirty = value.trim() !== wf.name;

  const handleSave = async () => {
    if (!value.trim()) return;
    setSaving(true);
    setErr(null);
    try {
      await onSave(wf.id, value.trim());
      setSaved(true);
      setTimeout(() => window.location.reload(), 800);
    } catch (e: any) {
      setErr(e.message ?? "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 border border-[#10dffd]/22 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          {wf.phone_number && (
            <p className="text-white/40 text-[10px] tracking-widest mb-1.5">
              {wf.phone_number}
            </p>
          )}
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setSaved(false); setErr(null); }}
            className="w-full bg-transparent border border-[#10dffd]/30 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#10dffd] transition-colors placeholder-neutral-700"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          className="shrink-0 text-[10px] px-3 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-[#10dffd]/10 border border-[#10dffd]/45 text-[#10dffd] hover:bg-[#10dffd]/20"
        >
          {saving ? "..." : saved ? "✓" : "Renombrar"}
        </button>
      </div>
      {err && <p className="text-red-400 text-[10px] pl-1">{err}</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const Portal = ({ languageState, setLanguageState, scrollRef }: Props) => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("automatizaciones");
  const l = languageState;

  // ── Admin panel state (only fetches when isAdmin) ─────────────────────────
  const adminPanel = useAdminPanel(isAdmin);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedDocClientId, setSelectedDocClientId] = useState<string | null>(null);

  // ── User repos: admin sees all from GitHub API, clients see Supabase-assigned ──
  const githubRepos = useGitHubRepos("Juan100205");
  const userRepos = useUserRepos(isAdmin ? null : (user?.id ?? null));

  // ── Workflows: admin sees all, clients see their assigned ones ─────────────
  const { workflows: allWorkflows, loading: allWfLoading, getCredentials, saveCredential, deleteCredential } = useWorkflows(isAdmin, user?.id ?? null);
  const userWorkflows = useUserWorkflows(isAdmin ? null : (user?.id ?? null));
  const [openWorkflow, setOpenWorkflow] = useState<AiWorkflow | null>(null);

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
        <div ref={scrollRef} className="page_scroll scrollbar_exp flex items-center justify-center py-20 bg-white dark:bg-black">
          <Auth />
        </div>
      </>
    );
  }
  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Cliente";

  const renderContent = () => {
    switch (activeTab) {
      // ── Profile ────────────────────────────────────────────────────────────
      case "profile": {
        const initials = displayName.slice(0, 2).toUpperCase();
        return (
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#10dffd]" />
              <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">{l ? "Account" : "Cuenta"}</span>
            </div>
            <h2 className="font-banner font-light text-white text-xl mb-8">{l ? "Profile" : "Perfil"}</h2>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#10dffd]/15 border border-[#10dffd]/50 flex items-center justify-center flex-shrink-0">
                <span className="text-[#10dffd] text-xl font-light">{initials}</span>
              </div>
              <div>
                <div className="text-white text-sm font-light">{displayName}</div>
                <div className="text-white/40 text-xs mt-0.5">{user.email}</div>
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
                { label: { en: "Email", es: "Correo electrónico" }, value: user.email || "", type: "email" },
                { label: { en: "Company", es: "Empresa" }, value: "", type: "text" },
                { label: { en: "Phone", es: "Teléfono" }, value: "", type: "tel" },
              ].map((field) => (
                <motion.div key={field.label.en} variants={contentItem} className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-[#10dffd]/60 tracking-[0.25em] uppercase font-display">{l ? field.label.en : field.label.es}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="bg-[#10dffd]/[0.02] hover:bg-[#10dffd]/[0.04] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </motion.div>
              ))}

              <motion.button
                variants={contentItem}
                className="mt-2 bg-[#10dffd] text-black text-xs px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer w-fit shadow-[0_0_20px_rgba(16,223,253,0.2)] font-display tracking-[0.2em] uppercase"
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#10dffd]" />
              <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">{l ? "Account" : "Cuenta"}</span>
            </div>
            <h2 className="font-banner font-light text-white text-xl mb-8">{l ? "Settings" : "Configuración"}</h2>

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
                  <div key={item.label.en} className="flex items-center justify-between border border-[#10dffd]/22 rounded-xl px-5 py-3">
                    <span className="text-white/50 text-sm font-light">{l ? item.label.en : item.label.es}</span>
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
                <button className="flex items-center justify-between border border-[#10dffd]/22 hover:border-[#10dffd]/50 rounded-xl px-5 py-3 transition-colors cursor-pointer w-full text-left">
                  <span className="text-white/50 text-sm font-light">{l ? "Change password" : "Cambiar contraseña"}</span>
                  <span className="text-[#10dffd] text-xs">{l ? "Update →" : "Actualizar →"}</span>
                </button>
                <button className="flex items-center justify-between border border-[#10dffd]/22 hover:border-[#10dffd]/50 rounded-xl px-5 py-3 transition-colors cursor-pointer w-full text-left">
                  <span className="text-white/50 text-sm font-light">{l ? "Two-factor authentication" : "Autenticación en dos pasos"}</span>
                  <span className="text-white/25 text-xs">{l ? "Not enabled" : "No activado"}</span>
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
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#10dffd]" />
              <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">{l ? "Knowledge base" : "Base de conocimiento"}</span>
            </div>
            <h2 className="font-banner font-light text-white text-xl mb-2">{l ? "Write Article" : "Nuevo Artículo para el Blog"}</h2>
            <p className="text-white/40 text-sm mb-8">{l ? "Submit a new article to be published." : "Redacta un nuevo artículo y envíalo para publicación."}</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert(l ? "Article saved locally. Supabase connection will be configured soon." : "Artículo guardado localmente. La conexión a Supabase 'posts' se configurará pronto."); }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#10dffd]/60 tracking-[0.25em] uppercase font-display">{l ? "Title" : "Título"}</label>
                <input required type="text" placeholder={l ? "E.g. The future of AI" : "Ej. El futuro de la IA"} className="bg-[#10dffd]/[0.02] hover:bg-[#10dffd]/[0.04] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#10dffd]/60 tracking-[0.25em] uppercase font-display">{l ? "Category" : "Categoría"}</label>
                <select required className="bg-[#10dffd]/[0.02] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 cursor-pointer appearance-none">
                  <option value="AI">AI</option>
                  <option value="Automation">Automation</option>
                  <option value="Data">Data</option>
                  <option value="Web">Web</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#10dffd]/60 tracking-[0.25em] uppercase font-display">{l ? "Content (Markdown)" : "Contenido (Markdown)"}</label>
                <textarea required rows={8} placeholder={l ? "Write your post in Markdown..." : "Escribe tu artículo usando formato Markdown..."} className="bg-[#10dffd]/[0.02] hover:bg-[#10dffd]/[0.04] border border-[#10dffd]/30 focus:border-[#10dffd]/70 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 resize-none"></textarea>
              </div>
              <button type="submit" className="mt-4 bg-[#10dffd] text-black px-7 py-3 rounded-full hover:opacity-90 transition-opacity font-display tracking-[0.2em] uppercase text-xs w-fit flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,223,253,0.2)]">
                <PlusIcon className="w-4 h-4" />
                {l ? "Publish Article" : "Publicar Artículo"}
              </button>
            </form>
          </div>
        );

      // ── Webs ───────────────────────────────────────────────────────────────
      // ── Automatizaciones ───────────────────────────────────────────────────
      case "automatizaciones": {
        const activeWorkflows = isAdmin ? allWorkflows : userWorkflows.workflows;
        const wfLoading = isAdmin ? allWfLoading : userWorkflows.loading;

        const STATUS_COLOR: Record<string, string> = {
          active: "text-[#10dffd] bg-[#10dffd]/10 border-[#10dffd]/38",
          paused: "text-amber-400 bg-amber-400/10 border-amber-400/20",
          error: "text-red-400 bg-red-400/10 border-red-400/20",
        };
        const TYPE_LABEL: Record<string, string> = {
          conversational: l ? "Conversational" : "Conversacional",
          classification: l ? "Classification" : "Clasificación",
          generation: l ? "Generation" : "Generación",
          voice: l ? "Voice" : "Voz",
        };

        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-px bg-[#10dffd]" />
                  <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">
                    {l ? "AI Systems" : "Sistemas IA"}
                  </span>
                </div>
                <h2 className="font-banner font-light text-white text-xl">
                  {l ? "Automations" : "Automatizaciones"}
                </h2>
              </div>
              {!wfLoading && activeWorkflows.length > 0 && (
                <span className="text-[#10dffd]/50 text-xs border border-[#10dffd]/30 rounded-full px-2.5 py-1">{activeWorkflows.length} flows</span>
              )}
            </div>

{wfLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10dffd]" />
              </div>
            )}

            {!wfLoading && activeWorkflows.length === 0 && (
              <div className="border border-[#10dffd]/22 rounded-2xl p-10 text-center">
                <BoltIcon className="w-8 h-8 text-[#10dffd]/30 mx-auto mb-3" />
                <p className="text-white/40 text-sm font-light">
                  {isAdmin
                    ? (l ? "No automations found." : "Sin automatizaciones.")
                    : (l ? "No automations assigned yet." : "Aún no tienes automatizaciones asignadas.")}
                </p>
              </div>
            )}

            {!wfLoading && activeWorkflows.length > 0 && (
              <motion.div
                className="grid md:grid-cols-2 gap-4"
                variants={contentStagger}
                initial="hidden"
                animate="show"
              >
                {activeWorkflows.map((wf) => (
                  <motion.button
                    key={wf.id}
                    variants={contentItem}
                    whileHover={{ borderColor: "rgba(16,223,253,0.65)", scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOpenWorkflow(wf)}
                    className="relative border border-[#10dffd]/30 rounded-xl p-5 flex flex-col gap-3 text-left cursor-pointer transition-colors w-full overflow-hidden"
                  >
                    <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#10dffd]/38 rounded-tl-xl pointer-events-none" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#10dffd]/38 rounded-br-xl pointer-events-none" />
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <BoltIcon className="w-4 h-4 text-[#10dffd] shrink-0" />
                        <span className="text-white text-sm font-light">{wf.name}</span>
                      </div>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full border shrink-0 ${STATUS_COLOR[wf.status] ?? "text-white/40 border-gray-400/20"}`}>
                        {wf.status}
                      </span>
                    </div>
                    {wf.description && (
                      <p className="text-white/40 text-xs leading-relaxed">{wf.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                      <span className="text-[10px] text-white/25 tracking-widest uppercase">
                        {TYPE_LABEL[wf.type] ?? wf.type}
                      </span>
                      <span className="text-[10px] text-[#10dffd]/50 tracking-widest uppercase">
                        {l ? "Open →" : "Abrir →"}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        );
      }

      // ── Documentos ─────────────────────────────────────────────────────────
      case "documentos": {
        // ── Admin view ──
        if (isAdmin) {
          const clients = adminPanel.users.filter((u) => !u.is_admin);
          const selectedClient = clients.find((u) => u.id === selectedDocClientId) ?? null;

          return (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-px bg-[#10dffd]" />
                    <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">
                      {l ? "Client files" : "Archivos cliente"}
                    </span>
                  </div>
                  <h2 className="font-banner font-light text-white text-xl">
                    {l ? "Documents" : "Documentos"}
                  </h2>
                </div>
                {selectedClient && (
                  <button
                    onClick={() => setSelectedDocClientId(null)}
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                    {l ? "All clients" : "Todos los clientes"}
                  </button>
                )}
              </div>

              {adminPanel.loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10dffd]" />
                </div>
              ) : !selectedClient ? (
                /* ── Client grid ── */
                clients.length === 0 ? (
                  <div className="border border-[#10dffd]/22 rounded-2xl p-10 text-center">
                    <UserCircleIcon className="w-8 h-8 text-[#10dffd]/30 mx-auto mb-3" />
                    <p className="text-white/40 text-sm font-light">
                      {l ? "No clients registered yet." : "Sin clientes registrados aún."}
                    </p>
                  </div>
                ) : (
                  <motion.div
                    className="grid sm:grid-cols-2 md:grid-cols-3 gap-3"
                    variants={contentStagger}
                    initial="hidden"
                    animate="show"
                  >
                    {clients.map((client) => (
                      <motion.button
                        key={client.id}
                        variants={contentItem}
                        onClick={() => setSelectedDocClientId(client.id)}
                        whileHover={{ borderColor: "rgba(16,223,253,0.60)" }}
                        className="relative border border-[#10dffd]/22 rounded-xl p-5 flex flex-col items-start gap-3 text-left transition-colors cursor-pointer w-full overflow-hidden"
                      >
                        <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#10dffd]/30 rounded-tl-xl pointer-events-none" />
                        <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#10dffd]/30 rounded-br-xl pointer-events-none" />
                        <div className="w-9 h-9 rounded-full bg-[#10dffd]/10 flex items-center justify-center shrink-0">
                          <UserCircleIcon className="w-5 h-5 text-[#10dffd]/60" />
                        </div>
                        <div className="min-w-0 w-full">
                          <p className="text-white text-sm font-light truncate">
                            {client.full_name || client.email}
                          </p>
                          {client.full_name && (
                            <p className="text-white/25 text-[10px] truncate mt-0.5">{client.email}</p>
                          )}
                        </div>
                        <span className="text-[10px] tracking-widest uppercase text-[#10dffd]/50 flex items-center gap-1">
                          <DocumentTextIcon className="w-3 h-3" />
                          {l ? "View docs" : "Ver docs"}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )
              ) : (
                /* ── Client docs panel ── */
                <motion.div
                  key={selectedClient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Client header */}
                  <div className="flex items-center gap-3 mb-6 border border-[#10dffd]/22 rounded-xl px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-[#10dffd]/10 flex items-center justify-center shrink-0">
                      <UserCircleIcon className="w-4 h-4 text-[#10dffd]/60" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-light">{selectedClient.full_name || selectedClient.email}</p>
                      {selectedClient.full_name && (
                        <p className="text-white/25 text-[10px]">{selectedClient.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Docs area */}
                  <ClientDocPanel client={selectedClient} l={l} />
                </motion.div>
              )}
            </div>
          );
        }

        // ── Client view ──
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-px bg-[#10dffd]" />
                  <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">
                    {l ? "Client files" : "Archivos cliente"}
                  </span>
                </div>
                <h2 className="font-banner font-light text-white text-xl">
                  {l ? "Documents" : "Documentos"}
                </h2>
              </div>
            </div>
            <ClientDocViewer userId={user!.id} l={l} />
          </div>
        );
      }

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
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-px bg-[#10dffd]" />
                  <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">
                    {isAdmin ? "Juan100205" : (l ? "Your projects" : "Tus proyectos")}
                  </span>
                </div>
                <h2 className="font-banner font-light text-white text-xl">
                  {l ? "Web Pages" : "Páginas Web"}
                </h2>
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
              <div className="border border-[#10dffd]/22 rounded-2xl p-10 text-center">
                <CodeBracketIcon className="w-8 h-8 text-[#10dffd]/30 mx-auto mb-3" />
                <p className="text-white/40 text-sm font-light">
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
                  const htmlUrl = "html_url" in repo ? (repo as any).html_url : "#";
                  const language = "language" in repo ? (repo as any).language : null;
                  const topics: string[] = "topics" in repo ? ((repo as any).topics ?? []) : [];
                  const repoName: string = (repo as any).name ?? "";

                  const rawHomepage: string | null = (repo as any).homepage ?? null;
                  const liveUrl = (() => {
                    if (LIVE_URL_OVERRIDES[repoName]) return LIVE_URL_OVERRIDES[repoName];
                    if (!rawHomepage) return null;
                    try {
                      const u = new URL(rawHomepage);
                      if (u.hostname.endsWith("github.io")) return null;
                      return rawHomepage;
                    } catch { return null; }
                  })();

                  return (
                    <motion.div
                      key={(repo as any).id}
                      variants={contentItem}
                      whileHover={{ borderColor: "rgba(16,223,253,0.60)" }}
                      className="relative border border-[#10dffd]/22 rounded-xl p-5 flex flex-col gap-3 transition-colors overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-[#10dffd]/30 rounded-tl-xl pointer-events-none" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#10dffd]/30 rounded-br-xl pointer-events-none" />
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white text-sm font-light leading-snug">
                          {repoName.replace(/-/g, " ")}
                        </h3>
                        {liveUrl && (
                          <span className="text-[10px] text-[#10dffd]/60 border border-[#10dffd]/38 rounded-full px-2 py-0.5 shrink-0">
                            live
                          </span>
                        )}
                      </div>

                      {(repo as any).description && (
                        <p className="text-white/40 text-xs leading-relaxed flex-1">
                          {(repo as any).description}
                        </p>
                      )}

                      {topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {topics.slice(0, 4).map((t: string) => (
                            <span key={t} className="text-[10px] text-[#10dffd]/60 border border-[#10dffd]/30 rounded-full px-2 py-0.5">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                        {language ? (
                          <span className="flex items-center gap-1.5 text-xs text-white/40">
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
                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] tracking-widest uppercase text-white/60 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1 rounded-full transition-all"
                            >
                              {l ? "Live" : "Live"}
                            </a>
                          )}
                          {repoName && (
                            <Link
                              to={`/proyecto/${repoName}`}
                              className="text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
                            >
                              {l ? "View" : "Ver"}
                            </Link>
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
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-px bg-[#10dffd]" />
                <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">{l ? "System" : "Sistema"}</span>
              </div>
              <h2 className="font-banner font-light text-white text-xl">{l ? "Admin Dashboard" : "Panel de Administración"}</h2>
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
                    <span className="ml-2 text-white/25">({adminPanel.repos.length})</span>
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
                <p className="text-white/25 text-sm text-center py-8">
                  {l ? "No repos synced yet. Click 'Sync GitHub'." : "Sin repositorios. Haz clic en 'Sincronizar GitHub'."}
                </p>
              ) : (
                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto scrollbar_exp pr-1">
                  {adminPanel.repos.map((repo) => (
                    <div key={repo.id} className="flex items-center justify-between border border-[#10dffd]/22 rounded-xl px-4 py-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <CodeBracketIcon className="w-3.5 h-3.5 text-[#10dffd]/50 flex-shrink-0" />
                        <span className="text-white text-xs font-light truncate">{repo.name}</span>
                        {repo.language && (
                          <span className="text-white/25 text-[10px] hidden sm:block">{repo.language}</span>
                        )}
                      </div>
                      {(repo.stars ?? 0) > 0 && (
                        <span className="text-white/25 text-[10px] ml-3 shrink-0">★ {repo.stars}</span>
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
                <div className="border border-[#10dffd]/30 rounded-2xl p-4 flex flex-col gap-2 max-h-96 overflow-y-auto scrollbar_exp">
                  <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">
                    {l ? "Select user" : "Selecciona usuario"}
                  </p>
                  {adminPanel.users.filter((u) => !u.is_admin).map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedUserId(selectedUserId === u.id ? null : u.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        selectedUserId === u.id
                          ? "bg-[#10dffd]/10 border-[#10dffd]/50 text-[#10dffd]"
                          : "border-transparent hover:bg-white/5 text-white/50"
                      }`}
                    >
                      <UserCircleIcon className="w-5 h-5 flex-shrink-0 opacity-50" />
                      <div className="min-w-0">
                        <div className="text-xs font-light truncate">{u.full_name || u.email}</div>
                        {u.full_name && (
                          <div className="text-[10px] text-white/25 truncate">{u.email}</div>
                        )}
                      </div>
                      <span className="ml-auto text-[10px] text-white/25 shrink-0">
                        {adminPanel.reposForUser(u.id).size} repos
                      </span>
                    </button>
                  ))}
                  {adminPanel.users.filter((u) => !u.is_admin).length === 0 && !adminPanel.loading && (
                    <p className="text-white/25 text-xs text-center py-4">
                      {l ? "No users registered yet." : "Sin usuarios registrados aún."}
                    </p>
                  )}
                </div>

                {/* Repos access toggles for selected user */}
                <div className="border border-[#10dffd]/30 rounded-2xl p-4 flex flex-col gap-2 max-h-96 overflow-y-auto scrollbar_exp">
                  {!selectedUserId ? (
                    <div className="flex items-center justify-center h-full py-10 text-center">
                      <p className="text-white/25 text-xs">
                        {l ? "← Select a user to manage their access" : "← Selecciona un usuario para gestionar sus accesos"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white/25 text-[10px] uppercase tracking-widest">
                          {l ? "Repo access" : "Acceso a repos"}
                        </p>
                        <button
                          onClick={() => setSelectedUserId(null)}
                          className="text-white/25 hover:text-white/40 transition-colors cursor-pointer"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {adminPanel.repos.length === 0 && (
                        <p className="text-white/25 text-xs text-center py-4">
                          {l ? "Sync repos first." : "Sincroniza repos primero."}
                        </p>
                      )}
                      {adminPanel.repos.map((repo) => {
                        const hasAccess = adminPanel.reposForUser(selectedUserId).has(repo.id);
                        return (
                          <div key={repo.id} className="flex items-center justify-between border border-[#10dffd]/18 rounded-xl px-3 py-2">
                            <span className="text-xs text-white/50 font-light truncate mr-2">{repo.name}</span>
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

            {/* ── Workflow name management ── */}
            <section className="mt-10">
              <span className="text-[10px] text-[#10dffd] tracking-[0.25em] uppercase block mb-4">
                {l ? "Active Flows" : "Flujos Activos"}
              </span>
              <p className="text-white/25 text-xs mb-4">
                {l
                  ? "Rename each flow. Only flows with an assigned phone number are shown here."
                  : "Renombra cada flujo. Solo se muestran los flujos que ya tienen número asignado en la BD."}
              </p>
              <div className="flex flex-col gap-3">
                {adminPanel.workflows.map((wf) => (
                  <WorkflowNameRow
                    key={wf.id}
                    wf={wf}
                    onSave={(id, name) => adminPanel.updateWorkflow(id, { name })}
                  />
                ))}
                {adminPanel.workflows.length === 0 && !adminPanel.loading && (
                  <p className="text-white/25 text-xs text-center py-4">
                    {l ? "No flows found." : "Sin flujos en la BD."}
                  </p>
                )}
              </div>
            </section>

            {/* ── AI Workflows access management ── */}
            <section className="mt-10">
              <span className="text-[10px] text-[#10dffd] tracking-[0.25em] uppercase block mb-4">
                {l ? "AI Workflows" : "Flujos de IA"}
                {adminPanel.workflows.length > 0 && (
                  <span className="ml-2 text-white/25">({adminPanel.workflows.length})</span>
                )}
              </span>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Users list (reuse same selection) */}
                <div className="border border-[#10dffd]/30 rounded-2xl p-4 flex flex-col gap-2 max-h-96 overflow-y-auto scrollbar_exp">
                  <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">
                    {l ? "Select user" : "Selecciona usuario"}
                  </p>
                  {adminPanel.users.filter((u) => !u.is_admin).map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedUserId(selectedUserId === u.id ? null : u.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                        selectedUserId === u.id
                          ? "bg-[#10dffd]/10 border-[#10dffd]/50 text-[#10dffd]"
                          : "border-transparent hover:bg-white/5 text-white/50"
                      }`}
                    >
                      <UserCircleIcon className="w-5 h-5 flex-shrink-0 opacity-50" />
                      <div className="min-w-0">
                        <div className="text-xs font-light truncate">{u.full_name || u.email}</div>
                        {u.full_name && (
                          <div className="text-[10px] text-white/25 truncate">{u.email}</div>
                        )}
                      </div>
                      <span className="ml-auto text-[10px] text-white/25 shrink-0">
                        {adminPanel.workflowsForUser(u.id).size} flows
                      </span>
                    </button>
                  ))}
                  {adminPanel.users.filter((u) => !u.is_admin).length === 0 && !adminPanel.loading && (
                    <p className="text-white/25 text-xs text-center py-4">
                      {l ? "No users registered yet." : "Sin usuarios registrados aún."}
                    </p>
                  )}
                </div>

                {/* Workflow access toggles for selected user */}
                <div className="border border-[#10dffd]/30 rounded-2xl p-4 flex flex-col gap-2 max-h-96 overflow-y-auto scrollbar_exp">
                  {!selectedUserId ? (
                    <div className="flex items-center justify-center h-full py-10 text-center">
                      <p className="text-white/25 text-xs">
                        {l ? "← Select a user to manage their workflows" : "← Selecciona un usuario para gestionar sus flujos"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white/25 text-[10px] uppercase tracking-widest">
                          {l ? "Workflow access" : "Acceso a flujos"}
                        </p>
                        <button
                          onClick={() => setSelectedUserId(null)}
                          className="text-white/25 hover:text-white/40 transition-colors cursor-pointer"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {adminPanel.workflows.length === 0 && (
                        <p className="text-white/25 text-xs text-center py-4">
                          {l ? "No workflows found. Run migration 004." : "Sin flujos. Ejecuta la migración 004."}
                        </p>
                      )}
                      {adminPanel.workflows.map((wf) => {
                        const hasAccess = adminPanel.workflowsForUser(selectedUserId).has(wf.id);
                        return (
                          <div key={wf.id} className="flex items-center justify-between border border-[#10dffd]/18 rounded-xl px-3 py-2">
                            <div className="min-w-0 mr-2">
                              <span className="text-xs text-white/50 font-light truncate block">{wf.name}</span>
                              {wf.description && (
                                <span className="text-[10px] text-white/25 truncate block">{wf.description}</span>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                hasAccess
                                  ? adminPanel.revokeWorkflowAccess(selectedUserId, wf.id)
                                  : adminPanel.grantWorkflowAccess(selectedUserId, wf.id)
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
    { id: "automatizaciones" as Tab, icon: BoltIcon, label: { en: "Automations", es: "Automatizaciones" } },
    { id: "documentos" as Tab, icon: DocumentTextIcon, label: { en: "Documents", es: "Documentos" } },
    { id: "proyectos" as Tab, icon: CodeBracketIcon, label: { en: "Web Pages", es: "Páginas Web" } },
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

  if (openWorkflow) {
    return (
      <WorkflowDashboard
        workflow={openWorkflow}
        onClose={() => setOpenWorkflow(null)}
        languageState={languageState}
        isAdmin={isAdmin}
        getCredentials={getCredentials}
        saveCredential={saveCredential}
        deleteCredential={deleteCredential}
      />
    );
  }

  const initials = displayName.slice(0, 2).toUpperCase();

  const SidebarNavItem = ({ tab }: { tab: typeof allTabs[number] }) => {
    const Icon = tab.icon;
    const active = activeTab === tab.id;
    return (
      <button
        onClick={() => setActiveTab(tab.id)}
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left transition-all duration-200 cursor-pointer border
          ${active
            ? "bg-[#10dffd]/10 border-[#10dffd]/38 text-[#10dffd]"
            : "border-transparent text-white/35 hover:text-white/80 hover:bg-white/[0.04]"
          }`}
      >
        <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-[#10dffd]" : "text-white/25 group-hover:text-white/60"}`} />
        <span className="font-display text-xs tracking-wide truncate">{l ? tab.label.en : tab.label.es}</span>
        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10dffd] shrink-0" />}
      </button>
    );
  };

  return (
    <div className="flex" style={{ height: "100vh", overflow: "hidden" }}>

      {/* ── Sidebar (desktop) ──────────────────────────────────────────────── */}
      <motion.aside
        className="hidden md:flex flex-col w-56 border-r border-[#10dffd]/22 flex-shrink-0 bg-black/30 backdrop-blur-md"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 h-14 border-b border-[#10dffd]/18 flex-shrink-0">
          <img src={IsotipoWhite} alt="RIANODEVZ" className="w-6 object-contain opacity-80" />
          <div>
            <span className="font-display text-[9px] text-[#10dffd]/50 tracking-[0.35em] uppercase block">Portal</span>
          </div>
        </div>

        {/* User pill */}
        <div className="px-3 py-3 border-b border-[#10dffd]/18 flex-shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#10dffd]/[0.04] border border-[#10dffd]/22">
            <div className="w-7 h-7 rounded-full bg-[#10dffd]/15 border border-[#10dffd]/45 flex items-center justify-center shrink-0">
              <span className="text-[#10dffd] text-[9px] font-light">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-[11px] font-light truncate leading-tight">{displayName}</p>
              <p className="text-white/25 text-[9px] truncate">{user.email}</p>
            </div>
            {isAdmin && (
              <span className="ml-auto shrink-0 text-[8px] bg-[#10dffd]/10 text-[#10dffd]/70 border border-[#10dffd]/38 px-1.5 py-0.5 rounded-full font-display tracking-wider uppercase">
                admin
              </span>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar_exp px-3 py-4 flex flex-col gap-0.5">
          <span className="text-[9px] text-white/15 tracking-[0.3em] uppercase px-3 mb-2 font-display">
            {l ? "Dashboard" : "Panel"}
          </span>
          {mainTabs.map((tab) => <SidebarNavItem key={tab.id} tab={tab} />)}

          <div className="border-t border-[#10dffd]/18 my-3 mx-1" />
          <span className="text-[9px] text-white/15 tracking-[0.3em] uppercase px-3 mb-2 font-display">
            {l ? "Account" : "Cuenta"}
          </span>
          {accountTabs.map((tab) => <SidebarNavItem key={tab.id} tab={tab} />)}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-3 border-t border-[#10dffd]/18 flex-shrink-0">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-white/25 hover:text-red-400/60
              transition-colors cursor-pointer rounded-xl hover:bg-red-500/[0.04] border border-transparent"
          >
            <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
            <span className="font-display text-xs">{l ? "Log out" : "Cerrar sesión"}</span>
          </button>
        </div>
      </motion.aside>

      {/* ── Main content area ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 h-13 border-b border-[#10dffd]/22 bg-black/30 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={IsotipoWhite} alt="RIANODEVZ" className="w-6 object-contain opacity-70" />
            <span className="font-display text-[9px] text-white/25 tracking-[0.3em] uppercase">Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#10dffd]/15 border border-[#10dffd]/38 flex items-center justify-center">
              <span className="text-[#10dffd] text-[9px]">{initials}</span>
            </div>
            <button onClick={() => signOut()} className="text-white/30 hover:text-white/70 transition-colors cursor-pointer p-1">
              <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile tab strip */}
        <div className="md:hidden flex border-b border-[#10dffd]/22 overflow-x-auto scrollbar_exp flex-shrink-0 bg-black/20 backdrop-blur-md">
          {allTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-3.5 py-2.5 border-b-2 transition-colors cursor-pointer ${
                  active ? "border-[#10dffd] text-[#10dffd]" : "border-transparent text-white/25"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-display text-[8px] uppercase tracking-widest whitespace-nowrap">
                  {l ? tab.label.en : tab.label.es}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop content topbar */}
        <div className="hidden md:flex items-center justify-between px-7 h-12 border-b border-[#10dffd]/18 flex-shrink-0 bg-black/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="w-4 h-px bg-[#10dffd]/40" />
            <span className="font-display text-[10px] text-white/25 tracking-[0.3em] uppercase">
              {l
                ? allTabs.find((t) => t.id === activeTab)?.label.en
                : allTabs.find((t) => t.id === activeTab)?.label.es}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <main ref={scrollRef} className="flex-1 overflow-y-auto scrollbar_exp bg-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabFade}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full max-w-4xl mx-auto px-5 py-8 md:px-8 md:py-10"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Portal;
