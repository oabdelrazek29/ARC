"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { GRAPH_PATCH_DEBOUNCE_MS } from "@/constants/cognitive";
import { applyGraphPatch, identifyWeakNodes } from "@/lib/cognitive/graph-diff";
import { driftPatchFromOutcome } from "@/lib/cognitive/drift-engine";
import type {
  AdvisorMode,
  BehavioralMemory,
  CognitiveGraph,
  CognitiveNode,
  CognitiveUserProfile,
  GraphPatch,
  LearningRealityMode,
  SessionMemory,
  ThinkingScenario,
} from "@/types/cognitive";

let patchTimer: ReturnType<typeof setTimeout> | null = null;
const pendingPatches: GraphPatch[] = [];

const defaultProfile: CognitiveUserProfile = {
  id: "local-user",
  learning_velocity: 1,
  reasoning_style: "mixed",
  cognitive_profile: "Adaptive explorer",
  weak_domains: [],
  mastery_domains: [],
};

interface CognitiveState {
  graphs: Record<string, CognitiveGraph>;
  scenarios: Record<string, ThinkingScenario[]>;
  profile: CognitiveUserProfile;
  sessionMemory: Record<string, SessionMemory>;
  behavioralMemory: Record<string, BehavioralMemory>;
  activeGraphId: string | null;
  realityMode: LearningRealityMode;
  advisorMode: AdvisorMode;

  setGraph: (graph: CognitiveGraph, scenarios?: ThinkingScenario[]) => void;
  setActiveGraph: (id: string | null) => void;
  setRealityMode: (mode: LearningRealityMode) => void;
  setAdvisorMode: (mode: AdvisorMode) => void;
  queueGraphPatch: (patch: GraphPatch) => void;
  applyPatchImmediate: (patch: GraphPatch) => void;
  updateNode: (graphId: string, nodeId: string, patch: Partial<CognitiveNode>) => void;
  mergeNodes: (graphId: string, sourceIds: string[], label: string) => void;
  splitNode: (graphId: string, nodeId: string, labels: string[]) => void;
  moveNode: (graphId: string, nodeId: string, position: { x: number; y: number }) => void;
  pinNode: (graphId: string, nodeId: string, pinned: boolean) => void;
  annotateNode: (graphId: string, nodeId: string, annotation: string) => void;
  recordSessionMessage: (
    graphId: string,
    role: "user" | "assistant",
    content: string
  ) => void;
  recordBehavior: (
    graphId: string,
    event: "mistake" | "retention",
    nodeId: string,
    context?: string,
    score?: number
  ) => void;
  recordOutcome: (
    graphId: string,
    nodeId: string,
    outcome: "success" | "failure" | "neutral"
  ) => void;
}

function flushPatches(set: (fn: (s: CognitiveState) => Partial<CognitiveState>) => void) {
  if (!pendingPatches.length) return;
  const batch = [...pendingPatches];
  pendingPatches.length = 0;
  set((s) => {
    let graphs = { ...s.graphs };
    for (const patch of batch) {
      const g = graphs[patch.graphId];
      if (g) graphs = { ...graphs, [patch.graphId]: applyGraphPatch(g, patch) };
    }
    return { graphs };
  });
}

