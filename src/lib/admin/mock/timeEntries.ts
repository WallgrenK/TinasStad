import type { TimeEntry } from './types'

export const timeEntries: TimeEntry[] = [
  // Måndag – avslutade
  {
    jobId: 'j_201',
    staffId: 's_emma',
    startedAt: '2026-06-22T08:02:00',
    pausedDurationMin: 0,
    finishedAt: '2026-06-22T10:18:00',
    actualDurationMin: 136,
    varianceMin: -14,
    comment: 'Snabbare än vanligt – allt på sin plats.',
  },
  {
    jobId: 'j_202',
    staffId: 's_tina',
    startedAt: '2026-06-22T16:35:00',
    pausedDurationMin: 5,
    finishedAt: '2026-06-22T18:42:00',
    actualDurationMin: 127,
    varianceMin: 7,
    comment: 'Extra dammigt i konferensrum.',
  },

  // Tisdag – idag
  {
    jobId: 'j_301',
    staffId: 's_emma',
    startedAt: '2026-06-23T08:05:00',
    pausedDurationMin: 0,
    finishedAt: '2026-06-23T10:12:00',
    actualDurationMin: 127,
    varianceMin: 7,
    comment: 'Lite extra tid på badrum.',
  },
  {
    jobId: 'j_302',
    staffId: 's_sara',
    startedAt: '2026-06-23T09:02:00',
    pausedDurationMin: 10,
    comment: 'Pågår – stort badrum tar tid.',
  },
]

export const timeEntryForJob = (jobId: string) =>
  timeEntries.find((t) => t.jobId === jobId)
