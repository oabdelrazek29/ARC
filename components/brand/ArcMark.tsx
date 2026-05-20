"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

type ArcMarkProps = {
  size?: number;
  className?: string;
  /** Gradient stroke; off for favicon-style flat marks */
  showGlow?: boolean;
};

/**
 * ARC mark — learning path (arc) with structured nodes.
 * Uses theme accent tokens; transparent background for nav and icons.
 */
export function ArcMark({ size = 32, className, showGlow = true }: ArcMarkProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `arc-grad-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("arc-mark shrink-0", className)}
      aria-hidden
    >
      {showGlow && (
        <defs>
          <linearGradient id={gradId} x1="6" y1="32" x2="34" y2="8">
            <stop offset="0%" stopColor="var(--arc-accent)" />
            <stop offset="100%" stopColor="var(--arc-accent-soft)" />
          </linearGradient>
        </defs>
      )}
      {/* Path of learning */}
      <path
        d="M7 30 C11 12 17 8 20 8 C23 8 29 12 33 30"
        stroke={showGlow ? `url(#${gradId})` : "var(--arc-accent)"}
        strokeWidth="2.25"
        strokeLinecap="round"
        fill="none"
      />
      {/* Structure nodes */}
      <circle cx="7" cy="30" r="3.25" fill="var(--arc-accent)" />
      <circle cx="20" cy="8" r="4" fill="var(--arc-accent-soft)" />
      <circle cx="33" cy="30" r="3.25" fill="var(--arc-accent)" />
      <circle cx="13" cy="20" r="2" fill="var(--arc-accent)" opacity="0.55" />
      <circle cx="27" cy="20" r="2" fill="var(--arc-accent)" opacity="0.55" />
    </svg>
  );
}
