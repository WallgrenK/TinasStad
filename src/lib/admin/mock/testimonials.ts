export interface AdminTestimonial {
  id: string
  author: string
  role: string // "Hemstädning, Åtvidaberg"
  body: string
  rating: 1 | 2 | 3 | 4 | 5
  source: 'Google' | 'Facebook' | 'Webbformulär' | 'E-post'
  published: boolean
  featured: boolean
  receivedAt: string // ISO
}

export const adminTestimonials: AdminTestimonial[] = [
  {
    id: 'rev_001',
    author: 'Karin Bergström',
    role: 'Hemstädning · Åtvidaberg',
    body: 'Tina och hennes team har städat hemma hos oss i snart två år. Samma personer varje gång, och de vet precis hur vi vill ha det. Otroligt skönt att slippa förklara om och om igen.',
    rating: 5,
    source: 'Google',
    published: true,
    featured: true,
    receivedAt: '2026-05-12T11:24:00+02:00',
  },
  {
    id: 'rev_002',
    author: 'Mikael Sundén',
    role: 'Flyttstädning · Linköping',
    body: 'Vi lämnade tillbaka en lägenhet på Vasastan och var nervösa inför besiktningen. Allt godkändes på direkten. Hyresvärden sa till och med att det var det renaste de sett på länge.',
    rating: 5,
    source: 'Webbformulär',
    published: true,
    featured: true,
    receivedAt: '2026-04-28T09:00:00+02:00',
  },
  {
    id: 'rev_003',
    author: 'Lotta Wennerberg',
    role: 'Veckostädning · Grebo',
    body: 'Trygg, prickfri och alltid på tid. Det är värt varenda krona att kunna komma hem till ett städat hus efter en lång arbetsvecka.',
    rating: 5,
    source: 'Google',
    published: true,
    featured: false,
    receivedAt: '2026-04-19T18:42:00+02:00',
  },
  {
    id: 'rev_004',
    author: 'Anders & Eva Holm',
    role: 'Storstädning · Björsäter',
    body: 'Beställde storstäd inför våra föräldrars 70-årskalas. Helt fantastiskt jobb — även bakom kylen och i ugnen. Mycket ärligt prat på hembesöket också.',
    rating: 5,
    source: 'Facebook',
    published: true,
    featured: false,
    receivedAt: '2026-03-30T13:10:00+02:00',
  },
  {
    id: 'rev_005',
    author: 'Sofia Lind',
    role: 'Hemstädning · Åtvidaberg',
    body: 'Bra service och flexibla med tider när det kniper. Skulle gärna se en lite mer detaljerad genomgång av badrummet — annars toppen.',
    rating: 4,
    source: 'E-post',
    published: false,
    featured: false,
    receivedAt: '2026-06-08T20:14:00+02:00',
  },
  {
    id: 'rev_006',
    author: 'Peter Åkesson',
    role: 'Fönsterputs · Falerum',
    body: 'Boendes i en gammal sekelskifteshus med svåråtkomliga fönster. De löste det utan minsta gnäll och fönstren ser ut som nya.',
    rating: 5,
    source: 'Google',
    published: true,
    featured: false,
    receivedAt: '2026-05-02T15:35:00+02:00',
  },
  {
    id: 'rev_007',
    author: 'Familjen Nyström',
    role: 'Veckostädning · Linköping',
    body: 'Tina själv var hos oss på första besöket och förklarade allt i lugn och ro. Inget säljsnack — bara raka svar. Det är ovanligt.',
    rating: 5,
    source: 'Webbformulär',
    published: true,
    featured: true,
    receivedAt: '2026-02-14T10:00:00+01:00',
  },
]
