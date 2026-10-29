import { useTranslation } from 'react-i18next'
import LanguageSwitch from './LanguageSwitch'
import SocialLinks from './SocialLinks'

export type NavSection = {
  id: string
  label: string
}

type Props = {
  sections: NavSection[]
  active: string | null
}

export default function NavBar({ sections, active }: Props) {
  const { t } = useTranslation()

  return (
    <header className="nav">
      <a href="#top" className="nav__logo" aria-label={t('nav.backToTop')}>
        GG
      </a>
      <nav aria-label={t('nav.sections')}>
        <ul className="nav__links">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <SocialLinks />
      <LanguageSwitch />
    </header>
  )
}
