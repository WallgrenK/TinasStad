import { Inbox, Calendar, UserPlus, Star } from 'lucide-react'
import type { ActivityEvent } from '@/lib/admin/mock/types'
import { relativeSv } from '@/lib/admin/format'

const iconMap = {
  lead: Inbox,
  booking: Calendar,
  customer: UserPlus,
  review: Star,
} as const

export function ActivityTimeline({ events }: { events: ActivityEvent[] }) {
  return (
    <ol className="relative space-y-4 pl-5">
      <span
        className="absolute left-[7px] top-1 bottom-1 w-px bg-[var(--color-admin-border)]"
        aria-hidden
      />
      {events.map((e) => {
        const Icon = iconMap[e.kind]
        return (
          <li key={e.id} className="relative">
            <span className="absolute -left-5 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--color-admin-bg)] ring-1 ring-[var(--color-admin-border)]">
              <Icon className="h-2.5 w-2.5 text-(--color-admin-accent)" />
            </span>
            <div className="text-sm font-medium text-[var(--color-admin-text)]">
              {e.title}
            </div>
            <div className="text-sm text-[var(--color-admin-muted)]">
              {e.description}
            </div>
            <div className="mt-0.5 text-xs text-[var(--color-admin-muted)]">
              {relativeSv(e.at)}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
