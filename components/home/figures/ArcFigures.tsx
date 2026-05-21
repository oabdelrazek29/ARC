"use client";

import type { ReactNode } from "react";

function FigureWrapper({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="arc-figure">
      <div className="arc-figure__body">{children}</div>
      <p className="arc-figure__caption">{label}</p>
    </div>
  );
}

export function FigureOne() {
  return (
    <FigureWrapper label="Fig. I — Lesson workspace · Split view">
      <div className="arc-figure__chrome">
        <span className="arc-figure__dot" />
        <span className="arc-figure__dot" />
        <span className="arc-figure__dot" />
        <span className="arc-figure__chrome-title">Calculus I · Lesson 4 of 12</span>
      </div>
      <div className="arc-figure-split">
        <div className="arc-figure-split__lesson">
          <p className="arc-figure-mono">Module 2 · Lesson 4</p>
          <h3 className="arc-figure-serif">The Chain Rule</h3>
          <p className="arc-figure-muted">Differentiating composite functions</p>
          <hr className="arc-figure-rule" />
          <p className="arc-figure-body">
            If <code className="arc-figure-code">h(x) = f(g(x))</code> then the derivative is:
          </p>
          <div className="arc-figure-codeblock">
            <code>h′(x) = f′(g(x)) · g′(x)</code>
          </div>
          <p className="arc-figure-body">
            This rule applies whenever one function is nested inside another.
            Recognizing the inner and outer function is the key.
          </p>
          <div className="arc-figure-callout">
            <p className="arc-figure-mono">Example</p>
            <code>d/dx[sin(x²)] = cos(x²) · 2x</code>
          </div>
        </div>
        <div className="arc-figure-split__tutor">
          <p className="arc-figure-mono">§ AI Tutor — active context</p>
          <hr className="arc-figure-rule" />
          <div className="arc-figure-card">
            <p className="arc-figure-mono">Summary</p>
            <p className="arc-figure-body-sm">
              Chain rule links composite function derivatives cleanly.
            </p>
          </div>
          <div className="arc-figure-card">
            <p className="arc-figure-mono">Tutor</p>
            <div className="arc-figure-bubble">Why do we multiply the derivatives?</div>
            <p className="arc-figure-mono mt-2">ARC</p>
            <p className="arc-figure-body-sm">
              Because composing functions chains their rates of change — each scaled
              by how fast the inner one moves.
            </p>
          </div>
          <div className="arc-figure-card">
            <p className="arc-figure-mono">Practice</p>
            <p className="arc-figure-body-sm">
              Find d/dx of <code className="arc-figure-code">cos(3x²)</code>
            </p>
          </div>
          <div className="arc-figure-input">
            <span>Ask anything about this lesson...</span>
            <span className="arc-figure-send">›</span>
          </div>
        </div>
      </div>
      <div className="arc-figure-footer-nav">
        <span>← Previous lesson</span>
        <span>Next lesson →</span>
      </div>
    </FigureWrapper>
  );
}

