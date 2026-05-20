# ARC Cognitive Learning Operating System

Additive expansion — classic skill trees, LMS tutors, and dashboard remain unchanged.

## Routes

| Path | Purpose |
|------|---------|
| `/cognitive` | Hub + graph list |
| `/cognitive/new` | Generate mental model from goal |
| `/cognitive/[id]` | Graph + advisor + drift + simulation |
| `/cognitive/workspace/[id]` | Full workspace editing |

## API

| Endpoint | When AI runs |
|----------|----------------|
| `POST /api/ai/cognitive/goal` | Goal / map creation only |
| `POST /api/ai/cognitive/advisor` | Advisor messages only |
| `POST /api/ai/cognitive/graph-patch` | Server-side patch merge (optional) |

## Architecture

1. **Cognitive Graph Engine** — `types/cognitive.ts`, `store/cognitive-store.ts`, `lib/cognitive/graph-diff.ts`
2. **AI Advisor** — `lib/ai/cognitive-advisor.ts`, reads weak nodes first, returns graph patches
3. **Learning Reality Modes** — `LearningModePanel`, stored in cognitive store
4. **Workspace** — drag, merge, split, annotate via `WorkspaceToolbar`
5. **Cognitive Drift** — `lib/cognitive/drift-engine.ts`, node states stable/unstable/decaying/strengthening

## Memory layers

- Session: `sessionMemory` in store (per graph)
- Graph: persisted `graphs` in localStorage
- Behavioral: `behavioralMemory` (mistakes, retention)

## Performance

- React Flow `onlyRenderVisibleElements`
- Viewport-based node subset in `CognitiveGraphCanvas`
- `memo` on node cards and canvas
- Debounced graph patches (`GRAPH_PATCH_DEBOUNCE_MS`)
- Advisor response cache (`lib/cognitive/response-cache.ts`)

## Env

Same as ARC core: `OPENAI_API_KEY` for live generation; mock graph without it.
