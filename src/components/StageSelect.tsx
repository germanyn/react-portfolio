import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { projects, type ProjectImage } from '../data/projects'
import ImageDialog from './ImageDialog'

/** Projects shown as a Mega Man X–style stage select. */
export default function StageSelect() {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null)
  const strings = (key: string) => t(key, { returnObjects: true }) as string[]

  return (
    <>
      <div className="stages">
        {projects.map((project, index) => {
          const key = `projects.items.${project.id}`
          const captions = strings(`${key}.images`)
          const achievements = strings(`${key}.achievements`)
          const linkLabel = t(`${key}.link`)

          return (
            <article key={project.id} className="stage">
              <header className="stage__header">
                <span className="pixel stage__number">{t('projects.stage', { number: index + 1 })}</span>
                <h3 className="stage__title">{project.title}</h3>
                {project.link && (
                  <a
                    className="stage__link"
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

              <div className={`stage__gallery${project.displayAsMobile ? ' stage__gallery--mobile' : ''}`}>
                {project.images.map((url, i) => {
                  const image = { url, description: captions[i] ?? project.title }
                  return (
                    <button
                      key={url}
                      type="button"
                      className="stage__shot"
                      onClick={() => setSelectedImage(image)}
                      aria-label={t('projects.expandImage', { description: image.description })}
                    >
                      <img src={url} alt={image.description} loading="lazy" />
                    </button>
                  )
                })}
              </div>

              <p>{t(`${key}.description`)}</p>
              <dl className="stage__meta">
                <div>
                  <dt>{t('projects.role')}</dt>
                  <dd>{t(`${key}.role`)}</dd>
                </div>
                <div>
                  <dt>{t('projects.time')}</dt>
                  <dd>{t(`${key}.duration`)}</dd>
                </div>
              </dl>
              <ul className="tags">
                {project.technologies.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              {achievements.length > 0 && (
                <details className="stage__more">
                  <summary>{t('projects.achievements')}</summary>
                  <ul>
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
