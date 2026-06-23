import type { ChecklistTemplate } from './types'

export const checklists: ChecklistTemplate[] = [
  {
    id: 'cl_hem',
    service: 'Hemstädning',
    title: 'Standard hemstädning',
    items: [
      'Dammsuga alla rum',
      'Våttorka golv',
      'Torka av köksytor',
      'Rengöra badrum',
      'Tömma papperskorgar',
      'Damma fria ytor',
      'Kontrollera detaljer innan avfärd',
    ],
  },
  {
    id: 'cl_flytt',
    service: 'Flyttstädning',
    title: 'Flyttstädning – garanti',
    items: [
      'Rengöra kyl och frys inifrån',
      'Avfrosta och torka ur ugn',
      'Rengöra köksfläkt och filter',
      'Torka ur alla skåp och lådor',
      'Putsa fönster in- och utvändigt',
      'Skura badrum och toalett grundligt',
      'Damma av lister, dörrar och elementen',
      'Dammsuga och våttorka alla golv',
      'Slutkontroll mot Tinas checklista',
    ],
  },
  {
    id: 'cl_fonster',
    service: 'Fönsterputs',
    title: 'Fönsterputs (in- och utvändigt)',
    items: [
      'Putsa rutor utvändigt',
      'Putsa rutor invändigt',
      'Torka karmar och bågar',
      'Putsa speglar i hallar',
      'Slutkontroll mot motljus',
    ],
  },
  {
    id: 'cl_kontor',
    service: 'Kontorsstädning',
    title: 'Kontor – vecka',
    items: [
      'Tömma papperskorgar',
      'Torka skrivbord och bordsytor',
      'Dammsuga mattor och golv',
      'Våttorka hårda golv',
      'Rengöra pentry och kaffemaskin',
      'Påfyllning av toapapper och tvål',
      'Slutkontroll av mötesrum',
    ],
  },
  {
    id: 'cl_stor',
    service: 'Storstädning',
    title: 'Storstädning – grundlig',
    items: [
      'Dammtorka över skåp och hyllor',
      'Damma av tavlor och lampor',
      'Torka av dörrar och lister',
      'Rengöra fönsterkarmar',
      'Skura badrum grundligt',
      'Polera kranar och beslag',
      'Slutkontroll innan avfärd',
    ],
  },
]

export const checklistById = (id: string) => checklists.find((c) => c.id === id)
