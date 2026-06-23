import { formatDuration } from '@/lib/admin/format'

interface Props {
  estimatedMin: number
  actualMin?: number
}

export function TimeVarianceBadge({ estimatedMin, actualMin }: Props) {
  if (actualMin == null) {
    return <span className="admin-pill pill-zinc">Pågår</span>
  }
  const diff = actualMin - estimatedMin
  const abs = Math.abs(diff)
  if (abs <= 5)
    return (
      <span className="admin-pill pill-emerald">
        I tid · {formatDuration(actualMin)}
      </span>
    )
  if (diff < 0)
    return <span className="admin-pill pill-blue">−{formatDuration(abs)}</span>
  return <span className="admin-pill pill-rose">+{formatDuration(abs)}</span>
}
