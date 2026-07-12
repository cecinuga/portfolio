import type { SocialLink } from '../config'

interface SocialIconProps {
  social: SocialLink
}

/** A single social link rendered with its flaticon image. */
export function SocialIcon({ social }: SocialIconProps) {
  return (
    <a
      className="social-bar__link"
      href={social.url}
      target="_blank"
      rel="noreferrer"
      title={social.name}
      aria-label={social.name}
    >
      <img src={social.icon} alt={`${social.name} icon`} />
    </a>
  )
}
