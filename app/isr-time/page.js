async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
  const res = await fetch(`${apiUrl}/products?page=1&limit=25`, {
    next: {
      revalidate: 60,
      tags: ['products']
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

import ClientTimestamp from '../components/ClientTimestamp'

export default async function ISRTimePage() {
  const products = await getProducts()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-5xl">⏱️</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            ISR - Time-Based
          </h1>
        </div>
        <span className="strategy-badge bg-purple-500 text-white text-lg px-4 py-2">
          ISR Time-Based - Auto Refresh Every 60s ⏱️
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 border-l-4 border-purple-500 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">🛍️ Product Count</h3>
          <p className="text-purple-800 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">⏱️ Revalidation</h3>
          <p className="text-blue-800 text-lg font-medium">60 seconds</p>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">🏷️ Cache Method</h3>
          <p className="text-green-800 font-mono">revalidate: 60 + tag</p>
        </div>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 mb-6">
        <p className="text-purple-900 flex items-start">
          <span className="mr-2 mt-1">🔄</span>
          <span>
            <strong>How it works:</strong> This page is rendered on the server with ISR.
            Every 60 seconds, Next.js will automatically regenerate the page in the background.
            Or click "Revalidate Now" to trigger a manual revalidation and see the new fetch time!
          </span>
        </p>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🛍️ Products from API</h2>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          This page uses <strong>Incremental Static Regeneration</strong> with a 60-second revalidation period.
          Data is cached but automatically refreshes every minute. Use the button to trigger a manual revalidation!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="card hover:shadow-lg transition-shadow p-4"
            >
              <div className="flex items-start space-x-4">
                <div className="relative flex-shrink-0">
                  <span className="bg-purple-500 text-white text-lg font-bold px-3 py-2 rounded-lg">
                    #{item.id}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {item.name}
                  </h3>
                  {item.price && (
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">${item.price}</p>
                  )}
                </div>
              </div>
              {item.createdAt && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Added: <ClientTimestamp value={new Date(item.createdAt).toLocaleDateString()} className="inline" />
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">⏰ Revalidation Timer</h3>
          <p className="text-blue-800 text-sm">
            Next auto-revalidation in: <strong>60 seconds</strong>
          </p>
          <p className="text-blue-800 text-sm mt-2">
            Next.js automatically regenerates this page every 60 seconds from the API.
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">📊 Cache Status</h3>
          <p className="text-green-800 text-sm">
            Page is statically generated and cached. Background regeneration happens automatically every 60 seconds.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 mb-6">
        <p className="text-amber-900 flex items-start">
          <span className="mr-2 mt-1">💡</span>
          <span>
            <strong>Note:</strong> The &quot;Revalidate Now&quot; button on the home page uses <code className="bg-amber-100 px-1 rounded">revalidateTag('products')</code> which will invalidate this page&apos;s cache and trigger an immediate regeneration.
          </span>
        </p>
      </div>

      <div className="bg-slate-50 border-l-4 border-slate-500 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-slate-900 mb-2">🔑 Server Component + ISR</h3>
        <p className="text-slate-800 text-sm">
          This page is a <code className="bg-slate-200 px-1 rounded">Server Component</code> that fetches data at request time.
          The <code className="bg-slate-200 px-1 rounded">next: {'{ revalidate: 60, tags: ["products"] }'}</code> option enables:
        </p>
        <ul className="list-disc list-inside text-slate-700 text-sm mt-2 space-y-1">
          <li><strong>Time-based revalidation:</strong> Page auto-regenerates every 60 seconds</li>
          <li><strong>Tag-based revalidation:</strong> Manual revalidation via <code className="bg-slate-200 px-1 rounded">revalidateTag('products')</code></li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">✅ Best For:</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• E-commerce product pages</li>
            <li>• News articles and blogs</li>
            <li>• Pages with frequently updated data</li>
            <li>• High-traffic sites needing fast delivery</li>
          </ul>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">⚠️ Consider:</h3>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• Potential for slightly stale data</li>
            <li>• Need to choose appropriate revalidation time</li>
            <li>• Not real-time (min 60s delay)</li>
          </ul>
        </div>
      </div>

      <div className="card bg-slate-950 text-white p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Server Component with ISR</h3>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm mb-4">
          <code className="text-emerald-400">{`// This is a Server Component (no 'use client')
async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(\`\${apiUrl}/products\`, {
    next: { 
      revalidate: 60,        // Time-based: regenerate every 60s
      tags: ['products']     // Tag-based: allow manual revalidation
    }
  })
  return res.json()
}

export default async function ISRTimePage() {
  const products = await getProducts()
  return <ProductList items={products} />
}`}</code>
        </pre>
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Server Action for Revalidation</h3>
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-emerald-400">{`'use server'
import { revalidateTag } from 'next/cache'

export async function refreshProductsAction() {
  revalidateTag('products')
}`}</code>
        </pre>
      </div>
    </div>
  )
}
