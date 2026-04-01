import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
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

// ── Doc type metadata ────────────────────────────────────────────────────────

const DOC_TYPES: {
  id: DocType;
  label: { es: string; en: string };
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "contrato",   label: { es: "Contrato",           en: "Contract"        }, Icon: DocumentCheckIcon    },
  { id: "factura",    label: { es: "Factura",             en: "Invoice"         }, Icon: ReceiptPercentIcon   },
  { id: "preguntas",  label: { es: "Preguntas",           en: "Questions"       }, Icon: QuestionMarkCircleIcon },
  { id: "welcome",    label: { es: "Welcome Document",    en: "Welcome Document" }, Icon: StarIcon             },
  { id: "estrategia", label: { es: "Setup de Estrategia", en: "Strategy Setup"  }, Icon: ChartBarIcon         },
];

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  client: Profile;
  l: boolean;
}

// ── Editor state ─────────────────────────────────────────────────────────────

type EditorMode = "list" | "edit" | "preview";

interface EditorState {
  mode: EditorMode;
  doc: ClientDocument | null;   // null = new doc
  type: DocType;
  title: string;
  content: string;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ClientDocPanel({ client, l }: Props) {
  const { loading, saving, error, create, update, remove, docsForType } =
    useClientDocuments(client.id);

  const [editor, setEditor] = useState<EditorState | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Open editor for new doc from template
  const openNew = (type: DocType) => {
    const tpl = DOC_TEMPLATES[type];
    setEditor({ mode: "edit", doc: null, type, title: tpl.title, content: tpl.content });
  };

  // Open editor to edit existing doc
  const openEdit = (doc: ClientDocument) => {
    setEditor({ mode: "edit", doc, type: doc.type, title: doc.title, content: doc.content });
  };

  // Open preview for existing doc
  const openPreview = (doc: ClientDocument) => {
    setEditor({ mode: "preview", doc, type: doc.type, title: doc.title, content: doc.content });
  };

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
        {/* Editor top bar */}
        <div className="flex items-center justify-between gap-3">
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
              rows={28}
              placeholder={l ? "Write in Markdown…" : "Escribe en Markdown…"}
              className="w-full bg-white/[0.03] border border-[#10dffd]/10 rounded-xl px-5 py-4 text-gray-300 text-xs font-mono leading-relaxed placeholder-gray-700 focus:outline-none focus:border-[#10dffd]/30 transition-colors resize-none scrollbar_exp"
            />
            <p className="text-gray-700 text-[10px]">
              {l ? "Supports Markdown — use ** bold **, # headings, | tables |, - lists" : "Soporta Markdown — usa ** negrita **, # títulos, | tablas |, - listas"}
            </p>
          </div>
        )}

        {/* ── PREVIEW MODE ── */}
        {editor.mode === "preview" && (
          <div className="border border-white/5 rounded-2xl p-8 prose prose-invert prose-sm max-w-none
            prose-headings:font-light prose-headings:tracking-tight prose-headings:text-white
            prose-h1:text-2xl prose-h1:mb-6 prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4
            prose-h2:text-base prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-white/8 prose-h2:pb-2
            prose-h3:text-sm prose-h3:mt-5 prose-h3:mb-2
            prose-p:text-gray-400 prose-p:leading-relaxed prose-p:text-sm prose-p:my-2
            prose-a:text-[#10dffd] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-medium
            prose-code:text-[#10dffd]/80 prose-code:bg-[#10dffd]/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/8 prose-pre:rounded-xl prose-pre:text-xs
            prose-li:text-gray-400 prose-li:text-sm prose-li:marker:text-[#10dffd]/40
            prose-ul:my-2 prose-ol:my-2
            prose-hr:border-white/8 prose-hr:my-6
            prose-table:text-xs prose-thead:border-white/10 prose-tbody:border-white/5
            prose-th:text-[#10dffd]/60 prose-th:font-normal prose-th:tracking-wider prose-th:uppercase prose-th:text-[10px]
            prose-td:text-gray-400 prose-td:py-2
            prose-blockquote:border-l-[#10dffd]/30 prose-blockquote:text-gray-500"
          >
            <h1 className="!text-white">{editor.title}</h1>
            <ReactMarkdown>{editor.content}</ReactMarkdown>
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
                  {l ? "No documents yet. Click 'New' to create from template." : "Sin documentos. Haz clic en 'Crear' para usar la plantilla."}
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
                              title={l ? "Confirm delete" : "Confirmar borrado"}
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
                            title={l ? "Delete" : "Eliminar"}
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
