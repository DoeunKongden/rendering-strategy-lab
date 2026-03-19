import './globals.css'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Script from 'next/script'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'Next.js Rendering Strategies Learning Lab',
  description: 'Interactive educational tool to learn SSR, SSG, ISR, and CSR rendering strategies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function() {
          try {
            const stored = window.localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
            if (theme === 'dark') document.documentElement.classList.add('dark');
          } catch (e) {
            // ignore
          }
        })();`}
      </Script>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}>
        <Navigation />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
