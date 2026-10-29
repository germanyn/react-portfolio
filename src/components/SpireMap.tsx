import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { GiCampfire, GiCrossedSwords, GiDragonHead, GiHornedSkull, GiOpenTreasureChest } from 'react-icons/gi'
import { acts, jobs, type ActId, type Job, type Level } from '../data/experience'
import { profile } from '../data/profile'
import { onShowJob } from '../showJob'

type NodeKind = 'enemy' | 'elite' | 'boss' | 'treasure' | 'rest'

const kindByLevel: Record<Level, NodeKind> = {
  role: 'enemy',
  senior: 'elite',
  lead: 'boss',
  freelance: 'treasure',
}

const isJobId = (id: string): id is Job['id'] => jobs.some(job => job.id === id)

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
  let floor = 0 // alternates cards left/right
  const side = () => (floor++ % 2 ? ' is-right' : '')

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
    <div className="spire" ref={mapRef}>
      <div className="spire__tabs" role="tablist" aria-label={t('career.actsLabel')} onKeyDown={onTabKeyDown}>
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
            className="spire__tab"
            onClick={() => selectAct(act)}
          >
            <span>{t(`career.acts.${act}.number`)}</span> {t(`career.acts.${act}.name`)}
          </button>
        ))}
      </div>

      {/* Single panel, keyed by act so it remounts on tab change */}
      {[activeAct].map(act => (
        <section
          key={act}
          className="spire__act"
          role="tabpanel"
          id={`act-panel-${act}`}
          aria-labelledby={`act-tab-${act}`}
          tabIndex={0}
        >
          <ol className="spire__path">
            {act === 'start' && (
              <li className={`spire__floor node--rest${side()}`}>
                <span className="spire__node" title={t('career.kinds.rest.name')}>
                  <GiCampfire aria-hidden />
                </span>
                <div className="panel spire__card">
                  <p className="spire__period">{education.period}</p>
                  <h4>
                    {t('profile.degree')} <span className="spire__at">@ {education.school}</span>
                  </h4>
                  <p className="spire__place">{t('profile.schoolPlace')}</p>
                </div>
              </li>
            )}
            {jobs
              .filter(job => job.act === act)
              .map(job => {
                const kind = kindByLevel[job.level]
                const Icon = nodeIcons[kind]
                const key = `career.jobs.${job.id}`
                return (
                  <li
                    key={job.id}
                    id={`job-${job.id}`}
                    className={`spire__floor node--${kind}${side()}${highlighted === job.id ? ' is-highlighted' : ''}`}
                  >
                    <span className="spire__node" title={t(`career.kinds.${kind}.name`)}>
                      <Icon aria-hidden />
                    </span>
                    <div className="panel spire__card">
                      <p className="spire__period">
                        {job.start} – {job.end ?? t('career.present')}
                      </p>
                      <h4>
                        {t(`${key}.role`)} <span className="spire__at">@ {job.company}</span>
                      </h4>
                      <p className="spire__place">{t(`${key}.place`)}</p>
                      <ul className="spire__highlights">
                        {(t(`${key}.highlights`, { returnObjects: true }) as string[]).map(highlight => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                      <ul className="tags">
                        {job.stack.map(tech => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              })}
          </ol>
        </section>
      ))}

      <ul className="spire__legend" aria-label={t('career.legend')}>
        {Object.entries(nodeIcons).map(([kind, Icon]) => (
          <li key={kind} className={`node--${kind}`}>
            <Icon aria-hidden /> {t(`career.kinds.${kind}.meaning`)}
          </li>
        ))}
      </ul>
    </div>
  )
}
