import { createFileRoute, Link } from '@tanstack/react-router'
import { PageShell } from '@/components/site/PageShell'
import { Accordion } from '@/components/site/Accordion'
import { CtaBanner } from '@/components/site/CtaBanner'
import heroRoom from '@/assets/hero-room.jpg'
import detailTowels from '@/assets/detail-towels.jpg'
import kitchen from '@/assets/kitchen.jpg'
import town from '@/assets/town.jpg'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Tinas Städ — Städfirma i Åtvidaberg' },
      {
        name: 'description',
        content:
          'Lokal städfirma i Åtvidaberg. Hemstädning, flyttstädning, fönsterputs och kontorsstädning. RUT-avdrag direkt på fakturan.',
      },
      { property: 'og:title', content: 'Tinas Städ — Städfirma i Åtvidaberg' },
      {
        property: 'og:description',
        content: 'Lokal städfirma i Åtvidaberg. RUT-avdrag direkt på fakturan.',
      },
      { property: 'og:url', content: '/' },
    ],
    links: [{ rel: 'canonical', href: '/' }],
  }),
  component: Home,
})

const SERVICES = [
  {
    slug: 'hemstadning',
    title: 'Hemstädning',
    text: 'Återkommande städ av hela hemmet, anpassat efter dig.',
    img: heroRoom,
  },
  {
    slug: 'flyttstadning',
    title: 'Flyttstädning',
    text: 'Godkänd flyttstäd med besiktningsgaranti.',
    img: kitchen,
  },
  {
    slug: 'fonsterputs',
    title: 'Fönsterputs',
    text: 'Putsade fönster in- och utvändigt, även karm och bågar.',
    img: detailTowels,
  },
  {
    slug: 'kontorsstadning',
    title: 'Kontorsstädning',
    text: 'Diskret städning av kontor och butikslokaler.',
    img: town,
  },
]

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="container-page pt-12 md:pt-20">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-7">
            <div className="eyebrow mb-6">Städfirma — Åtvidaberg</div>
            <h1 className="display-xl">
              Ett rent hem,
              <br />
              <em className="italic font-light text-primary">
                utan att du behöver tänka på det.
              </em>
            </h1>
            <p className="lead mt-8">
              Vi är den lokala städfirman i Åtvidaberg som familjer, småföretag
              och fastighetsägare vänder sig till när det ska vara gjort
              ordentligt — varje gång, i tid, av samma person.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/offert" className="btn-primary">
                Begär offert
              </Link>
              <a href="tel:+46700000000" className="btn-ghost">
                Ring 070 — 000 00 00
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-sm text-ink-soft">
              <span>★ 4,9 / 5 från kundernas omdömen</span>
              <span>RUT-avdrag på fakturan</span>
              <span>Försäkrad & F-skatt</span>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden rounded-md">
              <img
                src={heroRoom}
                alt="Lugnt vardagsrum med naturligt ljus"
                className="absolute inset-0 w-full h-full object-cover"
                width={1024}
                height={1280}
              />
            </div>
            <p className="text-xs text-ink-soft mt-3 italic">
              Hemstädning hos kund i centrala Åtvidaberg.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="container-page mt-24">
        <div className="hairline pt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ['12+', 'år i Åtvidaberg'],
            ['380', 'hem & kontor varje månad'],
            ['96%', 'kunder kvar efter ett år'],
            ['1', 'fast städare per kund'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="display-md">{n}</div>
              <div className="text-sm text-ink-soft mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container-page mt-28">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <div className="eyebrow mb-5">Våra tjänster</div>
            <h2 className="display-lg">
              Allt som hör hemmet till — och en del till.
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 text-ink-soft self-end">
            Återkommande hemstäd är basen i vårt arbete. Många kunder lägger
            till fönsterputs på våren, storstäd inför jul eller flyttstäd när
            livet förändras. Samma städare, samma kvalitet, en faktura.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/tjanster`}
              hash={s.slug}
              className="group block"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-md bg-muted">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="display-md">{s.title}</h3>
                  <p className="text-sm text-ink-soft mt-1.5">{s.text}</p>
                </div>
                <span className="text-ink-soft mt-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us — editorial split */}
      <section className="container-page mt-32">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5 md:sticky md:top-28">
            <div className="eyebrow mb-5">Varför Tinas Städ</div>
            <h2 className="display-lg">
              Det är detaljerna kunder lägger märke till.
            </h2>
            <p className="lead mt-6">
              Vi är ett litet team som hellre tar färre kunder och gör jobbet
              ordentligt än växer snabbt och tappar kvaliteten.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-12">
            {[
              [
                'Samma städare varje gång',
                'Du lär känna den som städar hemma hos dig. Inga byten i sista stund.',
              ],
              [
                'Vi använder dina nycklar tryggt',
                'Nycklar förvaras inlåsta och märkta med kod — aldrig med namn eller adress.',
              ],
              [
                'Egna miljömärkta medel',
                'Svanen- och Bra Miljöval-märkta produkter. Vi tar med allt själva.',
              ],
              [
                'Fast pris från första besöket',
                'Vi kommer hem på ett kostnadsfritt besök innan vi börjar. Inga överraskningar.',
              ],
              [
                'Försäkring som täcker hemmet',
                'Ansvarsförsäkring upp till 10 Mkr via Trygg-Hansa.',
              ],
              [
                'Lokala, alltid',
                'Vi bor och jobbar i Åtvidaberg. Vi tar färjan, inte tåget.',
              ],
            ].map(([h, b]) => (
              <div key={h}>
                <div className="font-medium text-ink mb-2">{h}</div>
                <p className="text-sm text-ink-soft leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-page mt-32">
        <div className="eyebrow mb-5">Så går det till</div>
        <h2 className="display-lg max-w-3xl">
          Fyra steg, inga överraskningar.
        </h2>

        <div className="mt-14 grid md:grid-cols-4 gap-y-10 gap-x-8 hairline pt-12">
          {[
            [
              '01',
              'Ett samtal',
              'Vi pratar i tio minuter om hemmet, dina vanor och vad du vill ha hjälp med.',
            ],
            [
              '02',
              'Hembesök',
              'Vi kommer förbi, mäter ytan och föreslår ett upplägg och pris. Kostnadsfritt.',
            ],
            [
              '03',
              'Första städet',
              'Vi börjar med ett grundligare första städ. Du behöver inte vara hemma.',
            ],
            [
              '04',
              'Fortsättning',
              'Samma städare, samma dag varje vecka eller varannan. Du betalar med RUT på fakturan.',
            ],
          ].map(([n, t, b]) => (
            <div key={n}>
              <div className="text-xs tracking-widest text-primary">{n}</div>
              <div className="display-md mt-3">{t}</div>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RUT */}
      <section className="container-page mt-32">
        <div className="grid md:grid-cols-12 gap-10 items-center bg-paper rounded-2xl p-8 md:p-16">
          <div className="md:col-span-7">
            <div className="eyebrow mb-5">RUT-avdrag</div>
            <h2 className="display-lg">Du betalar bara halva priset.</h2>
            <p className="lead mt-6">
              Vi drar av RUT direkt på fakturan. Du behöver inte fylla i något
              själv — bara kontrollera att avdraget syns och betala det som står
              längst ner.
            </p>
            <Link to="/rut-avdrag" className="btn-ghost mt-8">
              Så fungerar RUT-avdraget →
            </Link>
          </div>
          <div className="md:col-span-5">
            <div className="bg-background rounded-xl p-6 border border-line text-sm">
              <div className="text-xs eyebrow mb-4">Räkneexempel</div>
              <div className="flex justify-between py-2">
                <span className="text-ink-soft">Hemstäd 3 tim</span>
                <span>1 290 kr</span>
              </div>
              <div className="flex justify-between py-2 border-t border-line">
                <span className="text-ink-soft">RUT-avdrag 50%</span>
                <span className="text-primary">−645 kr</span>
              </div>
              <div className="flex justify-between py-3 border-t border-line font-medium">
                <span>Du betalar</span>
                <span className="text-lg">645 kr</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page mt-32">
        <div className="eyebrow mb-5">Vad kunderna säger</div>
        <h2 className="display-lg max-w-3xl">
          Återkommande kunder, sedan länge.
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            {
              q: 'Vi har haft Tina hemma hos oss i snart sex år. Hon kommer på fredagar, vi behöver knappt höras av. Det bara fungerar.',
              n: 'Karin & Lars',
              c: 'Familj, Åtvidaberg',
            },
            {
              q: 'Beställde flyttstäd inför försäljningen. Mäklarens besiktning gick på fem minuter. Det är värt varenda krona.',
              n: 'Henrik N.',
              c: 'Flyttstäd, Falerum',
            },
            {
              q: 'Vi har låtit dem ta hand om kontoret tre kvällar i veckan i två år. Aldrig en missad gång.',
              n: 'Anna Sundberg',
              c: 'Kontorsstäd, Grebo',
            },
          ].map((t) => (
            <figure
              key={t.n}
              className="bg-paper rounded-xl p-8 border border-line"
            >
              <blockquote className="display-md leading-snug">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium">{t.n}</div>
                <div className="text-ink-soft">{t.c}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page mt-32">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="eyebrow mb-5">Frågor & svar</div>
            <h2 className="display-lg">Det vi får frågor om.</h2>
            <p className="text-ink-soft mt-6">
              Hittar du inte svaret?{' '}
              <Link to="/kontakt" className="underline">
                Ring eller skriv till oss
              </Link>{' '}
              — vi svarar samma dag.
            </p>
          </div>
          <div className="md:col-span-8">
            <Accordion
              items={[
                {
                  q: 'Behöver jag vara hemma när ni städar?',
                  a: 'Nej. De flesta av våra kunder lämnar en nyckel som vi förvarar inlåst. Du får alltid samma städare, så ingen okänd person besöker hemmet.',
                },
                {
                  q: 'Vilka produkter använder ni?',
                  a: 'Vi tar med egna städmedel — Svanen- och Bra Miljöval-märkta. Har du allergier eller önskemål om specifika medel löser vi det.',
                },
                {
                  q: 'Vad händer om jag inte är nöjd?',
                  a: 'Hör av dig inom 24 timmar. Vi kommer tillbaka och fixar det utan extra kostnad. Det har hänt en handfull gånger på tolv år — och vi har alltid löst det.',
                },
                {
                  q: 'Hur säger jag upp ett återkommande städ?',
                  a: 'Med en månads varsel, när som helst. Inga bindningstider.',
                },
                {
                  q: 'Städar ni hos äldre med hemtjänstbeslut?',
                  a: 'Ja. Vi har erfarenhet av att städa hos äldre och anpassar arbetstempo och samtalston därefter.',
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="container-page mt-32">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6">
            <div className="relative aspect-4/3 overflow-hidden rounded-md">
              <img
                src={town}
                alt="Gammal stadskärna i Åtvidaberg"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="eyebrow mb-5">Vi är lokala</div>
            <h2 className="display-lg">Åtvidaberg och bygden runt omkring.</h2>
            <p className="lead mt-6">
              Vi tar uppdrag i Åtvidaberg, Falerum, Grebo, Björsäter, Yxnerum
              och Hannäs. Bor du utanför det området? Hör av dig ändå — vi har
              kunder så långt som till Linköping.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {[
                'Åtvidaberg',
                'Falerum',
                'Grebo',
                'Björsäter',
                'Yxnerum',
                'Hannäs',
                'Rimforsa',
                'Linköping',
              ].map((o) => (
                <span
                  key={o}
                  className="px-3 py-1.5 rounded-full border border-line text-ink-soft"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Boka ett hembesök — utan att binda dig."
        body="Vi kommer hem till dig, tittar igenom hemmet och föreslår ett upplägg. Det tar 20 minuter och kostar ingenting."
      />
    </PageShell>
  )
}
