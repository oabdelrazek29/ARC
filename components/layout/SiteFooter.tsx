import Link from "next/link";

import { BrandLink } from "@/components/brand/BrandLink";

const systemLinks = [
  { href: "/sign-in", label: "Login" },
  { href: "/dashboard", label: "Begin learning" },
  { href: "/courses", label: "Courses" },
  { href: "/subscription", label: "Pricing" },
];

const houseLinks = [
  { href: "/about", label: "About" },
  { href: "/settings/privacy", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "mailto:hello@arc.local", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="arc-site-footer relative z-[1] border-t border-[var(--arc-border)] bg-[var(--arc-bg)]">
      <div className="clarity-container py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandLink logoSize={28} />
            <p className="arc-footer-tagline mt-4 max-w-sm arc-body text-sm">
              An atelier for the modern learner — turning complex material into
              understanding, one session at a time.
            </p>
            <p className="arc-mono mt-6 text-[10px] text-[var(--arc-tertiary)]">
              © 2026 ARC · Built for independent thinkers
            </p>
          </div>

          <div>
            <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-muted)]">
              The System
            </p>
            <ul className="mt-4 space-y-2">
              {systemLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="arc-body text-sm text-[var(--arc-fg)] hover:opacity-70"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="arc-mono text-[10px] uppercase tracking-[0.08em] text-[var(--arc-muted)]">
              House
            </p>
            <ul className="mt-4 space-y-2">
              {houseLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="arc-body text-sm text-[var(--arc-fg)] hover:opacity-70"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="arc-mono mt-12 border-t border-[var(--arc-border)] pt-6 text-[10px] text-[var(--arc-tertiary)]">
          Colophon · № I · MMXXVI · Set in Fraunces · JetBrains Mono
        </p>
      </div>
    </footer>
  );
}
