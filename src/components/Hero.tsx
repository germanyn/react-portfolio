import { useTranslation } from 'react-i18next'
import { profile, yearsSince } from '../data/profile'
import SocialLinks from './SocialLinks'

export default function Hero() {
  const { t } = useTranslation()
  const xp = yearsSince(profile.careerStart)

  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <p className="pixel hero__kicker">{t('hero.player', { level: xp })}</p>
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__title">{t('profile.title')}</p>
        <p className="hero__tagline">
          {t('hero.yearsBuilding', { count: xp })} — {t('profile.tagline')}
        </p>
        <SocialLinks variant="buttons" />
        <a href="#projects" className="pixel hero__start">
          {t('hero.start')}
        </a>
      </div>
    </section>
  )
}
