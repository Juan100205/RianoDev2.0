import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Llamado ANTES de la IA — solo necesita info básica del mensaje entrante
// {
//   "sender_phone": "573001234567",
//   "from":         "573009876543",
//   "name":         "Juan Cliente",
//   "message":      "Hola"
// }

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, string> = {};
  try { body = await req.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }

  const { sender_phone, from, name, message } = body;
  if (!sender_phone) return json({ error: 'sender_phone is required' }, 400);
  if (!from)         return json({ error: 'from is required' }, 400);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // 1. Buscar workflow por número del bot
  const { data: workflow, error: wfError } = await supabase
    .from('ai_workflows')
    .select('id, name, status')
    .eq('phone_number', sender_phone)
    .single();

  if (wfError || !workflow) return json({ error: `No workflow found for sender_phone: ${sender_phone}` }, 404);
  if (workflow.status !== 'active') return json({ error: `Workflow "${workflow.name}" is not active` }, 403);

  // 2. Verificar asignación existente (sticky)
  const { data: existing } = await supabase
    .from('workflow_client_assignments')
    .select('agent_id')
    .eq('workflow_id', workflow.id)
    .eq('client_phone', from)
    .single();

  if (existing?.agent_id) {
    const { data: active } = await supabase
      .from('workflow_team_agents')
      .select('id, name, phone, role, conversation_count')
      .eq('id', existing.agent_id)
      .eq('is_active', true)
      .single();

    if (active) {
      return json({
        agent:    { id: active.id, name: active.name, phone: active.phone, role: active.role, conversation_count: active.conversation_count },
        workflow: { id: workflow.id, name: workflow.name },
        user:     { phone: from, name: name ?? null, last_message: message ?? null },
        assigned: 'existing',
      });
    }
  }

  // 3. Nuevo usuario o agente inactivo → round-robin
  const { data: rows, error: agentError } = await supabase.rpc('get_next_agent', { p_workflow_id: workflow.id });
  if (agentError) return json({ error: agentError.message }, 500);
  if (!rows || rows.length === 0) return json({ error: 'No active agents for this workflow' }, 404);

  const r = rows[0] as { agent_id: string; agent_name: string; agent_phone: string; agent_role: string; agent_count: number };

  await supabase
    .from('workflow_client_assignments')
    .upsert({ workflow_id: workflow.id, client_phone: from, agent_id: r.agent_id, assigned_at: new Date().toISOString() },
             { onConflict: 'workflow_id,client_phone' });

  return json({
    agent:    { id: r.agent_id, name: r.agent_name, phone: r.agent_phone, role: r.agent_role, conversation_count: r.agent_count },
    workflow: { id: workflow.id, name: workflow.name },
    user:     { phone: from, name: name ?? null, last_message: message ?? null },
    assigned: 'new',
  });
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}
