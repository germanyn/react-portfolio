import 'keyrune/css/keyrune.min.css'
import 'mana-font/css/mana.min.css'
import { useTranslation } from 'react-i18next'
import { profile, yearsSince } from '../data/profile'

type ManaSymbol = '1' | 'u'

const Mana = ({ symbol, shadow = false }: { symbol: ManaSymbol; shadow?: boolean }) => {
  const { t } = useTranslation()

  return (
    <i
      className={`ms ms-${symbol} ms-cost${shadow ? ' ms-shadow' : ''}`}
      role="img"
      aria-label={symbol === 'u' ? t('card.blueMana') : t('card.genericMana', { amount: symbol })}
    />
  )
}

/** A blue creature card laid out like Wizards' modern (M15) frame. */
export default function MtgCard() {
  const { t, i18n } = useTranslation()
  const power = yearsSince(profile.careerStart)

  return (
    <article className="mtg" aria-label={t('card.label', { name: profile.name })}>
      <div className="mtg__card">
      <div className="mtg__frame">
        <header className="mtg__bar mtg__title">
          <span className="mtg__name">{profile.name}</span>
          <span className="mtg__cost">
            <Mana symbol="1" shadow />
            <Mana symbol="u" shadow />
          </span>
        </header>

        <div className="mtg__art">
          <img src={profile.avatarUrl} alt="" loading="lazy" />
        </div>

        <div className="mtg__bar mtg__type">
          <span>{t('card.type')}</span>
          <i className="ss ss-m15 ss-mythic ss-grad mtg__set" role="img" aria-label={t('card.mythic')} />
        </div>

        <div className="mtg__textbox">
          <p>{t('card.keywords')}</p>
          <p>
            <Mana symbol="1" />
            <Mana symbol="u" />: {t('card.ability')}
          </p>
          <hr />
          <p className="mtg__flavor">{t('card.flavor')}</p>
        </div>

        <div className="mtg__pt">
          {power}/{power}
        </div>
      </div>

      <footer className="mtg__info">
        <div>
          <span>001/271 M</span>
          <span>
            GG • {i18n.resolvedLanguage?.toUpperCase()} <span className="mtg__brush">🖌</span> germanyn
          </span>
        </div>
        <div className="mtg__legal">™ &amp; © {new Date().getFullYear()} Germano Gascho</div>
      </footer>
      </div>
    </article>
  )
}
