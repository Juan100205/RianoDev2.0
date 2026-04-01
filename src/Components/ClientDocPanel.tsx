import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  DocumentTextIcon,
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
import {
  useClientDocuments,
  type DocType,
  type ClientDocument,
} from "../hooks/useClientDocuments";
import { DOC_TEMPLATES } from "../lib/docTemplates";
import type { Profile } from "../hooks/useAdminPanel";
import IsotipoBlack from "../assets/IsotipoNoBgBlack.png";

// ── Types ─────────────────────────────────────────────────────────────────────

interface DocTheme {
  id: string;
  label: string;
  accent: string;       // main brand color (headings, borders)
  accentMid: string;    // medium — table headers bg
  accentLight: string;  // light — stripe rows bg
  accentText: string;   // text on accent bg
  dot: string;          // swatch dot color (CSS)
}

const DOC_THEMES: DocTheme[] = [
  {
    id: "clasico",
    label: "Clásico",
    accent: "#1a1a1a",
    accentMid: "#f0f0f0",
    accentLight: "#fafafa",
    accentText: "#1a1a1a",
    dot: "#1a1a1a",
  },
  {
    id: "navy",
    label: "Navy",
    accent: "#1e3a5f",
    accentMid: "#dde9f5",
    accentLight: "#f0f6fb",
    accentText: "#1e3a5f",
    dot: "#1e3a5f",
  },
  {
    id: "esmeralda",
    label: "Esmeralda",
    accent: "#1a4731",
    accentMid: "#d6ebe0",
    accentLight: "#eef7f1",
    accentText: "#1a4731",
    dot: "#1a4731",
  },
  {
    id: "borgona",
    label: "Borgoña",
    accent: "#7a1a2e",
    accentMid: "#f0d9de",
    accentLight: "#faf2f3",
    accentText: "#7a1a2e",
    dot: "#7a1a2e",
  },
  {
    id: "slate",
    label: "Slate",
    accent: "#334155",
    accentMid: "#e2e8f0",
    accentLight: "#f8fafc",
    accentText: "#334155",
    dot: "#334155",
  },
];

// ── Doc type metadata ─────────────────────────────────────────────────────────

const DOC_TYPES: {
  id: DocType;
  label: { es: string; en: string };
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "contrato",   label: { es: "Contrato",           en: "Contract"         }, Icon: DocumentCheckIcon     },
  { id: "factura",    label: { es: "Factura",             en: "Invoice"          }, Icon: ReceiptPercentIcon    },
  { id: "preguntas",  label: { es: "Preguntas",           en: "Questions"        }, Icon: QuestionMarkCircleIcon },
  { id: "welcome",    label: { es: "Welcome Document",    en: "Welcome Document" }, Icon: StarIcon              },
  { id: "estrategia", label: { es: "Setup de Estrategia", en: "Strategy Setup"   }, Icon: ChartBarIcon          },
];

interface Props { client: Profile; l: boolean; }
type EditorMode = "edit" | "preview";

interface EditorState {
  mode: EditorMode;
  doc: ClientDocument | null;
  type: DocType;
  title: string;
  content: string;
}

// ── Print helper ──────────────────────────────────────────────────────────────

