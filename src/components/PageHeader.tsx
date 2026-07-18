import type { ReactNode } from 'react'

interface PageHeaderProps {
  kicker: string
  title: string
  note?: string
  /** Optional action (e.g. a button) rendered next to the title. */
  action?: ReactNode
}

/** Standard page heading block with kicker line and optional note. */
export function PageHeader({ kicker, title, note, action }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header__kicker">{kicker}</div>
      <div className="page-header__row">
        <h1 className="page-header__title">{title}</h1>
        {action}
      </div>
      {note && <p className="page-header__note">{note}</p>}
    </div>
  )
}
