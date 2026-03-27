-- ============================================================
-- RIANODEVZ – Client Webs + Automations
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- HELPER: updated_at trigger function (shared)
-- ────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ════════════════════════════════════════════════════════════
-- 1. CLIENT_WEBS
--    Admin crea / edita páginas web. Luego las asigna a clientes.
-- ════════════════════════════════════════════════════════════

create table if not exists public.client_webs (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,                        -- "Catali AI"
  domain       text,                                 -- "cataly.co"
  url          text,                                 -- "https://cataly.co"
  status       text not null default 'live'
               check (status in ('live', 'maintenance', 'dev', 'offline')),
  tech         text,                                 -- "React + Vite"
  description  text,
  thumbnail    text,                                 -- URL imagen/screenshot
  last_deploy  date,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger set_updated_at_client_webs
  before update on public.client_webs
  for each row execute function public.set_updated_at();

-- Acceso por usuario
create table if not exists public.user_web_access (
  user_id     uuid not null references auth.users(id) on delete cascade,
  web_id      uuid not null references public.client_webs(id) on delete cascade,
  granted_at  timestamptz not null default now(),
  primary key (user_id, web_id)
);


-- ════════════════════════════════════════════════════════════
-- 2. CLIENT_AUTOMATIONS
--    Admin crea / edita automatizaciones. Luego las asigna a clientes.
-- ════════════════════════════════════════════════════════════

create table if not exists public.client_automations (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,                       -- "Lead capture bot"
  description   text,
  platform      text,                                -- "n8n" | "Make" | "Zapier" | "custom"
  type          text not null default 'general'
                check (type in ('conversational', 'crm', 'reporting', 'scheduling', 'general')),
  status        text not null default 'active'
                check (status in ('active', 'paused', 'error')),
  webhook_url   text,                                -- URL del webhook n8n / Make
  trigger_desc  text,                                -- "WhatsApp inbound" / "Form submit" / etc.
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger set_updated_at_client_automations
  before update on public.client_automations
  for each row execute function public.set_updated_at();

-- Acceso por usuario
create table if not exists public.user_automation_access (
  user_id        uuid not null references auth.users(id) on delete cascade,
  automation_id  uuid not null references public.client_automations(id) on delete cascade,
  granted_at     timestamptz not null default now(),
  primary key (user_id, automation_id)
);


-- ════════════════════════════════════════════════════════════
-- 3. ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════

alter table public.client_webs           enable row level security;
alter table public.user_web_access       enable row level security;
alter table public.client_automations    enable row level security;
alter table public.user_automation_access enable row level security;

-- ── client_webs ──────────────────────────────────────────────
drop policy if exists "webs_select_own"  on public.client_webs;
drop policy if exists "webs_admin_all"   on public.client_webs;

-- Cliente ve solo las webs que tiene asignadas
create policy "webs_select_own" on public.client_webs
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.user_web_access
      where user_web_access.web_id = client_webs.id
        and user_web_access.user_id = auth.uid()
    )
  );

-- Admin puede insertar / actualizar / borrar
create policy "webs_admin_all" on public.client_webs
  for all using (public.is_admin());

-- ── user_web_access ──────────────────────────────────────────
drop policy if exists "web_access_select_own" on public.user_web_access;
drop policy if exists "web_access_admin_all"  on public.user_web_access;

create policy "web_access_select_own" on public.user_web_access
  for select using (auth.uid() = user_id or public.is_admin());

create policy "web_access_admin_all" on public.user_web_access
  for all using (public.is_admin());

-- ── client_automations ───────────────────────────────────────
drop policy if exists "automations_select_own" on public.client_automations;
drop policy if exists "automations_admin_all"  on public.client_automations;

create policy "automations_select_own" on public.client_automations
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.user_automation_access
      where user_automation_access.automation_id = client_automations.id
        and user_automation_access.user_id = auth.uid()
    )
  );

create policy "automations_admin_all" on public.client_automations
  for all using (public.is_admin());

-- ── user_automation_access ───────────────────────────────────
drop policy if exists "automation_access_select_own" on public.user_automation_access;
drop policy if exists "automation_access_admin_all"  on public.user_automation_access;

create policy "automation_access_select_own" on public.user_automation_access
  for select using (auth.uid() = user_id or public.is_admin());

create policy "automation_access_admin_all" on public.user_automation_access
  for all using (public.is_admin());


-- ════════════════════════════════════════════════════════════
-- 4. DATOS DE EJEMPLO (opcional — borrar si no necesitas)
-- ════════════════════════════════════════════════════════════

insert into public.client_webs (name, domain, url, status, tech, description, last_deploy) values
  ('Catali AI',        'cataly.co',          'https://cataly.co',          'live',        'React + Vite', 'Web corporativa Catali AI',            '2026-02-20'),
  ('ArcovXR',          'arcovxr.com',        'https://arcovxr.com',        'live',        'React',        'Plataforma XR de Arcov',               '2026-01-15'),
  ('Conjunto Callejas','conjuntocallejas.co', 'https://conjuntocallejas.co','maintenance', 'WordPress',    'Portal residencial Conjunto Callejas',  '2026-03-10'),
  ('Método Levántate', NULL,                  NULL,                         'live',        'React + Vite', 'Landing page Método Levántate',         '2026-03-26')
on conflict do nothing;

insert into public.client_automations (name, description, platform, type, status, trigger_desc) values
  ('Lead capture bot',     'Captura y calificación de leads por WhatsApp',    'n8n',   'conversational', 'active', 'WhatsApp inbound'),
  ('CRM sync',             'Sincronización de contactos con CRM',             'n8n',   'crm',            'active', 'Scheduled — cada hora'),
  ('Reporte semanal',      'Resumen de métricas enviado por email',           'n8n',   'reporting',      'paused', 'Weekly — lunes 8am'),
  ('Agendamiento Vecino',  'Bot de agendamiento para Vecino Alquila',         'n8n',   'scheduling',     'active', 'WhatsApp inbound'),
  ('Bot Ergonómica',       'Chatbot conversacional para Ergonómica',          'n8n',   'conversational', 'active', 'WhatsApp inbound')
on conflict do nothing;
