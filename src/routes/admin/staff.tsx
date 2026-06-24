import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, Search, Mail, Phone, Clock } from 'lucide-react'

import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/admin/EmptyState'
import { StaffAvatar } from '@/components/admin/StaffAvatar'
import { JobCard } from '@/components/admin/JobCard'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { staff as allStaff } from '@/lib/admin/mock/staff'
import { jobs, jobsForStaff, TODAY_DATE } from '@/lib/admin/mock/jobs'
import { timeEntries } from '@/lib/admin/mock/timeEntries'
import { formatDuration } from '@/lib/admin/format'
import type { AdminStaff } from '@/lib/admin/mock/types'

export const Route = createFileRoute('/admin/staff')({
  head: () => ({
    meta: [
      { title: 'Personal · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: StaffPage,
})

function plannedHoursThisWeek(staffId: string) {
  const min = jobs
    .filter((j) => j.assignedStaffIds.includes(staffId))
    .reduce((sum, j) => sum + j.estimatedDurationMin, 0)
  return min
}

function StaffPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allStaff.filter((s) => {
      if (filter !== 'all' && s.status !== filter) return false
      if (!q) return true
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q)
      )
    })
  }, [query, filter])

  const open: AdminStaff | null = openId
    ? (allStaff.find((s) => s.id === openId) ?? null)
    : null
  const openToday = open ? jobsForStaff(open.id, TODAY_DATE) : []

  return (
    <div>
      <PageHeader
        title="Personal"
        description="Hantera städpersonal, kontaktuppgifter och arbetstider."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-var(--color-admin-text) px-3 text-sm font-medium text-white hover:bg-var(--color-admin-accent)">
            <Plus className="h-4 w-4" /> Lägg till personal
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-var(--color-admin-muted)" />
          <Input
            placeholder="Sök personal…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Tabs
          value={filter}
          onValueChange={(v) => setFilter(v as typeof filter)}
        >
          <TabsList>
            <TabsTrigger value="all">Alla</TabsTrigger>
            <TabsTrigger value="active">Aktiv</TabsTrigger>
            <TabsTrigger value="inactive">Inaktiv</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Ingen personal matchar" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const todayCount = jobsForStaff(s.id, TODAY_DATE).length
            const weekMin = plannedHoursThisWeek(s.id)
            return (
              <button
                key={s.id}
                onClick={() => setOpenId(s.id)}
                className="admin-card p-5 text-left transition-shadow hover:shadow-var(--shadow-soft)"
              >
                <div className="flex items-start gap-3">
                  <StaffAvatar staff={s} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate font-semibold">{s.name}</div>
                        <div className="text-xs text-var(--color-admin-muted)">
                          {s.role}
                        </div>
                      </div>
                      <span
                        className={`admin-pill ${s.status === 'active' ? 'pill-emerald' : 'pill-zinc'}`}
                      >
                        {s.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-var(--color-admin-muted)">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span className="tabular-nums">{s.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{s.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{s.workingHours}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-var(--color-admin-border) pt-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-var(--color-admin-muted)">
                      Idag
                    </div>
                    <div className="text-sm font-semibold tabular-nums">
                      {todayCount} uppdrag
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-var(--color-admin-muted)">
                      Vecka
                    </div>
                    <div className="text-sm font-semibold tabular-nums">
                      {formatDuration(weekMin)}
                    </div>
                  </div>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      )}

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-xl"
        >
          {open && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3">
                  <StaffAvatar staff={open} size="lg" />
                  <div>
                    <SheetTitle className="text-lg">{open.name}</SheetTitle>
                    <SheetDescription>
                      {open.role} · {open.workingHours}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-var(--color-admin-muted)">
                    Kontakt
                  </h3>
                  <dl className="grid grid-cols-3 gap-y-2 text-sm">
                    <dt className="text-var(--color-admin-muted)">E-post</dt>
                    <dd className="col-span-2">{open.email}</dd>
                    <dt className="text-var(--color-admin-muted)">Telefon</dt>
                    <dd className="col-span-2 tabular-nums">{open.phone}</dd>
                  </dl>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-var(--color-admin-muted)">
                    Dagens uppdrag ({openToday.length})
                  </h3>
                  {openToday.length === 0 ? (
                    <div className="text-sm text-var(--color-admin-muted)">
                      Inga uppdrag idag.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {openToday.map((j) => (
                        <JobCard key={j.id} job={j} compact />
                      ))}
                    </div>
                  )}
                </section>

                <section className="grid grid-cols-3 gap-3">
                  <Stat
                    label="Planerat (vecka)"
                    value={formatDuration(plannedHoursThisWeek(open.id))}
                  />
                  <Stat
                    label="Avslutade"
                    value={String(
                      timeEntries.filter(
                        (t) => t.staffId === open.id && t.finishedAt,
                      ).length,
                    )}
                  />
                  <Stat
                    label="Snittavvikelse"
                    value={(() => {
                      const v = timeEntries
                        .filter(
                          (t) => t.staffId === open.id && t.varianceMin != null,
                        )
                        .map((t) => t.varianceMin!)
                      if (v.length === 0) return '—'
                      const avg = Math.round(
                        v.reduce((a, b) => a + b, 0) / v.length,
                      )
                      return `${avg >= 0 ? '+' : ''}${avg} min`
                    })()}
                  />
                </section>

                <button className="inline-flex h-9 items-center rounded-md border border-var(--color-admin-border) bg-white px-3 text-sm font-medium">
                  Redigera profil
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-var(--color-admin-border) bg-var(--color-admin-surface) p-3">
      <div className="text-[10px] uppercase tracking-widest text-var(--color-admin-muted)">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold tabular-nums">{value}</div>
    </div>
  )
}
