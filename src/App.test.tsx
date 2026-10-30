import { act, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

/** Fake IntersectionObserver (jsdom has none) that lets a test report sections as visible. */
let reportVisible: (id: string) => void

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        reportVisible = id =>
          callback(
            [{ isIntersecting: true, target: document.getElementById(id)! } as unknown as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          )
      }
      observe() {}
      disconnect() {}
    },
  )
  return () => vi.unstubAllGlobals()
})

const sectionsNav = () => within(screen.getByRole('navigation', { name: 'Sections' }))

describe('App', () => {
  it('renders every section with a nav link to it', () => {
    render(<App />)

    for (const [id, title] of [
      ['projects', 'Projects'],
      ['about', 'About me'],
      ['career', 'Career map'],
      ['skills', 'Skills'],
      ['contact', 'Get in touch'],
    ]) {
      expect(document.getElementById(id)).toContainElement(screen.getByRole('heading', { level: 2, name: title }))
      expect(sectionsNav().getAllByRole('link').some(link => link.getAttribute('href') === `#${id}`)).toBe(true)
    }
  })

  it('highlights the section currently on screen', () => {
    render(<App />)
    expect(sectionsNav().getByRole('link', { name: 'Career' })).not.toHaveClass('is-active')

    act(() => reportVisible('career'))

    expect(sectionsNav().getByRole('link', { name: 'Career' })).toHaveClass('is-active')
    expect(sectionsNav().getByRole('link', { name: 'Projects' })).not.toHaveClass('is-active')
  })
})
