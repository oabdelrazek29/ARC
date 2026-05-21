"use client";

import { memo, useEffect, useMemo } from "react";

import { InstructorMasterPanel } from "@/components/instructor/InstructorMasterPanel";
import { skillTreeToCourse } from "@/lib/course/tree-to-course";
import { useArcStore } from "@/store/arc-store";
import { useInstructorStore } from "@/store/instructor-store";
import { usePlatformStore } from "@/store/platform-store";
import type { Course } from "@/types/course";

function PlatformInstructorInner() {
  const context = usePlatformStore((s) => s.context);
  const events = usePlatformStore((s) => s.events);
  const trees = useArcStore((s) => s.trees);
  const goals = useArcStore((s) => s.goals);
  const progress = useArcStore((s) => s.progress);
  const setSession = useInstructorStore((s) => s.setSession);

  const course: Course | undefined = useMemo(() => {
    const treeId = context.courseId ?? goals.find((g) => g.treeId)?.treeId;
    if (!treeId || !trees[treeId]) return undefined;
    return skillTreeToCourse(trees[treeId], progress.totalXp);
  }, [context.courseId, goals, trees, progress.totalXp]);

  const latestEvent = events[0];

  useEffect(() => {
    setSession({
      topic: latestEvent?.concept,
      courseId: course?.id,
      graphId: context.graphId,
    });
  }, [latestEvent?.concept, course?.id, context.graphId, setSession]);

  const instructorContext = useMemo(
    () => ({
      goal: goals[0]?.title ?? course?.title,
      topic: latestEvent?.concept ?? course?.title,
      graphId: context.graphId,
      nodeTitle: context.lessonId
        ? course?.phases
            .flatMap((p) => p.modules)
            .flatMap((m) => m.lessons)
            .find((l) => l.id === context.lessonId)?.title
        : undefined,
    }),
    [goals, course, latestEvent, context]
  );

  return (
    <InstructorMasterPanel course={course} context={instructorContext} />
  );
}

export const PlatformInstructor = memo(PlatformInstructorInner);
