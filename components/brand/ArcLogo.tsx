import Image from "next/image";

import { cn } from "@/lib/utils";

type ArcLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** ARC brand mark — matches /public/images/logo-nav.png */
export function ArcLogo({ size = 32, className, priority }: ArcLogoProps) {
  return (
    <span
      className={cn("arc-brand-logo relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logo-nav.png"
        alt=""
        width={size}
        height={size}
        priority={priority}
        className="h-full w-full object-contain"
        aria-hidden
      />
    </span>
  );
}
