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
    <header
      data-open={open || undefined}
      className="group sticky top-0 z-10 flex h-(--nav-h) items-center gap-3 border-b border-panel-edge bg-bg/80 px-4 backdrop-blur-[10px] desk:gap-6 desk:px-6"
    >
      <a
        href="#top"
        aria-label={t('nav.backToTop')}
        onClick={() => setOpen(false)}
        className="mr-auto font-pixel text-[1.1rem] text-gold text-shadow-[2px_2px_0_#000] desk:mr-0"
      >
        GG
      </a>
      <nav
        id="nav-menu"
        aria-label={t('nav.sections')}
        className="absolute inset-x-0 top-(--nav-h) hidden max-h-[calc(100vh-var(--nav-h))] overflow-y-auto border-b-2 border-gold-dim bg-bg px-4 pt-2 pb-5 shadow-[0_12px_24px_#000a] group-data-open:block desk:static desk:block desk:flex-1 desk:max-h-none desk:overflow-visible desk:border-0 desk:bg-transparent desk:p-0 desk:shadow-none"
      >
        <ul className="flex flex-col desk:flex-row desk:justify-center desk:gap-1">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={() => setOpen(false)}
                className={`block border-b border-panel-edge px-2 py-3.5 text-[1.05rem] font-medium transition-colors desk:rounded-md desk:border-0 desk:px-3.5 desk:py-1.5 desk:text-base ${
                  active === id ? "bg-x-cyan/8 text-x-cyan desk:before:text-[0.7em] desk:before:content-['▶_']" : 'text-muted hover:text-text'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <SocialLinks variant="buttons" className="mt-4 desk:hidden" />
      </nav>
      <SocialLinks className="hidden desk:flex" />
      <LanguageSwitch />
      <button
        type="button"
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={t('nav.menu')}
        onClick={() => setOpen(value => !value)}
        className="grid size-10 place-items-center rounded-md border-2 border-gold-dim text-[1.1rem] text-gold desk:hidden"
      >
        {open ? <FaTimes aria-hidden /> : <FaBars aria-hidden />}
      </button>
    </header>
  )
}
