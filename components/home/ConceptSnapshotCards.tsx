"use client";

import { memo } from "react";

const SNAPSHOTS = [
  {
    topic: "Neural networks",
    state: "forming",
    progress: 0.35,
    note: "Core intuition is taking shape. Next: how models actually learn from data.",
  },
  {
    topic: "Integration",
    state: "steady",
    progress: 0.62,
    note: "Patterns are holding. Practice problems are reinforcing the structure.",
  },
  {
    topic: "Threat modeling",
    state: "unclear",
    progress: 0.18,
    note: "A few ideas feel fuzzy. ARC will slow down and revisit foundations.",
  },
] as const;

function ConceptSnapshotCardsInner() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SNAPSHOTS.map((s) => (
        <article key={s.topic} className="arc-snapshot-card">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="arc-heading text-base">{s.topic}</h3>
            <span className="arc-mono text-[10px] text-[var(--arc-muted)]">
              {s.state}
            </span>
          </div>
          <p className="arc-lead mt-3 text-sm">{s.note}</p>
          <div className="arc-progress mt-4" aria-hidden>
            <div
              className="arc-progress-fill"
              style={{ width: `${Math.round(s.progress * 100)}%` }}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

export const ConceptSnapshotCards = memo(ConceptSnapshotCardsInner);
