import type { IconType } from 'react-icons'
import { FaAws, FaJava } from 'react-icons/fa'
import { GiCompass, GiConversation, GiCrown, GiCycle, GiMagnifyingGlass, GiPuzzle, GiWorld } from 'react-icons/gi'
import {
  SiDocker,
  SiDotnet,
  SiFirebase,
  SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiStorybook,
  SiTypeorm,
  SiTypescript,
  SiVitest,
  SiVuedotjs,
  SiWebpack,
} from 'react-icons/si'
import { TbApi, TbHierarchy3 } from 'react-icons/tb'
import type en from '../locales/en'
import type { Job } from './experience'

type SkillNoteKey = keyof typeof en.skills.notes
type SkillNameKey = keyof typeof en.skills.names
type JobId = Job['id']

export type Skill = {
  /** Tech names stay as-is; set `nameKey` for ones that need translating. */
  name: string
  nameKey?: SkillNameKey
  icon: IconType
  /** Icon color on the command-card button (brand color where there is one). */
  color: string
  /** 1–3, drawn as level pips. */
  level: 1 | 2 | 3
  noteKey?: SkillNoteKey
  /** Jobs where the skill was used; each links to that job on the career map. */
  jobs: JobId[]
}

export type SkillGroup = {
  id: keyof typeof en.skills.groups
  skills: Skill[]
}

const everywhere: JobId[] = [
  'adapcon',
  'almode',
  'groundbreaker',
  'multiplier',
  'outsera',
  'bytecom',
  'umbrage',
  'clinicorp',
  'somar',
]

const gold = '#e8c36a'

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61dafb', level: 3, noteKey: 'react', jobs: ['groundbreaker', 'outsera', 'umbrage', 'clinicorp'] },
      {
        name: 'TypeScript',
        icon: SiTypescript,
        color: '#3178c6',
        level: 3,
        jobs: ['almode', 'groundbreaker', 'multiplier', 'outsera', 'bytecom', 'umbrage', 'clinicorp', 'somar'],
      },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 3, jobs: everywhere },
      { name: 'Vue', icon: SiVuedotjs, color: '#42b883', level: 3, jobs: ['adapcon', 'almode', 'multiplier', 'bytecom', 'somar'] },
      { name: 'Micro Frontends', icon: SiWebpack, color: '#8dd6f9', level: 3, noteKey: 'microFrontends', jobs: ['multiplier', 'clinicorp'] },
      { name: 'HTML & CSS', icon: SiHtml5, color: '#e34f26', level: 3, jobs: everywhere },
      { name: 'Storybook', icon: SiStorybook, color: '#ff4785', level: 2, jobs: ['multiplier'] },
      { name: 'Testing', nameKey: 'testing', icon: SiVitest, color: '#fcc72b', level: 2, noteKey: 'testing', jobs: ['multiplier', 'bytecom'] },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5fa04e', level: 3, jobs: ['adapcon', 'almode', 'groundbreaker', 'outsera', 'clinicorp'] },
      {
        name: 'REST APIs',
        icon: TbApi,
        color: '#c9d4e8',
        level: 3,
        jobs: ['almode', 'groundbreaker', 'outsera', 'bytecom', 'umbrage', 'clinicorp', 'somar'],
      },
      { name: 'GraphQL', icon: SiGraphql, color: '#e10098', level: 2, jobs: ['multiplier'] },
      { name: 'Microservices', nameKey: 'microservices', icon: TbHierarchy3, color: '#c9d4e8', level: 2, jobs: ['groundbreaker', 'outsera'] },
      { name: 'Java · Spring Boot', icon: FaJava, color: '#f89820', level: 2, jobs: ['almode', 'bytecom'] },
      { name: 'Kotlin', icon: SiKotlin, color: '#a97bff', level: 1, jobs: ['bytecom'] },
      { name: 'C# · ASP.NET', icon: SiDotnet, color: '#a179dc', level: 1, noteKey: 'csharp', jobs: ['umbrage'] },
      { name: 'PHP', icon: SiPhp, color: '#8892bf', level: 1, jobs: ['multiplier'] },
    ],
  },
  {
    id: 'data',
    skills: [
      { name: 'PostgreSQL · SQL', icon: SiPostgresql, color: '#6b9bd1', level: 3, jobs: ['adapcon', 'almode', 'outsera', 'bytecom', 'umbrage'] },
      { name: 'MongoDB · Mongoose', icon: SiMongodb, color: '#47a248', level: 3, jobs: ['somar'] },
      { name: 'AWS', icon: FaAws, color: '#ff9900', level: 2, noteKey: 'aws', jobs: ['adapcon', 'almode', 'groundbreaker', 'outsera'] },
      { name: 'Firebase', icon: SiFirebase, color: '#ffca28', level: 2, jobs: ['somar'] },
      { name: 'TypeORM', icon: SiTypeorm, color: '#fe0803', level: 2, jobs: ['almode'] },
      { name: 'Docker', icon: SiDocker, color: '#2496ed', level: 2, jobs: ['almode', 'multiplier', 'clinicorp'] },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326ce5', level: 1, jobs: [] },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088ff', level: 2, jobs: ['almode', 'multiplier', 'outsera', 'clinicorp'] },
    ],
  },
  {
    id: 'soft',
    skills: [
      { name: 'Team Leadership', nameKey: 'leadership', icon: GiCrown, color: gold, level: 3, noteKey: 'leadership', jobs: ['almode', 'multiplier'] },
      { name: 'Scrum & Kanban', nameKey: 'agile', icon: GiCycle, color: gold, level: 3, noteKey: 'agile', jobs: ['multiplier', 'bytecom'] },
      { name: 'Project Management', nameKey: 'projectManagement', icon: GiCompass, color: gold, level: 2, jobs: ['almode', 'somar'] },
      { name: 'Business Analysis', nameKey: 'businessAnalysis', icon: GiMagnifyingGlass, color: gold, level: 2, jobs: ['almode', 'somar'] },
      { name: 'Problem Solving', nameKey: 'problemSolving', icon: GiPuzzle, color: gold, level: 3, jobs: ['adapcon', 'almode', 'groundbreaker'] },
      { name: 'Assertive Communication', nameKey: 'communication', icon: GiConversation, color: gold, level: 3, jobs: ['almode', 'bytecom'] },
      { name: 'English (C2)', nameKey: 'english', icon: GiWorld, color: gold, level: 3, jobs: ['groundbreaker', 'umbrage'] },
      { name: 'Jira · Trello', icon: SiJira, color: '#2684ff', level: 2, jobs: ['almode', 'multiplier', 'bytecom'] },
    ],
  },
]
