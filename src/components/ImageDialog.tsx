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
      className="m-auto max-h-[92vh] max-w-[min(1100px,92vw)] rounded-[10px] border-3 border-gold-dim bg-panel p-0 text-text backdrop:bg-black/75 backdrop:backdrop-blur-[3px]"
      onClose={onClose}
      onClick={event => event.target === ref.current && onClose()}
    >
      {image && (
        <figure>
          <img src={image.url} alt={image.description} className="mx-auto max-h-[calc(92vh-60px)]" />
          <figcaption className="flex items-center justify-between px-4 py-2.5 font-title">
            {image.description}
            <button type="button" className="text-[1.2rem] text-muted" onClick={onClose} aria-label={t('projects.close')}>
              ✕
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}
