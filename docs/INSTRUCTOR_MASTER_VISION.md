# Instructor Master — Platform Vision

ARC is a **personal AI university OS**, not a notes app, task tracker, or chatbot sidebar.

## Core identity

The AI is: instructor, strategist, tutor, curriculum architect, performance analyst, memory system, research assistant, coursework generator, study planner — for **any subject** (STEM, humanities, languages, professional skills, test prep, arts).

## Workspace modes

| Mode | Behavior |
|------|----------|
| **Full Focus** | Main work only — notes, coding, lesson, reading, projects |
| **Smart Split** | 50/50 — work area + Instructor Master |
| **Teaching Mode** | Instructor full screen — interactive lesson engine |

Implemented in: `components/layout/WorkspaceLayout.tsx`

## Instructor Master panel

Tabs: Mission · Teach · Practice · Roadmap · Graph

- Live lessons, objectives, timelines, assignments, projects
- Flashcards and quizzes from AI sessions
- Course map progress (Boot.dev-style modules)
- Knowledge graph links (Cognitive OS)

Implemented in: `components/instructor/InstructorMasterPanel.tsx`

## Structured coursework

Skill trees convert to courses with modules, lessons, checkpoints, XP, mastery %.

- Course page: `/courses/[treeId]`
- Types: `types/course.ts`
- Converter: `lib/course/tree-to-course.ts`

## Learn OS (`/learn`)

Connected platform shell with sidebar + persistent Instructor Master on every section:

| Route | Section |
|-------|---------|
| `/learn` | Mission control (synced activity stream) |
| `/learn/courses` | Course hub |
| `/learn/tutor` | Instructor (Teaching Mode default) |
| `/learn/notes` | Smart notes + AI summarize |
| `/learn/files` | Upload + AI analysis |
| `/learn/lectures` | YouTube + transcript intelligence |
| `/learn/code` | Code lab + AI debug |
| `/learn/analytics` | Retention, velocity, heatmap |
| `/learn/graph` | Knowledge graph bridge |
| `/learn/planner` | AI study schedule |

`platform-store` syncs events → dashboard, instructor weaknesses, analytics.

## Implementation priorities (tracking)

1. ✅ Replace weak advisor → Instructor Master
2. ✅ Smart split workspace (50/50) platform-wide
3. ✅ Structured coursework shell
4. ✅ Extended AI teaching payload + `/api/ai/analyze-content`
5. ✅ Connected sections (notes, files, lectures, code, planner)
6. 🔲 Full knowledge graph UI (Cognitive OS extended)
7. 🔲 Browser code runner, PDF OCR, voice instructor

## Design rule

**Do not change the ARC theme** (colors, fonts, tokens). Only layout, density, and instructional UX.

Every screen must answer: *Does this feel like the future of education?*
