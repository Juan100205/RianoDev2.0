import { useState, useEffect, useRef, useCallback } from 'react';
import {
  XMarkIcon,
  MicrophoneIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import type { AiWorkflow, WorkflowCredential } from '../hooks/useWorkflows';
import { useWorkflowDashboard } from '../hooks/useWorkflowDashboard';
import { timeAgo, formatDate } from '../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

type DashTab = 'conversations' | 'clients' | 'appointments' | 'analytics' | 'credentials';

interface Props {
  workflow: AiWorkflow;
  onClose: () => void;
  languageState: boolean;
  isAdmin: boolean;
  getCredentials: (workflowId: string) => Promise<WorkflowCredential[]>;
  saveCredential: (workflowId: string, keyName: string, keyValue: string) => Promise<void>;
  deleteCredential: (id: string) => Promise<void>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}

const TYPE_LABELS: Record<string, string> = {
  conversational: 'Conversacional',
  classification: 'Clasificación',
  generation: 'Generación',
  voice: 'Voz',
};

const ANALYTICS_EMOJI: Record<string, string> = {
  message_received: '📨',
  message_sent: '📤',
  audio_transcribed: '🎙️',
  appointment_created: '📅',
};

const ANALYTICS_LABEL: Record<string, string> = {
  message_received: 'Mensaje recibido',
  message_sent: 'Mensaje enviado',
  audio_transcribed: 'Audio transcrito',
  appointment_created: 'Cita creada',
};

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} rounded-full bg-[#10dffd]/15 border border-[#10dffd]/25 flex items-center justify-center flex-shrink-0`}>
      <span className="text-[#10dffd] font-light">{initials(name)}</span>
    </div>
  );
}

