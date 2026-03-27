import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';

export interface WorkflowClient {
  id: string;
  workflow_id: string;
  name: string;
  phone: string;
  created_at: string;
  last_interaction: string | null;
  message_count: number;
}

export interface WorkflowMessage {
  id: string;
  workflow_id: string;
  client_id: string;
  role: 'user' | 'assistant';
  type: 'text' | 'audio';
  message: string;
  transcription: string | null;
  timestamp: string;
}

export interface WorkflowAppointment {
  id: string;
  workflow_id: string;
  client_id: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  calendar_event_id: string;
  notes: string;
  created_at: string;
}

export interface WorkflowAnalyticsEvent {
  id: string;
  workflow_id: string;
  type: string;
  client_phone: string;
  timestamp: string;
}

export function useWorkflowDashboard(workflowId: string | null) {
  const [clients, setClients] = useState<WorkflowClient[]>([]);
  const [messages, setMessages] = useState<WorkflowMessage[]>([]);
  const [appointments, setAppointments] = useState<WorkflowAppointment[]>([]);
  const [analytics, setAnalytics] = useState<WorkflowAnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    if (!workflowId) return;
    setError(null);
    try {
      const [clientsRes, apptsRes, analyticsRes] = await Promise.all([
        supabase
          .from('workflow_clients')
          .select('*')
          .eq('workflow_id', workflowId)
          .order('last_interaction', { ascending: false }),
        supabase
          .from('workflow_appointments')
          .select('*')
          .eq('workflow_id', workflowId)
          .order('date', { ascending: false }),
        supabase
          .from('workflow_analytics')
          .select('*')
          .eq('workflow_id', workflowId)
          .order('timestamp', { ascending: false })
          .limit(200),
      ]);

      if (clientsRes.error) throw clientsRes.error;
      if (apptsRes.error) throw apptsRes.error;
      if (analyticsRes.error) throw analyticsRes.error;

      setClients((clientsRes.data as WorkflowClient[]) ?? []);
      setAppointments((apptsRes.data as WorkflowAppointment[]) ?? []);
      setAnalytics((analyticsRes.data as WorkflowAnalyticsEvent[]) ?? []);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  }, [workflowId]);

  const fetchMessages = useCallback(
    async (clientId: string) => {
      if (!workflowId) return;
      const { data, error: err } = await supabase
        .from('workflow_messages')
        .select('*')
        .eq('workflow_id', workflowId)
        .eq('client_id', clientId)
        .order('timestamp', { ascending: true });
      if (err) {
        setError(err.message);
        return;
      }
      setMessages((data as WorkflowMessage[]) ?? []);
    },
    [workflowId],
  );

  // Initial load
  useEffect(() => {
    if (!workflowId) return;
    setLoading(true);
    void fetchData().finally(() => setLoading(false));
  }, [workflowId, fetchData]);

  // Polling every 4 seconds
  useEffect(() => {
    if (!workflowId) return;
    intervalRef.current = setInterval(() => {
      void fetchData();
    }, 4000);
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [workflowId, fetchData]);

  return {
    clients,
    messages,
    appointments,
    analytics,
    loading,
    error,
    fetchMessages,
  };
}
