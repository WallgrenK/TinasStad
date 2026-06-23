import type { ReactNode } from 'react'

interface KpiCardProps {
  label: string
  value: ReactNode
  delta?: string
  suffix?: string
}

export function KpiCard({ label, value, delta, suffix }: KpiCardProps) {
  return (
    <div className="admin-card relative overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-admin-accent)] opacity-40" />
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
        {label}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <div className="text-[28px] font-semibold leading-none tracking-tight text-[var(--color-admin-text)]">
          {value}
        </div>
        {suffix && (
          <div className="text-sm text-[var(--color-admin-muted)]">
            {suffix}
          </div>
        )}
      </div>
      {delta && (
        <div className="mt-2 text-xs text-[var(--color-admin-muted)]">
          {delta}
        </div>
      )}
    </div>
  )
}
