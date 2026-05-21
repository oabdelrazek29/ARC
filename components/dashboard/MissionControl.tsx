"use client";

import Link from "next/link";
import { AlertTriangle, BookOpen, Flame, Target } from "lucide-react";

import { StatBlock } from "@/components/arc-ui/StatBlock";
import { ACHIEVEMENTS, MOCK_LEADERBOARD, XP_PER_LEVEL } from "@/constants/arc";
import { skillTreeToCourse } from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";
import { useInstructorStore } from "@/store/instructor-store";

export function MissionControl() {
  const goals = useArcStore((s) => s.goals);
  const trees = useArcStore((s) => s.trees);
  const progress = useArcStore((s) => s.progress);
  const weaknesses = useInstructorStore((s) => s.memory.weaknesses);

  const xpInLevel = progress.totalXp % XP_PER_LEVEL;
  const xpPercent = (xpInLevel / XP_PER_LEVEL) * 100;
  const activeTree = goals.find((g) => g.treeId)?.treeId;
  const tree = activeTree ? trees[activeTree] : null;
  const course = tree ? skillTreeToCourse(tree, progress.totalXp) : null;
  const nextNode = tree?.nodes.find((n) => n.unlocked && !n.completed);

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock
          value={String(progress.level)}
          label="Level"
          sub={`${xpInLevel}/${XP_PER_LEVEL} XP`}
        />
        <StatBlock
          value={`${progress.streak}d`}
          label="Streak"
          sub="Momentum"
        />
        <StatBlock
          value={course ? `${course.masteryPercent}%` : "—"}
          label="Mastery"
          sub={course?.title ?? "No active course"}
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
          <div
            className="arc-progress-fill"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      <div className="arc-mission-grid mt-8">
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title flex items-center gap-1.5">
            <BookOpen className="h-3 w-3" aria-hidden />
            Active courses
          </p>
          {goals.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--arc-muted)]">
              <Link href="/learn/create" className="text-[var(--arc-accent)] hover:underline">
                Start a learning path
              </Link>
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {goals.map((g) => (
                <li key={g.id}>
                  <Link
                    href={g.treeId ? `/courses/${g.treeId}` : "/learn/create"}
                    className="block rounded-lg border border-[var(--arc-border)] px-3 py-2 hover:border-[var(--arc-hover-border)]"
                  >
                    {g.title}
                    {g.treeId && trees[g.treeId] && (
                      <span className="arc-mono ml-2 text-[10px] text-[var(--arc-muted)]">
                        {skillTreeToCourse(trees[g.treeId], progress.totalXp)
                          .masteryPercent}
                        %
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title flex items-center gap-1.5">
            <Target className="h-3 w-3" aria-hidden />
            AI recommendation
          </p>
          {nextNode ? (
            <div className="mt-3">
              <p className="font-medium text-[var(--arc-accent)]">
                {nextNode.title}
              </p>
              <p className="mt-1 text-sm text-[var(--arc-muted)]">
                {nextNode.description}
              </p>
              {activeTree && (
                <Link
                  href={`/courses/${activeTree}`}
                  className="arc-btn arc-btn-ghost mt-3 inline-block text-xs"
                >
                  Open course →
                </Link>
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[var(--arc-muted)]">
              Complete goal setup to unlock your next lesson.
            </p>
          )}
        </div>

        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title flex items-center gap-1.5">
            <Flame className="h-3 w-3" aria-hidden />
            Study streak
          </p>
          <p className="mt-3 text-2xl font-semibold">{progress.streak} days</p>
          <p className="mt-1 text-xs text-[var(--arc-muted)]">
            Professional momentum — not cartoon gamification.
          </p>
        </div>

        {weaknesses.length > 0 && (
          <div className="arc-mission-widget md:col-span-2">
            <p className="arc-mission-widget__title flex items-center gap-1.5 text-[var(--arc-accent)]">
              <AlertTriangle className="h-3 w-3" aria-hidden />
              Weak topic alerts
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[var(--arc-muted)]">
              {weaknesses.slice(0, 5).map((w) => (
                <li key={w.id}>{w.concept}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Leaderboard snapshot</p>
          <ul className="mt-3 space-y-2 text-sm">
            {MOCK_LEADERBOARD.slice(0, 4).map((e, i) => (
              <li
                key={e.id}
                className="flex justify-between border-b border-[var(--arc-border)] py-1.5 last:border-0"
              >
                <span className="arc-mono text-[var(--arc-muted)]">#{i + 1}</span>
                <span>{e.name}</span>
                <span className="text-[var(--arc-accent)]">{e.xp} XP</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
