"use client";

import { memo, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import { COGNITIVE_NODE_TYPE_LABELS } from "@/constants/cognitive";
import { cn } from "@/lib/utils";
import type { CognitiveNode } from "@/types/cognitive";

export type CognitiveNodeFlowData = {
  node: CognitiveNode;
  onSelect?: (id: string) => void;
};

function CognitiveNodeCardInner({ data, selected }: NodeProps) {
  const { node, onSelect } = data as CognitiveNodeFlowData;
  const unstable = node.state === "unstable" || node.state === "decaying";

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
        "min-w-[200px] max-w-[260px] cursor-pointer rounded-2xl border bg-[var(--arc-card)] px-3.5 py-3 transition-transform duration-200 will-change-transform",
        unstable ? "border-dashed" : "border-solid",
        selected && "ring-2 ring-[var(--arc-fg)] ring-offset-2 ring-offset-[var(--arc-bg)]",
        node.pinned && "ring-1 ring-[var(--arc-accent)]"
      )}
      style={{
        borderColor: unstable ? "var(--arc-muted)" : "var(--arc-border)",
        transform: selected ? "scale(1.02)" : "scale(1)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-1.5 !w-1.5 !border !border-[var(--arc-border)] !bg-[var(--arc-card)]"
      />
      <p className="arc-mono text-[10px] uppercase text-[var(--arc-muted)]">
        {COGNITIVE_NODE_TYPE_LABELS[node.type]}
      </p>
      <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--arc-fg)]">
        {node.label}
      </p>
      <div className="mt-2 flex justify-between arc-mono text-[10px] text-[var(--arc-muted)]">
        <span>{Math.round(node.confidence_score * 100)}%</span>
        <span className="capitalize">{node.state}</span>
      </div>
      {(node.state === "stable" || node.state === "strengthening") && (
        <span
          className="mt-2 inline-block h-1 w-1 rounded-full bg-[var(--arc-accent)]"
          aria-hidden
        />
      )}
      {node.annotation && (
        <p className="mt-1 truncate text-[10px] italic text-[var(--arc-muted)]">
          {node.annotation}
        </p>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1.5 !w-1.5 !border !border-[var(--arc-border)] !bg-[var(--arc-card)]"
      />
    </div>
  );
}

export const CognitiveNodeCard = memo(CognitiveNodeCardInner);
