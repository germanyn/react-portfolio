import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Contact from './Contact'
import LanguageSwitch from './LanguageSwitch'

describe('LanguageSwitch', () => {
  it('switches the page to Portuguese and back', async () => {
    render(
      <>
        <LanguageSwitch />
        <Contact />
      </>,
    )
    expect(screen.getByText('Continue?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(screen.getByRole('button', { name: 'PT' }))

    expect(screen.getByText('Continuar?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'PT' })).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement.lang).toBe('pt-BR')
    expect(localStorage.getItem('i18nextLng')).toBe('pt')

    await userEvent.click(screen.getByRole('button', { name: 'EN' }))

    expect(screen.getByText('Continue?')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
  })
})
