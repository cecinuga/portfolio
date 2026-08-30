interface StateLineProps {
  loading?: boolean
  error?: string | null
  loadingText?: string
}

/** Pill-style loading/error indicator for async content. */
export function StateLine({
  loading,
  error,
  loadingText = 'Fetching data…',
}: StateLineProps) {
  if (loading) return <p className="state-line">{loadingText}</p>
  if (error) return <p className="state-line state-line--error">{`Error: ${error}`}</p>
  return null
}
