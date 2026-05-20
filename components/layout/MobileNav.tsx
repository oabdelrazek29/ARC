"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/cognitive", label: "Cognitive OS" },
  { href: "/settings", label: "Settings" },
  { href: "/companions", label: "Tutors" },
  { href: "/my-journey", label: "Journey" },
  { href: "/sign-in", label: "Sign in" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="arc-btn arc-btn-secondary flex h-9 w-9 items-center justify-center !p-0"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed right-0 top-0 z-[101] flex h-full w-[min(100%,320px)] flex-col border-l border-[var(--arc-border)] bg-[var(--arc-bg)] shadow-xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-[var(--arc-border)] px-4 py-4">
          <p className="arc-mono text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
            Options
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="arc-btn arc-btn-secondary flex h-9 w-9 items-center justify-center !p-0"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          <p className="arc-mono mb-2 px-2 text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
            Navigate
          </p>
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-[var(--arc-fg)] transition-colors hover:bg-[var(--arc-card)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[var(--arc-border)] p-4">
          <p className="arc-mono mb-3 text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
            Appearance
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-[var(--arc-muted)]">Light / dark</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
