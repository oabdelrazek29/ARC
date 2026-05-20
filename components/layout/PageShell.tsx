import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
};

/** Themed page wrapper for routes not using arc-section directly */
export function PageShell({ children, wide, className }: Props) {
  return (
    <div className={cn("arc-page arc-dot-grid arc-body", className)}>
      <div className={cn(wide ? "arc-section-wide !py-10" : "arc-section !py-10")}>
        {children}
      </div>
    </div>
  );
}
