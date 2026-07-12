import type { SocialLink } from '../config'
import { SocialIcon } from './SocialIcon'

interface SocialBarProps {
  socials: SocialLink[]
}

/** Row of social icons. */
export function SocialBar({ socials }: SocialBarProps) {
  return (
    <div className="social-bar">
      {socials.map((social) => (
        <SocialIcon key={social.name} social={social} />
      ))}
    </div>
  )
}
