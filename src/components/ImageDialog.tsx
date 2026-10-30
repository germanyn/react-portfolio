import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import type { ProjectImage } from '../data/projects'

type Props = {
  images: ProjectImage[]
  /** Shown image, or null when the dialog is closed. */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

/** Horizontal travel (px) a touch needs to count as a swipe. */
const SWIPE_DISTANCE = 50

const arrow =
  'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-dim bg-bg/80 text-gold hover:border-gold hover:text-x-cyan'

/** Lightbox for a project's screenshots: arrows, ←/→ keys or swipe to browse (wraps around). */
export default function ImageDialog({ images, index, onIndexChange, onClose }: Props) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDialogElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const image = index === null ? null : images[index]
  const browsable = images.length > 1

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (image && !dialog.open) dialog.showModal()
    if (!image && dialog.open) dialog.close()
  }, [image])

  const step = (delta: number) => {
    if (index === null || !browsable) return
    onIndexChange((index + delta + images.length) % images.length)
  }

  // On the document, not the dialog: clicking the picture moves focus out of it.
  useEffect(() => {
    if (index === null || !browsable) return
    const onKeyDown = (event: KeyboardEvent) => {
      const delta = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
      if (!delta) return
      event.preventDefault()
      onIndexChange((index + delta + images.length) % images.length)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [index, browsable, images.length, onIndexChange])

  return (
    <dialog
      ref={ref}
      className="m-auto max-h-[92vh] max-w-[min(1100px,92vw)] rounded-[10px] border-3 border-gold-dim bg-panel p-0 text-text backdrop:bg-black/75 backdrop:backdrop-blur-[3px]"
      onClose={onClose}
      onClick={event => event.target === ref.current && onClose()}
      onTouchStart={event => {
        const touch = event.touches[0]
        touchStart.current = { x: touch.clientX, y: touch.clientY }
      }}
      onTouchEnd={event => {
        const start = touchStart.current
        touchStart.current = null
        if (!start) return
        const touch = event.changedTouches[0]
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1)
      }}
    >
      {image && index !== null && (
        <figure>
          <div className="relative">
            <img
              src={image.url}
              alt={image.description}
              className="mx-auto max-h-[calc(92vh-60px)] select-none"
              draggable={false}
            />
            {browsable && (
              <>
                <button type="button" className={`${arrow} left-3`} onClick={() => step(-1)} aria-label={t('projects.previousImage')}>
                  <FaChevronLeft aria-hidden />
                </button>
                <button type="button" className={`${arrow} right-3`} onClick={() => step(1)} aria-label={t('projects.nextImage')}>
                  <FaChevronRight aria-hidden />
                </button>
              </>
            )}
          </div>
          <figcaption className="flex items-center justify-between gap-4 px-4 py-2.5 font-title">
            <span>
              {image.description}
              {browsable && (
                <span className="pixel ml-3 text-[0.6rem] text-muted">
                  {index + 1} / {images.length}
                </span>
              )}
            </span>
            <button type="button" className="text-[1.2rem] text-muted" onClick={onClose} aria-label={t('projects.close')}>
              ✕
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}