function printDocument(title: string, bodyHtml: string, logoUrl: string, theme: DocTheme) {
  const win = window.open("", "_blank", "width=920,height=760");
  if (!win) return;

  win.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    @page { size: A4; margin: 18mm 22mm 20mm; }

    body {
      font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
      font-size: 10.5pt;
      color: #1a1a1a;
      line-height: 1.8;
      background: #fff;
    }

    /* ── Letterhead ── */
    .letterhead {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding-bottom: 10pt;
      border-bottom: 2pt solid ${theme.accent};
      margin-bottom: 26pt;
    }
    .logo { height: 32pt; }
    .lh-info {
      text-align: right;
      font-size: 7.5pt;
      color: #777;
      line-height: 1.6;
    }
    .lh-info strong { color: ${theme.accent}; font-size: 8.5pt; font-weight: 600; display: block; margin-bottom: 1pt; }

    /* ── Headings ── */
    h1 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 20pt;
      font-weight: 400;
      color: ${theme.accent};
      margin: 0 0 18pt;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }
    h2 {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 12pt;
      font-weight: 400;
      color: ${theme.accent};
      margin: 22pt 0 7pt;
      padding-bottom: 4pt;
      border-bottom: 0.75pt solid ${theme.accent}33;
      letter-spacing: 0.01em;
    }
    h3 {
      font-family: 'DM Sans', sans-serif;
      font-size: 10pt;
      font-weight: 600;
      color: ${theme.accent};
      margin: 14pt 0 5pt;
    }

    /* ── Body ── */
    p  { margin: 5pt 0; line-height: 1.8; }
    ul, ol { padding-left: 16pt; margin: 4pt 0; }
    li { margin: 2.5pt 0; line-height: 1.7; }
    strong { font-weight: 600; color: #111; }
    em { font-style: italic; }
    a  { color: ${theme.accent}; }
    hr { border: none; border-top: 0.5pt solid #ddd; margin: 14pt 0; }

    blockquote {
      border-left: 2.5pt solid ${theme.accent}55;
      padding: 4pt 10pt;
      color: #666;
      font-style: italic;
      margin: 8pt 0;
      background: ${theme.accentLight};
    }

    /* ── Tables ── */
    table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 9pt; }
    thead tr { background: ${theme.accentMid}; }
    th {
      border: 0.5pt solid ${theme.accent}44;
      padding: 5pt 9pt;
      font-weight: 600;
      text-align: left;
      color: ${theme.accent};
      font-size: 8pt;
      letter-spacing: 0.03em;
    }
    td {
      border: 0.5pt solid #ddd;
      padding: 4.5pt 9pt;
      vertical-align: top;
      line-height: 1.6;
    }
    tr:nth-child(even) td { background: ${theme.accentLight}; }

    /* ── Task list ── */
    input[type="checkbox"] { margin-right: 5pt; accent-color: ${theme.accent}; }

    /* ── Code ── */
    code {
      font-family: 'Courier New', monospace;
      font-size: 8.5pt;
      background: ${theme.accentLight};
      color: ${theme.accentText};
      padding: 1pt 4pt;
      border-radius: 2pt;
    }
    pre {
      background: ${theme.accentLight};
      border: 0.5pt solid ${theme.accent}22;
      padding: 9pt;
      border-radius: 3pt;
      overflow-x: auto;
      font-size: 8pt;
      margin: 8pt 0;
      line-height: 1.6;
    }

    /* ── Footer ── */
    .doc-footer {
      margin-top: 28pt;
      padding-top: 7pt;
      border-top: 0.5pt solid #ccc;
      font-size: 7pt;
      color: #aaa;
      display: flex;
      justify-content: space-between;
    }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="letterhead">
    <img src="${logoUrl}" class="logo" alt="RianoDev"/>
    <div class="lh-info">
      <strong>RianoDev — Juan Jose Riaño</strong>
      juanjose@rianodev.com<br/>
      rianodev.com &nbsp;·&nbsp; Bogotá, Colombia
    </div>
  </div>
  ${bodyHtml}
  <div class="doc-footer">
    <span>RianoDev &nbsp;·&nbsp; rianodev.com</span>
    <span>${new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}</span>
  </div>
  <script>window.onload=()=>{window.print();window.onafterprint=()=>window.close();}<\/script>
</body>
</html>`);
  win.document.close();
}

// ── DocPaper ──────────────────────────────────────────────────────────────────

function DocPaper({
  title,
  content,
  theme,
  onPrint,
}: {
  title: string;
  content: string;
  theme: DocTheme;
  onPrint: () => void;
}) {
  return (
    <div className="rounded-2xl p-6 overflow-auto max-h-[74vh] scrollbar_exp" style={{ background: "#e5e7eb" }}>
      {/* Paper */}
      <div
        className="mx-auto bg-white shadow-2xl"
        style={{
          maxWidth: 740,
          minHeight: 960,
          fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* ── Letterhead ── */}
        <div
          className="flex items-start justify-between px-14 pt-12 pb-7"
          style={{ borderBottom: `2px solid ${theme.accent}` }}
        >
          <img src={IsotipoBlack} alt="RianoDev" className="h-9 w-auto object-contain" />
          <div style={{ fontFamily: "'DM Sans', sans-serif", textAlign: "right", lineHeight: 1.6 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: theme.accent, marginBottom: 2 }}>
              RianoDev — Juan Jose Riaño
            </p>
            <p style={{ fontSize: 8.5, color: "#888" }}>juanjose@rianodev.com</p>
            <p style={{ fontSize: 8.5, color: "#888" }}>rianodev.com · Bogotá, Colombia</p>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-14 py-10">
          {/* Title */}
          <h1
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 26,
              fontWeight: 400,
              color: theme.accent,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 28,
            }}
          >
            {title}
          </h1>

          {/* Markdown body */}
          <div
            style={{
              fontSize: 11,
              lineHeight: 1.85,
              color: "#1a1a1a",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: 17,
                      fontWeight: 400,
                      color: theme.accent,
                      marginTop: 32,
                      marginBottom: 10,
                      paddingBottom: 6,
                      borderBottom: `1px solid ${theme.accent}30`,
                      letterSpacing: "0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h2
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: 14,
                      fontWeight: 400,
                      color: theme.accent,
                      marginTop: 28,
                      marginBottom: 8,
                      paddingBottom: 5,
                      borderBottom: `0.75px solid ${theme.accent}30`,
                      letterSpacing: "0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: theme.accent,
                      marginTop: 20,
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p style={{ margin: "7px 0", lineHeight: 1.85, fontSize: 11, color: "#2a2a2a" }}>
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong style={{ fontWeight: 600, color: "#111" }}>{children}</strong>
                ),
                hr: () => (
                  <hr style={{ border: "none", borderTop: "0.75px solid #ddd", margin: "20px 0" }} />
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      borderLeft: `2.5px solid ${theme.accent}66`,
                      paddingLeft: 14,
                      paddingTop: 4,
                      paddingBottom: 4,
                      marginTop: 10,
                      marginBottom: 10,
                      color: "#666",
                      fontStyle: "italic",
                      background: theme.accentLight,
                      borderRadius: "0 4px 4px 0",
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul style={{ paddingLeft: 20, margin: "6px 0", lineHeight: 1.85 }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ paddingLeft: 20, margin: "6px 0", lineHeight: 1.85 }}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li style={{ margin: "3px 0", lineHeight: 1.8, fontSize: 11, color: "#2a2a2a" }}>
                    {children}
                  </li>
                ),
                table: ({ children }) => (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      margin: "14px 0",
                      fontSize: 10,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {children}
                  </table>
                ),
                thead: ({ children }) => (
                  <thead style={{ background: theme.accentMid }}>{children}</thead>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      border: `0.75px solid ${theme.accent}44`,
                      padding: "6px 10px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: theme.accentText,
                      fontSize: 9,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    style={{
                      border: "0.75px solid #e2e2e2",
                      padding: "5.5px 10px",
                      verticalAlign: "top",
                      lineHeight: 1.65,
                      color: "#333",
                    }}
                  >
                    {children}
                  </td>
                ),
                code: ({ children }) => (
                  <code
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 9.5,
                      background: theme.accentLight,
                      color: theme.accentText,
                      padding: "1px 5px",
                      borderRadius: 3,
                    }}
                  >
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre
                    style={{
                      background: theme.accentLight,
                      border: `0.75px solid ${theme.accent}20`,
                      padding: "10px 14px",
                      borderRadius: 5,
                      fontSize: 9,
                      overflowX: "auto",
                      margin: "10px 0",
                      lineHeight: 1.65,
                    }}
                  >
                    {children}
                  </pre>
                ),
                input: ({ ...props }) => (
                  <input
                    {...props}
                    style={{
                      width: 13,
                      height: 13,
                      marginRight: 6,
                      accentColor: theme.accent,
                    }}
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-between px-14 py-5"
          style={{
            borderTop: "0.75px solid #e2e2e2",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 8,
            color: "#b0b0b0",
            marginTop: 16,
          }}
        >
          <span>RianoDev · rianodev.com</span>
          <span>
            {new Date().toLocaleDateString("es-CO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Controls below paper */}
      <div className="flex justify-center mt-5">
        <button
          onClick={onPrint}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-black bg-[#10dffd] px-5 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
        >
          <PrinterIcon className="w-3.5 h-3.5" />
          Descargar / Imprimir PDF
        </button>
      </div>
    </div>
  );
}

// ── ThemePicker ───────────────────────────────────────────────────────────────

function ThemePicker({
  current,
  onChange,
}: {
  current: DocTheme;
  onChange: (t: DocTheme) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all cursor-pointer"
      >
        <SwatchIcon className="w-3 h-3" />
        {current.label}
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: current.dot }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute right-0 top-full mt-2 z-20 bg-black border border-white/10 rounded-xl p-2 flex flex-col gap-1 min-w-[140px] shadow-xl"
          >
            {DOC_THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => { onChange(t); setOpen(false); }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all cursor-pointer text-left ${
                  current.id === t.id
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0 border border-white/10"
                  style={{ background: t.dot }}
                />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ClientDocPanel({ client, l }: Props) {
  const { loading, saving, error, create, update, remove, docsForType } =
    useClientDocuments(client.id);

  const [editor, setEditor] = useState<EditorState | null>(null);
  const [theme, setTheme] = useState<DocTheme>(DOC_THEMES[0]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const openNew = (type: DocType) => {
    const tpl = DOC_TEMPLATES[type];
    setEditor({ mode: "edit", doc: null, type, title: tpl.title, content: tpl.content });
  };
  const openEdit = (doc: ClientDocument) =>
    setEditor({ mode: "edit", doc, type: doc.type, title: doc.title, content: doc.content });
  const openPreview = (doc: ClientDocument) =>
    setEditor({ mode: "preview", doc, type: doc.type, title: doc.title, content: doc.content });

  const handleSave = async () => {
    if (!editor) return;
    if (editor.doc) await update(editor.doc.id, editor.title, editor.content);
    else await create(editor.type, editor.title, editor.content);
    setEditor(null);
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    setConfirmDeleteId(null);
  };

  const getLogoDataUrl = (): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        c.getContext("2d")!.drawImage(img, 0, 0);
        resolve(c.toDataURL("image/png"));
      };
      img.onerror = () => resolve("");
      img.src = IsotipoBlack;
    });

  const handlePrint = async () => {
    if (!editor) return;
    const logoUrl = await getLogoDataUrl();
    const prose = previewRef.current?.querySelector("[data-prose]");
    const bodyHtml = `<h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:20pt;font-weight:400;color:${theme.accent};margin:0 0 18pt;line-height:1.2;letter-spacing:-0.02em">${editor.title}</h1>${prose?.innerHTML ?? ""}`;
    printDocument(editor.title, bodyHtml, logoUrl, theme);
  };

  // ── Editor / Preview ─────────────────────────────────────────────────────

  if (editor) {
    const typeLabel = DOC_TYPES.find((t) => t.id === editor.type);
    return (
      <motion.div
        key="editor"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-4"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button
            onClick={() => setEditor(null)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            {l ? "Back" : "Volver"}
          </button>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Theme picker */}
            <ThemePicker current={theme} onChange={setTheme} />

            {/* Edit / Preview toggle */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
              <button
                onClick={() => setEditor((s) => s && { ...s, mode: "edit" })}
                className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  editor.mode === "edit"
                    ? "bg-[#10dffd] text-black font-medium"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <PencilSquareIcon className="w-3 h-3" />
                {l ? "Edit" : "Editar"}
              </button>
              <button
                onClick={() => setEditor((s) => s && { ...s, mode: "preview" })}
                className={`flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  editor.mode === "preview"
                    ? "bg-[#10dffd] text-black font-medium"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <EyeIcon className="w-3 h-3" />
                {l ? "Preview" : "Preview"}
              </button>
            </div>

            {/* Save */}
            {editor.mode === "edit" && (
              <button
                onClick={handleSave}
                disabled={saving || !editor.title.trim()}
                className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-4 py-1.5 rounded-full hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                {saving
                  ? <div className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
                  : <CheckIcon className="w-3 h-3" />}
                {saving ? (l ? "Saving…" : "Guardando…") : (l ? "Save" : "Guardar")}
              </button>
            )}

            {/* PDF */}
            {editor.mode === "preview" && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-4 py-1.5 rounded-full hover:opacity-90 cursor-pointer"
              >
                <PrinterIcon className="w-3 h-3" />
                PDF
              </button>
            )}
          </div>
        </div>

        {/* Type badge */}
        <div className="flex items-center gap-2">
          {typeLabel && <typeLabel.Icon className="w-4 h-4 text-[#10dffd]/50" />}
          <span className="text-[10px] tracking-widest uppercase text-[#10dffd]/50">
            {l ? typeLabel?.label.en : typeLabel?.label.es}
          </span>
          {editor.mode === "preview" && (
            <span
              className="ml-1 text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: `${theme.accent}22`, color: theme.accent, fontFamily: "'DM Sans', sans-serif" }}
            >
              {theme.label}
            </span>
          )}
        </div>

        {error && (
          <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">{error}</div>
        )}

        {/* ── EDIT ── */}
        {editor.mode === "edit" && (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={editor.title}
              onChange={(e) => setEditor((s) => s && { ...s, title: e.target.value })}
              placeholder={l ? "Document title…" : "Título del documento…"}
              className="w-full bg-white/[0.04] border border-[#10dffd]/15 rounded-xl px-4 py-2.5 text-white text-sm font-light placeholder-gray-600 focus:outline-none focus:border-[#10dffd]/40 transition-colors"
            />
            <textarea
              value={editor.content}
              onChange={(e) => setEditor((s) => s && { ...s, content: e.target.value })}
              rows={32}
              placeholder={l ? "Write in Markdown…" : "Escribe en Markdown…"}
              className="w-full bg-white/[0.03] border border-[#10dffd]/10 rounded-xl px-5 py-4 text-gray-300 text-xs font-mono leading-loose placeholder-gray-700 focus:outline-none focus:border-[#10dffd]/30 transition-colors resize-none scrollbar_exp"
            />
            <p className="text-gray-700 text-[10px]">
              Markdown: <code className="text-[#10dffd]/50">**negrita**</code> &nbsp;
              <code className="text-[#10dffd]/50"># Título</code> &nbsp;
              <code className="text-[#10dffd]/50">| tabla |</code> &nbsp;
              <code className="text-[#10dffd]/50">- [ ] checkbox</code> &nbsp;
              <code className="text-[#10dffd]/50">&gt; cita</code>
            </p>
          </div>
        )}

        {/* ── PREVIEW — paper document ── */}
        {editor.mode === "preview" && (
          <div ref={previewRef}>
            {/* Hidden prose for print extraction */}
            <span data-prose className="hidden">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{editor.content}</ReactMarkdown>
            </span>
            <DocPaper title={editor.title} content={editor.content} theme={theme} onPrint={handlePrint} />
          </div>
        )}
      </motion.div>
    );
  }

  // ── Document list ─────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10dffd]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">{error}</div>
      )}

      {DOC_TYPES.map(({ id, label, Icon }) => {
        const typeDocs = docsForType(id);
        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#10dffd]/10 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#10dffd]/8 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-[#10dffd]/60" />
                <span className="text-white text-sm font-light">{l ? label.en : label.es}</span>
                {typeDocs.length > 0 && (
                  <span className="text-[10px] text-[#10dffd]/50 bg-[#10dffd]/8 rounded-full px-2 py-0.5">
                    {typeDocs.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => openNew(id)}
                className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-3 py-1.5 rounded-full hover:opacity-90 cursor-pointer"
              >
                <PlusIcon className="w-3 h-3" />
                {l ? "New" : "Crear"}
              </button>
            </div>

            {typeDocs.length === 0 ? (
              <div className="flex items-center gap-2 px-5 py-4">
                <DocumentTextIcon className="w-3.5 h-3.5 text-white/10 shrink-0" />
                <p className="text-gray-700 text-xs">
                  {l
                    ? "No documents yet. Click 'New' to create from template."
                    : "Sin documentos. Haz clic en 'Crear' para usar la plantilla."}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.04]">
                {typeDocs.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between px-5 py-3 gap-3">
                    <button
                      onClick={() => openPreview(doc)}
                      className="flex items-center gap-2.5 min-w-0 text-left group"
                    >
                      <DocumentTextIcon className="w-3.5 h-3.5 text-[#10dffd]/40 shrink-0 group-hover:text-[#10dffd]/70 transition-colors" />
                      <div className="min-w-0">
                        <span className="text-xs text-gray-300 font-light group-hover:text-white transition-colors truncate block">
                          {doc.title}
                        </span>
                        <span className="text-[10px] text-gray-700">
                          {new Date(doc.updated_at).toLocaleDateString(l ? "en-US" : "es-CO", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </span>
                      </div>
                    </button>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openPreview(doc)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-[#10dffd] transition-colors cursor-pointer"
                      >
                        <EyeIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEdit(doc)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-white transition-colors cursor-pointer"
                      >
                        <PencilSquareIcon className="w-3.5 h-3.5" />
                      </button>
                      <AnimatePresence mode="wait">
                        {confirmDeleteId === doc.id ? (
                          <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-1"
                          >
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            >
                              <CheckIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="p-1.5 rounded-lg text-gray-600 hover:text-white transition-colors cursor-pointer"
                            >
                              <XMarkIcon className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button
                            key="delete"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmDeleteId(doc.id)}
                            className="p-1.5 rounded-lg text-gray-700 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
