import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { toast } from 'sonner'

import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/admin/EmptyState'
import {
  BookingStatusBadge,
  LeadStatusBadge,
} from '@/components/admin/StatusBadge'
import { Input } from '@/components/ui/input'
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { bookings } from '@/lib/admin/mock/bookings'
import { leads } from '@/lib/admin/mock/leads'
import { formatSv, formatTime, relativeSv } from '@/lib/admin/format'
import type { Customer } from '@/lib/admin/mock/types'
import { supabase } from '#/lib/utils'

export const Route = createFileRoute('/admin/customers/')({
  head: () => ({
    meta: [
      { title: 'Kunder · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  loader: async () => {
    // TODO: Fetch booking aggregates and linked leads here so totalBookings, lastBookingAt, and linkedLeadIds are real.
    const { data, error } = await supabase
      .from('customers')
      .select('id, name, email, phone, address, notes, created_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email ?? '',
      phone: customer.phone ?? '',
      address: customer.address ?? '',
      city: '',
      internalNotes: customer.notes ?? '',
      totalBookings: 0,
      lastBookingAt: undefined,
      linkedLeadIds: [],
      createdAt: customer.created_at,
    }))
  },
  component: CustomersPage,
})

function CustomersPage() {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const customers = Route.useLoaderData()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return customers
    return customers?.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q),
    )
  }, [query, customers])

  const open: Customer | null = openId
    ? (customers?.find((c) => c.id === openId) ?? null)
    : null
  const openBookings = open
    ? bookings
        .filter((b) => b.customerId === open.id)
        .sort((a, b) => b.startAt.localeCompare(a.startAt))
    : []
  const openLeads = open
    ? leads.filter((l) => open.linkedLeadIds.includes(l.id))
    : []

  return (
    <div>
      <PageHeader
        title="Kunder"
        description="CRM över alla återkommande kunder."
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-(--color-admin-text) px-3 text-sm font-medium text-white hover:bg-(--color-admin-accent)"
          >
            <Plus className="w-4 h-4" /> Lägg till kund
          </button>
        }
      />

      <div className="relative max-w-md mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-admin-muted)" />
        <Input
          placeholder="Sök kund…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 pl-9"
        />
      </div>

      <div className="overflow-hidden admin-card">
        {filtered?.length === 0 ? (
          <EmptyState title="Inga kunder matchar" />
        ) : (
          <Table>
            <TableHeader className="bg-(--color-admin-surface)">
              <TableRow className="border-(--color-admin-border)">
                <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                  Namn
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                  Telefon
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                  E-post
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                  Adress
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                  Senaste bokning
                </TableHead>
                <TableHead className="text-[11px] uppercase tracking-widest text-(--color-admin-muted) text-right">
                  Totalt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered?.map((c) => (
                <TableRow
                  key={c.id}
                  tabIndex={0}
                  onClick={() => setOpenId(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setOpenId(c.id)
                  }}
                  className="cursor-pointer border-(--color-admin-border) outline-none hover:bg-(--color-admin-surface) focus:bg-(--color-admin-surface)"
                >
                  <TableCell className="py-3 font-medium">{c.name}</TableCell>
                  <TableCell className="py-3 text-[13px] tabular-nums text-(--color-admin-muted)">
                    {c.phone}
                  </TableCell>
                  <TableCell className="py-3 text-[13px] text-(--color-admin-muted)">
                    {c.email}
                  </TableCell>
                  <TableCell className="py-3 text-[13px] text-(--color-admin-muted)">
                    {c.address}, {c.city}
                  </TableCell>
                  <TableCell className="py-3 text-[13px] text-(--color-admin-muted)">
                    {c.lastBookingAt ? relativeSv(c.lastBookingAt) : '—'}
                  </TableCell>
                  <TableCell className="py-3 text-right text-[13px] tabular-nums">
                    {c.totalBookings}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-xl"
        >
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{open.name}</SheetTitle>
                <SheetDescription>
                  Kund {open.id} · sedan {formatSv(open.createdAt)}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--color-admin-muted)">
                    Kontaktuppgifter
                  </h3>
                  <dl className="grid grid-cols-3 text-sm gap-y-2">
                    <dt className="text-(--color-admin-muted)">E-post</dt>
                    <dd className="col-span-2">{open.email}</dd>
                    <dt className="text-(--color-admin-muted)">Telefon</dt>
                    <dd className="col-span-2 tabular-nums">{open.phone}</dd>
                    <dt className="text-(--color-admin-muted)">Adress</dt>
                    <dd className="col-span-2">
                      {open.address}, {open.city}
                    </dd>
                  </dl>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--color-admin-muted)">
                    Bokningshistorik
                  </h3>
                  {openBookings.length === 0 ? (
                    <div className="text-sm text-(--color-admin-muted)">
                      Inga bokningar än.
                    </div>
                  ) : (
                    <ul className="divide-y divide-(--color-admin-border) rounded-lg border border-(--color-admin-border)">
                      {openBookings.map((b) => (
                        <li
                          key={b.id}
                          className="flex items-center gap-3 px-3 py-2 text-sm"
                        >
                          <div className="w-24 tabular-nums text-(--color-admin-muted)">
                            {formatSv(b.startAt)}
                          </div>
                          <div className="w-14 tabular-nums text-(--color-admin-muted)">
                            {formatTime(b.startAt)}
                          </div>
                          <div className="flex-1 truncate">{b.service}</div>
                          <BookingStatusBadge status={b.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--color-admin-muted)">
                    Kopplade leads
                  </h3>
                  {openLeads.length === 0 ? (
                    <div className="text-sm text-(--color-admin-muted)">
                      Inga kopplade leads.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {openLeads.map((l) => (
                        <li
                          key={l.id}
                          className="flex items-center justify-between rounded-md border border-(--color-admin-border) px-3 py-2 text-sm"
                        >
                          <div>
                            <div className="font-medium">{l.service}</div>
                            <div className="text-xs text-(--color-admin-muted)">
                              {relativeSv(l.receivedAt)}
                            </div>
                          </div>
                          <LeadStatusBadge status={l.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-(--color-admin-muted)">
                    Interna anteckningar
                  </h3>
                  <Textarea
                    rows={4}
                    defaultValue={open.internalNotes}
                    value={notes[open.id] ?? open.internalNotes}
                    onChange={(e) =>
                      setNotes((n) => ({ ...n, [open.id]: e.target.value }))
                    }
                  />
                  <button
                    // TODO: Persist notes to public.customers.notes instead of only updating local component state.
                    onClick={() =>
                      toast.success('Anteckningar sparade (lokalt)')
                    }
                    className="mt-2 inline-flex h-8 items-center rounded-md bg-(--color-admin-text) px-3 text-xs font-medium text-white"
                  >
                    Spara
                  </button>
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lägg till kund</DialogTitle>
            <DialogDescription>
              Formulär kommer i nästa iteration när backend kopplas.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
