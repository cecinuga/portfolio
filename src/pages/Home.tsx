import { config } from '../config'
import { PageHeader } from '../components/PageHeader'
import { Panel } from '../components/Panel'
import { StatusTag } from '../components/StatusTag'

/** Boot log line with a staggered power-on delay. */
function BootLine({ line, index }: { line: string; index: number }) {
  return <li style={{ animationDelay: `${0.4 + index * 0.35}s` }}>{line}</li>
}

export function Home() {
  const { site } = config
  return (
    <main className="page">
      <section className="hero">
        <h1 className="hero__title">{site.title}</h1>
        <p className="hero__tagline">{site.tagline}</p>
        <p className="hero__subtitle">{site.subtitle}</p>
      </section>

      <Panel label="SYSTEM BOOT">
        <ul className="boot-log">
          {site.bootLines.map((line, i) => (
            <BootLine key={line} line={line} index={i} />
          ))}
        </ul>
      </Panel>

      <PageHeader
        kicker="TRANSMISSION"
        title="ARCHIVE ONLINE"
        note="You have reached the personal archive of a software engineer. Machine learning models, experiments and work logs are preserved on this terminal. Navigate with the menu above."
      />
      <StatusTag label="RUNNING" />
    </main>
  )
}
