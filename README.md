# SuryaVets — Pet E-Commerce

Full-stack pet e-commerce store (veterinary medicines, supplements, food, treats & supplies) for the Indian market.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** (shadcn-style components)
- **Supabase** (Postgres, Auth, Storage)
- **Zustand** (cart + UI state, persisted to localStorage)
- **TanStack Query** (client data fetching/caching)
- **Razorpay** (payments)
- **Zod** (validation)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from the example and fill in your keys:

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Description |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only) |
   | `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay credentials |
   | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key |
   | `NEXT_PUBLIC_SITE_URL` | Site base URL |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (no +) |
   | `NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD` | Free delivery threshold (₹) |

3. Run the database migration in the Supabase SQL editor:

   - `supabase/migrations/0001_init.sql`
   - Optionally `supabase/seed.sql` for sample data.

4. In Supabase Storage, create public buckets `product-images` and `banners`.

5. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000

## Making yourself an admin

After signing up, set `is_admin = true` on your row in `user_profiles`:

```sql
update user_profiles set is_admin = true where id = 'YOUR_AUTH_USER_ID';
```

Then visit `/admin`.

## Project Structure

```
app/            # App Router routes (shop, auth, admin, api)
components/      # UI, layout, home, product, collection, cart, checkout, account, admin
lib/            # supabase clients, hooks, stores, utils, validations, constants, data
types/          # TypeScript types
supabase/       # SQL migrations + seed
middleware.ts   # Auth protection for /account, /checkout, /admin
```

## Key Features

- 3-level mega menu (animal → category → subcategory), static data, no DB calls
- Collection pages resolve a single slug across animal types / categories / subcategories
- Cart drawer with free-delivery progress bar, persisted via Zustand
- Full-text product search (Supabase `tsvector`) with ILIKE fallback
- Razorpay checkout + COD, server-side stock & price validation, signature verification, webhook
- Protected account & admin areas
- ISR caching: home (1h), collections (5m), products (10m)
- SEO metadata + JSON-LD product structured data

## Deployment (Vercel)

1. Set all env vars in the Vercel dashboard.
2. Set Region to `sin1` (Singapore).
3. Configure the Razorpay webhook to `https://<domain>/api/webhooks/razorpay`.
4. Ensure Supabase image host is allowed (already in `next.config.js`).
# surya-vets
