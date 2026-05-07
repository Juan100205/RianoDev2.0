-- workflow_team_agents: agents per workflow for round-robin routing
CREATE TABLE IF NOT EXISTS workflow_team_agents (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id      UUID        NOT NULL REFERENCES ai_workflows(id) ON DELETE CASCADE,
  name             TEXT        NOT NULL,
  phone            TEXT        NOT NULL,
  role             TEXT        NOT NULL DEFAULT 'Agente',
  conversation_count INTEGER   NOT NULL DEFAULT 0,
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wta_workflow_count
  ON workflow_team_agents(workflow_id, is_active, conversation_count, created_at);

ALTER TABLE workflow_team_agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated full access" ON workflow_team_agents
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RPC: atomically pick the agent with the lowest conversation_count and increment
CREATE OR REPLACE FUNCTION get_next_agent(p_workflow_id UUID)
RETURNS TABLE(
  agent_id          UUID,
  agent_name        TEXT,
  agent_phone       TEXT,
  agent_role        TEXT,
  conversation_count INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id UUID;
BEGIN
  SELECT id INTO v_id
  FROM workflow_team_agents
  WHERE workflow_id = p_workflow_id
    AND is_active = true
  ORDER BY conversation_count ASC, created_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;

  IF v_id IS NULL THEN RETURN; END IF;

  UPDATE workflow_team_agents
  SET conversation_count = conversation_count + 1
  WHERE id = v_id;

  RETURN QUERY
  SELECT id, name, phone, role, conversation_count
  FROM workflow_team_agents
  WHERE id = v_id;
END;
$$;

-- RPC: reset all counters for a workflow
CREATE OR REPLACE FUNCTION reset_agent_counters(p_workflow_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE workflow_team_agents
  SET conversation_count = 0
  WHERE workflow_id = p_workflow_id;
END;
$$;
