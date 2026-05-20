# Who can see what (no Vercel login required)

## Public website

After **Deployment Protection** is off in Vercel (see `DEPLOY_VERCEL.md`), anyone can open:

- `/` — homepage, marketing, homepage AI adviser preview
- `/about` — about page
- `/classic` — classic landing

No Vercel account and no ARC sign-in required for these.

## Explore without signing in

These URLs are **public** (no Clerk required to load the page):

| Area | URL | What works without ARC sign-in |
|------|-----|--------------------------------|
| Cognitive OS | `/cognitive`, `/cognitive/new`, `/cognitive/[id]` | Create and edit graphs in the browser (local store). Cognitive adviser UI on graph pages when API keys are set. |
| Voice tutors | `/companions` | Browse tutor library if Supabase is configured. Voice sessions and creating tutors need sign-in. |

## After ARC sign-in (Clerk)

Recommended for personal data and LMS features:

- `/dashboard` — your dashboard
- `/my-journey` — progress
- `/trees/[id]` — skill trees with lessons and plans
- `/goals/new` — goal wizard
- Bookmarks and tutor sessions (Supabase RLS)

## Homepage AI adviser vs Cognitive adviser

- **Homepage** — optional side panel (“Open AI Advisor”). Demo + coach API if configured. No account.
- **Cognitive graph pages** — full adviser tied to your graph. Same idea, inside `/cognitive/[id]`. No sign-in required to open the page; sign-in keeps work tied to your account when backend sync is enabled.

## Vercel “Log in to Vercel” screen

That is **not** ARC. It is Vercel Deployment Protection (SSO). Disable it:

```bash
vercel project protection disable arc --sso
```

Or: Vercel dashboard → project **arc** → Settings → Deployment Protection → off for Production.
