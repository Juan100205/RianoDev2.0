// Vanilla JS time/date utilities (no external deps)

export function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '—';
  try {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    if (isNaN(then)) return '—';
    const diffMs = now - then;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSecs < 60) return 'hace un momento';
    if (diffMins < 60) return `hace ${diffMins} min`;
    if (diffHours < 24) return `hace ${diffHours} h`;
    if (diffDays < 7) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffWeeks < 5) return `hace ${diffWeeks} semana${diffWeeks > 1 ? 's' : ''}`;
    if (diffMonths < 12) return `hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    return `hace ${diffYears} año${diffYears > 1 ? 's' : ''}`;
  } catch {
    return '—';
  }
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '—';
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${day} de ${month}, ${hh}:${mm}`;
  } catch {
    return '—';
  }
}
