import Image from "next/image";

import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/logo-nav.png";

type ArcLogoProps = {
  size?: number;
  className?: string;
  /** Match navbar / page background so the logo tile blends in */
  variant?: "nav" | "page";
  priority?: boolean;
};

export function ArcLogo({
  size = 32,
  className,
  variant = "nav",
  priority = false,
}: ArcLogoProps) {
  return (
    <span
      className={cn(
        "arc-brand-logo",
        variant === "nav" && "arc-brand-logo--nav",
        variant === "page" && "arc-brand-logo--page",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={LOGO_SRC}
        alt=""
        width={size}
        height={size}
        priority={priority}
        className="arc-brand-logo__img"
      />
    </span>
  );
}
