import { useTheme } from '../theme/ThemeContext'
import { MoonIcon, SunIcon } from './Icons'

/** Switch between the warm light and warm dark themes. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      className="icon-button theme-toggle"
      onClick={toggleTheme}
      title="Toggle theme"
      aria-label="Toggle color theme"
    >
      {theme === 'dark' ? <SunIcon size={17} /> : <MoonIcon size={17} />}
    </button>
  )
}
