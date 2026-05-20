"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/cognitive", label: "Cognitive OS" },
  { href: "/cognitive/new", label: "New map" },
];

export function CognitiveNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-[var(--arc-border)] pb-4">
      <span className="arc-mono text-xs font-medium uppercase tracking-wider text-[var(--arc-accent)]">
        ARC Cognitive
      </span>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm transition-colors",
            pathname === l.href || pathname.startsWith(`${l.href}/`)
              ? "bg-[var(--arc-accent)]/10 text-[var(--arc-accent)]"
              : "text-[var(--arc-muted)] hover:text-[var(--arc-fg)]"
          )}
        >
          {l.label}
        </Link>
      ))}
      <Link
        href="/dashboard"
        className="ml-auto text-sm text-[var(--arc-muted)] hover:text-[var(--arc-fg)]"
      >
        ← Dashboard
      </Link>
    </div>
  );
}
