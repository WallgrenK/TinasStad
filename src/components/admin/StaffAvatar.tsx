import type { AdminStaff } from '@/lib/admin/mock/types'
import { staff as allStaff } from '@/lib/admin/mock/staff'

interface Props {
  staff: Pick<AdminStaff, 'initials' | 'color' | 'name'>
  size?: 'sm' | 'md' | 'lg'
  ring?: boolean
}

const sizeMap = {
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-8 w-8 text-[11px]',
  lg: 'h-12 w-12 text-sm',
}

export function StaffAvatar({ staff, size = 'md', ring }: Props) {
  return (
    <span
      title={staff.name}
      style={{ backgroundColor: staff.color }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${sizeMap[size]} ${
        ring ? 'ring-2 ring-white' : ''
      }`}
    >
      {staff.initials}
    </span>
  )
}

export function StaffAvatarStack({
  ids,
  size = 'sm',
}: {
  ids: string[]
  size?: 'sm' | 'md'
}) {
  const items = ids
    .map((id) => allStaff.find((s) => s.id === id))
    .filter(Boolean) as AdminStaff[]
  return (
    <div className="flex -space-x-1.5">
      {items.map((s) => (
        <StaffAvatar key={s.id} staff={s} size={size} ring />
      ))}
    </div>
  )
}
