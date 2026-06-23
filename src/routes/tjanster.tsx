import { createFileRoute, Link } from '@tanstack/react-router'
import { PageShell, PageHeader } from '@/components/site/PageShell'
import { Accordion } from '@/components/site/Accordion'
import { CtaBanner } from '@/components/site/CtaBanner'
import heroRoom from '@/assets/hero-room.jpg'
import kitchen from '@/assets/kitchen.jpg'
import towels from '@/assets/detail-towels.jpg'
import windowImg from '@/assets/window.jpg'
import town from '@/assets/town.jpg'

export const Route = createFileRoute('/tjanster')({
  head: () => ({
    meta: [
      {
        title:
          'Städtjänster i Åtvidaberg — Hemstädning, flyttstäd, fönsterputs | Tinas Städ',
      },
      {
        name: 'description',
        content:
          'Hemstädning, veckostäd, månadsstäd, storstädning, flyttstädning, fönsterputs och kontorsstädning i Åtvidaberg. RUT-avdrag direkt på fakturan.',
      },
      {
        property: 'og:title',
        content: 'Städtjänster i Åtvidaberg | Tinas Städ',
      },
      {
        property: 'og:description',
        content:
          'Hela vårt utbud av städtjänster — från återkommande hemstäd till godkänd flyttstäd.',
      },
      { property: 'og:url', content: '/tjanster' },
    ],
    links: [{ rel: 'canonical', href: '/tjanster' }],
  }),
  component: Services,
})

type Service = {
  id: string
  eyebrow: string
  title: string
  lead: string
  includes: string[]
  benefits: string[]
  faq: { q: string; a: string }[]
  img: string
  reverse?: boolean
}

const SERVICES: Service[] = [
  {
    id: 'hemstadning',
    eyebrow: '01 — Hemstädning',
    title: 'Hemstädning, varje vecka eller varannan.',
    lead: 'Återkommande städ är grunden i vårt arbete. Samma städare, samma dag, anpassat efter ditt hem.',
    includes: [
      'Dammsugning av alla golv och mattor',
      'Våttorkning av golv',
      'Damning av ytor i ögonhöjd',
      'Badrum: handfat, kakel, toalett, dusch',
      'Kök: bänkytor, spis, fläkt utanpå, mikro',
      'Tömning av papperskorgar',
    ],
    benefits: [
      'Fast pris från första besöket',
      'Du behöver inte vara hemma',
      'RUT-avdrag direkt på fakturan',
    ],
    faq: [
      {
        q: 'Hur lång tid tar det?',
        a: 'Ett vanligt hem på 80–110 m² tar 2,5–3 timmar. Vi gör en bedömning vid hembesöket.',
      },
      {
        q: 'Vad gör ni inte?',
        a: 'Vi gör inte uppstigning på stege, ugnsrengöring eller flytt av tunga möbler i det vanliga städet. Vill du ha det med ingår det i storstädet.',
      },
    ],
    img: heroRoom,
  },
  {
    id: 'veckostadning',
    eyebrow: '02 — Veckostädning',
    title: 'Veckostäd för dig med fullt schema.',
    lead: 'Återkommande städ varje vecka. För familjer med barn, husdjur eller bara mycket på agendan.',
    includes: [
      'Allt som ingår i hemstädning',
      'Sänglinne bytt (om du lägger fram nytt)',
      'Avtorkning av speglar och glasdörrar',
      'Mer noggrann genomgång av kök & bad',
    ],
    benefits: [
      'Samma städare, samma veckodag',
      'Lägre pris än månadsstäd per gång',
      'Hemmet känns alltid nystädat',
    ],
    faq: [
      {
        q: 'Kan jag byta dag vissa veckor?',
        a: 'Ja. Skicka ett sms senast två dagar innan, så löser vi en annan tid den veckan.',
      },
    ],
    img: kitchen,
    reverse: true,
  },
  {
    id: 'manadsstadning',
    eyebrow: '03 — Månadsstädning',
    title: 'Månadsstäd för dig som mest behöver en uppfräschning.',
    lead: 'Ett grundligt städ en gång i månaden. Passar mindre hushåll, par utan barn eller fritidsboende.',
    includes: [
      'Allt som ingår i hemstädning',
      'Mer tid per yta',
      'Genomgång av lister och dörrkarmar var tredje gång',
    ],
    benefits: [
      'Lågt månadspris',
      'Bra ingång om du aldrig haft städhjälp förut',
      'Lätt att uppgradera till veckostäd senare',
    ],
    faq: [
      {
        q: 'Är det värt det för en lägenhet på 50 m²?',
        a: 'Absolut. Det är vår vanligaste storlek bland månadskunder.',
      },
    ],
    img: towels,
  },
  {
    id: 'storstadning',
    eyebrow: '04 — Storstädning',
    title: 'Storstäd inför våren, julen eller när det är dags.',
    lead: 'Ett djupare städ där vi går igenom det som inte hinns med i vardagen. Skåp, lister, fönster, det bakom kylen.',
    includes: [
      'Allt i hemstädning',
      'Skåp invändigt — kök och bad',
      'Ugn och spishäll inifrån',
      'Fönster invändigt',
      'Lister, dörrkarmar och socklar',
      'Bakom och under möbler där det går att komma åt',
    ],
    benefits: [
      'Tas en gång om året eller efter behov',
      'Kan kombineras med fönsterputs utvändigt',
      'RUT-avdrag gäller även här',
    ],
    faq: [
      {
        q: 'Hur lång tid tar ett storstäd?',
        a: 'En villa på 130 m² tar oss en hel arbetsdag, två personer. Vi ger fast pris vid hembesök.',
      },
    ],
    img: windowImg,
    reverse: true,
  },
  {
    id: 'flyttstadning',
    eyebrow: '05 — Flyttstädning',
    title: 'Flyttstäd med besiktningsgaranti.',
    lead: 'Vi gör flyttstäd enligt mäklarsamfundets checklista. Går städet inte igenom vid besiktning kommer vi tillbaka — utan kostnad.',
    includes: [
      'Samtliga rum från golv till tak',
      'Köksskåp in- och utvändigt, vitvaror inifrån',
      'Badrum: kakel, fogar, golvbrunn',
      'Fönster in- och utvändigt',
      'Garderober, förråd, balkong',
      'Tvättstuga och eventuell källare',
    ],
    benefits: [
      'Besiktningsgaranti — vi kommer tillbaka om något inte godkänns',
      'RUT-avdrag gäller',
      'Kort varsel går oftast att lösa',
    ],
    faq: [
      {
        q: 'När bör jag boka?',
        a: 'Helst två veckor innan tillträde. Vi tar kortare varsel också men kan inte alltid garantera datum.',
      },
      {
        q: 'Ingår fönsterputs?',
        a: 'Ja. Både inifrån och utifrån, samt karm och båge.',
      },
    ],
    img: kitchen,
  },
  {
    id: 'fonsterputs',
    eyebrow: '06 — Fönsterputs',
    title: 'Putsade fönster, in och ut.',
    lead: 'Vi putsar fönster för villor, lägenheter och lokaler. Två gånger om året passar de flesta — vår och höst.',
    includes: [
      'Rutor in- och utvändigt',
      'Karmar och bågar',
      'Fönsterbleck',
      'Borttagning av insektsspår och smuts',
    ],
    benefits: [
      'Inga ränder, även i motljus',
      'Vi tar med stege och allt eget material',
      'RUT-avdrag direkt på fakturan',
    ],
    faq: [
      {
        q: 'Vad kostar fönsterputs per fönster?',
        a: 'Mellan 60–95 kr per båge beroende på storlek och åtkomst. Pris efter RUT.',
      },
    ],
    img: windowImg,
    reverse: true,
  },
  {
    id: 'kontorsstadning',
    eyebrow: '07 — Kontorsstädning',
    title: 'Kontorsstäd, kvällar eller tidiga morgnar.',
    lead: 'För kontor, butiker och mindre lokaler i Åtvidaberg. Vi städar när du inte är där — så ni kan jobba ifred på dagen.',
    includes: [
      'Dammsugning och våttorkning',
      'Toaletter, kök och pentry',
      'Bordsytor, tangentbord och skärmar (på begäran)',
      'Påfyllning av papper och tvål',
      'Soptömning och källsortering',
    ],
    benefits: [
      'Faktureras månadsvis mot avtal',
      'Egen kontaktperson, inga callcenters',
      'Flexibla scheman — 1–5 gånger i veckan',
    ],
    faq: [
      {
        q: 'Skriver ni avtal?',
        a: 'Ja. Standardavtal med 3 månaders uppsägning, eller anpassat efter er.',
      },
      {
        q: 'Tar ni hand om nycklar och larm?',
        a: 'Ja, vi tar fram rutiner tillsammans med er. Försäkring täcker hela vistelsen i lokalen.',
      },
    ],
    img: town,
  },
]

