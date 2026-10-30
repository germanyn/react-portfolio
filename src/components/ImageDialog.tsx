import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectImage } from '../data/projects'

type Props = {
  image: ProjectImage | null
  onClose: () => void
}

export default function ImageDialog({ image, onClose }: Props) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (image && !dialog.open) dialog.showModal()
    if (!image && dialog.open) dialog.close()
  }, [image])

  return (
    <dialog
      ref={ref}
      className="dialog"
      onClose={onClose}
      onClick={event => event.target === ref.current && onClose()}
    >
      {image && (
        <figure>
          <img src={image.url} alt={image.description} />
          <figcaption>
            {image.description}
            <button type="button" className="dialog__close" onClick={onClose} aria-label={t('projects.close')}>
              ✕
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}
