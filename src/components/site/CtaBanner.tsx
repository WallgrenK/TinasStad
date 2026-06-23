import { Link } from '@tanstack/react-router'

export function CtaBanner({
  eyebrow = 'Nästa steg',
  title,
  body,
}: {
  eyebrow?: string
  title: string
  body?: string
}) {
  return (
    <section className="container-page mt-24">
      <div className="rounded-2xl bg-ink text-background p-10 md:p-16 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <div
            className="eyebrow mb-5"
            style={{ color: 'oklch(0.85 0.02 240)' }}
          >
            {eyebrow}
          </div>
          <h2 className="display-lg" style={{ color: 'var(--background)' }}>
            {title}
          </h2>
          {body && <p className="mt-5 text-base opacity-80 max-w-xl">{body}</p>}
        </div>
        <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
          <Link
            to="/offert"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-background text-ink font-medium text-sm hover:bg-paper transition"
          >
            Begär offert →
          </Link>
          <a
            href="tel:+46700000000"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/20 text-background text-sm hover:bg-white/5 transition"
          >
            Ring 070 — 000 00 00
          </a>
        </div>
      </div>
    </section>
  )
}
