import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { BookingStatusBadge, LeadStatusBadge } from "@/components/admin/StatusBadge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { customers } from "@/lib/admin/mock/customers";
import { bookings } from "@/lib/admin/mock/bookings";
import { leads } from "@/lib/admin/mock/leads";
import { formatSv, formatTime, relativeSv } from "@/lib/admin/format";
import type { Customer } from "@/lib/admin/mock/types";

export const Route = createFileRoute("/admin/customers/")({
  head: () => ({ meta: [{ title: "Kunder · Admin · Tinas Städ" }, { name: "robots", content: "noindex" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q),
    );
  }, [query]);

  const open: Customer | null = openId ? customers.find((c) => c.id === openId) ?? null : null;
  const openBookings = open ? bookings.filter((b) => b.customerId === open.id).sort((a, b) => b.startAt.localeCompare(a.startAt)) : [];
  const openLeads = open ? leads.filter((l) => open.linkedLeadIds.includes(l.id)) : [];

  return (
    <div>
      <PageHeader
        title="Kunder"
        description="CRM över alla återkommande kunder."
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white hover:bg-[var(--color-admin-accent)]"
          >
            <Plus className="h-4 w-4" /> Lägg till kund
          </button>
        }
      />

      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-admin-muted)]" />
        <Input
          placeholder="Sök kund…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 pl-9"
        />
      </div>

      <div className="admin-card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="Inga kunder matchar" />
        ) : (
          <Table>
            <TableHeader className="bg-[var(--color-admin-surface)]">
              <TableRow className="border-[var(--color-admin-border)]">
                <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Namn</TableHead>
                <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Telefon</TableHead>
                <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">E-post</TableHead>
                <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Adress</TableHead>
                <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Senaste bokning</TableHead>
                <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)] text-right">Totalt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow
                  key={c.id}
                  tabIndex={0}
                  onClick={() => setOpenId(c.id)}
                  onKeyDown={(e) => { if (e.key === "Enter") setOpenId(c.id); }}
                  className="cursor-pointer border-[var(--color-admin-border)] outline-none hover:bg-[var(--color-admin-surface)] focus:bg-[var(--color-admin-surface)]"
                >
                  <TableCell className="py-3 font-medium">{c.name}</TableCell>
                  <TableCell className="py-3 text-[13px] tabular-nums text-[var(--color-admin-muted)]">{c.phone}</TableCell>
                  <TableCell className="py-3 text-[13px] text-[var(--color-admin-muted)]">{c.email}</TableCell>
                  <TableCell className="py-3 text-[13px] text-[var(--color-admin-muted)]">{c.address}, {c.city}</TableCell>
                  <TableCell className="py-3 text-[13px] text-[var(--color-admin-muted)]">{c.lastBookingAt ? relativeSv(c.lastBookingAt) : "—"}</TableCell>
                  <TableCell className="py-3 text-right text-[13px] tabular-nums">{c.totalBookings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{open.name}</SheetTitle>
                <SheetDescription>Kund {open.id} · sedan {formatSv(open.createdAt)}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">Kontaktuppgifter</h3>
                  <dl className="grid grid-cols-3 gap-y-2 text-sm">
                    <dt className="text-[var(--color-admin-muted)]">E-post</dt><dd className="col-span-2">{open.email}</dd>
                    <dt className="text-[var(--color-admin-muted)]">Telefon</dt><dd className="col-span-2 tabular-nums">{open.phone}</dd>
                    <dt className="text-[var(--color-admin-muted)]">Adress</dt><dd className="col-span-2">{open.address}, {open.city}</dd>
                  </dl>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">Bokningshistorik</h3>
                  {openBookings.length === 0 ? (
                    <div className="text-sm text-[var(--color-admin-muted)]">Inga bokningar än.</div>
                  ) : (
                    <ul className="divide-y divide-[var(--color-admin-border)] rounded-lg border border-[var(--color-admin-border)]">
                      {openBookings.map((b) => (
                        <li key={b.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                          <div className="w-24 tabular-nums text-[var(--color-admin-muted)]">{formatSv(b.startAt)}</div>
                          <div className="w-14 tabular-nums text-[var(--color-admin-muted)]">{formatTime(b.startAt)}</div>
                          <div className="flex-1 truncate">{b.service}</div>
                          <BookingStatusBadge status={b.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">Kopplade leads</h3>
                  {openLeads.length === 0 ? (
                    <div className="text-sm text-[var(--color-admin-muted)]">Inga kopplade leads.</div>
                  ) : (
                    <ul className="space-y-2">
                      {openLeads.map((l) => (
                        <li key={l.id} className="flex items-center justify-between rounded-md border border-[var(--color-admin-border)] px-3 py-2 text-sm">
                          <div>
                            <div className="font-medium">{l.service}</div>
                            <div className="text-xs text-[var(--color-admin-muted)]">{relativeSv(l.receivedAt)}</div>
                          </div>
                          <LeadStatusBadge status={l.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">Interna anteckningar</h3>
                  <Textarea
                    rows={4}
                    defaultValue={open.internalNotes}
                    value={notes[open.id] ?? open.internalNotes}
                    onChange={(e) => setNotes((n) => ({ ...n, [open.id]: e.target.value }))}
                  />
                  <button
                    onClick={() => toast.success("Anteckningar sparade (lokalt)")}
                    className="mt-2 inline-flex h-8 items-center rounded-md bg-[var(--color-admin-text)] px-3 text-xs font-medium text-white"
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
            <DialogDescription>Formulär kommer i nästa iteration när backend kopplas.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
