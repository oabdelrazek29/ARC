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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
        Thinking simulation
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        Scenarios instead of quizzes — expose weak mental models
      </p>
      <ul className="mt-4 space-y-3">
        {scenarios.map((sc) => (
          <li
            key={sc.id}
            className="rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-3"
          >
            <p className="text-[10px] uppercase text-zinc-500">
              {KIND_LABELS[sc.kind]}
            </p>
            <p className="mt-1 text-sm font-medium text-white">{sc.title}</p>
            <p className="mt-1 text-xs text-zinc-400">{sc.prompt}</p>
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
