import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  sub?: string;
  className?: string;
};

export function StatBlock({ value, label, sub, className }: Props) {
  return (
    <div className={cn("arc-stat", className)}>
      <p className="arc-stat-value">{value}</p>
      <p className="arc-stat-label">{label}</p>
      {sub && (
        <p className="arc-mono mt-1 text-xs text-[var(--arc-muted)]">{sub}</p>
      )}
    </div>
  );
}