export function FigureTwo() {
  const modules = [
    { num: "01", tag: "Foundations", title: "Limits & Continuity", meta: "4 lessons · Quiz · 2h est.", state: "complete" as const, progress: 100 },
    { num: "02", tag: "Core ideas", title: "Derivatives & Rules", meta: "5 lessons · Quiz · Project · 3h est.", state: "active" as const, progress: 60 },
    { num: "03", tag: "Practice", title: "Integrals & Applications", meta: "5 lessons · 2 projects · 4h est.", state: "locked" as const, progress: 0 },
    { num: "04", tag: "Review", title: "Final Exam Preparation", meta: "3 lessons · Mock exam · 2h est.", state: "locked" as const, progress: 0 },
  ];

  return (
    <FigureWrapper label="Fig. II — Course path · Module progression">
      <div className="arc-figure__chrome">
        <span className="arc-figure__dot" />
        <span className="arc-figure__dot" />
        <span className="arc-figure__dot" />
        <span className="arc-figure__chrome-title">Calculus I — Course Overview</span>
      </div>
      <div className="arc-figure-pad">
        <p className="arc-figure-mono">§ Curriculum path · 4 modules · 18 lessons</p>
        <h3 className="arc-figure-serif-lg">Learn Through Structured Progression</h3>
        <div className="arc-figure-modules">
          {modules.map((m) => (
            <div
              key={m.num}
              className={`arc-figure-module arc-figure-module--${m.state}`}
            >
              <div>
                <p className="arc-figure-module__tag">
                  {m.num} · {m.tag}
                </p>
                <p className="arc-figure-module__title">{m.title}</p>
                <p className="arc-figure-muted">{m.meta}</p>
              </div>
              <div className="arc-figure-module__status">
                {m.state === "complete" && (
                  <span className="arc-figure-pill">Complete</span>
                )}
                {m.state === "active" && (
                  <>
                    <div className="arc-figure-progress">
                      <div style={{ width: `${m.progress}%` }} />
                    </div>
                    <p className="arc-figure-mono">{m.progress}%</p>
                  </>
                )}
                {m.state === "locked" && (
                  <span className="arc-figure-locked">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FigureWrapper>
  );
}

export function FigureThree() {
  return (
    <FigureWrapper label="Fig. III — Concept explanation · In context">
      <div className="arc-figure-pad arc-figure-pad--dark">
        <p className="arc-figure-mono">§ Concept · inline explanation</p>
        <h3 className="arc-figure-serif-lg">
          You&apos;re reading about gradient descent.
        </h3>
        <h3 className="arc-figure-serif-lg mb-4">
          ARC explains it in context.
        </h3>
        <hr className="arc-figure-rule" />
        <div className="arc-figure-concept">
          <div className="arc-figure-concept__head">
            <span className="arc-figure-accent-mono">§ Concept — Gradient Descent</span>
            <span className="arc-figure-mono">Machine Learning · Lesson 6</span>
          </div>
          <div className="arc-figure-concept__body">
            <h4 className="arc-figure-serif">Gradient Descent</h4>
            <p className="arc-figure-muted">How a model learns to improve itself</p>
            <p className="arc-figure-body">
              Imagine standing on a hilly landscape in fog. You want to reach the
              lowest valley. You can&apos;t see far, so you take a small step in
              whichever direction slopes downward.
            </p>
            <p className="arc-figure-body">
              Gradient descent does exactly this — nudging a model&apos;s parameters
              toward lower error, one small step at a time.
            </p>
            <p className="arc-figure-mono arc-figure-concept__tags">
              Connected to: loss functions · learning rate · backpropagation
            </p>
          </div>
        </div>
      </div>
    </FigureWrapper>
  );
}

export function FigureFour() {
  const stats = [
    { label: "Study streak", value: "12", unit: "days", sub: "Personal best: 18" },
    { label: "Lessons this week", value: "7", unit: "of 10", sub: "Goal: 10 lessons" },
    { label: "Avg. session", value: "48", unit: "min", sub: "+12 min vs last week" },
    { label: "Mastery score", value: "74", unit: "/ 100", sub: "+6 pts this week", accent: true },
  ];
  const topics = [
    { name: "Limits & Continuity", pct: 92 },
    { name: "Derivatives", pct: 62 },
    { name: "Chain Rule", pct: 47, warn: true },
    { name: "Integration", pct: 12, dim: true },
  ];

  return (
    <FigureWrapper label="Fig. IV — Progress tracking · Weekly overview">
      <div className="arc-figure__chrome">
        <span className="arc-figure__dot" />
        <span className="arc-figure__dot" />
        <span className="arc-figure__dot" />
        <span className="arc-figure__chrome-title">Dashboard · Progress</span>
      </div>
      <div className="arc-figure-pad">
        <p className="arc-figure-mono">§ Progress · This week · Edition MMXXVI</p>
        <h3 className="arc-figure-serif-lg">Progress You Can Read</h3>
        <div className="arc-figure-stats">
          {stats.map((s) => (
            <div key={s.label} className="arc-figure-stat">
              <p className="arc-figure-muted">{s.label}</p>
              <p>
                <span className={s.accent ? "arc-figure-stat__val accent" : "arc-figure-stat__val"}>
                  {s.value}
                </span>
                <span className="arc-figure-muted"> {s.unit}</span>
              </p>
              <p className="arc-figure-mono">{s.sub}</p>
            </div>
          ))}
        </div>
        <hr className="arc-figure-rule" />
        <p className="arc-figure-mono mb-3">Topic mastery — Calculus I</p>
        {topics.map((t) => (
          <div key={t.name} className="arc-figure-topic">
            <span>{t.name}</span>
            <div className="arc-figure-progress">
              <div
                className={
                  t.dim ? "dim" : t.warn ? "warn" : ""
                }
                style={{ width: `${t.pct}%` }}
              />
            </div>
            <span className={t.dim ? "dim" : t.warn ? "warn" : "accent"}>{t.pct}%</span>
          </div>
        ))}
      </div>
    </FigureWrapper>
  );
}

export function FigureFive() {
  return (
    <FigureWrapper label="Fig. V — Progress map · Concept connections">
      <div className="arc-figure-pad arc-figure-pad--dark">
        <p className="arc-figure-mono">§ Learning map · How ideas connect</p>
        <h3 className="arc-figure-serif-lg">How Ideas Connect</h3>
        <p className="arc-figure-muted mb-4">Concepts linked across your full path</p>
        <svg
          viewBox="0 0 600 240"
          width="100%"
          className="arc-figure-graph"
          aria-label="Concept connection graph"
        >
          <defs>
            <marker id="arc-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke="var(--arc-border)" strokeWidth="1.5" />
            </marker>
          </defs>
          <line x1="300" y1="120" x2="190" y2="80" stroke="var(--arc-border)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="300" y1="120" x2="410" y2="80" stroke="var(--arc-border)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="300" y1="120" x2="190" y2="175" stroke="var(--arc-border)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="300" y1="120" x2="410" y2="175" stroke="var(--arc-border)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="190" y1="80" x2="110" y2="55" stroke="var(--arc-muted)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="410" y1="80" x2="490" y2="55" stroke="var(--arc-muted)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="190" y1="175" x2="110" y2="200" stroke="var(--arc-muted)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="410" y1="175" x2="490" y2="200" stroke="var(--arc-muted)" strokeWidth="0.5" markerEnd="url(#arc-arr)" />
          <line x1="190" y1="80" x2="410" y2="175" stroke="var(--arc-border)" strokeWidth="0.5" strokeDasharray="4 3" />
          <line x1="410" y1="80" x2="190" y2="175" stroke="var(--arc-border)" strokeWidth="0.5" strokeDasharray="4 3" />
          <circle cx="300" cy="120" r="36" fill="var(--arc-accent-muted)" stroke="var(--arc-accent)" strokeWidth="1.5" />
          <text x="300" y="115" textAnchor="middle" fill="var(--arc-accent)" fontSize="12" fontFamily="Georgia, serif">Derivatives</text>
          <text x="300" y="130" textAnchor="middle" fill="var(--arc-accent)" fontSize="10" fontFamily="monospace">mastered</text>
          <circle cx="190" cy="80" r="28" fill="var(--arc-surface)" stroke="var(--arc-muted)" />
          <text x="190" y="76" textAnchor="middle" fill="var(--arc-fg)" fontSize="11" fontFamily="Georgia, serif">Limits</text>
          <text x="190" y="90" textAnchor="middle" fill="var(--arc-muted)" fontSize="10" fontFamily="monospace">92%</text>
          <circle cx="410" cy="80" r="28" fill="var(--arc-surface)" stroke="var(--arc-muted)" />
          <text x="410" y="76" textAnchor="middle" fill="var(--arc-fg)" fontSize="11" fontFamily="Georgia, serif">Chain Rule</text>
          <text x="410" y="90" textAnchor="middle" fill="var(--arc-accent)" fontSize="10" fontFamily="monospace">47%</text>
          <circle cx="190" cy="175" r="28" fill="var(--arc-surface)" stroke="var(--arc-tertiary)" />
          <text x="190" y="171" textAnchor="middle" fill="var(--arc-fg)" fontSize="11" fontFamily="Georgia, serif">Integration</text>
          <text x="190" y="185" textAnchor="middle" fill="var(--arc-tertiary)" fontSize="10" fontFamily="monospace">12%</text>
          <circle cx="410" cy="175" r="28" fill="var(--arc-surface)" stroke="var(--arc-tertiary)" />
          <text x="410" y="171" textAnchor="middle" fill="var(--arc-fg)" fontSize="11" fontFamily="Georgia, serif">Product</text>
          <text x="410" y="185" textAnchor="middle" fill="var(--arc-tertiary)" fontSize="10" fontFamily="monospace">Rule</text>
        </svg>
        <div className="arc-figure-legend">
          <span><i className="mastered" /> Mastered</span>
          <span><i className="progress" /> In progress</span>
          <span><i className="locked" /> Not started</span>
          <span className="related">— — Related</span>
        </div>
      </div>
    </FigureWrapper>
  );
}
