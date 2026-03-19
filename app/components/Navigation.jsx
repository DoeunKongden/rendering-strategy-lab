'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/ssr', label: 'SSR' },
    { href: '/ssg', label: 'SSG' },
    { href: '/isr-time', label: 'ISR Time' },
    { href: '/isr-ondemand', label: 'ISR On-Demand' },
    { href: '/csr', label: 'CSR' },
    { href: '/post-data', label: 'Post Data' },
  ]

  const isActive = (path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200 dark:bg-slate-900/70 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded-2xl font-bold text-lg shadow-sm">
                Next.js
              </div>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-lg hidden sm:block">
                Rendering Lab
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-2 -bottom-1 h-1 rounded-full bg-blue-500" />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-3 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-lg mb-1 transition ${
                  isActive(item.href)
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
