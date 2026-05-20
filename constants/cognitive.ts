import type {
  AdvisorMode,
  CognitiveEdgeType,
  CognitiveNodeType,
  LearningRealityMode,
  NodeDriftState,
} from "@/types/cognitive";

export const COGNITIVE_NODE_TYPE_LABELS: Record<CognitiveNodeType, string> = {
  concept: "Concept",
  skill: "Skill",
  project: "Project",
  misconception: "Misconception",
  weakness: "Weakness",
  mastery: "Mastery",
  memory_trace: "Memory trace",
  reasoning_pattern: "Reasoning pattern",
};

export const COGNITIVE_EDGE_LABELS: Record<CognitiveEdgeType, string> = {
  depends_on: "Depends on",
  reinforces: "Reinforces",
  contradicts: "Contradicts",
  causes_confusion: "Causes confusion",
  unlocks: "Unlocks",
  derived_from: "Derived from",
  strengthens: "Strengthens",
};

export const DRIFT_STATE_LABELS: Record<NodeDriftState, string> = {
  stable: "Stable",
  unstable: "Unstable",
  decaying: "Decaying",
  strengthening: "Strengthening",
};

export const REALITY_MODE_LABELS: Record<LearningRealityMode, string> = {
  exploration: "Exploration",
  compression: "Compression",
  stress_test: "Stress test",
  construction: "Construction",
  reflection: "Reflection",
};

export const REALITY_MODE_DESCRIPTIONS: Record<LearningRealityMode, string> = {
  exploration: "Free navigation — curiosity-driven graph exploration.",
  compression: "Summarize clusters into core principles.",
  stress_test: "Rapid questioning to expose weak nodes.",
  construction: "Build projects using your knowledge graph.",
  reflection: "AI-assisted graph restructuring from behavior.",
};

export const ADVISOR_MODE_LABELS: Record<AdvisorMode, string> = {
  tutor: "Tutor",
  debug: "Debug",
  socratic: "Socratic",
  builder: "Builder",
  analyst: "Analyst",
};

export const DRIFT_STATE_COLORS: Record<NodeDriftState, string> = {
  stable: "border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
  unstable: "border-amber-400/60 animate-pulse shadow-[0_0_14px_rgba(251,191,36,0.35)]",
  decaying: "border-rose-500/50 opacity-80 shadow-[0_0_8px_rgba(244,63,94,0.2)]",
  strengthening: "border-cyan-400/60 shadow-[0_0_16px_rgba(34,211,238,0.35)]",
};

export const NODE_TYPE_COLORS: Record<CognitiveNodeType, string> = {
  concept: "bg-violet-500/20 text-violet-200",
  skill: "bg-cyan-500/20 text-cyan-200",
  project: "bg-blue-500/20 text-blue-200",
  misconception: "bg-rose-500/25 text-rose-200",
  weakness: "bg-orange-500/20 text-orange-200",
  mastery: "bg-emerald-500/25 text-emerald-200",
  memory_trace: "bg-zinc-500/25 text-zinc-300",
  reasoning_pattern: "bg-fuchsia-500/20 text-fuchsia-200",
};

export const GRAPH_PATCH_DEBOUNCE_MS = 400;
export const ADVISOR_CACHE_TTL_MS = 5 * 60 * 1000;
export const DEFAULT_CONFIDENCE = 0.35;
export const DEFAULT_RETENTION = 0.4;
