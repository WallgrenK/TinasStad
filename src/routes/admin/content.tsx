import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Search, FileText, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

import { PageHeader } from '@/components/admin/PageHeader'
import { EmptyState } from '@/components/admin/EmptyState'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import {
  adminContentSections,
  type ContentSection,
  type ContentField,
} from '@/lib/admin/mock/content'
import { relativeSv } from '@/lib/admin/format'

export const Route = createFileRoute('/admin/content')({
  head: () => ({
    meta: [
      { title: 'Innehåll · Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: ContentPage,
})

function ContentPage() {
  const [sections, setSections] =
    useState<ContentSection[]>(adminContentSections)
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState<string>(
    adminContentSections[0]?.id ?? '',
  )
  const [dirty, setDirty] = useState<Record<string, boolean>>({})

  const pages = useMemo(() => {
    const order: string[] = []
    const grouped = new Map<string, ContentSection[]>()
    sections.forEach((s) => {
      if (!grouped.has(s.page)) {
        grouped.set(s.page, [])
        order.push(s.page)
      }
      grouped.get(s.page)!.push(s)
    })
    return order.map((p) => ({
      page: p,
      items: grouped.get(p)!.filter((s) => {
        const q = query.trim().toLowerCase()
        if (!q) return true
        return (
          s.section.toLowerCase().includes(q) ||
          s.page.toLowerCase().includes(q)
        )
      }),
    }))
  }, [sections, query])

  const active = sections.find((s) => s.id === activeId) ?? null

  const updateField = (sectionId: string, fieldKey: string, value: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              fields: s.fields.map((f) =>
                f.key === fieldKey ? { ...f, value } : f,
              ),
            }
          : s,
      ),
    )
    setDirty((d) => ({ ...d, [sectionId]: true }))
  }

  const save = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, updatedAt: new Date().toISOString() } : s,
      ),
    )
    setDirty((d) => ({ ...d, [sectionId]: false }))
    toast.success('Innehåll publicerat')
  }

  const discard = (sectionId: string) => {
    const original = adminContentSections.find((s) => s.id === sectionId)
    if (!original) return
    setSections((prev) => prev.map((s) => (s.id === sectionId ? original : s)))
    setDirty((d) => ({ ...d, [sectionId]: false }))
    toast('Ändringar ångrade')
  }

  return (
    <div>
      <PageHeader
        title="Innehåll"
        description="Texterna som visas på den publika webbplatsen. Ändringar går live när du publicerar."
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="admin-card h-fit overflow-hidden lg:sticky lg:top-4">
          <div className="border-b border-[var(--color-admin-border)] p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-admin-muted)]" />
              <Input
                placeholder="Sök sektion…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 pl-9"
              />
            </div>
          </div>
          <nav className="max-h-[640px] overflow-y-auto p-2">
            {pages.map(({ page, items }) =>
              items.length === 0 ? null : (
                <div key={page} className="mb-3 last:mb-0">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-admin-muted)]">
                    {page}
                  </div>
                  <ul>
                    {items.map((s) => {
                      const isActive = s.id === activeId
                      return (
                        <li key={s.id}>
                          <button
                            onClick={() => setActiveId(s.id)}
                            className={`flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-[13px] transition ${
                              isActive
                                ? 'bg-[var(--color-admin-accent-soft)] text-[var(--color-admin-accent)]'
                                : 'text-[var(--color-admin-text)] hover:bg-[var(--color-admin-surface)]'
                            }`}
                          >
                            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                            <span className="flex-1 truncate">{s.section}</span>
                            {dirty[s.id] && (
                              <span
                                className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"
                                title="Osparade ändringar"
                              />
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ),
            )}
            {pages.every((p) => p.items.length === 0) && (
              <div className="px-2 py-6 text-center text-[12px] text-[var(--color-admin-muted)]">
                Inga sektioner matchar
              </div>
            )}
          </nav>
        </aside>

        <section>
          {active ? (
            <div className="admin-card p-6">
              <header className="mb-6 flex flex-col gap-2 border-b border-[var(--color-admin-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-admin-muted)]">
                    {active.page}
                  </div>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-admin-text)]">
                    {active.section}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-admin-muted)]">
                    {active.description}
                  </p>
                </div>
                <div className="text-right text-[12px] text-[var(--color-admin-muted)]">
                  <div>Senast uppdaterad</div>
                  <div className="text-[var(--color-admin-text)]">
                    {relativeSv(active.updatedAt)}
                  </div>
                </div>
              </header>

              <div className="space-y-5">
                {active.fields.map((f) => (
                  <FieldEditor
                    key={f.key}
                    field={f}
                    onChange={(v) => updateField(active.id, f.key, v)}
                  />
                ))}
              </div>

              <footer className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--color-admin-border)] pt-5">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-admin-muted)] hover:text-[var(--color-admin-text)]"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Förhandsgranska på
                  webbplatsen
                </a>
                <div className="flex items-center gap-2">
                  {dirty[active.id] && (
                    <span className="text-[12px] text-amber-700">
                      Osparade ändringar
                    </span>
                  )}
                  <button
                    onClick={() => discard(active.id)}
                    disabled={!dirty[active.id]}
                    className="inline-flex h-9 items-center rounded-md border border-[var(--color-admin-border)] px-3 text-sm font-medium text-[var(--color-admin-text)] disabled:opacity-40"
                  >
                    Ångra
                  </button>
                  <button
                    onClick={() => save(active.id)}
                    disabled={!dirty[active.id]}
                    className="inline-flex h-9 items-center rounded-md bg-[var(--color-admin-text)] px-3 text-sm font-medium text-white hover:bg-[var(--color-admin-accent)] disabled:opacity-40"
                  >
                    Publicera ändringar
                  </button>
                </div>
              </footer>
            </div>
          ) : (
            <div className="admin-card">
              <EmptyState
                title="Välj en sektion"
                description="Välj en sektion till vänster för att redigera innehållet."
              />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function FieldEditor({
  field,
  onChange,
}: {
  field: ContentField
  onChange: (v: string) => void
}) {
  const counter = field.maxLength
    ? `${field.value.length} / ${field.maxLength}`
    : `${field.value.length} tecken`
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <Label className="text-[12px] font-medium text-[var(--color-admin-text)]">
          {field.label}
        </Label>
        <span className="text-[11px] tabular-nums text-[var(--color-admin-muted)]">
          {counter}
        </span>
      </div>
      {field.type === 'textarea' ? (
        <Textarea
          rows={3}
          value={field.value}
          maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <Input
          type={field.type}
          value={field.value}
          maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.helper && (
        <div className="mt-1 text-[11px] text-[var(--color-admin-muted)]">
          {field.helper}
        </div>
      )}
    </div>
  )
}
