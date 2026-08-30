import { config } from '../config'

/** Site footer. */
export function Footer() {
  return (
    <footer className="footer">
      <span>
        {config.site.title} — {config.site.tagline}
      </span>
      <span>
        Icons by{' '}
        <a href="https://lucide.dev" target="_blank" rel="noreferrer">
          Lucide
        </a>
      </span>
    </footer>
  )
}
