import { useTranslation } from 'react-i18next'
import SocialLinks from './SocialLinks'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <div className="contact panel">
      <p className="pixel contact__continue">{t('contact.continue')}</p>
      <p>{t('contact.pitch')}</p>
      <SocialLinks variant="buttons" />
    </div>
  )
}
