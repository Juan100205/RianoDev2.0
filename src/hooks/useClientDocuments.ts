import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase";

export type DocType = "contrato" | "factura" | "preguntas" | "welcome" | "estrategia";

export interface ClientDocument {
  id: string;
  user_id: string;
  type: DocType;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useClientDocuments(clientId: string | null) {
  const [docs, setDocs] = useState<ClientDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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
        .order("updated_at", { ascending: false });
      if (err) throw err;
      setDocs((data as ClientDocument[]) ?? []);
    } catch (e: any) {
      setError(e.message ?? "Error loading documents");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => { load(); }, [load]);

  const create = useCallback(
    async (type: DocType, title: string, content: string): Promise<ClientDocument | null> => {
      if (!clientId) return null;
      setSaving(true);
      setError(null);
      try {
        const { data, error: err } = await supabase
          .from("client_documents")
          .insert({ user_id: clientId, type, title, content })
          .select()
          .single();
        if (err) throw err;
        const doc = data as ClientDocument;
        setDocs((prev) => [doc, ...prev]);
        return doc;
      } catch (e: any) {
        setError(e.message ?? "Create failed");
        return null;
      } finally {
        setSaving(false);
      }
    },
    [clientId]
  );

  const update = useCallback(
    async (id: string, title: string, content: string): Promise<boolean> => {
      setSaving(true);
      setError(null);
      try {
        const { error: err } = await supabase
          .from("client_documents")
          .update({ title, content, updated_at: new Date().toISOString() })
          .eq("id", id);
        if (err) throw err;
        setDocs((prev) =>
          prev.map((d) =>
            d.id === id ? { ...d, title, content, updated_at: new Date().toISOString() } : d
          )
        );
        return true;
      } catch (e: any) {
        setError(e.message ?? "Update failed");
        return false;
      } finally {
        setSaving(false);
      }
    },
    []
  );

  const remove = useCallback(async (id: string) => {
    setError(null);
    try {
      const { error: err } = await supabase
        .from("client_documents")
        .delete()
        .eq("id", id);
      if (err) throw err;
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch (e: any) {
      setError(e.message ?? "Delete failed");
    }
  }, []);

  const docsForType = useCallback(
    (type: DocType) => docs.filter((d) => d.type === type),
    [docs]
  );

  return { docs, loading, saving, error, create, update, remove, docsForType, reload: load };
}
