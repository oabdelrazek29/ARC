"use client";

import { memo } from "react";

import type { SimUserWorld } from "@/lib/simulation/types";

type Props = {
  worlds: SimUserWorld[];
  tick: number;
};

/** Lazy-loaded tick indicator — keeps simulation module isolated */
function SimulationShellInner({ worlds, tick }: Props) {
  const totalUnstable = worlds.reduce((s, w) => s + w.unstableCount, 0);
  return (
    <div className="arc-card arc-mono px-4 py-3 text-xs text-[var(--arc-muted)]">
      <p>
        Engine tick <span className="text-[var(--arc-accent)]">{tick}</span> ·{" "}
        {worlds.length} worlds ·{" "}
        <span className="text-[var(--arc-fg)]/80">{totalUnstable}</span> unstable nodes
      </p>
      <p className="mt-1 text-[10px] opacity-70">
        Deterministic · in-memory · throttled 1.6s
      </p>
    </div>
  );
}

export const SimulationShell = memo(SimulationShellInner);
