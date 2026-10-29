import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import i18n from '../i18n'
import About from './About'
import Hero from './Hero'

// Career started 2017-04-01, so on this date it's 9 years.
beforeEach(() => {
  vi.useFakeTimers({ now: new Date(2026, 9, 29), toFake: ['Date'] })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Hero', () => {
  it('shows the level and years of experience', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { level: 1, name: 'Germano Gascho' })).toBeInTheDocument()
    expect(screen.getByText('Player 1 · Lv 9')).toBeInTheDocument()
    expect(screen.getByText(/9 years building web apps/)).toBeInTheDocument()
  })
})

describe('About', () => {
  it('shows the character sheet', () => {
    render(<About />)

    expect(screen.getByText('9+ years')).toBeInTheDocument()
    expect(screen.getByText(/Bachelor's in Computer Engineering — Univali/)).toBeInTheDocument()
    expect(screen.getByText('Portuguese (native) · English (C2)')).toBeInTheDocument()
  })

  it('renders the Magic card with power/toughness from years of experience', () => {
    render(<About />)

    const card = screen.getByRole('article', { name: 'Germano Gascho, as a Magic card' })
    expect(card).toHaveTextContent('Creature — Human Developer')
    expect(card).toHaveTextContent('9/9')
    expect(screen.getAllByRole('img', { name: 'blue mana' })).toHaveLength(2) // cost + ability
    expect(screen.getAllByRole('img', { name: '1 generic mana' })).toHaveLength(2)
  })

  it('is translated, including the card', async () => {
    await i18n.changeLanguage('pt')
    render(<About />)

    expect(screen.getByText('9+ anos')).toBeInTheDocument()
    expect(screen.getByRole('article', { name: 'Germano Gascho, como uma carta de Magic' })).toHaveTextContent(
      'Criatura — Humano Desenvolvedor',
    )
    expect(screen.getByText(/GG • PT/)).toBeInTheDocument()
  })
})
