import { useNavigate } from 'react-router-dom'
import { config } from '../config'
import { ArrowUpRightIcon } from '../components/Icons'
import { PageHeader } from '../components/PageHeader'
import { StatusTag } from '../components/StatusTag'
import type { ExperimentEntry } from '../config'
import { trackEvent } from '../utils/analytics'
import { experimentSlug, formatLinkLabel } from '../utils/experiments'

function ExperimentCard({ experiment }: { experiment: ExperimentEntry }) {
  const navigate = useNavigate()
  const links = experiment.link ? Object.entries(experiment.link) : []
  return (
    <article
      className="card exp-card"
      onClick={() => {
        trackEvent('experiment_open', { title: experiment.title })
        navigate(`/experiments/${experimentSlug(experiment.title)}`)
      }}
    >
      <div className="exp-card__meta">
        <StatusTag label={experiment.status} />
        <span className="exp-card__id">{experiment.id}</span>
      </div>
      <h3 className="exp-card__title">{experiment.title}</h3>
      <p className="exp-card__desc">{experiment.description}</p>
      {links.length > 0 && (
        <div className="link-row">
          {links.map(([label, href]) => (
            <a
              key={label}
              className="arrow-link"
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.stopPropagation()
                trackEvent('experiment_link_click', { title: experiment.title, label })
              }}
            >
              {formatLinkLabel(label)} <ArrowUpRightIcon size={13} />
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export function Experiments() {
  return (
    <main className="page">
      <PageHeader
        kicker="The lab"
        title="Experiments"
        note="Small research studies from my lab time. Some are still running."
      />
      <div className="card-grid">
        {config.experiments.map((experiment) => (
          <ExperimentCard
            key={`${experiment.id}-${experiment.title}`}
            experiment={experiment}
          />
        ))}
      </div>
    </main>
  )
}
