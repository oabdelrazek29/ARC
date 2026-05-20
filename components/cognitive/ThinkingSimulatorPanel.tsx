"use client";

import { useCognitiveStore } from "@/store/cognitive-store";
import { Button } from "@/components/ui/button";
import type { ThinkingScenario } from "@/types/cognitive";

type Props = {
  graphId: string;
  scenarios: ThinkingScenario[];
};

const KIND_LABELS: Record<ThinkingScenario["kind"], string> = {
  real_world: "Real world",
  contradiction: "Contradiction",
  reasoning_trap: "Reasoning trap",
  constrained: "Constrained",
  system_design: "System design",
};

export function ThinkingSimulatorPanel({ graphId, scenarios }: Props) {
  const recordOutcome = useCognitiveStore((s) => s.recordOutcome);

  return (
    <div className="arc-card">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
        Thinking simulation
      </h3>
      <p className="mt-1 text-xs text-[var(--arc-muted)]">
        Scenarios instead of quizzes — expose weak mental models
      </p>
      <ul className="mt-4 space-y-3">
        {scenarios.map((sc) => (
          <li
            key={sc.id}
            className="rounded-lg border border-[var(--arc-border)] bg-[var(--arc-bg)] p-3"
          >
            <p className="text-[10px] uppercase text-[var(--arc-muted)]">
              {KIND_LABELS[sc.kind]}
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--arc-fg)]">{sc.title}</p>
            <p className="mt-1 text-xs text-[var(--arc-muted)]">{sc.prompt}</p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const nodeId = sc.targetNodeIds[0];
                  if (nodeId) recordOutcome(graphId, nodeId, "failure");
                }}
              >
                Struggled
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const nodeId = sc.targetNodeIds[0];
                  if (nodeId) recordOutcome(graphId, nodeId, "success");
                }}
              >
                Nailed it
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
