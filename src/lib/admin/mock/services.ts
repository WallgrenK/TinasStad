export interface AdminService {
  id: string
  slug: string
  title: string
  tagline: string
  priceFromSek: number
  unit: 'tim' | 'tillfälle' | 'kvm'
  durationMin: number
  rutEligible: boolean
  published: boolean
  includes: string[]
  order: number
  updatedAt: string // ISO
}

export const adminServices: AdminService[] = [
  {
    id: 'svc_hem',
    slug: 'hemstadning',
    title: 'Hemstädning',
    tagline:
      'Återkommande städ varje vecka eller varannan — samma städare, samma dag.',
    priceFromSek: 348,
    unit: 'tim',
    durationMin: 150,
    rutEligible: true,
    published: true,
    order: 1,
    includes: [
      'Dammsugning och våttorkning av alla golv',
      'Badrum: handfat, kakel, toalett, dusch',
      'Kök: bänkytor, spis, fläkt utanpå, mikro',
      'Damning av ytor i ögonhöjd',
      'Tömning av papperskorgar',
    ],
    updatedAt: '2026-06-14T09:12:00+02:00',
  },
  {
    id: 'svc_vecka',
    slug: 'veckostadning',
    title: 'Veckostädning',
    tagline: 'För familjer med fullt schema. Samma städare, samma veckodag.',
    priceFromSek: 328,
    unit: 'tim',
    durationMin: 150,
    rutEligible: true,
    published: true,
    order: 2,
    includes: [
      'Allt som ingår i hemstädning',
      'Sänglinne bytt om du lägger fram nytt',
      'Avtorkning av speglar och glasdörrar',
      'Mer noggrann genomgång av kök och bad',
    ],
    updatedAt: '2026-06-09T14:40:00+02:00',
  },
  {
    id: 'svc_manad',
    slug: 'manadsstadning',
    title: 'Månadsstädning',
    tagline:
      'En grundlig uppfräschning en gång i månaden — passar mindre hushåll.',
    priceFromSek: 368,
    unit: 'tim',
    durationMin: 180,
    rutEligible: true,
    published: true,
    order: 3,
    includes: [
      'Allt som ingår i hemstädning',
      'Mer tid per yta',
      'Lister och dörrkarmar var tredje gång',
    ],
    updatedAt: '2026-05-30T11:05:00+02:00',
  },
  {
    id: 'svc_stor',
    slug: 'storstadning',
    title: 'Storstädning',
    tagline: 'Ett djupare städ inför våren, julen eller när det är dags.',
    priceFromSek: 398,
    unit: 'tim',
    durationMin: 360,
    rutEligible: true,
    published: true,
    order: 4,
    includes: [
      'Skåp invändigt — kök och bad',
      'Ugn och spishäll inifrån',
      'Fönster invändigt',
      'Lister, dörrkarmar och socklar',
      'Bakom och under möbler där det går att komma åt',
    ],
    updatedAt: '2026-06-02T08:20:00+02:00',
  },
  {
    id: 'svc_flytt',
    slug: 'flyttstadning',
    title: 'Flyttstädning',
    tagline:
      'Godkänd flyttstäd med besiktningsgaranti — vi kommer tillbaka om något missas.',
    priceFromSek: 32,
    unit: 'kvm',
    durationMin: 360,
    rutEligible: true,
    published: true,
    order: 5,
    includes: [
      'Alla rum, golv, lister och dörrar',
      'Kök inkl. vitvaror inifrån',
      'Badrum, golvbrunn och kakelfogar',
      'Fönsterputs invändigt',
      'Förråd och balkong',
    ],
    updatedAt: '2026-06-18T16:55:00+02:00',
  },
  {
    id: 'svc_fonster',
    slug: 'fonsterputs',
    title: 'Fönsterputs',
    tagline:
      'Villor, lägenheter och kontor — utvändigt, invändigt och mellan glasen.',
    priceFromSek: 89,
    unit: 'tillfälle',
    durationMin: 120,
    rutEligible: true,
    published: true,
    order: 6,
    includes: [
      'Putsning av alla glas — in- och utvändigt',
      'Karmar och fönsterbrädor torkas av',
      'Spröjs och persienner mot tillägg',
    ],
    updatedAt: '2026-06-11T10:30:00+02:00',
  },
  {
    id: 'svc_kontor',
    slug: 'kontorsstadning',
    title: 'Kontorsstädning',
    tagline:
      'Återkommande städ av kontor, mottagningar och butiker i Åtvidaberg.',
    priceFromSek: 295,
    unit: 'tim',
    durationMin: 120,
    rutEligible: false,
    published: false,
    order: 7,
    includes: [
      'Personalutrymmen och konferensrum',
      'Toaletter och pentry',
      'Soptömning och påfyllning av förbrukningsmaterial',
    ],
    updatedAt: '2026-05-22T07:45:00+02:00',
  },
]
