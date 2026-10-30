import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import NavBar from './NavBar'

const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'career', label: 'Career' },
]

const menuButton = () => screen.getByRole('button', { name: 'Menu' })

describe('NavBar', () => {
  it('marks the active section', () => {
    render(<NavBar sections={sections} active="career" />)

    expect(screen.getByRole('link', { name: 'Career' })).toHaveClass('is-active')
    expect(screen.getByRole('link', { name: 'Projects' })).not.toHaveClass('is-active')
  })

  it('toggles the mobile menu', async () => {
    render(<NavBar sections={sections} active={null} />)
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(menuButton())
    expect(menuButton()).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('banner')).toHaveClass('is-open')

    await userEvent.click(menuButton())
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the menu on Escape', async () => {
    render(<NavBar sections={sections} active={null} />)
    await userEvent.click(menuButton())

    await userEvent.keyboard('{Escape}')

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the menu when a section is picked', async () => {
    render(<NavBar sections={sections} active={null} />)
    await userEvent.click(menuButton())

    await userEvent.click(screen.getByRole('link', { name: 'Career' }))

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the menu when the logo is tapped', async () => {
    render(<NavBar sections={sections} active={null} />)
    await userEvent.click(menuButton())

    await userEvent.click(screen.getByRole('link', { name: 'Back to top' }))

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false')
  })
})
