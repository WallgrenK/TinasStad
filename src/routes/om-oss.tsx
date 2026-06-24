import { createFileRoute } from '@tanstack/react-router'
import { PageShell, PageHeader } from '@/components/site/PageShell'
import { CtaBanner } from '@/components/site/CtaBanner'
import detailTowels from '@/assets/detail-towels.jpg'
import town from '@/assets/town.jpg'

export const Route = createFileRoute('/om-oss')({
  head: () => ({
    meta: [
      { title: 'Om Tinas Städ — Lokal städfirma i Åtvidaberg sedan 2013' },
      {
        name: 'description',
        content:
          'Tinas Städ är en familjeägd städfirma i Åtvidaberg. Vi tror på samma städare, samma dag, år efter år.',
      },
      { property: 'og:title', content: 'Om Tinas Städ' },
      {
        property: 'og:description',
        content: 'Lokal städfirma i Åtvidaberg sedan 2013.',
      },
      { property: 'og:url', content: '/om-oss' },
    ],
    links: [{ rel: 'canonical', href: '/om-oss' }],
  }),
  component: About,
})

function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Om oss"
        title={
          <>
            En städfirma.{' '}
            <em className="italic font-light text-primary">Åtvidaberg.</em>{' '}
            Sedan 2013.
          </>
        }
        lead="Tinas Städ startades 2013 av Tina Karlsson i ett källarförråd på Sturegatan, med en kund och en hink. Idag är vi sex personer som tar hand om runt 380 hem och kontor varje månad — alla inom 30 minuters bilväg från torget."
      />

      <section className="container-page">
        <div className="grid md:grid-cols-12 gap-10 mt-10">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <img
                src={town}
                alt="Åtvidaberg"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <img
                src={detailTowels}
                alt="Linne"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page mt-28 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="eyebrow mb-4">Det här tror vi på</div>
          <h2 className="display-lg">Det handlar mest om att dyka upp.</h2>
        </div>
        <div className="md:col-span-7 space-y-8 text-ink-soft text-lg leading-relaxed">
          <p>
            När Tina startade firman hade hon jobbat åtta år som städledare på
            ett stort företag i Linköping. Det fungerade, men kunderna såg
            sällan samma städare två gånger. Det blev opersonligt. Folk fick
            byta nyckeluttagare var tredje månad.
          </p>
          <p>
            Tanken bakom Tinas Städ var enkel: en kund, en städare, så länge
            båda vill. De flesta av våra kunder från 2013 är fortfarande kvar.
            Det är det mått på kvalitet som vi tror mest på.
          </p>
          <p>
            Vi tar inte fler kunder än vi hinner med. När kalendern är full
            skriver vi upp dig på en väntelista — vi har sällan plats direkt,
            men oftast inom sex till åtta veckor.
          </p>
        </div>
      </section>

      <section className="container-page mt-28">
        <div className="eyebrow mb-5">Tre saker som styr oss</div>
        <div className="grid md:grid-cols-3 gap-10 hairline pt-12">
          {[
            [
              'Långsamt är bättre.',
              'Ett städ tar den tid det tar. Vi bygger in marginal i schemat så att städaren hinner göra det ordentligt — inte tre minuter för fort.',
            ],
            [
              'Lokala kunder, lokala anställda.',
              'Alla i teamet bor i Åtvidaberg eller Falerum. Alla får kollektivavtal, försäkring och tjänstepension från dag ett.',
            ],
            [
              'Lagom är gott.',
              'Vi vill inte bli stora. Vi vill att Tinas Städ ska finnas kvar om femton år och fortfarande städa hos samma familjer.',
            ],
          ].map(([h, b]) => (
            <div key={h}>
              <div className="display-md">{h}</div>
              <p className="text-ink-soft mt-3">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="eyebrow mb-3">I siffror</div>
            <h2 className="display-lg">Tolv år av repetition.</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 self-end">
            {[
              ['2013', 'Året vi startade'],
              ['6', 'personer i teamet'],
              ['380', 'uppdrag varje månad'],
              ['12 år', 'längsta kundrelation'],
              ['4,9', 'snittbetyg på Google'],
              ['0', 'uppsagda kunder 2024'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="display-md">{n}</div>
                <div className="text-sm text-ink-soft mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Vill du veta om vi har plats?"
        body="Ring eller skriv. Är vi fullbokade säger vi det rakt ut — och föreslår en kollega vi litar på."
      />
    </PageShell>
  )
}
