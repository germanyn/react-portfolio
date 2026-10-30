import { useTranslation } from 'react-i18next'
import { profile, yearsSince } from '../data/profile'
import SocialLinks from './SocialLinks'

export default function Hero() {
  const { t } = useTranslation()
  const xp = yearsSince(profile.careerStart)

  return (
    <section
      id="top"
      className="hero-bg relative grid min-h-[min(calc(100vh-var(--nav-h)),820px)] place-items-center overflow-hidden px-6 py-12 text-center"
    >
      <div className="pixel-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-1 max-w-[760px]">
        <p className="pixel mb-6 text-xs text-x-cyan">{t('hero.player', { level: xp })}</p>
        <h1 className="gold-text text-[clamp(2rem,8vw,4.75rem)] font-extrabold drop-shadow-[0_3px_0_#000]">
          {profile.name}
        </h1>
        <p className="mt-2 mb-3 font-title text-[clamp(1.1rem,3vw,1.6rem)]">{t('profile.title')}</p>
        <p className="mb-8 text-muted">
          {t('hero.yearsBuilding', { count: xp })} — {t('profile.tagline')}
        </p>
        <SocialLinks variant="buttons" />
        <a href="#projects" className="pixel mt-12 inline-block animate-blink text-[0.8rem] text-text">
          {t('hero.start')}
        </a>
      </div>
    </section>
  )
}
