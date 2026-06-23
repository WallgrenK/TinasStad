import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Circle, AlertTriangle, MapPin } from "lucide-react";

import { PageHeader } from "@/components/admin/PageHeader";
import { KpiCard } from "@/components/admin/KpiCard";
import { JobStatusBadge } from "@/components/admin/JobStatusBadge";
import { TimeVarianceBadge } from "@/components/admin/TimeVarianceBadge";
import { StaffAvatarStack } from "@/components/admin/StaffAvatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { jobs, TODAY_DATE } from "@/lib/admin/mock/jobs";
import { timeEntries, timeEntryForJob } from "@/lib/admin/mock/timeEntries";
import { staff as allStaff } from "@/lib/admin/mock/staff";
import { formatDuration, formatSv, formatTime } from "@/lib/admin/format";
import type { CleaningJob } from "@/lib/admin/mock/types";

export const Route = createFileRoute("/admin/time-tracking")({
  head: () => ({
    meta: [
      { title: "Tidsspårning · Admin · Tinas Städ" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TimeTrackingPage,
});

function TimeTrackingPage() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const todayJobs = jobs.filter((j) => j.scheduledDate === TODAY_DATE);
  const plannedMin = todayJobs.reduce((s, j) => s + j.estimatedDurationMin, 0);
  const actualMin = todayJobs.reduce((s, j) => s + (timeEntryForJob(j.id)?.actualDurationMin ?? 0), 0);
  const completed = todayJobs.filter((j) => j.status === "completed").length;

  const variances = timeEntries.filter((t) => t.varianceMin != null).map((t) => t.varianceMin!);
  const avgVariance = variances.length === 0 ? 0 : Math.round(variances.reduce((a, b) => a + b, 0) / variances.length);
  const overEstimate = variances.filter((v) => v > 5).length;

  const tableRows = useMemo(
    () =>
      jobs
        .map((j) => ({ job: j, entry: timeEntryForJob(j.id) }))
        .sort((a, b) => (b.job.scheduledDate + b.job.startTime).localeCompare(a.job.scheduledDate + a.job.startTime)),
    [],
  );

  const open: CleaningJob | null = openJobId ? jobs.find((j) => j.id === openJobId) ?? null : null;
  const openEntry = open ? timeEntryForJob(open.id) : undefined;
  const openStaff = open ? allStaff.filter((s) => open.assignedStaffIds.includes(s.id)) : [];

  return (
    <div>
      <PageHeader
        title="Tidsspårning"
        description="Jämför planerad och faktisk tid per uppdrag."
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        <KpiCard label="Planerat idag" value={formatDuration(plannedMin)} />
        <KpiCard label="Faktiskt idag" value={actualMin === 0 ? "—" : formatDuration(actualMin)} />
        <KpiCard label="Avslutade uppdrag" value={`${completed}/${todayJobs.length}`} />
        <KpiCard
          label="Snittavvikelse"
          value={`${avgVariance >= 0 ? "+" : ""}${avgVariance} min`}
        />
        <KpiCard label="Över estimat" value={String(overEstimate)} />
      </div>

      <div className="admin-card overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--color-admin-surface)]">
            <TableRow className="border-[var(--color-admin-border)]">
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Datum</TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Kund</TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Personal</TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Estimerat</TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Faktiskt</TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Avvikelse</TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Status</TableHead>
              <TableHead className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">Kommentar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows.map(({ job, entry }) => (
              <TableRow
                key={job.id}
                tabIndex={0}
                onClick={() => setOpenJobId(job.id)}
                onKeyDown={(e) => { if (e.key === "Enter") setOpenJobId(job.id); }}
                className="cursor-pointer border-[var(--color-admin-border)] outline-none hover:bg-[var(--color-admin-surface)] focus:bg-[var(--color-admin-surface)]"
              >
                <TableCell className="py-2.5 text-[13px] tabular-nums text-[var(--color-admin-muted)]">
                  <div>{formatSv(job.scheduledDate)}</div>
                  <div className="text-[11px]">{job.startTime}</div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="font-medium">{job.customerName}</div>
                  <div className="text-[11px] text-[var(--color-admin-muted)]">{job.service}</div>
                </TableCell>
                <TableCell className="py-2.5"><StaffAvatarStack ids={job.assignedStaffIds} /></TableCell>
                <TableCell className="py-2.5 text-[13px] tabular-nums">{formatDuration(job.estimatedDurationMin)}</TableCell>
                <TableCell className="py-2.5 text-[13px] tabular-nums">
                  {entry?.actualDurationMin ? formatDuration(entry.actualDurationMin) : "—"}
                </TableCell>
                <TableCell className="py-2.5">
                  <TimeVarianceBadge estimatedMin={job.estimatedDurationMin} actualMin={entry?.actualDurationMin} />
                </TableCell>
                <TableCell className="py-2.5"><JobStatusBadge status={job.status} /></TableCell>
                <TableCell className="max-w-[220px] py-2.5 text-[12px] text-[var(--color-admin-muted)]">
                  <span className="line-clamp-1">{entry?.comment ?? "—"}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenJobId(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{open.customerName}</SheetTitle>
                <SheetDescription>{open.service} · {formatSv(open.scheduledDate)}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-2 text-sm text-[var(--color-admin-muted)]">
                  <MapPin className="h-4 w-4" /> {open.address}
                </div>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                    Personal
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {openStaff.map((s) => (
                      <div key={s.id} className="flex items-center gap-2 rounded-full border border-[var(--color-admin-border)] bg-white py-1 pl-1 pr-3 text-xs">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold text-white" style={{ backgroundColor: s.color }}>{s.initials}</span>
                        {s.name}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                    Tidsöversikt
                  </h3>
                  <Comparison
                    estimatedMin={open.estimatedDurationMin}
                    actualMin={openEntry?.actualDurationMin}
                  />
                </section>

                <section>
                  <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                    Tidslinje
                  </h3>
                  <Timeline
                    scheduledAt={`${open.scheduledDate}T${open.startTime}:00`}
                    startedAt={openEntry?.startedAt}
                    pausedMin={openEntry?.pausedDurationMin ?? 0}
                    finishedAt={openEntry?.finishedAt}
                  />
                </section>

                {openEntry?.comment && (
                  <section>
                    <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                      Kommentar från personal
                    </h3>
                    <p className="rounded-md border border-[var(--color-admin-border)] bg-[var(--color-admin-surface)] p-3 text-sm italic">
                      “{openEntry.comment}”
                    </p>
                  </section>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Comparison({ estimatedMin, actualMin }: { estimatedMin: number; actualMin?: number }) {
  const max = Math.max(estimatedMin, actualMin ?? 0) * 1.1 || 60;
  return (
    <div className="space-y-2">
      <Row label="Estimerat" min={estimatedMin} max={max} cls="bg-[var(--color-admin-accent)]/40" />
      <Row label="Faktiskt" min={actualMin ?? 0} max={max} cls={actualMin && actualMin > estimatedMin ? "bg-rose-500" : "bg-emerald-500"} placeholder={actualMin == null} />
    </div>
  );
}

function Row({ label, min, max, cls, placeholder }: { label: string; min: number; max: number; cls: string; placeholder?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-[var(--color-admin-muted)]">{label}</span>
        <span className="tabular-nums">{placeholder ? "—" : formatDuration(min)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-admin-surface-2)]">
        {!placeholder && (
          <div className={`h-full rounded-full ${cls}`} style={{ width: `${Math.min(100, (min / max) * 100)}%` }} />
        )}
      </div>
    </div>
  );
}

function Timeline({ scheduledAt, startedAt, pausedMin, finishedAt }: { scheduledAt: string; startedAt?: string; pausedMin: number; finishedAt?: string }) {
  const steps = [
    { label: "Schemalagt", at: scheduledAt, done: true, icon: CheckCircle2 },
    { label: "Startat", at: startedAt, done: !!startedAt, icon: startedAt ? CheckCircle2 : Circle },
    { label: "Pausat", at: pausedMin > 0 ? `${pausedMin} min total` : undefined, done: pausedMin > 0, icon: pausedMin > 0 ? AlertTriangle : Circle, isText: true },
    { label: "Avslutat", at: finishedAt, done: !!finishedAt, icon: finishedAt ? CheckCircle2 : Circle },
  ];
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex items-start gap-3">
          <s.icon className={`mt-0.5 h-4 w-4 ${s.done ? "text-[var(--color-admin-accent)]" : "text-[var(--color-admin-muted)]"}`} />
          <div className="flex-1 text-sm">
            <div className="font-medium">{s.label}</div>
            <div className="text-xs tabular-nums text-[var(--color-admin-muted)]">
              {s.at ? (s.isText ? s.at : formatTime(s.at)) : "—"}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
