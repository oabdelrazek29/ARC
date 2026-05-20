import Link from "next/link";

import { ArcMark } from "@/components/brand/ArcMark";

const readerLinks = [
  { href: "/sign-in", label: "Sign in" },
  { href: "/cognitive", label: "Enter system" },
  { href: "/dashboard", label: "Dashboard" },
];

const houseLinks = [
  { href: "/settings", label: "Settings" },
  { href: "/companions", label: "Tutors" },
  { href: "/classic", label: "Classic view" },
];

export function SiteFooter() {
  return (
    <footer className="arc-site-footer border-t border-[var(--arc-border)] bg-[var(--arc-bg)]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <ArcMark size={28} showGlow={false} />
              <span className="arc-heading text-lg">ARC</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--arc-muted)]">
              A desk for structured understanding — breaking down what you want
              to learn and adapting as you go.
            </p>
            <p className="arc-mono mt-6 text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
              Colophon · Edition MMXXVI · Set in Fraunces · JetBrains Mono
            </p>
          </div>

          <div>
            <p className="arc-mono text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
              The Reader
            </p>
            <ul className="mt-4 space-y-2">
              {readerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--arc-fg)] hover:opacity-70"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="arc-mono text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
              House
            </p>
            <ul className="mt-4 space-y-2">
              {houseLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--arc-fg)] hover:opacity-70"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="arc-mono mt-10 border-t border-[var(--arc-border)] pt-6 text-[10px] text-[var(--arc-muted)]">
          © {new Date().getFullYear()} ARC · Built for learners who want to
          understand, not just finish.
        </p>
      </div>
    </footer>
  );
}
