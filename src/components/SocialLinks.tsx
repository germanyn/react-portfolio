import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { profile } from '../data/profile'

const links = [
  { label: 'GitHub', href: profile.links.github, Icon: FaGithub },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: FaLinkedin },
  { label: 'Email', href: profile.links.email, Icon: FaEnvelope },
]

const styles = {
  icons: {
    list: 'flex gap-2',
    link: 'p-1.5 text-xl text-muted hover:text-gold',
  },
  buttons: {
    list: 'flex flex-wrap justify-center gap-3',
    link: 'rounded-lg border-2 border-gold-dim bg-linear-to-b from-[#262f47] to-[#171d2d] px-4.5 py-2.5 font-bold text-text hover:-translate-y-0.5 hover:border-gold hover:text-gold',
  },
}

type Props = {
  variant?: 'icons' | 'buttons'
  className?: string
}

export default function SocialLinks({ variant = 'icons', className = '' }: Props) {
  const style = styles[variant]

  return (
    <ul className={`${style.list} ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            className={`inline-flex items-center gap-2 transition ${style.link}`}
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
