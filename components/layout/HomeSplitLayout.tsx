"use client";

import { memo, useCallback, useState, type ReactNode } from "react";
import { MessageCircle, PanelRightClose, PanelRightOpen } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  advisor: ReactNode;
};

function HomeSplitLayoutInner({ children, advisor }: Props) {
  const [advisorOpen, setAdvisorOpen] = useState(true);
  const [mobileAdvisorOpen, setMobileAdvisorOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileAdvisorOpen(false), []);

  return (
    <div className="arc-workspace">
      <div
        className={cn(
          "arc-workspace-main",
          advisorOpen && "arc-workspace-main--with-advisor"
        )}
      >
        {children}
      </div>

      <aside
        className={cn(
          "arc-advisor-panel hidden lg:flex",
          !advisorOpen && "arc-advisor-panel--collapsed"
        )}
        aria-label="ARC advisor"
      >
        <div className="arc-advisor-panel__toolbar">
          <span className="arc-mono text-[10px] text-[var(--arc-muted)]">
            Advisor
          </span>
          <button
            type="button"
            onClick={() => setAdvisorOpen((o) => !o)}
            className="arc-btn arc-btn-secondary flex h-8 w-8 items-center justify-center !p-0"
            aria-label={advisorOpen ? "Collapse advisor" : "Expand advisor"}
          >
            {advisorOpen ? (
              <PanelRightClose className="h-3.5 w-3.5" />
            ) : (
              <PanelRightOpen className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        {advisorOpen && <div className="arc-advisor-panel__body">{advisor}</div>}
      </aside>

      <button
        type="button"
        onClick={() => setMobileAdvisorOpen(true)}
        className="arc-advisor-fab lg:hidden"
        aria-label="Open advisor"
      >
        <MessageCircle className="h-5 w-5" />
      </button>

      {mobileAdvisorOpen && (
        <div
          className="arc-advisor-backdrop lg:hidden"
          onClick={closeMobile}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "arc-advisor-drawer lg:hidden",
          mobileAdvisorOpen && "arc-advisor-drawer--open"
        )}
        aria-hidden={!mobileAdvisorOpen}
      >
        <div className="arc-advisor-panel__toolbar">
          <span className="arc-mono text-[10px] text-[var(--arc-muted)]">
            Advisor
          </span>
          <button
            type="button"
            onClick={closeMobile}
            className="arc-btn arc-btn-secondary text-xs"
          >
            Close
          </button>
        </div>
        <div className="arc-advisor-panel__body">{advisor}</div>
      </aside>
    </div>
  );
}

export const HomeSplitLayout = memo(HomeSplitLayoutInner);
