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
    <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 px-4 py-3 font-mono text-xs text-zinc-500">
      <p>
        Engine tick <span className="text-cyan-400">{tick}</span> ·{" "}
        {worlds.length} worlds ·{" "}
        <span className="text-amber-400/90">{totalUnstable}</span> unstable nodes
      </p>
      <p className="mt-1 text-[10px] text-zinc-600">
        Deterministic · in-memory · throttled 1.6s
      </p>
    </div>
  );
}

export const SimulationShell = memo(SimulationShellInner);
