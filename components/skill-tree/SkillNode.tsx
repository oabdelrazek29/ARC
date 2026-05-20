"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Lock, Check, Swords, BookOpen, Hammer, HelpCircle } from "lucide-react";

import { NODE_TYPE_LABELS } from "@/constants/arc";
import type { SkillNode as SkillNodeData } from "@/types/arc";
import { cn } from "@/lib/utils";

const icons = {
  lesson: BookOpen,
  practice: Hammer,
  quiz: HelpCircle,
  project: Hammer,
  bossBattle: Swords,
};

export type SkillNodeFlowData = {
  node: SkillNodeData;
  onSelect?: (id: string) => void;
};

function SkillNodeComponent({ data }: NodeProps & { data: SkillNodeFlowData }) {
  const { node, onSelect } = data;
  const Icon = icons[node.nodeType] ?? BookOpen;
  const locked = !node.unlocked;
  const done = node.completed;

  return (
    <button
      type="button"
      disabled={locked}
      onClick={() => onSelect?.(node.id)}
      className={cn(
        "arc-skill-node group relative w-[180px] rounded-xl border px-3 py-3 text-left transition-transform duration-200 will-change-transform",
        locked && "arc-skill-node--locked opacity-50",
        done && "arc-skill-node--done",
        !locked && !done && "arc-skill-node--active hover:scale-[1.02]"
      )}
    >
      <Handle type="target" position={Position.Top} className="!h-1.5 !w-1.5 !border !border-[var(--arc-border)] !bg-[var(--arc-card)]" />
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--arc-border)] bg-[var(--arc-bg)] text-[var(--arc-fg)]">
          {locked ? (
            <Lock className="h-4 w-4" />
          ) : done ? (
            <Check className="h-4 w-4 text-[var(--arc-accent)]" />
          ) : (
            <Icon className="h-4 w-4" />
          )}
        </div>
        <span className="arc-mono text-[10px] uppercase text-[var(--arc-muted)]">
          {NODE_TYPE_LABELS[node.nodeType]}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-snug text-[var(--arc-fg)]">
        {node.title}
      </p>
      <p className="mt-1 line-clamp-2 text-xs text-[var(--arc-muted)]">
        {node.description}
      </p>
      <div className="arc-mono mt-2 flex items-center justify-between text-[10px] text-[var(--arc-muted)]">
        <span>{node.xpReward} XP</span>
        <span>{node.estimatedTime}m</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1.5 !w-1.5 !border !border-[var(--arc-border)] !bg-[var(--arc-card)]"
      />
    </button>
  );
}

export const SkillNodeCard = memo(SkillNodeComponent);
SkillNodeCard.displayName = "SkillNodeCard";
