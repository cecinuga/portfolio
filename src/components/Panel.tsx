import type { ReactNode } from 'react'

interface PanelProps {
  label: string
  children: ReactNode
}

/** Industrial panel container with a corner label. */
export function Panel({ label, children }: PanelProps) {
  return (
    <section className="panel">
      <span className="panel__label">{label}</span>
      <div className="panel__body">{children}</div>
    </section>
  )
}
