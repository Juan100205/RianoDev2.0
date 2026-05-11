import { renderHook, waitFor, act } from '@testing-library/react';
import { makeChain } from '../helpers/supabaseMock';

jest.mock('../../lib/supabase', () => ({
  supabase: { from: jest.fn(), rpc: jest.fn() },
  isConfigured: true,
}));

import { supabase } from '../../lib/supabase';
import { useWorkflowTeamAgents } from '../../hooks/useWorkflowTeamAgents';
import type { TeamAgent } from '../../hooks/useWorkflowTeamAgents';

const WORKFLOW_ID = 'wf-agents-001';

const agentA: TeamAgent = {
  id: 'agent-a',
  workflow_id: WORKFLOW_ID,
  name: 'Carlos',
  phone: '+573001111111',
  role: 'Agente',
  conversation_count: 2,
  is_active: true,
  created_at: '2026-01-01T00:00:00Z',
};

const agentB: TeamAgent = {
  id: 'agent-b',
  workflow_id: WORKFLOW_ID,
  name: 'María',
  phone: '+573002222222',
  role: 'Senior',
  conversation_count: 5,
  is_active: true,
  created_at: '2026-01-02T00:00:00Z',
};

const inactiveAgent: TeamAgent = {
  ...agentA,
  id: 'agent-inactive',
  is_active: false,
  conversation_count: 0,
};

beforeEach(() => {
  jest.mocked(supabase.from).mockReturnValue(
    makeChain({ data: [agentA, agentB], error: null }) as ReturnType<typeof supabase.from>,
  );
  jest.mocked(supabase.rpc).mockResolvedValue({ data: null, error: null } as never);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useWorkflowTeamAgents', () => {
  describe('fetching', () => {
    it('loads agents on mount', async () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.agents).toHaveLength(2);
      expect(result.current.agents[0].id).toBe('agent-a');
    });

    it('sets loading=true while fetching', () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      expect(result.current.loading).toBe(true);
    });
  });

  describe('nextAgent (round-robin selection)', () => {
    it('returns the first active agent (lowest conversation_count)', async () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.nextAgent?.id).toBe('agent-a');
    });

    it('skips inactive agents and returns first active one', async () => {
      jest.mocked(supabase.from).mockReturnValue(
        makeChain({ data: [inactiveAgent, agentB], error: null }) as ReturnType<typeof supabase.from>,
      );

      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.nextAgent?.id).toBe('agent-b');
    });

    it('returns null when no active agents exist', async () => {
      jest.mocked(supabase.from).mockReturnValue(
        makeChain({ data: [inactiveAgent], error: null }) as ReturnType<typeof supabase.from>,
      );

      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.nextAgent).toBeNull();
    });

    it('returns null when agents list is empty', async () => {
      jest.mocked(supabase.from).mockReturnValue(
        makeChain({ data: [], error: null }) as ReturnType<typeof supabase.from>,
      );

      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.nextAgent).toBeNull();
    });
  });

  describe('addAgent', () => {
    it('calls workflow_team_agents table', async () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      await act(async () => {
        await result.current.addAgent({
          name: 'Nuevo Agente',
          phone: '+573009999999',
          role: 'Agente',
          is_active: true,
        });
      });

      const tables = jest.mocked(supabase.from).mock.calls.map(([t]) => t);
      expect(tables).toContain('workflow_team_agents');
    });

    it('returns null error on success', async () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      let error: unknown;
      await act(async () => {
        error = await result.current.addAgent({ name: 'X', phone: '1', role: 'A', is_active: true });
      });

      expect(error).toBeNull();
    });
  });

  describe('deleteAgent', () => {
    it('calls delete on workflow_team_agents', async () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      await act(async () => { await result.current.deleteAgent('agent-a'); });

      expect(supabase.from).toHaveBeenCalledWith('workflow_team_agents');
    });
  });

  describe('resetCounters', () => {
    it('calls RPC reset_agent_counters with correct workflow_id', async () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      await act(async () => { await result.current.resetCounters(); });

      expect(supabase.rpc).toHaveBeenCalledWith('reset_agent_counters', {
        p_workflow_id: WORKFLOW_ID,
      });
    });

    it('returns null error on success', async () => {
      const { result } = renderHook(() => useWorkflowTeamAgents(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      let error: unknown;
      await act(async () => { error = await result.current.resetCounters(); });

      expect(error).toBeNull();
    });
  });
});
