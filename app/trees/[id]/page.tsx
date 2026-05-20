"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { PillBadge } from "@/components/arc-ui/PillBadge";
import { ArcCoach } from "@/components/arc/ArcCoach";
import { ArcButton } from "@/components/arc-ui/ArcButton";
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
      <div className="arc-page arc-dot-grid py-20 text-center text-[var(--arc-muted)]">
        Tree not found.{" "}
        <Link href="/goals/new" className="text-[var(--arc-accent)] hover:underline">
          Create a goal
        </Link>
      </div>
    );
  }

  return (
    <div className="arc-page arc-dot-grid">
      <div className="arc-section-wide flex max-w-7xl flex-col gap-6 !py-8 lg:flex-row">
        <div className="flex-1">
          <PillBadge>Skill tree</PillBadge>
          <h1 className="arc-heading mt-3 text-2xl">{tree.title}</h1>
          <p className="arc-mono mt-1 text-xs text-[var(--arc-muted)]">
            Level {progress.level} · {progress.totalXp} XP
          </p>
          <div className="arc-graph-surface mt-4 min-h-[480px]">
            <SkillTreeCanvas tree={tree} onNodeSelect={onSelect} />
          </div>
        </div>

        <aside className="arc-card w-full shrink-0 lg:w-80">
          {selected ? (
            <>
              <p className="arc-mono text-[10px] uppercase tracking-wider text-[var(--arc-accent)]">
                {NODE_TYPE_LABELS[selected.nodeType]}
              </p>
              <h2 className="arc-heading mt-2 text-lg">{selected.title}</h2>
              <p className="mt-2 text-sm text-[var(--arc-muted)]">
                {selected.description}
              </p>
              {selected.bossBattle && (
                <p className="mt-4 rounded-xl border border-[var(--arc-accent)]/30 bg-[var(--arc-accent)]/5 p-3 text-sm">
                  Boss: {selected.bossBattle.challenge}
                </p>
              )}
              <ArcButton
                className="mt-6 w-full gap-2"
                onClick={handleComplete}
                disabled={selected.completed}
              >
                <CheckCircle2 className="h-4 w-4" />
                {selected.completed
                  ? "Completed"
                  : `Complete (+${selected.xpReward} XP)`}
              </ArcButton>
            </>
          ) : (
            <p className="text-sm text-[var(--arc-muted)]">
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
    </div>
  );
}
