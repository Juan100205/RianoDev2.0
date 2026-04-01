import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  DocumentTextIcon,
  EyeIcon,
  ArrowLeftIcon,
  PrinterIcon,
  SwatchIcon,
} from "@heroicons/react/24/solid";
import {
  DocumentCheckIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useClientDocuments, type DocType, type ClientDocument } from "../hooks/useClientDocuments";
import IsotipoBlack from "../assets/IsotipoNoBgBlack.png";

// ── Theme (same as admin panel) ───────────────────────────────────────────────

interface DocTheme {
  id: string; label: string;
  accent: string; accentMid: string; accentLight: string; accentText: string; dot: string;
}

const DOC_THEMES: DocTheme[] = [
  { id: "clasico",   label: "Clásico",   accent: "#1a1a1a", accentMid: "#f0f0f0", accentLight: "#fafafa", accentText: "#1a1a1a", dot: "#1a1a1a" },
  { id: "navy",      label: "Navy",      accent: "#1e3a5f", accentMid: "#dde9f5", accentLight: "#f0f6fb", accentText: "#1e3a5f", dot: "#1e3a5f" },
  { id: "esmeralda", label: "Esmeralda", accent: "#1a4731", accentMid: "#d6ebe0", accentLight: "#eef7f1", accentText: "#1a4731", dot: "#1a4731" },
  { id: "borgona",   label: "Borgoña",   accent: "#7a1a2e", accentMid: "#f0d9de", accentLight: "#faf2f3", accentText: "#7a1a2e", dot: "#7a1a2e" },
  { id: "slate",     label: "Slate",     accent: "#334155", accentMid: "#e2e8f0", accentLight: "#f8fafc", accentText: "#334155", dot: "#334155" },
];

// ── Doc type metadata ─────────────────────────────────────────────────────────

const DOC_TYPES: { id: DocType; label: { es: string; en: string }; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "contrato",   label: { es: "Contrato",           en: "Contract"         }, Icon: DocumentCheckIcon     },
  { id: "factura",    label: { es: "Factura",             en: "Invoice"          }, Icon: ReceiptPercentIcon    },
  { id: "preguntas",  label: { es: "Preguntas",           en: "Questions"        }, Icon: QuestionMarkCircleIcon },
  { id: "welcome",    label: { es: "Welcome Document",    en: "Welcome Document" }, Icon: StarIcon              },
  { id: "estrategia", label: { es: "Setup de Estrategia", en: "Strategy Setup"   }, Icon: ChartBarIcon          },
];

interface Props { userId: string; l: boolean; }

// ── Shared markdown renderer ──────────────────────────────────────────────────

function DocMarkdown({ content, theme }: { content: string; theme: DocTheme }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h2 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 17, fontWeight: 400, color: theme.accent, marginTop: 32, marginBottom: 10, paddingBottom: 5, borderBottom: `0.75px solid ${theme.accent}28`, lineHeight: 1.3 }}>{children}</h2>,
        h2: ({ children }) => <h3 style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 13.5, fontWeight: 400, color: theme.accent, marginTop: 26, marginBottom: 8, paddingBottom: 4, borderBottom: `0.5px solid ${theme.accent}22`, lineHeight: 1.3 }}>{children}</h3>,
        h3: ({ children }) => <h4 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, color: theme.accent, marginTop: 18, marginBottom: 5, lineHeight: 1.4 }}>{children}</h4>,
        p: ({ children }) => <p style={{ margin: "7px 0", lineHeight: 1.9, fontSize: 10.5, color: "#2a2a2a", fontFamily: "'DM Sans',sans-serif" }}>{children}</p>,
        strong: ({ children }) => <strong style={{ fontWeight: 600, color: "#111" }}>{children}</strong>,
        em: ({ children }) => <em style={{ fontStyle: "italic", color: "#555" }}>{children}</em>,
        hr: () => <hr style={{ border: "none", borderTop: "0.5px solid #ddd", margin: "18px 0" }} />,
        blockquote: ({ children }) => <blockquote style={{ borderLeft: `2.5px solid ${theme.accent}55`, paddingLeft: 14, paddingTop: 6, paddingBottom: 6, margin: "12px 0", color: "#666", fontStyle: "italic", background: theme.accentLight, borderRadius: "0 4px 4px 0" }}>{children}</blockquote>,
        ul: ({ children }) => <ul style={{ paddingLeft: 20, margin: "6px 0", lineHeight: 1.85 }}>{children}</ul>,
        ol: ({ children }) => <ol style={{ paddingLeft: 20, margin: "6px 0", lineHeight: 1.85 }}>{children}</ol>,
        li: ({ children }) => <li style={{ margin: "3px 0", lineHeight: 1.85, fontSize: 10.5, color: "#2a2a2a", fontFamily: "'DM Sans',sans-serif" }}>{children}</li>,
        table: ({ children }) => <table style={{ width: "100%", borderCollapse: "collapse", margin: "14px 0", fontSize: 9.5, fontFamily: "'DM Sans',sans-serif" }}>{children}</table>,
        thead: ({ children }) => <thead style={{ background: theme.accentMid }}>{children}</thead>,
        th: ({ children }) => <th style={{ border: `0.75px solid ${theme.accent}44`, padding: "6px 10px", textAlign: "left", fontWeight: 600, color: theme.accentText, fontSize: 8.5, letterSpacing: "0.06em", textTransform: "uppercase" }}>{children}</th>,
        td: ({ children }) => <td style={{ border: "0.75px solid #e2e2e2", padding: "5.5px 10px", verticalAlign: "top", lineHeight: 1.65, color: "#333" }}>{children}</td>,
        code: ({ children }) => <code style={{ fontFamily: "'Courier New',monospace", fontSize: 9, background: theme.accentLight, color: theme.accentText, padding: "1px 5px", borderRadius: 3 }}>{children}</code>,
        pre: ({ children }) => <pre style={{ background: theme.accentLight, border: `0.75px solid ${theme.accent}20`, padding: "10px 14px", borderRadius: 5, fontSize: 8.5, overflowX: "auto", margin: "10px 0", lineHeight: 1.65 }}>{children}</pre>,
        input: ({ ...props }) => <input {...props} style={{ width: 13, height: 13, marginRight: 6, accentColor: theme.accent, verticalAlign: "middle" }} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── Header shells (same as admin) ─────────────────────────────────────────────

function ContratoHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ position: "relative", padding: "52px 56px 32px", textAlign: "center" }}>
      <span style={{ position: "absolute", top: 28, left: 40, fontFamily: "'Playfair Display',Georgia,serif", fontSize: 72, fontWeight: 400, color: theme.accent, opacity: 0.08, lineHeight: 1, userSelect: "none" }}>/</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
        <img src={IsotipoBlack} alt="RianoDev" style={{ height: 28, filter: "opacity(0.7)" }} />
        <div style={{ textAlign: "right", fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: "#999", lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, color: "#444", fontSize: 9 }}>RianoDev — Juan Jose Riaño</div>
          <div>juanjose@rianodev.com · rianodev.com</div>
        </div>
      </div>
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 30, fontWeight: 700, color: theme.accent, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px", lineHeight: 1.1 }}>Contrato</h1>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>{title}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 8px" }}>
        <div style={{ flex: 1, height: "0.75px", background: theme.accent + "30" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: theme.accent + "80", letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Acuerdo de Servicios Digitales</span>
        <div style={{ flex: 1, height: "0.75px", background: theme.accent + "30" }} />
      </div>
    </div>
  );
}

function FacturaHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <>
      <div style={{ background: theme.accent, padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <img src={IsotipoBlack} alt="RianoDev" style={{ height: 30, filter: "invert(1) brightness(2)" }} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.65)", marginTop: 6, lineHeight: 1.6 }}>
            <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, fontSize: 9 }}>RianoDev — Juan Jose Riaño</div>
            <div>juanjose@rianodev.com · rianodev.com · Bogotá, Colombia</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 38, fontWeight: 700, color: "white", letterSpacing: "0.04em", lineHeight: 1 }}>FACTURA</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>{title}</div>
        </div>
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}44)` }} />
    </>
  );
}

function WelcomeHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ textAlign: "center", padding: "56px 56px 32px" }}>
      <img src={IsotipoBlack} alt="RianoDev" style={{ height: 28, margin: "0 auto 6px" }} />
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: "#aaa", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28 }}>RianoDev</div>
      <div style={{ width: 48, height: "0.75px", background: theme.accent + "40", margin: "0 auto 28px" }} />
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 44, fontWeight: 400, fontStyle: "italic", color: theme.accent, margin: "0 0 6px", lineHeight: 1.1 }}>Bienvenido/a</h1>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#999", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 32px" }}>{title}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
        <div style={{ width: 48, height: "0.5px", background: "#ddd" }} />
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 7.5, color: theme.accent + "70", letterSpacing: "0.18em", textTransform: "uppercase" }}>RianoDev · Portal del Cliente</span>
        <div style={{ width: 48, height: "0.5px", background: "#ddd" }} />
      </div>
    </div>
  );
}

function PreguntasHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ padding: "44px 56px 28px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: theme.accent, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>RianoDev · Onboarding</div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, color: theme.accent, margin: 0, lineHeight: 1.2 }}>{title}</h1>
        </div>
        <img src={IsotipoBlack} alt="RianoDev" style={{ height: 26, opacity: 0.5, marginTop: 4 }} />
      </div>
      <div style={{ height: "1px", background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}00)`, marginBottom: 4 }} />
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 7.5, color: "#bbb", letterSpacing: "0.15em", textTransform: "uppercase", paddingTop: 5 }}>Documento confidencial</div>
    </div>
  );
}

