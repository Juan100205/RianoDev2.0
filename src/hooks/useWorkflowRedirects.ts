import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface WorkflowRedirect {
  id: string;
  workflow_id: string;
  agent_id: string | null;
  client_phone: string;
  client_name: string | null;
  reason: 'b2b' | 'payment' | 'closing';
  qualification_status: string | null;
  pain_identified: string | null;
  budget_signals: string | null;
  industry: string | null;
  conversation_summary: string | null;
  redirected_at: string;
  workflow_team_agents?: { name: string; phone: string } | null;
}

export const REASON_LABEL: Record<string, string> = {
  b2b:     'Empresa / B2B',
  payment: 'Cierre de pago',
  closing: 'Cierre activo',
};

export const REASON_COLOR: Record<string, string> = {
  b2b:     'text-violet-400 bg-violet-400/10 border-violet-400/30',
  payment: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  closing: 'text-amber-400  bg-amber-400/10  border-amber-400/30',
};

export function useWorkflowRedirects(workflowId: string) {
  const [redirects, setRedirects] = useState<WorkflowRedirect[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRedirects = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workflow_redirects')
        .select('*, workflow_team_agents(name, phone)')
        .eq('workflow_id', workflowId)
        .order('redirected_at', { ascending: false })
        .limit(50);
      if (!error && data) setRedirects(data as WorkflowRedirect[]);
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => {
    void fetchRedirects();
  }, [fetchRedirects]);

  const totalByReason = redirects.reduce<Record<string, number>>((acc, r) => {
    acc[r.reason] = (acc[r.reason] ?? 0) + 1;
    return acc;
  }, {});

  return { redirects, loading, fetchRedirects, totalByReason };
}
