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

If visitors see **“Log in to Vercel”** or **“Request access”** before your app loads, **Deployment Protection** is enabled. This is a Vercel project setting, not something in the ARC codebase.

### Fix (required for public visitors)

1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select project **arc**
3. **Settings** → **Deployment Protection**
4. Under **Production**:
   - Set to **Standard Protection: Off** (or disable “Vercel Authentication” for production)
5. **Save**
6. **Deployments** → latest production → **Redeploy**

Your public URL should load without a Vercel account:

- `https://arc-oabdelrazek29s-projects.vercel.app`

### Preview deployments

If you want preview URLs public too, disable protection for **Preview** deployments in the same screen.

Optional: add a custom domain under **Settings** → **Domains**.

### CLI (same as dashboard)

From the repo folder, linked to project **arc**:

```bash
vercel project protection disable arc --sso
```

Confirm with `vercel project protection arc` — `ssoProtection` should be `false`.

See also `docs/PUBLIC_ACCESS.md` for what visitors vs signed-in users can open.

## 5. Redeploy

After env vars are set: **Deployments** → ⋮ on latest → **Redeploy**.

## CLI (optional)

```bash
cd arc
npx vercel login
npx vercel --prod
```

Paste env vars when prompted or set them in the Vercel dashboard first.
