import { useTranslation } from 'react-i18next'
import { profile, yearsSince } from '../data/profile'

const Mana = ({ symbol }: { symbol: string }) => {
  const { t } = useTranslation()

  return (
    <span
      className={`mana mana--${symbol.toLowerCase()}`}
      aria-label={symbol === 'U' ? t('card.blueMana') : t('card.genericMana', { amount: symbol })}
    >
      {symbol === 'U' ? (
        <svg viewBox="0 0 10 10" aria-hidden>
          <path d="M5 1 C5 1 2 4.6 2 6.4 A3 3 0 0 0 8 6.4 C8 4.6 5 1 5 1Z" fill="currentColor" />
        </svg>
      ) : (
        symbol
      )}
    </span>
  )
}

/** A blue Magic: The Gathering–style creature card. */
export default function MtgCard() {
  const { t } = useTranslation()
  const power = yearsSince(profile.careerStart)

  return (
    <article className="mtg" aria-label={t('card.label', { name: profile.name })}>
      <div className="mtg__frame">
        <header className="mtg__bar">
          <span className="mtg__name">{profile.name}</span>
          <span className="mtg__cost">
            <Mana symbol="1" />
            <Mana symbol="U" />
          </span>
        </header>
        <img className="mtg__art" src={profile.avatarUrl} alt="" loading="lazy" />
        <div className="mtg__bar mtg__type">
          <span>{t('card.type')}</span>
          <span className="mtg__set" title={t('card.mythic')}>
            ◆
          </span>
        </div>
        <div className="mtg__text">
          <p>
            <strong>{t('card.keywords')}</strong>
          </p>
          <p>
            <Mana symbol="1" />
            <Mana symbol="U" />: {t('card.ability')}
          </p>
          <p className="mtg__flavor">{t('card.flavor')}</p>
        </div>
        <footer className="mtg__footer">
          <span>™ &amp; © {new Date().getFullYear()} Germano Gascho</span>
          <span className="mtg__pt">
            {power}/{power}
          </span>
        </footer>
      </div>
    </article>
  )
}
