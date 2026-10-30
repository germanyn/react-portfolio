import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { GiCampfire, GiCrossedSwords, GiDragonHead, GiHornedSkull, GiOpenTreasureChest } from 'react-icons/gi'
import { acts, jobs, type ActId, type Job, type Level } from '../data/experience'
import { profile } from '../data/profile'
import { onShowJob } from '../showJob'
import Tags from './Tags'

type NodeKind = 'enemy' | 'elite' | 'boss' | 'treasure' | 'rest'

const kindByLevel: Record<Level, NodeKind> = {
  role: 'enemy',
  senior: 'elite',
  lead: 'boss',
  freelance: 'treasure',
}

const isJobId = (id: string): id is Job['id'] => jobs.some(job => job.id === id)

/** Node circle and legend icon colors per kind. */
const nodeStyles: Record<NodeKind, { node: string; icon: string }> = {
  enemy: { node: 'size-13 text-[1.7rem] bg-parch-light border-ink-soft text-ink', icon: '' },
  elite: { node: 'size-13 text-[1.7rem] bg-parch-light border-ink-soft text-node-elite', icon: 'text-node-elite' },
  boss: {
    node: 'size-13 text-[1.7rem] desk:size-16 desk:text-[2.2rem] bg-ink border-spire-red text-spire-red',
    icon: '',
  },
  treasure: { node: 'size-13 text-[1.7rem] bg-parch-light border-ink-soft text-node-treasure', icon: 'text-node-treasure' },
  rest: { node: 'size-13 text-[1.7rem] bg-parch-light border-ink-soft text-node-rest', icon: 'text-node-rest' },
}

const nodeIcons: Record<NodeKind, IconType> = {
  enemy: GiCrossedSwords,
  elite: GiHornedSkull,
  boss: GiDragonHead,
  treasure: GiOpenTreasureChest,
  rest: GiCampfire,
}

