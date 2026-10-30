import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/profile'

const links = [
  { label: 'GitHub', href: profile.links.github, Icon: FaGithub },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: FaLinkedin },
  { label: 'Email', href: profile.links.email, Icon: FaEnvelope },
]

type Props = {
  variant?: 'icons' | 'buttons'
}

export default function SocialLinks({ variant = 'icons' }: Props) {
  return (
    <ul className={`social social--${variant}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
          >
            <Icon aria-hidden />
            {variant === 'buttons' && <span>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
