# ARC — full setup (Professor + tutors + Vercel)

ARC is one learning system in three surfaces:

| Surface | URL | Role |
|---------|-----|------|
| **Home adviser** | `/` (split panel) | Lesson plans, resources, Quizlet-style flashcards |
| **Cognitive OS** | `/cognitive` | Mental-model graph + professor tied to weak nodes |
| **Voice tutors** | `/companions` | Subject tutors (voice via Vapi when configured) |

All three use the same **ARC Professor** AI when `OPENAI_API_KEY` is set.

---

## 1. Local environment

From the **`arc/`** folder (not parent `ARC/`):

```bash
cd /Users/omarabdelrazek/ARC/arc
cp .env.example .env.local   # if you have a template
npm install
npm run dev
```

### Required keys (`.env.local`)

```env
# Teaching (homepage + cognitive + coach)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini

# Auth (optional for public browse; needed for dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/learn
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/learn

# Tutors database (optional — demo tutors work without DB)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Voice tutors (optional)
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Production URL
NEXT_PUBLIC_SITE_URL=https://arc-oabdelrazek29s-projects.vercel.app
```

Restart `npm run dev` after changing `.env.local`.

---

## 2. Supabase — all 6 tutors

In [Supabase](https://supabase.com) → SQL Editor, run **in order**:

1. `supabase/schema.sql` — tables
2. `supabase/rls.sql` — allow seed inserts
3. `supabase/seed.sql` — Neura, Countsy, Verba, Codey, Memo, Market Maestro

Or from terminal:

```bash
npm run db:seed
```

(Requires `SUPABASE_SERVICE_ROLE_KEY` or anon + RLS as in `scripts/seed-tutors.mjs`.)

If the DB is empty, the app still shows **demo tutors** from `lib/demo-companions.ts`.

---

## 3. Vercel deploy

1. Push `main` to GitHub: `https://github.com/oabdelrazek29/ARC`
2. Vercel project **arc** → Settings → Environment Variables — paste the same keys as `.env.local` for **Production**.
3. Redeploy: `vercel --prod` or push to `main`.
4. Public site (no Vercel login wall):

   **https://arc-oabdelrazek29s-projects.vercel.app**

5. Clerk: add this domain under **Allowed origins** and redirect URLs.
6. Disable deployment protection if needed:

   ```bash
   vercel project protection disable arc --sso
   ```

See also `docs/DEPLOY_VERCEL.md` and `docs/PUBLIC_ACCESS.md`.

---

## 4. How the pieces connect

- Home adviser saves your last topic in `localStorage` (`arc-learning-topic`) and sends it to `/api/ai/coach`.
- Cognitive adviser calls `/api/ai/cognitive/advisor` with your **graph** and returns lessons + graph confidence updates.
- Professor responses include **Resources** (search links), **Voice tutor** links to `/companions?subject=...`, and **Flashcards** when you ask to study / quiz / quizlet.
- OpenAI billing: ~$5 credit on `gpt-4o-mini` is enough for heavy testing.

---

## 5. Try it

**Home:** “Lesson plan for Python in 2 weeks” → structured lesson + resources + next step.

**Cognitive:** Create a graph → adviser chip “Quizlet-style flashcards for this graph”.

**Tutors:** `/companions` → pick a subject tutor → voice session (with Vapi token).

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Words run together in adviser | Pull latest — `TeachingMarkdown` + bubble CSS `pre-wrap` |
| “Add OPENAI_API_KEY” | Set key in `.env.local`, restart dev server |
| No tutors listed | Run `seed.sql` or rely on demo fallback |
| `ENOENT package.json` | `cd arc` then `npm run dev` |
| 401 on production | Add env vars in Vercel, redeploy |
