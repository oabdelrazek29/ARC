"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { CourseWorkspace } from "@/components/course/CourseWorkspace";
import { useArcStore } from "@/store/arc-store";
import { skillTreeToCourse } from "@/lib/course/tree-to-course";

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const tree = useArcStore((s) => s.trees[courseId]);
  const goalTitle = useArcStore((s) =>
    tree ? s.goals.find((g) => g.id === tree.goalId)?.title : undefined
  );
  const progress = useArcStore((s) => s.progress);
  const course = tree ? skillTreeToCourse(tree, progress.totalXp) : null;

  if (!tree) {
    return (
      <div className="py-20 text-center">
        <p className="arc-body text-sm">Course not found.</p>
        <Link href="/courses/create" className="arc-mono mt-4 inline-block text-[var(--arc-accent)]">
          Create a learning path →
        </Link>
      </div>
    );
  }

  const moduleCount = course?.phases.flatMap((p) => p.modules).length ?? 0;
  const lessonCount =
    course?.phases.flatMap((p) => p.modules).flatMap((m) => m.lessons).length ?? 0;

  return (
    <>
      <header className="mb-8 rounded-xl border border-[var(--arc-border)] bg-[var(--arc-surface)] p-6 md:p-8">
        <p className="arc-mono text-[10px] text-[var(--arc-tertiary)]">Structured course</p>
        <h1 className="arc-section-title mt-2 text-3xl md:text-4xl">{tree.title}</h1>
        <p className="arc-mono mt-3 text-[11px] text-[var(--arc-muted)]">
          ARC Instructor · {moduleCount} modules · {lessonCount} lessons ·{" "}
          {course?.masteryPercent ?? 0}% mastery
        </p>
      </header>
      <CourseWorkspace tree={tree} goalTitle={goalTitle} />
    </>
  );
}