function Services() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Tjänster"
        title={
          <>
            Allt du kan behöva — av{' '}
            <em className="italic font-light text-primary">samma städare</em>.
          </>
        }
        lead="Hemstäd är basen. Det mesta annat lägger kunder till över tid: fönsterputs på våren, storstäd inför julen, flyttstäd när det är dags. Här är hela utbudet."
      />

      <section className="container-page">
        <div className="hairline pt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          {SERVICES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-ink">
              {s.title.split(',')[0]}
            </a>
          ))}
        </div>
      </section>

      <div className="mt-20 space-y-32">
        {SERVICES.map((s) => (
          <article key={s.id} id={s.id} className="container-page scroll-mt-28">
            <div
              className={`grid md:grid-cols-12 gap-10 md:gap-16 items-start ${s.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="md:col-span-6">
                <div className="relative aspect-4/5 overflow-hidden rounded-md">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-6">
                <div className="eyebrow mb-5">{s.eyebrow}</div>
                <h2 className="display-lg">{s.title}</h2>
                <p className="lead mt-6">{s.lead}</p>

                <div className="mt-10 grid sm:grid-cols-2 gap-8">
                  <div>
                    <div className="text-xs eyebrow mb-3">Det här ingår</div>
                    <ul className="space-y-2 text-sm">
                      {s.includes.map((i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-primary mt-1">—</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs eyebrow mb-3">Varför</div>
                    <ul className="space-y-2 text-sm">
                      {s.benefits.map((i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-primary mt-1">—</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {s.faq.length > 0 && (
                  <div className="mt-10">
                    <div className="text-xs eyebrow mb-2">Vanliga frågor</div>
                    <Accordion items={s.faq.map((f) => ({ q: f.q, a: f.a }))} />
                  </div>
                )}

                <div className="mt-10">
                  <Link
                    to="/offert"
                    search={{ tjanst: s.id } as never}
                    className="btn-primary"
                  >
                    Begär offert för {s.title.split(',')[0].toLowerCase()}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <CtaBanner
        eyebrow="Osäker på vad du behöver?"
        title="Vi tittar förbi och föreslår ett upplägg."
        body="Hembesöket är kostnadsfritt. Vi mäter, lyssnar och ger fast pris."
      />
    </PageShell>
  )
}
