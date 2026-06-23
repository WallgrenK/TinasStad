import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-admin-surface)] text-[var(--color-admin-muted)]">
        {icon ?? <Inbox className="h-5 w-5" />}
      </div>
      <div className="text-sm font-medium text-[var(--color-admin-text)]">
        {title}
      </div>
      {description && (
        <div className="mt-1 max-w-sm text-sm text-[var(--color-admin-muted)]">
          {description}
        </div>
      )}
    </div>
  )
}
