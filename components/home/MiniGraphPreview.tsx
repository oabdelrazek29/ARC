"use client";

import { memo } from "react";

import { MiniGraphSvg } from "@/components/home/MiniGraphSvg";
import type { SimUserWorld } from "@/lib/simulation/types";

type Props = {
  worlds: SimUserWorld[];
};

function MiniGraphPreviewInner({ worlds }: Props) {
  const merged = worlds[0];
  if (!merged) return null;

  return (
    <section className="rounded-xl border border-zinc-800/60 bg-zinc-950/40 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-violet-400/80">
        Knowledge heat zones
      </h2>
      <p className="mt-1 text-[10px] text-zinc-600">
        Abstract cluster view · understanding density
      </p>
      <MiniGraphSvg
        nodes={merged.nodes}
        edges={merged.edges}
        className="mt-3 h-40 w-full"
        heatmap
      />
      <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> stable
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> unstable
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-cyan-400" /> strengthening
        </span>
      </div>
    </section>
  );
}

export const MiniGraphPreview = memo(MiniGraphPreviewInner);
