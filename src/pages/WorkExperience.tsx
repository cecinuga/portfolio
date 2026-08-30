import { PageHeader } from '../components/PageHeader'
import { StateLine } from '../components/StateLine'
import { Timeline, TimelineItem } from '../components/Timeline'
import { useResume } from '../hooks/useResume'
import { findSection, type ResumeEntry } from '../utils/resumeParser'

function EntryBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="entry-bullets" style={{ marginTop: 12 }}>
      {bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  )
}

function ExperienceTimeline({ entries }: { entries: ResumeEntry[] }) {
  return (
    <Timeline>
      {entries.map((entry) => (
        <TimelineItem
          key={`${entry.title}-${entry.period}`}
          title={entry.title}
          subtitle={entry.organization}
          period={entry.period}
        >
          <EntryBullets bullets={entry.bullets} />
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export function WorkExperience() {
  const { data: resume, loading, error } = useResume()
  const experience = resume ? findSection(resume, 'EXPERIENCE') : undefined

  return (
    <main className="page">
      <PageHeader
        kicker="Career"
        title="Work Experience"
        note="Where I've worked and what I did there — straight from my resume."
      />
      <StateLine loading={loading} error={error} loadingText="Parsing resume…" />
      {experience && <ExperienceTimeline entries={experience.entries} />}
    </main>
  )
}
