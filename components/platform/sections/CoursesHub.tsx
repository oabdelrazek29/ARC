"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { getCourseProgress } from "@/lib/lms/course-progress";
import { skillTreeToCourse } from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";

type Filter = "all" | "in-progress" | "complete" | "draft";

export function CoursesHub() {
  const goals = useArcStore((s) => s.goals);
  const trees = useArcStore((s) => s.trees);
  const progress = useArcStore((s) => s.progress);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const items = useMemo(() => {
    return goals.map((g) => {
      const tree = g.treeId ? trees[g.treeId] : null;
      const course = tree ? skillTreeToCourse(tree, progress.totalXp) : null;
      const stats = course ? getCourseProgress(course) : null;
      return { goal: g, course, stats };
    });
  }, [goals, trees, progress.totalXp]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(({ goal, course, stats }) => {
      if (q && !goal.title.toLowerCase().includes(q)) return false;
      if (!course) return filter === "all" || filter === "draft";
      const pct = stats?.percent ?? 0;
      if (filter === "in-progress") return pct > 0 && pct < 100;
      if (filter === "complete") return pct === 100;
      if (filter === "draft") return false;
      return true;
    });
  }, [items, query, filter]);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Courses"
        title="Browse your courses"
        lead="NextLMS-style chapters, progress tracking, and search — powered by ARC Instructor and your skill trees."
      />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses…"
          className="arc-advisor-input max-w-md flex-1"
        />
        <div className="flex flex-wrap gap-2">
          {(["all", "in-progress", "complete", "draft"] as Filter[]).map(
            (f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={
                  filter === f
                    ? "arc-workspace-layout__mode-btn arc-workspace-layout__mode-btn--active"
                    : "arc-workspace-layout__mode-btn"
                }
              >
                {f.replace("-", " ")}
              </button>
            )
          )}
        </div>
        <ArcButton href="/learn/create">Create course</ArcButton>
      </div>

      <div className="arc-course-hub-grid mt-6">
        {filtered.length === 0 ? (
          <div className="arc-card col-span-full p-8 text-center text-sm text-[var(--arc-muted)]">
            {goals.length === 0
              ? "No courses yet."
              : "No courses match your search."}{" "}
            <ArcButton href="/learn/create" className="mt-4">
              Create your first course
            </ArcButton>
          </div>
        ) : (
          filtered.map(({ goal, course, stats }) => (
            <Link
              key={goal.id}
              href={goal.treeId ? `/courses/${goal.treeId}` : "/learn/create"}
              className="arc-course-hub-card arc-card block p-5 transition-colors hover:border-[var(--arc-hover-border)]"
            >
              <p className="arc-heading text-lg">{goal.title}</p>
              {course && stats ? (
                <>
                  <div className="arc-progress mt-4">
                    <div
                      className="arc-progress-fill"
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>
                  <p className="arc-mono mt-2 text-[10px] text-[var(--arc-muted)]">
                    {stats.percent}% · {stats.completedChapters}/
                    {stats.totalChapters} chapters · {stats.completedLessons}/
                    {stats.totalLessons} lessons
                  </p>
                </>
              ) : (
                <p className="mt-2 text-xs text-[var(--arc-accent)]">
                  Finish setup →
                </p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
