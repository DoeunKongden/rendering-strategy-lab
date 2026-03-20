import ClientTimestamp from './ClientTimestamp'

export default function MetricsDisplay({ timestamp, label, badge, badgeColor }) {
  const safeId = `ts-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <div className="card glass p-5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
            {label}
          </h2>
          <span id={safeId} suppressHydrationWarning className="text-2xl font-mono font-bold text-slate-900 dark:text-slate-100">
            {timestamp}
          </span>
          <ClientTimestamp id={safeId} value={timestamp} />
        </div>
        {badge && (
          <span className={`strategy-badge ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  )
}
