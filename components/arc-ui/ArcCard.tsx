import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  float?: boolean;
  className?: string;
};

export function ArcCard({
  title,
  description,
  icon,
  children,
  float,
  className,
}: Props) {
  return (
    <article className={cn("arc-card", float && "arc-card-float", className)}>
      {icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--arc-border)] bg-[var(--arc-bg)]">
          {icon}
        </div>
      )}
      <h3 className="arc-heading text-base text-[var(--arc-fg)]">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-[var(--arc-muted)]">
          {description}
        </p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </article>
  );
}
