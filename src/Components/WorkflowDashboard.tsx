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
import { useWorkflowTeamAgents } from '../hooks/useWorkflowTeamAgents';
import type { TeamAgent } from '../hooks/useWorkflowTeamAgents';
import { useWorkflowInventory } from '../hooks/useWorkflowInventory';
import type { InventoryInput } from '../hooks/useWorkflowInventory';
import { useWorkflowRedirects, REASON_LABEL, REASON_COLOR } from '../hooks/useWorkflowRedirects';
import { timeAgo, formatDate } from '../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export type DashTab = 'conversations' | 'clients' | 'appointments' | 'analytics' | 'credentials' | 'prompt' | 'team' | 'inventory';

interface Props {
  workflow: AiWorkflow;
  onClose: () => void;
  languageState: boolean;
  isAdmin: boolean;
  getCredentials: (workflowId: string) => Promise<WorkflowCredential[]>;
  saveCredential: (workflowId: string, keyName: string, keyValue: string) => Promise<void>;
  deleteCredential: (id: string) => Promise<void>;
  hideTabs?: DashTab[];
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

function sanitizeText(text: string | null | undefined): string {
  if (!text) return '';
  const trimmed = text.trim();
  return trimmed.startsWith('=') ? trimmed.substring(1).trim() : trimmed;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sanitizedName = sanitizeText(name);
  const sz = size === 'sm' ? 'w-7 h-7 text-[10px]' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} rounded-full bg-[#10dffd]/15 border border-[#10dffd]/45 flex items-center justify-center flex-shrink-0`}>
      <span className="text-[#10dffd] font-light">{initials(sanitizedName)}</span>
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
        <p className="text-xs text-gray-300 italic border-l-2 border-[#10dffd]/50 pl-2">
          {sanitizeText(transcription)}
        </p>
      )}
    </div>
  );
}

