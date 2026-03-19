'use client'

import { useState } from 'react'
import { refreshDogsAction, refreshProductsAction, refreshDogsPathAction, refreshProductsPathAction } from '../actions/revalidate'

export default function PostDataPage() {
  const [productForm, setProductForm] = useState({ 
    name: 'Sample Product', 
    price: '99.99', 
    description: 'This is a sample product description for testing.' 
  })
  const [dogForm, setDogForm] = useState({ 
    name: 'Buddy', 
    breed: 'Golden Retriever', 
    image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg' 
  })
  const [productStatus, setProductStatus] = useState({ loading: false, message: '', success: false })
  const [dogStatus, setDogStatus] = useState({ loading: false, message: '', success: false })
  const [revalidateStatus, setRevalidateStatus] = useState({ loading: false, message: '' })

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    setProductStatus({ loading: true, message: 'Creating product...', success: false })

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
      })

      if (res.ok) {
        const data = await res.json()
        setProductStatus({ loading: false, message: `Product created! ID: ${data.id}`, success: true })
        setProductForm({ name: '', price: '', description: '' })
      } else {
        throw new Error('Failed to create product')
      }
    } catch (error) {
      setProductStatus({ loading: false, message: 'Error creating product', success: false })
    }
  }

  const handleDogSubmit = async (e) => {
    e.preventDefault()
    setDogStatus({ loading: true, message: 'Creating dog...', success: false })

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://645865eb4eb3f674df739047.mockapi.io/api/v1'
      const res = await fetch(`${apiUrl}/dog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dogForm),
      })

      if (res.ok) {
        const data = await res.json()
        setDogStatus({ loading: false, message: `Dog created! ID: ${data.id}`, success: true })
        setDogForm({ name: '', breed: '', image: '' })
      } else {
        throw new Error('Failed to create dog')
      }
    } catch (error) {
      setDogStatus({ loading: false, message: 'Error creating dog', success: false })
    }
  }

  const handleRevalidateAll = async (method) => {
    setRevalidateStatus({ loading: true, message: `Revalidating via ${method}...` })

    try {
      if (method === 'tag') {
        await Promise.all([refreshDogsAction(), refreshProductsAction()])
      } else {
        await Promise.all([refreshDogsPathAction(), refreshProductsPathAction()])
      }
      setRevalidateStatus({ loading: false, message: `${method === 'tag' ? 'Tag' : 'Path'} Revalidation successful! All pages refreshed.` })
    } catch (error) {
      setRevalidateStatus({ loading: false, message: 'Error revalidating' })
    }

    setTimeout(() => setRevalidateStatus({ loading: false, message: '' }), 4000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-5xl">📝</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            Create & Revalidate
          </h1>
        </div>
        <span className="strategy-badge bg-indigo-500 text-white text-lg px-4 py-2">
          POST New Data & Trigger Revalidation 📝
        </span>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4 mb-6">
        <p className="text-indigo-900 flex items-start">
          <span className="mr-2 mt-1">💡</span>
          <span>
            <strong>How it works:</strong> Use the forms below to POST new data to the API.
            After creating data, click the revalidation buttons to refresh the ISR pages and see your new data!
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="mr-2">🛍️</span>
            Create Product
          </h2>
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Name</label>
              <input
                type="text"
                required
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Price</label>
              <input
                type="text"
                required
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="99.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Description</label>
              <textarea
                required
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Product description"
              />
            </div>
            <button
              type="submit"
              disabled={productStatus.loading}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 flex items-center justify-center space-x-2"
            >
              {productStatus.loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>➕</span>
                  <span>Create Product</span>
                </>
              )}
            </button>
          </form>
          {productStatus.message && (
            <div className={`mt-4 p-3 rounded-lg ${productStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {productStatus.message}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="mr-2">🐕</span>
            Create Dog
          </h2>
          <form onSubmit={handleDogSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Name</label>
              <input
                type="text"
                required
                value={dogForm.name}
                onChange={(e) => setDogForm({ ...dogForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Dog name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Breed</label>
              <input
                type="text"
                required
                value={dogForm.breed}
                onChange={(e) => setDogForm({ ...dogForm, breed: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Dog breed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-1">Image URL</label>
              <input
                type="text"
                required
                value={dogForm.image}
                onChange={(e) => setDogForm({ ...dogForm, image: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/dog.jpg"
              />
            </div>
            <button
              type="submit"
              disabled={dogStatus.loading}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 flex items-center justify-center space-x-2"
            >
              {dogStatus.loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>➕</span>
                  <span>Create Dog</span>
                </>
              )}
            </button>
          </form>
          {dogStatus.message && (
            <div className={`mt-4 p-3 rounded-lg ${dogStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {dogStatus.message}
            </div>
          )}
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
          <span className="mr-2">🔄</span>
          Revalidate ISR Pages
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          After creating new data, click the buttons below to revalidate the ISR pages and see your changes reflected.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleRevalidateAll('tag')}
            disabled={revalidateStatus.loading}
            className="bg-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center justify-center space-x-2"
          >
            {revalidateStatus.loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Revalidating...</span>
              </>
            ) : (
              <>
                <span>🏷️</span>
                <span>Revalidate All (Tag)</span>
              </>
            )}
          </button>
          <button
            onClick={() => handleRevalidateAll('path')}
            disabled={revalidateStatus.loading}
            className="bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 flex items-center justify-center space-x-2"
          >
            {revalidateStatus.loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Revalidating...</span>
              </>
            ) : (
              <>
                <span>📍</span>
                <span>Revalidate All (Path)</span>
              </>
            )}
          </button>
        </div>
        {revalidateStatus.message && (
          <div className="mt-4 p-3 rounded-lg bg-blue-100 text-blue-800 font-semibold">
            {revalidateStatus.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">🏷️ Tag Revalidation</h3>
          <p className="text-purple-800 text-sm">
            Uses <code className="bg-purple-100 px-2 py-1 rounded">revalidateTag()</code> to invalidate cached data by their tags ('dogs', 'products').
          </p>
        </div>
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-900 mb-2">📍 Path Revalidation</h3>
          <p className="text-indigo-800 text-sm">
            Uses <code className="bg-indigo-100 px-2 py-1 rounded">revalidatePath()</code> to invalidate specific page routes.
          </p>
        </div>
      </div>
    </div>
  )
}
