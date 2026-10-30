import 'keyrune/css/keyrune.min.css'
import 'mana-font/css/mana.min.css'
import { useTranslation } from 'react-i18next'
import { profile, yearsSince } from '../data/profile'

type ManaSymbol = '1' | 'u'

// mana-font's CSS is unlayered, so it beats Tailwind's layered utilities on the same
// property; the few overrides below use `!` for that reason.
const Mana = ({ symbol, inText = false }: { symbol: ManaSymbol; inText?: boolean }) => {
  const { t } = useTranslation()

  return (
    <i
      className={`ms ms-${symbol} ms-cost ${
        inText ? 'mx-[0.04em] align-[0.05em]! text-[0.85em]!' : 'ms-shadow shadow-[-0.12em_0.12em_0_#000]!'
      }`}
      role="img"
      aria-label={symbol === 'u' ? t('card.blueMana') : t('card.genericMana', { amount: symbol })}
    />
  )
}

/** Title line, type line and P/T box share this beveled bar look. */
const bar = 'mtg-bevel relative z-1 flex h-[8.4cqw] items-center justify-between rounded-[2.6cqw/50%] pr-[2.2cqw] pl-[2.6cqw] font-card font-bold whitespace-nowrap'

/** A blue creature card laid out like Wizards' modern (M15) frame. Sizes are in cqw, so it scales with its width. */
export default function MtgCard() {
  const { t, i18n } = useTranslation()
  const power = yearsSince(profile.careerStart)

  return (
    <article
      className="@container w-80 max-w-full transition duration-300 hover:scale-[1.02] hover:-rotate-2"
      aria-label={t('card.label', { name: profile.name })}
    >
      <div className="relative flex aspect-63/88 min-h-0 flex-col overflow-hidden rounded-[4.6cqw] bg-[#0d0d0d] px-[4.2cqw] pt-[4.2cqw] text-[#111] shadow-[0_20px_40px_#000a]">
        <div className="mtg-frame relative flex min-h-0 flex-1 flex-col rounded-t-[1.2cqw] px-[2cqw] pt-[2.2cqw] pb-[5.5cqw]">
          <header className={`${bar} text-[4.9cqw]`}>
            <span>{profile.name}</span>
            <span className="flex gap-[0.5cqw] text-[4.4cqw]">
              <Mana symbol="1" />
              <Mana symbol="u" />
            </span>
          </header>

          <div className="mtg-inset relative mx-[1.6cqw] -mt-[0.4cqw] min-h-0 flex-1 bg-black">
            <img src={profile.avatarUrl} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
          </div>

          <div className={`${bar} -mt-[0.4cqw] text-[4.3cqw]`}>
            <span>{t('card.type')}</span>
            <i className="ss ss-m15 ss-mythic ss-grad text-[5.6cqw]" role="img" aria-label={t('card.mythic')} />
          </div>

          <div className="mtg-inset mtg-textbox-bg mx-[1.6cqw] -mt-[0.4cqw] flex h-[43cqw] flex-col justify-center gap-[1.4cqw] px-[3cqw] py-[2.6cqw] font-plantin text-[4.5cqw] leading-[1.22]">
            <p>{t('card.keywords')}</p>
            <p>
              <Mana symbol="1" inText />
              <Mana symbol="u" inText />: {t('card.ability')}
            </p>
            <hr className="mx-auto h-[0.35cqw] w-[86%] border-0 bg-linear-to-r from-transparent via-[#4b5f70] to-transparent" />
            <p className="italic">{t('card.flavor')}</p>
          </div>

          {/* Power/toughness overlapping the text box's bottom-right corner */}
          <div className="mtg-bevel absolute right-[1.4cqw] bottom-[1.6cqw] z-1 grid h-[8.2cqw] min-w-[17cqw] place-items-center rounded-[1.6cqw] px-[2cqw] font-card text-[5.4cqw] font-bold">
            {power}/{power}
          </div>
        </div>

        {/* Collector info printed on the black border */}
        <footer className="flex h-[7.6cqw] items-end justify-between px-[1cqw] pt-[0.8cqw] pb-[1.4cqw] text-[2.3cqw] leading-[1.25] text-[#f1f1f1]">
          <div className="flex flex-col">
            <span>001/271 M</span>
            <span>
              GG • {i18n.resolvedLanguage?.toUpperCase()} <i className="ms ms-artist-brush mx-[0.2em]" aria-hidden /> germanyn
            </span>
          </div>
          <div className="text-right">™ &amp; © {new Date().getFullYear()} Germano Gascho</div>
        </footer>
      </div>
    </article>
  )
}
