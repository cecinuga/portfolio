type StatusVariant = 'ok' | 'warn' | 'danger' | 'muted'

interface StatusTagProps {
  label: string
  variant?: StatusVariant
}

const VARIANT_BY_STATUS: Record<string, StatusVariant> = {
  RUNNING: 'ok',
  ONLINE: 'ok',
  UNSTABLE: 'warn',
  ARCHIVED: 'muted',
  OFFLINE: 'danger',
}

/** Small pill status badge; infers color from known statuses. */
export function StatusTag({ label, variant }: StatusTagProps) {
  const resolved = variant ?? VARIANT_BY_STATUS[label.toUpperCase()] ?? 'muted'
  return <span className={`status-tag status-tag--${resolved}`}>{label}</span>
}
