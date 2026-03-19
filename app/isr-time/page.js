'use client'

import { useState, useEffect } from 'react'
import ItemList from '../components/ItemList'
import MetricsDisplay from '../components/MetricsDisplay'
import ExplanationCard from '../components/ExplanationCard'
import { refreshProductsAction } from '../actions/revalidate'

export default function ISRTimePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [revalidating, setRevalidating] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(null)
  const [message, setMessage] = useState('')

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/products?page=1&limit=25`, {
        next: { revalidate: 60 },
      })
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
        setLastRefresh(new Date().toLocaleString())
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleRevalidate = async () => {
    setRevalidating(true)
    setMessage('Revalidating via POST...')
    
    try {
      const result = await refreshProductsAction()
      if (result.success) {
        await fetchProducts()
        setMessage('Data revalidated successfully!')
      } else {
        setMessage('Revalidation failed')
      }
    } catch (error) {
      console.error('Error revalidating:', error)
      setMessage('Error refreshing data')
    } finally {
      setRevalidating(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

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

      <MetricsDisplay
        timestamp={lastRefresh || 'Loading...'}
        label="Last Fetched Time"
        badge="Auto-revalidates every 60 seconds"
        badgeColor="bg-purple-100 text-purple-800"
      />

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
          <p className="text-green-800 font-mono">revalidate: 60</p>
        </div>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 mb-6">
        <p className="text-purple-900 flex items-start">
          <span className="mr-2 mt-1">🔄</span>
          <span>
            <strong>How it works:</strong> The page is cached and served instantly.
            Every 60 seconds, Next.js will automatically regenerate the page in the background.
            Or click "Revalidate Now" to trigger a POST request and see the new fetch time!
          </span>
        </p>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🛍️ Products from API</h2>
          <button
            onClick={handleRevalidate}
            disabled={revalidating}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center justify-center space-x-2"
          >
            {revalidating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Revalidating...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Revalidate Now (POST)</span>
              </>
            )}
          </button>
        </div>
        
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-800 font-semibold">
            {message}
          </div>
        )}
        
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          This page uses <strong>Incremental Static Regeneration</strong> with a 60-second revalidation period.
          Data is cached but automatically refreshes every minute. Use the button to trigger a manual POST revalidation!
        </p>
        <ItemList items={products} title="Product" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">⏰ Revalidation Timer</h3>
          <p className="text-blue-800 text-sm">
            Next auto-revalidation in: <strong>60 seconds</strong>
          </p>
          <p className="text-blue-800 text-sm mt-2">
            Or click the button above to trigger POST revalidation immediately.
          </p>
          <div className="mt-2 bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full w-1/2 animate-pulse"></div>
          </div>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">📊 Cache Status</h3>
          <p className="text-green-800 text-sm">
            Pages are cached and served instantly. Background regeneration happens automatically.
          </p>
        </div>
      </div>

      <ExplanationCard title="How ISR Time-Based Works">
        <div className="space-y-4">
          <p>
            <strong>Incremental Static Regeneration (ISR)</strong> combines the best of SSG and SSR:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Pages are statically generated and cached for fast delivery</li>
            <li>Pages can be regenerated on a time-based schedule (e.g., every 60 seconds)</li>
            <li>Users always see cached content instantly - no waiting for data</li>
            <li>In the background, Next.js regenerates the page when the cache expires</li>
            <li>New users get the fresh content after regeneration completes</li>
          </ul>
          <p>
            <strong>Implementation:</strong> We use <code className="bg-blue-100 px-1 rounded">next: {'{ revalidate: 60 }'}</code> 
            to tell Next.js to regenerate the page every 60 seconds from <code className="bg-gray-100 px-1 rounded">{process.env.NEXT_PUBLIC_API_URL}/products</code>.
          </p>
        </div>
      </ExplanationCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
            <li>• More complex than pure SSG</li>
            <li>• Not real-time (min 60s delay)</li>
          </ul>
        </div>
      </div>

      <div className="card bg-slate-950 text-white p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Fetch</h3>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm mb-4">
          <code className="text-emerald-400">{`async function fetchProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(\`\${apiUrl}/products\`, {
    next: { 
      revalidate: 60  // Regenerate every 60 seconds
    }
  })
  return res.json()
}`}</code>
        </pre>
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - POST Server Action</h3>
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-emerald-400">{`'use server'
import { revalidateTag } from 'next/cache'

export async function refreshProductsAction() {
  revalidateTag('products')
  return { success: true }
}`}</code>
        </pre>
      </div>
    </div>
  )
}
