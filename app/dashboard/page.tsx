"use client";

import Link from "next/link";
import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PillBadge } from "@/components/arc-ui/PillBadge";
import { StatBlock } from "@/components/arc-ui/StatBlock";
import { ArcCoach } from "@/components/arc/ArcCoach";
import { ACHIEVEMENTS, MOCK_LEADERBOARD, XP_PER_LEVEL } from "@/constants/arc";
import { useArcStore } from "@/store/arc-store";

export default function DashboardPage() {
  const goals = useArcStore((s) => s.goals);
  const trees = useArcStore((s) => s.trees);
  const progress = useArcStore((s) => s.progress);

  const xpInLevel = progress.totalXp % XP_PER_LEVEL;
  const xpPercent = (xpInLevel / XP_PER_LEVEL) * 100;
  const activeTree = goals.find((g) => g.treeId)?.treeId;
  const tree = activeTree ? trees[activeTree] : null;
  const nextNode = tree?.nodes.find((n) => n.unlocked && !n.completed);

  return (
    <div className="arc-page arc-dot-grid">
      <section className="arc-section !pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <PillBadge>Control center</PillBadge>
            <h1 className="arc-heading mt-4 text-3xl">Dashboard</h1>
            <p className="mt-2 text-sm text-[var(--arc-muted)]">
              Your learning OS — trees, XP, and momentum.
            </p>
          </div>
          <ArcButton href="/goals/new">New goal</ArcButton>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock value={String(progress.level)} label="Level" sub={`${xpInLevel}/${XP_PER_LEVEL} XP`} />
          <StatBlock value={`${progress.streak}d`} label="Streak" sub="Keep going" />
          <StatBlock
            value={String(Object.keys(trees).length)}
            label="Active trees"
            sub={`${goals.length} goals`}
          />
          <StatBlock
            value={String(progress.achievements.length)}
            label="Achievements"
            sub={`of ${ACHIEVEMENTS.length}`}
          />
        </div>

        <div className="arc-card mt-8">
          <p className="arc-mono text-[10px] uppercase tracking-wider text-[var(--arc-muted)]">
            XP progress
          </p>
          <div className="arc-progress mt-3">
            <div className="arc-progress-fill" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="arc-card">
            <h2 className="arc-heading text-base">Active skill trees</h2>
            {goals.length === 0 ? (
              <p className="mt-4 text-sm text-[var(--arc-muted)]">
                No goals yet.{" "}
                <Link href="/goals/new" className="text-[var(--arc-accent)] hover:underline">
                  Create your first tree
                </Link>
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {goals.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={g.treeId ? `/trees/${g.treeId}` : "/goals/new"}
                      className="block rounded-xl border border-[var(--arc-border)] px-4 py-3 transition-colors hover:border-[var(--arc-hover-border)]"
                    >
                      <p className="font-medium">{g.title}</p>
                      <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
                        {g.contextComplete ? "Tree ready" : "Needs context"}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="arc-card">
            <h2 className="arc-heading text-base">Recommended next</h2>
            {nextNode ? (
              <div className="mt-4 rounded-xl border border-[var(--arc-accent)]/30 bg-[var(--arc-accent)]/5 p-4">
                <p className="font-medium text-[var(--arc-accent)]">{nextNode.title}</p>
                <p className="mt-1 text-sm text-[var(--arc-muted)]">{nextNode.description}</p>
                <p className="arc-mono mt-2 text-[10px] text-[var(--arc-muted)]">
                  +{nextNode.xpReward} XP · {nextNode.estimatedTime} min
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-[var(--arc-muted)]">
                Complete a goal setup to see your next node.
              </p>
            )}
          </div>
        </div>

        <div className="arc-card mt-8">
          <h2 className="arc-heading mb-4 text-base">Leaderboard snapshot</h2>
          <ul className="space-y-2 text-sm">
            {MOCK_LEADERBOARD.slice(0, 4).map((e, i) => (
              <li
                key={e.id}
                className="flex justify-between border-b border-[var(--arc-border)] py-2 last:border-0"
              >
                <span className="arc-mono text-[var(--arc-muted)]">#{i + 1}</span>
                <span>{e.name}</span>
                <span className="text-[var(--arc-accent)]">{e.xp} XP</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <ArcCoach goal={goals[0]?.title} />
        </div>
      </section>
    </div>
  );
}
