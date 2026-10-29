import type en from '../locales/en'

type SkillNoteKey = keyof typeof en.skills.notes
type SkillNameKey = keyof typeof en.skills.names

export type Skill = {
  /** Tech names stay as-is; set `nameKey` for ones that need translating. */
  name: string
  nameKey?: SkillNameKey
  /** Short label drawn on the command-card button. */
  glyph: string
  /** 1–3, drawn as level pips. */
  level: 1 | 2 | 3
  noteKey?: SkillNoteKey
}

export type SkillGroup = {
  id: keyof typeof en.skills.groups
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    skills: [
      { name: 'React', glyph: 'Re', level: 3, noteKey: 'react' },
      { name: 'TypeScript', glyph: 'TS', level: 3 },
      { name: 'JavaScript', glyph: 'JS', level: 3 },
      { name: 'Vue', glyph: 'Vu', level: 3 },
      { name: 'Micro Frontends', glyph: 'MF', level: 3, noteKey: 'microFrontends' },
      { name: 'HTML & CSS', glyph: '</>', level: 3 },
      { name: 'Storybook', glyph: 'SB', level: 2 },
      { name: 'Testing', nameKey: 'testing', glyph: '✓', level: 2, noteKey: 'testing' },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', glyph: 'No', level: 3 },
      { name: 'REST APIs', glyph: 'API', level: 3 },
      { name: 'GraphQL', glyph: 'GQ', level: 2 },
      { name: 'Microservices', glyph: 'μS', level: 2 },
      { name: 'Java · Spring Boot', glyph: 'Jv', level: 2 },
      { name: 'Kotlin', glyph: 'Kt', level: 1 },
      { name: 'C# · ASP.NET', glyph: 'C#', level: 1, noteKey: 'csharp' },
      { name: 'PHP', glyph: 'PHP', level: 1 },
    ],
  },
  {
    id: 'data',
    skills: [
      { name: 'PostgreSQL · SQL', glyph: 'PG', level: 3 },
      { name: 'MongoDB · Mongoose', glyph: 'Mo', level: 3 },
      { name: 'AWS', glyph: 'AWS', level: 2, noteKey: 'aws' },
      { name: 'Firebase', glyph: 'Fb', level: 2 },
      { name: 'TypeORM', glyph: 'ORM', level: 2 },
      { name: 'Docker', glyph: 'Dk', level: 2 },
      { name: 'Kubernetes', glyph: 'K8s', level: 1 },
      { name: 'GitHub Actions', glyph: 'CI', level: 2 },
    ],
  },
  {
    id: 'leadership',
    skills: [
      { name: 'Team Leadership', nameKey: 'leadership', glyph: '♛', level: 3, noteKey: 'leadership' },
      { name: 'Scrum & Kanban', nameKey: 'agile', glyph: 'Ag', level: 3, noteKey: 'agile' },
      { name: 'Project Management', nameKey: 'projectManagement', glyph: 'PM', level: 2 },
      { name: 'Business Analysis', nameKey: 'businessAnalysis', glyph: 'BA', level: 2 },
      { name: 'Problem Solving', nameKey: 'problemSolving', glyph: '⚙', level: 3 },
      { name: 'Assertive Communication', nameKey: 'communication', glyph: '✉', level: 3 },
      { name: 'English (C2)', nameKey: 'english', glyph: 'EN', level: 3 },
      { name: 'Jira · Trello', glyph: 'Jr', level: 2 },
    ],
  },
]
