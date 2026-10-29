import { useTranslation } from 'react-i18next'
import type { IconType } from 'react-icons'
import { GiCampfire, GiCrossedSwords, GiDragonHead, GiFootprint, GiHornedSkull, GiOpenTreasureChest } from 'react-icons/gi'
import { jobs, type NodeKind } from '../data/experience'
import { profile } from '../data/profile'

const nodeIcons: Record<NodeKind, IconType> = {
  boss: GiDragonHead,
  elite: GiHornedSkull,
  event: GiCrossedSwords,
  rest: GiCampfire,
  treasure: GiOpenTreasureChest,
  start: GiFootprint,
}

/** Career path drawn as a Slay the Spire–style map, climbing from the first job to the latest. */
export default function SpireMap() {
  const { t } = useTranslation()
  const { education } = profile

  return (
    <div className="spire">
      <ul className="spire__legend" aria-label={t('career.legend')}>
        {Object.entries(nodeIcons).map(([kind, Icon]) => (
          <li key={kind} className={`node--${kind}`}>
            <Icon aria-hidden /> {t(`career.kinds.${kind}`)}
          </li>
        ))}
      </ul>

      <ol className="spire__path">
        {jobs.map(job => {
          const Icon = nodeIcons[job.kind]
          const key = `career.jobs.${job.id}`
          return (
            <li key={job.id} className={`spire__floor node--${job.kind}`}>
              <span className="spire__node" title={t(`career.kinds.${job.kind}`)}>
                <Icon aria-hidden />
              </span>
              <div className="panel spire__card">
                <p className="spire__period">
                  {job.start} – {job.end ?? t('career.present')}
                </p>
                <h3>
                  {t(`${key}.role`)} <span className="spire__at">@ {job.company}</span>
                </h3>
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
        <li className="spire__floor node--start">
          <span className="spire__node" title={t('career.startingRelic')}>
            🎓
          </span>
          <div className="panel spire__card">
            <p className="spire__period">{education.period}</p>
            <h3>
              {t('profile.degree')} <span className="spire__at">@ {education.school}</span>
            </h3>
            <p className="spire__place">
              {t('profile.schoolPlace')} · {t('career.startingRelic')}
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}
