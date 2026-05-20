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
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !bg-cyan-400/80" />
      <div className="flex items-start justify-between gap-2">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            node.nodeType === "bossBattle"
              ? "bg-amber-500/20 text-amber-300"
              : "bg-cyan-500/15 text-cyan-300"
          )}
        >
          {locked ? (
            <Lock className="h-4 w-4" />
          ) : done ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Icon className="h-4 w-4" />
          )}
        </div>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500">
          {NODE_TYPE_LABELS[node.nodeType]}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-tight text-zinc-100">
        {node.title}
      </p>
      <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{node.description}</p>
      <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400">
        <span>{node.xpReward} XP</span>
        <span>{node.estimatedTime}m</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !bg-cyan-400/80" />
    </button>
  );
}

export const SkillNodeCard = memo(SkillNodeComponent);
SkillNodeCard.displayName = "SkillNodeCard";
