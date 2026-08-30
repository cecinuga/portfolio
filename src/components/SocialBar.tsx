import type { SocialLink } from '../config'
import { SocialIcon } from './SocialIcon'

interface SocialBarProps {
  socials: SocialLink[]
}

/** Row of round social icon buttons. */
export function SocialBar({ socials }: SocialBarProps) {
  return (
    <>
      {socials.map((social) => (
        <SocialIcon key={social.name} social={social} />
      ))}
    </>
  )
}
