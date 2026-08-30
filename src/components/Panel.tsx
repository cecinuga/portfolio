import type { ReactNode } from 'react'

interface PanelProps {
  label: string
  children: ReactNode
}

/** Rounded surface container with a small pill label. */
export function Panel({ label, children }: PanelProps) {
  return (
    <section className="panel">
      <span className="panel__label">{label}</span>
      <div className="panel__body">{children}</div>
    </section>
  )
}
