# ARC — The AI Learning System

ARC is a full-stack learning platform designed to turn complex material into structured, understandable study experiences. It brings courses, AI tutoring, notes, files, planning, progress tracking, and cognitive maps into one calm workspace.

**Live site:** [my-app-eta-nine-83.vercel.app](https://my-app-eta-nine-83.vercel.app)

**Repository:** [github.com/oabdelrazek29/ARC](https://github.com/oabdelrazek29/ARC)

## What ARC is building

ARC is aimed at students, developers, researchers, and independent learners who want more than a generic chatbot. A learner can begin with a subject, goal, document, or course and use ARC to organize the work, understand difficult concepts, and keep moving through a structured learning path.

The public site presents ARC as an editorial-style learning system built around three ideas:

1. Bring in course material or choose a topic.
2. Let ARC organize it into lessons, summaries, practice, and learning paths.
3. Study inside a focused workspace with contextual AI assistance.

## Main experiences

| Area | What it provides |
| --- | --- |
| **Courses** | Browse, create, and work through structured courses and lessons. |
| **Learning workspace** | Dedicated areas for a teacher, tutor, lectures, notes, files, planning, coding, graphs, and analytics. |
| **AI tutor** | Context-aware explanations, questions, practice, and teaching support powered by OpenAI when configured. |
| **Cognitive graphs** | Visual learning maps with editable nodes, edges, adviser feedback, and graph workspaces. |
| **Voice companions** | Subject-based voice tutors using Vapi and Supabase when those services are configured. |
| **Dashboard** | A home for goals, streaks, XP, progress, and active learning. |
| **Skill trees** | RPG-inspired learning paths generated from a learner's goal. |
| **Notes and files** | Supporting workspaces for organizing study material alongside courses. |
| **Account and settings** | Clerk-backed authentication plus profile, preferences, notification, privacy, and account pages. |

## Tech stack

- **Next.js 16** with the App Router
- **React 19** and **TypeScript**
- **OpenAI** for AI tutoring, coaching, analysis, and learning-path generation
- **Clerk** for authentication and account management
- **Supabase** for tutor, bookmark, and session data
- **Vapi** for voice learning sessions
- **React Flow** for cognitive learning graphs
- **Zustand** for client-side learning and workspace state
- **Tailwind CSS 4**, custom CSS, Framer Motion, and an editorial visual system

## Project structure

```text
ARC/
├── app/
│   ├── api/ai/          # AI coach, tutor, graph, and analysis routes
│   ├── cognitive/       # Cognitive graph builder and workspaces
│   ├── companions/      # Voice tutor library and sessions
│   ├── courses/         # Course creation, courses, and lessons
│   ├── dashboard/       # Personal learning dashboard
│   ├── learn/           # Tutor, notes, files, planner, code, and analytics
│   ├── settings/        # Profile and account preferences
│   └── page.tsx         # Public ARC landing page
├── components/          # Product UI and feature components
├── lib/                 # AI, auth, data, simulation, and course logic
├── store/               # Zustand stores
├── supabase/            # Database schema, seed data, and RLS policies
└── docs/                # Setup, deployment, and product documentation
```

## Run ARC locally

### Requirements

- Node.js 20 or newer
- npm

### Setup

```bash
git clone https://github.com/oabdelrazek29/ARC.git
cd ARC
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

ARC can load without every external service configured, but connected features require their environment variables. Depending on the feature you are testing, configure:

```env
OPENAI_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_SITE_URL=https://my-app-eta-nine-83.vercel.app
```

Never commit `.env.local` or expose secret keys in browser-side code.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the production build. |
| `npm run lint` | Check the code with ESLint. |
| `npm run db:seed` | Seed tutor data. |

## Design direction

ARC uses a warm editorial style inspired by books, journals, and quiet study spaces. Fraunces provides the literary display type, JetBrains Mono supplies technical detail, and the interface uses restrained motion so the learning material remains the focus.

## Current status

ARC is an active personal project. The repository contains working product surfaces as well as features that continue to evolve, especially the AI learning workflows, course system, cognitive graphs, and connected account data.
