"use client";

import {
  REALITY_MODE_DESCRIPTIONS,
  REALITY_MODE_LABELS,
} from "@/constants/cognitive";
import { useCognitiveStore } from "@/store/cognitive-store";
import type { LearningRealityMode } from "@/types/cognitive";
import { cn } from "@/lib/utils";

const MODES: LearningRealityMode[] = [
  "exploration",
  "compression",
  "stress_test",
  "construction",
  "reflection",
];

export function LearningModePanel() {
  const mode = useCognitiveStore((s) => s.realityMode);
  const setMode = useCognitiveStore((s) => s.setRealityMode);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
        Learning reality
      </h3>
      <p className="mt-1 text-xs text-zinc-500">{REALITY_MODE_DESCRIPTIONS[mode]}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs transition-opacity duration-200",
              mode === m
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            )}
          >
            {REALITY_MODE_LABELS[m]}
          </button>
        ))}
      </div>
    </div>
  );
}
