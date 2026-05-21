import Link from "next/link";

import { BrandLink } from "@/components/brand/BrandLink";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/** Full-page auth chrome — no marketing navbar/footer bleeding through */
export function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="arc-auth-layout">
      <header className="arc-auth-layout__header">
        <BrandLink logoSize={28} />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/" className="arc-mono text-[11px] text-[var(--arc-muted)] hover:text-[var(--arc-fg)]">
            ← Home
          </Link>
        </div>
      </header>
      <main className="arc-auth-layout__main">{children}</main>
    </div>
  );
}
