import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { jobs } from '../data/experience'
import { skillGroups, type Skill } from '../data/skills'
import { jobHash, showJob } from '../showJob'

const companyOf = (id: Skill['jobs'][number]) => jobs.find(job => job.id === id)!.company

/** Skills laid out as a Warcraft III–style command card with a tooltip panel. */
export default function CommandCard() {
  const { t } = useTranslation()
  // Hover previews a skill; click pins it so the panel's links can be reached.
  const [pinned, setPinned] = useState<Skill>(skillGroups[0].skills[0])
  const [preview, setPreview] = useState<Skill | null>(null)
  const shown = preview ?? pinned

  const nameOf = (skill: Skill) => (skill.nameKey ? t(`skills.names.${skill.nameKey}`) : skill.name)
  const levelOf = (skill: Skill) =>
    t('skills.level', {
      level: skill.level,
      name: (t('skills.levels', { returnObjects: true }) as string[])[skill.level - 1],
    })

  return (
    <div className="wc3">
      <div className="wc3__groups">
        {skillGroups.map(group => (
          <section key={group.id} className="wc3__group" aria-label={t(`skills.groups.${group.id}`)}>
            <h3 className="wc3__group-title">{t(`skills.groups.${group.id}`)}</h3>
            <ul className="wc3__grid" onMouseLeave={() => setPreview(null)}>
              {group.skills.map(skill => {
                const Icon = skill.icon
                return (
                  <li key={skill.name}>
                    <button
                      type="button"
                      className={`wc3__btn${pinned === skill ? ' is-active' : ''}`}
                      onMouseEnter={() => setPreview(skill)}
                      onFocus={() => setPinned(skill)}
                      onClick={() => setPinned(skill)}
                      aria-pressed={pinned === skill}
                      aria-label={`${nameOf(skill)}, ${levelOf(skill)}`}
                    >
                      <span className="wc3__icon" aria-hidden>
                        <Icon style={{ color: skill.color }} />
                        <span className="wc3__pips">
                          {Array.from({ length: skill.level }, (_, i) => (
                            <i key={i} />
                          ))}
                        </span>
                      </span>
                      <span className="wc3__name" aria-hidden>
                        {nameOf(skill)}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
      <aside className="wc3__tooltip" aria-live="polite">
        <h4>{nameOf(shown)}</h4>
        <p className="wc3__level">{levelOf(shown)}</p>
        {shown.noteKey && <p>{t(`skills.notes.${shown.noteKey}`)}</p>}
        <p className="wc3__used">{t('skills.usedAt')}</p>
        {shown.jobs.length > 0 ? (
          <ul className="wc3__jobs">
            {shown.jobs.map(id => (
              <li key={id}>
                <a
                  href={jobHash(id)}
                  onClick={event => {
                    event.preventDefault()
                    showJob(id)
                  }}
                >
                  {companyOf(id)}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="wc3__none">{t('skills.noJobs')}</p>
        )}
        <p className="wc3__hint">{t('skills.hint')}</p>
      </aside>
    </div>
  )
}
