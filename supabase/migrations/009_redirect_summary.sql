-- Add conversation_summary column to workflow_redirects
ALTER TABLE workflow_redirects
  ADD COLUMN IF NOT EXISTS conversation_summary TEXT;
