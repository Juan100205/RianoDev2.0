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
} from "@heroicons/react/24/solid";
import {
  DocumentCheckIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useClientDocuments, type DocType, type ClientDocument } from "../hooks/useClientDocuments";
import { DOC_TEMPLATES } from "../lib/docTemplates";
import type { Profile } from "../hooks/useAdminPanel";
import IsotipoBlack from "../assets/IsotipoNoBgBlack.png";

// ── Doc type metadata ────────────────────────────────────────────────────────

const DOC_TYPES: {
  id: DocType;
  label: { es: string; en: string };
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "contrato",   label: { es: "Contrato",           en: "Contract"        }, Icon: DocumentCheckIcon     },
  { id: "factura",    label: { es: "Factura",             en: "Invoice"         }, Icon: ReceiptPercentIcon    },
  { id: "preguntas",  label: { es: "Preguntas",           en: "Questions"       }, Icon: QuestionMarkCircleIcon },
  { id: "welcome",    label: { es: "Welcome Document",    en: "Welcome Document" }, Icon: StarIcon              },
  { id: "estrategia", label: { es: "Setup de Estrategia", en: "Strategy Setup"  }, Icon: ChartBarIcon          },
];

interface Props { client: Profile; l: boolean; }
type EditorMode = "list" | "edit" | "preview";

interface EditorState {
  mode: EditorMode;
  doc: ClientDocument | null;
  type: DocType;
  title: string;
  content: string;
}

// ── Print helper ─────────────────────────────────────────────────────────────

