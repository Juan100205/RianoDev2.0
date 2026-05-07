-- Log de cada redirección a agente humano
CREATE TABLE IF NOT EXISTS workflow_redirects (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id          UUID        NOT NULL REFERENCES ai_workflows(id) ON DELETE CASCADE,
  agent_id             UUID        REFERENCES workflow_team_agents(id) ON DELETE SET NULL,
  client_phone         TEXT        NOT NULL,
  client_name          TEXT,
  reason               TEXT        NOT NULL, -- 'b2b' | 'payment' | 'closing'
  qualification_status TEXT,
  pain_identified      TEXT,
  budget_signals       TEXT,
  industry             TEXT,
  redirected_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_redirects_workflow ON workflow_redirects(workflow_id, redirected_at DESC);
CREATE INDEX IF NOT EXISTS idx_redirects_agent    ON workflow_redirects(agent_id, redirected_at DESC);

ALTER TABLE workflow_redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated full access" ON workflow_redirects
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
