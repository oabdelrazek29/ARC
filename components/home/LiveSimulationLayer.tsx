"use client";

import { memo } from "react";

import { MiniGraphSvg } from "@/components/home/MiniGraphSvg";
import type { SimUserWorld } from "@/lib/simulation/types";

type Props = {
  worlds: SimUserWorld[];
};

function LiveSimulationLayerInner({ worlds }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {worlds.map((w) => (
        <article key={w.id} className="arc-card !p-3">
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <div>
              <p className="text-sm font-medium">{w.label}</p>
              <p className="arc-mono text-[10px] text-[var(--arc-muted)]">
                learning {w.topic}
              </p>
            </div>
            <span className="arc-mono text-[10px] text-[var(--arc-accent)]">
              {Math.round(w.progress * 100)}%
            </span>
          </div>
          <MiniGraphSvg
            nodes={w.nodes}
            edges={w.edges}
            className="h-28 w-full"
            heatmap
          />
          <div className="mt-2 flex justify-between arc-mono text-[10px] text-[var(--arc-muted)]">
            <span>{w.unstableCount} unstable</span>
            <span>{w.nodes.length} nodes</span>
          </div>
        </article>
      ))}
    </div>
  );
}

export const LiveSimulationLayer = memo(LiveSimulationLayerInner);
