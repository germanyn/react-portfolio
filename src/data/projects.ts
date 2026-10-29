import type en from '../locales/en'

const img = (path: string) => `${import.meta.env.BASE_URL}img/${path}`

export type Project = {
  /** Key into `projects.items` in the locale files (description, role, image captions…). */
  id: keyof typeof en.projects.items
  title: string
  technologies: string[]
  /** In the same order as the locale's `images` captions. */
  images: string[]
  link?: string
  displayAsMobile?: boolean
}

export const projects: Project[] = [
  {
    id: 'almode',
    title: 'Almode PDV',
    images: [img('almode/almode-2.png'), img('almode/almode-1.png'), img('almode/almode-3.png'), img('almode/almode-4.png')],
    technologies: ['Vue', 'TypeScript', 'Java', 'AWS', 'PostgreSQL'],
    link: 'https://www.almode.com',
  },
  {
    id: 'selfMenu',
    title: 'Self Menu',
    images: [img('self-menu/self-menu-1.png'), img('self-menu/self-menu-2.png'), img('self-menu/self-menu-3.png')],
    link: 'https://self-menu.web.app/60e3d8327ec3830a4c088911',
    displayAsMobile: true,
    technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Firebase', 'MongoDB'],
  },
  {
    id: 'mobihub',
    title: 'MobiHub',
    technologies: ['React', 'TypeScript', 'Next.js', 'MongoDB', 'AWS', 'Web crawlers'],
    images: [img('mobihub/mobihub-1.png')],
  },
]

export type ProjectImage = {
  description: string
  url: string
}
