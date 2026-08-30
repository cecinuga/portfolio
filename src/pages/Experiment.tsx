import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowUpRightIcon } from '../components/Icons'
import { MarkdownView } from '../components/MarkdownView'
import { Panel } from '../components/Panel'
import { StateLine } from '../components/StateLine'
import { StatusTag } from '../components/StatusTag'
import { useExperimentReadme } from '../hooks/useExperimentReadme'
import {
  experimentReadmeLink,
  findExperimentBySlug,
  formatLinkLabel,
} from '../utils/experiments'

/** Single-experiment page: renders the README behind the experiment's GitHub link. */
export function Experiment() {
  const { slug } = useParams()
  const experiment = findExperimentBySlug(slug ?? '')
  const { data: readme, loading, error } = useExperimentReadme(
    experiment ? experimentReadmeLink(experiment) : null,
  )

  if (!experiment) {
    return (
      <main className="page detail">
        <Link to="/experiments" className="back-button">
          <ArrowLeftIcon size={14} />
          All experiments
        </Link>
        <h1 className="detail__title">Experiment not found</h1>
        <p className="detail__note">
          No experiment matches this address —{' '}
          <Link to="/experiments">back to the list</Link>.
        </p>
      </main>
    )
  }

  const linkEntries = experiment.link ? Object.entries(experiment.link) : []

  return (
    <main className="page detail">
      <Link to="/experiments" className="back-button">
        <ArrowLeftIcon size={14} />
        All experiments
      </Link>
      <div className="exp-card__meta" style={{ marginBottom: 16 }}>
        <StatusTag label={experiment.status} />
        <span className="exp-card__id">{experiment.id}</span>
      </div>
      <h1 className="detail__title">{experiment.title}</h1>
      <p className="detail__note">{experiment.description}</p>
      {linkEntries.length > 0 && (
        <div className="link-row" style={{ marginBottom: 36 }}>
          {linkEntries.map(([label, href]) => (
            <a
              key={label}
              className="arrow-link"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {formatLinkLabel(label)} <ArrowUpRightIcon size={13} />
            </a>
          ))}
        </div>
      )}
      <StateLine
        loading={loading}
        error={error}
        loadingText="Fetching README from GitHub…"
      />
      {readme && !loading && (
        readme.markdown ? (
          <Panel label={experiment.id}>
            <MarkdownView
              markdown={readme.markdown}
              assetBase={readme.assetBase}
              linkBase={readme.linkBase}
            />
          </Panel>
        ) : (
          <div className="card" style={{ color: 'var(--muted)' }}>
            README not found — open the links above to browse the code on
            GitHub.
          </div>
        )
      )}
    </main>
  )
}
