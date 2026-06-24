import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, Search, Star, EyeOff, Pin, Check, X } from 'lucide-react'
import { toast } from 'sonner'

import { PageHeader } from '@/components/admin/PageHeader'
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
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import {
  adminTestimonials,
  type AdminTestimonial,
} from '@/lib/admin/mock/testimonials'
import { formatSv, relativeSv } from '@/lib/admin/format'

export const Route = createFileRoute('/admin/testimonials')({
  head: () => ({
    meta: [
      { title: 'Omdömen · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: TestimonialsPage,
})

type Filter = 'all' | 'published' | 'pending' | 'featured'

function Stars({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${value} av 5 stjärnor`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= value ? 'fill-amber-400 text-amber-400' : 'text-(--color-admin-border)'}`}
        />
      ))}
    </div>
  )
}

function TestimonialsPage() {
  const [items, setItems] = useState<AdminTestimonial[]>(() =>
    [...adminTestimonials].sort((a, b) =>
      b.receivedAt.localeCompare(a.receivedAt),
    ),
  )
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const counts = useMemo(
    () => ({
      all: items.length,
      published: items.filter((i) => i.published).length,
      pending: items.filter((i) => !i.published).length,
      featured: items.filter((i) => i.featured).length,
    }),
    [items],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((t) => {
      if (filter === 'published' && !t.published) return false
      if (filter === 'pending' && t.published) return false
      if (filter === 'featured' && !t.featured) return false
      if (!q) return true
      return (
        t.author.toLowerCase().includes(q) ||
        t.body.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q)
      )
    })
  }, [items, filter, query])

  const open = openId ? (items.find((i) => i.id === openId) ?? null) : null

  const patch = (id: string, patch: Partial<AdminTestimonial>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))

  const approve = (id: string) => {
    patch(id, { published: true })
    toast.success('Omdöme publicerat')
  }
  const reject = (id: string) => {
    patch(id, { published: false })
    toast('Omdöme dolt')
  }

  return (
    <div>
      <PageHeader
        title="Omdömen"
        description="Visa de bästa rösterna från kunderna. Markera som utvald för att lyfta dem på startsidan."
        actions={
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-(--color-admin-text) px-3 text-sm font-medium text-white hover:bg-(--color-admin-accent)"
          >
            <Plus className="h-4 w-4" /> Lägg till omdöme
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1 rounded-lg border border-(--color-admin-border) bg-(--color-admin-surface) p-1">
          {[
            ['all', 'Alla', counts.all],
            ['published', 'Publicerade', counts.published],
            ['pending', 'Väntar', counts.pending],
            ['featured', 'Utvalda', counts.featured],
          ].map(([key, label, n]) => (
            <button
              key={key as string}
              onClick={() => setFilter(key as Filter)}
              className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium transition ${
                filter === (key as Filter)
                  ? 'bg-white text-(--color-admin-text) shadow-[0_1px_2px_oklch(0_0_0/0.06)]'
                  : 'text-(--color-admin-muted) hover:text-(--color-admin-text)'
              }`}
            >
              {label as string}
              <span className="text-[11px] tabular-nums opacity-70">
                {n as number}
              </span>
            </button>
          ))}
        </div>

        <div className="relative max-w-xs flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-admin-muted)" />
          <Input
            placeholder="Sök efter namn eller text…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-card">
          <EmptyState title="Inga omdömen matchar filtret" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => (
            <article
              key={t.id}
              className={`admin-card group relative flex flex-col p-5 transition ${!t.published ? 'border-dashed bg-(--color-admin-surface)' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <Stars value={t.rating} />
                <div className="flex items-center gap-1.5">
                  {t.featured && (
                    <span className="admin-pill pill-violet inline-flex items-center gap-1">
                      <Pin className="h-3 w-3" /> Utvald
                    </span>
                  )}
                  <span
                    className={`admin-pill ${t.published ? 'pill-emerald' : 'pill-amber'}`}
                  >
                    {t.published ? 'Publicerad' : 'Väntar'}
                  </span>
                </div>
              </div>

              <blockquote className="mt-3 line-clamp-5 text-[14px] leading-relaxed text-(--color-admin-text)">
                "{t.body}"
              </blockquote>

              <div className="mt-4 flex items-end justify-between gap-2 border-t border-(--color-admin-border) pt-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold text-(--color-admin-text)">
                    {t.author}
                  </div>
                  <div className="truncate text-[12px] text-(--color-admin-muted)">
                    {t.role}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    {t.source}
                  </div>
                  <div className="text-[11px] text-(--color-admin-muted)">
                    {relativeSv(t.receivedAt)}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5">
                {t.published ? (
                  <button
                    onClick={() => reject(t.id)}
                    className="inline-flex h-8 items-center gap-1 rounded-md border border-(--color-admin-border) px-2 text-[12px] font-medium text-(--color-admin-muted) hover:text-(--color-admin-text)"
                  >
                    <EyeOff className="h-3.5 w-3.5" /> Dölj
                  </button>
                ) : (
                  <button
                    onClick={() => approve(t.id)}
                    className="inline-flex h-8 items-center gap-1 rounded-md bg-(--color-admin-text) px-2.5 text-[12px] font-medium text-white"
                  >
                    <Check className="h-3.5 w-3.5" /> Publicera
                  </button>
                )}
                <button
                  onClick={() => patch(t.id, { featured: !t.featured })}
                  className={`inline-flex h-8 items-center gap-1 rounded-md border px-2 text-[12px] font-medium ${
                    t.featured
                      ? 'border-(--color-admin-accent) text-(--color-admin-accent)'
                      : 'border-(--color-admin-border) text-(--color-admin-muted) hover:text-(--color-admin-text)'
                  }`}
                >
                  <Pin className="h-3.5 w-3.5" />{' '}
                  {t.featured ? 'Utvald' : 'Lyft fram'}
                </button>
                <button
                  onClick={() => setOpenId(t.id)}
                  className="ml-auto inline-flex h-8 items-center rounded-md px-2 text-[12px] font-medium text-(--color-admin-text) hover:bg-(--color-admin-surface-2)"
                >
                  Redigera
                </button>
              </div>
            </article>
          ))}
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
                <SheetTitle className="text-lg">
                  Omdöme · {open.author}
                </SheetTitle>
                <SheetDescription>
                  Mottaget {formatSv(open.receivedAt)} via {open.source}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                      Namn
                    </Label>
                    <Input
                      value={open.author}
                      onChange={(e) =>
                        patch(open.id, { author: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                      Roll / ort
                    </Label>
                    <Input
                      value={open.role}
                      onChange={(e) => patch(open.id, { role: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-1.5 block text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                    Omdöme
                  </Label>
                  <Textarea
                    rows={6}
                    value={open.body}
                    onChange={(e) => patch(open.id, { body: e.target.value })}
                  />
                  <div className="mt-1 text-[11px] text-(--color-admin-muted)">
                    {open.body.length} tecken
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                      Betyg
                    </Label>
                    <Select
                      value={String(open.rating)}
                      onValueChange={(v) =>
                        patch(open.id, {
                          rating: Number(v) as AdminTestimonial['rating'],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n} stjärnor
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-[11px] uppercase tracking-widest text-(--color-admin-muted)">
                      Källa
                    </Label>
                    <Select
                      value={open.source}
                      onValueChange={(v) =>
                        patch(open.id, {
                          source: v as AdminTestimonial['source'],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['Google', 'Facebook', 'Webbformulär', 'E-post'].map(
                          (s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-(--color-admin-border) bg-(--color-admin-surface) px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-(--color-admin-text)">
                      Publicerad på webbplatsen
                    </div>
                    <div className="text-[12px] text-(--color-admin-muted)">
                      Visas i omdömessektionen.
                    </div>
                  </div>
                  <Switch
                    checked={open.published}
                    onCheckedChange={(v) => patch(open.id, { published: v })}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-(--color-admin-border) bg-(--color-admin-surface) px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-(--color-admin-text)">
                      Lyft fram på startsidan
                    </div>
                    <div className="text-[12px] text-(--color-admin-muted)">
                      Max 3 utvalda visas i karusellen.
                    </div>
                  </div>
                  <Switch
                    checked={open.featured}
                    onCheckedChange={(v) => patch(open.id, { featured: v })}
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-(--color-admin-border) pt-4">
                  <button
                    onClick={() => setOpenId(null)}
                    className="inline-flex h-9 items-center rounded-md border border-(--color-admin-border) px-3 text-sm font-medium"
                  >
                    <X className="mr-1 h-3.5 w-3.5" /> Stäng
                  </button>
                  <button
                    onClick={() => {
                      toast.success('Omdöme sparat')
                      setOpenId(null)
                    }}
                    className="inline-flex h-9 items-center rounded-md bg-(--color-admin-text) px-3 text-sm font-medium text-white"
                  >
                    Spara
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
            <DialogTitle>Lägg till omdöme manuellt</DialogTitle>
            <DialogDescription>
              Användbart för citat från e-post eller telefonsamtal. Aktiveras
              med backend.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
