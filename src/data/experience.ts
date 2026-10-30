import type en from '../locales/en'

export type ActId = keyof typeof en.career.acts

/** Drives the map node: role → enemy, senior → elite, lead → boss, freelance → treasure. */
export type Level = 'role' | 'senior' | 'lead' | 'freelance'

export type Job = {
  /** Key into `career.jobs` in the locale files (role, place, highlights). */
  id: keyof typeof en.career.jobs
  company: string
  start: string
  /** Omitted while the job is ongoing. */
  end?: string
  level: Level
  act: ActId
  stack: string[]
}

// Top to bottom on the map, oldest first. Somar is ongoing freelance work, so it goes last.
export const jobs: Job[] = [
  {
    id: 'adapcon',
    company: 'Adapcon Sistemas',
    start: '04/2017',
    end: '03/2020',
    level: 'role',
    act: 'start',
    stack: ['Vue', 'Node.js', 'PostgreSQL', 'AWS', 'Caché ObjectScript'],
  },
  {
    id: 'almode',
    company: 'Almode',
    start: '08/2020',
    end: '07/2021',
    level: 'lead',
    act: 'start',
    stack: ['Vue', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'groundbreaker',
    company: 'Groundbreaker',
    start: '11/2021',
    end: '06/2022',
    level: 'senior',
    act: 'senior',
    stack: ['React', 'Node.js', 'TypeScript', 'Terraform', 'webpack', 'AWS'],
  },
  {
    id: 'multiplier',
    company: 'Multiplier',
    start: '11/2022',
    end: '03/2024',
    level: 'lead',
    act: 'senior',
    stack: ['Vue', 'TypeScript', 'Micro Frontends', 'Storybook'],
  },
  {
    id: 'outsera',
    company: 'Outsera',
    start: '03/2024',
    end: '12/2024',
    level: 'senior',
    act: 'senior',
    stack: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'bytecom',
    company: 'Bytecom Sistemas',
    start: '03/2025',
    end: '05/2025',
    level: 'role',
    act: 'architect',
    stack: ['Vue', 'TypeScript', 'Kotlin', 'Spring Boot', 'SQL'],
  },
  {
    id: 'umbrage',
    company: 'Umbrage',
    start: '06/2025',
    end: '09/2025',
    level: 'role',
    act: 'architect',
    stack: ['React', 'TypeScript', 'C#', 'ASP.NET', 'SignalR', 'SQL'],
  },
  {
    id: 'clinicorp',
    company: 'Clinicorp',
    start: '10/2025',
    end: '07/2026',
    level: 'senior',
    act: 'architect',
    stack: ['React', 'TypeScript', 'Node.js', 'Module Federation', 'NoSQL'],
  },
  {
    id: 'somar',
    company: 'Somar Vale do Itapocu',
    start: '08/2019',
    level: 'freelance',
    act: 'architect',
    stack: ['Vue', 'TypeScript', 'MongoDB', 'Firebase'],
  },
]

/** Chronological; the map shows one act at a time as tabs. */
export const acts: ActId[] = ['start', 'senior', 'architect']
