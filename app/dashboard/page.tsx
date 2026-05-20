"use client";

import { Flame, Target, Trophy, Zap } from "lucide-react";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-3xl font-bold text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-zinc-400">
            Your learning OS — trees, XP, and daily momentum.
          </p>
        </div>
        <Link href="/goals/new" className={buttonVariants()}>
          New goal
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={Zap}
          label="Level"
          value={String(progress.level)}
          sub={`${xpInLevel} / ${XP_PER_LEVEL} XP`}
        />
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${progress.streak}d`}
          sub="Keep it going"
        />
        <StatCard
          icon={Target}
          label="Active trees"
          value={String(Object.keys(trees).length)}
          sub={`${goals.length} goals`}
        />
        <StatCard
          icon={Trophy}
          label="Achievements"
          value={String(progress.achievements.length)}
          sub={`of ${ACHIEVEMENTS.length}`}
        />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <p className="text-sm text-zinc-500">XP progress</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-[width] duration-300"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 p-6">
          <h2 className="font-semibold text-white">Active skill trees</h2>
          {goals.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">
              No goals yet.{" "}
              <Link href="/goals/new" className="text-cyan-400 hover:underline">
                Create your first tree
              </Link>
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {goals.map((g) => (
                <li key={g.id}>
                  <Link
                    href={g.treeId ? `/trees/${g.treeId}` : "/goals/new"}
                    className="block rounded-lg border border-zinc-800 px-4 py-3 transition-colors hover:border-cyan-500/30 hover:bg-zinc-900"
                  >
                    <p className="font-medium text-white">{g.title}</p>
                    <p className="text-xs text-zinc-500">
                      {g.contextComplete ? "Tree ready" : "Needs context"}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-zinc-800 p-6">
          <h2 className="font-semibold text-white">Recommended next</h2>
          {nextNode ? (
            <div className="mt-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
              <p className="font-medium text-cyan-200">{nextNode.title}</p>
              <p className="mt-1 text-sm text-zinc-400">{nextNode.description}</p>
              <p className="mt-2 text-xs text-zinc-500">
                +{nextNode.xpReward} XP · {nextNode.estimatedTime} min
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">
              Complete a goal setup to see your next node.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 p-6">
        <h2 className="mb-4 font-semibold text-white">Leaderboard snapshot</h2>
        <ul className="space-y-2 text-sm">
          {MOCK_LEADERBOARD.slice(0, 4).map((e, i) => (
            <li
              key={e.id}
              className="flex justify-between border-b border-zinc-800/60 py-2 last:border-0"
            >
              <span className="text-zinc-400">#{i + 1}</span>
              <span className="text-white">{e.name}</span>
              <span className="text-cyan-300">{e.xp} XP</span>
            </li>
          ))}
        </ul>
      </div>

      <ArcCoach goal={goals[0]?.title} />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <Icon className="mb-2 h-5 w-5 text-cyan-400" />
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-zinc-500">{sub}</p>
    </div>
  );
}
