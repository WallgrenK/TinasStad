export type LeadStatus = 'new' | 'contacted' | 'quote_sent' | 'won' | 'lost'
export type BookingStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type ServiceName =
  | 'Hemstädning'
  | 'Veckostädning'
  | 'Månadsstädning'
  | 'Flyttstädning'
  | 'Fönsterputs'
  | 'Kontorsstädning'
  | 'Storstädning'

export interface LeadNote {
  id: string
  author: string
  body: string
  createdAt: string
}

export interface LeadActivity {
  id: string
  kind: 'status' | 'note' | 'created'
  label: string
  at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  service: ServiceName
  propertySize: string
  message: string
  receivedAt: string
  status: LeadStatus
  notes: LeadNote[]
  activity: LeadActivity[]
  linkedCustomerId?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  internalNotes: string
  totalBookings: number
  lastBookingAt?: string
  linkedLeadIds: string[]
  createdAt: string
}

export interface Booking {
  id: string
  customerId: string
  customerName: string
  address: string
  service: ServiceName
  startAt: string
  durationMin: number
  status: BookingStatus
}

export interface ActivityEvent {
  id: string
  kind: 'lead' | 'booking' | 'customer' | 'review'
  title: string
  description: string
  at: string
}

/* ============ Staff / Schedule / Time tracking ============ */

export type StaffStatus = 'active' | 'inactive'
export type JobStatus =
  | 'scheduled'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'cancelled'

export interface AdminStaff {
  id: string
  name: string
  phone: string
  email: string
  role: string
  color: string // hex
  status: StaffStatus
  workingHours: string // e.g. "Mån–fre · 07:00–16:00"
  initials: string
}

export interface CleaningJob {
  id: string
  customerName: string
  customerPhone: string
  address: string
  service: ServiceName
  scheduledDate: string // YYYY-MM-DD
  startTime: string // HH:MM
  endTime: string
  estimatedDurationMin: number
  assignedStaffIds: string[]
  status: JobStatus
  checklistId: string
  internalNotes: string
}

export interface TimeEntry {
  jobId: string
  staffId: string
  startedAt?: string // ISO
  pausedDurationMin: number
  finishedAt?: string
  actualDurationMin?: number
  varianceMin?: number // actual - estimated
  comment?: string
}

export interface ChecklistTemplate {
  id: string
  service: ServiceName
  title: string
  items: {
    label: string
  }[]
}
