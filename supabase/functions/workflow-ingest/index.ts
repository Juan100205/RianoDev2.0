import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Body completo que envía n8n al final del flujo:
// {
//   "sender_phone":   "573001234567",   <- número del bot
//   "user_phone":     "573009876543",   <- número del cliente
//   "name":           "Juan Cliente",
//   "user_message":   "quiero comprar",
//   "output":         "Perfecto, le conecto...",  <- respuesta del AI (campo output del JSON)
//   "appointment":    { "created": false, "date": null, "notes": null },
//   "agent_id":       "uuid-del-agente",          <- viene de next-agent
//   "agent_redirect": { "triggered": true, "reason": "payment" },
//   "qualification":  { "status": "booked", "pain_identified": "...", ... }
// }

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await req.json()

    const sender_phone = body.sender_phone
    const user_phone   = body.user_phone
    const name         = body.name
    const user_message = body.user_message
    const output       = body.output
    const agent_id     = body.agent_id ?? null

    const safeParse = (v: unknown) => {
      if (!v) return null
      if (typeof v === 'object') return v
      try { return JSON.parse(v as string) } catch { return null }
    }

    const appointment    = safeParse(body.appointment)
    const agent_redirect = safeParse(body.agent_redirect) as Record<string, unknown> | null
    const qualification  = safeParse(body.qualification)

    const conversation_summary: string | null =
      (agent_redirect?.conversation_summary as string | null) ??
      (body.conversation_summary as string | null) ??
      null

    if (!sender_phone || !user_phone) {
      return new Response(
        JSON.stringify({ error: 'sender_phone y user_phone son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 🔍 1. Buscar workflow
    let { data: workflow } = await supabase
      .from('ai_workflows')
      .select('id')
      .eq('phone_number', sender_phone)
      .maybeSingle()

    // 🆕 2. Si no existe → crear
    if (!workflow) {
      const { data: newWorkflow, error: createError } = await supabase
        .from('ai_workflows')
        .insert({
          name: `Bot ${sender_phone}`,
          phone_number: sender_phone,
          status: 'active',
          type: 'whatsapp',
          description: 'Auto-created workflow',
        })
        .select('id')
        .single()

      if (createError) throw new Error('Error creando workflow: ' + createError.message)
      workflow = newWorkflow
    }

    const workflow_id = workflow.id
    const now = new Date().toISOString()

    // 👤 3. Upsert cliente
    const { data: clientData, error: clientErr } = await supabase
      .from('workflow_clients')
      .upsert(
        {
          workflow_id,
          phone: user_phone,
          name: name ?? user_phone,
          last_interaction: now,
          ...(conversation_summary ? { conversation_summary } : {}),
        },
        { onConflict: 'workflow_id,phone' }
      )
      .select('id, message_count')
      .single()

    if (clientErr || !clientData) throw new Error('Cliente: ' + clientErr?.message)

    const client_id = clientData.id

    // 🔢 4. Incrementar contador de mensajes
    await supabase
      .from('workflow_clients')
      .update({ message_count: (clientData.message_count ?? 0) + 1 })
      .eq('id', client_id)

    // 💬 5. Mensaje usuario
    if (user_message) {
      await supabase.from('workflow_messages').insert({
        workflow_id, client_id,
        role: 'user', type: 'text',
        message: user_message, timestamp: now,
      })
    }

    // 🤖 6. Respuesta bot
    if (output) {
      await supabase.from('workflow_messages').insert({
        workflow_id, client_id,
        role: 'assistant', type: 'text',
        message: output, timestamp: now,
      })
    }

    // 📅 7. Cita
    if (appointment?.created && appointment?.date) {
      await supabase.from('workflow_appointments').insert({
        workflow_id, client_id,
        date: appointment.date,
        status: 'scheduled',
        notes: appointment.notes ?? '',
        calendar_event_id: '',
      })

      await supabase.from('workflow_analytics').insert({
        workflow_id, type: 'appointment_created', client_phone: user_phone, timestamp: now,
      })
    }

    // 📊 8. Analytics
    await supabase.from('workflow_analytics').insert([
      { workflow_id, type: 'message_received', client_phone: user_phone, timestamp: now },
      { workflow_id, type: 'message_sent',     client_phone: user_phone, timestamp: now },
    ])

    // 🔀 9. Log de redirección (solo cuando la IA activa agent_redirect)
    let redirect_logged = false
    if (agent_redirect?.triggered === true && agent_redirect?.reason) {
      // Resolver agent_id si no viene en el body
      let resolvedAgentId = agent_id
      if (!resolvedAgentId) {
        const { data: assignment } = await supabase
          .from('workflow_client_assignments')
          .select('agent_id')
          .eq('workflow_id', workflow_id)
          .eq('client_phone', user_phone)
          .single()
        resolvedAgentId = assignment?.agent_id ?? null
      }

      await supabase.from('workflow_redirects').insert({
        workflow_id,
        agent_id:             resolvedAgentId,
        client_phone:         user_phone,
        client_name:          name ?? null,
        reason:               agent_redirect.reason,
        qualification_status: qualification?.status        ?? null,
        pain_identified:      qualification?.pain_identified ?? null,
        budget_signals:       qualification?.budget_signals  ?? null,
        industry:             qualification?.industry        ?? null,
        conversation_summary: agent_redirect.conversation_summary ?? conversation_summary ?? null,
      })

      redirect_logged = true
    }

    return new Response(
      JSON.stringify({ ok: true, client_id, workflow_id, redirect_logged }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
