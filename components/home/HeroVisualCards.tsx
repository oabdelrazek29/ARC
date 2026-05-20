"use client";

import { memo } from "react";

const ITEMS = [
  { label: "Lesson plan", detail: "Structured steps for your goal" },
  { label: "Video path", detail: "Watch when the concept needs it" },
  { label: "Practice", detail: "Short checks, not endless drills" },
] as const;

function HeroVisualCardsInner() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {ITEMS.map((item, i) => (
        <div
          key={item.label}
          className="arc-hero-visual-card"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          <p className="arc-mono text-[10px] text-[var(--arc-muted)]">
            {item.label}
          </p>
          <p className="arc-heading mt-1 text-sm">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

export const HeroVisualCards = memo(HeroVisualCardsInner);
