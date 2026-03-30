import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { AiWorkflow } from "./useWorkflows";

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
            .filter(Boolean);
          setWorkflows(mapped);
        }
        setLoading(false);
      });
  }, [userId]);

  return { workflows, loading, error };
}
