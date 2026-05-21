"use client";

import { memo } from "react";

import { StudyFlashcards } from "@/components/ai/StudyFlashcards";
import type { TeachingPayload } from "@/lib/ai/teaching-format";

type Props = {
  teaching?: TeachingPayload | null;
};

function InstructorPracticeInner({ teaching }: Props) {
  const flashcards = teaching?.flashcards ?? [];
  const quizzes = teaching?.quizQuestions ?? [];

  if (!flashcards.length && !quizzes.length) {
    return (
      <div className="arc-instructor-panel-section">
        <p className="arc-instructor-hint">
          Ask for a lesson in the <strong>Teach</strong> tab — flashcards, quizzes,
          and drills appear here automatically.
        </p>
        <p className="arc-instructor-hint mt-4">
          Try: &quot;Quiz me on thermodynamics&quot; or &quot;Flashcards for Spanish
          subjunctive&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="arc-instructor-panel-section space-y-6">
      {flashcards.length > 0 && (
        <div>
          <p className="arc-instructor-panel-section__label">Recall training</p>
          <StudyFlashcards cards={flashcards} />
        </div>
      )}
      {quizzes.length > 0 && (
        <div>
          <p className="arc-instructor-panel-section__label">Practice quiz</p>
          <ul className="arc-instructor-quiz-list">
            {quizzes.map((q, i) => (
              <li key={i} className="arc-instructor-quiz-item">
                <p className="font-medium text-sm">{q.question}</p>
                <ol className="mt-2 space-y-1 text-sm text-[var(--arc-muted)]">
                  {q.options.map((opt, j) => (
                    <li
                      key={j}
                      className={
                        j === q.correctIndex
                          ? "text-[var(--arc-accent)]"
                          : undefined
                      }
                    >
                      {String.fromCharCode(65 + j)}. {opt}
                      {j === q.correctIndex ? " ✓" : ""}
                    </li>
                  ))}
                </ol>
                {q.explanation && (
                  <p className="mt-2 text-xs text-[var(--arc-tertiary)]">
                    {q.explanation}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const InstructorPractice = memo(InstructorPracticeInner);
