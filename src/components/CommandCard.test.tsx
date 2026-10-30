import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CommandCard from './CommandCard'
import SpireMap from './SpireMap'

const panel = () => within(screen.getByRole('complementary'))
const skillButton = (name: string) => screen.getByRole('button', { name: new RegExp(`^${name},`) })

describe('CommandCard', () => {
  it('pins a clicked skill and lists where it was used', async () => {
    render(<CommandCard />)

    await userEvent.click(skillButton('Vue'))

    expect(skillButton('Vue')).toHaveAttribute('aria-pressed', 'true')
    expect(panel().getByRole('heading', { name: 'Vue' })).toBeInTheDocument()
    expect(panel().getAllByRole('link').map(link => link.textContent)).toEqual([
      'Adapcon Sistemas',
      'Almode',
      'Multiplier',
      'Bytecom Sistemas',
      'Somar Vale do Itapocu',
    ])
  })

  it('previews a hovered skill, then goes back to the pinned one', async () => {
    render(<CommandCard />)
    await userEvent.click(skillButton('Vue'))

    await userEvent.hover(skillButton('Kotlin'))
    expect(panel().getByRole('heading', { name: 'Kotlin' })).toBeInTheDocument()

    await userEvent.unhover(skillButton('Kotlin'))
    expect(panel().getByRole('heading', { name: 'Vue' })).toBeInTheDocument()
  })

  it('says when a skill comes from side projects', async () => {
    render(<CommandCard />)

    await userEvent.click(skillButton('Kubernetes'))

    expect(panel().queryAllByRole('link')).toHaveLength(0)
    expect(panel().getByText('Side projects and studies')).toBeInTheDocument()
  })

  it('names the last group "Soft skills"', () => {
    render(<CommandCard />)

    expect(screen.getByRole('region', { name: 'Soft skills' })).toBeInTheDocument()
  })

  it('jumps to the company on the career map', async () => {
    render(
      <>
        <CommandCard />
        <SpireMap />
      </>,
    )
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('The Start')

    await userEvent.click(skillButton('C# · ASP.NET'))
    await userEvent.click(panel().getByRole('link', { name: 'Umbrage' }))

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Architect')
    expect(document.getElementById('job-umbrage')).toHaveAttribute('data-highlighted')
  })
})
