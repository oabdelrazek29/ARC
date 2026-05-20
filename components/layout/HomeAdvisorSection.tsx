"use client";

import { memo, useCallback, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  advisor: ReactNode;
};

function HomeAdvisorSectionInner({ children, advisor }: Props) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((o) => {
      if (o) setMobileOpen(false);
      return !o;
    });
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <section className="arc-advisor-section">
      <div className="arc-advisor-section__bar">
        <span className="arc-mono text-[10px] text-[var(--arc-tertiary)]">
          Workspace
        </span>
        <button
          type="button"
          onClick={toggle}
          className="arc-advisor-section__toggle"
        >
          {open ? "Close AI Advisor" : "Open AI Advisor"}
        </button>
      </div>

      <div
        className={cn(
          "arc-advisor-section__body",
          open && "arc-advisor-section__body--split"
        )}
      >
        <div className="arc-advisor-section__main">{children}</div>
        {open && (
          <aside className="arc-advisor-section__panel" aria-label="ARC Adviser">
            <p className="arc-advisor-panel__title">ARC Adviser</p>
            <div className="arc-advisor-panel__body">{advisor}</div>
          </aside>
        )}
      </div>

      {open && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="arc-advisor-fab lg:hidden"
          aria-label="Open adviser"
        >
          <span className="arc-mono text-[10px]">Adviser</span>
        </button>
      )}

      {mobileOpen && (
        <div
          className="arc-advisor-backdrop lg:hidden"
          onClick={closeMobile}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "arc-advisor-drawer lg:hidden",
          mobileOpen && "arc-advisor-drawer--open"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="arc-advisor-panel__title flex items-center justify-between px-4 py-3">
          <span>ARC Adviser</span>
          <button
            type="button"
            onClick={closeMobile}
            className="arc-advisor-section__toggle"
          >
            Close
          </button>
        </div>
        <div className="arc-advisor-panel__body min-h-[50dvh]">{advisor}</div>
      </aside>
    </section>
  );
}

export const HomeAdvisorSection = memo(HomeAdvisorSectionInner);
