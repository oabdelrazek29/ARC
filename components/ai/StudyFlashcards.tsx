"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { memo, useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import type { TeachingPayload } from "@/lib/ai/teaching-format";

type Props = {
  cards: NonNullable<TeachingPayload["flashcards"]>;
  className?: string;
};

function StudyFlashcardsInner({ cards, className }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[index];
  const total = cards.length;

  const next = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  if (!card) return null;

  return (
    <div className={cn("arc-flashcards", className)}>
      <p className="arc-flashcards__label font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-wider text-[var(--arc-muted)]">
        Study deck · {index + 1} / {total}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="arc-flashcards__card"
        aria-label={flipped ? "Show question" : "Show answer"}
      >
        <span className="arc-flashcards__side">
          {flipped ? card.back : card.front}
        </span>
        <span className="arc-flashcards__hint text-xs text-[var(--arc-muted)]">
          Tap to {flipped ? "see question" : "reveal answer"}
        </span>
      </button>
      <div className="arc-flashcards__nav">
        <button type="button" onClick={prev} className="arc-flashcards__btn" aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            setFlipped(false);
            setIndex(0);
          }}
          className="arc-flashcards__btn"
          aria-label="Restart deck"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button type="button" onClick={next} className="arc-flashcards__btn" aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export const StudyFlashcards = memo(StudyFlashcardsInner);
