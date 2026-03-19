'use client'

import { useState, useEffect, useRef } from 'react'
import ItemList from '../components/ItemList'
import MetricsDisplay from '../components/MetricsDisplay'
import ExplanationCard from '../components/ExplanationCard'
import { deleteProductAction } from '../actions/revalidate'

export default function CSRPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loadTime, setLoadTime] = useState(null)
  const [loadedAt, setLoadedAt] = useState(null)
  const startTimeRef = useRef(Date.now())

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    startTimeRef.current = Date.now()
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/products?page=1&limit=25`)
      
      if (!res.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await res.json()
      const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(2)
      
      setProducts(data)
      setLoadTime(elapsed)
      setLoadedAt(new Date().toLocaleString())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    const result = await deleteProductAction(productId)
    if (result.success) {
      setProducts(products.filter(p => p.id !== productId))
    } else {
      alert(`Failed to delete: ${result.error}`)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-5xl">🌐</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Client-Side Rendering (CSR)
          </h1>
        </div>
        <span className="strategy-badge bg-amber-500 text-white text-lg px-4 py-2">
          CSR - Client-Side 🌐
        </span>
      </div>

      <MetricsDisplay
        timestamp={loadedAt || 'Waiting...'}
        label="Loaded At"
        badge={loadTime ? `Load time: ${loadTime}s` : 'Loading...'}
        badgeColor="bg-amber-100 text-amber-800"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-100 border-l-4 border-amber-500 rounded-lg p-4">
          <h3 className="font-semibold text-amber-900 mb-2">🛍️ Product Count</h3>
          <p className="text-amber-800 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">⏱️ Time to Interactive</h3>
          <p className="text-blue-800 text-2xl font-bold">
            {loadTime ? `${loadTime}s` : '...'}
          </p>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">🔄 State</h3>
          <p className="text-purple-800 text-sm">
            {loading ? 'Fetching data...' : 'Data loaded'}
          </p>
          <p className="text-purple-600 text-xs mt-1">
            React useState hook
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 mb-6">
        <p className="text-amber-900 flex items-start">
          <span className="mr-2 mt-1">🔄</span>
          <span>
            <strong>How it works:</strong> The page loads with an empty shell first.
            JavaScript downloads and executes, then fetches data from the API.
            Watch the loading state below!
          </span>
        </p>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">🛍️ Products from API</h2>
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:bg-amber-300 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Refetch</span>
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800">
            <p className="font-semibold">Error: {error}</p>
            <button
              onClick={fetchProducts}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}
        
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          This page uses <strong>Client-Side Rendering</strong>. Data is fetched in the browser 
          after the JavaScript loads. Notice the loading state!
        </p>
        <ItemList items={products} loading={loading} title="Product" onDelete={handleDeleteProduct} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">📊 Rendering</h3>
          <p className="text-green-800 text-sm">
            Page renders in browser
          </p>
          <p className="text-green-600 text-xs mt-1">
            After JavaScript execution
          </p>
        </div>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-900 mb-2">💻 Client-Side</h3>
          <p className="text-indigo-800 text-sm">
            Data fetched in browser
          </p>
          <p className="text-indigo-600 text-xs mt-1">
            After initial page load
          </p>
        </div>
      </div>

      <ExplanationCard title="How CSR Works">
        <div className="space-y-4">
          <p>
            <strong>Client-Side Rendering (CSR)</strong> means the browser handles rendering:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Server sends minimal HTML with JavaScript bundle</li>
            <li>Browser downloads and executes JavaScript</li>
            <li>React renders components and fetches data</li>
            <li>User sees content appear after JS loads</li>
            <li>Subsequent navigation happens entirely on the client</li>
          </ul>
          <p>
            <strong>Implementation:</strong> We use <code className="bg-blue-100 px-1 rounded">'use client'</code> directive
            and React hooks (<code className="bg-blue-100 px-1 rounded">useState</code>, <code className="bg-blue-100 px-1 rounded">useEffect</code>)
            to fetch data in the browser from <code className="bg-gray-100 px-1 rounded">{process.env.NEXT_PUBLIC_API_URL}/products</code>.
          </p>
        </div>
      </ExplanationCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">✅ Best For:</h3>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• Highly interactive dashboards</li>
            <li>• Real-time applications</li>
            <li>• User-specific content</li>
            <li>• Complex web applications</li>
          </ul>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">⚠️ Consider:</h3>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• Poor initial SEO</li>
            <li>• Longer time to first contentful paint</li>
            <li>• Requires JavaScript to function</li>
            <li>• May show loading states</li>
          </ul>
        </div>
      </div>

      <div className="card bg-slate-950 text-white p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example</h3>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-emerald-400">{`'use client'

import { useState, useEffect } from 'react'

export default function CSRPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      const res = await fetch(\`\${apiUrl}/products\`)
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div>
      {loading ? <LoadingSpinner /> : <ItemList items={products} />}
    </div>
  )
}`}</code>
        </pre>
      </div>
    </div>
  )
}
