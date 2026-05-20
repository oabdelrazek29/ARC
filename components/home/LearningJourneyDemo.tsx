"use client";

import { memo } from "react";

const JOURNEYS = [
  {
    title: "Machine learning",
    stages: [
      { label: "Starting", text: "Too many terms at once. No clear order." },
      { label: "Structured", text: "Data, models, and judgment — one layer at a time." },
      { label: "Clear", text: "You can explain tradeoffs without memorizing buzzwords." },
    ],
  },
  {
    title: "Physics fundamentals",
    stages: [
      { label: "Starting", text: "Formulas without intuition." },
      { label: "Structured", text: "Forces and energy linked to everyday cases." },
      { label: "Clear", text: "Problems feel like reasoning, not pattern matching." },
    ],
  },
  {
    title: "Programming concepts",
    stages: [
      { label: "Starting", text: "Syntax before mental model." },
      { label: "Structured", text: "Small programs that teach one idea each." },
      { label: "Clear", text: "You can read code and predict what it does." },
    ],
  },
] as const;

function LearningJourneyDemoInner() {
  return (
    <div className="space-y-8">
      {JOURNEYS.map((j) => (
        <article key={j.title} className="arc-journey-card">
          <h3 className="arc-heading text-lg">{j.title}</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {j.stages.map((stage) => (
              <div key={stage.label} className="arc-journey-stage">
                <p className="arc-mono text-[10px] text-[var(--arc-accent)]">
                  {stage.label}
                </p>
                <p className="arc-lead mt-2 text-sm">{stage.text}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export const LearningJourneyDemo = memo(LearningJourneyDemoInner);
