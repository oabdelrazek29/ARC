"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const menuSections = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/cognitive", label: "Cognitive OS" },
      { href: "/companions", label: "Tutors" },
    ],
  },
  {
    title: "Your account",
    links: [
      { href: "/sign-in", label: "Login / Sign up" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/my-journey", label: "My journey" },
      { href: "/settings", label: "Settings" },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const drawer =
    mounted && open
      ? createPortal(
          <>
            <button
              type="button"
              className="arc-mobile-nav__backdrop"
              onClick={close}
              aria-label="Close menu"
            />
            <aside
              id="arc-mobile-nav"
              className="arc-mobile-nav__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="arc-mobile-nav__header">
                <span className="arc-mono text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
                  Menu
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={close}
                    className="arc-mobile-nav__icon-btn"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </div>

              <nav className="arc-mobile-nav__nav">
                {menuSections.map((section) => (
                  <div key={section.title} className="arc-mobile-nav__group">
                    <p className="arc-mobile-nav__group-title">{section.title}</p>
                    <ul className="arc-mobile-nav__list">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={close}
                            className="arc-mobile-nav__link"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>
          </>,
          document.body
        )
      : null;

  return (
    <div className="relative z-[60] md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "arc-mobile-nav__icon-btn",
          open && "border-[var(--arc-hover-border)]"
        )}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="arc-mobile-nav"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <Menu className="h-5 w-5" aria-hidden />
        )}
      </button>
      {drawer}
    </div>
  );
}
