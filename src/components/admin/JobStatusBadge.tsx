import type { JobStatus } from '@/lib/admin/mock/types'

const map: Record<JobStatus, { label: string; cls: string }> = {
  scheduled: { label: 'Planerad', cls: 'pill-blue' },
  in_progress: { label: 'Pågår', cls: 'pill-amber' },
  paused: { label: 'Pausad', cls: 'pill-zinc' },
  completed: { label: 'Klar', cls: 'pill-emerald' },
  cancelled: { label: 'Avbokad', cls: 'pill-rose' },
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const m = map[status]
  return <span className={`admin-pill ${m.cls}`}>{m.label}</span>
}

export const jobStatusLabels = map
