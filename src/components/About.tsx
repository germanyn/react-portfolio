import { useTranslation } from 'react-i18next'
import { profile, yearsSince } from '../data/profile'
import MtgCard from './MtgCard'

export default function About() {
  const { t } = useTranslation()
  const { education } = profile
  const list = (key: string) => (t(key, { returnObjects: true }) as string[]).join(' · ')

  return (
    <div className="about">
      <MtgCard />
      <div className="panel about__info">
        <h3 className="about__hi">{t('about.hi')}</h3>
        <p>{t('profile.summary')}</p>
        <dl className="stats">
          <div>
            <dt>{t('about.class')}</dt>
            <dd>{t('profile.title')}</dd>
          </div>
          <div>
            <dt>{t('about.xp')}</dt>
            <dd>{t('about.years', { count: yearsSince(profile.careerStart) })}</dd>
          </div>
          <div>
            <dt>{t('about.base')}</dt>
            <dd>{t('profile.location')} 🇧🇷</dd>
          </div>
          <div>
            <dt>{t('about.training')}</dt>
            <dd>
              {t('profile.degree')} — {education.school}, {t('profile.schoolPlace')} ({education.period})
            </dd>
          </div>
          <div>
            <dt>{t('about.languages')}</dt>
            <dd>{list('profile.languages')}</dd>
          </div>
          <div>
            <dt>{t('about.sideQuests')}</dt>
            <dd>{list('profile.hobbies')}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
