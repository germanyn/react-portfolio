import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import i18n from '../i18n'
import StageSelect from './StageSelect'

const stage = (title: string) => screen.getByRole('heading', { name: title }).closest('article')!
const dialog = () => document.querySelector('dialog')!

describe('StageSelect', () => {
  it('shows each project as a numbered stage', () => {
    render(<StageSelect />)

    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(within(stage('Almode PDV')).getByText('Stage 1')).toBeInTheDocument()
    expect(within(stage('MobiHub')).getByText('Stage 3')).toBeInTheDocument()
  })

  it('captions screenshots and links out when the project has a link', () => {
    render(<StageSelect />)

    expect(within(stage('Almode PDV')).getByRole('img', { name: 'Ongoing sale' })).toHaveAttribute(
      'src',
      '/img/almode/almode-2.png',
    )
    expect(within(stage('Self Menu')).getByRole('link', { name: 'Self Menu: Menu sample' })).toHaveAttribute(
      'href',
      'https://self-menu.web.app/60e3d8327ec3830a4c088911',
    )
    expect(within(stage('MobiHub')).queryByRole('link')).not.toBeInTheDocument()
  })

  it('only shows achievements for projects that have them', () => {
    render(<StageSelect />)

    expect(within(stage('Almode PDV')).getByText('Achievements unlocked')).toBeInTheDocument()
    expect(within(stage('Self Menu')).queryByText('Achievements unlocked')).not.toBeInTheDocument()
  })

  it('opens a screenshot in the dialog and closes it', async () => {
    render(<StageSelect />)
    expect(dialog().open).toBe(false)

    await userEvent.click(screen.getByRole('button', { name: 'Expand image: Payment process' }))

    expect(dialog().open).toBe(true)
    expect(within(dialog()).getByRole('img', { name: 'Payment process' })).toBeInTheDocument()

    await userEvent.click(within(dialog()).getByRole('button', { name: 'Close' }))

    expect(dialog().open).toBe(false)
    expect(within(dialog()).queryByRole('img')).not.toBeInTheDocument()
  })

  it('closes the dialog when clicking the backdrop', async () => {
    render(<StageSelect />)
    await userEvent.click(screen.getByRole('button', { name: 'Expand image: Listings' }))

    await userEvent.click(dialog())

    expect(dialog().open).toBe(false)
  })

  it('browses the project screenshots with the arrows, wrapping around', async () => {
    render(<StageSelect />)
    await userEvent.click(screen.getByRole('button', { name: 'Expand image: Payment process' }))
    const shown = () => within(dialog()).getByRole('img').getAttribute('alt')

    expect(within(dialog()).getByText('3 / 4')).toBeInTheDocument()
    await userEvent.click(within(dialog()).getByRole('button', { name: 'Next image' }))
    expect(shown()).toBe('Sales (dark mode)')
    await userEvent.click(within(dialog()).getByRole('button', { name: 'Next image' }))
    expect(shown()).toBe('Ongoing sale')
    await userEvent.click(within(dialog()).getByRole('button', { name: 'Previous image' }))
    expect(shown()).toBe('Sales (dark mode)')
    expect(within(dialog()).getByText('4 / 4')).toBeInTheDocument()
  })

  it('browses with the arrow keys', async () => {
    render(<StageSelect />)
    await userEvent.click(screen.getByRole('button', { name: 'Expand image: Admin view' }))
    const shown = () => within(dialog()).getByRole('img').getAttribute('alt')

    await userEvent.keyboard('{ArrowRight}')
    expect(shown()).toBe('QR code generation')
    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(shown()).toBe('Order screen')
    await userEvent.keyboard('a')
    expect(shown()).toBe('Order screen')
  })

  it('browses by swiping, ignoring short or vertical drags', () => {
    render(<StageSelect />)
    fireEvent.click(screen.getByRole('button', { name: 'Expand image: Admin view' }))
    const shown = () => within(dialog()).getByRole('img').getAttribute('alt')
    const swipe = (from: [number, number], to: [number, number]) => {
      fireEvent.touchStart(dialog(), { touches: [{ clientX: from[0], clientY: from[1] }] })
      fireEvent.touchEnd(dialog(), { changedTouches: [{ clientX: to[0], clientY: to[1] }] })
    }

    swipe([300, 100], [100, 110])
    expect(shown()).toBe('QR code generation')
    swipe([100, 100], [300, 90])
    expect(shown()).toBe('Admin view')
    swipe([300, 100], [270, 100])
    swipe([300, 100], [200, 400])
    fireEvent.touchEnd(dialog(), { changedTouches: [{ clientX: 0, clientY: 0 }] })
    expect(shown()).toBe('Admin view')
  })

  it('hides the browsing controls for a single screenshot', async () => {
    render(<StageSelect />)
    await userEvent.click(screen.getByRole('button', { name: 'Expand image: Listings' }))

    expect(within(dialog()).queryByRole('button', { name: 'Next image' })).not.toBeInTheDocument()
    expect(within(dialog()).queryByText('1 / 1')).not.toBeInTheDocument()
    await userEvent.keyboard('{ArrowRight}')
    expect(within(dialog()).getByRole('img', { name: 'Listings' })).toBeInTheDocument()
  })

  it('is translated', async () => {
    await i18n.changeLanguage('pt')
    render(<StageSelect />)

    expect(within(stage('Almode PDV')).getByText('Fase 1')).toBeInTheDocument()
    expect(within(stage('Almode PDV')).getByRole('img', { name: 'Venda em andamento' })).toBeInTheDocument()
  })
})
