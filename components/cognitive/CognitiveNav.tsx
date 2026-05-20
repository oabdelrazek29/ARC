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
    <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-zinc-800/80 pb-4">
      <span className="mr-2 font-bricolage text-sm font-semibold uppercase tracking-wider text-cyan-400/90">
        ARC Cognitive
      </span>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm transition-colors",
            pathname === l.href || pathname.startsWith(`${l.href}/`)
              ? "bg-cyan-500/15 text-cyan-300"
              : "text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-200"
          )}
        >
          {l.label}
        </Link>
      ))}
      <Link
        href="/dashboard"
        className="ml-auto text-sm text-zinc-600 hover:text-zinc-400"
      >
        ← Classic dashboard
      </Link>
    </div>
  );
}
