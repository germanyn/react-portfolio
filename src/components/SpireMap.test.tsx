import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { showJob } from '../showJob'
import SpireMap from './SpireMap'

const selectedTab = () => screen.getByRole('tab', { selected: true })
const panel = () => screen.getByRole('tabpanel')
/** Company (or school) of each card, top to bottom: the part of the heading after "@". */
const jobOrder = () => [...panel().querySelectorAll('h4')].map(heading => heading.textContent!.split('@ ')[1])

describe('SpireMap', () => {
  it('opens on Act I, from studies to Almode', () => {
    render(<SpireMap />)

    expect(selectedTab()).toHaveTextContent('The Start')
    expect(jobOrder()).toEqual(['Univali', 'Adapcon Sistemas', 'Almode'])
  })

  it('switches acts by clicking a tab, listing jobs oldest first with Somar last', async () => {
    render(<SpireMap />)

    await userEvent.click(screen.getByRole('tab', { name: /Architect/ }))

    expect(selectedTab()).toHaveTextContent('Architect')
    expect(jobOrder()).toEqual(['Bytecom Sistemas', 'Umbrage', 'Clinicorp', 'Somar Vale do Itapocu'])
  })

  it('moves between tabs with the arrow, Home and End keys', async () => {
    render(<SpireMap />)
    await userEvent.click(selectedTab())

    await userEvent.keyboard('{ArrowRight}')
    expect(selectedTab()).toHaveTextContent('Senior Ascension')
    expect(selectedTab()).toHaveFocus()

    await userEvent.keyboard('{End}')
    expect(selectedTab()).toHaveTextContent('Architect')

    await userEvent.keyboard('{ArrowRight}')
    expect(selectedTab()).toHaveTextContent('The Start') // wraps around

    await userEvent.keyboard('{ArrowLeft}')
    expect(selectedTab()).toHaveTextContent('Architect')
  })

  it('scrolls back to the top of the map when switching acts while scrolled past it', async () => {
    document.documentElement.style.setProperty('--nav-h', '64px')
    render(<SpireMap />)
    const map = screen.getByRole('tablist').parentElement!

    // Map top still on screen: switching acts doesn't scroll.
    map.getBoundingClientRect = () => ({ top: 200 }) as DOMRect
    await userEvent.click(screen.getByRole('tab', { name: /Senior Ascension/ }))
    expect(map.scrollIntoView).not.toHaveBeenCalled()

    // Map top hidden under the sticky tabs: bring the new act's start into view.
    map.getBoundingClientRect = () => ({ top: -500 }) as DOMRect
    await userEvent.click(screen.getByRole('tab', { name: /Architect/ }))
    expect(map.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('derives node types from the job level', () => {
    render(<SpireMap />)

    expect(document.getElementById('job-adapcon')).toHaveAttribute('data-kind', 'enemy')
    expect(document.getElementById('job-almode')).toHaveAttribute('data-kind', 'boss')
  })

  it('opens the right act, scrolls to and highlights a job requested with showJob', () => {
    render(<SpireMap />)

    act(() => showJob('groundbreaker'))

    expect(selectedTab()).toHaveTextContent('Senior Ascension')
    const job = document.getElementById('job-groundbreaker')!
    expect(job).toHaveAttribute('data-highlighted')
    expect(job.scrollIntoView).toHaveBeenCalled()
    expect(window.location.hash).toBe('#job-groundbreaker')
  })

  it('opens the job from a #job-… URL on load', () => {
    window.history.replaceState(null, '', '/#job-somar')
    render(<SpireMap />)

    expect(selectedTab()).toHaveTextContent('Architect')
    expect(document.getElementById('job-somar')).toHaveAttribute('data-highlighted')
  })

  it('ignores an unknown #job-… URL', () => {
    window.history.replaceState(null, '', '/#job-nope')
    render(<SpireMap />)

    expect(selectedTab()).toHaveTextContent('The Start')
  })
})
