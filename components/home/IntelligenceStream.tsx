"use client";

import { memo } from "react";

import type { SimStreamEvent } from "@/lib/simulation/types";

const KIND_COLOR: Record<SimStreamEvent["kind"], string> = {
  breakthrough: "text-[var(--arc-accent)]",
  confusion: "text-amber-500",
  restructure: "text-violet-400",
  mastery: "text-[var(--arc-accent)]",
  intervention: "text-fuchsia-400",
};

type Props = {
  events: SimStreamEvent[];
};

function IntelligenceStreamInner({ events }: Props) {
  return (
    <div className="arc-card flex max-h-[420px] flex-col overflow-hidden !p-0">
      <div className="border-b border-[var(--arc-border)] px-4 py-3">
        <h3 className="arc-mono text-xs font-semibold uppercase tracking-wider text-[var(--arc-accent)]">
          Intelligence stream
        </h3>
        <p className="text-[10px] text-[var(--arc-muted)]">Live · simulated</p>
      </div>
      <ul className="flex-1 space-y-0 overflow-y-auto p-2">
        {events.map((ev) => (
          <li
            key={ev.id}
            className="arc-stream-item border-b border-[var(--arc-border)] px-2 py-2.5 last:border-0"
          >
            <p className={`arc-mono text-[10px] uppercase ${KIND_COLOR[ev.kind]}`}>
              {ev.kind.replace("_", " ")}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-[var(--arc-fg)]">
              {ev.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const IntelligenceStream = memo(IntelligenceStreamInner);
