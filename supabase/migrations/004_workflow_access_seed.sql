-- ============================================================
-- RIANODEVZ – Workflow Access + Seed
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. USER_WORKFLOW_ACCESS
--    Junction table: which portal user can see which ai_workflow
-- ────────────────────────────────────────────────────────────

create table if not exists public.user_workflow_access (
  user_id      uuid not null references auth.users(id) on delete cascade,
  workflow_id  uuid not null references public.ai_workflows(id) on delete cascade,
  granted_at   timestamptz not null default now(),
  primary key (user_id, workflow_id)
);

alter table public.user_workflow_access enable row level security;

drop policy if exists "workflow_access_select_own" on public.user_workflow_access;
drop policy if exists "workflow_access_admin_all"  on public.user_workflow_access;

create policy "workflow_access_select_own" on public.user_workflow_access
  for select using (auth.uid() = user_id or public.is_admin());

create policy "workflow_access_admin_all" on public.user_workflow_access
  for all using (public.is_admin());


-- ────────────────────────────────────────────────────────────
-- 2. RLS ON AI_WORKFLOWS
--    Clients only see workflows assigned to them
-- ────────────────────────────────────────────────────────────

alter table public.ai_workflows enable row level security;

drop policy if exists "workflows_select_own" on public.ai_workflows;
drop policy if exists "workflows_admin_all"  on public.ai_workflows;

create policy "workflows_select_own" on public.ai_workflows
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.user_workflow_access
      where user_workflow_access.workflow_id = ai_workflows.id
        and user_workflow_access.user_id = auth.uid()
    )
  );

create policy "workflows_admin_all" on public.ai_workflows
  for all using (public.is_admin());


-- ────────────────────────────────────────────────────────────
-- 3. SEED – 4 curated AI workflows
-- ────────────────────────────────────────────────────────────

insert into public.ai_workflows (name, description, type, status) values
  ('Vecino Alquila', 'Bot de agendamiento y gestión de leads para Vecino Alquila',          'conversational', 'active'),
  ('Compucol',       'Automatización conversacional y CRM para Compucol',                   'conversational', 'active'),
  ('Esteban',        'Flujo de IA personalizado — asistente y captura de leads para Esteban','conversational', 'active'),
  ('Siilla',         'Sistema de automatización y experiencias conversacionales para Siilla', 'conversational', 'active')
on conflict do nothing;
