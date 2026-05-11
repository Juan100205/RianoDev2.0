import { renderHook, waitFor, act } from '@testing-library/react';
import { makeChain } from '../helpers/supabaseMock';

jest.mock('../../lib/supabase', () => ({
  supabase: { from: jest.fn() },
  isConfigured: true,
}));

import { supabase } from '../../lib/supabase';
import { useWorkflowRedirects } from '../../hooks/useWorkflowRedirects';
import type { WorkflowRedirect } from '../../hooks/useWorkflowRedirects';

const WORKFLOW_ID = 'wf-redirect-001';

const makeRedirect = (
  id: string,
  reason: WorkflowRedirect['reason'],
  agentName = 'Carlos',
): WorkflowRedirect => ({
  id,
  workflow_id: WORKFLOW_ID,
  agent_id: 'agent-1',
  client_phone: '+573001234567',
  client_name: 'Cliente Test',
  reason,
  qualification_status: 'qualified',
  pain_identified: 'Necesita automatizar ventas',
  budget_signals: '$500-$1000 MXN',
  industry: 'Retail',
  conversation_summary: 'Cliente interesado.',
  redirected_at: '2026-05-01T10:00:00Z',
  workflow_team_agents: { name: agentName, phone: '+573001111111' },
});

beforeEach(() => {
  jest.mocked(supabase.from).mockReturnValue(
    makeChain({ data: [], error: null }) as ReturnType<typeof supabase.from>,
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useWorkflowRedirects', () => {
  describe('fetching', () => {
    it('loads redirects on mount', async () => {
      const redirects = [makeRedirect('r-1', 'b2b'), makeRedirect('r-2', 'payment')];
      jest.mocked(supabase.from).mockReturnValue(
        makeChain({ data: redirects, error: null }) as ReturnType<typeof supabase.from>,
      );

      const { result } = renderHook(() => useWorkflowRedirects(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.redirects).toHaveLength(2);
    });

    it('queries workflow_redirects table', () => {
      renderHook(() => useWorkflowRedirects(WORKFLOW_ID));
      expect(supabase.from).toHaveBeenCalledWith('workflow_redirects');
    });

    it('handles empty result gracefully', async () => {
      const { result } = renderHook(() => useWorkflowRedirects(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.redirects).toEqual([]);
      expect(result.current.totalByReason).toEqual({});
    });
  });

  describe('totalByReason', () => {
    it('aggregates redirects by reason correctly', async () => {
      const redirects = [
        makeRedirect('r-1', 'b2b'),
        makeRedirect('r-2', 'b2b'),
        makeRedirect('r-3', 'payment'),
        makeRedirect('r-4', 'closing'),
        makeRedirect('r-5', 'closing'),
        makeRedirect('r-6', 'closing'),
      ];
      jest.mocked(supabase.from).mockReturnValue(
        makeChain({ data: redirects, error: null }) as ReturnType<typeof supabase.from>,
      );

      const { result } = renderHook(() => useWorkflowRedirects(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.totalByReason).toEqual({
        b2b:     2,
        payment: 1,
        closing: 3,
      });
    });

    it('counts a single redirect correctly', async () => {
      jest.mocked(supabase.from).mockReturnValue(
        makeChain({ data: [makeRedirect('r-1', 'payment')], error: null }) as ReturnType<typeof supabase.from>,
      );

      const { result } = renderHook(() => useWorkflowRedirects(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.totalByReason.payment).toBe(1);
      expect(result.current.totalByReason.b2b).toBeUndefined();
    });
  });

  describe('fetchRedirects (manual refresh)', () => {
    it('re-fetches when called manually', async () => {
      const { result } = renderHook(() => useWorkflowRedirects(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      const callsBefore = jest.mocked(supabase.from).mock.calls.length;

      await act(async () => { await result.current.fetchRedirects(); });

      expect(jest.mocked(supabase.from).mock.calls.length).toBeGreaterThan(callsBefore);
    });
  });

  describe('agent metadata', () => {
    it('exposes agent name via workflow_team_agents join', async () => {
      jest.mocked(supabase.from).mockReturnValue(
        makeChain({
          data: [makeRedirect('r-1', 'b2b', 'María López')],
          error: null,
        }) as ReturnType<typeof supabase.from>,
      );

      const { result } = renderHook(() => useWorkflowRedirects(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.redirects[0].workflow_team_agents?.name).toBe('María López');
    });
  });
});
