"use client";

import { memo } from "react";
import Link from "next/link";

import type { Course } from "@/types/course";
import type { TeachingPayload } from "@/lib/ai/teaching-format";

type Props = {
  course?: Course;
  teaching?: TeachingPayload | null;
};

function InstructorPlanInner({ course, teaching }: Props) {
  const steps = teaching?.lessonSteps ?? [];
  const timeline = teaching?.studyTimeline ?? [];

  return (
    <div className="arc-instructor-panel-section">
      {teaching?.learningObjectives && teaching.learningObjectives.length > 0 && (
        <div className="mb-5">
          <p className="arc-instructor-panel-section__label">Objectives</p>
          <ul className="arc-instructor-list">
            {teaching.learningObjectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {timeline.length > 0 && (
        <div className="mb-5">
          <p className="arc-instructor-panel-section__label">Study timeline</p>
          <ul className="arc-instructor-timeline">
            {timeline.map((t, i) => (
              <li key={i}>
                <span className="arc-instructor-timeline__when">{t.when}</span>
                <span>{t.task}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {steps.length > 0 && (
        <div className="mb-5">
          <p className="arc-instructor-panel-section__label">Live lesson plan</p>
          <ol className="arc-instructor-list">
            {steps.map((s, i) => (
              <li key={i}>
                <strong>{s.title}</strong>
                <p className="mt-1 text-xs text-[var(--arc-muted)]">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {course ? (
        <div>
          <p className="arc-instructor-panel-section__label">Course map</p>
          {course.phases.map((phase) => (
            <div key={phase.id} className="mt-3">
              <p className="text-sm font-medium">{phase.title}</p>
              {phase.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="arc-instructor-module-row mt-2"
                >
                  <div className="arc-instructor-module-row__bar">
                    <div
                      className="arc-instructor-module-row__fill"
                      style={{ width: `${mod.masteryPercent}%` }}
                    />
                  </div>
                  <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
                    {mod.title} · {mod.masteryPercent}% · {mod.lessons.length}{" "}
                    lessons
                    {mod.checkpointLabel ? ` · ${mod.checkpointLabel}` : ""}
                  </p>
                </div>
              ))}
            </div>
          ))}
          <Link
            href={`/courses/${course.treeId}`}
            className="arc-btn arc-btn-ghost mt-4 inline-block text-xs"
          >
            Open full course →
          </Link>
        </div>
      ) : (
        <p className="arc-instructor-hint">
          Create a goal to unlock a structured Boot.dev-style course map with
          modules, checkpoints, and projects.
        </p>
      )}

      {teaching?.nextStep && (
        <div className="mt-5 rounded-xl border border-[var(--arc-accent)]/25 bg-[var(--arc-accent)]/5 p-3">
          <p className="arc-mono text-[10px] uppercase text-[var(--arc-accent)]">
            Next 20 minutes
          </p>
          <p className="mt-1 text-sm">{teaching.nextStep}</p>
        </div>
      )}
    </div>
  );
}

export const InstructorPlan = memo(InstructorPlanInner);
