import type { ComponentType } from 'react'
import type { SocialLink } from '../config'
import { trackEvent } from '../utils/analytics'
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons'

const ICON_BY_NAME: Record<string, ComponentType<{ size?: number }>> = {
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
  Email: MailIcon,
}

interface SocialIconProps {
  social: SocialLink
}

/** A single social link as a round icon button. */
export function SocialIcon({ social }: SocialIconProps) {
  const Icon = ICON_BY_NAME[social.name]
  return (
    <a
      className="icon-button"
      href={social.url}
      target="_blank"
      rel="noreferrer"
      title={social.name}
      aria-label={social.name}
      onClick={() => trackEvent('social_click', { platform: social.name })}
    >
      {Icon ? <Icon size={17} /> : social.name.charAt(0)}
    </a>
  )
}
