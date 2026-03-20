const puppeteer = require('puppeteer')

const PAGES = ['/', '/ssr', '/ssg', '/isr-time', '/isr-ondemand', '/csr']
const BASE = process.env.BASE_URL || 'http://localhost:3001'

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] })
  const results = []

  for (const path of PAGES) {
    const url = BASE + path
    const page = await browser.newPage()
    const logs = []
    const errors = []

    page.on('console', msg => {
      const type = msg.type()
      const text = msg.text()
      logs.push({ type, text })
    })

    page.on('pageerror', err => {
      errors.push(String(err))
    })

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 })
      // allow any hydration messages to appear
      await new Promise((res) => setTimeout(res, 1200))

      // Grab any text content warnings from the page HTML as a sanity check
      const html = await page.content()
      const hasMismatchText = /Text content does not match|Mismatch (text|content)/i.test(html)

      results.push({ path, url, logs, errors, hasMismatchText })
    } catch (err) {
      results.push({ path, url, error: String(err) })
    } finally {
      await page.close()
    }
  }

  await browser.close()

  // Print a readable summary
  for (const r of results) {
    console.log('\n===', r.path, '->', r.url)
    if (r.error) {
      console.log('ERROR:', r.error)
      continue
    }
    if (r.hasMismatchText) console.log('HTML contains potential mismatch text')
    if (r.errors && r.errors.length) {
      console.log('Page errors:')
      r.errors.forEach(e => console.log('  -', e))
    }
    if (!r.logs || r.logs.length === 0) {
      console.log('No console messages captured.')
      continue
    }
    console.log('Console messages:')
    r.logs.forEach(m => {
      const preview = m.text.length > 240 ? m.text.slice(0,240) + '...' : m.text
      console.log(`  [${m.type}] ${preview}`)
    })
  }

  // Exit non-zero if any console message contains hydration mismatch keywords
  const bad = results.some(r => (r.logs || []).some(l => /Text content does not match|Hydration|did not match|did not render/i.test(l.text)))
  process.exit(bad ? 2 : 0)
}

run().catch(err => {
  console.error(err)
  process.exit(3)
})
