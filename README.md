# Next.js Rendering Strategies Learning Lab

An interactive educational web application for students to learn and test SSR, SSG, ISR, and CSR rendering strategies in real-time.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Features

- **SSR (Server-Side Rendering)**: See real-time data fetching on every request
- **SSG (Static Site Generation)**: View pre-built static content
- **ISR Time-Based**: Experience automatic revalidation every 60 seconds
- **ISR On-Demand**: Trigger manual revalidation with Server Actions
- **CSR (Client-Side Rendering)**: Watch data load in the browser with loading states
- **Interactive Examples**: Live code snippets and performance metrics
- **Responsive Design**: Works on mobile, tablet, and desktop

## 📚 Learning Outcomes

By using this application, you will understand:

1. **When to use each rendering strategy**
2. **How data fetching works in Next.js**
3. **Caching mechanisms and their implications**
4. **Performance trade-offs between strategies**
5. **SEO considerations for each approach**
6. **Real-world use cases for each strategy**

## 🛠️ Installation

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A MockAPI account (free)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd nextjs-rendering-strategies-lab
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up MockAPI

1. Go to [MockAPI](https://mockapi.io/)
2. Create a free account
3. Create a new project called "NextJS-Learning-Lab"
4. Create a resource called "users" with these fields:
   - `id` (auto-generated)
   - `name` (string)
   - `email` (string)
   - `avatar` (string - image URL)
   - `createdAt` (timestamp)
5. Add 10-15 sample users with realistic data
6. Copy your API endpoint URL

### Step 4: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MockAPI endpoint:

```env
NEXT_PUBLIC_API_URL=https://api.mockapi.io/api/v1
```

**Note**: Replace the URL with your actual MockAPI endpoint from Step 3.

### Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Pages Overview

### Home Page (`/`)

- Overview of all 4 rendering strategies
- Navigation cards to each demo page
- Comparison table
- Visual diagrams and explanations

### SSR Page (`/ssr`)

- **Strategy**: Server-Side Rendering
- **Cache**: `cache: 'no-store'`
- **Features**:
  - Fresh data on every request
  - Real-time timestamp updates
  - User list from MockAPI
- **Use Case**: When you need always-fresh data

### SSG Page (`/ssg`)

- **Strategy**: Static Site Generation
- **Cache**: `cache: 'force-cache'`
- **Features**:
  - Pre-built at compile time
  - Lightning-fast loading
  - Static timestamp
- **Use Case**: Marketing pages, blogs, documentation

### ISR Time Page (`/isr-time`)

- **Strategy**: Incremental Static Regeneration (Time-Based)
- **Cache**: `next: { revalidate: 60 }`
- **Features**:
  - Cached for fast delivery
  - Auto-revalidates every 60 seconds
  - Countdown timer
- **Use Case**: E-commerce products, news articles

### ISR On-Demand Page (`/isr-ondemand`)

- **Strategy**: Incremental Static Regeneration (On-Demand)
- **Cache**: `next: { tags: ['users'] }`
- **Features**:
  - Manual refresh button
  - Server Actions for revalidation
  - Cache tagging
- **Use Case**: CMS content, admin dashboards

### CSR Page (`/csr`)

- **Strategy**: Client-Side Rendering
- **Directive**: `'use client'`
- **Features**:
  - Loading skeleton states
  - Client-side data fetching
  - Time-to-interactive metrics
- **Use Case**: Dashboards, real-time apps, user-specific content

## 🏗️ Project Structure

```
nextjs-rendering-strategies-lab/
├── app/
│   ├── actions/
│   │   └── revalidate.js          # Server Actions for ISR
│   ├── components/
│   │   ├── Navigation.jsx         # Responsive navigation
│   │   ├── Footer.jsx             # Footer with links
│   │   ├── StrategyCard.jsx       # Strategy overview cards
│   │   ├── UserList.jsx           # User display component
│   │   ├── MetricsDisplay.jsx     # Timestamp & metrics
│   │   ├── ExplanationCard.jsx    # Educational content
│   │   └── LoadingSkeleton.jsx    # Loading states
│   ├── ssr/
│   │   └── page.js                # SSR demo page
│   ├── ssg/
│   │   └── page.js                # SSG demo page
│   ├── isr-time/
│   │   └── page.js                # ISR time-based page
│   ├── isr-ondemand/
│   │   └── page.js                # ISR on-demand page
│   ├── csr/
│   │   └── page.js                # CSR demo page
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Home page
│   └── globals.css                # Global styles
├── public/                        # Static assets
├── .env.example                   # Environment template
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
└── README.md                      # Documentation
```

## 🎓 Rendering Strategies Explained

### Server-Side Rendering (SSR)

**What it is**: HTML is generated on the server for each request.

```javascript
const res = await fetch(url, { cache: 'no-store' })
```

**Pros**:
- ✅ Always fresh data
- ✅ Great for SEO
- ✅ Works without JavaScript

**Cons**:
- ❌ Slower response times
- ❌ Higher server load
- ❌ More infrastructure costs

**Best for**: Dashboards, user-specific content, SEO-critical pages

---

### Static Site Generation (SSG)

**What it is**: HTML is pre-built at compile time and served instantly.

```javascript
const res = await fetch(url, { cache: 'force-cache' })
```

**Pros**:
- ✅ Lightning-fast loading
- ✅ Excellent SEO
- ✅ Minimal server load

**Cons**:
- ❌ Data never changes (until rebuild)
- ❌ Long build times
- ❌ Not suitable for dynamic content

**Best for**: Blogs, documentation, landing pages

---

### Incremental Static Regeneration (ISR)

**What it is**: Combines SSG and SSR - pages are cached but can regenerate.

**Time-Based**:
```javascript
const res = await fetch(url, { next: { revalidate: 60 } })
```

**On-Demand**:
```javascript
const res = await fetch(url, { next: { tags: ['users'] } })
// In Server Action:
revalidateTag('users')
```

**Pros**:
- ✅ Fast loading (cached)
- ✅ Fresh data when needed
- ✅ Scale to millions of pages

**Cons**:
- ❌ More complex caching logic
- ❌ Potential for stale data

**Best for**: E-commerce, news sites, frequently updated content

---

### Client-Side Rendering (CSR)

**What it is**: Browser downloads JavaScript and renders content dynamically.

```javascript
'use client'

const [data, setData] = useState(null)

useEffect(() => {
  fetch(url).then(res => res.json()).then(setData)
}, [])
```

**Pros**:
- ✅ Highly interactive
- ✅ Great for user-specific content
- ✅ Rich user experiences

**Cons**:
- ❌ Poor initial SEO
- ❌ Longer time to interactive
- ❌ Requires JavaScript

**Best for**: Dashboards, SPAs, real-time applications

---

## 🚀 Deployment to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Option 2: CLI Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables:
```bash
vercel env add NEXT_PUBLIC_API_URL
```

5. Deploy to production:
```bash
vercel --prod
```

### Option 3: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables in the dashboard
5. Deploy!

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://api.mockapi.io/api/v1
```

**Important**: For production, set this in your Vercel dashboard under Settings > Environment Variables.

### Tailwind CSS

Customize colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'strategy-ssr': '#3b82f6',
        'strategy-ssg': '#10b981',
        'strategy-isr': '#8b5cf6',
        'strategy-csr': '#f59e0b',
      },
    },
  },
}
```

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Data Fetching in Next.js](https://nextjs.org/docs/pages/building-your-application/data-fetching)
- [Caching in Next.js](https://nextjs.org/docs/app/building-your-application/caching)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [MockAPI Documentation](https://mockapi.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🎯 Learning Tips

1. **Start with the Home page** to understand all strategies
2. **Compare timestamps** across pages to see caching in action
3. **Read the code examples** to understand implementation
4. **Experiment with MockAPI** - add/edit users and see changes
5. **Check browser DevTools** to see network requests and cache headers
6. **Try production mode** (`npm run build && npm start`) to see true performance

## 🐛 Troubleshooting

### "Failed to fetch users"

1. Check your MockAPI endpoint is correct
2. Ensure your MockAPI project has users data
3. Verify `.env.local` has the correct `NEXT_PUBLIC_API_URL`
4. Check browser console for specific errors

### Page doesn't update after ISR revalidation

1. In development, ISR revalidation may not work as expected
2. Test in production mode or Vercel deployment
3. Check browser cache is cleared
4. Verify Server Action is being called correctly

### Styling issues

1. Run `npm run dev` to ensure styles are compiled
2. Check Tailwind is properly configured
3. Clear `.next` cache: `rm -rf .next`

## 📬 Support

If you have questions or need help:

- Open an issue on GitHub
- Check the Next.js community Discord
- Review Next.js documentation

---

**Happy Learning! 🚀**
