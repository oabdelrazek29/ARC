"use client";

import { memo } from "react";

const MOCKS = [
  {
    label: "Fig. I  AI adviser split view",
    title: "Advisor beside your work",
    content: (
      <div className="arc-mock arc-mock--split">
        <div className="arc-mock__pane arc-mock__pane--main">
          <p className="arc-mock__label">Learning space</p>
          <div className="arc-mock__line w-3/4" />
          <div className="arc-mock__line w-1/2" />
          <div className="arc-mock__block h-16" />
        </div>
        <div className="arc-mock__pane arc-mock__pane--advisor">
          <p className="arc-mock__label">ARC Adviser</p>
          <div className="arc-mock__bubble" />
          <div className="arc-mock__bubble arc-mock__bubble--short" />
        </div>
      </div>
    ),
  },
  {
    label: "Fig. II  Learning path breakdown",
    title: "Path in clear steps",
    content: (
      <div className="arc-mock">
        <p className="arc-mock__label">Your path</p>
        {["Foundations", "Core ideas", "Practice", "Review"].map((step, i) => (
          <div key={step} className="arc-mock__step">
            <span className="arc-mock__step-num">{i + 1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Fig. III  Concept explanation",
    title: "Explanations in context",
    content: (
      <div className="arc-mock">
        <p className="arc-mock__label">Concept</p>
        <p className="arc-mock__title">Gradient descent</p>
        <div className="arc-mock__line w-full" />
        <div className="arc-mock__line w-5/6" />
        <div className="arc-mock__line w-4/6" />
        <p className="arc-mock__hint">Plain language, tied to what you already know</p>
      </div>
    ),
  },
  {
    label: "Fig. IV  Progress tracking",
    title: "Progress you can read",
    content: (
      <div className="arc-mock">
        <p className="arc-mock__label">This week</p>
        <div className="arc-mock__progress-row">
          <span>Integration</span>
          <span className="arc-mock__pct">62%</span>
        </div>
        <div className="arc-mock__bar">
          <div className="arc-mock__bar-fill" style={{ width: "62%" }} />
        </div>
        <div className="arc-mock__progress-row mt-4">
          <span>Neural networks</span>
          <span className="arc-mock__pct">34%</span>
        </div>
        <div className="arc-mock__bar">
          <div className="arc-mock__bar-fill" style={{ width: "34%" }} />
        </div>
      </div>
    ),
  },
  {
    label: "Fig. V  Graph understanding",
    title: "How ideas connect",
    content: (
      <div className="arc-mock arc-mock--graph">
        <svg viewBox="0 0 200 120" className="h-28 w-full" aria-hidden>
          <circle cx="40" cy="60" r="8" fill="none" stroke="var(--arc-accent)" strokeWidth="1" />
          <circle cx="100" cy="30" r="10" fill="none" stroke="var(--arc-accent)" strokeWidth="1.2" />
          <circle cx="160" cy="70" r="8" fill="none" stroke="var(--arc-muted)" strokeWidth="1" />
          <circle cx="100" cy="90" r="6" fill="var(--arc-accent)" opacity="0.5" />
          <line x1="48" y1="56" x2="92" y2="36" stroke="var(--arc-border)" strokeWidth="1" />
          <line x1="108" y1="36" x2="152" y2="64" stroke="var(--arc-border)" strokeWidth="1" />
          <line x1="100" y1="40" x2="100" y2="84" stroke="var(--arc-border)" strokeWidth="1" />
        </svg>
        <p className="arc-mock__hint">Concepts linked across your full path</p>
      </div>
    ),
  },
] as const;

function SystemVisualPreviewInner() {
  return (
    <div className="arc-mock-grid">
      {MOCKS.map((mock) => (
        <figure key={mock.label} className="arc-mock-card">
          <figcaption className="arc-mono mb-3 text-[10px] text-[var(--arc-tertiary)]">
            {mock.label}
          </figcaption>
          <p className="arc-heading mb-4 text-sm">{mock.title}</p>
          {mock.content}
        </figure>
      ))}
    </div>
  );
}

export const SystemVisualPreview = memo(SystemVisualPreviewInner);
