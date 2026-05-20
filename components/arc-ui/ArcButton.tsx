import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function ArcButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const classes = cn(
    "arc-btn",
    variant === "primary" ? "arc-btn-primary" : "arc-btn-secondary",
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
