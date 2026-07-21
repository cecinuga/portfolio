import type { ReactNode } from 'react'

interface PageHeaderProps {
  kicker: string
  title: string
  note?: string
  /** Optional action (e.g. a button) rendered next to the title. */
  action?: ReactNode
  /** 'feature' promotes the note to a prominent, highly readable lead line. */
  variant?: 'default' | 'feature'
}

/** Standard page heading block with kicker line and optional note. */
export function PageHeader({
  kicker,
  title,
  note,
  action,
  variant = 'default',
}: PageHeaderProps) {
  const rootClass =
    variant === 'feature' ? 'page-header page-header--feature' : 'page-header'
  return (
    <div className={rootClass}>
      <div className="page-header__kicker">{kicker}</div>
      <div className="page-header__row">
        <h1 className="page-header__title">{title}</h1>
        {action}
      </div>
      {note && <p className="page-header__note">{note}</p>}
    </div>
  )
}
