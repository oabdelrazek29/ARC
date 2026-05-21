"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { BookOpen, Brain, Flame, Sparkles } from "lucide-react";

import { TypewriterLabel } from "@/components/TypewriterLabel";
import { useClerkEnabled } from "@/components/providers/AuthProvider";
import { skillTreeToCourse } from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";
import { useInstructorStore } from "@/store/instructor-store";

export function DashboardHome() {
  const clerkEnabled = useClerkEnabled();
  const { user } = useUser();
  const goals = useArcStore((s) => s.goals);
  const trees = useArcStore((s) => s.trees);
  const progress = useArcStore((s) => s.progress);
  const weaknesses = useInstructorStore((s) => s.memory.weaknesses);

  const name =
    user?.firstName ?? user?.username ?? (clerkEnabled ? "Learner" : "Guest");

  const activeGoal = goals.find((g) => g.treeId);
  const activeTree = activeGoal?.treeId ? trees[activeGoal.treeId] : null;
  const course = activeTree
    ? skillTreeToCourse(activeTree, progress.totalXp)
    : null;

  return (
    <>
      <TypewriterLabel
        text="§ Your workspace · Edition MMXXVI"
        className="arc-section-marker block"
        delay={150}
      />
      <p className="arc-mono mt-4 text-[11px] text-[var(--arc-tertiary)]">
        Welcome back, {name}.
      </p>
      <h1 className="arc-section-title mt-2 text-3xl md:text-4xl">
        Your learning desk
      </h1>
      <p className="arc-body mt-3 text-sm">
        Here is your current learning progress.
      </p>

      <div className="arc-dashboard-grid">
        <Link href={course ? `/courses/${activeGoal?.treeId}` : "/courses/create"} className="arc-dashboard-card block">
          <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-accent)]">
            Continue Learning
          </p>
          <p className="arc-body mt-3 text-base text-[var(--arc-fg)]">
            {course?.title ?? "Create your first course"}
          </p>
          {course && (
            <p className="arc-mono mt-2 text-[10px] text-[var(--arc-muted)]">
              {course.masteryPercent}% mastery
            </p>
          )}
        </Link>

        <div className="arc-dashboard-card">
          <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-accent)] flex items-center gap-1">
            <BookOpen className="h-3 w-3" aria-hidden />
            Today&apos;s Lessons
          </p>
          <p className="arc-body mt-3 text-sm">
            {course?.phases.flatMap((p) => p.modules).length ?? 0} modules ·{" "}
            {course ? "pick up where you left off" : "none scheduled"}
          </p>
        </div>

        <div className="arc-dashboard-card">
          <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-accent)] flex items-center gap-1">
            <Flame className="h-3 w-3" aria-hidden />
            Study Streak
          </p>
          <p className="arc-display mt-2 text-4xl font-light">{progress.streak}d</p>
        </div>

        <Link href="/tutor" className="arc-dashboard-card block">
          <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-accent)] flex items-center gap-1">
            <Sparkles className="h-3 w-3" aria-hidden />
            AI Recommendations
          </p>
          <p className="arc-body mt-3 text-sm">
            Open AI Tutor for your next move.
          </p>
        </Link>

        <div className="arc-dashboard-card">
          <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-accent)] flex items-center gap-1">
            <Brain className="h-3 w-3" aria-hidden />
            Weak Concepts
          </p>
          <p className="arc-body mt-3 text-sm">
            {weaknesses.length > 0
              ? weaknesses.slice(0, 3).join(" · ")
              : "None flagged yet — keep studying."}
          </p>
        </div>

        <Link href="/notes" className="arc-dashboard-card block">
          <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-accent)]">
            Recent Notes
          </p>
          <p className="arc-body mt-3 text-sm">
            Linked knowledge workspace →
          </p>
        </Link>
      </div>
    </>
  );
}
