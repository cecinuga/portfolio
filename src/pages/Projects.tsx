import { PageHeader } from '../components/PageHeader'
import { ReadmePreview } from '../components/ReadmePreview'
import { StateLine } from '../components/StateLine'
import { Timeline, TimelineItem } from '../components/Timeline'
import { useRepoReadmes } from '../hooks/useRepoReadmes'

export function Projects() {
  const { data: readmes, loading, error } = useRepoReadmes()

  return (
    <main className="page">
      <PageHeader
        kicker="STORAGE VAULT"
        title="MY PROJECTS"
        note="GitHub repositories recovered at runtime. Each unit shows the first lines of its README — follow '... continue' to open the full repository."
      />
      <StateLine
        loading={loading}
        error={error}
        loadingText="> FETCHING REPOSITORIES FROM GITHUB ..."
      />
      {readmes && (
        <Timeline>
          {readmes.map((readme) => (
            <TimelineItem
              key={readme.repo}
              title={readme.repo.split('/')[1] ?? readme.repo}
              subtitle={readme.repo}
            >
              <ReadmePreview readme={readme} />
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </main>
  )
}
