import { PageHeader } from '../components/PageHeader'
import { Panel } from '../components/Panel'
import { StateLine } from '../components/StateLine'
import { Timeline, TimelineItem } from '../components/Timeline'
import { useResume } from '../hooks/useResume'
import { findSection, type ResumeEntry } from '../utils/resumeParser'

function EntryBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul style={{ marginTop: 8, paddingLeft: 20, color: 'var(--text-dim)' }}>
      {bullets.map((b) => (
        <li key={b}>{b}</li>
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
  const education = resume ? findSection(resume, 'EDUCATION') : undefined

  return (
    <main className="page">
      <PageHeader
        kicker="SERVICE RECORD"
        title="WORK EXPERIENCE"
        note="Extracted at runtime from the Resume stored on this terminal."
      />
      <StateLine
        loading={loading}
        error={error}
        loadingText="> PARSING RESUME ..."
      />
      {experience && <ExperienceTimeline entries={experience.entries} />}
      {education && education.entries.length > 0 && (
        <div style={{ marginTop: 64 }}>
          <Panel label="EDUCATION">
            <ExperienceTimeline entries={education.entries} />
          </Panel>
        </div>
      )}
    </main>
  )
}
