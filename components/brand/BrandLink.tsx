import Link from "next/link";

import { ArcLogo } from "@/components/brand/ArcLogo";
import { cn } from "@/lib/utils";

type BrandLinkProps = {
  className?: string;
  showWordmark?: boolean;
  logoSize?: number;
  priority?: boolean;
};

export function BrandLink({
  className,
  showWordmark = true,
  logoSize = 32,
  priority = false,
}: BrandLinkProps) {
  return (
    <Link href="/" className={cn("arc-brand-link", className)}>
      <ArcLogo size={logoSize} variant="nav" priority={priority} />
      {showWordmark ? <span className="arc-brand-link__wordmark">ARC</span> : null}
    </Link>
  );
}
