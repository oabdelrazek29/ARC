"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ArcLogo } from "@/components/brand/ArcLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { siteMenuSections } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const drawer =
    mounted && open
      ? createPortal(
          <>
            <button
              type="button"
              className="arc-site-menu__backdrop"
              onClick={close}
              aria-label="Close menu"
            />
            <aside
              id={panelId}
              className="arc-site-menu__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="arc-site-menu__header">
                <div className="flex items-center gap-2.5">
                  <ArcLogo size={28} variant="page" />
                  <div>
                    <p className="arc-heading text-base leading-none">ARC</p>
                    <p className="arc-mono mt-1 text-[10px] uppercase tracking-widest text-[var(--arc-muted)]">
                      Menu
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={close}
                    className="arc-site-menu__icon-btn"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </div>

              <nav className="arc-site-menu__nav">
                {siteMenuSections.map((section) => (
                  <div key={section.title} className="arc-site-menu__group">
                    <p className="arc-site-menu__group-title">{section.title}</p>
                    <ul className="arc-site-menu__list">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={close}
                            className="arc-site-menu__link"
                          >
                            <span>{link.label}</span>
                            {link.description ? (
                              <span className="arc-site-menu__link-desc">
                                {link.description}
                              </span>
                            ) : null}
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
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "arc-site-menu__trigger",
          open && "arc-site-menu__trigger--open"
        )}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? (
          <X className="h-5 w-5 shrink-0" aria-hidden />
        ) : (
          <Menu className="h-5 w-5 shrink-0" aria-hidden />
        )}
        <span className="arc-site-menu__trigger-label">Menu</span>
      </button>
      {drawer}
    </>
  );
}
