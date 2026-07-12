import { useTheme } from '../theme/ThemeContext'

/** Switch between dark (emergency power) and light (daylight) themes. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      {theme === 'dark' ? 'PWR: NIGHT' : 'PWR: DAY'}
    </button>
  )
}
