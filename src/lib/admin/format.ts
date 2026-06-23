export function formatSv(
  date: string | Date,
  opts?: Intl.DateTimeFormatOptions,
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(
    'sv-SE',
    opts ?? { dateStyle: 'medium' },
  ).format(d)
}

export function formatTime(date: string | Date): string {
  return formatSv(date, { hour: '2-digit', minute: '2-digit' })
}

export function formatDateTime(date: string | Date): string {
  return formatSv(date, { dateStyle: 'medium', timeStyle: 'short' })
}

export function relativeSv(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'just nu'
  if (diff < 3600) return `för ${Math.round(diff / 60)} min sedan`
  if (diff < 86400) return `för ${Math.round(diff / 3600)} tim sedan`
  const days = Math.round(diff / 86400)
  if (days < 30) return `för ${days} dag${days === 1 ? '' : 'ar'} sedan`
  return formatSv(d)
}

export function formatDuration(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} tim`
  return `${h} tim ${m} min`
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
