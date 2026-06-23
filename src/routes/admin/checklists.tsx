import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil } from "lucide-react";

import { PageHeader } from "@/components/admin/PageHeader";
import { ChecklistProgress } from "@/components/admin/ChecklistProgress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

import { checklists } from "@/lib/admin/mock/checklists";
import type { ChecklistTemplate } from "@/lib/admin/mock/types";

export const Route = createFileRoute("/admin/checklists")({
  head: () => ({
    meta: [
      { title: "Checklistor · Admin · Tinas Städ" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ChecklistsPage,
});

function ChecklistsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, Set<number>>>({});
  const [extras, setExtras] = useState<Record<string, string[]>>({});
  const [newItem, setNewItem] = useState("");

  const open: ChecklistTemplate | null = openId ? checklists.find((c) => c.id === openId) ?? null : null;
  const openItems = open ? [...open.items, ...(extras[open.id] ?? [])] : [];
  const openChecked = open ? checked[open.id] ?? new Set<number>() : new Set<number>();

  const toggle = (i: number) => {
    if (!open) return;
    setChecked((s) => {
      const next = new Set(s[open.id] ?? []);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return { ...s, [open.id]: next };
    });
  };

  return (
    <div>
      <PageHeader
        title="Checklistor"
        description="Mallar som personalen följer under varje städning."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white hover:bg-[var(--color-admin-accent)]">
            <Plus className="h-4 w-4" /> Ny mall
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {checklists.map((c) => (
          <div key={c.id} className="admin-card flex flex-col p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="admin-pill pill-blue">{c.service}</span>
                <h3 className="mt-2 text-base font-semibold">{c.title}</h3>
                <p className="mt-0.5 text-xs text-[var(--color-admin-muted)]">{c.items.length} uppgifter</p>
              </div>
            </div>

            <ul className="mt-4 flex-1 space-y-1.5 text-sm">
              {c.items.slice(0, 4).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[var(--color-admin-muted)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--color-admin-muted)]" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
              {c.items.length > 4 && (
                <li className="text-xs text-[var(--color-admin-muted)]">+ {c.items.length - 4} till…</li>
              )}
            </ul>

            <button
              onClick={() => setOpenId(c.id)}
              className="mt-5 inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-[var(--color-admin-border)] bg-white text-sm font-medium hover:bg-[var(--color-admin-surface)]"
            >
              <Pencil className="h-4 w-4" /> Redigera mall
            </button>
          </div>
        ))}
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{open.title}</SheetTitle>
                <SheetDescription>{open.service} · {openItems.length} uppgifter</SheetDescription>
              </SheetHeader>

              <div className="mt-4">
                <ChecklistProgress done={openChecked.size} total={openItems.length} />
              </div>

              <ul className="mt-6 space-y-1">
                {openItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-[var(--color-admin-surface)]"
                  >
                    <Checkbox checked={openChecked.has(i)} onCheckedChange={() => toggle(i)} />
                    <span className={openChecked.has(i) ? "line-through text-[var(--color-admin-muted)]" : ""}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2">
                <Input
                  placeholder="Lägg till uppgift…"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="h-9"
                />
                <button
                  onClick={() => {
                    if (!newItem.trim()) return;
                    setExtras((s) => ({ ...s, [open.id]: [...(s[open.id] ?? []), newItem.trim()] }));
                    setNewItem("");
                  }}
                  className="inline-flex h-9 shrink-0 items-center rounded-md border border-[var(--color-admin-border)] bg-white px-3 text-sm font-medium"
                >
                  Lägg till
                </button>
              </div>

              <button
                onClick={() => toast.success("Mall sparad (lokalt)")}
                className="mt-4 inline-flex h-9 items-center rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white"
              >
                Spara mall
              </button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
