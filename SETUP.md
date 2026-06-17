# SuryaVets — Setup & Deployment Guide

Complete step-by-step guide to go from zero to production.

---

## 1. Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) account (free tier works)
- A [Vercel](https://vercel.com) account (free tier works)
- (Optional) A [Razorpay](https://razorpay.com) account for payments

---

## 2. Supabase Project Setup

### 2a. Create the project

1. Go to [https://app.supabase.com](https://app.supabase.com) → **New Project**
2. Choose a name (e.g. `suryavets`), set a strong DB password, select a region close to India (e.g. `ap-south-1`)
3. Wait ~2 minutes for the project to be provisioned

### 2b. Get your API keys

1. In your Supabase project → **Settings → API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` _(must NOT have `/rest/v1/` suffix)_
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` _(keep this secret)_

### 2c. Run the database migrations

1. In Supabase → **SQL Editor → New Query**
2. Open `supabase/migrations/0001_init.sql` from this repo, paste the entire contents, click **Run**
3. Open `supabase/migrations/0002_fixes.sql`, paste and **Run**
4. (Optional) Open `supabase/seed.sql` for sample products/banners, paste and **Run**

### 2d. Create Storage Buckets

The migration `0002_fixes.sql` attempts to create these automatically. If it fails (Supabase restricts storage SQL in some plans), create them manually:

1. Supabase → **Storage → New Bucket**
   - Name: `product-images`, toggle **Public** ON
2. Create another bucket:
   - Name: `banners`, toggle **Public** ON

### 2e. Create your Admin User

1. Supabase → **Authentication → Users → Invite user** (enter your email)
2. Check your email and set a password
3. Then run this in **SQL Editor** to grant admin access:

```sql
UPDATE user_profiles
SET is_admin = TRUE
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'
);
```

4. Admin panel is at `/admin` — log in with your email/password

---

## 3. Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/suryavets.git
cd suryavets

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in your Supabase keys

# Start the dev server
npm run dev
# Open http://localhost:3000
```

---

## 4. Adding Products via Admin Panel

Once the DB is set up and you are logged in as admin:

1. Go to `/admin/categories` → Add animal types and categories first
   - Example: Animal Type = `Dog`, Category = `Medicine For Dogs`, Subcategory = `Allergy Relief`
2. Go to `/admin/products` → **Add Product**
   - Fill in Name, select the Subcategory, set MRP + Sale Price, upload an image
   - Check **Active** and optionally **Top Selling** (appears on home page)
   - Click **Create Product**
3. The product immediately appears on the frontend (Next.js ISR revalidates every hour, or push a revalidation)

### Uploading Banner Images

1. Go to `/admin/banners`
2. Upload an image to Supabase Storage → `banners` bucket → copy the public URL
3. Paste the URL in the "Image URL" field and add a link + title

---

## 5. Deploy to Vercel

### 5a. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 5b. Import to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository** → select your repo
3. Framework: **Next.js** (auto-detected)
4. Click **Environment Variables** and add every variable from `.env.example`:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919820854449` |
| `NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD` | `499` |
| `RAZORPAY_KEY_ID` | your key (optional) |
| `RAZORPAY_KEY_SECRET` | your secret (optional) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | same as `RAZORPAY_KEY_ID` |

5. Click **Deploy** — Vercel will build and deploy in ~2 minutes

### 5c. Set the production URL

After deploy, update `NEXT_PUBLIC_SITE_URL` in Vercel Environment Variables to your actual domain (e.g. `https://suryavets.vercel.app`).

### 5d. Add Supabase redirect URL (for Google OAuth)

1. Supabase → **Authentication → URL Configuration**
2. Add to **Redirect URLs**: `https://your-domain.vercel.app/auth/callback`

---

## 6. Ongoing Development Workflow

```
Admin Panel adds product
       ↓
Saved to Supabase (products + product_images tables)
       ↓
Frontend reads on next page request (ISR: revalidates every 1 hour)
       ↓
To force immediate update: redeploy on Vercel, or add a revalidation webhook
```

### Useful scripts

```bash
npm run dev      # local dev server at :3000
npm run build    # production build (run before deploying to catch errors)
npm run lint     # ESLint check
```

---

## 7. Project Structure Reference

```
suryavets/
├── app/
│   ├── (shop)/          # All customer-facing pages
│   ├── (auth)/          # Login / signup pages
│   ├── admin/           # Admin panel (protected)
│   └── api/             # API routes (orders, search, newsletter, etc.)
├── components/
│   ├── admin/           # Admin CRUD components
│   ├── home/            # Home page sections
│   ├── layout/          # Header, Footer, MobileNav, etc.
│   ├── product/         # ProductCard, ProductGrid, etc.
│   └── ui/              # Button, Badge, Skeleton, etc.
├── lib/
│   ├── data/            # Server-side Supabase queries
│   ├── store/           # Zustand stores (cart, UI)
│   ├── supabase/        # Supabase client factories
│   └── utils/           # cn, slugify, formatPrice, etc.
├── supabase/
│   ├── migrations/      # Run these in Supabase SQL Editor
│   │   ├── 0001_init.sql    # Schema, RLS, triggers
│   │   └── 0002_fixes.sql   # Missing columns + policies
│   └── seed.sql         # Sample data (optional)
├── .env.example         # Copy to .env.local
├── vercel.json          # Vercel deployment config
└── SETUP.md             # This file
```

---

## 8. Troubleshooting

| Issue | Fix |
|---|---|
| `Invalid API key` error | Check `NEXT_PUBLIC_SUPABASE_URL` has no `/rest/v1/` suffix |
| Products not showing | Ensure `is_active = TRUE` and `subcategory_id` is set |
| Admin can't save products | Run `0002_fixes.sql`; ensure `is_admin = TRUE` in `user_profiles` |
| Images not loading | Confirm `product-images` Storage bucket is **Public** |
| Auth redirect loop | Add `/auth/callback` to Supabase Redirect URLs |
| Build fails on Vercel | Run `npm run build` locally first to catch TypeScript errors |
