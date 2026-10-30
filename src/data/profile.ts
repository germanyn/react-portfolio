// Translatable copy (title, summary, location…) lives in src/locales under `profile`.
export const profile = {
  name: 'Germano Gascho',
  careerStart: '2017-04-01',
  links: {
    github: 'https://github.com/germanyn',
    email: 'mailto:germanogascho@gmail.com',
    linkedin: 'https://www.linkedin.com/in/germano-gascho-72ba98136/',
  },
  avatarUrl: 'https://avatars.githubusercontent.com/u/35080245?s=400&v=4',
  education: {
    school: 'Univali',
    period: '2012 – 2016',
  },
}

export function yearsSince(isoDate: string) {
  // Build a local date: `new Date('YYYY-MM-DD')` is UTC midnight, i.e. the previous day west of UTC.
  const [year, month, day] = isoDate.split('-').map(Number)
  const start = new Date(year, month - 1, day)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  if (now < new Date(now.getFullYear(), start.getMonth(), start.getDate())) years--
  return years
}
