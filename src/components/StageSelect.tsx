import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { projects, type ProjectImage } from '../data/projects'
import ImageDialog from './ImageDialog'
import Tags from './Tags'

/** Projects shown as a Mega Man X–style stage select. */
export default function StageSelect() {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null)
  const strings = (key: string) => t(key, { returnObjects: true }) as string[]

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {projects.map((project, index) => {
          const key = `projects.items.${project.id}`
          const captions = strings(`${key}.images`)
          const achievements = strings(`${key}.achievements`)
          const linkLabel = t(`${key}.link`)

          return (
            <article
              key={project.id}
              className="flex flex-col rounded-sm border-3 border-[#3d4a6e] bg-bg-2 p-5 shadow-[0_0_0_3px_#000,0_12px_30px_#00000080] transition duration-200 focus-within:-translate-y-1 focus-within:border-x-cyan hover:-translate-y-1 hover:border-x-cyan"
            >
              <header className="grid grid-cols-[1fr_auto] items-start">
                <span className="pixel col-span-full text-[0.6rem] text-spire-red">{t('projects.stage', { number: index + 1 })}</span>
                <h3 className="mt-1.5 text-[1.6rem]">{project.title}</h3>
                {project.link && (
                  <a
                    className="p-1.5 text-muted hover:text-x-cyan"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title}: ${linkLabel}`}
                    title={linkLabel}
                  >
                    <FaExternalLinkAlt aria-hidden />
                  </a>
                )}
              </header>

              <div
                className={`mt-4 grid grid-cols-3 gap-2 ${project.displayAsMobile ? '' : '[&>:first-child]:col-span-full'}`}
              >
                {project.images.map((url, i) => {
                  const image = { url, description: captions[i] ?? project.title }
                  return (
                    <button
                      key={url}
                      type="button"
                      className={`group cursor-zoom-in overflow-hidden border-2 border-black bg-black ${project.displayAsMobile ? 'aspect-9/16' : 'aspect-16/10'}`}
                      onClick={() => setSelectedImage(image)}
                      aria-label={t('projects.expandImage', { description: image.description })}
                    >
                      <img
                        src={url}
                        alt={image.description}
                        loading="lazy"
                        className="size-full object-cover object-top saturate-85 transition duration-250 group-hover:scale-105 group-hover:saturate-100"
                      />
                    </button>
                  )
                })}
              </div>

              <p className="mt-4 mb-2 text-muted">{t(`${key}.description`)}</p>
              <dl className="mt-2 flex gap-6 text-[0.9rem]">
                {(['role', 'duration'] as const).map(field => (
                  <div key={field}>
                    <dt className="text-[0.7rem] tracking-[0.08em] text-muted uppercase">
                      {t(field === 'role' ? 'projects.role' : 'projects.time')}
                    </dt>
                    <dd className="font-bold">{t(`${key}.${field}`)}</dd>
                  </div>
                ))}
              </dl>
              <Tags items={project.technologies} />
              {achievements.length > 0 && (
                <details className="mt-4 text-[0.9rem]">
                  <summary className="cursor-pointer font-bold text-gold">{t('projects.achievements')}</summary>
                  <ul className="my-4 list-['★_'] pl-5 text-muted marker:text-gold">
                    {achievements.map(achievement => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </details>
              )}
            </article>
          )
        })}
      </div>
      <ImageDialog image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  )
}
