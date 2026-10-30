import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

export default function LanguageSwitch() {
  const { t, i18n } = useTranslation()

  return (
    <div className="flex overflow-hidden rounded-md border-2 border-gold-dim" role="group" aria-label={t('nav.language')}>
      {languages.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          lang={code}
          title={name}
          aria-pressed={i18n.resolvedLanguage === code}
          onClick={() => i18n.changeLanguage(code)}
          className="px-2 py-[0.45rem] font-pixel text-[0.55rem] text-muted hover:text-text aria-pressed:bg-gold aria-pressed:text-[#111]"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
