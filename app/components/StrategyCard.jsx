export default function StrategyCard({ title, badge, badgeColor, description, pros, cons, speed, freshness, icon }) {
  return (
    <div className="card card-hover overflow-hidden">
      <div className={`${badgeColor} text-white px-6 py-5`}
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(0,0,0,0.05))' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <span className="strategy-badge bg-white/20 mt-1">
                {badge}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">⚡ Speed</div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${
                    i < speed ? 'bg-blue-500' : 'bg-blue-200 dark:bg-blue-800'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
            <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">🔄 Freshness</div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${
                    i < freshness ? 'bg-green-500' : 'bg-green-200 dark:bg-green-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Pros</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">❌ Cons</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
