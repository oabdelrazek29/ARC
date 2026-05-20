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
    <section>
      <div className="arc-feature-grid">
        {ITEMS.map((item) => (
          <div key={item.title} className="arc-card">
            <h3 className="arc-heading text-sm text-[var(--arc-accent)]">
              {item.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[var(--arc-muted)]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link
          href="/dashboard"
          className="text-[var(--arc-muted)] hover:text-[var(--arc-fg)]"
        >
          Dashboard
        </Link>
        <Link
          href="/cognitive"
          className="text-[var(--arc-muted)] hover:text-[var(--arc-fg)]"
        >
          Cognitive OS
        </Link>
        <Link
          href="/classic"
          className="text-[var(--arc-muted)] hover:text-[var(--arc-fg)]"
        >
          Classic landing
        </Link>
      </div>
    </section>
  );
}

export const SystemExplanationPanel = memo(SystemExplanationPanelInner);
