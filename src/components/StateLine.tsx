interface StateLineProps {
  loading?: boolean
  error?: string | null
  loadingText?: string
}

/** Terminal-style loading/error indicator for async content. */
export function StateLine({
  loading,
  error,
  loadingText = '> RETRIEVING DATA FROM ARCHIVE ...',
}: StateLineProps) {
  if (loading) return <p className="state-line">{loadingText}</p>
  if (error) return <p className="state-line state-line--error">{`> ERROR: ${error}`}</p>
  return null
}
