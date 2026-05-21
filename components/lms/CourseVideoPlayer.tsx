"use client";

import { lessonVideoId } from "@/lib/lms/course-progress";
import type { CourseLesson } from "@/types/course";

type Props = {
  lesson: CourseLesson;
};

/** NextLMS-style video area — YouTube now; Mux when MUX_* keys are set */
export function CourseVideoPlayer({ lesson }: Props) {
  const yt = lessonVideoId(lesson);

  if (!yt) {
    return (
      <div className="arc-course-video arc-course-video--empty flex aspect-video items-center justify-center border border-[var(--arc-border)] bg-[var(--arc-surface)] text-sm text-[var(--arc-muted)]">
        No video for this chapter — read the lesson and use Instructor Master →
      </div>
    );
  }

  return (
    <div className="arc-course-video aspect-video w-full border border-[var(--arc-border)]">
      <iframe
        title={lesson.title}
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${yt}`}
        allowFullScreen
      />
    </div>
  );
}
