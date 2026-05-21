/** Inline SVG illustrations for the 5 tutor reason cards */

export function IllustLearningPath() {
  return (
    <svg viewBox="0 0 200 140" className="tutor-reason-illust" aria-hidden>
      <circle cx="28" cy="110" r="8" fill="var(--arc-accent-muted)" stroke="var(--arc-accent)" />
      <path
        d="M36 108 C60 90 80 40 100 50 C120 60 140 20 172 28"
        fill="none"
        stroke="var(--arc-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 108 C55 115 75 100 95 95 C115 88 135 75 155 65"
        fill="none"
        stroke="var(--arc-muted)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />
      <circle cx="100" cy="50" r="6" fill="var(--arc-accent)" opacity="0.5" />
      <circle cx="172" cy="28" r="8" fill="var(--arc-accent-muted)" stroke="var(--arc-accent)" />
      <text x="16" y="128" fontSize="9" fill="var(--arc-tertiary)" fontFamily="monospace">
        you
      </text>
      <text x="158" y="22" fontSize="9" fill="var(--arc-accent)" fontFamily="monospace">
        goal
      </text>
    </svg>
  );
}

export function IllustDoubtSolving() {
  return (
    <svg viewBox="0 0 200 140" className="tutor-reason-illust" aria-hidden>
      <text x="40" y="75" fontSize="48" fill="var(--arc-muted)" fontFamily="Georgia, serif" opacity="0.4">
        ?
      </text>
      <path d="M95 70 L130 45" stroke="var(--arc-accent)" strokeWidth="2" markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M2 1 L8 5 L2 9" fill="var(--arc-accent)" />
        </marker>
      </defs>
      <ellipse cx="155" cy="42" rx="28" ry="32" fill="var(--arc-accent-muted)" stroke="var(--arc-accent)" />
      <path
        d="M145 28 L155 22 L165 28 L155 48 Z"
        fill="var(--arc-accent)"
        opacity="0.9"
      />
      <circle cx="155" cy="38" r="6" fill="#faf8f5" opacity="0.9" />
    </svg>
  );
}

export function IllustExamPrep() {
  return (
    <svg viewBox="0 0 200 140" className="tutor-reason-illust" aria-hidden>
      <rect x="50" y="55" width="100" height="60" rx="4" fill="var(--arc-surface)" stroke="var(--arc-border)" />
      <rect x="58" y="48" width="36" height="10" rx="2" fill="var(--arc-card)" stroke="var(--arc-border)" />
      <circle cx="145" cy="52" r="18" fill="none" stroke="var(--arc-accent)" strokeWidth="2" />
      <text x="145" y="56" textAnchor="middle" fontSize="10" fill="var(--arc-accent)" fontFamily="monospace">
        24:00
      </text>
      <line x1="70" y1="75" x2="130" y2="75" stroke="var(--arc-border)" />
      <line x1="70" y1="88" x2="110" y2="88" stroke="var(--arc-border)" />
      <line x1="70" y1="100" x2="120" y2="100" stroke="var(--arc-accent)" opacity="0.5" />
    </svg>
  );
}

export function IllustConceptViz() {
  return (
    <svg viewBox="0 0 200 140" className="tutor-reason-illust" aria-hidden>
      <polygon
        points="100,25 140,75 120,115 80,115 60,75"
        fill="var(--arc-accent-muted)"
        stroke="var(--arc-accent)"
        strokeWidth="1.5"
      />
      <polygon
        points="100,45 125,75 110,95 90,95 75,75"
        fill="var(--arc-surface)"
        stroke="var(--arc-muted)"
        strokeWidth="1"
        opacity="0.8"
      />
      <ellipse cx="100" cy="118" rx="40" ry="8" fill="var(--arc-accent)" opacity="0.15" />
      <text x="100" y="72" textAnchor="middle" fontSize="11" fill="var(--arc-fg)" fontFamily="monospace" opacity="0.7">
        f(x)
      </text>
    </svg>
  );
}

export function IllustAdaptiveFeedback() {
  return (
    <svg viewBox="0 0 200 140" className="tutor-reason-illust" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={55 + i * 18}
          y={110 - i * 14}
          width="14"
          height={20 + i * 14}
          rx="2"
          fill={i >= 3 ? "var(--arc-accent)" : "var(--arc-card)"}
          stroke="var(--arc-border)"
          opacity={i < 2 ? 0.5 : 1}
        />
      ))}
      <line x1="45" y1="115" x2="155" y2="115" stroke="var(--arc-border)" />
      <circle cx="165" cy="40" r="14" fill="var(--arc-accent-muted)" stroke="var(--arc-accent)" />
      <text x="165" y="44" textAnchor="middle" fontSize="8" fill="var(--arc-accent)" fontFamily="monospace">
        AI
      </text>
      <line x1="155" y1="52" x2="130" y2="85" stroke="var(--arc-accent)" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
}
