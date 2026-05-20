"use client";

import { memo } from "react";
import Link from "next/link";

const ITEMS = [
  {
    title: "Graph-based learning",
    body: "Your mental model is a living graph — concepts, weaknesses, and mastery as nodes that evolve.",
  },
  {
    title: "AI advisor system",
    body: "Reasoning reads the graph first, targets weak nodes, and updates structure after each interaction.",
  },
  {
    title: "Adaptive cognitive modeling",
    body: "Drift tracks stable vs unstable understanding and reshapes how ARC teaches over time.",
  },
] as const;

function SystemExplanationPanelInner() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {ITEMS.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-zinc-800/60 bg-zinc-950/50 px-4 py-5"
        >
          <h3 className="text-sm font-medium text-cyan-300/90">{item.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">{item.body}</p>
        </div>
      ))}
      <div className="md:col-span-3 flex flex-wrap justify-center gap-4 pt-4">
        <Link
          href="/dashboard"
          className="text-sm text-zinc-400 underline-offset-4 hover:text-cyan-400 hover:underline"
        >
          Enter dashboard
        </Link>
        <Link
          href="/cognitive"
          className="text-sm text-zinc-400 underline-offset-4 hover:text-cyan-400 hover:underline"
        >
          Cognitive OS
        </Link>
        <Link
          href="/classic"
          className="text-sm text-zinc-600 underline-offset-4 hover:text-zinc-400 hover:underline"
        >
          Classic landing
        </Link>
      </div>
    </section>
  );
}

export const SystemExplanationPanel = memo(SystemExplanationPanelInner);
