import { MapPin, Clock } from 'lucide-react'
import type { CleaningJob } from '@/lib/admin/mock/types'
import { JobStatusBadge } from './JobStatusBadge'
import { StaffAvatarStack } from './StaffAvatar'
import { formatDuration } from '@/lib/admin/format'

interface Props {
  job: CleaningJob
  onClick?: () => void
  compact?: boolean
}

export function JobCard({ job, onClick, compact }: Props) {
  return (
    <button
      onClick={onClick}
      className="group block w-full rounded-lg border border-[var(--color-admin-border)] bg-white p-3 text-left transition-colors hover:border-[var(--color-admin-accent)] hover:bg-[var(--color-admin-accent-soft)]/40"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] tabular-nums text-[var(--color-admin-muted)]">
            <Clock className="h-3 w-3" />
            <span>
              {job.startTime}–{job.endTime}
            </span>
            <span>·</span>
            <span>{formatDuration(job.estimatedDurationMin)}</span>
          </div>
          <div className="mt-1 truncate text-sm font-medium text-[var(--color-admin-text)]">
            {job.customerName}
          </div>
          {!compact && (
            <div className="mt-0.5 truncate text-xs text-[var(--color-admin-muted)]">
              {job.service}
            </div>
          )}
          <div className="mt-1 flex items-center gap-1 truncate text-[11px] text-[var(--color-admin-muted)]">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{job.address}</span>
          </div>
        </div>
        <JobStatusBadge status={job.status} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <StaffAvatarStack ids={job.assignedStaffIds} />
        <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
          {job.service}
        </span>
      </div>
    </button>
  )
}
