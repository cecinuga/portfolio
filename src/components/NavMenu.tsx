import { NavLink } from 'react-router-dom'
import type { PageLink } from '../config'

interface NavMenuProps {
  pages: PageLink[]
}

/** Equally-spaced navigation links to the site pages. */
export function NavMenu({ pages }: NavMenuProps) {
  return (
    <nav className="nav-menu" aria-label="Main navigation">
      {pages.map((page) => (
        <NavLink
          key={page.path}
          to={page.path}
          end={page.path === '/'}
          className={({ isActive }) =>
            `nav-menu__link${isActive ? ' nav-menu__link--active' : ''}`
          }
        >
          {page.label}
        </NavLink>
      ))}
    </nav>
  )
}
