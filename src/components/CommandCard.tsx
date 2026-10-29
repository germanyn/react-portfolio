import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { skillGroups, type Skill } from '../data/skills'

/** Skills laid out as a Warcraft III–style command card with a tooltip panel. */
export default function CommandCard() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState<Skill>(skillGroups[0].skills[0])

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
            <ul className="wc3__grid">
              {group.skills.map(skill => (
                <li key={skill.name}>
                  <button
                    type="button"
                    className={`wc3__btn${hovered === skill ? ' is-active' : ''}`}
                    onMouseEnter={() => setHovered(skill)}
                    onFocus={() => setHovered(skill)}
                    onClick={() => setHovered(skill)}
                    aria-label={`${nameOf(skill)}, ${levelOf(skill)}`}
                  >
                    <span className="wc3__glyph">{skill.glyph}</span>
                    <span className="wc3__pips" aria-hidden>
                      {Array.from({ length: skill.level }, (_, i) => (
                        <i key={i} />
                      ))}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <aside className="wc3__tooltip" aria-live="polite">
        <h4>{nameOf(hovered)}</h4>
        <p className="wc3__level">{levelOf(hovered)}</p>
        {hovered.noteKey && <p>{t(`skills.notes.${hovered.noteKey}`)}</p>}
      </aside>
    </div>
  )
}
