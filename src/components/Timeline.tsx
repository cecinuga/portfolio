import type { ReactNode } from 'react'

interface TimelineProps {
  children: ReactNode
}

/** Vertical timeline container; children should be TimelineItem. */
export function Timeline({ children }: TimelineProps) {
  return <div className="timeline">{children}</div>
}

interface TimelineItemProps {
  title: string
  subtitle?: string
  period?: string
  children?: ReactNode
}

/** One entry on the vertical timeline. */
export function TimelineItem({
  title,
  subtitle,
  period,
  children,
}: TimelineItemProps) {
  return (
    <article className="timeline-item">
      <span className="timeline-item__node" aria-hidden="true" />
      {period && (
        <div className="timeline-item__meta">
          <span className="timeline-item__period">{period}</span>
        </div>
      )}
      <h2 className="timeline-item__title">{title}</h2>
      {subtitle && <span className="timeline-item__subtitle">{subtitle}</span>}
      {children}
    </article>
  )
}
