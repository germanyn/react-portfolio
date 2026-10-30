import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import About from './components/About'
import CommandCard from './components/CommandCard'
import Contact from './components/Contact'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import SpireMap from './components/SpireMap'
import StageSelect from './components/StageSelect'
import { profile } from './data/profile'

// Ids double as keys into `nav.*` and `sections.*` in the locale files.
const sections = [
  { id: 'projects', content: <StageSelect /> },
  { id: 'about', content: <About /> },
  { id: 'career', content: <SpireMap /> },
  { id: 'skills', content: <CommandCard /> },
  { id: 'contact', content: <Contact /> },
] as const satisfies { id: string; content: ReactNode }[]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(entry => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

const sectionIds = sections.map(({ id }) => id)

export default function App() {
  const { t } = useTranslation()
  const active = useActiveSection(sectionIds)

  return (
    <>
      <NavBar sections={sections.map(({ id }) => ({ id, label: t(`nav.${id}`) }))} active={active} />
      <main>
        <Hero />
        {sections.map(({ id, content }) => (
          <section key={id} id={id} className="mx-auto max-w-[1100px] px-4 pt-16 pb-8 desk:px-6 desk:pt-20 desk:pb-12">
            <header className="mb-10 text-center">
              <p className="pixel mb-3 text-[0.65rem] text-x-cyan">{t(`sections.${id}.kicker`)}</p>
              <h2 className="text-[clamp(2rem,5vw,2.75rem)] text-gold">{t(`sections.${id}.title`)}</h2>
            </header>
            {content}
          </section>
        ))}
      </main>
      <footer className="px-6 py-12 text-center text-[0.85rem] text-muted">
        <p className="my-4">
          © {new Date().getFullYear()} {profile.name} · {t('footer.builtWith')}
        </p>
      </footer>
    </>
  )
}
