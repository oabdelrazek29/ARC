import Link from "next/link";

const systemLinks = [
  { href: "/sign-in", label: "Login" },
  { href: "/cognitive", label: "Begin learning" },
  { href: "/#pricing", label: "Pricing" },
];

const houseLinks = [
  { href: "/about", label: "About" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "mailto:hello@arc.local", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="arc-site-footer relative z-[1] border-t border-[var(--arc-border)] bg-[var(--arc-bg)]">
      <div className="mx-auto max-w-[72rem] px-4 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="arc-heading text-lg">
              ARC
            </Link>
            <p className="arc-footer-tagline mt-4 max-w-sm">
              A system for the serious learner — breaking down what you want to
              know, one path at a time.
            </p>
            <p className="arc-mono mt-6 text-[10px] text-[var(--arc-tertiary)]">
              © 2026 ARC · Built for independent thinkers
            </p>
          </div>

          <div>
            <p className="arc-mono text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
              The System
            </p>
            <ul className="mt-4 space-y-2">
              {systemLinks.map((l) => (
                <li key={l.label}>
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
                <li key={l.label}>
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

        <p className="arc-mono mt-12 border-t border-[var(--arc-border)] pt-6 text-[10px] text-[var(--arc-tertiary)]">
          Colophon · № I · MMXXVI · Set in Fraunces · JetBrains Mono
        </p>
      </div>
    </footer>
  );
}
