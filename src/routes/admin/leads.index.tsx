import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { z } from 'zod'
import { toast } from 'sonner'

import { PageHeader } from '@/components/admin/PageHeader'
import {
  LeadStatusBadge,
  leadStatusLabels,
} from '@/components/admin/StatusBadge'
import { EmptyState } from '@/components/admin/EmptyState'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { leads as seedLeads } from '@/lib/admin/mock/leads'
import type { Lead, LeadStatus } from '@/lib/admin/mock/types'
import { formatDateTime, relativeSv } from '@/lib/admin/format'

const searchSchema = z.object({ id: z.string().optional() })

export const Route = createFileRoute('/admin/leads/')({
  head: () => ({
    meta: [
      { title: 'Leads · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  validateSearch: searchSchema,
  component: LeadsPage,
})

function LeadsPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const [leads, setLeads] = useState<Lead[]>(seedLeads)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all')
  const [sort, setSort] = useState<'newest' | 'oldest' | 'name'>('newest')
  const [openId, setOpenId] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [draftNote, setDraftNote] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let out = leads.filter((l) => {
      if (statusFilter !== 'all' && l.status !== statusFilter) return false
      if (!q) return true
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.city.toLowerCase().includes(q)
      )
    })
    out = out.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'sv')
      if (sort === 'oldest') return a.receivedAt.localeCompare(b.receivedAt)
      return b.receivedAt.localeCompare(a.receivedAt)
    })
    return out
  }, [leads, query, statusFilter, sort])

  const activeOpenId = openId ?? search.id ?? null
  const open = activeOpenId
    ? (leads.find((l) => l.id === activeOpenId) ?? null)
    : null

  function updateStatus(id: string, newStatus: LeadStatus) {
    setLeads((curr) =>
      curr.map((l) => {
        if (l.id !== id) return l
        if (l.status === newStatus) return l
        return {
          ...l,
          status: newStatus,
          activity: [
            ...l.activity,
            {
              id: `a${l.activity.length + 1}`,
              kind: 'status',
              label: `Status: ${leadStatusLabels[l.status].label} → ${leadStatusLabels[newStatus].label}`,
              at: new Date().toISOString(),
            },
          ],
        }
      }),
    )
    toast.success('Status uppdaterad (lokalt)')
  }

  function addNote(id: string) {
    if (!draftNote.trim()) return
    setLeads((curr) =>
      curr.map((l) =>
        l.id === id
          ? {
              ...l,
              notes: [
                ...l.notes,
                {
                  id: `n${l.notes.length + 1}`,
                  author: 'Tina',
                  body: draftNote.trim(),
                  createdAt: new Date().toISOString(),
                },
              ],
              activity: [
                ...l.activity,
                {
                  id: `a${l.activity.length + 1}`,
                  kind: 'note',
                  label: 'Anteckning tillagd',
                  at: new Date().toISOString(),
                },
              ],
            }
          : l,
      ),
    )
    setDraftNote('')
    toast.success('Anteckning sparad')
  }

  function close() {
    setOpenId(null)
    navigate({ search: {} })
  }

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Hantera inkomna offertförfrågningar och kontaktförsök."
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-(--color-admin-text) px-3 text-sm font-medium text-white transition-colors hover:bg-(--color-admin-accent)"
          >
            <Plus className="h-4 w-4" /> Ny lead
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-55 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-var(--color-admin-muted)" />
          <Input
            placeholder="Sök på namn, e-post, telefon, ort…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as 'all' | LeadStatus)}
        >
          <SelectTrigger className="h-9 w-42.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla statusar</SelectItem>
            {(Object.keys(leadStatusLabels) as LeadStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {leadStatusLabels[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
          <SelectTrigger className="h-9 w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Senaste först</SelectItem>
            <SelectItem value="oldest">Äldsta först</SelectItem>
            <SelectItem value="name">Namn A–Ö</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="admin-card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            title="Inga leads matchar filtret"
            description="Justera sökningen eller statusfiltret för att se fler."
          />
        ) : (
          <Table>
            <TableHeader className="sticky top-0 bg-(--color-admin-surface)">
              <TableRow className="border-(--color-admin-border)">
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-var(--color-admin-muted)">
                  Namn
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-var(--color-admin-muted)">
                  Kontakt
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-var(--color-admin-muted)">
                  Adress
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-var(--color-admin-muted)">
                  Tjänst
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-var(--color-admin-muted)">
                  Mottagen
                </TableHead>
                <TableHead className="text-[11px] font-medium uppercase tracking-widest text-var(--color-admin-muted)">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((l) => (
                <TableRow
                  key={l.id}
                  tabIndex={0}
                  onClick={() => setOpenId(l.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setOpenId(l.id)
                  }}
                  className="cursor-pointer border-(--color-admin-border) outline-none transition-colors hover:bg-(--color-admin-surface) focus:bg-(--color-admin-surface)"
                >
                  <TableCell className="py-3 font-medium text-(--color-admin-text)">
                    {l.name}
                  </TableCell>
                  <TableCell className="py-3 text-[13px] text-var(--color-admin-muted)">
                    <div>{l.email}</div>
                    <div className="tabular-nums">{l.phone}</div>
                  </TableCell>
                  <TableCell className="py-3 text-[13px] text-var(--color-admin-muted)">
                    <div>{l.address}</div>
                    <div className="text-[12px]">{l.city}</div>
                  </TableCell>
                  <TableCell className="py-3 text-[13px]">
                    {l.service}
                  </TableCell>
                  <TableCell
                    className="py-3 text-[13px] text-var(--color-admin-muted)"
                    title={formatDateTime(l.receivedAt)}
                  >
                    {relativeSv(l.receivedAt)}
                  </TableCell>
                  <TableCell className="py-3">
                    <LeadStatusBadge status={l.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && close()}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-xl"
        >
          {open && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between gap-3">
                  <SheetTitle className="text-lg">{open.name}</SheetTitle>
                  <LeadStatusBadge status={open.status} />
                </div>
                <SheetDescription>
                  Lead {open.id} · mottagen {formatDateTime(open.receivedAt)}
                </SheetDescription>
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
                    <dt className="text-var(--color-admin-muted)">Adress</dt>
                    <dd className="col-span-2">
                      {open.address}, {open.city}
                    </dd>
                  </dl>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-var(--color-admin-muted)">
                    Förfrågan
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-var(--color-admin-muted)">
                        Tjänst:
                      </span>{' '}
                      {open.service}
                    </div>
                    <div>
                      <span className="text-var(--color-admin-muted)">
                        Yta:
                      </span>{' '}
                      {open.propertySize}
                    </div>
                    <div className="rounded-lg border border-(--color-admin-border) bg-(--color-admin-surface) p-3 italic text-(--color-admin-text)">
                      "{open.message}"
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-var(--color-admin-muted)">
                    Status
                  </h3>
                  <Select
                    value={open.status}
                    onValueChange={(v) =>
                      updateStatus(open.id, v as LeadStatus)
                    }
                  >
                    <SelectTrigger className="h-9 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(leadStatusLabels) as LeadStatus[]).map(
                        (s) => (
                          <SelectItem key={s} value={s}>
                            {leadStatusLabels[s].label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-var(--color-admin-muted)">
                    Anteckningar
                  </h3>
                  <div className="space-y-2">
                    {open.notes.length === 0 && (
                      <div className="text-sm text-var(--color-admin-muted)">
                        Inga anteckningar än.
                      </div>
                    )}
                    {open.notes.map((n) => (
                      <div
                        key={n.id}
                        className="rounded-lg border border-(--color-admin-border) bg-(--color-admin-bg) p-3"
                      >
                        <div className="text-sm text-(--color-admin-text)">
                          {n.body}
                        </div>
                        <div className="mt-1 text-xs text-var(--color-admin-muted)">
                          {n.author} · {relativeSv(n.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 space-y-2">
                    <Textarea
                      placeholder="Lägg till en anteckning…"
                      value={draftNote}
                      onChange={(e) => setDraftNote(e.target.value)}
                      rows={2}
                    />
                    <button
                      onClick={() => addNote(open.id)}
                      disabled={!draftNote.trim()}
                      className="inline-flex h-8 items-center rounded-md bg-(--color-admin-text) px-3 text-xs font-medium text-white disabled:opacity-40"
                    >
                      Spara anteckning
                    </button>
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-var(--color-admin-muted)">
                    Aktivitet
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[...open.activity].reverse().map((a) => (
                      <li
                        key={a.id}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <span>{a.label}</span>
                        <span className="text-xs text-var(--color-admin-muted)">
                          {relativeSv(a.at)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny lead</DialogTitle>
            <DialogDescription>
              Formulär kommer i nästa iteration när backend kopplas.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
