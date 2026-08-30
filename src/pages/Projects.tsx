import { PageHeader } from '../components/PageHeader'
import { ReadmePreview } from '../components/ReadmePreview'
import { StateLine } from '../components/StateLine'
import { useRepoReadmes } from '../hooks/useRepoReadmes'

export function Projects() {
  const { data: readmes, loading, error } = useRepoReadmes()

  return (
    <main className="page">
      <PageHeader
        kicker="Open source"
        title="My Projects"
        note="My GitHub repositories, fetched live. Each card shows the first lines of its README — follow the link to read the rest."
      />
      <StateLine
        loading={loading}
        error={error}
        loadingText="Fetching repositories from GitHub…"
      />
      {readmes && (
        <div className="stack">
          {readmes.map((readme) => (
            <article key={readme.repo} className="card project-card">
              <div className="project-card__head">
                <h3>{readme.repo.split('/')[1] ?? readme.repo}</h3>
                <span className="project-card__repo">{readme.repo}</span>
              </div>
              <ReadmePreview readme={readme} />
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
