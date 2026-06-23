export type ContentFieldType = 'text' | 'textarea' | 'url' | 'tel' | 'email'

export interface ContentField {
  key: string
  label: string
  type: ContentFieldType
  value: string
  helper?: string
  maxLength?: number
}

export interface ContentSection {
  id: string
  page: string
  section: string
  description: string
  updatedAt: string
  fields: ContentField[]
}

export const adminContentSections: ContentSection[] = [
  {
    id: 'home_hero',
    page: 'Startsidan',
    section: 'Hjältesektion',
    description: 'Det första besökaren möter — rubrik, ingress och primär CTA.',
    updatedAt: '2026-06-15T08:00:00+02:00',
    fields: [
      {
        key: 'eyebrow',
        label: 'Etikett över rubrik',
        type: 'text',
        value: 'Lokal städfirma i Åtvidaberg sedan 2014',
        maxLength: 80,
      },
      {
        key: 'headline',
        label: 'Huvudrubrik',
        type: 'textarea',
        value: 'Ett rent hem, utan strul.',
        helper: 'Håll det kort. Två rader på desktop som mest.',
      },
      {
        key: 'lead',
        label: 'Ingress',
        type: 'textarea',
        value:
          'Vi städar villor, lägenheter och kontor i Åtvidaberg med omnejd. Samma städare hos dig varje gång — och RUT-avdraget dras direkt på fakturan.',
      },
      {
        key: 'cta_label',
        label: 'Knapp — text',
        type: 'text',
        value: 'Begär offert',
        maxLength: 30,
      },
      {
        key: 'cta_href',
        label: 'Knapp — länk',
        type: 'url',
        value: '/offert',
      },
    ],
  },
  {
    id: 'home_usp',
    page: 'Startsidan',
    section: 'Trygghetsblock',
    description: 'Tre punkter som motiverar valet av Tinas Städ.',
    updatedAt: '2026-05-30T10:24:00+02:00',
    fields: [
      {
        key: 'usp_1',
        label: 'USP 1',
        type: 'text',
        value: 'Samma städare, varje gång',
      },
      {
        key: 'usp_2',
        label: 'USP 2',
        type: 'text',
        value: 'Försäkrade upp till 10 MSEK',
      },
      {
        key: 'usp_3',
        label: 'USP 3',
        type: 'text',
        value: 'Nöjd-kund-garanti inom 24 h',
      },
    ],
  },
  {
    id: 'home_cta',
    page: 'Startsidan',
    section: 'Avslutande CTA',
    description: 'Banner längst ner på startsidan.',
    updatedAt: '2026-04-22T09:10:00+02:00',
    fields: [
      {
        key: 'title',
        label: 'Rubrik',
        type: 'text',
        value: 'Redo att lämna städet till någon annan?',
      },
      {
        key: 'body',
        label: 'Brödtext',
        type: 'textarea',
        value:
          'Få en personlig offert inom ett dygn. Vi kommer hem till dig kostnadsfritt och går igenom vad du behöver.',
      },
    ],
  },
  {
    id: 'footer',
    page: 'Sidfot',
    section: 'Kontakt och företagsinformation',
    description: 'Visas på alla sidor i sidfoten.',
    updatedAt: '2026-03-11T13:00:00+01:00',
    fields: [
      {
        key: 'phone',
        label: 'Telefon',
        type: 'tel',
        value: '+46 70 412 38 91',
      },
      {
        key: 'email',
        label: 'E-post',
        type: 'email',
        value: 'hej@tinasstad.se',
      },
      {
        key: 'address',
        label: 'Besöksadress',
        type: 'text',
        value: 'Bruksgatan 14, 597 30 Åtvidaberg',
      },
      { key: 'org', label: 'Org.nr', type: 'text', value: '559214-8821' },
      {
        key: 'hours',
        label: 'Öppettider',
        type: 'text',
        value: 'Mån–fre 07:00–17:00',
      },
    ],
  },
  {
    id: 'rut_explainer',
    page: 'RUT-avdrag',
    section: 'Förklarande text',
    description: 'Huvudtexten på /rut-avdrag-sidan.',
    updatedAt: '2026-02-04T14:30:00+01:00',
    fields: [
      {
        key: 'headline',
        label: 'Rubrik',
        type: 'text',
        value:
          'Du betalar bara halva priset — vi sköter resten med Skatteverket.',
      },
      {
        key: 'body',
        label: 'Brödtext',
        type: 'textarea',
        value:
          'RUT-avdraget innebär att du som privatperson får tillbaka 50 % av arbetskostnaden, upp till 75 000 kr per person och år. Vi drar av det direkt på fakturan — du behöver inte göra någonting själv.',
      },
    ],
  },
  {
    id: 'contact_intro',
    page: 'Kontakt',
    section: 'Inledning',
    description: 'Texten ovanför kontaktformuläret.',
    updatedAt: '2026-01-28T11:18:00+01:00',
    fields: [
      {
        key: 'headline',
        label: 'Rubrik',
        type: 'text',
        value: 'Hör av dig — vi svarar inom dagen.',
      },
      {
        key: 'body',
        label: 'Brödtext',
        type: 'textarea',
        value:
          'Vi tar nya kunder löpande och bokar gärna in ett kostnadsfritt hembesök för att ge en korrekt offert.',
      },
    ],
  },
]
