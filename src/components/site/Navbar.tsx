import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import logo from '@/assets/logo.png'

const NAV = [
  { to: '/', label: 'Hem' },
  { to: '/tjanster', label: 'Tjänster' },
  { to: '/rut-avdrag', label: 'RUT-avdrag' },
  { to: '/om-oss', label: 'Om oss' },
  { to: '/kontakt', label: 'Kontakt' },
]

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-line">
      <div className="container-page flex items-center justify-between h-20">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="Tinas Städ" className="h-10 w-auto" />
          <span className="sr-only">Tinas Städ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm tracking-tight transition-colors ${
                path === n.to ? 'text-ink' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+46700000000"
            className="text-sm text-ink-soft hover:text-ink hidden lg:inline"
          >
            070 — 000 00 00
          </a>
          <Link to="/offert" className="btn-primary text-sm">
            Begär offert
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Meny"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M3 7h18" />
                <path d="M3 17h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-background">
          <div className="container-page py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`text-lg ${path === n.to ? 'text-ink' : 'text-ink-soft'}`}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/offert"
              className="btn-primary mt-2 self-start"
              onClick={() => setOpen(false)}
            >
              Begär offert
            </Link>
            <a href="tel:+46700000000" className="text-sm text-ink-soft">
              070 — 000 00 00
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
