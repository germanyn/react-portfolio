import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import pt from './locales/pt'

export const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'pt', label: 'PT', name: 'Português' },
] as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    supportedLngs: languages.map(({ code }) => code),
    nonExplicitSupportedLngs: true, // pt-BR → pt
    fallbackLng: 'en',
    interpolation: { escapeValue: false }, // React already escapes
    detection: {
      // ?lang=pt for shareable links, then the saved choice, then the browser language
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  })

i18n.on('languageChanged', lng => {
  document.documentElement.lang = lng.startsWith('pt') ? 'pt-BR' : 'en'
})
document.documentElement.lang = i18n.resolvedLanguage === 'pt' ? 'pt-BR' : 'en'

export default i18n
