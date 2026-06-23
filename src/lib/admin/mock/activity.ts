import type { ActivityEvent } from './types'
import { leads } from './leads'
import { bookings } from './bookings'
import { customers } from './customers'

function minutesAgo(min: number) {
  const d = new Date()
  d.setMinutes(d.getMinutes() - min)
  return d.toISOString()
}

export const activity: ActivityEvent[] = [
  {
    id: 'ev-1',
    kind: 'lead',
    title: 'Ny lead inkommen',
    description: `${leads[0].name} — ${leads[0].service}`,
    at: leads[0].receivedAt,
  },
  {
    id: 'ev-2',
    kind: 'lead',
    title: 'Ny lead inkommen',
    description: `${leads[1].name} — ${leads[1].service}`,
    at: leads[1].receivedAt,
  },
  {
    id: 'ev-3',
    kind: 'booking',
    title: 'Bokning påbörjad',
    description: `${bookings[10].customerName} — ${bookings[10].service}`,
    at: minutesAgo(45),
  },
  {
    id: 'ev-4',
    kind: 'review',
    title: 'Omdöme publicerat',
    description: 'Bengt Ahlén lämnade 5 stjärnor',
    at: minutesAgo(180),
  },
  {
    id: 'ev-5',
    kind: 'booking',
    title: 'Bokning genomförd',
    description: `${bookings[9].customerName} — ${bookings[9].service}`,
    at: minutesAgo(360),
  },
  {
    id: 'ev-6',
    kind: 'customer',
    title: 'Ny kund tillagd',
    description: customers[2].name,
    at: minutesAgo(600),
  },
  {
    id: 'ev-7',
    kind: 'lead',
    title: 'Offert skickad',
    description: `${leads[3].name} — ${leads[3].service}`,
    at: minutesAgo(1200),
  },
  {
    id: 'ev-8',
    kind: 'booking',
    title: 'Bokning genomförd',
    description: `${bookings[8].customerName} — ${bookings[8].service}`,
    at: minutesAgo(1620),
  },
]