function AudioBubble({ transcription }: { transcription: string | null }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <MicrophoneIcon className="w-4 h-4 text-[#10dffd]" />
        <span className="text-xs text-gray-400">Audio</span>
        <button
          onClick={() => setShow((v) => !v)}
          className="text-[10px] text-[#10dffd]/60 hover:text-[#10dffd] transition-colors underline cursor-pointer"
        >
          {show ? 'Ocultar' : 'Transcripción'}
        </button>
      </div>
      {show && transcription && (
        <p className="text-xs text-gray-300 italic border-l-2 border-[#10dffd]/30 pl-2">{transcription}</p>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function WorkflowDashboard({
  workflow,
  onClose,
  languageState: _l,
  isAdmin,
  getCredentials,
  saveCredential,
  deleteCredential,
}: Props) {
  const [activeTab, setActiveTab] = useState<DashTab>('conversations');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [msgPollingClientId, setMsgPollingClientId] = useState<string | null>(null);

  // Credentials state
  const [credentials, setCredentials] = useState<WorkflowCredential[]>([]);
  const [credsLoading, setCredsLoading] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [savingCred, setSavingCred] = useState(false);

  const { clients, messages, appointments, analytics, loading, fetchMessages } =
    useWorkflowDashboard(workflow.id);

  // Auto-select first client
  useEffect(() => {
    if (clients.length > 0 && !selectedClientId) {
      const first = clients[0];
      if (first) {
        setSelectedClientId(first.id);
        void fetchMessages(first.id);
        setMsgPollingClientId(first.id);
      }
    }
  }, [clients, selectedClientId, fetchMessages]);

  // Message polling every 3s
  useEffect(() => {
    if (!msgPollingClientId) return;
    const iv = setInterval(() => {
      void fetchMessages(msgPollingClientId);
    }, 3000);
    return () => clearInterval(iv);
  }, [msgPollingClientId, fetchMessages]);

  // Auto-scroll chat
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load credentials tab
  const loadCredentials = useCallback(async () => {
    setCredsLoading(true);
    try {
      const creds = await getCredentials(workflow.id);
      setCredentials(creds);
    } catch {
      // silent
    } finally {
      setCredsLoading(false);
    }
  }, [getCredentials, workflow.id]);

  useEffect(() => {
    if (activeTab === 'credentials') {
      void loadCredentials();
    }
  }, [activeTab, loadCredentials]);

  const handleSelectClient = (clientId: string) => {
    setSelectedClientId(clientId);
    setMsgPollingClientId(clientId);
    void fetchMessages(clientId);
  };

  const handleSaveCred = async () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) return;
    setSavingCred(true);
    try {
      await saveCredential(workflow.id, newKeyName.trim(), newKeyValue.trim());
      setNewKeyName('');
      setNewKeyValue('');
      await loadCredentials();
    } catch {
      // silent
    } finally {
      setSavingCred(false);
    }
  };

  const handleDeleteCred = async (id: string) => {
    try {
      await deleteCredential(id);
      await loadCredentials();
    } catch {
      // silent
    }
  };

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Analytics calculations ─────────────────────────────────────────────────
  const totalConversations = clients.length;
  const totalMsgsReceived = analytics.filter((a) => a.type === 'message_received').length;
  const totalAudioTranscribed = analytics.filter((a) => a.type === 'audio_transcribed').length;
  const totalAppointments = appointments.length;

  // Daily bar chart (last 7 days)
  const dailyData = (() => {
    const days: { label: string; received: number; sent: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      const dateStr = d.toISOString().slice(0, 10);
      const received = analytics.filter(
        (a) => a.type === 'message_received' && a.timestamp.startsWith(dateStr),
      ).length;
      const sent = analytics.filter(
        (a) => a.type === 'message_sent' && a.timestamp.startsWith(dateStr),
      ).length;
      days.push({ label, received, sent });
    }
    return days;
  })();
  const maxBarVal = Math.max(...dailyData.map((d) => d.received + d.sent), 1);

  // ── Filtered clients list ─────────────────────────────────────────────────
  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.phone.includes(clientSearch),
  );

  // ── Appointment stats ─────────────────────────────────────────────────────
  const apptScheduled = appointments.filter((a) => a.status === 'scheduled').length;
  const apptCompleted = appointments.filter((a) => a.status === 'completed').length;
  const apptCancelled = appointments.filter((a) => a.status === 'cancelled').length;

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  const tabs: { id: DashTab; label: string }[] = [
    { id: 'conversations', label: 'Conversaciones' },
    { id: 'clients', label: 'Clientes' },
    { id: 'appointments', label: 'Citas' },
    { id: 'analytics', label: 'Analytics' },
    ...(isAdmin ? [{ id: 'credentials' as DashTab, label: 'Credenciales' }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" style={{ height: '100vh' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#10dffd]/15 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-light truncate">{workflow.name}</span>
            <span className="text-gray-500 text-[10px]">{TYPE_LABELS[workflow.type] ?? workflow.type}</span>
          </div>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
              workflow.status === 'active'
                ? 'text-[#10dffd] bg-[#10dffd]/10 border-[#10dffd]/20'
                : workflow.status === 'paused'
                ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                : 'text-red-400 bg-red-400/10 border-red-400/20'
            }`}
          >
            {workflow.status}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg border border-[#10dffd]/15 hover:border-[#10dffd]/40 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
        >
          <XMarkIcon className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#10dffd]/15 overflow-x-auto flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-5 py-3 text-xs tracking-widest uppercase transition-colors cursor-pointer border-b-2 ${
              activeTab === tab.id
                ? 'text-[#10dffd] border-[#10dffd]'
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10dffd]" />
          </div>
        )}

        {!loading && activeTab === 'conversations' && (
          <div className="flex h-full">
            {/* Client list */}
            <div className="w-72 border-r border-[#10dffd]/15 flex flex-col flex-shrink-0">
              <div className="p-3 border-b border-[#10dffd]/10">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    placeholder="Buscar cliente..."
                    className="w-full pl-8 pr-3 py-2 bg-white/5 border border-[#10dffd]/10 rounded-lg text-xs text-white placeholder-gray-600 outline-none focus:border-[#10dffd]/30"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredClients.length === 0 && (
                  <p className="text-gray-600 text-xs text-center py-8">Sin clientes</p>
                )}
                {filteredClients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectClient(c.id)}
                    className={`w-full flex items-start gap-3 p-3 border-l-2 transition-colors cursor-pointer text-left ${
                      selectedClientId === c.id
                        ? 'border-l-[#10dffd] bg-[#10dffd]/5'
                        : 'border-l-transparent hover:bg-white/5'
                    }`}
                  >
                    <Avatar name={c.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-white font-light truncate">{c.name}</div>
                      <div className="text-[10px] text-gray-600 truncate">{c.phone}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[9px] text-gray-600">{timeAgo(c.last_interaction)}</span>
                      <span className="text-[9px] text-[#10dffd]/50">{c.message_count} msgs</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat panel */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {!selectedClient ? (
                <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                  Selecciona un cliente
                </div>
              ) : (
                <>
                  {/* Chat header */}
                  <div className="flex items-center gap-3 p-4 border-b border-[#10dffd]/10 flex-shrink-0">
                    <Avatar name={selectedClient.name} />
                    <div>
                      <div className="text-white text-sm font-light">{selectedClient.name}</div>
                      <div className="text-gray-500 text-xs">{selectedClient.phone}</div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    {messages.length === 0 && (
                      <p className="text-gray-600 text-xs text-center py-8">Sin mensajes</p>
                    )}
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'assistant' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                            msg.role === 'assistant'
                              ? 'bg-[#10dffd]/20 text-white rounded-br-sm'
                              : 'bg-white/10 text-white rounded-bl-sm'
                          }`}
                        >
                          {msg.type === 'audio' ? (
                            <AudioBubble transcription={msg.transcription} />
                          ) : (
                            <p className="text-xs leading-relaxed">{msg.message}</p>
                          )}
                          <div className="text-[9px] text-gray-500 mt-1 text-right">
                            {timeAgo(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {!loading && activeTab === 'clients' && (
          <div className="p-6 overflow-y-auto h-full">
            <div className="mb-4">
              <div className="relative max-w-xs">
                <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Buscar por nombre o teléfono..."
                  className="w-full pl-8 pr-3 py-2 bg-white/5 border border-[#10dffd]/10 rounded-lg text-xs text-white placeholder-gray-600 outline-none focus:border-[#10dffd]/30"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#10dffd]/10 text-left">
                    {['Cliente', 'Teléfono', 'Registrado', 'Última interacción', 'Mensajes'].map((col) => (
                      <th key={col} className="pb-3 pr-6 text-[10px] text-[#10dffd] tracking-widest uppercase font-normal">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((c) => (
                    <tr key={c.id} className="border-b border-[#10dffd]/5 hover:bg-[#10dffd]/[0.02] transition-colors">
                      <td className="py-3 pr-6">
                        <div className="flex items-center gap-2">
                          <Avatar name={c.name} size="sm" />
                          <span className="text-white text-xs font-light">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-6 text-gray-400 text-xs">{c.phone}</td>
                      <td className="py-3 pr-6 text-gray-400 text-xs">{formatDate(c.created_at)}</td>
                      <td className="py-3 pr-6 text-gray-400 text-xs">{timeAgo(c.last_interaction)}</td>
                      <td className="py-3 text-[#10dffd] text-xs">{c.message_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredClients.length === 0 && (
                <p className="text-gray-600 text-xs text-center py-10">Sin clientes</p>
              )}
            </div>
          </div>
        )}

        {!loading && activeTab === 'appointments' && (
          <div className="p-6 overflow-y-auto h-full">
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total', value: totalAppointments, color: 'text-white' },
                { label: 'Agendadas', value: apptScheduled, color: 'text-blue-400' },
                { label: 'Completadas', value: apptCompleted, color: 'text-[#10dffd]' },
                { label: 'Canceladas', value: apptCancelled, color: 'text-red-400' },
              ].map((s) => (
                <div key={s.label} className="border border-[#10dffd]/15 rounded-xl p-4 bg-[#10dffd]/[0.02]">
                  <div className={`text-xl font-light ${s.color}`}>{s.value}</div>
                  <div className="text-gray-500 text-[11px] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
              {appointments.length === 0 && (
                <p className="text-gray-600 text-xs text-center py-8">Sin citas</p>
              )}
              {appointments.map((appt) => {
                const client = clients.find((c) => c.id === appt.client_id);
                return (
                  <div key={appt.id} className="border border-[#10dffd]/10 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {client && <Avatar name={client.name} size="sm" />}
                      <div>
                        <div className="text-white text-xs font-light">{client?.name ?? appt.client_id}</div>
                        <div className="text-gray-500 text-[11px] mt-0.5">{formatDate(appt.date)}</div>
                        {appt.notes && (
                          <div className="text-gray-600 text-[10px] mt-1">{appt.notes}</div>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
                        appt.status === 'scheduled'
                          ? 'text-blue-400 bg-blue-400/10 border-blue-400/20'
                          : appt.status === 'completed'
                          ? 'text-[#10dffd] bg-[#10dffd]/10 border-[#10dffd]/20'
                          : 'text-red-400 bg-red-400/10 border-red-400/20'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!loading && activeTab === 'analytics' && (
          <div className="p-6 overflow-y-auto h-full">
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Conversaciones', value: totalConversations },
                { label: 'Msgs recibidos', value: totalMsgsReceived },
                { label: 'Audios transcritos', value: totalAudioTranscribed },
                { label: 'Citas creadas', value: totalAppointments },
              ].map((kpi) => (
                <div key={kpi.label} className="border border-[#10dffd]/15 rounded-xl p-4 bg-[#10dffd]/[0.02]">
                  <div className="text-[#10dffd] text-xl font-light">{kpi.value}</div>
                  <div className="text-gray-500 text-[11px] mt-1">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="border border-[#10dffd]/15 rounded-xl p-5 mb-8">
              <div className="text-[10px] text-[#10dffd] tracking-widest uppercase mb-4">Mensajes por día (últimos 7 días)</div>
              <div className="flex items-end gap-2 h-32">
                {dailyData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col justify-end gap-0.5" style={{ height: '100px' }}>
                      {/* received */}
                      <div
                        title={`Recibidos: ${d.received}`}
                        style={{ height: `${(d.received / maxBarVal) * 80}px` }}
                        className="w-full bg-[#10dffd] rounded-sm min-h-0 transition-all"
                      />
                      {/* sent */}
                      <div
                        title={`Enviados: ${d.sent}`}
                        style={{ height: `${(d.sent / maxBarVal) * 80}px`, backgroundColor: 'rgba(16,223,253,0.4)' }}
                        className="w-full rounded-sm min-h-0 transition-all"
                      />
                    </div>
                    <span className="text-[9px] text-gray-600">{d.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#10dffd]" /><span className="text-[10px] text-gray-500">Recibidos</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#10dffd]/40" /><span className="text-[10px] text-gray-500">Enviados</span></div>
              </div>
            </div>

            {/* Recent events */}
            <div className="border border-[#10dffd]/15 rounded-xl p-5">
              <div className="text-[10px] text-[#10dffd] tracking-widest uppercase mb-4">Eventos recientes</div>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {analytics.slice(0, 20).map((ev) => (
                  <div key={ev.id} className="flex items-center gap-3 text-xs">
                    <span className="text-base">{ANALYTICS_EMOJI[ev.type] ?? '📊'}</span>
                    <span className="text-gray-400 flex-1">{ANALYTICS_LABEL[ev.type] ?? ev.type}</span>
                    <span className="text-gray-600">{ev.client_phone}</span>
                    <span className="text-gray-700 text-[10px]">{timeAgo(ev.timestamp)}</span>
                  </div>
                ))}
                {analytics.length === 0 && (
                  <p className="text-gray-600 text-xs text-center py-4">Sin eventos</p>
                )}
              </div>
            </div>
          </div>
        )}

        {!loading && activeTab === 'credentials' && isAdmin && (
          <div className="p-6 overflow-y-auto h-full max-w-xl">
            <div className="text-[10px] text-[#10dffd] tracking-widest uppercase mb-4">Credenciales del flujo</div>

            {credsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10dffd]" />
              </div>
            ) : (
              <div className="flex flex-col gap-2 mb-6">
                {credentials.length === 0 && (
                  <p className="text-gray-600 text-xs py-4">Sin credenciales guardadas.</p>
                )}
                {credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="flex items-center justify-between border border-[#10dffd]/10 rounded-xl px-4 py-3 gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-[#10dffd]/70 font-mono">{cred.key_name}</div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">
                        {revealedIds.has(cred.id) ? cred.key_value : '••••••••••••••••'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleReveal(cred.id)}
                        className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                        title={revealedIds.has(cred.id) ? 'Ocultar' : 'Revelar'}
                      >
                        {revealedIds.has(cred.id) ? (
                          <EyeSlashIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => void handleDeleteCred(cred.id)}
                        className="text-red-500/50 hover:text-red-400 transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add credential form */}
            <div className="border border-[#10dffd]/15 rounded-xl p-4">
              <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-3">Agregar credencial</div>
              <div className="flex flex-col gap-3">
                <input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Nombre (ej. OPENAI_API_KEY)"
                  className="border border-[#10dffd]/15 bg-transparent text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/40 placeholder-gray-600 font-mono"
                />
                <input
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                  placeholder="Valor"
                  type="password"
                  className="border border-[#10dffd]/15 bg-transparent text-white text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/40 placeholder-gray-600 font-mono"
                />
                <button
                  onClick={() => void handleSaveCred()}
                  disabled={savingCred || !newKeyName.trim() || !newKeyValue.trim()}
                  className="flex items-center gap-2 bg-[#10dffd] text-black text-xs px-4 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer w-fit"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  {savingCred ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
