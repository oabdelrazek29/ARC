"use client";

import { useMemo } from "react";

import { useCognitiveStore } from "@/store/cognitive-store";
import type { SessionMemory, ThinkingScenario } from "@/types/cognitive";

/** Stable empty refs — never use `?? []` inside Zustand selectors */
export const EMPTY_SESSION_MESSAGES: SessionMemory["messages"] = [];
export const EMPTY_SCENARIOS: ThinkingScenario[] = [];

export function useCognitiveGraphList() {
  const graphs = useCognitiveStore((s) => s.graphs);
  return useMemo(() => Object.values(graphs), [graphs]);
}

export function useCognitiveGraph(id: string | undefined) {
  return useCognitiveStore((s) => (id ? s.graphs[id] : undefined));
}

export function useCognitiveScenarios(graphId: string) {
  const scenarios = useCognitiveStore((s) => s.scenarios[graphId]);
  return scenarios ?? EMPTY_SCENARIOS;
}

export function useCognitiveSessionMessages(graphId: string) {
  const session = useCognitiveStore((s) => s.sessionMemory[graphId]);
  return session?.messages ?? EMPTY_SESSION_MESSAGES;
}
