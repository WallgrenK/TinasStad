interface Props {
  done: number
  total: number
}

export function ChecklistProgress({ done, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-admin-surface-2)]">
        <div
          className="h-full rounded-full bg-[var(--color-admin-accent)] transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 text-[11px] font-medium tabular-nums text-[var(--color-admin-muted)]">
        {done}/{total} klara
      </span>
    </div>
  )
}
