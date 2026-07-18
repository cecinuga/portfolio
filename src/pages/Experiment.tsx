import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Panel } from '../components/Panel'
import { StateLine } from '../components/StateLine'
import { StatusTag } from '../components/StatusTag'
import { useExperimentReadme } from '../hooks/useExperimentReadme'
import { findExperimentBySlug } from '../utils/experiments'

/** Single-experiment page: renders the README behind the experiment's GitHub link. */
export function Experiment() {
  const { slug } = useParams()
  const experiment = findExperimentBySlug(slug ?? '')
  const { data: readme, loading, error } = useExperimentReadme(
    experiment?.link ?? null,
  )

  if (!experiment) {
    return (
      <main className="page">
        <PageHeader
          kicker="LABORATORY"
          title="UNIT NOT FOUND"
          note="No experiment matches this designation in the archive."
        />
        <p className="state-line state-line--error">
          {'> RECORD MISSING — RETURN TO '}
          <Link to="/experiments">EXPERIMENTS</Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page">
      <PageHeader
        kicker={`LABORATORY // ${experiment.id}`}
        title={experiment.title}
        note={experiment.description}
        action={
          experiment.link && (
            <a
              className="ghost-button"
              href={experiment.link}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>
          )
        }
      />
      <StatusTag label={experiment.status} />
      <StateLine
        loading={loading}
        error={error}
        loadingText="> RETRIEVING EXPERIMENT LOG FROM GITHUB ..."
      />
      {readme && !loading && (
        <Panel label={experiment.id}>
          <div className="readme-preview">
            {readme.imageUrl && (
              <img
                className="repo-image"
                src={readme.imageUrl}
                alt={`${experiment.title} preview`}
                loading="lazy"
              />
            )}
            {readme.lines.length > 0 ? (
              <pre className="readme-full">{readme.lines.join('\n')}</pre>
            ) : (
              <p className="state-line">{'> README NOT FOUND IN ARCHIVE'}</p>
            )}
          </div>
        </Panel>
      )}
    </main>
  )
}
