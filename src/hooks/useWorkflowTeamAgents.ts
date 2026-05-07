import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface TeamAgent {
  id: string;
  workflow_id: string;
  name: string;
  phone: string;
  role: string;
  conversation_count: number;
  is_active: boolean;
  created_at: string;
}

export type AgentInput = Pick<TeamAgent, 'name' | 'phone' | 'role' | 'is_active'>;

export function useWorkflowTeamAgents(workflowId: string) {
  const [agents, setAgents] = useState<TeamAgent[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workflow_team_agents')
        .select('*')
        .eq('workflow_id', workflowId)
        .order('conversation_count', { ascending: true })
        .order('created_at', { ascending: true });
      if (!error && data) setAgents(data as TeamAgent[]);
    } finally {
      setLoading(false);
    }
  }, [workflowId]);

  useEffect(() => {
    void fetchAgents();
  }, [fetchAgents]);

  const addAgent = async (input: AgentInput) => {
    const { error } = await supabase
      .from('workflow_team_agents')
      .insert({ ...input, workflow_id: workflowId, conversation_count: 0 });
    if (!error) await fetchAgents();
    return error;
  };

  const updateAgent = async (id: string, updates: Partial<AgentInput>) => {
    const { error } = await supabase
      .from('workflow_team_agents')
      .update(updates)
      .eq('id', id);
    if (!error) await fetchAgents();
    return error;
  };

  const deleteAgent = async (id: string) => {
    const { error } = await supabase
      .from('workflow_team_agents')
      .delete()
      .eq('id', id);
    if (!error) await fetchAgents();
    return error;
  };

  const resetCounters = async () => {
    const { error } = await supabase.rpc('reset_agent_counters', { p_workflow_id: workflowId });
    if (!error) await fetchAgents();
    return error;
  };

  // The next agent in rotation is the one with the lowest count
  const nextAgent = agents.find((a) => a.is_active) ?? null;

  return { agents, loading, fetchAgents, addAgent, updateAgent, deleteAgent, resetCounters, nextAgent };
}
