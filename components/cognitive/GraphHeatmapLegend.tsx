"use client";

import { DRIFT_STATE_LABELS } from "@/constants/cognitive";
import type { NodeDriftState } from "@/types/cognitive";

const STATES: NodeDriftState[] = [
  "stable",
  "unstable",
  "decaying",
  "strengthening",
];

export function GraphHeatmapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-500">
      <span className="uppercase tracking-wider">Understanding heatmap</span>
      {STATES.map((s) => (
        <span key={s} className="flex items-center gap-1">
          <span
            className={`h-2 w-2 rounded-full ${
              s === "stable"
                ? "bg-emerald-400"
                : s === "unstable"
                  ? "bg-amber-400"
                  : s === "decaying"
                    ? "bg-rose-400"
                    : "bg-cyan-400"
            }`}
          />
          {DRIFT_STATE_LABELS[s]}
        </span>
      ))}
    </div>
  );
}
