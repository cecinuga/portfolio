import { config } from '../config'
import { NavMenu } from './NavMenu'
import { SocialBar } from './SocialBar'
import { ThemeToggle } from './ThemeToggle'

/** Site header: brand, socials, theme toggle and page navigation. */
export function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <div className="header__brand">
          {config.site.title}
          <small>{config.site.codename}</small>
        </div>
        <div className="header__right">
          <SocialBar socials={config.socials} />
          <ThemeToggle />
        </div>
      </div>
      <NavMenu pages={config.pages} />
    </header>
  )
}
