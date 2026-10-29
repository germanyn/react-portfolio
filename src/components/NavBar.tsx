import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaBars, FaTimes } from 'react-icons/fa'
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

/** Inline links on desktop; on narrow screens they move into a dropdown opened by the menu button. */
export default function NavBar({ sections, active }: Props) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`nav${open ? ' is-open' : ''}`}>
      <a href="#top" className="nav__logo" aria-label={t('nav.backToTop')} onClick={() => setOpen(false)}>
        GG
      </a>
      <nav id="nav-menu" className="nav__menu" aria-label={t('nav.sections')}>
        <ul className="nav__links">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : undefined} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav__menu-social">
          <SocialLinks variant="buttons" />
        </div>
      </nav>
      <div className="nav__social">
        <SocialLinks />
      </div>
      <LanguageSwitch />
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={t('nav.menu')}
        onClick={() => setOpen(value => !value)}
      >
        {open ? <FaTimes aria-hidden /> : <FaBars aria-hidden />}
      </button>
    </header>
  )
}
