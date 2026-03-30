-- ============================================================
-- RIANODEVZ – Add sender_phone to ai_workflows
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

-- sender_phone: número de teléfono del bot (ej. +573001234567)
-- Es el identificador único del workflow desde n8n/Edge Function
alter table public.ai_workflows
  add column if not exists sender_phone text unique;
