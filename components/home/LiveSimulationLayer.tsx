"use client";

import { memo } from "react";

import { MiniGraphSvg } from "@/components/home/MiniGraphSvg";
import type { SimUserWorld } from "@/lib/simulation/types";

type Props = {
  worlds: SimUserWorld[];
};

function LiveSimulationLayerInner({ worlds }: Props) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Live cognitive systems
        </h2>
        <p className="text-xs text-zinc-600">Simulated learners · local engine</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {worlds.map((w) => (
          <article
            key={w.id}
            className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3 backdrop-blur-sm"
          >
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">{w.label}</p>
                <p className="text-[10px] text-zinc-500">learning {w.topic}</p>
              </div>
              <span className="text-[10px] text-cyan-500/80">
                {Math.round(w.progress * 100)}%
              </span>
            </div>
            <MiniGraphSvg
              nodes={w.nodes}
              edges={w.edges}
              className="h-28 w-full"
              heatmap
            />
            <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
              <span>{w.unstableCount} unstable</span>
              <span>{w.nodes.length} nodes</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export const LiveSimulationLayer = memo(LiveSimulationLayerInner);
