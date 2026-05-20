"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/sign-in", label: "Login / Sign up" },
  { href: "/cognitive", label: "Begin learning" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
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
          className="fixed inset-0 z-[100] bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed right-0 top-0 z-[101] flex h-full w-[min(100%,300px)] flex-col border-l border-[var(--arc-border)] bg-[var(--arc-bg)]",
          open ? "translate-x-0" : "translate-x-full",
          "transition-transform duration-300"
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-[var(--arc-border)] px-4 py-4">
          <span className="arc-mono text-[10px] text-[var(--arc-muted)]">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="arc-btn arc-btn-secondary flex h-9 w-9 items-center justify-center !p-0"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-[var(--arc-fg)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[var(--arc-border)] p-4">
          <ThemeToggle />
        </div>
      </aside>
    </div>
  );
}