export const useCognitiveStore = create<CognitiveState>()(
  persist(
    (set, get) => ({
      graphs: {},
      scenarios: {},
      profile: defaultProfile,
      sessionMemory: {},
      behavioralMemory: {},
      activeGraphId: null,
      realityMode: "exploration",
      advisorMode: "tutor",

      setGraph: (graph, scenarios) =>
        set((s) => ({
          graphs: { ...s.graphs, [graph.id]: graph },
          scenarios: scenarios
            ? { ...s.scenarios, [graph.id]: scenarios }
            : s.scenarios,
          activeGraphId: graph.id,
        })),

      setActiveGraph: (id) => set({ activeGraphId: id }),

      setRealityMode: (mode) => set({ realityMode: mode }),

      setAdvisorMode: (mode) => set({ advisorMode: mode }),

      queueGraphPatch: (patch) => {
        pendingPatches.push(patch);
        if (patchTimer) clearTimeout(patchTimer);
        patchTimer = setTimeout(() => {
          flushPatches(set);
          patchTimer = null;
        }, GRAPH_PATCH_DEBOUNCE_MS);
      },

      applyPatchImmediate: (patch) => {
        set((s) => {
          const g = s.graphs[patch.graphId];
          if (!g) return s;
          return {
            graphs: {
              ...s.graphs,
              [patch.graphId]: applyGraphPatch(g, patch),
            },
          };
        });
      },

      updateNode: (graphId, nodeId, patch) => {
        get().queueGraphPatch({
          id: `patch-${Date.now()}`,
          graphId,
          timestamp: new Date().toISOString(),
          addedNodes: [],
          updatedNodes: [{ id: nodeId, ...patch, updatedAt: new Date().toISOString() }],
          removedNodeIds: [],
          addedEdges: [],
          updatedEdges: [],
          removedEdgeIds: [],
        });
      },

      mergeNodes: (graphId, sourceIds, label) => {
        const g = get().graphs[graphId];
        if (!g || sourceIds.length < 2) return;
        const primary = sourceIds[0];
        const merged = g.nodes.find((n) => n.id === primary);
        if (!merged) return;
        const remove = sourceIds.slice(1);
        get().queueGraphPatch({
          id: `patch-merge-${Date.now()}`,
          graphId,
          timestamp: new Date().toISOString(),
          addedNodes: [],
          updatedNodes: [{ id: primary, label, updatedAt: new Date().toISOString() }],
          removedNodeIds: remove,
          addedEdges: [],
          updatedEdges: [],
          removedEdgeIds: g.edges
            .filter((e) => remove.includes(e.source) || remove.includes(e.target))
            .map((e) => e.id),
          reason: "merge",
        });
      },

      splitNode: (graphId, nodeId, labels) => {
        const g = get().graphs[graphId];
        const parent = g?.nodes.find((n) => n.id === nodeId);
        if (!parent || !labels.length) return;
        const now = new Date().toISOString();
        const added = labels.map((label, i) => ({
          ...parent,
          id: `${nodeId}-split-${i}-${Date.now()}`,
          label,
          state: "unstable" as const,
          createdAt: now,
          updatedAt: now,
        }));
        get().queueGraphPatch({
          id: `patch-split-${Date.now()}`,
          graphId,
          timestamp: now,
          addedNodes: added,
          updatedNodes: [],
          removedNodeIds: [nodeId],
          addedEdges: added.map((n) => ({
            id: `e-${nodeId}-${n.id}`,
            source: nodeId,
            target: n.id,
            relationship_type: "derived_from" as const,
            strength: 0.5,
            decay_rate: 0.05,
          })),
          updatedEdges: [],
          removedEdgeIds: [],
          reason: "split",
        });
      },

      moveNode: (graphId, nodeId, position) => {
        const g = get().graphs[graphId];
        if (!g) return;
        set((s) => ({
          graphs: {
            ...s.graphs,
            [graphId]: {
              ...g,
              nodes: g.nodes.map((n) =>
                n.id === nodeId ? { ...n, position, updatedAt: new Date().toISOString() } : n
              ),
            },
          },
        }));
      },

      pinNode: (graphId, nodeId, pinned) => {
        get().updateNode(graphId, nodeId, { pinned });
      },

      annotateNode: (graphId, nodeId, annotation) => {
        get().updateNode(graphId, nodeId, { annotation });
      },

      recordSessionMessage: (graphId, role, content) =>
        set((s) => {
          const existing = s.sessionMemory[graphId] ?? {
            graphId,
            messages: [],
          };
          return {
            sessionMemory: {
              ...s.sessionMemory,
              [graphId]: {
                ...existing,
                messages: [
                  ...existing.messages,
                  { role, content, at: new Date().toISOString() },
                ].slice(-40),
              },
            },
          };
        }),

      recordBehavior: (graphId, event, nodeId, context, score) =>
        set((s) => {
          const existing = s.behavioralMemory[graphId] ?? {
            graphId,
            mistakes: [],
            confusion_patterns: [],
            avg_response_ms: 0,
            retention_events: [],
          };
          if (event === "mistake") {
            return {
              behavioralMemory: {
                ...s.behavioralMemory,
                [graphId]: {
                  ...existing,
                  mistakes: [
                    ...existing.mistakes,
                    { nodeId, context: context ?? "", at: new Date().toISOString() },
                  ].slice(-50),
                },
              },
            };
          }
          return {
            behavioralMemory: {
              ...s.behavioralMemory,
              [graphId]: {
                ...existing,
                retention_events: [
                  ...existing.retention_events,
                  {
                    nodeId,
                    score: score ?? 0.5,
                    at: new Date().toISOString(),
                  },
                ].slice(-50),
              },
            },
          };
        }),

      recordOutcome: (graphId, nodeId, outcome) => {
        const g = get().graphs[graphId];
        if (!g) return;
        const patch = driftPatchFromOutcome(graphId, nodeId, outcome, g.nodes);
        get().queueGraphPatch(patch);
        if (outcome === "failure") {
          get().recordBehavior(graphId, "mistake", nodeId, outcome);
        } else if (outcome === "success") {
          get().recordBehavior(graphId, "retention", nodeId, outcome, 0.8);
        }
        const weak = identifyWeakNodes(get().graphs[graphId]?.nodes ?? []);
        set((s) => ({
          profile: {
            ...s.profile,
            weak_domains: weak.map((n) => n.label).slice(0, 8),
            mastery_domains: (get().graphs[graphId]?.nodes ?? [])
              .filter((n) => n.state === "stable" || n.type === "mastery")
              .map((n) => n.label)
              .slice(0, 8),
          },
        }));
      },
    }),
    { name: "arc-cognitive-storage" }
  )
);
