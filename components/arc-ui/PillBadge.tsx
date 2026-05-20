import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  live?: boolean;
  className?: string;
};

export function PillBadge({ children, live, className }: Props) {
  return (
    <span className={cn("arc-pill", live && "arc-pill--live", className)}>
      {children}
    </span>
  );
}
