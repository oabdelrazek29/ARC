"use client";

import { memo, useMemo } from "react";

import type { SimEdge, SimNode } from "@/lib/simulation/types";

type Props = {
  nodes: SimNode[];
  edges: SimEdge[];
  className?: string;
  heatmap?: boolean;
};

/** Monochrome constellation-style graph preview */
function MiniGraphSvgInner({ nodes, edges, className }: Props) {
  const edgeEls = useMemo(
    () =>
      edges.map((e) => {
        const from = nodes.find((n) => n.id === e.from);
        const to = nodes.find((n) => n.id === e.to);
        if (!from || !to) return null;
        const weak = e.id.includes("mis") || e.id.includes("weak");
        return (
          <line
            key={e.id}
            x1={from.x * 100}
            y1={from.y * 100}
            x2={to.x * 100}
            y2={to.y * 100}
            stroke="var(--arc-graph-edge)"
            strokeWidth={weak ? 0.4 : 0.7}
            strokeDasharray={weak ? "2 3" : undefined}
            opacity={weak ? 0.35 : 0.55}
          />
        );
      }),
    [edges, nodes]
  );

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="arc-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--arc-fg)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--arc-fg)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {edgeEls}
      {nodes.map((n) => {
        const cx = n.x * 100;
        const cy = n.y * 100;
        const unstable = n.state === "unstable" || n.state === "decaying";
        const mastered = n.state === "stable" || n.state === "strengthening";
        const r = unstable ? 5 : 4;

        return (
          <g key={n.id}>
            <circle cx={cx} cy={cy} r={12} fill="url(#arc-node-glow)" />
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="var(--arc-card)"
              stroke="var(--arc-fg)"
              strokeWidth={unstable ? 0.6 : 1}
              strokeDasharray={unstable ? "2 2" : undefined}
              opacity={0.55 + n.confidence * 0.45}
            />
            {mastered && (
              <circle
                cx={cx}
                cy={cy}
                r={1.5}
                fill="var(--arc-accent)"
                opacity={0.9}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export const MiniGraphSvg = memo(MiniGraphSvgInner);
