"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { TypewriterLabel } from "@/components/TypewriterLabel";
import { ArcButton } from "@/components/arc-ui/ArcButton";
import { getCourseProgress } from "@/lib/lms/course-progress";
import { skillTreeToCourse } from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";

type Filter = "all" | "in-progress" | "complete";

export default function CoursesPage() {
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
      return { goal: g, course, stats, treeId: g.treeId };
    });
  }, [goals, trees, progress.totalXp]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(({ goal, stats }) => {
      if (q && !goal.title.toLowerCase().includes(q)) return false;
      const pct = stats?.percent ?? 0;
      if (filter === "in-progress") return pct > 0 && pct < 100;
      if (filter === "complete") return pct === 100;
      return true;
    });
  }, [items, query, filter]);

  return (
    <>
      <TypewriterLabel
        text="§ The curriculum · Your courses · Edition MMXXVI"
        className="arc-section-marker block"
      />
      <h1 className="arc-section-title mt-4 text-3xl">
        Learn Through Structured Progression
      </h1>
      <p className="arc-body mt-3 max-w-lg text-sm">
        ARC courses are designed to feel immersive, practical, and clear. Every
        course includes guided lessons, projects, quizzes, and progress tracking.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses…"
          className="arc-advisor-input max-w-md flex-1"
        />
        <div className="flex flex-wrap gap-2">
          {(["all", "in-progress", "complete"] as Filter[]).map((f) => (
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
          ))}
        </div>
        <ArcButton href="/courses/create">Create course</ArcButton>
      </div>

      <div className="arc-course-grid mt-8">
        {filtered.length === 0 ? (
          <p className="arc-body text-sm col-span-full">
            No courses yet.{" "}
            <Link href="/courses/create" className="text-[var(--arc-accent)]">
              Create one →
            </Link>
          </p>
        ) : (
          filtered.map(({ goal, course, stats, treeId }) => (
            <Link
              key={goal.id}
              href={treeId ? `/courses/${treeId}` : "/courses/create"}
              className="arc-course-card"
            >
              <p className="arc-course-card__title">{goal.title}</p>
              <p className="arc-mono mt-2 text-[10px] text-[var(--arc-muted)]">
                {course
                  ? `${course.phases.length} phases · ${stats?.percent ?? 0}% complete`
                  : "Draft — finish setup"}
              </p>
              {stats && stats.percent > 0 && (
                <div className="arc-progress mt-4">
                  <div
                    className="arc-progress-fill"
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </>
  );
}