function RedirectCard({ r }: { r: import('../hooks/useWorkflowRedirects').WorkflowRedirect }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#10dffd]/10 rounded-xl bg-gray-50/50 overflow-hidden">
      <div className="px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${REASON_COLOR[r.reason] ?? 'text-gray-400 bg-gray-50 border-gray-200'}`}>
            {REASON_LABEL[r.reason] ?? r.reason}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-800 text-xs font-light">{r.client_name ?? 'Sin nombre'}</span>
            <span className="text-gray-600 text-[10px] font-mono">+{r.client_phone}</span>
            {r.qualification_status && (
              <span className="text-[9px] text-gray-500 border border-white/10 px-1.5 py-0.5 rounded-full">{r.qualification_status}</span>
            )}
          </div>
          {r.pain_identified && (
            <p className="text-gray-600 text-[10px] mt-0.5 truncate">Dolor: {r.pain_identified}</p>
          )}
          {r.budget_signals && (
            <p className="text-gray-600 text-[10px] truncate">Presupuesto: {r.budget_signals}</p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            {r.workflow_team_agents && (
              <div className="text-[10px] text-[#10dffd]/60">{r.workflow_team_agents.name}</div>
            )}
            <div className="text-[10px] text-gray-600 mt-0.5">
              {new Date(r.redirected_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          {r.conversation_summary && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-[10px] text-[#10dffd]/50 hover:text-[#10dffd] transition-colors border border-[#10dffd]/20 hover:border-[#10dffd]/50 rounded-lg px-2 py-1 flex-shrink-0 cursor-pointer"
            >
              {open ? 'Ocultar' : 'Resumen'}
            </button>
          )}
        </div>
      </div>
      {open && r.conversation_summary && (
        <div className="border-t border-[#10dffd]/10 px-4 py-3 bg-gray-50">
          <p className="text-[10px] text-[#10dffd]/40 uppercase tracking-widest mb-1.5">Resumen de conversación</p>
          <p className="text-xs text-gray-600 leading-relaxed">{r.conversation_summary}</p>
        </div>
      )}
    </div>
  );
}

function ConversationSummaryButton({ summary }: { summary: string | null }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex-shrink-0 relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-[10px] border rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer ${
          open
            ? 'text-[#10dffd] border-[#10dffd]/60 bg-[#10dffd]/10'
            : summary
            ? 'text-[#10dffd] border-[#10dffd]/40 hover:border-[#10dffd]/70 bg-[#10dffd]/[0.07]'
            : 'text-gray-400 border-gray-300 hover:border-gray-400 bg-transparent'
        }`}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Resumen</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-xl shadow-lg shadow-black/10 z-20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
            <span className="text-[9px] text-[#10dffd] uppercase tracking-widest font-medium">Resumen de conversación</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-4 py-3">
            {summary ? (
              <p className="text-[11px] text-gray-700 leading-relaxed">{summary}</p>
            ) : (
              <p className="text-[10px] text-gray-400 py-1">Sin resumen disponible aún.</p>
            )}
          </div>
        </div>
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
  hideTabs = [],
}: Props) {
  const [activeTab, setActiveTab] = useState<DashTab>('conversations');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [msgPollingClientId, setMsgPollingClientId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  // Credentials state
  const [credentials, setCredentials] = useState<WorkflowCredential[]>([]);
  const [credsLoading, setCredsLoading] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [savingCred, setSavingCred] = useState(false);

  // Prompt tab state
  const [promptText, setPromptText] = useState('');
  const [promptSending, setPromptSending] = useState(false);
  const [promptStatus, setPromptStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Inventory state
  const { items: inventoryItems, addItem, updateItem, deleteItem: deleteInventoryItem } = useWorkflowInventory(workflow.id);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [editingInventoryId, setEditingInventoryId] = useState<string | null>(null);
  const [inventoryForm, setInventoryForm] = useState<InventoryInput>({ name: '', category: '', quantity: 0, price: 0, description: '', image_url: '' });
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryDetailItem, setInventoryDetailItem] = useState<{ name: string; category: string; description: string; price: number; quantity: number; image_url: string } | null>(null);

  const handleSaveInventory = async () => {
    if (!inventoryForm.name.trim()) return;
    if (editingInventoryId) {
      await updateItem(editingInventoryId, inventoryForm);
    } else {
      await addItem(inventoryForm);
    }
    setShowInventoryForm(false);
    setEditingInventoryId(null);
    setInventoryForm({ name: '', category: '', quantity: 0, price: 0, description: '', image_url: '' });
  };

  const handleEditInventory = (item: { id: string; name: string; category: string; quantity: number; price: number; description: string; image_url: string }) => {
    setInventoryForm({ name: item.name, category: item.category, quantity: item.quantity, price: item.price, description: item.description, image_url: item.image_url });
    setEditingInventoryId(item.id);
    setShowInventoryForm(true);
  };

  const handleInventoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setInventoryForm((prev) => ({ ...prev, image_url: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteInventory = (id: string) => {
    void deleteInventoryItem(id);
  };

  // Team state
  interface TeamForm { name: string; phone: string; role: string; is_active: boolean; }
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState<TeamForm>({ name: '', phone: '', role: 'Agente', is_active: true });
  const [teamSearch, setTeamSearch] = useState('');
  const { agents, loading: agentsLoading, addAgent, updateAgent, deleteAgent, resetCounters, nextAgent } = useWorkflowTeamAgents(workflow.id);
  const { redirects, loading: redirectsLoading, totalByReason } = useWorkflowRedirects(workflow.id);

  const handleSaveAgent = async () => {
    if (!teamForm.name.trim() || !teamForm.phone.trim()) return;
    if (editingAgentId) {
      await updateAgent(editingAgentId, teamForm);
    } else {
      await addAgent(teamForm);
    }
    setShowTeamForm(false);
    setEditingAgentId(null);
    setTeamForm({ name: '', phone: '', role: 'Agente', is_active: true });
  };

  const handleEditAgent = (agent: TeamAgent) => {
    setTeamForm({ name: agent.name, phone: agent.phone, role: agent.role, is_active: agent.is_active });
    setEditingAgentId(agent.id);
    setShowTeamForm(true);
  };

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      a.phone.includes(teamSearch),
  );


  const { clients, messages, appointments, analytics, loading, fetchMessages, clearMessages } =
    useWorkflowDashboard(workflow.id);
  const [clearingHistory, setClearingHistory] = useState(false);

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
    setMobileView('chat');
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
  const showAppointments = !hideTabs.includes('appointments');

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
      sanitizeText(c.name).toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.phone.includes(clientSearch),
  );

  // ── Appointment stats ─────────────────────────────────────────────────────
  const apptScheduled = showAppointments ? appointments.filter((a) => a.status === 'scheduled').length : 0;
  const apptCompleted = showAppointments ? appointments.filter((a) => a.status === 'completed').length : 0;
  const apptCancelled = showAppointments ? appointments.filter((a) => a.status === 'cancelled').length : 0;

  const selectedClient = clients.find((c) => c.id === selectedClientId);

  const handleSendPrompt = async () => {
    if (!promptText.trim() || !workflow.n8n_webhook_url) return;
    setPromptSending(true);
    setPromptStatus('idle');
    try {
      const res = await fetch(workflow.n8n_webhook_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow_id: workflow.id, prompt: promptText.trim() }),
      });
      setPromptStatus(res.ok ? 'success' : 'error');
    } catch {
      setPromptStatus('error');
    } finally {
      setPromptSending(false);
    }
  };

  const allTabs: { id: DashTab; label: string }[] = [
    { id: 'conversations', label: 'Conversaciones' },
    { id: 'clients', label: 'Clientes' },
    { id: 'appointments', label: 'Citas' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'inventory', label: 'Inventario' },
    { id: 'team', label: 'Equipo' },
    ...(isAdmin ? [{ id: 'credentials' as DashTab, label: 'Credenciales' }] : []),
    { id: 'prompt', label: 'Prompt' },
  ];

  const tabs = allTabs.filter((t) => !hideTabs.includes(t.id));

  return (
    <div className="dark flex flex-col bg-black" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#10dffd]/30 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-light truncate">{workflow.name}</span>
            <span className="text-gray-500 text-[10px]">{TYPE_LABELS[workflow.type] ?? workflow.type}</span>
          </div>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
              workflow.status === 'active'
                ? 'text-[#10dffd] bg-[#10dffd]/10 border-[#10dffd]/38'
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
          className="w-8 h-8 rounded-lg border border-[#10dffd]/30 hover:border-[#10dffd]/60 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
        >
          <XMarkIcon className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#10dffd]/30 overflow-x-auto flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-5 py-3 text-xs tracking-widest uppercase transition-colors cursor-pointer border-b-2 ${
              activeTab === tab.id
                ? 'text-[#10dffd] border-[#10dffd]'
                : 'text-gray-500 border-transparent hover:text-gray-700'
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
            {/* Client list — hidden on mobile when chat is open */}
            <div className={`
              flex-shrink-0 border-r border-[#10dffd]/30 flex flex-col
              w-full md:w-72
              ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}
            `}>
              <div className="p-3 border-b border-[#10dffd]/22">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    placeholder="Buscar cliente..."
                    className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#10dffd]/50"
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

            {/* Chat panel — hidden on mobile when list is shown */}
            <div className={`
              flex-1 flex flex-col overflow-hidden min-w-0
              ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}
            `}>
              {!selectedClient ? (
                <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                  Selecciona un cliente
                </div>
              ) : (
                <>
                  {/* Chat header */}
                  <div className="flex items-center gap-3 p-4 border-b border-[#10dffd]/22 flex-shrink-0">
                    {/* Back button — mobile only */}
                    <button
                      onClick={() => setMobileView('list')}
                      className="md:hidden text-gray-400 hover:text-white transition-colors cursor-pointer mr-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <Avatar name={selectedClient.name} />
                    <div className="min-w-0 flex-1">
                      <div className="text-white text-sm font-light truncate">{selectedClient.name}</div>
                      <div className="text-gray-500 text-xs truncate">{selectedClient.phone}</div>
                    </div>
                    {/* Conversation summary — always visible, reads from client record */}
                    <ConversationSummaryButton summary={selectedClient.conversation_summary ?? null} />
                    {/* Clear history */}
                    <button
                      onClick={async () => {
                        if (!window.confirm(`¿Borrar todo el historial de ${selectedClient.name}? Esta acción no se puede deshacer.`)) return;
                        setClearingHistory(true);
                        await clearMessages(selectedClient.id);
                        setClearingHistory(false);
                      }}
                      disabled={clearingHistory || messages.length === 0}
                      title="Borrar historial"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-300 text-red-400 hover:text-red-500 hover:border-red-400 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {clearingHistory ? (
                        <div className="w-3.5 h-3.5 border border-red-400/50 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <TrashIcon className="w-3.5 h-3.5" />
                      )}
                    </button>
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
                          className={`max-w-[80%] md:max-w-[75%] rounded-2xl px-4 py-2.5 ${
                            msg.role === 'assistant'
                              ? 'bg-[#10dffd]/20 text-white rounded-br-sm'
                              : 'bg-white/10 text-white rounded-bl-sm'
                          }`}
                        >
                          {msg.type === 'audio' ? (
                            <AudioBubble transcription={msg.transcription} />
                          ) : (
                            <p className="text-xs leading-relaxed">{sanitizeText(msg.message)}</p>
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
          <div className="p-4 md:p-6 overflow-y-auto h-full">


            <div className="mb-4">
              <div className="relative max-w-xs">
                <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Buscar por nombre o teléfono..."
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#10dffd]/50"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#10dffd]/22 text-left">
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
          <div className="p-4 md:p-6 overflow-y-auto h-full">
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total', value: totalAppointments, color: 'text-white' },
                { label: 'Agendadas', value: apptScheduled, color: 'text-blue-400' },
                { label: 'Completadas', value: apptCompleted, color: 'text-[#10dffd]' },
                { label: 'Canceladas', value: apptCancelled, color: 'text-red-400' },
              ].map((s) => (
                <div key={s.label} className="border border-[#10dffd]/30 rounded-xl p-4 bg-[#10dffd]/[0.02]">
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
                  <div key={appt.id} className="border border-[#10dffd]/22 rounded-xl p-4 flex items-start justify-between gap-4">
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
                          ? 'text-[#10dffd] bg-[#10dffd]/10 border-[#10dffd]/38'
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
          <div className="p-4 md:p-6 overflow-y-auto h-full">
            {/* KPI cards */}
            <div className={`grid gap-4 mb-8 ${showAppointments ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
              {[
                { label: 'Conversaciones', value: totalConversations },
                { label: 'Msgs recibidos', value: totalMsgsReceived },
                { label: 'Audios transcritos', value: totalAudioTranscribed },
                ...(showAppointments ? [{ label: 'Citas creadas', value: totalAppointments }] : []),
              ].map((kpi) => (
                <div key={kpi.label} className="border border-[#10dffd]/30 rounded-xl p-4 bg-[#10dffd]/[0.02]">
                  <div className="text-[#10dffd] text-xl font-light">{kpi.value}</div>
                  <div className="text-gray-500 text-[11px] mt-1">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="border border-[#10dffd]/30 rounded-xl p-5 mb-8">
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
                        style={{ height: `${(d.sent / maxBarVal) * 80}px`, backgroundColor: 'rgba(16,223,253,0.65)' }}
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
            <div className="border border-[#10dffd]/30 rounded-xl p-5">
              <div className="text-[10px] text-[#10dffd] tracking-widest uppercase mb-4">Eventos recientes</div>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {analytics
                  .filter((ev) => showAppointments || ev.type !== 'appointment_created')
                  .slice(0, 20)
                  .map((ev) => (
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



        {!loading && activeTab === 'inventory' && (
          <div className="p-4 md:p-6 overflow-y-auto h-full">

            {/* Detail modal */}
            {inventoryDetailItem && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setInventoryDetailItem(null)}>
                <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div>
                      <div className="text-gray-800 text-sm font-light">{inventoryDetailItem.name}</div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#10dffd]/10 text-[#10dffd] border border-[#10dffd]/20 mt-1 inline-block">{inventoryDetailItem.category}</span>
                    </div>
                    <button onClick={() => setInventoryDetailItem(null)} className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer flex-shrink-0">
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  {inventoryDetailItem.image_url && (
                    <img src={inventoryDetailItem.image_url} alt={inventoryDetailItem.name} className="w-full h-40 object-cover rounded-lg border border-gray-200 mb-4" />
                  )}
                  <div className="flex gap-4 mb-4">
                    <div className="border border-gray-200 rounded-lg px-3 py-2 flex-1 text-center bg-gray-50">
                      <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Stock</div>
                      <div className={`text-sm font-light ${inventoryDetailItem.quantity <= 0 ? 'text-red-400' : 'text-gray-800'}`}>{inventoryDetailItem.quantity}</div>
                    </div>
                    <div className="border border-gray-200 rounded-lg px-3 py-2 flex-1 text-center bg-gray-50">
                      <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Precio</div>
                      <div className="text-sm font-light text-gray-800">{inventoryDetailItem.price > 0 ? `$${inventoryDetailItem.price.toLocaleString()}` : '—'}</div>
                    </div>
                  </div>
                  <div className="text-[9px] text-[#10dffd] tracking-widest uppercase mb-2">Especificaciones</div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    {inventoryDetailItem.description.split('\n').map((line, i) => (
                      <p key={i} className="text-gray-600 text-[11px] leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-px bg-[#10dffd]" />
                  <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">Memoria del chatbot</span>
                </div>
                <h2 className="font-banner font-light text-white text-xl">Inventario</h2>
                <p className="text-gray-500 text-xs mt-1">
                  Gestiona los productos disponibles para el chatbot.
                  <span className="ml-2 text-[#10dffd]/60">{inventoryItems.length} producto{inventoryItems.length !== 1 ? 's' : ''}</span>
                </p>
              </div>
              <button
                onClick={() => { setShowInventoryForm(true); setEditingInventoryId(null); setInventoryForm({ name: '', category: '', quantity: 0, price: 0, description: '', image_url: '' }); }}
                className="flex items-center gap-2 bg-[#10dffd] text-black text-xs px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer w-fit flex-shrink-0"
              >
                <PlusIcon className="w-3.5 h-3.5" />
                Agregar Producto
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative max-w-xs">
                <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Buscar producto..."
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#10dffd]/50"
                />
              </div>
            </div>

            {/* Inventory form modal */}
            {showInventoryForm && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-800 text-sm font-light">
                      {editingInventoryId ? 'Editar Producto' : 'Nuevo Producto'}
                    </span>
                    <button onClick={() => setShowInventoryForm(false)} className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <input
                      value={inventoryForm.name}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, name: e.target.value })}
                      placeholder="Nombre del producto"
                      className="border border-gray-300 bg-gray-50 text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400"
                    />
                    <input
                      value={inventoryForm.category}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, category: e.target.value })}
                      placeholder="Categoría (ej. Software, Consultoría, Hardware)"
                      className="border border-gray-300 bg-gray-50 text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400"
                    />
                    {/* Image upload */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-gray-500 tracking-widest uppercase">Imagen</label>
                      {inventoryForm.image_url ? (
                        <div className="relative w-fit">
                          <img src={inventoryForm.image_url} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-gray-200" />
                          <button
                            onClick={() => setInventoryForm({ ...inventoryForm, image_url: '' })}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors"
                          >
                            <XMarkIcon className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-[#10dffd]/60 transition-colors bg-gray-50">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-500">Subir imagen</span>
                          <input type="file" accept="image/*" onChange={handleInventoryImageUpload} className="hidden" />
                        </label>
                      )}
                      <input
                        value={inventoryForm.image_url?.startsWith('data:') ? '' : inventoryForm.image_url}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, image_url: e.target.value })}
                        placeholder="O pega una URL de imagen..."
                        className="border border-gray-300 bg-gray-50 text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        value={inventoryForm.quantity}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, quantity: Number(e.target.value) || 0 })}
                        placeholder="Cantidad"
                        type="number"
                        min={0}
                        className="border border-gray-300 bg-gray-50 text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400"
                      />
                      <input
                        value={inventoryForm.price}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, price: Number(e.target.value) || 0 })}
                        placeholder="Precio"
                        type="number"
                        min={0}
                        step={0.01}
                        className="border border-gray-300 bg-gray-50 text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400"
                      />
                    </div>
                    <textarea
                      value={inventoryForm.description}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, description: e.target.value })}
                      placeholder="Descripción del producto o servicio"
                      rows={3}
                      className="border border-gray-300 bg-gray-50 text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400 resize-y"
                    />
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => void handleSaveInventory()}
                        disabled={!inventoryForm.name.trim()}
                        className="flex items-center gap-2 bg-[#10dffd] text-black text-xs px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
                      >
                        <PlusIcon className="w-3.5 h-3.5" />
                        {editingInventoryId ? 'Actualizar' : 'Guardar'}
                      </button>
                      <button
                        onClick={() => setShowInventoryForm(false)}
                        className="text-gray-500 hover:text-gray-700 text-xs transition-colors cursor-pointer px-3"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Inventory list */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#10dffd]/22 text-left">
                    {['', 'Producto', 'Categoría', 'Stock', 'Precio', 'Acciones'].map((col) => (
                      <th key={col} className="pb-3 pr-6 text-[10px] text-[#10dffd] tracking-widest uppercase font-normal">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10">
                        <p className="text-gray-600 text-xs">Sin productos en el inventario</p>
                        <p className="text-gray-700 text-[10px] mt-1">Agrega productos para que el chatbot pueda consultarlos.</p>
                      </td>
                    </tr>
                  ) : (
                    inventoryItems
                      .filter((item) =>
                        item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                        item.category.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                        item.description.toLowerCase().includes(inventorySearch.toLowerCase())
                      )
                      .map((item) => (
                      <tr key={item.id} className="border-b border-[#10dffd]/5 hover:bg-[#10dffd]/[0.02] transition-colors">
                        <td className="py-3 pr-4 w-12">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-[#10dffd]/20" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-[#10dffd]/5 border border-[#10dffd]/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="py-3 pr-6">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-white text-xs font-light">{item.name}</span>
                            {item.description && (
                              <span className="text-gray-600 text-[10px] max-w-[180px] truncate">{item.description.split('\n')[0]}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 pr-6">
                          <span className="bg-[#10dffd]/10 text-[#10dffd] text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">{item.category}</span>
                        </td>
                        <td className={`py-3 pr-6 text-xs tabular-nums ${(item.quantity ?? 0) <= 0 ? 'text-red-400' : 'text-gray-400'}`}>
                          {item.quantity ?? 0}
                        </td>
                        <td className="py-3 pr-6 text-gray-400 text-xs tabular-nums">
                          {item.price > 0 ? `$${item.price.toLocaleString()}` : '—'}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => setInventoryDetailItem(item)}
                              className="text-[10px] text-gray-500 hover:text-gray-700 transition-colors underline cursor-pointer"
                            >
                              Ver specs
                            </button>
                            <button
                              onClick={() => handleEditInventory(item)}
                              className="text-[10px] text-[#10dffd]/60 hover:text-[#10dffd] transition-colors underline cursor-pointer"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteInventory(item.id)}
                              className="text-[10px] text-red-400/60 hover:text-red-400 transition-colors underline cursor-pointer"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && activeTab === 'team' && (
          <div className="p-4 md:p-6 overflow-y-auto h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-px bg-[#10dffd]" />
                  <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase font-display">Redirección</span>
                </div>
                <h2 className="font-banner font-light text-white text-xl">Gestión de Equipo</h2>
                <p className="text-gray-500 text-xs mt-1">Agentes en rotación. n8n llama al endpoint para obtener el siguiente y se incrementa su contador.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {isAdmin && agents.length > 0 && (
                  <button
                    onClick={() => void resetCounters()}
                    className="text-[10px] text-gray-500 border border-gray-300 px-3 py-2 rounded-lg hover:text-gray-700 hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    Resetear contadores
                  </button>
                )}
                <button
                  onClick={() => { setShowTeamForm(true); setEditingAgentId(null); setTeamForm({ name: '', phone: '', role: 'Agente', is_active: true }); }}
                  className="flex items-center gap-2 bg-[#10dffd] text-black text-xs px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                  Agregar Agente
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total redirecciones', value: redirects.length },
                { label: 'Empresas / B2B',      value: totalByReason['b2b']     ?? 0, color: 'text-violet-400' },
                { label: 'Cierres de pago',     value: totalByReason['payment'] ?? 0, color: 'text-emerald-400' },
                { label: 'Cierres activos',     value: totalByReason['closing'] ?? 0, color: 'text-amber-400' },
              ].map((s) => (
                <div key={s.label} className="border border-[#10dffd]/15 rounded-xl px-4 py-3 bg-white/[0.02]">
                  <div className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">{s.label}</div>
                  <div className={`text-2xl font-light tabular-nums ${s.color ?? 'text-[#10dffd]'}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Next agent card */}
            {nextAgent && (
              <div className="mb-6 border border-[#10dffd]/30 rounded-xl px-4 py-3 bg-[#10dffd]/[0.04] flex items-center justify-between gap-4">
                <div>
                  <div className="text-[9px] text-[#10dffd]/60 tracking-widest uppercase mb-1">Siguiente en rotación</div>
                  <div className="text-white text-sm font-light">{nextAgent.name}</div>
                  <div className="text-gray-500 text-[11px] mt-0.5 font-mono">+{nextAgent.phone}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[9px] text-gray-600 uppercase tracking-widest mb-1">Redirecciones</div>
                  <div className="text-[#10dffd] text-2xl font-light tabular-nums">{nextAgent.conversation_count}</div>
                </div>
              </div>
            )}

            {/* Add / edit form */}
            {showTeamForm && (
              <div className="mb-6 border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="text-[10px] text-[#10dffd] tracking-widest uppercase mb-4">
                  {editingAgentId ? 'Editar Agente' : 'Nuevo Agente'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1.5">Nombre *</label>
                    <input
                      value={teamForm.name}
                      onChange={(e) => setTeamForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Juan Pérez"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#10dffd]/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1.5">WhatsApp * (sin +)</label>
                    <input
                      value={teamForm.phone}
                      onChange={(e) => setTeamForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="573001234567"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#10dffd]/50 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1.5">Rol</label>
                    <input
                      value={teamForm.role}
                      onChange={(e) => setTeamForm((p) => ({ ...p, role: e.target.value }))}
                      placeholder="Agente"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#10dffd]/50"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <button
                      type="button"
                      onClick={() => setTeamForm((p) => ({ ...p, is_active: !p.is_active }))}
                      className={`relative w-9 h-5 rounded-full border transition-colors cursor-pointer flex-shrink-0 ${teamForm.is_active ? 'bg-[#10dffd]/30 border-[#10dffd]/50' : 'bg-gray-200 border-gray-300'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-transform ${teamForm.is_active ? 'translate-x-4 bg-[#10dffd]' : 'translate-x-0.5 bg-gray-400'}`} />
                    </button>
                    <span className="text-xs text-gray-500">Activo en rotación</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => void handleSaveAgent()}
                    disabled={!teamForm.name.trim() || !teamForm.phone.trim()}
                    className="bg-[#10dffd] text-black text-xs px-5 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
                  >
                    {editingAgentId ? 'Guardar cambios' : 'Agregar'}
                  </button>
                  <button
                    onClick={() => { setShowTeamForm(false); setEditingAgentId(null); }}
                    className="text-gray-500 text-xs hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="mb-4">
              <div className="relative max-w-xs">
                <MagnifyingGlassIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Buscar agente..."
                  className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-[#10dffd]/50"
                />
              </div>
            </div>

            {/* Agents table */}
            {agentsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#10dffd]" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#10dffd]/22 text-left">
                      {['Agente', 'WhatsApp', 'Rol', 'Conversaciones', 'Estado', 'Acciones'].map((col) => (
                        <th key={col} className="pb-3 pr-6 text-[10px] text-[#10dffd] tracking-widest uppercase font-normal">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-gray-600 text-xs">
                          Sin agentes registrados. Agrega el primero para activar la rotación.
                        </td>
                      </tr>
                    ) : (
                      filteredAgents.map((agent) => {
                        const isNext = nextAgent?.id === agent.id;
                        return (
                          <tr key={agent.id} className="border-b border-[#10dffd]/5 hover:bg-[#10dffd]/[0.02] transition-colors">
                            <td className="py-4 pr-6">
                              <div className="flex items-center gap-3">
                                <Avatar name={agent.name} size="sm" />
                                <div className="flex flex-col gap-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white text-xs font-light">{agent.name}</span>
                                    {isNext && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#10dffd]/15 border border-[#10dffd]/40 text-[#10dffd] leading-none">
                                        Siguiente
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-gray-600 font-mono">{agent.id.slice(0, 8)}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 pr-6">
                              <span className="text-gray-400 text-[11px] font-mono">+{agent.phone}</span>
                            </td>
                            <td className="py-4 pr-6">
                              <span className="text-gray-400 text-xs">{agent.role}</span>
                            </td>
                            <td className="py-4 pr-6">
                              <div className="flex items-center gap-1.5">
                                <span className="text-white text-sm font-light tabular-nums">{agent.conversation_count}</span>
                                <span className="text-gray-600 text-[10px]">conv.</span>
                              </div>
                            </td>
                            <td className="py-4 pr-6">
                              <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${agent.is_active ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                <span className="text-gray-400 text-xs">{agent.is_active ? 'Activo' : 'Inactivo'}</span>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleEditAgent(agent)}
                                  className="text-[10px] text-[#10dffd]/60 hover:text-[#10dffd] transition-colors underline cursor-pointer"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => void deleteAgent(agent.id)}
                                  className="text-[10px] text-red-400/60 hover:text-red-400 transition-colors underline cursor-pointer"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Redirects log */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-px bg-[#10dffd]" />
                <span className="text-[#10dffd]/50 text-[9px] tracking-[0.35em] uppercase">Historial de redirecciones</span>
              </div>
              {redirectsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#10dffd]" />
                </div>
              ) : redirects.length === 0 ? (
                <p className="text-gray-600 text-xs py-4">Sin redirecciones registradas aún.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {redirects.map((r) => (
                    <RedirectCard key={r.id} r={r} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {!loading && activeTab === 'prompt' && (
          <div className="p-6 overflow-y-auto h-full max-w-2xl">
            <div className="text-[10px] text-[#10dffd] tracking-widest uppercase mb-1">System Prompt del chatbot</div>
            <p className="text-gray-500 text-xs mb-5">
              Escribe el prompt que quieres enviar al chatbot. Se hará un POST al webhook de n8n con el contenido.
            </p>

            {/* Webhook URL display */}
            <div className="mb-4">
              <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-1.5">Webhook n8n</div>
              {workflow.n8n_webhook_url ? (
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <span className="text-[10px] text-[#10dffd] font-mono truncate flex-1">{workflow.n8n_webhook_url}</span>
                </div>
              ) : (
                <p className="text-amber-400 text-xs">No hay webhook configurado para este flujo.</p>
              )}
            </div>

            {/* Prompt textarea */}
            <div className="mb-4">
              <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-1.5">Prompt</div>
              <textarea
                value={promptText}
                onChange={(e) => { setPromptText(e.target.value); setPromptStatus('idle'); }}
                placeholder="Eres un asistente de atención al cliente para... Responde siempre en español..."
                rows={12}
                className="w-full border border-gray-300 bg-gray-50 text-gray-800 text-xs px-4 py-3 rounded-xl outline-none focus:border-[#10dffd]/60 placeholder-gray-400 resize-y font-mono leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => void handleSendPrompt()}
                disabled={promptSending || !promptText.trim() || !workflow.n8n_webhook_url}
                className="flex items-center gap-2 bg-[#10dffd] text-black text-xs px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
              >
                {promptSending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar a n8n
                  </>
                )}
              </button>
              {promptStatus === 'success' && (
                <span className="text-[#10dffd] text-xs">Enviado correctamente</span>
              )}
              {promptStatus === 'error' && (
                <span className="text-red-400 text-xs">Error al enviar. Revisa el webhook.</span>
              )}
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
                    className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 gap-3 bg-white"
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
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-3">Agregar credencial</div>
              <div className="flex flex-col gap-3">
                <input
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Nombre (ej. OPENAI_API_KEY)"
                  className="border border-gray-300 bg-white text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400 font-mono"
                />
                <input
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                  placeholder="Valor"
                  type="password"
                  className="border border-gray-300 bg-white text-gray-800 text-xs px-3 py-2 rounded-lg outline-none focus:border-[#10dffd]/60 placeholder-gray-400 font-mono"
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
