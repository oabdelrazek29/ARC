# ARC — Cognitive Learning OS

ARC is a Next.js learning product that turns goals into structured paths: skill trees, a cognitive graph workspace, voice tutors, and AI advisers. The public marketing site is open to everyone; personal progress and account features use [Clerk](https://clerk.com) when configured.

**Production:** [https://my-app-eta-nine-83.vercel.app](https://my-app-eta-nine-83.vercel.app)  
**Also available:** [https://arc-oabdelrazek29s-projects.vercel.app](https://arc-oabdelrazek29s-projects.vercel.app)  
**Repository:** [github.com/oabdelrazek29/ARC](https://github.com/oabdelrazek29/ARC)

---

## What ARC does

| Area | Description |
|------|-------------|
| **Home** | Editorial landing page, optional split-pane **AI Adviser** preview, pricing section, and “how it works” story. |
| **Cognitive OS** | `/cognitive` — build and edit learning graphs in the browser (nodes, edges, adviser on graph pages). Works locally without an account; sign-in ties work to your user when backend sync is enabled. |
| **Tutors** | `/companions` — voice learning companions (Vapi + Supabase when configured). Browse publicly; creating tutors and live sessions need sign-in. |
| **Dashboard** | `/dashboard` — XP, streaks, goals, and progress (protected). |
| **Skill trees** | `/trees/[id]`, `/goals/new` — RPG-style paths with lessons and plans (protected). |
| **My journey** | `/my-journey` — timeline and milestones (protected). |
| **Settings** | `/settings/*` — profile, account (Clerk), preferences (theme), notifications, privacy. Pages load publicly; account sections ask you to sign in. |

---

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript  
- **Auth:** Clerk (`@clerk/nextjs`) — optional; app runs without keys in dev  
- **Database:** Supabase (tutors, bookmarks, sessions) — optional  
- **AI:** OpenAI (coach, skill trees, cognitive adviser APIs) — optional  
- **Voice:** Vapi (tutor sessions) — optional  
- **Graph UI:** React Flow (`@xyflow/react`)  
- **State:** Zustand (local cognitive graphs, ARC progress)  
- **Styling:** Custom editorial design system (`app/arc-theme.css`), Fraunces + JetBrains Mono  

---

## Authentication & middleware (important)

Without Clerk env vars, **no route is blocked** — the app behaves as fully open locally.

With Clerk configured, `middleware.ts` uses `clerkMiddleware` and **only protects routes that are not listed as public**. Public visitors can see the homepage and explore; dashboard and personal learning routes require sign-in.

### Public routes (no ARC login)

| Route pattern | Purpose |
|---------------|---------|
| `/` | Homepage |
| `/about` | About ARC |
| `/classic` | Classic landing variant |
| `/subscription` | Pricing / plans (Clerk Billing UI when enabled) |
| `/sign-in(.*)` | Sign in |
| `/sign-up(.*)` | Sign up (Clerk) |
| `/cognitive(.*)` | Cognitive OS (list, new graph, graph pages, workspace) |
| `/companions(.*)` | Tutors (library; session pages may redirect in-app) |
| `/settings(.*)` | Settings shell and sections |
| `/api/ai(.*)` | AI coach, status, cognitive APIs used by public UI |

### Protected routes (sign-in required when Clerk is on)

Includes but is not limited to:

- `/dashboard`
- `/my-journey`
- `/goals/new`
- `/trees/[id]`

If you add new app sections, either add them to `isPublicRoute` in `middleware.ts` or leave them protected by default.

### Vercel vs ARC login

- **“Log in to Vercel”** before the site loads → [Deployment Protection](docs/DEPLOY_VERCEL.md) on the Vercel project (not Clerk). Disable SSO protection for production.  
- **Clerk sign-in** → only for ARC account features, not for viewing the marketing site.

More detail: [docs/PUBLIC_ACCESS.md](docs/PUBLIC_ACCESS.md)

---

## Project structure

```
arc/
├── app/                    # Next.js App Router pages & API routes
│   ├── page.tsx            # Homepage
│   ├── about/
│   ├── cognitive/          # Cognitive OS
│   ├── companions/         # Voice tutors
│   ├── dashboard/
│   ├── settings/           # Profile, account, preferences, etc.
│   ├── sign-in/
│   └── api/ai/             # OpenAI-backed routes
├── components/
│   ├── brand/              # ArcMark logo, BrandLink
│   ├── home/               # Homepage experience
│   ├── cognitive/          # Graph workspace & adviser
│   ├── layout/             # Navbar, SiteMenu, footer
│   └── settings/
├── lib/                    # Utilities, nav config, AI helpers
├── store/                  # Zustand stores
├── middleware.ts           # Clerk public vs protected routes
├── docs/                   # Keys, deploy, public access
└── public/                 # Static assets, arc-mark.svg
```

---

## Local development

### Prerequisites

- Node.js 20+ (Vercel uses 24.x)  
- npm  

### Setup

```bash
cd arc
npm install
cp .env.example .env.local   # if present; otherwise create .env.local
```

Add keys from [docs/ARC_KEYS.md](docs/ARC_KEYS.md). Minimum for full features:

- `OPENAI_API_KEY` — AI coach and trees  
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` — auth  
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — tutors  
- `NEXT_PUBLIC_VAPI_WEB_TOKEN` — voice sessions  

Clerk URLs (typical):

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If the dev server runs out of memory on a large page:

```bash
NODE_OPTIONS='--max-old-space-size=8192' npm run dev
```

### Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

---

## Environment variables

See **[docs/ARC_KEYS.md](docs/ARC_KEYS.md)** for every key, where to get it, and what breaks without it.

**Never commit `.env.local`.** Rotate any key that was exposed in chat or git history.

Optional production URL for metadata and Open Graph:

```env
NEXT_PUBLIC_SITE_URL=https://my-app-eta-nine-83.vercel.app
```

---

## Deploy on Vercel

1. Import [github.com/oabdelrazek29/ARC](https://github.com/oabdelrazek29/ARC) on [vercel.com/new](https://vercel.com/new).  
2. Project name: **arc** — root directory **`.`** (repo root is the app).  
3. Add the same env vars as `.env.local` for Production (and Preview if you want).  
4. Turn off **Deployment Protection** for production so visitors are not asked to “Log in to Vercel”.  
5. Push to `main` → automatic deploy.

Full steps: **[docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md)**

```bash
# Optional: disable Vercel SSO wall from CLI
vercel project protection disable arc --sso
```

---

## Branding

- **Wordmark:** ARC (Fraunces)  
- **Mark:** SVG learning-path arc with nodes (`components/brand/ArcMark.tsx`) — theme-aware in UI; warm gold on favicons  
- **Favicon:** `app/icon.svg`, `app/apple-icon.svg`, `public/arc-mark.svg`  

---

## Navigation

- **Desktop:** Home, About, Cognitive, Tutors, Pricing + **Menu** (full site map)  
- **Mobile:** Same via **Menu** drawer (all sections, scrollable)  
- **Settings:** `/settings` → profile, account, preferences, notifications, privacy  

Shared config: `lib/site-nav.ts`

---

## AI features (server routes)

| Endpoint | Role |
|----------|------|
| `/api/ai/coach` | Homepage / general coach chat |
| `/api/ai/status` | Whether AI is configured |
| `/api/ai/goal` | Skill tree generation from a goal |
| `/api/ai/cognitive/*` | Cognitive graph adviser and patches |

Public middleware allows these when Clerk is on so the marketing site and cognitive demo can call them; rate-limit and auth in routes if you harden production.

---

## Security notes

- API keys stay server-side (Route Handlers).  
- Supabase RLS should scope tutor data per user when using Clerk user ids.  
- Rotate compromised keys immediately.  

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Whole site asks for login immediately | Check `middleware.ts` public routes; ensure homepage `/` is listed. |
| “Log in to Vercel” before site loads | Disable Deployment Protection — [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md). |
| Old favicon in browser tab | Hard refresh or incognito; favicon uses cache-buster query in `app/layout.tsx`. |
| Tutors empty | Set Supabase env vars and run `supabase/schema.sql`. |
| AI silent | Set `OPENAI_API_KEY` and check `/api/ai/status`. |

---

## License & repo

Private project (`"private": true` in `package.json`). Push to `main` on GitHub to deploy.

For questions about architecture or access control, start with `middleware.ts`, `docs/PUBLIC_ACCESS.md`, and this README.
