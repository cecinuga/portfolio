import { Link } from 'react-router-dom'
import { config } from '../config'
import { PageHeader } from '../components/PageHeader'
import { Timeline, TimelineItem } from '../components/Timeline'

export function Blog() {
  return (
    <main className="page">
      <PageHeader kicker="Notes" title="Blog" />
      {config.blog.length === 0 ? (
        <div className="card empty-card">
          <h2>Nothing here yet</h2>
          <p>
            The first posts are on the way. In the meantime, the{' '}
            <Link to="/projects">projects</Link> page has plenty to read.
          </p>
        </div>
      ) : (
        <Timeline>
          {config.blog.map((post) => (
            <TimelineItem
              key={post.id}
              title={post.title}
              subtitle={post.id}
              period={post.date}
            >
              <p style={{ color: 'var(--muted)', marginTop: 8 }}>
                {post.excerpt}
              </p>
              {post.link && (
                <p style={{ marginTop: 8 }}>
                  <a href={post.link} target="_blank" rel="noreferrer">
                    Read the full post
                  </a>
                </p>
              )}
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </main>
  )
}
