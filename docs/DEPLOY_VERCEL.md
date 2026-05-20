# Deploy ARC on Vercel

## 1. Import from GitHub

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import **https://github.com/oabdelrazek29/ARC**
3. Framework: **Next.js** (auto-detected)
4. Root Directory: **`.`** (leave default — repo root is the app)
5. Build Command: `npm run build` (default)
6. Output: default

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

- `https://your-project.vercel.app`

## 4. Redeploy

After env vars are set: **Deployments** → ⋮ on latest → **Redeploy**.

## CLI (optional)

```bash
cd my-app
npx vercel login
npx vercel --prod
```

Paste env vars when prompted or set them in the Vercel dashboard first.
