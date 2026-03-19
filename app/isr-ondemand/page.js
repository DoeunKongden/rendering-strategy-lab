'use client'

import { useState, useEffect } from 'react'
import ItemList from '../components/ItemList'
import MetricsDisplay from '../components/MetricsDisplay'
import ExplanationCard from '../components/ExplanationCard'
import { refreshDogsAction, refreshProductsAction, refreshDogsPathAction, refreshProductsPathAction } from '../actions/revalidate'

export default function ISROnDemandPage() {
  const [dogs, setDogs] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [revalidatingTag, setRevalidatingTag] = useState(false)
  const [revalidatingPath, setRevalidatingPath] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(null)
  const [message, setMessage] = useState('')
  const [revalidateMethod, setRevalidateMethod] = useState('')
  const [activeTab, setActiveTab] = useState('dogs')

  const fetchDogs = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/dog?page=1&limit=25`, {
        next: { tags: ['dogs'] },
      })
      if (res.ok) {
        const data = await res.json()
        setDogs(data)
      }
    } catch (error) {
      console.error('Error fetching dogs:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/products?page=1&limit=25`, {
        next: { tags: ['products'] },
      })
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchAll = async () => {
    setLoading(true)
    await Promise.all([fetchDogs(), fetchProducts()])
    setLastRefresh(new Date().toLocaleString())
    setLoading(false)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleTagRevalidation = async () => {
    setRevalidatingTag(true)
    setMessage('Revalidating via Tag...')
    
    try {
      await Promise.all([refreshDogsAction(), refreshProductsAction()])
      await fetchAll()
      setMessage('Tag Revalidation successful!')
      setRevalidateMethod('Tag Revalidation')
    } catch (error) {
      console.error('Error revalidating:', error)
      setMessage('Error refreshing data')
    } finally {
      setRevalidatingTag(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handlePathRevalidation = async () => {
    setRevalidatingPath(true)
    setMessage('Revalidating via Path...')
    
    try {
      await Promise.all([refreshDogsPathAction(), refreshProductsPathAction()])
      await fetchAll()
      setMessage('Path Revalidation successful!')
      setRevalidateMethod('Path Revalidation')
    } catch (error) {
      console.error('Error revalidating:', error)
      setMessage('Error refreshing data')
    } finally {
      setRevalidatingPath(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-5xl">🔘</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            ISR - On-Demand
          </h1>
        </div>
        <span className="strategy-badge bg-purple-500 text-white text-lg px-4 py-2">
          ISR On-Demand - Manual Control 🔘
        </span>
      </div>

      <MetricsDisplay
        timestamp={lastRefresh || 'Loading...'}
        label="Last Refreshed"
        badge="Manually revalidated"
        badgeColor="bg-purple-100 text-purple-800"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-100 border-l-4 border-purple-500 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">🐕 Dog Count</h3>
          <p className="text-purple-800 text-3xl font-bold">{dogs.length}</p>
        </div>
        <div className="bg-indigo-100 border-l-4 border-indigo-500 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-900 mb-2">🛍️ Product Count</h3>
          <p className="text-indigo-800 text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-500 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">🏷️ Tags</h3>
          <p className="text-blue-800 text-sm font-mono">dogs, products</p>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">📍 Method Used</h3>
          <p className="text-green-800 font-medium">{revalidateMethod || 'None yet'}</p>
        </div>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 mb-6">
        <p className="text-purple-900 flex items-start">
          <span className="mr-2 mt-1">🔄</span>
          <span>
            <strong>How it works:</strong> The page is cached and served instantly with both Dogs and Products.
            Click <strong>Tag Revalidation</strong> to invalidate by cache tags, or <strong>Path Revalidation</strong> 
            to invalidate by page path. Watch the counts and timestamps change!
          </span>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('dogs')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'dogs'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              🐕 Dogs ({dogs.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'products'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              🛍️ Products ({products.length})
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleTagRevalidation}
              disabled={revalidatingTag}
              className="bg-purple-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center justify-center space-x-2"
            >
              {revalidatingTag ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Tag...</span>
                </>
              ) : (
                <>
                  <span>🏷️</span>
                  <span>Tag Revalidation</span>
                </>
              )}
            </button>
            <button
              onClick={handlePathRevalidation}
              disabled={revalidatingPath}
              className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 flex items-center justify-center space-x-2"
            >
              {revalidatingPath ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Path...</span>
                </>
              ) : (
                <>
                  <span>📍</span>
                  <span>Path Revalidation</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-800 font-semibold dark:bg-blue-900 dark:text-blue-200">
            {message}
          </div>
        )}
        
        <div className="mb-4">
          {activeTab === 'dogs' ? (
            <p className="text-slate-600 dark:text-slate-300">
              Showing <strong>{dogs.length} dogs</strong> cached with tag <code className="bg-purple-100 px-1 rounded">dogs</code>.
            </p>
          ) : (
            <p className="text-slate-600 dark:text-slate-300">
              Showing <strong>{products.length} products</strong> cached with tag <code className="bg-indigo-100 px-1 rounded">products</code>.
            </p>
          )}
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-purple-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : activeTab === 'dogs' ? (
          <ItemList items={dogs} title="Dog" />
        ) : (
          <ItemList items={products} title="Product" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">🏷️ Tag Revalidation</h3>
          <p className="text-purple-800 text-sm">
            Uses <code className="bg-purple-100 px-2 py-1 rounded">revalidateTag()</code> to selectively invalidate cached data.
          </p>
          <p className="text-purple-800 text-sm mt-2">
            More granular - can invalidate only 'dogs' or 'products' independently.
          </p>
          <div className="mt-3 bg-purple-100 rounded p-2">
            <p className="text-xs text-purple-700 font-mono">revalidateTag('dogs')</p>
            <p className="text-xs text-purple-700 font-mono">revalidateTag('products')</p>
          </div>
        </div>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-900 mb-2">📍 Path Revalidation</h3>
          <p className="text-indigo-800 text-sm">
            Uses <code className="bg-indigo-100 px-2 py-1 rounded">revalidatePath()</code> to invalidate entire page routes.
          </p>
          <p className="text-indigo-800 text-sm mt-2">
            Broader - invalidates the entire page cache including all data.
          </p>
          <div className="mt-3 bg-indigo-100 rounded p-2">
            <p className="text-xs text-indigo-700 font-mono">revalidatePath('/isr-ondemand')</p>
          </div>
        </div>
      </div>

      <ExplanationCard title="How ISR On-Demand Works">
        <div className="space-y-4">
          <p>
            <strong>On-Demand ISR</strong> gives you complete control over when to refresh cached content:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Pages are statically generated and cached like SSG</li>
            <li>Cache is tagged with labels (e.g., 'dogs', 'products') for granular control</li>
            <li><strong>Tag Revalidation:</strong> Invalidates specific cached data by tag</li>
            <li><strong>Path Revalidation:</strong> Invalidates entire page route</li>
            <li>Data stays fresh only when you explicitly refresh it</li>
          </ul>
          <p>
            <strong>Implementation:</strong> We use <code className="bg-purple-100 px-1 rounded">next: {'{ tags: ["dogs"] }'}</code> and 
            <code className="bg-indigo-100 px-1 rounded">next: {'{ tags: ["products"] }'}</code> to tag different cached data.
          </p>
        </div>
      </ExplanationCard>

      <div className="bg-gray-900 rounded-xl p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Fetch with Tags</h3>
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm mb-4">
          <code className="text-green-400">{`// Dogs fetch with tag
const dogsRes = await fetch(\`\${apiUrl}/dog?page=1&limit=25\`, {
  next: { tags: ['dogs'] }
})

// Products fetch with tag
const productsRes = await fetch(\`\${apiUrl}/products?page=1&limit=25\`, {
  next: { tags: ['products'] }
})`}</code>
        </pre>
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Tag Server Actions</h3>
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm mb-4">
          <code className="text-green-400">{`'use server'
import { revalidateTag } from 'next/cache'

export async function refreshDogsAction() {
  revalidateTag('dogs')
}

export async function refreshProductsAction() {
  revalidateTag('products')
}`}</code>
        </pre>
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Path Server Action</h3>
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-green-400">{`'use server'
import { revalidatePath } from 'next/cache'

export async function refreshDogsPathAction() {
  revalidatePath('/isr-ondemand')
}`}</code>
        </pre>
      </div>
    </div>
  )
}
