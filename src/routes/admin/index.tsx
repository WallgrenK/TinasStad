import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarPlus, UserPlus, Inbox, Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { KpiCard } from "@/components/admin/KpiCard";
import { ActivityTimeline } from "@/components/admin/ActivityTimeline";
import { LeadStatusBadge, BookingStatusBadge } from "@/components/admin/StatusBadge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { stats, deltas } from "@/lib/admin/mock/stats";
import { activity } from "@/lib/admin/mock/activity";
import { bookings } from "@/lib/admin/mock/bookings";
import { leads } from "@/lib/admin/mock/leads";
import { formatTime, isSameDay } from "@/lib/admin/format";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard · Admin · Tinas Städ" }, { name: "robots", content: "noindex" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [openAction, setOpenAction] = useState<string | null>(null);
  // TODO: Replace dashboard mock modules with Supabase-backed loaders once customers, leads, bookings, and activity have stable queries.
  const today = new Date();
  const todaysBookings = bookings
    .filter((b) => isSameDay(new Date(b.startAt), today))
    .sort((a, b) => a.startAt.localeCompare(b.startAt));
  const latestLeads = [...leads].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)).slice(0, 5);

  const quickActions = [
    { id: "booking", label: "Skapa bokning", icon: CalendarPlus },
    { id: "customer", label: "Lägg till kund", icon: UserPlus },
    { id: "lead", label: "Registrera lead", icon: Inbox },
    { id: "review", label: "Lägg till omdöme", icon: Star },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">God morgon, Tina</h1>
        <p className="mt-1 text-sm text-[var(--color-admin-muted)]">Översikt över verksamheten — {new Intl.DateTimeFormat("sv-SE", { weekday: "long", day: "numeric", month: "long" }).format(today)}.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Nya leads idag" value={stats.newLeadsToday} delta={deltas.newLeadsToday} />
        <KpiCard label="Aktiva kunder" value={stats.activeCustomers} delta={deltas.activeCustomers} />
        <KpiCard label="Kommande bokningar" value={stats.upcomingBookings} delta={deltas.upcomingBookings} />
        <KpiCard label="Öppna offerter" value={stats.openQuotes} delta={deltas.openQuotes} />
        <KpiCard label="Leads denna månad" value={stats.leadsThisMonth} delta={deltas.leadsThisMonth} />
        <KpiCard label="Konvertering" value={stats.conversionRate} suffix="%" delta={deltas.conversionRate} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="admin-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight">Senaste aktivitet</h2>
            <span className="text-xs text-[var(--color-admin-muted)]">Senaste 24 tim</span>
          </div>
          <ActivityTimeline events={activity} />
        </section>

        <section className="admin-card p-5">
          <h2 className="mb-4 text-sm font-semibold tracking-tight">Snabbåtgärder</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((a) => (
              <button
                key={a.id}
                onClick={() => setOpenAction(a.label)}
                className="group flex flex-col items-start gap-3 rounded-lg border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] p-3 text-left transition-colors hover:border-[var(--color-admin-accent)] hover:bg-[var(--color-admin-accent-soft)]"
              >
                <a.icon className="h-4 w-4 text-[var(--color-admin-accent)]" />
                <span className="text-[13px] font-medium leading-tight text-[var(--color-admin-text)]">{a.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="admin-card overflow-hidden">
          <header className="flex items-center justify-between border-b border-[var(--color-admin-border)] px-5 py-3">
            <h2 className="text-sm font-semibold tracking-tight">Dagens bokningar</h2>
            <Link to="/admin/bookings" className="flex items-center gap-1 text-xs text-[var(--color-admin-accent)] hover:underline">
              Alla bokningar <ArrowRight className="h-3 w-3" />
            </Link>
          </header>
          {todaysBookings.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-[var(--color-admin-muted)]">Inga bokningar idag.</div>
          ) : (
            <ul className="divide-y divide-[var(--color-admin-border)]">
              {todaysBookings.map((b) => (
                <li key={b.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="w-14 text-sm font-medium tabular-nums text-[var(--color-admin-text)]">{formatTime(b.startAt)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-[var(--color-admin-text)]">{b.customerName}</div>
                    <div className="truncate text-xs text-[var(--color-admin-muted)]">{b.service} · {b.address}</div>
                  </div>
                  <BookingStatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-card overflow-hidden">
          <header className="flex items-center justify-between border-b border-[var(--color-admin-border)] px-5 py-3">
            <h2 className="text-sm font-semibold tracking-tight">Senaste leads</h2>
            <Link to="/admin/leads" className="flex items-center gap-1 text-xs text-[var(--color-admin-accent)] hover:underline">
              Alla leads <ArrowRight className="h-3 w-3" />
            </Link>
          </header>
          <ul className="divide-y divide-[var(--color-admin-border)]">
            {latestLeads.map((l) => (
              <li key={l.id}>
                <Link
                  to="/admin/leads"
                  search={{ id: l.id }}
                  className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-[var(--color-admin-surface)]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-[var(--color-admin-text)]">{l.name}</div>
                    <div className="truncate text-xs text-[var(--color-admin-muted)]">{l.service} · {l.city}</div>
                  </div>
                  <LeadStatusBadge status={l.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Dialog open={!!openAction} onOpenChange={(o) => !o && setOpenAction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{openAction}</DialogTitle>
            <DialogDescription>
              Den här åtgärden kommer i nästa iteration — formulär och funktion kopplas mot Lovable Cloud.
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => { toast.success("Tack — vi noterar det till nästa iteration."); setOpenAction(null); }}
            className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-[var(--color-admin-text)] px-4 text-sm font-medium text-white"
          >
            Stäng
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
