import { useTranslation } from 'react-i18next'
import SocialLinks from './SocialLinks'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <div className="panel mx-auto max-w-[600px] text-center">
      <p className="pixel mt-2 mb-4 animate-blink text-[1.1rem] text-spire-red">{t('contact.continue')}</p>
      <p className="my-4">{t('contact.pitch')}</p>
      <SocialLinks variant="buttons" className="mt-6 mb-2" />
    </div>
  )
}
