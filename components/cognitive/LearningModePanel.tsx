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
    <div className="arc-card">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--arc-accent)]">
        Learning reality
      </h3>
      <p className="mt-1 text-xs text-[var(--arc-muted)]">{REALITY_MODE_DESCRIPTIONS[mode]}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs transition-opacity duration-200",
              mode === m
                ? "bg-[var(--arc-accent)]/15 text-[var(--arc-accent)]"
                : "bg-[var(--arc-card)] text-[var(--arc-muted)] hover:text-[var(--arc-fg)]"
            )}
          >
            {REALITY_MODE_LABELS[m]}
          </button>
        ))}
      </div>
    </div>
  );
}
