"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { CourseLessonView } from "@/components/course/CourseLessonView";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  flattenCourseLessons,
  skillTreeToCourse,
} from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();
  const tree = useArcStore((s) => s.trees[courseId]);
  const progress = useArcStore((s) => s.progress);
  const goalTitle = useArcStore((s) =>
    tree ? s.goals.find((g) => g.id === tree.goalId)?.title : undefined
  );

  const course = useMemo(
    () => (tree ? skillTreeToCourse(tree, progress.totalXp) : null),
    [tree, progress.totalXp]
  );

  const lessons = useMemo(
    () => (course ? flattenCourseLessons(course) : []),
    [course]
  );

  const lesson = lessons.find((l) => l.id === lessonId) ?? null;
  const chapters = course?.phases.flatMap((p) => p.modules) ?? [];

  if (!tree || !course) {
    return (
      <div className="arc-lesson-reader py-20 text-center">
        <p className="arc-body">Course not found.</p>
        <Link href="/courses" className="arc-mono mt-4 text-[var(--arc-accent)]">
          ← Courses
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="arc-lesson-topbar">
        <Link href={`/courses/${courseId}`} className="text-[var(--arc-muted)] hover:text-[var(--arc-fg)]">
          ← Back
        </Link>
        <span className="truncate text-[var(--arc-muted)]">{tree.title}</span>
        <ThemeToggle />
      </div>

      <div className="arc-lesson-reader">
        {lesson ? (
          <CourseLessonView
            lesson={lesson}
            onComplete={() => {}}
            onStruggle={() => {}}
            chapterIndex={
              lesson
                ? chapters.findIndex((c) => c.id === lesson.chapterId)
                : undefined
            }
            chapterCount={chapters.length}
          />
        ) : (
          <p className="arc-body">Lesson not found.</p>
        )}
        <p className="arc-mono mt-12 text-center text-[10px]">
          <Link href="/tutor" className="text-[var(--arc-accent)]">
            Ask Instructor about this lesson →
          </Link>
        </p>
      </div>
    </>
  );
}
