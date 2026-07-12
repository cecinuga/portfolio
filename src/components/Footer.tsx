import { config } from '../config'

/** Site footer with facility line and flaticon attributions. */
export function Footer() {
  return (
    <footer className="footer">
      <span>{config.site.facility}</span>
      <span>
        icons:{' '}
        {config.socials.map((social, i) => (
          <span key={social.name}>
            {i > 0 && ' · '}
            <a
              href={social.attribution.href}
              title={social.attribution.title}
              target="_blank"
              rel="noreferrer"
            >
              {social.attribution.title}
            </a>
          </span>
        ))}{' '}
        by Flaticon
      </span>
    </footer>
  )
}
