import { describe, expect, it } from 'vitest'
import en from '../locales/en'
import pt from '../locales/pt'
import { acts, jobs } from './experience'
import { projects } from './projects'
import { skillGroups } from './skills'

const locales = { en, pt }

/** Paths where the two values differ in shape (type, keys or array length). */
function shapeDiff(a: unknown, b: unknown, path = ''): string[] {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return [path]
    if (a.length !== b.length) return [`${path} (length ${a.length} vs ${b.length})`]
    return []
  }
  if (typeof a === 'object' && a && typeof b === 'object' && b) {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])
    return [...keys].flatMap(key =>
      shapeDiff((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], `${path}.${key}`),
    )
  }
  return typeof a === typeof b ? [] : [path]
}

describe('locales', () => {
  it('pt has the same keys and list lengths as en', () => {
    // TypeScript checks the keys; this also catches lists of different lengths.
    expect(shapeDiff(en, pt)).toEqual([])
  })
})

describe('projects', () => {
  it.each(Object.entries(locales))('has a %s caption for every image', (_, locale) => {
    for (const project of projects) {
      expect(locale.projects.items[project.id].images, project.id).toHaveLength(project.images.length)
    }
  })
})

describe('jobs', () => {
  it('have unique ids', () => {
    expect(new Set(jobs.map(job => job.id)).size).toBe(jobs.length)
  })

  it.each(Object.entries(locales))('have a %s role, place and highlights', (_, locale) => {
    for (const job of jobs) {
      const text = locale.career.jobs[job.id]
      expect(text.role, job.id).not.toBe('')
      expect(text.place, job.id).not.toBe('')
      expect(text.highlights.length, job.id).toBeGreaterThan(0)
    }
  })

  it('every act has at least one job', () => {
    for (const act of acts) {
      expect(jobs.some(job => job.act === act), act).toBe(true)
    }
  })

  it('every job is described in the locale files', () => {
    expect(Object.keys(en.career.jobs).sort()).toEqual(jobs.map(job => job.id).sort())
  })
})

describe('skills', () => {
  const skills = skillGroups.flatMap(group => group.skills)

  it('have unique names', () => {
    expect(new Set(skills.map(skill => skill.name)).size).toBe(skills.length)
  })

  it('only link to known jobs, without duplicates', () => {
    const ids = new Set<string>(jobs.map(job => job.id))
    for (const skill of skills) {
      expect(skill.jobs.filter(id => !ids.has(id)), skill.name).toEqual([])
      expect(new Set(skill.jobs).size, skill.name).toBe(skill.jobs.length)
    }
  })
})
