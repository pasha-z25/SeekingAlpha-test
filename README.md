Next.js app with financial cards (TypeScript, Tailwind).

## Setup

1. Clone: `git clone https://github.com/pasha-z25/SeekingAlpha-test`
2. Install: `npm install`
3. Env: Add .env.local with EXTERNAL_API_URL=https://seekingalpha.free.beeceptor.com (optional)
4. Run: `npm run dev` (localhost:3000)
5. Build: `npm run build`
6. Tests: `npm test`

## Features

- Server-side fetch from mock API (Beeceptor).
- Premium logic: Only Quant for non-premium.
- Responsive cards with loaders.

## Structure

- app/page.tsx: Server fetch.
- app/api/data/route.ts: Proxy for grades.
- views/HomePage/: Page + helpers for content.
- utils/: Types, helpers, env.
- components/Card/: Wrapper.
