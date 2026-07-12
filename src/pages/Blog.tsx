import { config } from '../config'
import { PageHeader } from '../components/PageHeader'
import { Timeline, TimelineItem } from '../components/Timeline'

export function Blog() {
  return (
    <main className="page">
      <PageHeader
        kicker="OPERATOR LOGS"
        title="BLOG"
        note="Entries written by the last operator, recovered from local storage."
      />
      <Timeline>
        {config.blog.map((post) => (
          <TimelineItem
            key={post.id}
            title={post.title}
            subtitle={post.id}
            period={post.date}
          >
            <p style={{ color: 'var(--text-dim)', marginTop: 8 }}>
              {post.excerpt}
            </p>
            {post.link && (
              <p style={{ marginTop: 8 }}>
                <a href={post.link} target="_blank" rel="noreferrer">
                  {'> READ FULL LOG'}
                </a>
              </p>
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </main>
  )
}
