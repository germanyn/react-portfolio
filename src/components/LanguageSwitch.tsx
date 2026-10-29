import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation()

  return (
    <div className="lang" role="group" aria-label={t('nav.language')}>
      {languages.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          lang={code}
          title={name}
          aria-pressed={i18n.resolvedLanguage === code}
          onClick={() => i18n.changeLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
