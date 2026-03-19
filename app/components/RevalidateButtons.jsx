'use client'

import { useState } from 'react'
import { refreshProductsAction, refreshDogsAction } from '../actions/revalidate'

export default function RevalidateButtons() {
  const [revalidating, setRevalidating] = useState(false)
  const [message, setMessage] = useState('')

  const handleRevalidateProducts = async () => {
    setRevalidating(true)
    setMessage('')
    try {
      await refreshProductsAction()
      setMessage('Products cache invalidated! Refresh /isr-time to see new data.')
    } catch (error) {
      setMessage('Error revalidating')
    } finally {
      setRevalidating(false)
    }
  }

  const handleRevalidateDogs = async () => {
    setRevalidating(true)
    setMessage('')
    try {
      await refreshDogsAction()
      setMessage('Dogs cache invalidated! Refresh /isr-ondemand to see new data.')
    } catch (error) {
      setMessage('Error revalidating')
    } finally {
      setRevalidating(false)
    }
  }

  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        🔄 Manual Cache Revalidation
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        After creating new data via the POST page, use these buttons to manually invalidate the ISR cache.
        This triggers immediate regeneration of cached pages.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleRevalidateProducts}
          disabled={revalidating}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center space-x-2"
        >
          {revalidating ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Revalidating...</span>
            </>
          ) : (
            <>
              <span>🔄</span>
              <span>Revalidate Products (ISR Time)</span>
            </>
          )}
        </button>
        <button
          onClick={handleRevalidateDogs}
          disabled={revalidating}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 flex items-center space-x-2"
        >
          {revalidating ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Revalidating...</span>
            </>
          ) : (
            <>
              <span>🐕</span>
              <span>Revalidate Dogs (ISR On-Demand)</span>
            </>
          )}
        </button>
      </div>
      {message && (
        <div className="mt-4 p-3 rounded-lg bg-green-100 text-green-800 font-medium">
          {message}
        </div>
      )}
    </div>
  )
}
