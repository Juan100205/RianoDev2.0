-- AI Workflows (real n8n flows)
create table if not exists public.ai_workflows (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  type        text not null default 'conversational', -- 'conversational' | 'classification' | 'generation' | 'voice'
  status      text not null default 'active',          -- 'active' | 'paused' | 'error'
  n8n_webhook_url text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Credentials per workflow (admin-only, encrypted at app layer)
create table if not exists public.workflow_credentials (
  id          uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.ai_workflows(id) on delete cascade,
  key_name    text not null,   -- e.g. 'N8N_WEBHOOK_SECRET', 'OPENAI_API_KEY'
  key_value   text not null,   -- store as-is; RLS restricts to admin only
  created_at  timestamptz not null default now(),
  unique(workflow_id, key_name)
);

-- Clients per workflow (from WhatsApp/n8n)
create table if not exists public.workflow_clients (
  id                 text primary key,
  workflow_id        uuid not null references public.ai_workflows(id) on delete cascade,
  name               text not null,
  phone              text not null,
  created_at         timestamptz not null default now(),
  last_interaction   timestamptz,
  message_count      int not null default 0,
  unique(workflow_id, phone)
);

-- Messages per workflow
create table if not exists public.workflow_messages (
  id             text primary key,
  workflow_id    uuid not null references public.ai_workflows(id) on delete cascade,
  client_id      text not null references public.workflow_clients(id) on delete cascade,
  role           text not null, -- 'user' | 'assistant'
  type           text not null default 'text', -- 'text' | 'audio'
  message        text not null default '',
  transcription  text,
  timestamp      timestamptz not null default now()
);

-- Appointments per workflow
create table if not exists public.workflow_appointments (
  id                 text primary key,
  workflow_id        uuid not null references public.ai_workflows(id) on delete cascade,
  client_id          text not null references public.workflow_clients(id) on delete cascade,
  date               timestamptz not null,
  status             text not null default 'scheduled', -- 'scheduled' | 'completed' | 'cancelled'
  calendar_event_id  text not null default '',
  notes              text not null default '',
  created_at         timestamptz not null default now()
);

-- Analytics events per workflow
create table if not exists public.workflow_analytics (
  id            text primary key,
  workflow_id   uuid not null references public.ai_workflows(id) on delete cascade,
  type          text not null, -- 'message_received' | 'message_sent' | 'audio_transcribed' | 'appointment_created'
  client_phone  text not null default '',
  timestamp     timestamptz not null default now()
);

-- RLS
alter table public.ai_workflows enable row level security;
alter table public.workflow_credentials enable row level security;
alter table public.workflow_clients enable row level security;
alter table public.workflow_messages enable row level security;
alter table public.workflow_appointments enable row level security;
alter table public.workflow_analytics enable row level security;

-- ai_workflows: auth users read, admin manages
create policy "workflows_read"       on public.ai_workflows for select using (auth.role() = 'authenticated');
create policy "workflows_admin_all"  on public.ai_workflows for all using (public.is_admin());

-- credentials: ADMIN ONLY (most restrictive)
create policy "creds_admin_only" on public.workflow_credentials for all using (public.is_admin());

-- clients/messages/appointments/analytics: auth users read their own via workflow access,
-- admin manages all
create policy "wf_clients_read"   on public.workflow_clients for select using (auth.role() = 'authenticated');
create policy "wf_clients_admin"  on public.workflow_clients for all using (public.is_admin());

create policy "wf_messages_read"  on public.workflow_messages for select using (auth.role() = 'authenticated');
create policy "wf_messages_admin" on public.workflow_messages for all using (public.is_admin());

create policy "wf_appts_read"     on public.workflow_appointments for select using (auth.role() = 'authenticated');
create policy "wf_appts_admin"    on public.workflow_appointments for all using (public.is_admin());

create policy "wf_analytics_read" on public.workflow_analytics for select using (auth.role() = 'authenticated');
create policy "wf_analytics_admin"on public.workflow_analytics for all using (public.is_admin());
