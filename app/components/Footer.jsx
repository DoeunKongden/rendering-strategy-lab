import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-slate-950 text-slate-900 dark:text-slate-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">Next.js Rendering Lab</h3>
            <p className="text-slate-400 text-sm">
              An interactive learning tool to explore the rendering strategies in Next.js:
              SSR, SSG, ISR, and CSR.
            </p>
            <p className="text-slate-400 text-sm mt-4">
              <span className="font-medium">Tip:</span> Use the navigation above to switch between demos.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://nextjs.org/docs/getting-started/react-essentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Next.js Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs/pages/building-your-application/data-fetching"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Data Fetching Guide
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs/app/building-your-application/caching"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Caching in Next.js
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://mockapi.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  MockAPI - Test API
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Vercel - Deployment
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-800 mt-10 pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2">Built for educational purposes. Learn Next.js rendering strategies in action.</p>
          <p className="text-slate-600 dark:text-slate-300 font-medium">Author: Doeun Kongden, IT Instructor Leader</p>
          <p className="mt-4">
            <Link href="#top" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold">
              Back to top ↑
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
