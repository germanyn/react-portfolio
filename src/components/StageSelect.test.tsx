import { render, screen, within } from '@testing-library/react'
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

  it('is translated', async () => {
    await i18n.changeLanguage('pt')
    render(<StageSelect />)

    expect(within(stage('Almode PDV')).getByText('Fase 1')).toBeInTheDocument()
    expect(within(stage('Almode PDV')).getByRole('img', { name: 'Venda em andamento' })).toBeInTheDocument()
  })
})
