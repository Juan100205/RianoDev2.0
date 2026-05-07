import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Body: { "sender_phone": "573001234567" }
// Retorna todos los productos del inventario del workflow

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { sender_phone } = body;
  if (!sender_phone) return json({ error: 'sender_phone is required' }, 400);

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // 1. Buscar el workflow por el número del bot
  const { data: workflow, error: wfError } = await supabase
    .from('ai_workflows')
    .select('id, name')
    .eq('phone_number', sender_phone)
    .single();

  if (wfError || !workflow) {
    return json({ error: `No workflow found for sender_phone: ${sender_phone}` }, 404);
  }

  // 2. Traer el inventario
  const { data: items, error: invError } = await supabase
    .from('workflow_inventory')
    .select('id, name, category, quantity, price, description')
    .eq('workflow_id', workflow.id)
    .order('name', { ascending: true });

  if (invError) return json({ error: invError.message }, 500);

  return json({
    workflow: { id: workflow.id, name: workflow.name },
    total_items: items?.length ?? 0,
    inventory: items ?? [],
  });
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}
