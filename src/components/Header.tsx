import { Link } from 'react-router-dom'
import { config } from '../config'
import { DownloadIcon } from './Icons'
import { NavMenu } from './NavMenu'
import { SocialBar } from './SocialBar'
import { ThemeToggle } from './ThemeToggle'

/** Site header: brand, socials, resume download, theme toggle and navigation. */
export function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__brand">
          <span className="header__mark">m</span>
          <span>
            <span className="header__name">{config.site.title}</span>
            <small>{config.site.tagline}</small>
          </span>
        </Link>
        <div className="header__right">
          <SocialBar socials={config.socials} />
          <a
            className="resume-button"
            href={config.resume.download}
            download
          >
            <DownloadIcon size={15} />
            Resume
          </a>
          <ThemeToggle />
        </div>
      </div>
      <NavMenu pages={config.pages} />
    </header>
  )
}
