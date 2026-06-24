import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Phone, MapPin } from 'lucide-react'

import { PageHeader } from '@/components/admin/PageHeader'
import { ScheduleTimeline } from '@/components/admin/ScheduleTimeline'
import { ScheduleWeekGrid } from '@/components/admin/ScheduleWeekGrid'
import { JobStatusBadge } from '@/components/admin/JobStatusBadge'
import { StaffAvatar } from '@/components/admin/StaffAvatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { staff as allStaff } from '@/lib/admin/mock/staff'
import { jobs } from '@/lib/admin/mock/jobs'
import { formatDuration, formatSv } from '@/lib/admin/format'
import type { CleaningJob, ServiceName } from '@/lib/admin/mock/types'

export const Route = createFileRoute('/admin/schedule')({
  head: () => ({
    meta: [
      { title: 'Schema · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: SchedulePage,
})

const SERVICES: ServiceName[] = [
  'Hemstädning',
  'Veckostädning',
  'Månadsstädning',
  'Flyttstädning',
  'Fönsterputs',
  'Kontorsstädning',
  'Storstädning',
]

function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function weekStartOf(d: Date) {
  const out = new Date(d)
  const day = (out.getDay() + 6) % 7 // Mon = 0
  out.setDate(out.getDate() - day)
  out.setHours(0, 0, 0, 0)
  return out
}

function SchedulePage() {
  const [view, setView] = useState<'day' | 'week'>('day')
  const [date, setDate] = useState(new Date('2026-06-23T00:00:00'))
  const [staffFilter, setStaffFilter] = useState<string>('all')
  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [openJobId, setOpenJobId] = useState<string | null>(null)

  const visibleStaff =
    staffFilter === 'all'
      ? allStaff.filter((s) => s.status === 'active')
      : allStaff.filter((s) => s.id === staffFilter)

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      if (serviceFilter !== 'all' && j.service !== serviceFilter) return false
      if (staffFilter !== 'all' && !j.assignedStaffIds.includes(staffFilter))
        return false
      return true
    })
  }, [serviceFilter, staffFilter])

  const dayJobs = filteredJobs.filter((j) => j.scheduledDate === ymd(date))
  const weekJobs = filteredJobs
  const weekStart = weekStartOf(date)

  const shift = (n: number) => {
    const d = new Date(date)
    d.setDate(d.getDate() + n * (view === 'day' ? 1 : 7))
    setDate(d)
  }

  const open: CleaningJob | null = openJobId
    ? (jobs.find((j) => j.id === openJobId) ?? null)
    : null
  const openStaff = open
    ? allStaff.filter((s) => open.assignedStaffIds.includes(s.id))
    : []

  return (
    <div>
      <PageHeader
        title="Schema"
        description="Tilldela städuppdrag till personal och planera dagar och veckor."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white hover:bg-[var(--color-admin-accent)]">
            <Plus className="h-4 w-4" /> Ny bokning
          </button>
        }
      />

      <div className="admin-card mb-4 flex flex-wrap items-center gap-2 p-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => shift(-1)}
            className="grid h-8 w-8 place-items-center rounded-md border border-[var(--color-admin-border)] hover:bg-[var(--color-admin-surface)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="min-w-[180px] px-3 text-sm font-medium tabular-nums">
            {view === 'day'
              ? formatSv(date, {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })
              : `Vecka ${weekStart.getDate()}–${new Date(weekStart.getTime() + 6 * 86400_000).getDate()} ${formatSv(weekStart, { month: 'long' })}`}
          </div>
          <button
            onClick={() => shift(1)}
            className="grid h-8 w-8 place-items-center rounded-md border border-[var(--color-admin-border)] hover:bg-[var(--color-admin-surface)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDate(new Date('2026-06-23T00:00:00'))}
            className="ml-1 h-8 rounded-md border border-[var(--color-admin-border)] px-3 text-xs font-medium hover:bg-[var(--color-admin-surface)]"
          >
            Idag
          </button>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Select value={staffFilter} onValueChange={setStaffFilter}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Personal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All personal</SelectItem>
              {allStaff.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Tjänst" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla tjänster</SelectItem>
              {SERVICES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as 'day' | 'week')}
          >
            <TabsList>
              <TabsTrigger value="day">Dag</TabsTrigger>
              <TabsTrigger value="week">Vecka</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {view === 'day' ? (
        <ScheduleTimeline
          staff={visibleStaff}
          jobs={dayJobs}
          onJobClick={(j) => setOpenJobId(j.id)}
        />
      ) : (
        <ScheduleWeekGrid
          weekStart={weekStart}
          jobs={weekJobs}
          onJobClick={(j) => setOpenJobId(j.id)}
        />
      )}

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenJobId(null)}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-xl"
        >
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{open.customerName}</SheetTitle>
                <SheetDescription>
                  {open.service} · {formatSv(open.scheduledDate)} ·{' '}
                  {open.startTime}–{open.endTime}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <JobStatusBadge status={open.status} />
                  <div className="text-xs text-[var(--color-admin-muted)]">
                    Estimerat {formatDuration(open.estimatedDurationMin)}
                  </div>
                </div>

                <section className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[var(--color-admin-muted)]">
                    <MapPin className="h-4 w-4" /> <span>{open.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-admin-muted)]">
                    <Phone className="h-4 w-4" />{' '}
                    <span className="tabular-nums">{open.customerPhone}</span>
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                    Tilldelad personal
                  </h3>
                  <div className="mb-3 flex items-center gap-2">
                    {openStaff.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center gap-2 rounded-full border border-[var(--color-admin-border)] bg-white py-1 pl-1 pr-3"
                      >
                        <StaffAvatar staff={s} size="sm" />
                        <span className="text-xs">{s.name}</span>
                      </div>
                    ))}
                  </div>
                  <Select defaultValue={open.assignedStaffIds[0]}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Lägg till personal…" />
                    </SelectTrigger>
                    <SelectContent>
                      {allStaff.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                    Interna anteckningar
                  </h3>
                  <p className="rounded-md border border-[var(--color-admin-border)] bg-[var(--color-admin-surface)] p-3 text-sm">
                    {open.internalNotes || '—'}
                  </p>
                </section>

                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex h-9 items-center rounded-md border border-[var(--color-admin-border)] bg-white px-3 text-sm font-medium">
                    Boka om
                  </button>
                  <Link
                    to="/admin/time-tracking"
                    className="inline-flex h-9 items-center rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white"
                  >
                    Öppna i tidsspårning
                  </Link>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
