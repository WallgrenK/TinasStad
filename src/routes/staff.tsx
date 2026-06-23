import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, MapPin, ChevronRight, CalendarDays, Timer as TimerIcon, User, Home, ClipboardList, CheckCircle2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { JobStatusBadge } from "@/components/admin/JobStatusBadge";
import { ChecklistProgress } from "@/components/admin/ChecklistProgress";
import { TimerControl } from "@/components/admin/TimerControl";
import { staffById } from "@/lib/admin/mock/staff";
import { jobsForStaff, TODAY_DATE } from "@/lib/admin/mock/jobs";
import { checklistById } from "@/lib/admin/mock/checklists";
import { formatDuration } from "@/lib/admin/format";
import type { CleaningJob, JobStatus } from "@/lib/admin/mock/types";

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Mitt schema · Tinas Städ" },
      { name: "robots", content: "noindex" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
  component: StaffMobilePage,
});

const ME_ID = "s_emma";

function StaffMobilePage() {
  const me = staffById(ME_ID)!;
  const myJobs = useMemo(() => jobsForStaff(ME_ID, TODAY_DATE).sort((a, b) => a.startTime.localeCompare(b.startTime)), []);

  const [tab, setTab] = useState<"today" | "schedule" | "time" | "profile">("today");
  const [statuses, setStatuses] = useState<Record<string, JobStatus>>(() =>
    Object.fromEntries(myJobs.map((j) => [j.id, j.status])),
  );
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const open = openJobId ? myJobs.find((j) => j.id === openJobId) ?? null : null;
  const today = new Date("2026-06-23T00:00:00");

  const inProgress = myJobs.find((j) => statuses[j.id] === "in_progress");

  return (
    <div className="admin-scope min-h-screen bg-[var(--color-admin-surface)]">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white pb-20 shadow-xl">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-[var(--color-admin-border)] bg-white px-5 pb-3 pt-5">
          <div className="flex items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: me.color }}
            >
              {me.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-admin-muted)]">
                {today.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })}
              </div>
              <div className="text-lg font-semibold leading-tight">Hej, {me.name.split(" ")[0]}</div>
            </div>
            <span className="admin-pill pill-blue">{myJobs.length} idag</span>
          </div>
        </header>

        {/* Content */}
        {tab === "today" && (
          <div className="flex-1 px-5 py-4">
            {inProgress && (
              <section className="mb-5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-admin-muted)]">
                  Pågående
                </div>
                <button
                  onClick={() => setOpenJobId(inProgress.id)}
                  className="block w-full rounded-2xl border-2 border-[var(--color-admin-accent)] bg-[var(--color-admin-accent-soft)]/40 p-4 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="admin-pill pill-amber">Pågår</span>
                    <span className="text-xs tabular-nums text-[var(--color-admin-muted)]">{inProgress.startTime}</span>
                  </div>
                  <div className="mt-2 text-base font-semibold">{inProgress.customerName}</div>
                  <div className="text-xs text-[var(--color-admin-muted)]">{inProgress.service}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-admin-accent)]">
                    Öppna uppdrag <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              </section>
            )}

            <section>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-admin-muted)]">
                Dagens schema
              </div>
              <ul className="space-y-3">
                {myJobs.map((j) => {
                  const status = statuses[j.id];
                  const done = status === "completed";
                  return (
                    <li key={j.id}>
                      <button
                        onClick={() => setOpenJobId(j.id)}
                        className={`block w-full rounded-2xl border bg-white p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors ${
                          done
                            ? "border-[var(--color-admin-border)] opacity-70"
                            : "border-[var(--color-admin-border)] hover:border-[var(--color-admin-accent)]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-14 shrink-0">
                            <div className="text-base font-semibold tabular-nums">{j.startTime}</div>
                            <div className="text-[10px] text-[var(--color-admin-muted)]">
                              {formatDuration(j.estimatedDurationMin)}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="truncate text-sm font-semibold">{j.customerName}</div>
                              <JobStatusBadge status={status} />
                            </div>
                            <div className="mt-0.5 text-xs text-[var(--color-admin-muted)]">{j.service}</div>
                            <div className="mt-1 flex items-center gap-1 truncate text-[11px] text-[var(--color-admin-muted)]">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{j.address}</span>
                            </div>
                            {j.internalNotes && (
                              <div className="mt-2 truncate text-[11px] italic text-[var(--color-admin-muted)]">
                                “{j.internalNotes}”
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        )}

        {tab !== "today" && <ComingSoonPanel tab={tab} />}

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 z-20 grid w-full max-w-md -translate-x-1/2 grid-cols-4 border-t border-[var(--color-admin-border)] bg-white pb-[env(safe-area-inset-bottom)]">
          <NavButton active={tab === "today"} onClick={() => setTab("today")} icon={Home} label="Idag" />
          <NavButton active={tab === "schedule"} onClick={() => setTab("schedule")} icon={CalendarDays} label="Schema" />
          <NavButton active={tab === "time"} onClick={() => setTab("time")} icon={TimerIcon} label="Tid" />
          <NavButton active={tab === "profile"} onClick={() => setTab("profile")} icon={User} label="Profil" />
        </nav>
      </div>

      <JobSheet
        job={open}
        status={open ? statuses[open.id] : undefined}
        onStatusChange={(s) => open && setStatuses((p) => ({ ...p, [open.id]: s }))}
        onClose={() => setOpenJobId(null)}
      />
      <Toaster richColors position="top-center" />
    </div>
  );
}

function NavButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Home;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium ${
        active ? "text-[var(--color-admin-accent)]" : "text-[var(--color-admin-muted)]"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}

function ComingSoonPanel({ tab }: { tab: "schedule" | "time" | "profile" }) {
  const map = {
    schedule: { title: "Veckoschema", body: "Här kommer du snart kunna se hela veckans pass." },
    time: { title: "Tidrapporter", body: "Veckosammanställning av din arbetade tid." },
    profile: { title: "Profil", body: "Inställningar för konto och aviseringar." },
  } as const;
  const m = map[tab];
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-[var(--color-admin-accent-soft)] text-[var(--color-admin-accent)]">
        <ClipboardList className="h-5 w-5" />
      </div>
      <h2 className="text-base font-semibold">{m.title}</h2>
      <p className="mt-1 max-w-xs text-sm text-[var(--color-admin-muted)]">{m.body}</p>
      <span className="mt-4 admin-pill pill-zinc">Kommer snart</span>
    </div>
  );
}

function JobSheet({
  job,
  status,
  onStatusChange,
  onClose,
}: {
  job: CleaningJob | null;
  status?: JobStatus;
  onStatusChange: (s: JobStatus) => void;
  onClose: () => void;
}) {
  const checklist = job ? checklistById(job.checklistId) : null;
  const [done, setDone] = useState<Set<number>>(new Set());
  const [comment, setComment] = useState("");
  const [actualMin, setActualMin] = useState<number | null>(null);

  // Reset local state when job changes
  const jobKey = job?.id ?? "";
  // simple key-based reset via useMemo not necessary; clear on close handled by parent

  if (!job) return <Sheet open={false} onOpenChange={() => onClose()}><SheetContent /></Sheet>;

  const items = checklist?.items ?? [];
  const toggle = (i: number) => {
    setDone((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const isDone = status === "completed";

  return (
    <Sheet open={!!job} onOpenChange={(o) => !o && onClose()} key={jobKey}>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
        <div className="space-y-5 p-5">
          <SheetHeader className="space-y-1 p-0 text-left">
            <SheetTitle className="text-xl">{job.customerName}</SheetTitle>
            <SheetDescription>{job.service} · {job.startTime}–{job.endTime}</SheetDescription>
          </SheetHeader>

          <div className="flex items-center justify-between rounded-lg bg-[var(--color-admin-surface)] p-3">
            <JobStatusBadge status={status ?? job.status} />
            <span className="text-xs tabular-nums text-[var(--color-admin-muted)]">
              Est. {formatDuration(job.estimatedDurationMin)}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <a href={`tel:${job.customerPhone}`} className="flex items-center gap-2 rounded-md border border-[var(--color-admin-border)] bg-white p-3">
              <Phone className="h-4 w-4 text-[var(--color-admin-accent)]" />
              <span className="tabular-nums">{job.customerPhone}</span>
            </a>
            <div className="flex items-start gap-2 rounded-md border border-[var(--color-admin-border)] bg-white p-3">
              <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-admin-accent)]" />
              <span>{job.address}</span>
            </div>
            {job.internalNotes && (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-[13px] text-amber-900">
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-700">
                  Internt
                </div>
                <div className="mt-1">{job.internalNotes}</div>
              </div>
            )}
          </div>

          {!isDone && (
            <TimerControl
              estimatedMin={job.estimatedDurationMin}
              initialState={status === "in_progress" ? "running" : "idle"}
              onFinish={(min) => {
                setActualMin(min);
                onStatusChange("completed");
              }}
            />
          )}

          {checklist && (
            <section>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
                  Checklista
                </h3>
              </div>
              <ChecklistProgress done={done.size} total={items.length} />
              <ul className="mt-3 space-y-1">
                {items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-md px-2 py-2 text-sm">
                    <Checkbox checked={done.has(i)} onCheckedChange={() => toggle(i)} className="h-5 w-5" />
                    <span className={done.has(i) ? "line-through text-[var(--color-admin-muted)]" : ""}>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-admin-muted)]">
              Kommentar
            </h3>
            <Textarea
              rows={3}
              placeholder="Fri text till Tina…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </section>

          {isDone && actualMin != null && (
            <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <div className="font-semibold">Uppdrag avslutat</div>
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <dt className="text-emerald-700/70">Estimerat</dt>
                  <dd className="text-sm font-semibold tabular-nums">{formatDuration(job.estimatedDurationMin)}</dd>
                </div>
                <div>
                  <dt className="text-emerald-700/70">Faktiskt</dt>
                  <dd className="text-sm font-semibold tabular-nums">{formatDuration(actualMin)}</dd>
                </div>
                <div>
                  <dt className="text-emerald-700/70">Differens</dt>
                  <dd className="text-sm font-semibold tabular-nums">
                    {actualMin - job.estimatedDurationMin >= 0 ? "+" : "−"}
                    {formatDuration(Math.abs(actualMin - job.estimatedDurationMin))}
                  </dd>
                </div>
              </dl>
            </section>
          )}

          {!isDone && (
            <button
              onClick={() => {
                onStatusChange("completed");
                toast.success("Uppdrag markerat som klart");
              }}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white"
            >
              <CheckCircle2 className="h-5 w-5" /> Avsluta jobb
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
