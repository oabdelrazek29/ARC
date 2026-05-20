"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { ArcCoach } from "@/components/arc/ArcCoach";
import { Button } from "@/components/ui/button";
import { NODE_TYPE_LABELS } from "@/constants/arc";
import { useArcStore } from "@/store/arc-store";
import type { SkillNode } from "@/types/arc";

const SkillTreeCanvas = dynamic(
  () =>
    import("@/components/skill-tree/SkillTreeCanvas").then(
      (m) => m.SkillTreeCanvas
    ),
  { ssr: false }
);

export default function TreePage() {
  const { id } = useParams<{ id: string }>();
  const tree = useArcStore((s) => s.trees[id]);
  const goalTitle = useArcStore((s) =>
    tree ? s.goals.find((g) => g.id === tree.goalId)?.title : undefined
  );
  const completeNode = useArcStore((s) => s.completeNode);
  const unlockDependentNodes = useArcStore((s) => s.unlockDependentNodes);
  const progress = useArcStore((s) => s.progress);

  const [selected, setSelected] = useState<SkillNode | null>(null);

  const onSelect = useCallback(
    (nodeId: string) => {
      const node = tree?.nodes.find((n) => n.id === nodeId);
      if (node && node.unlocked) setSelected(node);
    },
    [tree]
  );

  const handleComplete = () => {
    if (!selected || !tree || selected.completed || !selected.unlocked) return;
    completeNode(selected.id, selected.xpReward);
    unlockDependentNodes(tree.id, selected.id);
    setSelected(null);
  };

  if (!tree) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center text-zinc-400">
        Tree not found.{" "}
        <Link href="/goals/new" className="text-cyan-400 hover:underline">
          Create a goal
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row">
      <div className="flex-1">
        <div className="mb-4">
          <h1 className="font-bricolage text-2xl font-bold text-white">
            {tree.title}
          </h1>
          <p className="text-sm text-zinc-500">
            Level {progress.level} · {progress.totalXp} XP
          </p>
        </div>
        <SkillTreeCanvas tree={tree} onNodeSelect={onSelect} />
      </div>

      <aside className="w-full shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:w-80">
        {selected ? (
          <>
            <p className="text-xs uppercase tracking-wider text-cyan-400">
              {NODE_TYPE_LABELS[selected.nodeType]}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              {selected.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">{selected.description}</p>
            {selected.bossBattle && (
              <p className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
                Boss: {selected.bossBattle.challenge}
              </p>
            )}
            <Button
              className="mt-6 w-full gap-2"
              onClick={handleComplete}
              disabled={selected.completed}
            >
              <CheckCircle2 className="h-4 w-4" />
              {selected.completed
                ? "Completed"
                : `Complete (+${selected.xpReward} XP)`}
            </Button>
          </>
        ) : (
          <p className="text-sm text-zinc-500">
            Select an unlocked node on the tree to view details and complete it.
          </p>
        )}
      </aside>

      <ArcCoach
        goal={goalTitle ?? tree.title}
        nodeTitle={selected?.title}
        nodeDescription={selected?.description}
      />
    </div>
  );
}
