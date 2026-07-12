interface PageHeaderProps {
  kicker: string
  title: string
  note?: string
}

/** Standard page heading block with kicker line and optional note. */
export function PageHeader({ kicker, title, note }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header__kicker">{kicker}</div>
      <h1 className="page-header__title">{title}</h1>
      {note && <p className="page-header__note">{note}</p>}
    </div>
  )
}
