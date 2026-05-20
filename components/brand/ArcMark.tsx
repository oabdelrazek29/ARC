import { cn } from "@/lib/utils";

type ArcMarkProps = {
  size?: number;
  className?: string;
  showGlow?: boolean;
};

/** Vector ARC mark — arc path with skill-tree nodes. */
export function ArcMark({ size = 36, className, showGlow = true }: ArcMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {showGlow && (
        <defs>
          <linearGradient id="arc-mark-grad" x1="4" y1="36" x2="36" y2="4">
            <stop offset="0%" stopColor="var(--arc-accent)" />
            <stop offset="100%" stopColor="var(--arc-accent-soft)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M8 28 Q20 8 32 28"
        stroke={showGlow ? "url(#arc-mark-grad)" : "var(--arc-accent)"}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="28" r="3.5" fill="var(--arc-accent)" />
      <circle cx="20" cy="12" r="4" fill="var(--arc-accent-soft)" />
      <circle cx="32" cy="28" r="3.5" fill="var(--arc-accent)" />
      <circle cx="14" cy="22" r="2" fill="var(--arc-accent-soft)" opacity="0.9" />
      <circle cx="26" cy="22" r="2" fill="var(--arc-accent-soft)" opacity="0.9" />
    </svg>
  );
}
