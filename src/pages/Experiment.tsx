import { Link, useParams } from 'react-router-dom'
import { MarkdownView } from '../components/MarkdownView'
import { PageHeader } from '../components/PageHeader'
import { Panel } from '../components/Panel'
import { StateLine } from '../components/StateLine'
import { StatusTag } from '../components/StatusTag'
import { useExperimentReadme } from '../hooks/useExperimentReadme'
import { experimentReadmeLink, findExperimentBySlug } from '../utils/experiments'

/** Single-experiment page: renders the README behind the experiment's GitHub link. */
export function Experiment() {
  const { slug } = useParams()
  const experiment = findExperimentBySlug(slug ?? '')
  const { data: readme, loading, error } = useExperimentReadme(
    experiment ? experimentReadmeLink(experiment) : null,
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

  // Single definition reused at the top and bottom of the page so both
  // link strips stay identical in behaviour and styling. An experiment can
  // expose multiple entry points (github, web-app, ...); each becomes its
  // own ghost-button, laid out horizontally in the same accent color.
  const linkEntries = experiment.link ? Object.entries(experiment.link) : []
  const linkButtons =
    linkEntries.length > 0 ? (
      <div className="button-row">
        {linkEntries.map(([label, href]) => (
          <a
            key={label}
            className="ghost-button"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {label.toUpperCase()}
          </a>
        ))}
      </div>
    ) : null

  return (
    <main className="page">
      <PageHeader
        variant="feature"
        kicker={`LABORATORY // ${experiment.id}`}
        title={experiment.title}
        note={experiment.description}
        action={linkButtons}
      />
      <StatusTag label={experiment.status} />
      <StateLine
        loading={loading}
        error={error}
        loadingText="> RETRIEVING EXPERIMENT LOG FROM GITHUB ..."
      />
      {readme && !loading && (
        <Panel label={experiment.id}>
          {readme.markdown ? (
            <MarkdownView
              markdown={readme.markdown}
              assetBase={readme.assetBase}
              linkBase={readme.linkBase}
            />
          ) : (
            <p className="state-line">{'> README NOT FOUND IN ARCHIVE'}</p>
          )}
        </Panel>
      )}
      {linkButtons && (
        <div className="page-actions">
          <span className="page-actions__label">{'> END OF LOG'}</span>
          {linkButtons}
        </div>
      )}
    </main>
  )
}