function printDocument(title: string, bodyHtml: string, logoDataUrl: string) {
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;

  win.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @page { size: A4; margin: 20mm 22mm; }

    body {
      font-family: "Georgia", "Times New Roman", serif;
      font-size: 11pt;
      color: #1a1a1a;
      line-height: 1.65;
      background: #fff;
    }

    /* ── Letterhead ── */
    .letterhead {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding-bottom: 10pt;
      border-bottom: 1.5pt solid #1a1a1a;
      margin-bottom: 22pt;
    }
    .letterhead-logo { height: 36pt; }
    .letterhead-info {
      text-align: right;
      font-size: 8pt;
      color: #555;
      line-height: 1.5;
      font-family: "Helvetica Neue", Arial, sans-serif;
    }
    .letterhead-info strong { color: #1a1a1a; font-size: 9pt; }

    /* ── Body content ── */
    h1 { font-size: 17pt; font-weight: 700; margin: 0 0 14pt; letter-spacing: -0.01em; }
    h2 { font-size: 12pt; font-weight: 600; margin: 20pt 0 6pt; border-bottom: 0.5pt solid #ddd; padding-bottom: 3pt; }
    h3 { font-size: 10.5pt; font-weight: 600; margin: 14pt 0 5pt; }
    p  { margin: 5pt 0; }
    ul, ol { padding-left: 18pt; margin: 5pt 0 5pt; }
    li { margin: 2pt 0; }

    a { color: #1a1a1a; text-decoration: underline; }
    strong { font-weight: 700; }
    em { font-style: italic; }

    hr { border: none; border-top: 0.5pt solid #ccc; margin: 16pt 0; }

    /* ── Tables ── */
    table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 9.5pt; }
    thead { background: #f0f0f0; }
    th { border: 0.5pt solid #bbb; padding: 5pt 8pt; font-weight: 600; text-align: left; }
    td { border: 0.5pt solid #bbb; padding: 4pt 8pt; vertical-align: top; }
    tr:nth-child(even) td { background: #fafafa; }

    /* ── Task list checkboxes ── */
    input[type="checkbox"] { margin-right: 5pt; accent-color: #1a1a1a; }

    /* ── Blockquote ── */
    blockquote { border-left: 3pt solid #ccc; padding-left: 10pt; color: #555; margin: 8pt 0; }

    /* ── Code ── */
    code { font-family: "Courier New", monospace; font-size: 9pt; background: #f5f5f5; padding: 1pt 4pt; border-radius: 2pt; }
    pre  { background: #f5f5f5; padding: 10pt; border-radius: 4pt; overflow-x: auto; font-size: 8.5pt; margin: 8pt 0; }

    /* ── Footer ── */
    .doc-footer {
      margin-top: 30pt;
      padding-top: 8pt;
      border-top: 0.5pt solid #ccc;
      font-size: 7.5pt;
      color: #888;
      font-family: "Helvetica Neue", Arial, sans-serif;
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
    <img src="${logoDataUrl}" class="letterhead-logo" alt="RianoDev" />
    <div class="letterhead-info">
      <strong>RianoDev — Juan Jose Riaño</strong><br/>
      juanjose@rianodev.com<br/>
      rianodev.com<br/>
      Bogotá, Colombia
    </div>
  </div>

  ${bodyHtml}

  <div class="doc-footer">
    <span>RianoDev · rianodev.com</span>
    <span>${new Date().toLocaleDateString("es-CO", { day:"2-digit", month:"long", year:"numeric" })}</span>
  </div>

  <script>
    window.onload = function() {
      window.print();
      window.onafterprint = function() { window.close(); };
    };
  </script>
</body>
</html>`);
  win.document.close();
}

// ── Document Preview (paper look) ────────────────────────────────────────────

function DocPaper({
  title,
  content,
  onPrint,
}: {
  title: string;
  content: string;
  onPrint: () => void;
}) {
  return (
    <div className="bg-neutral-200 rounded-2xl p-6 overflow-auto max-h-[72vh] scrollbar_exp">
      {/* Paper sheet */}
      <div
        className="bg-white mx-auto shadow-2xl"
        style={{ maxWidth: 720, minHeight: 900, fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {/* ── Letterhead ── */}
        <div
          className="flex items-start justify-between px-14 pt-12 pb-6"
          style={{ borderBottom: "1.5px solid #1a1a1a" }}
        >
          <img src={IsotipoBlack} alt="RianoDev" className="h-10 w-auto object-contain" />
          <div className="text-right" style={{ fontFamily: "system-ui, sans-serif", fontSize: 9 }}>
            <p className="font-semibold text-gray-900" style={{ fontSize: 10 }}>RianoDev — Juan Jose Riaño</p>
            <p className="text-gray-500">juanjose@rianodev.com</p>
            <p className="text-gray-500">rianodev.com · Bogotá, Colombia</p>
          </div>
        </div>

        {/* ── Document content ── */}
        <div
          className="px-14 py-10"
          style={{
            fontSize: 11,
            lineHeight: 1.7,
            color: "#1a1a1a",
          }}
        >
          <div
            className="
              prose prose-sm max-w-none
              prose-headings:font-serif prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-0
              prose-h2:text-base prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-1.5
              prose-h3:text-sm prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2
              prose-p:text-gray-800 prose-p:leading-relaxed prose-p:my-2 prose-p:text-[11px]
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-em:italic
              prose-a:text-gray-900 prose-a:underline
              prose-li:text-gray-800 prose-li:text-[11px] prose-li:leading-relaxed prose-li:marker:text-gray-500
              prose-ul:my-2 prose-ol:my-2
              prose-hr:border-gray-200 prose-hr:my-6
              prose-blockquote:border-l-gray-300 prose-blockquote:text-gray-500 prose-blockquote:not-italic prose-blockquote:pl-4
              prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[9px] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded prose-pre:text-[9px]
              prose-table:text-[10px] prose-table:border-collapse
              prose-thead:bg-gray-50
              prose-th:border prose-th:border-gray-300 prose-th:px-3 prose-th:py-1.5 prose-th:text-gray-800 prose-th:font-semibold prose-th:text-left
              prose-td:border prose-td:border-gray-200 prose-td:px-3 prose-td:py-1.5 prose-td:text-gray-700 prose-td:align-top
            "
          >
            <h1 style={{ fontFamily: "Georgia, serif" }}>{title}</h1>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                input: ({ ...props }) => (
                  <input
                    {...props}
                    className="mr-1.5 accent-gray-800"
                    style={{ width: 13, height: 13 }}
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {/* ── Document footer ── */}
        <div
          className="flex items-center justify-between px-14 py-5 mt-4"
          style={{
            borderTop: "0.5px solid #d1d5db",
            fontFamily: "system-ui, sans-serif",
            fontSize: 8,
            color: "#9ca3af",
          }}
        >
          <span>RianoDev · rianodev.com</span>
          <span>
            {new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* Print button below paper */}
      <div className="flex justify-center mt-5">
        <button
          onClick={onPrint}
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-black bg-[#10dffd] px-5 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
        >
          <PrinterIcon className="w-3.5 h-3.5" />
          {" Descargar / Imprimir PDF"}
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ClientDocPanel({ client, l }: Props) {
  const { loading, saving, error, create, update, remove, docsForType } =
    useClientDocuments(client.id);

  const [editor, setEditor] = useState<EditorState | null>(null);
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
    if (editor.doc) {
      await update(editor.doc.id, editor.title, editor.content);
    } else {
      await create(editor.type, editor.title, editor.content);
    }
    setEditor(null);
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    setConfirmDeleteId(null);
  };

  // Convert logo to data URL for the print window (avoids CORS/path issues)
  const getLogoDataUrl = (): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d")!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => resolve("");
      img.src = IsotipoBlack;
    });

  const handlePrint = async () => {
    if (!editor) return;
    const logoUrl = await getLogoDataUrl();

    // Render the markdown to HTML via a temporary div
    const tmp = document.createElement("div");
    tmp.innerHTML = previewRef.current?.querySelector(".prose")?.innerHTML ?? "";
    const bodyHtml = `<h1 style="font-size:17pt;font-weight:700;margin:0 0 14pt;font-family:Georgia,serif">${editor.title}</h1>${tmp.innerHTML}`;

    printDocument(editor.title, bodyHtml, logoUrl);
  };

  // ── Editor / Preview overlay ─────────────────────────────────────────────

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
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => setEditor(null)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            {l ? "Back" : "Volver"}
          </button>

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
              {l ? "Preview" : "Vista previa"}
            </button>
          </div>

          {editor.mode === "edit" && (
            <button
              onClick={handleSave}
              disabled={saving || !editor.title.trim()}
              className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <div className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <CheckIcon className="w-3 h-3" />
              )}
              {saving ? (l ? "Saving…" : "Guardando…") : (l ? "Save" : "Guardar")}
            </button>
          )}

          {editor.mode === "preview" && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
            >
              <PrinterIcon className="w-3 h-3" />
              PDF
            </button>
          )}
        </div>

        {/* Doc type badge */}
        <div className="flex items-center gap-2">
          {typeLabel && <typeLabel.Icon className="w-4 h-4 text-[#10dffd]/50" />}
          <span className="text-[10px] tracking-widest uppercase text-[#10dffd]/50">
            {l ? typeLabel?.label.en : typeLabel?.label.es}
          </span>
        </div>

        {error && (
          <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">{error}</div>
        )}

        {/* ── EDIT MODE ── */}
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
              rows={30}
              placeholder={l ? "Write in Markdown…" : "Escribe en Markdown…"}
              className="w-full bg-white/[0.03] border border-[#10dffd]/10 rounded-xl px-5 py-4 text-gray-300 text-xs font-mono leading-relaxed placeholder-gray-700 focus:outline-none focus:border-[#10dffd]/30 transition-colors resize-none scrollbar_exp"
            />
            <p className="text-gray-700 text-[10px]">
              {l
                ? "Markdown: **bold**, # Heading, | table |, - [ ] checkbox, > quote"
                : "Markdown: **negrita**, # Título, | tabla |, - [ ] checkbox, > cita"}
            </p>
          </div>
        )}

        {/* ── PREVIEW MODE — paper document ── */}
        {editor.mode === "preview" && (
          <div ref={previewRef}>
            <DocPaper
              title={editor.title}
              content={editor.content}
              onPrint={handlePrint}
            />
          </div>
        )}
      </motion.div>
    );
  }

  // ── Document list ────────────────────────────────────────────────────────

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
            {/* Section header */}
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
                className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
              >
                <PlusIcon className="w-3 h-3" />
                {l ? "New" : "Crear"}
              </button>
            </div>

            {/* Doc list */}
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
                      className="flex items-center gap-2.5 min-w-0 text-left hover:text-[#10dffd] transition-colors group"
                    >
                      <DocumentTextIcon className="w-3.5 h-3.5 text-[#10dffd]/40 shrink-0 group-hover:text-[#10dffd]/70" />
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
                        title={l ? "Preview" : "Vista previa"}
                      >
                        <EyeIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEdit(doc)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-white transition-colors cursor-pointer"
                        title={l ? "Edit" : "Editar"}
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
