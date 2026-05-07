import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Llamado AL FINAL del flujo n8n cuando agent_redirect.triggered === true
// Recibe el output completo de la IA más la info del agente asignado
// {
//   "sender_phone":          "573001234567",       <- número del bot
//   "from":                  "573009876543",        <- número del cliente
//   "name":                  "Juan Cliente",
//   "agent_id":              "uuid-del-agente",     <- viene de next-agent
//   "reason":                "payment",             <- viene de agent_redirect.reason
//   "qualification_status":  "booked",              <- viene de qualification.status
//   "pain_identified":       "dolor en cuello",     <- viene de qualification.pain_identified
//   "budget_signals":        "quiere pagar hoy",    <- viene de qualification.budget_signals
//   "industry":              null                   <- viene de qualification.industry
// }

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, string | null> = {};
  try { body = await req.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }

  const { sender_phone, from, name, agent_id, reason, qualification_status, pain_identified, budget_signals, industry } = body;

  if (!sender_phone) return json({ error: 'sender_phone is required' }, 400);
  if (!from)         return json({ error: 'from is required' }, 400);
  if (!reason)       return json({ error: 'reason is required' }, 400);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Buscar workflow
  const { data: workflow, error: wfError } = await supabase
    .from('ai_workflows')
    .select('id')
    .eq('phone_number', sender_phone)
    .single();

  if (wfError || !workflow) return json({ error: `No workflow found for sender_phone: ${sender_phone}` }, 404);

  // Resolver agent_id si no viene en el body (fallback a la asignación existente)
  let resolvedAgentId = agent_id ?? null;
  if (!resolvedAgentId) {
    const { data: assignment } = await supabase
      .from('workflow_client_assignments')
      .select('agent_id')
      .eq('workflow_id', workflow.id)
      .eq('client_phone', from)
      .single();
    resolvedAgentId = assignment?.agent_id ?? null;
  }

  // Insertar en el log
  const { error: insertError } = await supabase.from('workflow_redirects').insert({
    workflow_id:          workflow.id,
    agent_id:             resolvedAgentId,
    client_phone:         from,
    client_name:          name ?? null,
    reason,
    qualification_status: qualification_status ?? null,
    pain_identified:      pain_identified ?? null,
    budget_signals:       budget_signals ?? null,
    industry:             industry ?? null,
  });

  if (insertError) return json({ error: insertError.message }, 500);

  return json({ ok: true, logged: true });
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}
