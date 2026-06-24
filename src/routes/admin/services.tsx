import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, Search, GripVertical, Eye, EyeOff, Pencil } from 'lucide-react'
import { toast } from 'sonner'

import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/admin/EmptyState'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import { adminServices, type AdminService } from '@/lib/admin/mock/services'
import { relativeSv } from '@/lib/admin/format'

export const Route = createFileRoute('/admin/services')({
  head: () => ({
    meta: [
      { title: 'Tjänster · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: ServicesPage,
})

const UNIT_LABEL: Record<AdminService['unit'], string> = {
  tim: 'kr/tim',
  tillfälle: 'kr/tillfälle',
  kvm: 'kr/kvm',
}

function ServicesPage() {
  const [services, setServices] = useState<AdminService[]>(() =>
    [...adminServices].sort((a, b) => a.order - b.order),
  )
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return services
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q),
    )
  }, [services, query])

  const open = openId ? (services.find((s) => s.id === openId) ?? null) : null

  const togglePublished = (id: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              published: !s.published,
              updatedAt: new Date().toISOString(),
            }
          : s,
      ),
    )
    toast.success('Status uppdaterad (lokalt)')
  }

  const updateField = <K extends keyof AdminService>(
    id: string,
    key: K,
    value: AdminService[K],
  ) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, [key]: value, updatedAt: new Date().toISOString() }
          : s,
      ),
    )
  }

  return (
    <div>
      <PageHeader
        title="Tjänster"
        description="Innehållet styr vad som visas på /tjanster och i offertformuläret."
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white hover:bg-[var(--color-admin-accent)]"
          >
            <Plus className="h-4 w-4" /> Ny tjänst
          </button>
        }
      />

      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-admin-muted)]" />
        <Input
          placeholder="Sök tjänst…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 pl-9"
        />
      </div>

      <div className="admin-card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="Inga tjänster matchar" />
        ) : (
          <ul className="divide-y divide-[var(--color-admin-border)]">
            {filtered.map((s, i) => (
              <li
                key={s.id}
                className="group flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-admin-surface)]"
              >
                <button
                  className="cursor-grab text-[var(--color-admin-muted)] opacity-40 hover:opacity-100"
                  aria-label="Dra för att ändra ordning"
                  title="Dra för att ändra ordning (kommer)"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <div className="w-7 text-center text-xs tabular-nums text-[var(--color-admin-muted)]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-[var(--color-admin-text)]">
                      {s.title}
                    </span>
                    {s.rutEligible && (
                      <span className="admin-pill pill-emerald">RUT</span>
                    )}
                    {!s.published && (
                      <span className="admin-pill pill-zinc">Utkast</span>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-[13px] text-[var(--color-admin-muted)]">
                    {s.tagline}
                  </div>
                </div>
                <div className="hidden w-32 text-right text-sm tabular-nums text-[var(--color-admin-text)] sm:block">
                  fr. {s.priceFromSek} {UNIT_LABEL[s.unit]}
                </div>
                <div className="hidden w-28 text-right text-[12px] text-[var(--color-admin-muted)] md:block">
                  {relativeSv(s.updatedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => togglePublished(s.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-admin-muted)] hover:bg-[var(--color-admin-surface-2)] hover:text-[var(--color-admin-text)]"
                    title={s.published ? 'Avpublicera' : 'Publicera'}
                    aria-label={s.published ? 'Avpublicera' : 'Publicera'}
                  >
                    {s.published ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setOpenId(s.id)}
                    className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-[13px] font-medium text-[var(--color-admin-text)] hover:bg-[var(--color-admin-surface-2)]"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Redigera
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto sm:max-w-2xl"
        >
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="text-lg">{open.title}</SheetTitle>
                <SheetDescription>
                  /{open.slug} · uppdaterad {relativeSv(open.updatedAt)}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
                      Titel
                    </Label>
                    <Input
                      value={open.title}
                      onChange={(e) =>
                        updateField(open.id, 'title', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
                      Slug
                    </Label>
                    <Input
                      value={open.slug}
                      onChange={(e) =>
                        updateField(open.id, 'slug', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-1.5 block text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
                    Kort beskrivning
                  </Label>
                  <Textarea
                    rows={3}
                    value={open.tagline}
                    onChange={(e) =>
                      updateField(open.id, 'tagline', e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
                      Pris fr.
                    </Label>
                    <Input
                      type="number"
                      value={open.priceFromSek}
                      onChange={(e) =>
                        updateField(
                          open.id,
                          'priceFromSek',
                          Number(e.target.value),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
                      Enhet
                    </Label>
                    <Select
                      value={open.unit}
                      onValueChange={(v) =>
                        updateField(open.id, 'unit', v as AdminService['unit'])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tim">kr / timme</SelectItem>
                        <SelectItem value="tillfälle">
                          kr / tillfälle
                        </SelectItem>
                        <SelectItem value="kvm">kr / kvm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
                      Standardlängd (min)
                    </Label>
                    <Input
                      type="number"
                      value={open.durationMin}
                      onChange={(e) =>
                        updateField(
                          open.id,
                          'durationMin',
                          Number(e.target.value),
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block text-[11px] uppercase tracking-[0.1em] text-[var(--color-admin-muted)]">
                    Det här ingår
                  </Label>
                  <div className="space-y-2">
                    {open.includes.map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          value={line}
                          onChange={(e) => {
                            const next = [...open.includes]
                            next[i] = e.target.value
                            updateField(open.id, 'includes', next)
                          }}
                        />
                        <button
                          onClick={() => {
                            const next = open.includes.filter((_, j) => j !== i)
                            updateField(open.id, 'includes', next)
                          }}
                          className="text-[12px] text-[var(--color-admin-muted)] hover:text-[var(--color-admin-text)]"
                        >
                          Ta bort
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        updateField(open.id, 'includes', [...open.includes, ''])
                      }
                      className="text-[13px] font-medium text-[var(--color-admin-accent)]"
                    >
                      + Lägg till punkt
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-[var(--color-admin-border)] bg-[var(--color-admin-surface)] px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-[var(--color-admin-text)]">
                      RUT-berättigad
                    </div>
                    <div className="text-[12px] text-[var(--color-admin-muted)]">
                      Visas med RUT-märkning på webbplatsen.
                    </div>
                  </div>
                  <Switch
                    checked={open.rutEligible}
                    onCheckedChange={(v) =>
                      updateField(open.id, 'rutEligible', v)
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-[var(--color-admin-border)] bg-[var(--color-admin-surface)] px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-[var(--color-admin-text)]">
                      Publicerad
                    </div>
                    <div className="text-[12px] text-[var(--color-admin-muted)]">
                      Synlig på /tjanster och i offertformuläret.
                    </div>
                  </div>
                  <Switch
                    checked={open.published}
                    onCheckedChange={(v) =>
                      updateField(open.id, 'published', v)
                    }
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-[var(--color-admin-border)] pt-4">
                  <button
                    onClick={() => setOpenId(null)}
                    className="inline-flex h-9 items-center rounded-md border border-[var(--color-admin-border)] px-3 text-sm font-medium text-[var(--color-admin-text)]"
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={() => {
                      toast.success(`Sparat: ${open.title}`)
                      setOpenId(null)
                    }}
                    className="inline-flex h-9 items-center rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white"
                  >
                    Spara ändringar
                  </button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ny tjänst</DialogTitle>
            <DialogDescription>
              Formuläret aktiveras när backend kopplas in.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
