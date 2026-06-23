import { Link } from '@tanstack/react-router'
import logo from '@/assets/logo.png'

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line bg-paper">
      <div className="container-page py-20 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={logo} alt="Tinas Städ" className="h-14 w-auto mb-6" />
          <p className="text-ink-soft max-w-sm">
            Lokal städfirma i Åtvidaberg. Vi tar hand om hemmet, kontoret och
            fönstren — noggrant och i god tid, vecka efter vecka.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="eyebrow mb-4">Tjänster</div>
          <ul className="space-y-2 text-sm">
            {[
              ['Hemstädning', '/tjanster#hemstadning'],
              ['Flyttstädning', '/tjanster#flyttstadning'],
              ['Fönsterputs', '/tjanster#fonsterputs'],
              ['Kontorsstädning', '/tjanster#kontorsstadning'],
              ['Storstädning', '/tjanster#storstadning'],
            ].map(([l, h]) => (
              <li key={l}>
                <Link to={h} className="text-ink-soft hover:text-ink">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="eyebrow mb-4">Kontakt</div>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>
              <a href="tel:+46700000000" className="hover:text-ink">
                070 — 000 00 00
              </a>
            </li>
            <li>
              <a href="mailto:hej@tinasstad.se" className="hover:text-ink">
                hej@tinasstad.se
              </a>
            </li>
            <li>Åtvidaberg, Östergötland</li>
            <li>Mån–fre 07:00–17:00</li>
          </ul>
          <Link to="/offert" className="btn-ghost mt-6">
            Begär offert →
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page py-6 flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs text-ink-soft">
          <div>
            © {new Date().getFullYear()} Tinas Städ. Org.nr 000000-0000.
          </div>
          <div className="flex gap-6">
            <span>F-skattsedel</span>
            <span>Ansvarsförsäkring</span>
            <span>Godkänd för RUT</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
