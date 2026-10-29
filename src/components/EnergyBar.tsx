import { useEffect, useState } from 'react'

const SEGMENTS = 28

/** Mega Man X–style life bar that fills as the page is scrolled. */
export default function EnergyBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 1)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const filled = Math.max(1, Math.round(progress * SEGMENTS))

  return (
    <div className="energy" aria-hidden>
      <div className="energy__bar">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span key={i} className={SEGMENTS - i <= filled ? 'is-on' : undefined} />
        ))}
      </div>
      <span className="energy__label">X</span>
    </div>
  )
}
