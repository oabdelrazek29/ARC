"use client";

import { memo } from "react";
import { AlertTriangle, Sparkles, Target } from "lucide-react";

import { useInstructorStore } from "@/store/instructor-store";
import { usePlatformStore } from "@/store/platform-store";
import type { Course } from "@/types/course";

type Props = {
  course?: Course;
};

function InstructorOverviewInner({ course }: Props) {
  const memory = useInstructorStore((s) => s.memory);
  const session = useInstructorStore((s) => s.session);
  const events = usePlatformStore((s) => s.events);

  const topic =
    session.topic ?? session.goal ?? memory.lastTopics[0] ?? "your learning path";

  return (
    <div className="arc-instructor-panel-section">
      <p className="arc-instructor-panel-section__label">Active mission</p>
      <p className="arc-instructor-panel-section__title">{topic}</p>
      {course && (
        <div className="arc-instructor-stats mt-4">
          <div className="arc-instructor-stat">
            <span className="arc-instructor-stat__value">{course.masteryPercent}%</span>
            <span className="arc-instructor-stat__label">Mastery</span>
          </div>
          <div className="arc-instructor-stat">
            <span className="arc-instructor-stat__value">{course.earnedXp}</span>
            <span className="arc-instructor-stat__label">XP earned</span>
          </div>
          <div className="arc-instructor-stat">
            <span className="arc-instructor-stat__value">~{course.estimatedHours}h</span>
            <span className="arc-instructor-stat__label">Est. path</span>
          </div>
        </div>
      )}

      <div className="arc-instructor-objectives mt-5">
        <p className="arc-instructor-panel-section__label flex items-center gap-1.5">
          <Target className="h-3 w-3" aria-hidden />
          Learning objectives
        </p>
        <ul className="arc-instructor-list">
          <li>Build durable understanding, not passive notes</li>
          <li>Practice recall before moving to the next module</li>
          <li>Connect new concepts to what you already know</li>
        </ul>
      </div>

      {memory.weaknesses.length > 0 && (
        <div className="arc-instructor-weaknesses mt-5">
          <p className="arc-instructor-panel-section__label flex items-center gap-1.5 text-[var(--arc-accent)]">
            <AlertTriangle className="h-3 w-3" aria-hidden />
            Struggling here
          </p>
          <ul className="arc-instructor-list">
            {memory.weaknesses.slice(0, 4).map((w) => (
              <li key={w.id}>
                <strong>{w.concept}</strong>
                {w.note ? ` — ${w.note}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {memory.strengths.length > 0 && (
        <div className="mt-5">
          <p className="arc-instructor-panel-section__label flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" aria-hidden />
            Strengths detected
          </p>
          <div className="arc-instructor-tags mt-2">
            {memory.strengths.slice(0, 6).map((s) => (
              <span key={s} className="arc-instructor-tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div className="mt-5">
          <p className="arc-instructor-panel-section__label">Live platform sync</p>
          <ul className="arc-instructor-list">
            {events.slice(0, 4).map((e) => (
              <li key={e.id}>
                <span className="text-[var(--arc-tertiary)]">{e.section}:</span>{" "}
                {e.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="arc-instructor-hint mt-6">
        Switch to <strong>Teach</strong> for live lessons, or <strong>Practice</strong> for
        quizzes and flashcards generated from your session.
      </p>
    </div>
  );
}

export const InstructorOverview = memo(InstructorOverviewInner);
