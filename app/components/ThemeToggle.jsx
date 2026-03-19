'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

const getPreferredTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme) => {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  useEffect(() => {
    const initial = getPreferredTheme()
    setTheme(initial)
    applyTheme(initial)

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')
    const handleChange = (event) => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        const next = event.matches ? 'dark' : 'light'
        setTheme(next)
        applyTheme(next)
      }
    }

    mediaQuery?.addEventListener?.('change', handleChange)
    return () => mediaQuery?.removeEventListener?.('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
      aria-label="Toggle theme"
      title="Toggle light/dark mode"
    >
      {theme === 'dark' ? (
        <span className="flex items-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1Zm9-7a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm-16 0a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm12.071-6.071a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707Zm-10.142 12.142a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707Zm12.142 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414Zm-10.142-12.142l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
          </svg>
          <span className="hidden sm:inline">Dark</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21.752 15.002A9.718 9.718 0 0 1 12 21.75C6.07 21.75 1.5 17.18 1.5 11.25c0-4.12 2.097-7.769 5.332-9.696a.75.75 0 0 1 .933.97 7.5 7.5 0 0 0 9.888 9.888.75.75 0 0 1 .97.933Z" />
          </svg>
          <span className="hidden sm:inline">Light</span>
        </span>
      )}
    </button>
  )
}
