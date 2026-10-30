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
    <div className="grid items-start gap-6 desk:grid-cols-[1fr_280px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        {skillGroups.map(group => (
          <section key={group.id} className="wc3-stone p-3.5" aria-label={t(`skills.groups.${group.id}`)}>
            <h3 className="mb-3 text-[0.95rem] text-gold text-shadow-[1px_1px_0_#000]">{t(`skills.groups.${group.id}`)}</h3>
            <ul className="grid grid-cols-4 gap-x-1.5 gap-y-3" onMouseLeave={() => setPreview(null)}>
              {group.skills.map(skill => {
                const Icon = skill.icon
                return (
                  <li key={skill.name}>
                    <button
                      type="button"
                      className="group flex w-full flex-col items-center gap-1 text-[#d8d8d8] focus-visible:outline-none"
                      onMouseEnter={() => setPreview(skill)}
                      onFocus={() => setPinned(skill)}
                      onClick={() => setPinned(skill)}
                      aria-pressed={pinned === skill}
                      aria-label={`${nameOf(skill)}, ${levelOf(skill)}`}
                    >
                      <span
                        aria-hidden
                        className="wc3-slot relative grid aspect-square w-full place-items-center text-[2.1rem] transition group-hover:wc3-slot-active group-focus-visible:wc3-slot-active group-active:scale-95 group-aria-pressed:wc3-slot-active"
                      >
                        <Icon style={{ color: skill.color }} className="drop-shadow-[1px_1px_0_#000]" />
                        <span className="absolute inset-x-0 bottom-0.75 flex justify-center gap-0.5">
                          {Array.from({ length: skill.level }, (_, i) => (
                            <i key={i} className="size-1.25 border border-black bg-gold" />
                          ))}
                        </span>
                      </span>
                      <span aria-hidden className="text-center text-[0.68rem] leading-[1.2] hyphens-auto group-aria-pressed:text-gold">
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
      <aside
        aria-live="polite"
        className="sticky bottom-3 rounded-sm border border-[#6b6b6b] bg-black/90 px-4.5 py-4 text-[0.9rem] desk:top-[calc(var(--nav-h)+1rem)] desk:bottom-auto"
      >
        <h4 className="text-[1.05rem] text-gold">{nameOf(shown)}</h4>
        <p className="mt-1.5 text-[#7fd36a]">{levelOf(shown)}</p>
        {shown.noteKey && <p className="mt-1.5">{t(`skills.notes.${shown.noteKey}`)}</p>}
        <p className="pixel mt-3.5 text-[0.55rem] text-x-cyan">{t('skills.usedAt')}</p>
        {shown.jobs.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {shown.jobs.map(id => (
              <li key={id}>
                <a
                  href={jobHash(id)}
                  onClick={event => {
                    event.preventDefault()
                    showJob(id)
                  }}
                  className="inline-block rounded-[3px] border border-gold-dim px-2 py-0.5 text-[0.8rem] text-gold hover:border-gold hover:bg-gold/15"
                >
                  {companyOf(id)}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1.5 text-[0.8rem] text-muted">{t('skills.noJobs')}</p>
        )}
        <p className="mt-3.5 text-[0.8rem] text-muted italic">{t('skills.hint')}</p>
      </aside>
    </div>
  )
}
