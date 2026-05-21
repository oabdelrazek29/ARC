"use client";

import { memo } from "react";
import { CheckCircle2 } from "lucide-react";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { CourseVideoPlayer } from "@/components/lms/CourseVideoPlayer";
import { NODE_TYPE_LABELS } from "@/constants/arc";
import type { CourseLesson } from "@/types/course";

type Props = {
  lesson: CourseLesson | null;
  onComplete?: () => void;
  onStruggle?: () => void;
  chapterIndex?: number;
  chapterCount?: number;
};

function CourseLessonViewInner({
  lesson,
  onComplete,
  onStruggle,
  chapterIndex,
  chapterCount,
}: Props) {
  if (!lesson) {
    return (
      <div className="arc-course-main arc-card flex min-h-[360px] items-center justify-center p-8 text-sm text-[var(--arc-muted)]">
        Select a chapter lesson from the sidebar to begin.
      </div>
    );
  }

  const typeLabel =
    lesson.nodeType != null
      ? NODE_TYPE_LABELS[lesson.nodeType]
      : lesson.contentType;

  return (
    <article className="arc-course-main arc-card overflow-hidden">
      <CourseVideoPlayer lesson={lesson} />
      <div className="p-6 md:p-8">
        {chapterIndex != null && chapterCount != null && (
          <p className="arc-mono text-[10px] text-[var(--arc-tertiary)]">
            Chapter {chapterIndex + 1} of {chapterCount}
          </p>
        )}
        <p className="arc-mono text-[10px] uppercase tracking-wider text-[var(--arc-accent)]">
          {typeLabel} · ~{lesson.estimatedMinutes} min · +{lesson.xpReward} XP
        </p>
        <h1 className="arc-heading mt-3 text-2xl">{lesson.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--arc-muted)] whitespace-pre-wrap">
          {lesson.description}
        </p>

        {lesson.resources.length > 0 && (
          <div className="mt-6">
            <p className="arc-mono text-[10px] text-[var(--arc-tertiary)]">
              Resources & attachments
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {lesson.resources.map((r, i) => (
                <li key={i}>
                  {/^https?:\/\//i.test(r) ? (
                    <a
                      href={r}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--arc-accent)] hover:underline"
                    >
                      {r}
                    </a>
                  ) : (
                    r
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {lesson.quiz && lesson.quiz.length > 0 && (
          <div className="mt-8">
            <p className="arc-heading text-base">Chapter quiz</p>
            <ul className="mt-3 space-y-4">
              {lesson.quiz.map((q) => (
                <li key={q.id} className="text-sm">
                  <p className="font-medium">{q.question}</p>
                  <ol className="mt-2 space-y-1 text-[var(--arc-muted)]">
                    {q.options.map((opt, j) => (
                      <li key={j}>
                        {String.fromCharCode(65 + j)}. {opt}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        )}

        {lesson.unlocked && !lesson.completed && (
          <div className="mt-8 flex flex-wrap gap-2">
            {onComplete && (
              <ArcButton className="gap-2" onClick={onComplete}>
                <CheckCircle2 className="h-4 w-4" />
                Mark complete (+{lesson.xpReward} XP)
              </ArcButton>
            )}
            {onStruggle && (
              <ArcButton variant="ghost" onClick={onStruggle}>
                I&apos;m struggling — adapt teaching
              </ArcButton>
            )}
          </div>
        )}

        {lesson.completed && (
          <p className="arc-mono mt-8 text-[10px] text-[var(--arc-accent)]">
            Chapter section completed
          </p>
        )}
      </div>
    </article>
  );
}

export const CourseLessonView = memo(CourseLessonViewInner);
