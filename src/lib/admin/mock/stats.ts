import { leads } from './leads'
import { bookings } from './bookings'
import { customers } from './customers'

const now = new Date()
const startOfToday = new Date(now)
startOfToday.setHours(0, 0, 0, 0)
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

const monthLeads = leads.filter((l) => new Date(l.receivedAt) >= startOfMonth)
const wonThisMonth = monthLeads.filter((l) => l.status === 'won').length
const totalThisMonth = monthLeads.length

export const stats = {
  newLeadsToday: leads.filter((l) => new Date(l.receivedAt) >= startOfToday)
    .length,
  activeCustomers: customers.length,
  upcomingBookings: bookings.filter(
    (b) => new Date(b.startAt) >= now && b.status === 'scheduled',
  ).length,
  openQuotes: leads.filter((l) => l.status === 'quote_sent').length,
  leadsThisMonth: totalThisMonth,
  conversionRate:
    totalThisMonth === 0
      ? 0
      : Math.round((wonThisMonth / totalThisMonth) * 100),
}

export const deltas = {
  newLeadsToday: '+2 vs. igår',
  activeCustomers: '+1 denna vecka',
  upcomingBookings: '+3 vs. förra veckan',
  openQuotes: '−1 vs. förra veckan',
  leadsThisMonth: '+18% vs. förra månaden',
  conversionRate: '+4 p.e. vs. förra månaden',
}
