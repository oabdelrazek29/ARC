import Link from "next/link";

import { ArcLogo } from "@/components/brand/ArcLogo";
import { cn } from "@/lib/utils";

type BrandLinkProps = {
  className?: string;
  showWordmark?: boolean;
  logoSize?: number;
};

export function BrandLink({
  className,
  showWordmark = true,
  logoSize = 32,
}: BrandLinkProps) {
  return (
    <Link href="/" className={cn("arc-brand-link", className)}>
      <ArcLogo size={logoSize} />
      {showWordmark ? <span className="arc-brand-link__wordmark">ARC</span> : null}
    </Link>
  );
}
