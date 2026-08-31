import { useTheme } from '../theme/ThemeContext'
import { trackEvent } from '../utils/analytics'
import { MoonIcon, SunIcon } from './Icons'

/** Switch between the warm light and warm dark themes. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      className="icon-button theme-toggle"
      onClick={() => {
        trackEvent('theme_toggle', { to: theme === 'dark' ? 'light' : 'dark' })
        toggleTheme()
      }}
      title="Toggle theme"
      aria-label="Toggle color theme"
    >
      {theme === 'dark' ? <SunIcon size={17} /> : <MoonIcon size={17} />}
    </button>
  )
}
