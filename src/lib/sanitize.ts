/** Strips leading '=' to prevent spreadsheet formula injection and trims whitespace. */
export function sanitize(text: string | null | undefined): string {
  if (!text) return '';
  const t = text.trim();
  return t.startsWith('=') ? t.substring(1).trim() : t;
}
