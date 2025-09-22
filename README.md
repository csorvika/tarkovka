# Tarkov Market — Starter

This is a starter Next.js project for a Tarkov-style market site (Next.js + Tailwind + Prisma + Recharts).

## Features included
- Next.js (app router)
- Tailwind CSS
- Prisma + example Postgres schema
- Basic API route for items
- Sync script skeleton (MARKET_API or cheerio scraper fallback)
- Recharts example in the item detail panel

## Quick start
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:
```bash
npm ci
```
3. Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
4. Run dev server:
```bash
npm run dev
```

## Deploying to Vercel
- Push to GitHub and import the project in Vercel.
- Add environment variables listed in `.env.example` in Vercel project settings.
- Configure a scheduled function or GitHub Action to run `scripts/sync-prices.js` regularly.

## Notes
- Replace placeholder scraping logic with legal sources or a licensed API.
- Configure Cloudinary or Supabase for images and set `CLOUDINARY_URL` accordingly.
