import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface AiWorkflow {
  id: string;
  name: string;
  description: string | null;
  type: 'conversational' | 'classification' | 'generation' | 'voice';
  status: 'active' | 'paused' | 'error';
  n8n_webhook_url: string | null;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowCredential {
  id: string;
  workflow_id: string;
  key_name: string;
  key_value: string;
  created_at: string;
}

export function useWorkflows(_isAdmin: boolean, userId?: string | null) {
  const [workflows, setWorkflows] = useState<AiWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWorkflows = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('ai_workflows')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
    } else {
      setWorkflows((data as AiWorkflow[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userId === null) {
      setWorkflows([]);
      setLoading(false);
      return;
    }
    void loadWorkflows();
  }, [loadWorkflows, userId]);

  const createWorkflow = useCallback(
    async (data: Omit<AiWorkflow, 'id' | 'created_at' | 'updated_at'>) => {
      const { error: err } = await supabase.from('ai_workflows').insert([data]);
      if (err) throw new Error(err.message);
      await loadWorkflows();
    },
    [loadWorkflows],
  );

  const updateWorkflow = useCallback(
    async (id: string, data: Partial<Omit<AiWorkflow, 'id' | 'created_at'>>) => {
      const { error: err } = await supabase
        .from('ai_workflows')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (err) throw new Error(err.message);
      await loadWorkflows();
    },
    [loadWorkflows],
  );

  const deleteWorkflow = useCallback(
    async (id: string) => {
      const { error: err } = await supabase
        .from('ai_workflows')
        .delete()
        .eq('id', id);
      if (err) throw new Error(err.message);
      await loadWorkflows();
    },
    [loadWorkflows],
  );

  const getCredentials = useCallback(
    async (workflowId: string): Promise<WorkflowCredential[]> => {
      const { data, error: err } = await supabase
        .from('workflow_credentials')
        .select('*')
        .eq('workflow_id', workflowId)
        .order('created_at', { ascending: true });
      if (err) throw new Error(err.message);
      return (data as WorkflowCredential[]) ?? [];
    },
    [],
  );

  const saveCredential = useCallback(
    async (workflowId: string, keyName: string, keyValue: string) => {
      const { error: err } = await supabase
        .from('workflow_credentials')
        .upsert(
          { workflow_id: workflowId, key_name: keyName, key_value: keyValue },
          { onConflict: 'workflow_id,key_name' },
        );
      if (err) throw new Error(err.message);
    },
    [],
  );

  const deleteCredential = useCallback(async (id: string) => {
    const { error: err } = await supabase
      .from('workflow_credentials')
      .delete()
      .eq('id', id);
    if (err) throw new Error(err.message);
  }, []);

  return {
    workflows,
    loading,
    error,
    reload: loadWorkflows,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    getCredentials,
    saveCredential,
    deleteCredential,
  };
}
