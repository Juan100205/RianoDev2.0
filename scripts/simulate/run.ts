/**
 * n8n flow simulator — writes directly to Supabase with service_role key,
 * mimicking exactly what n8n does in production.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   npm run simulate -- <command> [options]
 *
 * Commands:
 *   new-client    --workflow <id> [--name <name>] [--phone <phone>]
 *   message       --workflow <id> --client <id> --role user|assistant --text "..."
 *   redirect      --workflow <id> --phone <phone> --reason b2b|payment|closing [--agent <id>]
 *   analytics     --workflow <id> --phone <phone> --type message_received|message_sent|...
 *   appointment   --workflow <id> --client <id> --date "2026-06-01T10:00:00Z"
 */

import { adminClient } from './supabase-admin.js';
import { randomUUID } from 'node:crypto';

const args = process.argv.slice(2);
const cmd = args[0];

function arg(flag: string, fallback?: string): string {
  const idx = args.indexOf(`--${flag}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  if (fallback !== undefined) return fallback;
  console.error(`Missing required --${flag}`);
  process.exit(1);
}

function ok(label: string, data: unknown) {
  console.log(`✓ ${label}`);
  console.log(JSON.stringify(data, null, 2));
}

function fail(label: string, error: unknown) {
  console.error(`✗ ${label}:`, error);
  process.exit(1);
}

async function newClient() {
  const workflowId = arg('workflow');
  const phone      = arg('phone', `+5730${Math.floor(Math.random() * 90000000 + 10000000)}`);
  const name       = arg('name', `Cliente Test ${Date.now()}`);

  const clientId = randomUUID();
  const now = new Date().toISOString();

  const { data, error } = await adminClient
    .from('workflow_clients')
    .upsert(
      { id: clientId, workflow_id: workflowId, name, phone, created_at: now, last_interaction: now, message_count: 1 },
      { onConflict: 'workflow_id,phone' },
    )
    .select()
    .single();

  if (error) return fail('new-client', error);
  ok('new-client', data);

  // Insert first message
  const { data: msg, error: msgErr } = await adminClient
    .from('workflow_messages')
    .insert({
      id: randomUUID(),
      workflow_id: workflowId,
      client_id: (data as { id: string }).id,
      role: 'user',
      type: 'text',
      message: 'Hola, me interesa saber más sobre sus servicios.',
      timestamp: now,
    })
    .select()
    .single();

  if (msgErr) return fail('first-message', msgErr);
  ok('first-message', msg);

  // Register analytics event
  await adminClient.from('workflow_analytics').insert({
    id: randomUUID(),
    workflow_id: workflowId,
    type: 'message_received',
    client_phone: phone,
    timestamp: now,
  });

  console.log(`\n→ Phone: ${phone}  |  Client ID: ${(data as { id: string }).id}`);
}

async function sendMessage() {
  const workflowId = arg('workflow');
  const clientId   = arg('client');
  const role       = arg('role', 'user') as 'user' | 'assistant';
  const text       = arg('text', 'Mensaje de prueba desde simulador');
  const now        = new Date().toISOString();

  const { data, error } = await adminClient
    .from('workflow_messages')
    .insert({
      id: randomUUID(),
      workflow_id: workflowId,
      client_id: clientId,
      role,
      type: 'text',
      message: text,
      timestamp: now,
    })
    .select()
    .single();

  if (error) return fail('message', error);

  // Update client last_interaction + message_count
  await adminClient
    .from('workflow_clients')
    .update({ last_interaction: now })
    .eq('id', clientId)
    .eq('workflow_id', workflowId);

  ok('message', data);
}

async function simulateRedirect() {
  const workflowId = arg('workflow');
  const phone      = arg('phone');
  const reason     = arg('reason', 'b2b') as 'b2b' | 'payment' | 'closing';
  const agentId    = args.includes('--agent') ? arg('agent') : null;

  const { data, error } = await adminClient
    .from('workflow_redirects')
    .insert({
      id: randomUUID(),
      workflow_id: workflowId,
      agent_id: agentId,
      client_phone: phone,
      client_name: `Cliente ${phone.slice(-4)}`,
      reason,
      qualification_status: 'qualified',
      pain_identified: 'Quiere automatizar su proceso de ventas',
      budget_signals: '$500-$1000 USD',
      industry: 'Retail',
      conversation_summary: 'El cliente mostró alto interés. Listo para cierre.',
      redirected_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return fail('redirect', error);
  ok('redirect', data);
}

async function simulateAnalytics() {
  const workflowId = arg('workflow');
  const phone      = arg('phone');
  const type       = arg('type', 'message_received');

  const { data, error } = await adminClient
    .from('workflow_analytics')
    .insert({
      id: randomUUID(),
      workflow_id: workflowId,
      type,
      client_phone: phone,
      timestamp: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return fail('analytics', error);
  ok('analytics', data);
}

async function simulateAppointment() {
  const workflowId = arg('workflow');
  const clientId   = arg('client');
  const date       = arg('date', new Date(Date.now() + 86400000).toISOString()); // tomorrow

  const { data, error } = await adminClient
    .from('workflow_appointments')
    .insert({
      id: randomUUID(),
      workflow_id: workflowId,
      client_id: clientId,
      date,
      status: 'scheduled',
      calendar_event_id: `sim_${randomUUID()}`,
      notes: 'Cita creada por simulador de n8n',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) return fail('appointment', error);
  ok('appointment', data);
}

const commands: Record<string, () => Promise<void>> = {
  'new-client':  newClient,
  'message':     sendMessage,
  'redirect':    simulateRedirect,
  'analytics':   simulateAnalytics,
  'appointment': simulateAppointment,
};

if (!cmd || !(cmd in commands)) {
  console.log('Available commands: new-client | message | redirect | analytics | appointment');
  console.log('Example: npm run simulate -- new-client --workflow <id>');
  process.exit(0);
}

commands[cmd]().catch(err => { console.error(err); process.exit(1); });
