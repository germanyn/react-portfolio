import { useTranslation } from 'react-i18next'
import { profile, yearsSince } from '../data/profile'
import MtgCard from './MtgCard'

export default function About() {
  const { t } = useTranslation()
  const { education } = profile
  const list = (key: string) => (t(key, { returnObjects: true }) as string[]).join(' · ')

  const stats = [
    [t('about.class'), t('profile.title')],
    [t('about.xp'), t('about.years', { count: yearsSince(profile.careerStart) })],
    [t('about.base'), `${t('profile.location')} 🇧🇷`],
    [
      t('about.training'),
      `${t('profile.degree')} — ${education.school}, ${t('profile.schoolPlace')} (${education.period})`,
    ],
    [t('about.languages'), list('profile.languages')],
    [t('about.sideQuests'), list('profile.hobbies')],
  ]

  return (
    <div className="grid grid-cols-1 justify-items-center gap-10 desk:grid-cols-[auto_1fr] desk:items-start desk:justify-items-stretch">
      <MtgCard />
      <div className="panel">
        <h3 className="text-2xl text-gold">{t('about.hi')}</h3>
        <p className="my-4">{t('profile.summary')}</p>
        <dl className="mt-5 grid gap-3">
          {stats.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-t border-panel-edge pt-3 desk:grid-cols-[110px_1fr] desk:gap-4">
              <dt className="pixel pt-1.5 text-[0.55rem] text-x-cyan">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
