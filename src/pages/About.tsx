import { config } from '../config'
import { PageHeader } from '../components/PageHeader'
import { Panel } from '../components/Panel'

export function About() {
  const { about } = config
  return (
    <main className="page">
      <PageHeader kicker="PERSONNEL RECORD" title={about.heading} />
      <Panel label="DOSSIER">
        {about.paragraphs.map((p) => (
          <p key={p} style={{ marginBottom: 16 }}>
            {p}
          </p>
        ))}
        <ul className="skill-list">
          {about.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Panel>
    </main>
  )
}
