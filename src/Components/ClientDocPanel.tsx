import { useRef } from "react";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import {
  DocumentCheckIcon,
  ReceiptPercentIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useClientDocuments, type DocType } from "../hooks/useClientDocuments";
import type { Profile } from "../hooks/useAdminPanel";

const DOC_TYPES: {
  id: DocType;
  label: { es: string; en: string };
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "contrato",   label: { es: "Contrato",           en: "Contract"       }, Icon: DocumentCheckIcon    },
  { id: "factura",    label: { es: "Factura",             en: "Invoice"        }, Icon: ReceiptPercentIcon   },
  { id: "preguntas",  label: { es: "Preguntas",           en: "Questions"      }, Icon: QuestionMarkCircleIcon },
  { id: "welcome",    label: { es: "Welcome Document",    en: "Welcome Document" }, Icon: StarIcon            },
  { id: "estrategia", label: { es: "Setup de Estrategia", en: "Strategy Setup" }, Icon: ChartBarIcon         },
];

interface Props {
  client: Profile;
  l: boolean;
}

export default function ClientDocPanel({ client, l }: Props) {
  const { loading, uploading, error, upload, remove, docsForType } =
    useClientDocuments(client.id);

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
        <div className="border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs">
          {error}
        </div>
      )}

      {DOC_TYPES.map(({ id, label, Icon }) => (
        <DocTypeSection
          key={id}
          type={id}
          label={l ? label.en : label.es}
          Icon={Icon}
          docs={docsForType(id)}
          uploading={uploading === id}
          onUpload={(file) => upload(id, file)}
          onRemove={remove}
          l={l}
        />
      ))}
    </div>
  );
}

// ── DocTypeSection ────────────────────────────────────────────────────────────

import type { ClientDocument } from "../hooks/useClientDocuments";

function DocTypeSection({
  label,
  Icon,
  docs,
  uploading,
  onUpload,
  onRemove,
  l,
}: {
  type: DocType;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  docs: ClientDocument[];
  uploading: boolean;
  onUpload: (file: File) => void;
  onRemove: (doc: ClientDocument) => void;
  l: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-[#10dffd]/10 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#10dffd]/8 bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 text-[#10dffd]/60" />
          <span className="text-white text-sm font-light">{label}</span>
          {docs.length > 0 && (
            <span className="text-[10px] text-[#10dffd]/50 bg-[#10dffd]/8 rounded-full px-2 py-0.5">
              {docs.length}
            </span>
          )}
        </div>

        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-black bg-[#10dffd] px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {uploading ? (
            <div className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <ArrowUpTrayIcon className="w-3 h-3" />
          )}
          {uploading
            ? (l ? "Uploading…" : "Subiendo…")
            : (l ? "Upload" : "Subir")}
        </button>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* Doc list */}
      {docs.length === 0 ? (
        <div className="flex items-center gap-2 px-5 py-4">
          <DocumentTextIcon className="w-3.5 h-3.5 text-white/10 shrink-0" />
          <p className="text-gray-700 text-xs">
            {l ? "No documents uploaded yet." : "Sin documentos subidos aún."}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.04]">
          {docs.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between px-5 py-3 gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <DocumentTextIcon className="w-3.5 h-3.5 text-[#10dffd]/40 shrink-0" />
                <span className="text-xs text-gray-300 font-light truncate">{doc.file_name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-gray-700 text-[10px] hidden sm:block">
                  {new Date(doc.uploaded_at).toLocaleDateString(l ? "en-US" : "es-CO", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </span>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#10dffd] transition-colors"
                  title={l ? "Open" : "Abrir"}
                >
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => onRemove(doc)}
                  className="p-1.5 rounded-lg text-gray-700 hover:text-red-400 transition-colors cursor-pointer"
                  title={l ? "Delete" : "Eliminar"}
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
