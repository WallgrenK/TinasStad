import type { Booking, BookingStatus, ServiceName } from './types'

function at(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + dayOffset)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

interface Seed {
  customerId: string
  customerName: string
  address: string
  service: ServiceName
  dayOffset: number
  hour: number
  minute?: number
  durationMin: number
  status: BookingStatus
}

const seeds: Seed[] = [
  // Past
  {
    customerId: 'C-107',
    customerName: 'Bengt Ahlén',
    address: 'Villavägen 8, Åtvidaberg',
    service: 'Hemstädning',
    dayOffset: -14,
    hour: 9,
    durationMin: 150,
    status: 'completed',
  },
  {
    customerId: 'C-110',
    customerName: 'Åtvidabergs Bygg AB',
    address: 'Industrigatan 9, Åtvidaberg',
    service: 'Kontorsstädning',
    dayOffset: -12,
    hour: 18,
    durationMin: 180,
    status: 'completed',
  },
  {
    customerId: 'C-101',
    customerName: 'Karin Holm',
    address: 'Skogsvägen 18, Falerum',
    service: 'Månadsstädning',
    dayOffset: -10,
    hour: 10,
    durationMin: 120,
    status: 'completed',
  },
  {
    customerId: 'C-105',
    customerName: 'Ingrid Sjöberg',
    address: 'Norra vägen 5, Falerum',
    service: 'Månadsstädning',
    dayOffset: -9,
    hour: 13,
    durationMin: 120,
    status: 'cancelled',
  },
  {
    customerId: 'C-108',
    customerName: 'Lina Hagström',
    address: 'Sjövägen 14, Grebo',
    service: 'Veckostädning',
    dayOffset: -7,
    hour: 9,
    durationMin: 120,
    status: 'completed',
  },
  {
    customerId: 'C-102',
    customerName: 'Maria Eklund',
    address: 'Parkvägen 11, Åtvidaberg',
    service: 'Hemstädning',
    dayOffset: -7,
    hour: 13,
    durationMin: 150,
    status: 'completed',
  },
  {
    customerId: 'C-109',
    customerName: 'Familjen Karlsson',
    address: 'Lärkvägen 3, Linköping',
    service: 'Storstädning',
    dayOffset: -5,
    hour: 8,
    durationMin: 240,
    status: 'completed',
  },
  {
    customerId: 'C-106',
    customerName: 'Wallin Redovisning',
    address: 'Stationsgatan 17, Åtvidaberg',
    service: 'Kontorsstädning',
    dayOffset: -3,
    hour: 18,
    minute: 30,
    durationMin: 90,
    status: 'completed',
  },
  {
    customerId: 'C-104',
    customerName: 'Sofia Bergman',
    address: 'Kyrkogatan 5, Björsäter',
    service: 'Fönsterputs',
    dayOffset: -2,
    hour: 10,
    durationMin: 180,
    status: 'completed',
  },
  {
    customerId: 'C-107',
    customerName: 'Bengt Ahlén',
    address: 'Villavägen 8, Åtvidaberg',
    service: 'Hemstädning',
    dayOffset: -1,
    hour: 9,
    durationMin: 150,
    status: 'completed',
  },

  // Today
  {
    customerId: 'C-106',
    customerName: 'Wallin Redovisning',
    address: 'Stationsgatan 17, Åtvidaberg',
    service: 'Kontorsstädning',
    dayOffset: 0,
    hour: 8,
    durationMin: 90,
    status: 'in_progress',
  },
  {
    customerId: 'C-108',
    customerName: 'Lina Hagström',
    address: 'Sjövägen 14, Grebo',
    service: 'Veckostädning',
    dayOffset: 0,
    hour: 11,
    durationMin: 120,
    status: 'scheduled',
  },
  {
    customerId: 'C-102',
    customerName: 'Maria Eklund',
    address: 'Parkvägen 11, Åtvidaberg',
    service: 'Hemstädning',
    dayOffset: 0,
    hour: 14,
    durationMin: 150,
    status: 'scheduled',
  },

  // Upcoming
  {
    customerId: 'C-101',
    customerName: 'Karin Holm',
    address: 'Skogsvägen 18, Falerum',
    service: 'Månadsstädning',
    dayOffset: 1,
    hour: 10,
    durationMin: 120,
    status: 'scheduled',
  },
  {
    customerId: 'C-107',
    customerName: 'Bengt Ahlén',
    address: 'Villavägen 8, Åtvidaberg',
    service: 'Hemstädning',
    dayOffset: 2,
    hour: 9,
    durationMin: 150,
    status: 'scheduled',
  },
  {
    customerId: 'C-103',
    customerName: 'Emma Forsberg',
    address: 'Östra Långgatan 22, Linköping',
    service: 'Storstädning',
    dayOffset: 3,
    hour: 8,
    durationMin: 240,
    status: 'scheduled',
  },
  {
    customerId: 'C-104',
    customerName: 'Sofia Bergman',
    address: 'Kyrkogatan 5, Björsäter',
    service: 'Fönsterputs',
    dayOffset: 4,
    hour: 10,
    durationMin: 180,
    status: 'scheduled',
  },
  {
    customerId: 'C-110',
    customerName: 'Åtvidabergs Bygg AB',
    address: 'Industrigatan 9, Åtvidaberg',
    service: 'Kontorsstädning',
    dayOffset: 5,
    hour: 18,
    durationMin: 180,
    status: 'scheduled',
  },
  {
    customerId: 'C-109',
    customerName: 'Familjen Karlsson',
    address: 'Lärkvägen 3, Linköping',
    service: 'Veckostädning',
    dayOffset: 7,
    hour: 9,
    durationMin: 120,
    status: 'scheduled',
  },
  {
    customerId: 'C-105',
    customerName: 'Ingrid Sjöberg',
    address: 'Norra vägen 5, Falerum',
    service: 'Månadsstädning',
    dayOffset: 9,
    hour: 13,
    durationMin: 120,
    status: 'scheduled',
  },
  {
    customerId: 'C-108',
    customerName: 'Lina Hagström',
    address: 'Sjövägen 14, Grebo',
    service: 'Veckostädning',
    dayOffset: 14,
    hour: 9,
    durationMin: 120,
    status: 'scheduled',
  },
]

export const bookings: Booking[] = seeds.map((s, i) => ({
  id: `B-${3000 + i}`,
  customerId: s.customerId,
  customerName: s.customerName,
  address: s.address,
  service: s.service,
  startAt: at(s.dayOffset, s.hour, s.minute ?? 0),
  durationMin: s.durationMin,
  status: s.status,
}))
