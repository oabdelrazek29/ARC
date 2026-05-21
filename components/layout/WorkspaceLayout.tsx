"use client";

import { memo, useCallback, useState, type ReactNode } from "react";
import {
  Focus,
  LayoutPanelLeft,
  Presentation,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { WorkspaceMode } from "@/types/instructor";

type Props = {
  children: ReactNode;
  instructor: ReactNode;
  /** Label for the main work area */
  mainLabel?: string;
  className?: string;
};

const MODE_CONFIG: Record<
  WorkspaceMode,
  { label: string; short: string; icon: typeof Focus }
> = {
  focus: { label: "Full Focus", short: "Focus", icon: Focus },
  split: { label: "Smart Split", short: "Split", icon: LayoutPanelLeft },
  teaching: { label: "Teaching Mode", short: "Teach", icon: Presentation },
};

function WorkspaceLayoutInner({
  children,
  instructor,
  mainLabel = "Workspace",
  className,
}: Props) {
  const mode = useWorkspaceStore((s) => s.mode);
  const setMode = useWorkspaceStore((s) => s.setMode);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <section className={cn("arc-workspace-layout", className)}>
      <div className="arc-workspace-layout__bar">
        <span className="arc-mono text-[10px] text-[var(--arc-tertiary)]">
          {mainLabel}
        </span>
        <div className="arc-workspace-layout__modes" role="tablist">
          {(Object.keys(MODE_CONFIG) as WorkspaceMode[]).map((m) => {
            const cfg = MODE_CONFIG[m];
            const Icon = cfg.icon;
            return (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "arc-workspace-layout__mode-btn",
                  mode === m && "arc-workspace-layout__mode-btn--active"
                )}
                title={cfg.label}
              >
                <Icon className="h-3 w-3 shrink-0" aria-hidden />
                <span className="hidden sm:inline">{cfg.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          "arc-workspace-layout__body",
          mode === "split" && "arc-workspace-layout__body--split",
          mode === "teaching" && "arc-workspace-layout__body--teaching"
        )}
      >
        <div className="arc-workspace-layout__main">{children}</div>
        {mode !== "focus" && (
          <aside
            className="arc-workspace-layout__instructor"
            aria-label="Instructor Master"
          >
            <p className="arc-instructor-master__header">Instructor Master</p>
            <div className="arc-instructor-master__body">{instructor}</div>
          </aside>
        )}
      </div>

      {mode !== "focus" && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="arc-advisor-fab lg:hidden"
          aria-label="Open Instructor Master"
        >
          <span className="arc-mono text-[10px]">Instructor</span>
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
        <div className="arc-instructor-master__header flex items-center justify-between px-4">
          <span>Instructor Master</span>
          <button
            type="button"
            onClick={closeMobile}
            className="arc-workspace-layout__mode-btn"
          >
            Close
          </button>
        </div>
        <div className="arc-instructor-master__body min-h-[55dvh]">
          {instructor}
        </div>
      </aside>
    </section>
  );
}

export const WorkspaceLayout = memo(WorkspaceLayoutInner);
