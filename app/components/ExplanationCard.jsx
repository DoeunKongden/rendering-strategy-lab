export default function ExplanationCard({ title, children }) {
  return (
    <div className="card glass p-6 mt-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
        📚 {title}
      </h3>
      <div className="text-slate-700 dark:text-slate-300">{children}</div>
    </div>
  )
}
