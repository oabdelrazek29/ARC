# ARC — API keys you need

I **cannot** create these for you. Sign up on each service and paste values into `.env.local`, then restart `npm run dev`.

Based on the [saas-app tutorial](https://github.com/adrianhajdin/saas-app).

## Already in use (ARC core)

| Variable | Where to get it | Used for |
|----------|-----------------|----------|
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com/api-keys) | Skill trees, ARC Coach |
| `OPENAI_MODEL` | Optional, default `gpt-4o-mini` | Model name |

## Clerk (auth + subscriptions UI)

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [clerk.com](https://clerk.com) → your app → API Keys |
| `CLERK_SECRET_KEY` | Same dashboard |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/dashboard` |

Clerk **Billing** (for `/subscription` PricingTable): enable Billing in Clerk dashboard and connect Stripe there.

## Supabase (tutors, bookmarks, session history)

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | [supabase.com](https://supabase.com) → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page |

Then run `supabase/schema.sql` in the Supabase SQL editor.

## Vapi (voice tutoring sessions)

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_VAPI_WEB_TOKEN` | [vapi.ai](https://vapi.ai) dashboard |

## Sentry (optional — error monitoring)

| Variable | Where to get it |
|----------|-----------------|
| `SENTRY_AUTH_TOKEN` | [sentry.io](https://sentry.io) |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry project settings |

Sentry wiring from the tutorial is optional; add when you want production monitoring.

## What works without keys

| Feature | Needs |
|---------|--------|
| Landing, dashboard (local XP) | Nothing |
| Skill trees (mock fallback) | Nothing |
| Skill trees (AI) | OpenAI + billing |
| ARC Coach | OpenAI + billing |
| Voice tutors list / create | Supabase + Clerk |
| Voice session | Vapi + Supabase |
| Sign in | Clerk |
| Subscription plans | Clerk Billing |

## Security

- Never commit `.env.local` (already in `.gitignore`).
- Rotate any key that was shared in chat or committed by mistake.
