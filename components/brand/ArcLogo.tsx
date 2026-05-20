import { ArcMark } from "@/components/brand/ArcMark";
import { cn } from "@/lib/utils";

type ArcLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** ARC logo mark for navbar, footer, and menus (theme-aware SVG). */
export function ArcLogo({ size = 32, className }: ArcLogoProps) {
  return (
    <span className={cn("arc-brand-logo", className)} style={{ width: size, height: size }}>
      <ArcMark size={size} showGlow />
    </span>
  );
}
