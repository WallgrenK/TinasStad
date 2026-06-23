import type { CleaningJob } from './types'

// "Today" anchor for the prototype: tisdag 23 juni 2026
const TODAY = '2026-06-23'
const d = (offset: number) => {
  const base = new Date(TODAY + 'T00:00:00')
  base.setDate(base.getDate() + offset)
  return base.toISOString().slice(0, 10)
}

const minutesBetween = (start: string, end: string) => {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return eh * 60 + em - (sh * 60 + sm)
}

function job(
  j: Omit<CleaningJob, 'estimatedDurationMin'> & {
    estimatedDurationMin?: number
  },
): CleaningJob {
  return {
    ...j,
    estimatedDurationMin:
      j.estimatedDurationMin ?? minutesBetween(j.startTime, j.endTime),
  }
}

export const TODAY_DATE = TODAY

export const jobs: CleaningJob[] = [
  // Måndag 22 juni
  job({
    id: 'j_201',
    customerName: 'Familjen Lindberg',
    customerPhone: '+46 70 111 22 33',
    address: 'Storgatan 14, Åtvidaberg',
    service: 'Hemstädning',
    scheduledDate: d(-1),
    startTime: '08:00',
    endTime: '10:30',
    assignedStaffIds: ['s_emma'],
    status: 'completed',
    checklistId: 'cl_hem',
    internalNotes: 'Hund i hemmet, lugn labrador. Nyckel i kodlås 4729.',
    estimatedDurationMin: 150,
  }),
  job({
    id: 'j_202',
    customerName: 'Advokatbyrån Norén',
    customerPhone: '+46 13 22 33 44',
    address: 'Bruksvägen 8, Åtvidaberg',
    service: 'Kontorsstädning',
    scheduledDate: d(-1),
    startTime: '16:30',
    endTime: '18:30',
    assignedStaffIds: ['s_tina', 's_maria'],
    status: 'completed',
    checklistId: 'cl_kontor',
    internalNotes:
      'Tömma papperskorgar i alla rum, byt sopsäck i konferensrum.',
    estimatedDurationMin: 120,
  }),

  // Tisdag 23 juni – idag
  job({
    id: 'j_301',
    customerName: 'Anna Bergström',
    customerPhone: '+46 70 222 33 44',
    address: 'Trädgårdsgatan 3, Åtvidaberg',
    service: 'Hemstädning',
    scheduledDate: TODAY,
    startTime: '08:00',
    endTime: '10:00',
    assignedStaffIds: ['s_emma'],
    status: 'completed',
    checklistId: 'cl_hem',
    internalNotes: 'Husdjur: katt. Använd egen luddrulle.',
    estimatedDurationMin: 120,
  }),
  job({
    id: 'j_302',
    customerName: 'Familjen Holm',
    customerPhone: '+46 70 333 44 55',
    address: 'Lindvägen 22, Åtvidaberg',
    service: 'Flyttstädning',
    scheduledDate: TODAY,
    startTime: '09:00',
    endTime: '13:00',
    assignedStaffIds: ['s_sara', 's_maria'],
    status: 'in_progress',
    checklistId: 'cl_flytt',
    internalNotes: 'Kund överlämnar nyckel 08:45. Besiktning kl 14:00.',
    estimatedDurationMin: 240,
  }),
  job({
    id: 'j_303',
    customerName: 'Emma Lundgren',
    customerPhone: '+46 70 444 55 66',
    address: 'Kvarngatan 9B, Åtvidaberg',
    service: 'Hemstädning',
    scheduledDate: TODAY,
    startTime: '10:30',
    endTime: '12:00',
    assignedStaffIds: ['s_emma'],
    status: 'scheduled',
    checklistId: 'cl_hem',
    internalNotes: 'Allergi mot starka dofter – använd parfymfritt.',
    estimatedDurationMin: 90,
  }),
  job({
    id: 'j_304',
    customerName: 'Café Stationen',
    customerPhone: '+46 70 555 66 77',
    address: 'Stationsvägen 1, Åtvidaberg',
    service: 'Kontorsstädning',
    scheduledDate: TODAY,
    startTime: '13:00',
    endTime: '14:30',
    assignedStaffIds: ['s_emma'],
    status: 'scheduled',
    checklistId: 'cl_kontor',
    internalNotes: 'Endast efter stängning 13:00. Lås in nyckel i postlåda.',
    estimatedDurationMin: 90,
  }),
  job({
    id: 'j_305',
    customerName: 'Per Nyström',
    customerPhone: '+46 70 666 77 88',
    address: 'Bergslagsgatan 18, Åtvidaberg',
    service: 'Fönsterputs',
    scheduledDate: TODAY,
    startTime: '11:00',
    endTime: '13:00',
    assignedStaffIds: ['s_tina'],
    status: 'scheduled',
    checklistId: 'cl_fonster',
    internalNotes: '12 fönster + altandörr. Stege finns på plats.',
    estimatedDurationMin: 120,
  }),
  job({
    id: 'j_306',
    customerName: 'Familjen Sjöberg',
    customerPhone: '+46 70 777 88 99',
    address: 'Ekvägen 5, Åtvidaberg',
    service: 'Storstädning',
    scheduledDate: TODAY,
    startTime: '14:00',
    endTime: '17:30',
    assignedStaffIds: ['s_maria'],
    status: 'scheduled',
    checklistId: 'cl_stor',
    internalNotes: 'Inför sommarstängning. Extra fokus på köket.',
    estimatedDurationMin: 210,
  }),

  // Onsdag 24 juni
  job({
    id: 'j_401',
    customerName: 'Linnea Forsberg',
    customerPhone: '+46 70 888 99 00',
    address: 'Bjurkärrsvägen 11, Åtvidaberg',
    service: 'Veckostädning',
    scheduledDate: d(1),
    startTime: '08:30',
    endTime: '10:30',
    assignedStaffIds: ['s_sara'],
    status: 'scheduled',
    checklistId: 'cl_hem',
    internalNotes: 'Återkommande kund – Tina vet ordningen.',
    estimatedDurationMin: 120,
  }),
  job({
    id: 'j_402',
    customerName: 'Mäklarfirman Lind',
    customerPhone: '+46 13 11 22 33',
    address: 'Bruksgatan 4, Åtvidaberg',
    service: 'Flyttstädning',
    scheduledDate: d(1),
    startTime: '09:00',
    endTime: '14:00',
    assignedStaffIds: ['s_emma', 's_maria'],
    status: 'scheduled',
    checklistId: 'cl_flytt',
    internalNotes: 'Visning kl 15:30. Garanti gäller.',
    estimatedDurationMin: 300,
  }),

  // Torsdag 25 juni
  job({
    id: 'j_501',
    customerName: 'Familjen Hedlund',
    customerPhone: '+46 70 999 00 11',
    address: 'Skolgatan 7, Åtvidaberg',
    service: 'Hemstädning',
    scheduledDate: d(2),
    startTime: '08:00',
    endTime: '10:00',
    assignedStaffIds: ['s_emma'],
    status: 'scheduled',
    checklistId: 'cl_hem',
    internalNotes: '',
    estimatedDurationMin: 120,
  }),
  job({
    id: 'j_502',
    customerName: 'Tandläkare Wikström',
    customerPhone: '+46 13 44 55 66',
    address: 'Centralplan 2, Åtvidaberg',
    service: 'Kontorsstädning',
    scheduledDate: d(2),
    startTime: '17:00',
    endTime: '19:00',
    assignedStaffIds: ['s_tina'],
    status: 'scheduled',
    checklistId: 'cl_kontor',
    internalNotes: 'Använd egen mopp i behandlingsrum.',
    estimatedDurationMin: 120,
  }),

  // Fredag 26 juni
  job({
    id: 'j_601',
    customerName: 'Familjen Ek',
    customerPhone: '+46 70 100 20 30',
    address: 'Vretvägen 12, Åtvidaberg',
    service: 'Månadsstädning',
    scheduledDate: d(3),
    startTime: '09:00',
    endTime: '12:00',
    assignedStaffIds: ['s_sara', 's_maria'],
    status: 'scheduled',
    checklistId: 'cl_stor',
    internalNotes: 'Storstäd 1 gång/mån. Spara fika i kylen.',
    estimatedDurationMin: 180,
  }),
  job({
    id: 'j_602',
    customerName: 'Anders Palm',
    customerPhone: '+46 70 200 30 40',
    address: 'Hjortvägen 3, Åtvidaberg',
    service: 'Fönsterputs',
    scheduledDate: d(3),
    startTime: '13:00',
    endTime: '15:30',
    assignedStaffIds: ['s_emma'],
    status: 'scheduled',
    checklistId: 'cl_fonster',
    internalNotes: 'Villa med 18 fönster. Stege medtas.',
    estimatedDurationMin: 150,
  }),
]

export const jobsForDate = (date: string) =>
  jobs.filter((j) => j.scheduledDate === date)
export const jobsForStaff = (staffId: string, date?: string) =>
  jobs.filter(
    (j) =>
      j.assignedStaffIds.includes(staffId) &&
      (!date || j.scheduledDate === date),
  )
