async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
  const res = await fetch(`${apiUrl}/products?page=1&limit=25`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

export default async function SSRPage() {
  const products = await getProducts()
  const serverBuildTime = new Date().toLocaleString()

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

      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-900 font-semibold">
              🕐 <strong>Server Build Time:</strong>
            </p>
            <p className="text-blue-800 text-xl font-mono mt-1">
              {serverBuildTime}
            </p>
          </div>
          <div className="bg-blue-100 rounded-full px-4 py-2">
            <span className="text-blue-800 text-sm font-medium">
              ⚡ Rendered on every request
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
        <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">🔄 Fresh on</h3>
          <p className="text-green-800 dark:text-green-200 text-sm font-medium">Every Request</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
        <p className="text-blue-900 flex items-start">
          <span className="mr-2 mt-1">🔄</span>
          <span>
            <strong>How it works:</strong> This page is rendered on the server for <strong>every request</strong>.
            The timestamp above shows exactly when the server built this page. Refresh the page to see it change!
          </span>
        </p>
      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          🛍️ Products from API
        </h2>
        
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          This page fetches fresh data from the API <strong>on every server request</strong>.
          The product data and page HTML are generated dynamically each time you load this page.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="card hover:shadow-lg transition-shadow p-4"
            >
              <div className="flex items-start space-x-4">
                <div className="relative flex-shrink-0">
                  <span className="bg-blue-500 text-white text-lg font-bold px-3 py-2 rounded-lg">
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
                    Added: {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

      <div className="bg-slate-50 border-l-4 border-slate-500 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-slate-900 mb-2">🔑 Key Difference from SSG/ISR</h3>
        <p className="text-slate-700 text-sm">
          With <strong>SSR</strong>, the server builds a <strong>new page for every request</strong>. 
          Compare this to SSG (built once at compile time) or ISR (built once, then revalidated).
          Watch the server build time above change on each refresh!
        </p>
      </div>

      <div className="card bg-slate-950 text-white p-6">
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Server Component with SSR</h3>
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm mb-4">
          <code className="text-emerald-400">{`// This is a Server Component (no 'use client')
// Data is fetched on the SERVER for EVERY request

async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(\`\${apiUrl}/products\`, {
    cache: 'no-store'  // Don't cache - fetch fresh data
  })
  return res.json()
}

export default async function SSRPage() {
  // This runs on EVERY request
  const serverRenderTime = new Date().toLocaleString()
  const products = await getProducts()
  
  return (
    <div>
      <p>Page built at: {serverRenderTime}</p>
      <ProductList items={products} />
    </div>
  )
}`}</code>
        </pre>
        <h3 className="text-lg font-semibold text-white mb-4">💻 Code Example - Client Component</h3>
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
          <code className="text-emerald-400">{`// This is a Client Component (with 'use client')
// Data is fetched in the BROWSER, not on server

'use client'

export default function CSRPage() {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    // Fetch happens in browser
    fetchProducts()
  }, [])
  
  return <ProductList items={products} />
}`}</code>
        </pre>
      </div>
    </div>
  )
}
