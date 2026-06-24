import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { Sparkles, Loader2, ArrowRight } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { staff } from '@/lib/admin/mock/staff'

export const Route = createFileRoute('/staff/login')({
  head: () => ({
    meta: [
      { title: 'Logga in · Personal · Tinas Städ' },
      { name: 'robots', content: 'noindex' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
    ],
  }),
  component: StaffLoginPage,
})

function StaffLoginPage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (phone.length < 6 || pin.length < 4) {
      setError('Ange telefonnummer och en 4-siffrig PIN.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate({ to: '/staff' })
    }, 600)
  }

  return (
    <div className="admin-scope flex min-h-screen flex-col bg-[var(--color-admin-surface)]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-admin-text)]"
        >
          <Sparkles className="h-4 w-4" />
          Tinas Städ
        </Link>

        <div className="mt-10 rounded-2xl border border-[var(--color-admin-border)] bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-admin-text)]">
              Logga in
            </h1>
            <p className="mt-1 text-sm text-[var(--color-admin-muted)]">
              Använd ditt telefonnummer och PIN för att se dagens schema.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[var(--color-admin-text)]"
              >
                Telefonnummer
              </label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="070-123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="pin"
                className="text-sm font-medium text-[var(--color-admin-text)]"
              >
                PIN-kod
              </label>
              <Input
                id="pin"
                type="password"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="h-12 text-center text-lg tracking-[0.5em]"
              />
            </div>

            {error && (
              <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full text-base"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Logga in <ArrowRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>

            <button
              type="button"
              className="block w-full text-center text-sm text-[var(--color-admin-muted)] hover:underline"
            >
              Glömt PIN? Kontakta din chef
            </button>
          </form>
        </div>

        {/* Demo quick-pick (frontend only) */}
        <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-admin-border)] bg-white/60 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--color-admin-muted)]">
            Demo · välj profil
          </p>
          <div className="grid grid-cols-2 gap-2">
            {staff.slice(0, 4).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => navigate({ to: '/staff' })}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-admin-border)] bg-white px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-admin-surface)]"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <span className="truncate text-[var(--color-admin-text)]">
                  {s.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-auto pt-10 text-center text-xs text-[var(--color-admin-muted)]">
          Är du admin?{' '}
          <Link
            to="/admin/login"
            className="font-medium text-[var(--color-admin-text)] hover:underline"
          >
            Logga in här
          </Link>
        </p>
      </div>
    </div>
  )
}
