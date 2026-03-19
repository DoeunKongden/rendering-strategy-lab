'use client'

import { useState, useEffect } from 'react'
import ItemList from '../components/ItemList'
import MetricsDisplay from '../components/MetricsDisplay'
import ExplanationCard from '../components/ExplanationCard'

export default function SSRPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refetching, setRefetching] = useState(false)
  const [lastFetch, setLastFetch] = useState(null)
  const [message, setMessage] = useState('')

  const fetchProducts = async (showLoading = false) => {
    if (showLoading) setRefetching(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/products?page=1&limit=25`, {
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
        setLastFetch(new Date().toLocaleString())
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      if (showLoading) setRefetching(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleRefetch = async () => {
    await fetchProducts(true)
    setMessage('Fresh data fetched via POST request!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-5xl">⚡</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Server-Side Rendering (SSR)
          </h1>
        </div>
        <span className="strategy-badge bg-blue-500 text-white text-lg px-4 py-2">
          SSR - Always Fresh ⚡
        </span>
      </div>

      <MetricsDisplay
        timestamp={lastFetch || 'Loading...'}
        label="Current Timestamp"
        badge="Data fetched on request"
        badgeColor="bg-blue-100 text-blue-800"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">🛍️ Product Count</h3>
          <p className="text-blue-800 dark:text-blue-200 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-indigo-100 dark:bg-indigo-900/30 border-l-4 border-indigo-500 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">⚡ Rendering</h3>
          <p className="text-indigo-800 dark:text-indigo-200 text-lg font-medium">Server-Side</p>
        </div>
        <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">📦 Cache Method</h3>
          <p className="text-red-800 dark:text-red-200 font-mono">no-store</p>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🛍️ Products from API</h2>
          <button
            onClick={handleRefetch}
            disabled={refetching}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center space-x-2"
          >
            {refetching ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Fetching...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Fetch Fresh Data (POST)</span>
              </>
            )}
          </button>
        </div>
        
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 font-semibold">
            {message}
          </div>
        )}
        
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          This page fetches fresh data from the API on <strong>every request</strong>.
          Click the button to see the timestamp change each time data is fetched!
        </p>
        <ItemList items={products} title="Product" />
      </div>

      <ExplanationCard title="How SSR Works">
        <div className="space-y-4">
          <p>
            <strong>Server-Side Rendering (SSR)</strong> means that the HTML for a page is 
            generated on the server for each request. In Next.js, when you use SSR:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Every time a user requests a page, the server makes a fresh API call</li>
            <li>The server waits for the data to arrive before sending HTML to the browser</li>
            <li>The page content is always up-to-date and reflects the current database state</li>
            <li>This happens on every single request - there's no caching by default</li>
          </ul>
          <p>
            <strong>Implementation:</strong> We use <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">cache: 'no-store'</code> in our fetch call to prevent caching.
            This means every request to the server triggers a fresh API call to <code className="bg-gray-100 dark:bg-slate-800 px-1 rounded">{process.env.NEXT_PUBLIC_API_URL}/products</code>.
          </p>
        </div>
      </ExplanationCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">✅ Best For:</h3>
          <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
            <li>• Dashboards with real-time data</li>
            <li>• Pages with user-specific content</li>
            <li>• SEO-critical pages that change frequently</li>
            <li>• Applications requiring fresh data on every load</li>
          </ul>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">⚠️ Consider:</h3>
          <ul className="text-red-800 dark:text-red-200 text-sm space-y-1">
            <li>• Higher server load and costs</li>
            <li>• Slower response times compared to SSG</li>
            <li>• Database queries on every request</li>
            <li>• May need caching layer for better performance</li>
          </ul>
        </div>
      </div>

      <div className="card bg-slate-950 text-white p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - SSR Fetch</h3>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-emerald-400">{`async function fetchProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(\`\${apiUrl}/products\`, {
    cache: 'no-store'  // Don't cache, fetch fresh data
  })
  return res.json()
}`}</code>
        </pre>
      </div>
    </div>
  )
}
