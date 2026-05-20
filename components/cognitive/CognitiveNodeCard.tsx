"use client";

import { memo, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import {
  COGNITIVE_NODE_TYPE_LABELS,
  DRIFT_STATE_COLORS,
  NODE_TYPE_COLORS,
} from "@/constants/cognitive";
import { cn } from "@/lib/utils";
import type { CognitiveNode } from "@/types/cognitive";

export type CognitiveNodeFlowData = {
  node: CognitiveNode;
  onSelect?: (id: string) => void;
  heatmapIntensity?: number;
};

function CognitiveNodeCardInner({ data, selected }: NodeProps) {
  const { node, onSelect, heatmapIntensity = 0 } = data as CognitiveNodeFlowData;

  const handleClick = useCallback(() => {
    onSelect?.(node.id);
  }, [node.id, onSelect]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={cn(
        "min-w-[200px] max-w-[240px] cursor-pointer rounded-xl border-2 bg-zinc-900/95 px-3 py-2.5 transition-transform duration-200 will-change-transform",
        DRIFT_STATE_COLORS[node.state],
        NODE_TYPE_COLORS[node.type],
        selected && "ring-2 ring-cyan-400/80",
        node.pinned && "ring-1 ring-violet-400/50"
      )}
      style={{
        opacity: 0.85 + heatmapIntensity * 0.15,
        transform: selected ? "scale(1.02)" : "scale(1)",
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-cyan-500/60" />
      <p className="text-[10px] uppercase tracking-wider opacity-70">
        {COGNITIVE_NODE_TYPE_LABELS[node.type]}
      </p>
      <p className="mt-0.5 text-sm font-medium leading-snug text-white">
        {node.label}
      </p>
      <div className="mt-2 flex justify-between text-[10px] text-zinc-500">
        <span>{Math.round(node.confidence_score * 100)}% conf</span>
        <span className="capitalize">{node.state}</span>
      </div>
      {node.annotation && (
        <p className="mt-1 truncate text-[10px] italic text-zinc-500">
          {node.annotation}
        </p>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500/60" />
    </div>
  );
}

export const CognitiveNodeCard = memo(CognitiveNodeCardInner);
