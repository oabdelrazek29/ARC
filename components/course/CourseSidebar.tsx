"use client";

import { memo } from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";

import { getChapterProgress } from "@/lib/lms/course-progress";
import { cn } from "@/lib/utils";
import type { Course, CourseLesson } from "@/types/course";

type Props = {
  course: Course;
  activeLessonId?: string;
  onSelectLesson: (lesson: CourseLesson) => void;
};

function CourseSidebarInner({ course, activeLessonId, onSelectLesson }: Props) {
  const chapters = course.phases.flatMap((p) => p.modules);

  return (
    <nav className="arc-course-sidebar" aria-label="Course chapters">
      <p className="arc-mono text-[10px] uppercase tracking-wider text-[var(--arc-muted)]">
        Chapters
      </p>
      <p className="arc-heading mt-2 text-lg">{course.title}</p>
      <div className="arc-course-mastery mt-3">
        <div className="arc-progress">
          <div
            className="arc-progress-fill"
            style={{ width: `${course.masteryPercent}%` }}
          />
        </div>
        <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
          {course.masteryPercent}% complete · {chapters.length} chapters
        </p>
      </div>

      {chapters.map((chapter, ci) => {
        const chProgress = getChapterProgress(chapter);
        return (
          <div key={chapter.id} className="mt-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium">
                Ch. {ci + 1}: {chapter.title}
              </p>
              <span className="arc-mono text-[10px] text-[var(--arc-accent)]">
                {chProgress}%
              </span>
            </div>
            <div className="arc-progress mt-1">
              <div
                className="arc-progress-fill"
                style={{ width: `${chProgress}%` }}
              />
            </div>
            <ul className="mt-2 space-y-0.5">
              {chapter.lessons.map((lesson) => {
                const Icon = lesson.completed
                  ? CheckCircle2
                  : lesson.unlocked
                    ? Circle
                    : Lock;
                return (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      disabled={!lesson.unlocked}
                      onClick={() => onSelectLesson(lesson)}
                      className={cn(
                        "arc-course-lesson-btn w-full",
                        activeLessonId === lesson.id &&
                          "arc-course-lesson-btn--active",
                        !lesson.unlocked && "opacity-50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0",
                          lesson.completed && "text-[var(--arc-accent)]"
                        )}
                        aria-hidden
                      />
                      <span className="truncate text-left text-xs">
                        {lesson.title}
                        {lesson.isFree ? " · Free" : ""}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

export const CourseSidebar = memo(CourseSidebarInner);
