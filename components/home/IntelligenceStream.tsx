"use client";

import { memo } from "react";

import type { SimStreamEvent } from "@/lib/simulation/types";

const KIND_COLOR: Record<SimStreamEvent["kind"], string> = {
  breakthrough: "text-emerald-400",
  confusion: "text-amber-400",
  restructure: "text-violet-400",
  mastery: "text-cyan-400",
  intervention: "text-fuchsia-400",
};

type Props = {
  events: SimStreamEvent[];
};

function IntelligenceStreamInner({ events }: Props) {
  return (
    <div className="flex max-h-[420px] flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-sm">
      <div className="border-b border-zinc-800/80 px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
          Intelligence stream
        </h3>
        <p className="text-[10px] text-zinc-600">Live · simulated</p>
      </div>
      <ul className="flex-1 space-y-0 overflow-y-auto p-2">
        {events.map((ev) => (
          <li
            key={ev.id}
            className="arc-stream-item border-b border-zinc-900/80 px-2 py-2.5 last:border-0"
          >
            <p className={`text-[10px] uppercase ${KIND_COLOR[ev.kind]}`}>
              {ev.kind.replace("_", " ")}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-zinc-300">
              {ev.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const IntelligenceStream = memo(IntelligenceStreamInner);
