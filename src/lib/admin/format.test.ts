import { describe, expect, it } from 'vitest'

import { formatDuration, isSameDay } from './format'

describe('admin format helpers', () => {
  it('formats job durations in minutes and hours', () => {
    expect(formatDuration(45)).toBe('45 min')
    expect(formatDuration(120)).toBe('2 tim')
    expect(formatDuration(135)).toBe('2 tim 15 min')
  })

  it('compares dates by calendar day', () => {
    expect(
      isSameDay(
        new Date('2026-06-23T08:00:00+02:00'),
        new Date('2026-06-23T17:30:00+02:00'),
      ),
    ).toBe(true)

    expect(
      isSameDay(
        new Date('2026-06-23T23:00:00+02:00'),
        new Date('2026-06-24T09:00:00+02:00'),
      ),
    ).toBe(false)
  })
})
