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
    <section className="arc-card">
      <h2 className="arc-mono text-xs font-semibold uppercase tracking-wider text-[var(--arc-muted)]">
        Knowledge heat zones
      </h2>
      <p className="mt-1 text-[10px] text-[var(--arc-muted)]">
        Abstract cluster view · understanding density
      </p>
      <MiniGraphSvg
        nodes={merged.nodes}
        edges={merged.edges}
        className="mt-3 h-40 w-full"
        heatmap
      />
      <div className="mt-2 flex flex-wrap gap-3 arc-mono text-[10px] text-[var(--arc-muted)]">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[var(--arc-accent)]" /> stable
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> unstable
        </span>
      </div>
    </section>
  );
}

export const MiniGraphPreview = memo(MiniGraphPreviewInner);
