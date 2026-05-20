import { cn } from "@/lib/utils";

type ArcMarkProps = {
  size?: number;
  className?: string;
  showGlow?: boolean;
};

/** Vector ARC mark — skill-tree nodes on an arc (no raster logo). */
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
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="arc-mark-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <path
        d="M8 28 Q20 8 32 28"
        stroke="url(#arc-mark-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        filter={showGlow ? "url(#arc-mark-glow)" : undefined}
      />
      <circle cx="8" cy="28" r="3.5" fill="#22d3ee" />
      <circle cx="20" cy="12" r="4" fill="#818cf8" />
      <circle cx="32" cy="28" r="3.5" fill="#a78bfa" />
      <circle cx="14" cy="22" r="2" fill="#67e8f9" opacity="0.9" />
      <circle cx="26" cy="22" r="2" fill="#c4b5fd" opacity="0.9" />
    </svg>
  );
}
