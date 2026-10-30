import { afterEach, describe, expect, it, vi } from 'vitest'
import { yearsSince } from './profile'

describe('yearsSince', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    ['2026-03-31', 8], // the day before the anniversary
    ['2026-04-01', 9], // on the anniversary
    ['2026-10-29', 9],
  ])('on %s it has been %i years since 2017-04-01', (today, expected) => {
    vi.useFakeTimers({ now: new Date(`${today}T12:00:00`) })
    expect(yearsSince('2017-04-01')).toBe(expected)
  })
})