/** Career drawn as a Slay the Spire–style map, one act per tab, read top to bottom from studies to the latest job. */
export default function SpireMap() {
  const { t } = useTranslation()
  const { education } = profile
  const [activeAct, setActiveAct] = useState<ActId>(acts[0])
  const tabRefs = useRef<Partial<Record<ActId, HTMLButtonElement | null>>>({})
  const mapRef = useRef<HTMLDivElement>(null)
  // `count` makes repeat requests for the same job re-trigger the scroll/highlight.
  const [focusRequest, setFocusRequest] = useState<{ id: Job['id']; count: number } | null>(null)
  const [highlighted, setHighlighted] = useState<Job['id'] | null>(null)

  // Links from the skills panel (or a #job-… URL) open the job's act, then scroll to it.
  useEffect(
    () =>
      onShowJob(isJobId, id => {
        setActiveAct(jobs.find(job => job.id === id)!.act)
        setFocusRequest(previous => ({ id, count: (previous?.count ?? 0) + 1 }))
      }),
    [],
  )

  useEffect(() => {
    if (!focusRequest) return
    document.getElementById(`job-${focusRequest.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setHighlighted(focusRequest.id)
    const timer = setTimeout(() => setHighlighted(null), 2400)
    return () => clearTimeout(timer)
  }, [focusRequest])
  let floor = 0 // alternates cards left/right on desktop
  const nextIsRight = () => floor++ % 2 === 1

  // The tabs are sticky: if the map is scrolled past its top, bring the new act's start into view.
  const selectAct = (act: ActId) => {
    setActiveAct(act)
    const map = mapRef.current
    const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))
    if (map && map.getBoundingClientRect().top < navHeight) map.scrollIntoView({ behavior: 'smooth' })
  }

  // Arrow keys / Home / End move between tabs (WAI-ARIA tabs pattern).
  const onTabKeyDown = (event: KeyboardEvent) => {
    const index = acts.indexOf(activeAct)
    const next = {
      ArrowRight: acts[(index + 1) % acts.length],
      ArrowLeft: acts[(index - 1 + acts.length) % acts.length],
      Home: acts[0],
      End: acts[acts.length - 1],
    }[event.key]
    if (!next) return
    event.preventDefault()
    selectAct(next)
    tabRefs.current[next]?.focus()
  }

  return (
    // overflow-clip (not hidden) keeps the rounded corners without breaking the sticky tabs and legend
    <div className="parchment relative overflow-clip rounded-[10px] text-ink" ref={mapRef}>
      <div
        role="tablist"
        aria-label={t('career.actsLabel')}
        onKeyDown={onTabKeyDown}
        className="sticky top-(--nav-h) z-2 mb-8 grid grid-cols-3 border-b-2 border-gold-dim shadow-[0_6px_14px_#6b4e2a55]"
      >
        {acts.map(act => (
          <button
            key={act}
            ref={element => {
              tabRefs.current[act] = element
            }}
            type="button"
            role="tab"
            id={`act-tab-${act}`}
            aria-controls={`act-panel-${act}`}
            aria-selected={act === activeAct}
            tabIndex={act === activeAct ? 0 : -1}
            onClick={() => selectAct(act)}
            className="group border-r-2 border-gold-dim bg-parch-dark px-2 py-2.5 font-title font-semibold text-ink-soft transition-colors last:border-r-0 hover:bg-parch aria-selected:bg-ink aria-selected:text-parch-light"
          >
            <span className="mb-1 block font-pixel text-[0.5rem] group-aria-selected:text-gold">
              {t(`career.acts.${act}.number`)}
            </span>{' '}
            {t(`career.acts.${act}.name`)}
          </button>
        ))}
      </div>

      {/* Single panel, keyed by act so it remounts on tab change */}
      {[activeAct].map(act => (
        <section
          key={act}
          className="focus-visible:-outline-offset-4"
          role="tabpanel"
          id={`act-panel-${act}`}
          aria-labelledby={`act-tab-${act}`}
          tabIndex={0}
        >
          {/* Dashed path: through the middle on desktop, down the left on phones */}
          <ol className="relative px-4 before:absolute before:inset-y-0 before:left-6.5 before:border-l-3 before:border-dashed before:border-ink-soft before:content-[''] desk:px-6 desk:before:left-1/2 desk:before:-translate-x-1/2">
            {act === 'start' && (
              <Floor kind="rest" right={nextIsRight()} title={t('career.kinds.rest.name')}>
                <p className={period}>{education.period}</p>
                <h4 className="text-[1.1rem]">
                  {t('profile.degree')} <span className="text-gold">@ {education.school}</span>
                </h4>
                <p className={place}>{t('profile.schoolPlace')}</p>
              </Floor>
            )}
            {jobs
              .filter(job => job.act === act)
              .map(job => {
                const kind = kindByLevel[job.level]
                const key = `career.jobs.${job.id}`
                return (
                  <Floor
                    key={job.id}
                    id={`job-${job.id}`}
                    kind={kind}
                    right={nextIsRight()}
                    highlighted={highlighted === job.id}
                    title={t(`career.kinds.${kind}.name`)}
                  >
                    <p className={period}>
                      {job.start} – {job.end ?? t('career.present')}
                    </p>
                    <h4 className="text-[1.1rem]">
                      {t(`${key}.role`)} <span className="text-gold">@ {job.company}</span>
                    </h4>
                    <p className={place}>{t(`${key}.place`)}</p>
                    <ul className="mt-2.5 list-[circle] pl-[1.1rem] text-[0.9rem]">
                      {(t(`${key}.highlights`, { returnObjects: true }) as string[]).map(highlight => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <Tags items={job.stack} />
                  </Floor>
                )
              })}
          </ol>
        </section>
      ))}

      {/* Sticks to the bottom of the viewport while the map scrolls */}
      <ul
        aria-label={t('career.legend')}
        className="sticky bottom-0 z-2 mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t-2 border-gold-dim bg-parch-dark px-4 py-3 font-title text-[0.85rem] font-semibold shadow-[0_-6px_14px_#6b4e2a55]"
      >
        {(Object.entries(nodeIcons) as [NodeKind, IconType][]).map(([kind, Icon]) => (
          <li key={kind} className="inline-flex items-center gap-1.5">
            <Icon aria-hidden className={nodeStyles[kind].icon} /> {t(`career.kinds.${kind}.meaning`)}
          </li>
        ))}
      </ul>
    </div>
  )
}

const period = 'mb-2 font-pixel text-[0.55rem] text-x-cyan'
const place = 'mt-[0.2rem] text-[0.85rem] text-muted'

type FloorProps = {
  kind: NodeKind
  /** Card on the right of the path (desktop only; phones always put it on the right). */
  right: boolean
  title: string
  id?: string
  highlighted?: boolean
  children: ReactNode
}

/** One map row: the node on the path and its card beside it. */
function Floor({ kind, right, title, id, highlighted = false, children }: FloorProps) {
  const Icon = nodeIcons[kind]

  return (
    <li
      id={id}
      data-kind={kind}
      data-highlighted={highlighted || undefined}
      className="group relative mb-6 grid grid-cols-[52px_1fr] items-start gap-3 desk:grid-cols-[1fr_64px_1fr] desk:items-center desk:gap-0"
    >
      <span
        title={title}
        className={`relative z-1 col-start-1 row-start-1 grid place-items-center justify-self-center rounded-full border-3 group-data-highlighted:animate-node-pulse desk:col-start-2 ${nodeStyles[kind].node}`}
      >
        <Icon aria-hidden />
      </span>
      <div
        className={`panel col-start-2 row-start-1 text-left text-text group-data-highlighted:animate-highlight ${
          right ? 'desk:col-start-3' : 'desk:col-start-1'
        }`}
      >
        {children}
      </div>
    </li>
  )
}
