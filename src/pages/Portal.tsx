import type { RefObject } from "react";
import { useState } from "react";
import {
  RssIcon,
  GlobeAltIcon,
  LinkIcon,
  BoltIcon,
  CpuChipIcon,
  EyeIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  LockClosedIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import IsotipoWhite from "../assets/IsotipoNoBgWhite.png";
import IsotipoBlack from "../assets/IsotipoNoBgBlack.png";
import Header from "../Components/Header";

interface Props {
  languageState: boolean;
  setLanguageState: (val: boolean) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
}

type Tab = "blog" | "flujos" | "paginas" | "dominios" | "automatizaciones" | "profile" | "settings";

// ── Data ────────────────────────────────────────────────────────────────────

const blogPosts = [
  {
    id: 1,
    title: { en: "How automation changed our operation", es: "Cómo la automatización cambió nuestra operación" },
    category: "Automation",
    date: "2026-03-10",
    status: "published",
    reads: 234,
  },
  {
    id: 2,
    title: { en: "Advanced tracking with GA4 and GTM", es: "Tracking avanzado con GA4 y GTM" },
    category: "Data",
    date: "2026-02-28",
    status: "published",
    reads: 189,
  },
  {
    id: 3,
    title: { en: "The role of chatbots in lead qualification", es: "El rol del chatbot en la calificación de leads" },
    category: "AI",
    date: "2026-03-20",
    status: "draft",
    reads: 0,
  },
  {
    id: 4,
    title: { en: "Web infrastructure for marketing teams", es: "Infraestructura web para equipos de marketing" },
    category: "Web",
    date: "2026-03-18",
    status: "draft",
    reads: 0,
  },
];

const webPages = [
  { id: 1, domain: "rianodevz.net", status: "live", lastDeploy: "2026-03-01", score: 98, tech: "React + Vite" },
  { id: 2, domain: "cataly.co", status: "live", lastDeploy: "2026-02-20", score: 95, tech: "Next.js" },
  { id: 3, domain: "arcovxr.com", status: "live", lastDeploy: "2026-01-15", score: 92, tech: "React" },
  { id: 4, domain: "conjuntocallejas.co", status: "maintenance", lastDeploy: "2026-03-10", score: 88, tech: "WordPress" },
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

const aiFlows = [
  {
    id: 1,
    name: { en: "Cataly Chatbot", es: "Chatbot Cataly" },
    type: { en: "Conversational", es: "Conversacional" },
    interactions: 1234,
    status: "active",
    lastActive: { en: "3 min ago", es: "hace 3 min" },
  },
  {
    id: 2,
    name: { en: "Lead qualifier", es: "Calificador de leads" },
    type: { en: "Classification", es: "Clasificación" },
    interactions: 567,
    status: "active",
    lastActive: { en: "1 hour ago", es: "hace 1 hora" },
  },
  {
    id: 3,
    name: { en: "Content generator", es: "Generador de contenido" },
    type: { en: "Generation", es: "Generación" },
    interactions: 89,
    status: "paused",
    lastActive: { en: "2 days ago", es: "hace 2 días" },
  },
  {
    id: 4,
    name: { en: "Voice clone assistant", es: "Asistente con voz clonada" },
    type: { en: "Voice + Chat", es: "Voz + Chat" },
    interactions: 2891,
    status: "active",
    lastActive: { en: "just now", es: "ahora mismo" },
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("blog");
  const [blogFilter, setBlogFilter] = useState<"all" | "published" | "draft">("all");
  const l = languageState;

  const content = {
    tag: { en: "Client Portal", es: "Portal de Clientes" },
    subtitle: { en: "Exclusive access for RIANODEV active clients.", es: "Acceso exclusivo para clientes activos de RIANODEV." },
    emailLabel: { en: "Email", es: "Correo electrónico" },
    passwordLabel: { en: "Password", es: "Contraseña" },
    button: { en: "Sign in", es: "Ingresar" },
    help: { en: "Don't have access yet? Contact us to get started.", es: "¿Aún no tienes acceso? Contáctanos para comenzar." },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header scrollRef={scrollRef} languageState={languageState} setLanguageState={setLanguageState} />
        <div ref={scrollRef} className="page_scroll scrollbar_exp flex items-center justify-center py-20">
          <div className="w-full max-w-md mx-auto px-6">
            <div className="flex flex-col items-center mb-10">
              <div className="w-14 bg-[#10dffd]/10 text-[#10dffd] rounded-full outline-2 outline-[#10dffd] p-3 mb-6">
                <LockClosedIcon />
              </div>
              <h1 className="md:text-3xl text-2xl font-light text-white text-center mb-2">
                {l ? content.tag.en : content.tag.es}
              </h1>
              <p className="text-gray-400 text-sm text-center">
                {l ? content.subtitle.en : content.subtitle.es}
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="border border-[#10dffd]/20 rounded-2xl p-8 bg-black flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-light">
                  {l ? content.emailLabel.en : content.emailLabel.es}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-[#10dffd]/20 rounded-xl px-4 py-3 bg-transparent text-white text-sm outline-none focus:border-[#10dffd] transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400 font-light">
                  {l ? content.passwordLabel.en : content.passwordLabel.es}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-[#10dffd]/20 rounded-xl px-4 py-3 bg-transparent text-white text-sm outline-none focus:border-[#10dffd] transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="bg-[#10dffd] text-black font-light px-6 py-3 rounded-xl hover:opacity-90 transition-opacity mt-2 cursor-pointer"
              >
                {l ? content.button.en : content.button.es}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              {l ? content.help.en : content.help.es}
            </p>
          </div>
        </div>
      </>
    );
  }

  const filteredPosts =
    blogFilter === "all" ? blogPosts : blogPosts.filter((p) => p.status === blogFilter);

  const renderContent = () => {
    switch (activeTab) {
      // ── Blog ──────────────────────────────────────────────────────────────
      case "blog":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">Blog</h2>
              <button className="text-xs bg-[#10dffd] text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                {l ? "+ New post" : "+ Nueva entrada"}
              </button>
            </div>

            {/* Filter pills */}
            <div className="flex gap-1 mb-6 border border-[#10dffd]/15 rounded-xl p-1 w-fit">
              {(["all", "published", "draft"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setBlogFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    blogFilter === f
                      ? "bg-[#10dffd]/15 text-[#10dffd]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {f === "all"
                    ? l ? "All" : "Todos"
                    : f === "published"
                    ? l ? "Published" : "Publicados"
                    : l ? "Drafts" : "Borradores"}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-xl p-5 flex items-center justify-between gap-4 bg-[#10dffd]/[0.01] cursor-pointer"
                >
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <span className="text-white text-sm font-light truncate">
                      {l ? post.title.en : post.title.es}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-[#10dffd]/70 border border-[#10dffd]/20 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-600 text-[11px]">{post.date}</span>
                      {post.reads > 0 && (
                        <span className="text-gray-600 text-[11px] flex items-center gap-1">
                          <EyeIcon className="w-3 h-3" />
                          {post.reads}
                        </span>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={post.status} l={l} />
                </div>
              ))}
            </div>
          </div>
        );

      // ── Flujos de IA ───────────────────────────────────────────────────────
      case "flujos":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">
                {l ? "AI Flows" : "Flujos de IA"}
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: { en: "Total flows", es: "Flujos totales" }, value: String(aiFlows.length) },
                {
                  label: { en: "Active", es: "Activos" },
                  value: String(aiFlows.filter((f) => f.status === "active").length),
                },
                {
                  label: { en: "Total interactions", es: "Interacciones totales" },
                  value: aiFlows.reduce((a, f) => a + f.interactions, 0).toLocaleString(),
                },
              ].map((stat) => (
                <div
                  key={stat.label.en}
                  className="border border-[#10dffd]/15 rounded-xl p-4 bg-[#10dffd]/[0.02]"
                >
                  <div className="text-[#10dffd] text-xl font-light">{stat.value}</div>
                  <div className="text-gray-500 text-[11px] mt-1">
                    {l ? stat.label.en : stat.label.es}
                  </div>
                </div>
              ))}
            </div>

            {/* Flow cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {aiFlows.map((flow) => (
                <div
                  key={flow.id}
                  className="border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-xl p-5 bg-[#10dffd]/[0.01]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white text-sm font-light">
                        {l ? flow.name.en : flow.name.es}
                      </div>
                      <div className="text-gray-500 text-[11px] mt-0.5">
                        {l ? flow.type.en : flow.type.es}
                      </div>
                    </div>
                    <StatusBadge status={flow.status} l={l} />
                  </div>
                  <div className="flex items-end justify-between mt-4 pt-4 border-t border-[#10dffd]/10">
                    <div>
                      <div className="text-[#10dffd] text-lg font-light">
                        {flow.interactions.toLocaleString()}
                      </div>
                      <div className="text-gray-700 text-[10px]">
                        {l ? "interactions" : "interacciones"}
                      </div>
                    </div>
                    <span className="text-gray-600 text-[10px]">
                      {l ? flow.lastActive.en : flow.lastActive.es}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ── Páginas Web ────────────────────────────────────────────────────────
      case "paginas":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-light">
                {l ? "Web Pages" : "Páginas Web"}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {webPages.map((page) => (
                <div
                  key={page.id}
                  className="border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-xl p-5 bg-[#10dffd]/[0.01]"
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
                    <StatusBadge status={page.status} l={l} />
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
                </div>
              ))}
            </div>
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
                <tbody>
                  {domainsList.map((d) => (
                    <tr
                      key={d.id}
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
                    </tr>
                  ))}
                </tbody>
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

            <div className="flex flex-col gap-3">
              {automations.map((auto) => (
                <div
                  key={auto.id}
                  className="border border-[#10dffd]/10 hover:border-[#10dffd]/30 transition-colors rounded-xl p-5 flex items-center justify-between gap-4 bg-[#10dffd]/[0.01]"
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
                </div>
              ))}
            </div>
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
                <div className="text-gray-500 text-xs mt-0.5">{email}</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: { en: "Display name", es: "Nombre" }, value: displayName, type: "text" },
                { label: { en: "Email", es: "Correo electrónico" }, value: email, type: "email" },
                { label: { en: "Company", es: "Empresa" }, value: "", type: "text" },
                { label: { en: "Phone", es: "Teléfono" }, value: "", type: "tel" },
              ].map((field) => (
                <div key={field.label.en} className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-gray-500">{l ? field.label.en : field.label.es}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="border border-[#10dffd]/15 rounded-xl px-4 py-2.5 bg-transparent text-white text-sm outline-none focus:border-[#10dffd] transition-colors"
                  />
                </div>
              ))}

              <button className="mt-2 bg-[#10dffd] text-black text-xs px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer w-fit">
                {l ? "Save changes" : "Guardar cambios"}
              </button>
            </div>
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
    }
  };

  // Derive display name from email (everything before @)
  const displayName = email.split("@")[0] || "Cliente";

  const mainTabs = [
    { id: "blog" as Tab, icon: RssIcon, label: { en: "Blog", es: "Blog" } },
    { id: "flujos" as Tab, icon: CpuChipIcon, label: { en: "AI Flows", es: "Flujos de IA" } },
    { id: "paginas" as Tab, icon: GlobeAltIcon, label: { en: "Web Pages", es: "Páginas Web" } },
    { id: "dominios" as Tab, icon: LinkIcon, label: { en: "Domains", es: "Dominios" } },
    { id: "automatizaciones" as Tab, icon: BoltIcon, label: { en: "Automations", es: "Automatizaciones" } },
  ];

  const accountTabs = [
    { id: "profile" as Tab, icon: UserCircleIcon, label: { en: "Profile", es: "Perfil" } },
    { id: "settings" as Tab, icon: Cog6ToothIcon, label: { en: "Settings", es: "Configuración" } },
  ];

  const allTabs = [...mainTabs, ...accountTabs];

  const SidebarBtn = ({ tab }: { tab: typeof mainTabs[0] }) => {
    const Icon = tab.icon;
    const active = activeTab === tab.id;
    return (
      <button
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-light transition-all text-left w-full cursor-pointer border ${
          active
            ? "bg-[#10dffd]/10 text-[#10dffd] border-[#10dffd]/20"
            : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border-transparent"
        }`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        {l ? tab.label.en : tab.label.es}
      </button>
    );
  };

  return (
    <div className="flex flex-col bg-black" style={{ height: "100vh", overflow: "hidden" }}>

      {/* Dashboard top bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-[#10dffd]/15 flex-shrink-0">
        <div className="flex items-center gap-3">
          <img src={IsotipoWhite} alt="RIANODEV" className="h-8 w-8 object-contain hidden dark:block" />
          <img src={IsotipoBlack} alt="RIANODEV" className="h-8 w-8 object-contain dark:hidden" />
          <span className="text-[10px] text-[#10dffd]/60 tracking-[0.2em] uppercase hidden sm:block">
            {l ? "Client Portal" : "Portal de Clientes"}
          </span>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-gray-500 hover:text-gray-300 transition-all cursor-pointer"
        >
          <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
          <span className="text-xs font-light hidden sm:block">{l ? "Log out" : "Salir"}</span>
        </button>
      </header>

      <div
        ref={scrollRef}
        className="flex flex-1 overflow-hidden"
      >
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-[#10dffd]/15 flex-shrink-0">
          <nav className="flex flex-col gap-1 p-2 flex-1">
            {mainTabs.map((tab) => <SidebarBtn key={tab.id} tab={tab} />)}
          </nav>
          <div className="border-t border-[#10dffd]/10 p-2 flex flex-col gap-1">
            {accountTabs.map((tab) => <SidebarBtn key={tab.id} tab={tab} />)}
          </div>
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
            <div className="p-6 md:p-10 max-w-4xl">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Portal;
