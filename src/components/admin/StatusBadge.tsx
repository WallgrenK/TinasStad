import type { BookingStatus, LeadStatus } from '@/lib/admin/mock/types'

const leadMap: Record<LeadStatus, { label: string; cls: string }> = {
  new: { label: 'Ny', cls: 'pill-blue' },
  contacted: { label: 'Kontaktad', cls: 'pill-amber' },
  quote_sent: { label: 'Offert skickad', cls: 'pill-violet' },
  won: { label: 'Vunnen', cls: 'pill-emerald' },
  lost: { label: 'Förlorad', cls: 'pill-zinc' },
}

const bookingMap: Record<BookingStatus, { label: string; cls: string }> = {
  scheduled: { label: 'Bokad', cls: 'pill-blue' },
  in_progress: { label: 'Pågår', cls: 'pill-amber' },
  completed: { label: 'Klar', cls: 'pill-emerald' },
  cancelled: { label: 'Avbokad', cls: 'pill-zinc' },
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const m = leadMap[status]
  return <span className={`admin-pill ${m.cls}`}>{m.label}</span>
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const m = bookingMap[status]
  return <span className={`admin-pill ${m.cls}`}>{m.label}</span>
}

export const leadStatusLabels = leadMap
export const bookingStatusLabels = bookingMap
