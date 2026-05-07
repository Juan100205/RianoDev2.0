import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { AiWorkflow } from "./useWorkflows";

function sanitize(text: string | null | undefined): string {
  if (!text) return '';
  const t = text.trim();
  return t.startsWith('=') ? t.substring(1).trim() : t;
}

export function useUserWorkflows(userId: string | null) {
  const [workflows, setWorkflows] = useState<AiWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setWorkflows([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    supabase
      .from("user_workflow_access")
      .select("workflow_id, ai_workflows(*)")
      .eq("user_id", userId)
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          const mapped = (data ?? [])
            .map((row: any) => row.ai_workflows as AiWorkflow)
            .filter(Boolean)
            .map((wf) => ({
              ...wf,
              name: sanitize(wf.name),
              description: wf.description ? sanitize(wf.description) : null,
              phone_number: wf.phone_number ? sanitize(wf.phone_number) : null,
            }));
          setWorkflows(mapped);
        }
        setLoading(false);
      });
  }, [userId]);

  return { workflows, loading, error };
}