function EstrategiaHeader({ title, theme }: { title: string; theme: DocTheme }) {
  return (
    <div style={{ display: "flex", borderBottom: `0.75px solid ${theme.accent}20`, marginBottom: 0 }}>
      <div style={{ width: 5, background: theme.accent, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: "40px 48px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, color: theme.accent, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>Documento Estratégico · Confidencial</div>
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 700, color: theme.accent, margin: "0 0 6px", lineHeight: 1.15 }}>{title}</h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "#999", margin: 0 }}>RianoDev — juanjose@rianodev.com · rianodev.com</p>
          </div>
          <img src={IsotipoBlack} alt="RianoDev" style={{ height: 28, opacity: 0.6, marginTop: 4 }} />
        </div>
      </div>
    </div>
  );
}

const HEADERS: Record<DocType, React.ComponentType<{ title: string; theme: DocTheme }>> = {
  contrato: ContratoHeader, factura: FacturaHeader, welcome: WelcomeHeader,
  preguntas: PreguntasHeader, estrategia: EstrategiaHeader,
};

const PADDING: Record<DocType, string> = {
  contrato: "0 56px", factura: "22px 48px 0", welcome: "0 56px", preguntas: "4px 56px", estrategia: "20px 52px",
};

// ── DocPaper (read-only) ──────────────────────────────────────────────────────

function DocPaper({ doc, theme, onPrint }: { doc: ClientDocument; theme: DocTheme; onPrint: () => void }) {
  const Header = HEADERS[doc.type];
  return (
    <div className="rounded-2xl p-6 overflow-auto max-h-[72vh] scrollbar_exp" style={{ background: "#e5e7eb" }}>
      <div className="mx-auto bg-white shadow-2xl" style={{ maxWidth: 740, minHeight: 960 }}>
        <Header title={doc.title} theme={theme} />
        <div style={{ padding: PADDING[doc.type], paddingBottom: 0 }}>
          <DocMarkdown content={doc.content} theme={theme} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 56px", borderTop: "0.5px solid #e0e0e0", fontFamily: "'DM Sans',sans-serif", fontSize: 7.5, color: "#bbb", marginTop: 20 }}>
          <span>RianoDev · rianodev.com · juanjose@rianodev.com</span>
          <span style={{ color: theme.accent + "88" }}>{new Date(doc.updated_at).toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}</span>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button onClick={onPrint} className="flex items-center gap-2 text-xs tracking-widest uppercase text-black bg-[#10dffd] px-5 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer">
          <PrinterIcon className="w-3.5 h-3.5" />
          Descargar / Imprimir PDF
        </button>
      </div>
    </div>
  );
}

// ── ThemePicker ───────────────────────────────────────────────────────────────

