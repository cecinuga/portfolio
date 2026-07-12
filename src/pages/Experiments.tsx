import { config } from '../config'
import { PageHeader } from '../components/PageHeader'
import { Panel } from '../components/Panel'
import { StatusTag } from '../components/StatusTag'
import type { ExperimentEntry } from '../config'

function ExperimentCard({ experiment }: { experiment: ExperimentEntry }) {
  return (
    <Panel label={experiment.id}>
      <StatusTag label={experiment.status} />
      <h2 style={{ margin: '12px 0 8px', fontSize: '1.1rem' }}>
        {experiment.title}
      </h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        {experiment.description}
      </p>
      {experiment.link && (
        <p style={{ marginTop: 12 }}>
          <a href={experiment.link} target="_blank" rel="noreferrer">
            {'> OPEN LOG'}
          </a>
        </p>
      )}
    </Panel>
  )
}

export function Experiments() {
  return (
    <main className="page">
      <PageHeader
        kicker="LABORATORY"
        title="EXPERIMENTS"
        note="Research units recovered from the lab sector. Some are still running."
      />
      <div className="card-grid">
        {config.experiments.map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </main>
  )
}
