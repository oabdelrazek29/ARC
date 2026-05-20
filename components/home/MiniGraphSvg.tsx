"use client";

import { memo, useMemo } from "react";

import type { SimEdge, SimNode } from "@/lib/simulation/types";

const STATE_STROKE: Record<SimNode["state"], string> = {
  stable: "#34d399",
  unstable: "#fbbf24",
  strengthening: "#22d3ee",
  decaying: "#fb7185",
};

type Props = {
  nodes: SimNode[];
  edges: SimEdge[];
  className?: string;
  heatmap?: boolean;
};

function MiniGraphSvgInner({ nodes, edges, className, heatmap }: Props) {
  const edgeEls = useMemo(
    () =>
      edges.map((e) => {
        const from = nodes.find((n) => n.id === e.from);
        const to = nodes.find((n) => n.id === e.to);
        if (!from || !to) return null;
        return (
          <line
            key={e.id}
            x1={from.x * 100}
            y1={from.y * 100}
            x2={to.x * 100}
            y2={to.y * 100}
            stroke="rgba(34,211,238,0.25)"
            strokeWidth={0.6}
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
      {edgeEls}
      {nodes.map((n) => {
        const heat = heatmap ? 1 - n.confidence : 0;
        return (
          <g key={n.id} transform={`translate(${n.x * 100}, ${n.y * 100})`}>
            {heatmap && (
              <circle
                r={10}
                fill={`rgba(251,191,36,${0.08 + heat * 0.2})`}
              />
            )}
            <circle
              r={n.state === "unstable" ? 4.5 : 3.5}
              fill={STATE_STROKE[n.state]}
              opacity={0.5 + n.confidence * 0.5}
              className={n.state === "unstable" ? "arc-node-pulse" : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}

export const MiniGraphSvg = memo(MiniGraphSvgInner);