function ThemePicker({ current, onChange }: { current: DocTheme; onChange: (t: DocTheme) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all cursor-pointer">
        <SwatchIcon className="w-3 h-3" />
        {current.label}
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: current.dot }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} className="absolute right-0 top-full mt-2 z-20 bg-black border border-white/10 rounded-xl p-2 flex flex-col gap-1 min-w-[140px] shadow-xl">
            {DOC_THEMES.map(t => (
              <button key={t.id} onClick={() => { onChange(t); setOpen(false); }} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer text-left ${current.id === t.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                <span className="w-3 h-3 rounded-full shrink-0 border border-white/10" style={{ background: t.dot }} />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main viewer ───────────────────────────────────────────────────────────────

export default function ClientDocViewer({ userId, l }: Props) {
  const { docs, loading, error } = useClientDocuments(userId);
  const visibleDocs = docs.filter(d => d.is_visible);
  const docsForType = (type: DocType) => visibleDocs.filter(d => d.type === type);
  const [activeDoc, setActiveDoc] = useState<ClientDocument | null>(null);
  const [theme, setTheme] = useState<DocTheme>(DOC_THEMES[0]);
  const proseRef = useRef<HTMLDivElement>(null);

  const getLogoDataUrl = (): Promise<string> => new Promise(resolve => {
    const img = new Image(); img.crossOrigin = "anonymous";
    img.onload = () => { const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; c.getContext("2d")!.drawImage(img, 0, 0); resolve(c.toDataURL("image/png")); };
    img.onerror = () => resolve(""); img.src = IsotipoBlack;
  });

  const handlePrint = async () => {
    if (!activeDoc) return;
    const logoUrl = await getLogoDataUrl();
    // Dynamic import to avoid circular import with print helper
    const { printClientDoc } = await import("../lib/printDoc");
    printClientDoc(activeDoc.type, activeDoc.title, proseRef.current?.innerHTML ?? "", logoUrl, theme);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10dffd]" />
    </div>
  );

  // ── Single doc view ─────────────────────────────────────────────────────────

  if (activeDoc) {
    const typeLabel = DOC_TYPES.find(t => t.id === activeDoc.type);
    return (
      <motion.div key="view" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex flex-col gap-4">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button onClick={() => setActiveDoc(null)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors cursor-pointer">
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            {l ? "All documents" : "Todos los documentos"}
          </button>
          <div className="flex items-center gap-2">
            <ThemePicker current={theme} onChange={setTheme} />
            <button onClick={handlePrint} className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-4 py-1.5 rounded-full hover:opacity-90 cursor-pointer">
              <PrinterIcon className="w-3 h-3" /> PDF
            </button>
          </div>
        </div>

        {/* Badge */}
        {typeLabel && (
          <div className="flex items-center gap-2">
            <typeLabel.Icon className="w-4 h-4 text-[#10dffd]/50" />
            <span className="text-[10px] tracking-widest uppercase text-[#10dffd]/50">{l ? typeLabel.label.en : typeLabel.label.es}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${theme.accent}20`, color: theme.accent }}>{theme.label}</span>
          </div>
        )}

        {/* Hidden prose for print */}
        <div ref={proseRef} className="hidden">
          <DocMarkdown content={activeDoc.content} theme={theme} />
        </div>

        <DocPaper doc={activeDoc} theme={theme} onPrint={handlePrint} />
      </motion.div>
    );
  }

  // ── Document list grouped by type ───────────────────────────────────────────

  const totalDocs = visibleDocs.length;

  if (totalDocs === 0) {
    return (
      <div className="border border-[#10dffd]/22 rounded-2xl p-12 text-center">
        <DocumentTextIcon className="w-8 h-8 text-[#10dffd]/20 mx-auto mb-3" />
        <p className="text-gray-500 text-sm font-light mb-1">
          {l ? "No documents yet." : "Sin documentos aún."}
        </p>
        <p className="text-gray-700 text-xs">
          {l ? "Your account manager will share documents here soon." : "Tu gestor de cuenta compartirá documentos aquí pronto."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">{error}</div>}

      {DOC_TYPES.map(({ id, label, Icon }) => {
        const typeDocs = docsForType(id);
        if (typeDocs.length === 0) return null;

        return (
          <motion.div key={id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="border border-[#10dffd]/22 rounded-xl overflow-hidden">
            {/* Section header */}
            <div className="flex items-center gap-2.5 px-5 py-3 border-b border-[#10dffd]/18 bg-white/[0.02]">
              <Icon className="w-4 h-4 text-[#10dffd]/60" />
              <span className="text-white text-sm font-light">{l ? label.en : label.es}</span>
              <span className="text-[10px] text-[#10dffd]/50 bg-[#10dffd]/8 rounded-full px-2 py-0.5">{typeDocs.length}</span>
            </div>

            {/* Docs */}
            <ul className="divide-y divide-white/[0.04]">
              {typeDocs.map(doc => (
                <li key={doc.id}>
                  <button
                    onClick={() => setActiveDoc(doc)}
                    className="w-full flex items-center justify-between px-5 py-3.5 gap-3 hover:bg-white/[0.03] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#10dffd12" }}>
                        <DocumentTextIcon className="w-4 h-4 text-[#10dffd]/50 group-hover:text-[#10dffd]/80 transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-gray-200 font-light group-hover:text-white transition-colors truncate">{doc.title}</p>
                        <p className="text-[10px] text-gray-700 mt-0.5">
                          {l ? "Updated" : "Actualizado"} {new Date(doc.updated_at).toLocaleDateString(l ? "en-US" : "es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 text-gray-600 group-hover:text-[#10dffd]/70 transition-colors">
                      <EyeIcon className="w-3.5 h-3.5" />
                      <span className="text-[10px] tracking-widest uppercase hidden sm:block">{l ? "View" : "Ver"}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
