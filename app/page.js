import Link from 'next/link'
import StrategyCard from './components/StrategyCard'
import RevalidateButtons from './components/RevalidateButtons'

export default function Home() {
  const strategies = [
    {
      title: 'SSR',
      badge: 'Server-Side Rendering',
      badgeColor: 'bg-blue-500',
      icon: '⚡',
      description: 'Server-Side Rendering fetches data on every request. The server generates fresh HTML for each page view.',
      speed: 2,
      freshness: 5,
      pros: [
        'Always fresh data',
        'Great for SEO',
        'Works without JavaScript',
        'Good for personalized content',
      ],
      cons: [
        'Slower response times',
        'Server load on every request',
        'Higher infrastructure costs',
      ],
    },
    {
      title: 'SSG',
      badge: 'Static Site Generation',
      badgeColor: 'bg-green-500',
      icon: '🏠',
      description: 'Static Site Generation creates HTML at build time. Pages are pre-built and served instantly.',
      speed: 5,
      freshness: 1,
      pros: [
        'Lightning fast loading',
        'Excellent SEO',
        'Minimal server load',
        'Very cheap to host',
      ],
      cons: [
        'Data never changes',
        'Full rebuild for updates',
        'Long build times with many pages',
      ],
    },
    {
      title: 'ISR',
      badge: 'Incremental Static Regeneration',
      badgeColor: 'bg-purple-500',
      icon: '🔄',
      description: 'ISR combines the best of both worlds. Pages are statically generated but can be regenerated on-demand or on a schedule.',
      speed: 4,
      freshness: 4,
      pros: [
        'Fast loading (cached)',
        'Fresh data when needed',
        'Reduced server load',
        'Scale to millions of pages',
      ],
      cons: [
        'Complex caching logic',
        'Potential stale data',
        'Requires understanding of cache behavior',
      ],
    },
    {
      title: 'CSR',
      badge: 'Client-Side Rendering',
      badgeColor: 'bg-amber-500',
      icon: '🌐',
      description: 'Client-Side Rendering loads an empty shell and fetches data in the browser using JavaScript.',
      speed: 1,
      freshness: 5,
      pros: [
        'Highly interactive',
        'Rich user experiences',
        'Great for dashboards',
        'Works well with APIs',
      ],
      cons: [
        'Poor initial SEO',
        'Longer time to interactive',
        'Requires JavaScript',
        'May show loading states',
      ],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
          Next.js Rendering Strategies
          <span className="block text-3xl mt-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Learning Lab
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
          Explore the four main rendering strategies in Next.js through interactive examples.
          See how each approach handles data fetching, caching, and performance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/ssr"
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-lg hover:bg-blue-600 transition-all"
          >
            Start Learning ⚡
          </Link>
          <a
            href="#strategies"
            className="bg-white/80 text-slate-800 px-6 py-3 rounded-full font-semibold shadow-sm hover:shadow-lg hover:bg-white transition-all ring-1 ring-slate-200"
          >
            View All Strategies
          </a>
        </div>
      </div>

      <div id="strategies" className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
          Choose a Rendering Strategy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategies.map((strategy) => (
            <StrategyCard
              key={strategy.title}
              {...strategy}
            />
          ))}
        </div>
      </div>

      <div className="card p-8 mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
          Comparison Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Strategy</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Speed</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Freshness</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">SEO</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Server Load</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-blue-50">
                <td className="px-4 py-3 font-medium text-blue-600">SSR</td>
                <td className="px-4 py-3 text-center">⚡⚡</td>
                <td className="px-4 py-3 text-center">🔄🔄🔄🔄🔄</td>
                <td className="px-4 py-3 text-center">✅ Excellent</td>
                <td className="px-4 py-3 text-center">🔴 High</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="px-4 py-3 font-medium text-green-600">SSG</td>
                <td className="px-4 py-3 text-center">⚡⚡⚡⚡⚡</td>
                <td className="px-4 py-3 text-center">🔄</td>
                <td className="px-4 py-3 text-center">✅ Excellent</td>
                <td className="px-4 py-3 text-center">🟢 None</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-purple-50">
                <td className="px-4 py-3 font-medium text-purple-600">ISR</td>
                <td className="px-4 py-3 text-center">⚡⚡⚡⚡</td>
                <td className="px-4 py-3 text-center">🔄🔄🔄🔄</td>
                <td className="px-4 py-3 text-center">✅ Excellent</td>
                <td className="px-4 py-3 text-center">🟡 Medium</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-amber-50">
                <td className="px-4 py-3 font-medium text-amber-600">CSR</td>
                <td className="px-4 py-3 text-center">⚡</td>
                <td className="px-4 py-3 text-center">🔄🔄🔄🔄🔄</td>
                <td className="px-4 py-3 text-center">❌ Poor (initially)</td>
                <td className="px-4 py-3 text-center">🟢 None</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card glass p-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Ready to Learn?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
          Click on any rendering strategy above to see it in action.
          Each page includes live examples, performance metrics, and detailed explanations.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link href="/ssr" className="bg-white px-4 py-3 rounded-lg shadow hover:shadow-lg transition-all font-semibold text-blue-600">
            SSR Demo
          </Link>
          <Link href="/ssg" className="bg-white px-4 py-3 rounded-lg shadow hover:shadow-lg transition-all font-semibold text-green-600">
            SSG Demo
          </Link>
          <Link href="/isr-time" className="bg-white px-4 py-3 rounded-lg shadow hover:shadow-lg transition-all font-semibold text-purple-600">
            ISR Time
          </Link>
          <Link href="/isr-ondemand" className="bg-white px-4 py-3 rounded-lg shadow hover:shadow-lg transition-all font-semibold text-indigo-600">
            ISR On-Demand
          </Link>
          <Link href="/csr" className="bg-white px-4 py-3 rounded-lg shadow hover:shadow-lg transition-all font-semibold text-amber-600">
            CSR Demo
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/post-data" className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all font-semibold">
            <span className="mr-2">📝</span>
            Create & Revalidate Data
          </Link>
        </div>
      </div>

      <RevalidateButtons />
    </div>
  )
}
