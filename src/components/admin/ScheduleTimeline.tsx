import type { CleaningJob, AdminStaff } from '@/lib/admin/mock/types'
import { JobStatusBadge } from './JobStatusBadge'

const START_HOUR = 7
const END_HOUR = 18
const HOURS = END_HOUR - START_HOUR
const PX_PER_HOUR = 56
const TOTAL_HEIGHT = HOURS * PX_PER_HOUR

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

interface Props {
  staff: AdminStaff[]
  jobs: CleaningJob[]
  onJobClick?: (job: CleaningJob) => void
}

export function ScheduleTimeline({ staff, jobs, onJobClick }: Props) {
  const hours = Array.from({ length: HOURS + 1 }, (_, i) => START_HOUR + i)

  return (
    <div className="admin-card overflow-x-auto">
      <div className="flex min-w-fit">
        {/* Time gutter */}
        <div className="sticky left-0 z-10 w-14 shrink-0 border-r border-[var(--color-admin-border)] bg-white">
          <div className="h-12 border-b border-[var(--color-admin-border)]" />
          <div className="relative" style={{ height: TOTAL_HEIGHT }}>
            {hours.map((h, i) => (
              <div
                key={h}
                className="absolute right-2 -translate-y-1/2 text-[10px] tabular-nums text-[var(--color-admin-muted)]"
                style={{ top: i * PX_PER_HOUR }}
              >
                {String(h).padStart(2, '0')}:00
              </div>
            ))}
          </div>
        </div>

        {/* Staff columns */}
        <div className="flex flex-1">
          {staff.map((s) => {
            const myJobs = jobs.filter((j) => j.assignedStaffIds.includes(s.id))
            return (
              <div
                key={s.id}
                className="min-w-[200px] flex-1 border-r border-[var(--color-admin-border)] last:border-r-0"
              >
                <div className="flex h-12 items-center gap-2 border-b border-[var(--color-admin-border)] bg-[var(--color-admin-surface)] px-3">
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-medium">
                      {s.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-[var(--color-admin-muted)]">
                      {myJobs.length} uppdrag
                    </div>
                  </div>
                </div>

                <div className="relative" style={{ height: TOTAL_HEIGHT }}>
                  {/* Hour gridlines */}
                  {hours.map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-t border-dashed border-[var(--color-admin-border)]/70"
                      style={{ top: i * PX_PER_HOUR }}
                    />
                  ))}

                  {myJobs.map((job) => {
                    const start = toMin(job.startTime)
                    const end = toMin(job.endTime)
                    const top = ((start - START_HOUR * 60) / 60) * PX_PER_HOUR
                    const height = Math.max(
                      ((end - start) / 60) * PX_PER_HOUR,
                      32,
                    )
                    return (
                      <button
                        key={job.id}
                        onClick={() => onJobClick?.(job)}
                        className="absolute left-1.5 right-1.5 overflow-hidden rounded-md border bg-white p-2 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
                        style={{
                          top,
                          height,
                          borderLeftWidth: 3,
                          borderLeftColor: s.color,
                          borderColor: 'var(--color-admin-border)',
                        }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[11px] font-medium leading-tight">
                              {job.customerName}
                            </div>
                            <div className="truncate text-[10px] text-[var(--color-admin-muted)]">
                              {job.service}
                            </div>
                          </div>
                        </div>
                        {height > 60 && (
                          <div className="mt-1.5 flex items-center justify-between text-[10px] tabular-nums text-[var(--color-admin-muted)]">
                            <span>
                              {job.startTime}–{job.endTime}
                            </span>
                            <JobStatusBadge status={job.status} />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
