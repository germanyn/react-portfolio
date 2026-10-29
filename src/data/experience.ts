import type en from '../locales/en'

/** Map node kinds, Slay-the-Spire style. */
export type NodeKind = keyof typeof en.career.kinds

export type Job = {
  /** Key into `career.jobs` in the locale files (role, place, highlights). */
  id: keyof typeof en.career.jobs
  company: string
  start: string
  /** Omitted while the job is ongoing. */
  end?: string
  kind: NodeKind
  stack: string[]
}

// Most recent first.
export const jobs: Job[] = [
  {
    id: 'clinicorp',
    company: 'Clinicorp',
    start: '10/2025',
    end: '07/2026',
    kind: 'boss',
    stack: ['React', 'TypeScript', 'Node.js', 'Module Federation', 'NoSQL'],
  },
  {
    id: 'umbrage',
    company: 'Umbrage',
    start: '06/2025',
    end: '09/2025',
    kind: 'elite',
    stack: ['React', 'TypeScript', 'C#', 'ASP.NET', 'SignalR', 'SQL'],
  },
  {
    id: 'bytecom',
    company: 'Bytecom Sistemas',
    start: '03/2025',
    end: '05/2025',
    kind: 'event',
    stack: ['Vue', 'TypeScript', 'Kotlin', 'Spring Boot', 'SQL'],
  },
  {
    id: 'outsera',
    company: 'Outsera',
    start: '03/2024',
    end: '12/2024',
    kind: 'elite',
    stack: ['React', 'React Native', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'multiplier',
    company: 'Multiplier',
    start: '11/2022',
    end: '03/2024',
    kind: 'rest',
    stack: ['Vue', 'TypeScript', 'Micro Frontends', 'Storybook'],
  },
  {
    id: 'groundbreaker',
    company: 'Groundbreaker',
    start: '11/2021',
    end: '06/2022',
    kind: 'elite',
    stack: ['React', 'Node.js', 'TypeScript', 'Terraform', 'webpack', 'AWS'],
  },
  {
    id: 'almode',
    company: 'Almode',
    start: '08/2020',
    end: '07/2021',
    kind: 'boss',
    stack: ['Vue', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'somar',
    company: 'Somar Vale do Itapocu',
    start: '08/2019',
    kind: 'treasure',
    stack: ['Vue', 'TypeScript', 'MongoDB', 'Firebase'],
  },
  {
    id: 'adapcon',
    company: 'Adapcon Sistemas',
    start: '04/2017',
    end: '03/2020',
    kind: 'start',
    stack: ['Vue', 'Node.js', 'PostgreSQL', 'AWS', 'Caché ObjectScript'],
  },
]
