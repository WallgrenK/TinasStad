import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

import { PageHeader } from '@/components/admin/PageHeader'
import { BookingStatusBadge } from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { bookings } from '@/lib/admin/mock/bookings'
import {
  formatSv,
  formatTime,
  formatDuration,
  isSameDay,
} from '@/lib/admin/format'
import type { BookingStatus } from '@/lib/admin/mock/types'

export const Route = createFileRoute('/admin/bookings/')({
  head: () => ({
    meta: [
      { title: 'Bokningar · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: BookingsPage,
})

const statusDot: Record<BookingStatus, string> = {
  scheduled: 'bg-[oklch(0.6_0.14_240)]',
  in_progress: 'bg-[oklch(0.65_0.14_70)]',
  completed: 'bg-[oklch(0.6_0.12_155)]',
  cancelled: 'bg-[oklch(0.7_0.005_250)]',
}

function BookingsPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())

  const sorted = useMemo(
    () => [...bookings].sort((a, b) => a.startAt.localeCompare(b.startAt)),
    [],
  )

  const daysWithDots = useMemo(() => {
    const map = new Map<string, BookingStatus[]>()
    for (const b of bookings) {
      const d = new Date(b.startAt)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      const arr = map.get(key) ?? []
      arr.push(b.status)
      map.set(key, arr)
    }
    return map
  }, [])

  const dayBookings = selectedDay
    ? sorted.filter((b) => isSameDay(new Date(b.startAt), selectedDay))
    : []

  return (
    <div>
      <PageHeader
        title="Bokningar"
        description="Planera, omboka och följ upp städuppdrag."
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-(--color-admin-text) px-3 text-sm font-medium text-white hover:bg-(--color-admin-accent)"
          >
            <Plus className="h-4 w-4" /> Skapa bokning
          </button>
        }
      />

      <Tabs defaultValue="list">
        <TabsList className="bg-(--color-admin-surface)">
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <div className="admin-card overflow-hidden">
            <Table>
              <TableHeader className="bg-(--color-admin-surface)">
                <TableRow className="border-(--color-admin-border)">
                  <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Kund
                  </TableHead>
                  <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Adress
                  </TableHead>
                  <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Tjänst
                  </TableHead>
                  <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Datum
                  </TableHead>
                  <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Tid
                  </TableHead>
                  <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Längd
                  </TableHead>
                  <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Status
                  </TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((b) => (
                  <TableRow
                    key={b.id}
                    className="border-(--color-admin-border) hover:bg-(--color-admin-surface)"
                  >
                    <TableCell className="py-3 font-medium">
                      {b.customerName}
                    </TableCell>
                    <TableCell className="py-3 text-[13px] text-(--color-admin-muted)">
                      {b.address}
                    </TableCell>
                    <TableCell className="py-3 text-[13px]">
                      {b.service}
                    </TableCell>
                    <TableCell className="py-3 text-[13px] tabular-nums">
                      {formatSv(b.startAt)}
                    </TableCell>
                    <TableCell className="py-3 text-[13px] tabular-nums">
                      {formatTime(b.startAt)}
                    </TableCell>
                    <TableCell className="py-3 text-[13px] text-(--color-admin-muted)">
                      {formatDuration(b.durationMin)}
                    </TableCell>
                    <TableCell className="py-3">
                      <BookingStatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded p-1 text-(--color-admin-muted) hover:bg-(--color-admin-surface) hover:text-(--color-admin-text)">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              toast('Omboka — funktion i nästa iteration')
                            }
                          >
                            Omboka
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              toast.success('Markerad som klar (lokalt)')
                            }
                          >
                            Markera som klar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast('Avbokad (lokalt)')}
                            className="text-rose-600"
                          >
                            Avboka
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
            <div className="admin-card p-3">
              <Calendar
                mode="single"
                selected={selectedDay}
                onSelect={setSelectedDay}
                showOutsideDays
                weekStartsOn={1}
                components={{
                  DayButton: ({ day, modifiers, ...props }) => {
                    const date = day.date
                    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                    const statuses = daysWithDots.get(key) ?? []
                    const unique = Array.from(new Set(statuses)).slice(0, 3)
                    return (
                      <button
                        {...props}
                        className={`${props.className ?? ''} relative flex h-9 w-9 flex-col items-center justify-center rounded-md text-sm`}
                      >
                        <span>{date.getDate()}</span>
                        {unique.length > 0 && (
                          <span className="absolute bottom-1 flex gap-0.5">
                            {unique.map((s, i) => (
                              <span
                                key={i}
                                className={`h-1 w-1 rounded-full ${statusDot[s]}`}
                              />
                            ))}
                          </span>
                        )}
                      </button>
                    )
                  },
                }}
              />
              <div className="mt-3 flex flex-wrap gap-3 border-t border-(--color-admin-border) pt-3 text-[11px] text-(--color-admin-muted)">
                <Legend dot={statusDot.scheduled} label="Bokad" />
                <Legend dot={statusDot.in_progress} label="Pågår" />
                <Legend dot={statusDot.completed} label="Klar" />
                <Legend dot={statusDot.cancelled} label="Avbokad" />
              </div>
            </div>

            <div className="admin-card overflow-hidden">
              <header className="border-b border-(--color-admin-border) px-5 py-3">
                <h2 className="text-sm font-semibold">
                  {selectedDay
                    ? formatSv(selectedDay, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })
                    : 'Välj ett datum'}
                </h2>
                <p className="text-xs text-(--color-admin-muted)">
                  {dayBookings.length} bokning
                  {dayBookings.length === 1 ? '' : 'ar'}
                </p>
              </header>
              {dayBookings.length === 0 ? (
                <EmptyState title="Inga bokningar denna dag" />
              ) : (
                <ul className="divide-y divide-(--color-admin-border)">
                  {dayBookings.map((b) => (
                    <li
                      key={b.id}
                      className="flex items-center gap-4 px-5 py-3"
                    >
                      <div className="w-14 text-sm font-medium tabular-nums">
                        {formatTime(b.startAt)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          {b.customerName}
                        </div>
                        <div className="truncate text-xs text-(--color-admin-muted)">
                          {b.service} · {b.address} ·{' '}
                          {formatDuration(b.durationMin)}
                        </div>
                      </div>
                      <BookingStatusBadge status={b.status} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skapa bokning</DialogTitle>
            <DialogDescription>
              Bokningsformulär kommer i nästa iteration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 opacity-60">
            <div className="rounded-md border border-dashed border-(--color-admin-border) p-3 text-sm">
              Kund · välj eller skapa
            </div>
            <div className="rounded-md border border-dashed border-(--color-admin-border) p-3 text-sm">
              Tjänst · datum · tid · längd
            </div>
            <div className="rounded-md border border-dashed border-(--color-admin-border) p-3 text-sm">
              Adress · noteringar
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
