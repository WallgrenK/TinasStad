import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageShell, PageHeader } from '@/components/site/PageShell'

export const Route = createFileRoute('/kontakt')({
  head: () => ({
    meta: [
      { title: 'Kontakt — Tinas Städ i Åtvidaberg' },
      {
        name: 'description',
        content:
          'Ring 070 — 000 00 00 eller skriv till hej@tinasstad.se. Vi svarar samma dag, mån–fre 07:00–17:00.',
      },
      { property: 'og:title', content: 'Kontakt — Tinas Städ' },
      {
        property: 'og:description',
        content: 'Hör av dig — vi svarar samma dag.',
      },
      { property: 'og:url', content: '/kontakt' },
    ],
    links: [{ rel: 'canonical', href: '/kontakt' }],
  }),
  component: Contact,
})

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <PageShell>
      <PageHeader
        eyebrow="Kontakt"
        title={
          <>
            Hör av dig — vi{' '}
            <em className="italic font-light text-primary">svarar samma dag</em>
            .
          </>
        }
        lead="Det enklaste är att ringa. Är du osäker på vad du behöver pratar vi igenom det på telefonen — tar oftast under tio minuter."
      />

      <section className="container-page">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-10">
            <div>
              <div className="eyebrow mb-3">Telefon</div>
              <a
                href="tel:+46700000000"
                className="display-md hover:text-primary transition"
              >
                070 — 000 00 00
              </a>
              <p className="text-sm text-ink-soft mt-2">
                Mån–fre 07:00–17:00. Lämna meddelande utanför kontorstid.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">E-post</div>
              <a
                href="mailto:hej@tinasstad.se"
                className="display-md hover:text-primary transition"
              >
                hej@tinasstad.se
              </a>
              <p className="text-sm text-ink-soft mt-2">
                Skicka gärna en bild på utrymmet du vill ha städat — det hjälper
                oss att ge pris direkt.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">Besöksadress</div>
              <p className="text-lg">
                Sturegatan 12
                <br />
                597 30 Åtvidaberg
              </p>
              <p className="text-sm text-ink-soft mt-2">
                Ingång från gården. Besök efter överenskommelse.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-3">Områden vi städar i</div>
              <p className="text-ink-soft">
                Åtvidaberg · Falerum · Grebo · Björsäter · Yxnerum · Hannäs ·
                Rimforsa · delar av Linköping
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="bg-paper rounded-2xl p-8 md:p-10 border border-line">
              <div className="eyebrow mb-2">Skriv till oss</div>
              <h2 className="display-md mb-6">Ett kort meddelande räcker.</h2>
              {sent ? (
                <div className="py-12 text-center">
                  <div className="display-md">
                    Tack. Vi hör av oss inom dagen.
                  </div>
                  <p className="text-ink-soft mt-3 text-sm">
                    Brådskar det — ring oss direkt på 070 — 000 00 00.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                  className="grid gap-5"
                >
                  <Field label="Namn" name="namn" required />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Telefon" name="tel" type="tel" required />
                    <Field label="E-post" name="email" type="email" />
                  </div>
                  <Field label="Vad gäller det?" name="msg" textarea required />
                  <button className="btn-primary self-start mt-2">
                    Skicka meddelande →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page mt-24">
        <div className="rounded-2xl overflow-hidden border border-line aspect-[16/7]">
          <iframe
            title="Karta över Åtvidaberg"
            src="https://www.openstreetmap.org/export/embed.html?bbox=15.95%2C58.18%2C16.05%2C58.22&layer=mapnik&marker=58.2008%2C16.0021"
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      </section>
    </PageShell>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  textarea,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  textarea?: boolean
}) {
  const Cn =
    'w-full bg-background border border-line rounded-md px-4 py-3 text-base outline-none focus:border-ink transition'
  return (
    <label className="block">
      <span className="text-sm text-ink-soft block mb-1.5">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={Cn} />
      ) : (
        <input name={name} type={type} required={required} className={Cn} />
      )}
    </label>
  )
}
