import { Lock } from 'lucide-react'
import { PageHeader } from './PageHeader'

interface ComingSoonProps {
  title: string
  description: string
  previewCards: { title: string; subtitle: string }[]
}

export function ComingSoon({
  title,
  description,
  previewCards,
}: ComingSoonProps) {
  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <span className="admin-pill pill-zinc">
            <Lock className="h-3 w-3" />
            Kommer i nästa iteration
          </span>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {previewCards.map((card) => (
          <div
            key={card.title}
            className="admin-card relative overflow-hidden p-5 opacity-60"
            aria-disabled
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0,transparent_49%,var(--color-admin-surface)_49%,var(--color-admin-surface)_51%,transparent_51%)] bg-[length:8px_8px] opacity-30" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                  Förhandsvisning
                </div>
                <Lock className="h-3.5 w-3.5 text-[var(--color-admin-muted)]" />
              </div>
              <div className="mt-3 text-base font-semibold text-[var(--color-admin-text)]">
                {card.title}
              </div>
              <div className="mt-1 text-sm text-[var(--color-admin-muted)]">
                {card.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
