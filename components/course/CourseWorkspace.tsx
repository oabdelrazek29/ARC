"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CourseLessonView } from "@/components/course/CourseLessonView";
import { CourseSidebar } from "@/components/course/CourseSidebar";
import {
  flattenCourseLessons,
  skillTreeToCourse,
} from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";
import { usePlatformStore } from "@/store/platform-store";
import type { CourseLesson } from "@/types/course";
import type { SkillTree } from "@/types/arc";

type Props = {
  tree: SkillTree;
  goalTitle?: string;
};

export function CourseWorkspace({ tree, goalTitle }: Props) {
  const progress = useArcStore((s) => s.progress);
  const completeNode = useArcStore((s) => s.completeNode);
  const unlockDependentNodes = useArcStore((s) => s.unlockDependentNodes);
  const setContext = usePlatformStore((s) => s.setContext);

  const course = useMemo(
    () => skillTreeToCourse(tree, progress.totalXp),
    [tree, progress.totalXp]
  );

  const chapters = useMemo(
    () => course.phases.flatMap((p) => p.modules),
    [course]
  );
  const lessons = useMemo(() => flattenCourseLessons(course), [course]);
  const defaultLesson =
    lessons.find((l) => l.id === course.currentLessonId) ??
    lessons.find((l) => l.unlocked && !l.completed) ??
    lessons[0] ??
    null;

  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(
    defaultLesson
  );

  useEffect(() => {
    setContext({
      section: "courses",
      courseId: tree.id,
      lessonId: activeLesson?.id,
    });
  }, [tree.id, activeLesson?.id, setContext]);

  const onComplete = useCallback(() => {
    if (!activeLesson?.skillNodeId || activeLesson.completed) return;
    completeNode(
      activeLesson.skillNodeId,
      activeLesson.xpReward,
      activeLesson.title,
      tree.id,
      goalTitle ?? tree.title
    );
    unlockDependentNodes(tree.id, activeLesson.skillNodeId);
    setActiveLesson((prev) =>
      prev ? { ...prev, completed: true } : prev
    );
  }, [
    activeLesson,
    completeNode,
    unlockDependentNodes,
    tree.id,
    tree.title,
    goalTitle,
  ]);

  const onStruggle = useCallback(() => {
    if (!activeLesson) return;
    usePlatformStore.getState().recordEvent(
      "concept_struggle",
      activeLesson.title,
      "Flagged for concept recovery — instructor will adapt",
      "courses",
      { goal: goalTitle ?? tree.title }
    );
  }, [activeLesson, goalTitle, tree.title]);

  return (
    <div className="arc-course-workspace">
      <aside className="arc-course-workspace__sidebar">
        <CourseSidebar
          course={course}
          activeLessonId={activeLesson?.id}
          onSelectLesson={setActiveLesson}
        />
      </aside>
      <div className="arc-course-workspace__main">
        <CourseLessonView
          lesson={activeLesson}
          onComplete={onComplete}
          onStruggle={onStruggle}
          chapterIndex={
            activeLesson
              ? chapters.findIndex((c) => c.id === activeLesson.chapterId)
              : undefined
          }
          chapterCount={chapters.length}
        />
      </div>
    </div>
  );
}
