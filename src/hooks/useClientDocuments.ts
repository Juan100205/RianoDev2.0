import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase";

export type DocType = "contrato" | "factura" | "preguntas" | "welcome" | "estrategia";

export interface ClientDocument {
  id: string;
  user_id: string;
  type: DocType;
  file_name: string;
  file_url: string;
  uploaded_at: string;
}

export function useClientDocuments(clientId: string | null) {
  const [docs, setDocs] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<DocType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!clientId) { setDocs([]); return; }
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("client_documents")
        .select("*")
        .eq("user_id", clientId)
        .order("uploaded_at", { ascending: false });
      if (err) throw err;
      setDocs((data as ClientDocument[]) ?? []);
    } catch (e: any) {
      setError(e.message ?? "Error loading documents");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => { load(); }, [load]);

  const upload = useCallback(
    async (type: DocType, file: File) => {
      if (!clientId) return;
      setUploading(type);
      setError(null);
      try {
        const ext = file.name.split(".").pop();
        const path = `${clientId}/${type}/${Date.now()}.${ext}`;

        const { error: storageErr } = await supabase.storage
          .from("client-documents")
          .upload(path, file, { upsert: false });
        if (storageErr) throw storageErr;

        const { data: { publicUrl } } = supabase.storage
          .from("client-documents")
          .getPublicUrl(path);

        const { error: dbErr } = await supabase.from("client_documents").insert({
          user_id: clientId,
          type,
          file_name: file.name,
          file_url: publicUrl,
        });
        if (dbErr) throw dbErr;

        await load();
      } catch (e: any) {
        setError(e.message ?? "Upload failed");
      } finally {
        setUploading(null);
      }
    },
    [clientId, load]
  );

  const remove = useCallback(
    async (doc: ClientDocument) => {
      setError(null);
      try {
        // Extract storage path from public URL
        const url = new URL(doc.file_url);
        const pathParts = url.pathname.split("/client-documents/");
        if (pathParts[1]) {
          await supabase.storage
            .from("client-documents")
            .remove([decodeURIComponent(pathParts[1])]);
        }

        const { error: dbErr } = await supabase
          .from("client_documents")
          .delete()
          .eq("id", doc.id);
        if (dbErr) throw dbErr;

        setDocs((prev) => prev.filter((d) => d.id !== doc.id));
      } catch (e: any) {
        setError(e.message ?? "Delete failed");
      }
    },
    []
  );

  const docsForType = useCallback(
    (type: DocType) => docs.filter((d) => d.type === type),
    [docs]
  );

  return { docs, loading, uploading, error, upload, remove, docsForType, reload: load };
}
