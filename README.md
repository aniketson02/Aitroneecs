# Aitroneecs — Premium Electronics Store

A fast, editorial e-commerce storefront for **aitroneecs.com**, built with
Next.js 16 (App Router), TypeScript and Tailwind v4. Multi-category catalog,
Supabase backend, and Razorpay (INR) checkout.

## Tech

- **Next.js 16 / React 19** — App Router, server components, SSG/ISR
- **Tailwind CSS v4** — custom design tokens (warm canvas, ink, champagne accent)
- **Fraunces + Inter** via `next/font`
- **Framer Motion** — micro-interactions and drawer transitions
- **Zustand** — persisted cart
- **Supabase** — catalog, orders, image storage
- **Razorpay** — payments (UPI, cards, netbanking, wallets)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in when ready (optional to start)
npm run dev                  # http://localhost:3000
```

The site runs fully **without any credentials** — it serves a bundled seed
catalog (`src/data/`) and a labelled demo checkout. Add credentials to switch
on the real backend and payments.

## Wiring the backend

### Supabase
1. Create a project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run `supabase/migrations/0001_init.sql` then
   `supabase/migrations/0002_seed.sql`.
3. Copy the URL + anon key + service-role key into `.env.local`.

Once `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present,
catalog reads come from the `products_with_images` view; orders are written with
the service-role key. Manage products from the Supabase dashboard. Catalog
images can live in the public `product-images` storage bucket.

### Razorpay
1. Get **test** API keys from the Razorpay dashboard.
2. Set `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` in `.env.local`.
3. Test with Razorpay's test cards / UPI. Payment signatures are verified
   server-side in `src/app/api/razorpay/verify/route.ts` before an order is saved.

## Project structure

```
src/
  app/                 routes (home, products, categories, cart, checkout, order, about, contact)
    api/razorpay/      order + verify route handlers
  components/          layout, product, cart, home, ui
  lib/                 data layer, supabase clients, cart store, razorpay, utils
  data/                seed catalog (fallback before Supabase is wired)
  types/               shared types
supabase/migrations/   schema + seed SQL
```

## Deploy (Vercel)

1. Push the repo and import it in Vercel.
2. Add the same env vars in **Project → Settings → Environment Variables**.
3. Point `aitroneecs.com` at the Vercel project (Domains).

## Roadmap (phase 2)

- Supabase Auth customer accounts + order history
- Admin dashboard for product management
- Razorpay webhooks for asynchronous payment reconciliation
- Inventory decrement on purchase, coupons, reviews
