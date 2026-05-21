import type { Course, CourseLesson, CourseModule } from "@/types/course";

/** NextLMS-style chapter progress from lesson completion */
export function getChapterProgress(chapter: CourseModule): number {
  if (chapter.lessons.length === 0) return 0;
  const done = chapter.lessons.filter((l) => l.completed).length;
  return Math.round((done / chapter.lessons.length) * 100);
}

export function getCourseProgress(course: Course) {
  const chapters = course.phases.flatMap((p) => p.modules);
  const lessons = chapters.flatMap((c) => c.lessons);
  const completedChapters = chapters.filter((c) => getChapterProgress(c) === 100)
    .length;

  return {
    chapters,
    totalLessons: lessons.length,
    completedLessons: lessons.filter((l) => l.completed).length,
    totalChapters: chapters.length,
    completedChapters,
    percent: course.masteryPercent,
  };
}

export function extractYoutubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
  );
  return m?.[1] ?? null;
}

export function lessonVideoId(lesson: CourseLesson): string | null {
  if (lesson.videoUrl) return extractYoutubeId(lesson.videoUrl);
  for (const r of lesson.resources) {
    const id = extractYoutubeId(r);
    if (id) return id;
  }
  return null;
}
