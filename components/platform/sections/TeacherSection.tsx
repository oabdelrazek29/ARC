"use client";

import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { skillTreeToCourse } from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";

/** NextLMS teacher mode — create & manage courses (ARC uses AI generation) */
export function TeacherSection() {
  const goals = useArcStore((s) => s.goals);
  const trees = useArcStore((s) => s.trees);
  const progress = useArcStore((s) => s.progress);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Teacher"
        title="Create & manage courses"
        lead="Like NextLMS teacher mode — generate structured courses with AI, then edit chapters in the course player."
      />

      <ArcButton href="/learn/create" className="mt-6">
        + Create new course (AI)
      </ArcButton>

      <ul className="mt-8 space-y-3">
        {goals.length === 0 ? (
          <li className="arc-card p-6 text-sm text-[var(--arc-muted)]">
            No courses published yet. Your generated paths appear here and in
            Browse courses.
          </li>
        ) : (
          goals.map((g) => {
            const tree = g.treeId ? trees[g.treeId] : null;
            const course = tree
              ? skillTreeToCourse(tree, progress.totalXp)
              : null;
            return (
              <li key={g.id} className="arc-card flex flex-wrap items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium">{g.title}</p>
                  <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
                    {g.contextComplete ? "Published" : "Draft"} ·{" "}
                    {course
                      ? `${course.phases[0]?.modules.length ?? 0} chapters`
                      : "Needs generation"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={g.treeId ? `/courses/${g.treeId}` : "/learn/create"}
                    className="arc-btn arc-btn-ghost text-xs"
                  >
                    Edit course
                  </Link>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
