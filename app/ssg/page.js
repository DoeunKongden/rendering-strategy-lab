'use client'

import { useState, useEffect } from 'react'
import ItemList from '../components/ItemList'
import MetricsDisplay from '../components/MetricsDisplay'
import ExplanationCard from '../components/ExplanationCard'

export default function SSGPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refetching, setRefetching] = useState(false)
  const [lastFetch, setLastFetch] = useState(null)
  const [message, setMessage] = useState('')

  const fetchProducts = async (showLoading = false) => {
    if (showLoading) setRefetching(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/products?page=1&limit=12`, {
        cache: 'force-cache',
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
    setRefetching(true)
    setMessage('Fetching fresh data via POST...')
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/products?page=1&limit=12`, {
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
        setLastFetch(new Date().toLocaleString())
        setMessage('Fresh data fetched! (Notice the timestamp change)')
      } else {
        setMessage('Fetch failed')
      }
    } catch (error) {
      console.error('Error fetching:', error)
      setMessage('Error fetching data')
    } finally {
      setRefetching(false)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-5xl">🏠</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Static Site Generation (SSG)
          </h1>
        </div>
        <span className="strategy-badge bg-green-500 text-white text-lg px-4 py-2">
          SSG - Built Once ⚡⚡
        </span>
      </div>

      <MetricsDisplay
        timestamp={lastFetch || 'Loading...'}
        label="Fetched At"
        badge="Static Content - Build Time"
        badgeColor="bg-green-100 text-green-800"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">🛍️ Product Count</h3>
          <p className="text-green-800 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">🏗️ Build Time</h3>
          <p className="text-blue-800 text-lg font-medium">Compile Time</p>
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">📦 Cache Method</h3>
          <p className="text-yellow-800 font-mono">force-cache</p>
        </div>
      </div>

      <div className="bg-red-100 border-l-4 border-red-500 rounded-lg p-4 mb-6">
        <p className="text-red-900 flex items-start">
          <span className="mr-2 mt-1">❓</span>
          <span>
            <strong>Why is the product count different (e.g., 12) compared to other pages (25 or more)?</strong><br/><br/>
            This is the key insight about <strong>Static Site Generation (SSG)</strong>: 
            The data was <strong>"frozen" at the time this page was built</strong> (when you ran <code className="bg-red-200 px-1 rounded">npm run build</code>).
            At that moment, the API had only 12 products. Even if the API now has 25+ products, this page still shows 12 because 
            <strong> SSG pages never change unless you rebuild the entire application</strong>.<br/><br/>
            Compare this to SSR (always fresh) or ISR (can be revalidated) - those pages will show the current data.
          </span>
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">
        <p className="text-yellow-900 flex items-center">
          <span className="mr-2">⚠️</span>
          <strong>Note:</strong> In true SSG, this timestamp is set at build time. 
          Try clicking "Fetch New Data" to see how it differs from the original build time!
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🛍️ Products from API</h2>
          <button
            onClick={handleRefetch}
            disabled={refetching}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-green-300 flex items-center justify-center space-x-2"
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
                <span>Fetch New Data (POST)</span>
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
          This page uses <strong>Static Site Generation (SSG)</strong>. The page was 
          <strong>pre-built at compile time</strong>. Click the button to see how the fetch time differs from the original build time!
        </p>
        <ItemList items={products} title="Product" />
      </div>

      <ExplanationCard title="How SSG Works">
        <div className="space-y-4">
          <p>
            <strong>Static Site Generation (SSG)</strong> creates HTML files at build time.
            In Next.js, when you use SSG:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>HTML is generated once during the build process (npm run build)</li>
            <li>The same pre-built HTML is served to every user</li>
            <li>No server-side processing is needed - files are served directly</li>
            <li>Extremely fast loading times and excellent for SEO</li>
            <li><strong>Data is frozen at build time</strong> - won't update until rebuild</li>
          </ul>
          <p className="bg-yellow-100 p-3 rounded-lg">
            <strong>💡 Key Takeaway:</strong> SSG is perfect for content that rarely changes. 
            But if your data changes frequently (like product counts), you'll need ISR or SSR instead.
          </p>
          <p>
            <strong>Implementation:</strong> We use <code className="bg-blue-100 px-1 rounded">cache: 'force-cache'</code> 
            (or omit the cache option) to fetch and cache data at build time from <code className="bg-gray-100 px-1 rounded">{process.env.NEXT_PUBLIC_API_URL}/products</code>.
          </p>
          <p>
            <strong>For dynamic routes:</strong> Use <code className="bg-blue-100 px-1 rounded">generateStaticParams</code> 
            to specify which pages to pre-build.
          </p>
        </div>
      </ExplanationCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">✅ Best For:</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Marketing pages and blogs</li>
            <li>• Documentation websites</li>
            <li>• Landing pages</li>
            <li>• High-traffic pages that don't change often</li>
          </ul>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">⚠️ Consider:</h3>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• Content only updates on rebuild</li>
            <li>• Long build times with many pages</li>
            <li>• Not suitable for user-specific content</li>
            <li>• Cannot show real-time data</li>
          </ul>
        </div>
      </div>

      <div className="card bg-slate-950 text-white p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - SSG (Build Time)</h3>
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm mb-4">
          <code className="text-green-400">{`async function fetchProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(\`\${apiUrl}/products\`, {
    cache: 'force-cache'  // Cache data at build time
  })
  return res.json()
}`}</code>
        </pre>
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Fresh Fetch (POST)</h3>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-emerald-400">{`// Use cache: 'no-store' for fresh data
const res = await fetch(\`\${apiUrl}/products\`, {
  cache: 'no-store'  // Fetch fresh on every request
})
return res.json()`}</code>
        </pre>
      </div>
    </div>
  )
}
