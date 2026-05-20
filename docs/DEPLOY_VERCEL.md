# Deploy ARC on Vercel

## 1. Import from GitHub

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import **https://github.com/oabdelrazek29/ARC**
3. Project name: **arc** (production URL: `https://arc-oabdelrazek29s-projects.vercel.app`)
4. Framework: **Next.js** (auto-detected)
5. Root Directory: **`.`** (leave default — repo root is the app)
6. Build Command: `npm run build` (default)
7. Output: default

## 2. Environment variables

In Vercel → Project → **Settings** → **Environment Variables**, add the same keys as `.env.local` (see `docs/ARC_KEYS.md`):

- `OPENAI_API_KEY`
- `OPENAI_MODEL` → `gpt-4o-mini`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` → `/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` → `/dashboard`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` → `/dashboard`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_VAPI_WEB_TOKEN`

Apply to **Production**, **Preview**, and **Development**.

## 3. Clerk production URLs

In [Clerk Dashboard](https://dashboard.clerk.com) → your app → **Domains**, add your Vercel URL, e.g.:

- `https://arc-oabdelrazek29s-projects.vercel.app`

## 4. Make the site public (no Vercel login wall)

If visitors see **“Log in to Vercel”** before your app loads, **Deployment Protection** is on.

1. Vercel → your **arc** project → **Settings** → **Deployment Protection**
2. For **Production**, turn protection **off** (or allow public access)
3. Redeploy

Your public URL should load without a Vercel account:

- `https://arc-oabdelrazek29s-projects.vercel.app`

Optional: add a custom domain under **Settings** → **Domains**.

## 5. Redeploy

After env vars are set: **Deployments** → ⋮ on latest → **Redeploy**.

## 6. CLI (optional)

```bash
cd arc
npx vercel login
npx vercel --prod
```

Paste env vars when prompted or set them in the Vercel dashboard first.
