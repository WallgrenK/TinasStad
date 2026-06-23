import type { CleaningJob } from '@/lib/admin/mock/types'
import { JobStatusBadge } from './JobStatusBadge'
import { StaffAvatarStack } from './StaffAvatar'

interface Props {
  weekStart: Date // monday
  jobs: CleaningJob[]
  onJobClick?: (job: CleaningJob) => void
}

const WEEKDAYS = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function ScheduleWeekGrid({ weekStart, jobs, onJobClick }: Props) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  return (
    <div className="admin-card overflow-hidden">
      <div className="grid grid-cols-1 divide-y divide-[var(--color-admin-border)] md:grid-cols-7 md:divide-x md:divide-y-0">
        {days.map((d) => {
          const key = ymd(d)
          const dayJobs = jobs
            .filter((j) => j.scheduledDate === key)
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
          const isToday = ymd(new Date()) === key
          return (
            <div key={key} className="flex min-h-[200px] flex-col">
              <div
                className={`flex items-baseline justify-between px-3 py-2 ${isToday ? 'bg-[var(--color-admin-accent-soft)]' : 'bg-[var(--color-admin-surface)]'}`}
              >
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                    {WEEKDAYS[(d.getDay() + 6) % 7]}
                  </div>
                  <div className="text-base font-semibold tabular-nums">
                    {d.getDate()}
                  </div>
                </div>
                <span className="text-[10px] tabular-nums text-[var(--color-admin-muted)]">
                  {dayJobs.length} jobb
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-2">
                {dayJobs.length === 0 ? (
                  <div className="my-auto text-center text-[11px] text-[var(--color-admin-muted)]">
                    —
                  </div>
                ) : (
                  dayJobs.map((j) => (
                    <button
                      key={j.id}
                      onClick={() => onJobClick?.(j)}
                      className="rounded-md border border-[var(--color-admin-border)] bg-white p-2 text-left hover:border-[var(--color-admin-accent)]"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="text-[10px] tabular-nums text-[var(--color-admin-muted)]">
                          {j.startTime}
                        </div>
                        <JobStatusBadge status={j.status} />
                      </div>
                      <div className="mt-0.5 truncate text-xs font-medium">
                        {j.customerName}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="truncate text-[10px] text-[var(--color-admin-muted)]">
                          {j.service}
                        </span>
                        <StaffAvatarStack ids={j.assignedStaffIds} />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
