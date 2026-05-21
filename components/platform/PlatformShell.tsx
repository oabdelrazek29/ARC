"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";

import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { PlatformInstructor } from "@/components/platform/PlatformInstructor";
import { learnNavItems } from "@/constants/learn-nav";
import { cn } from "@/lib/utils";
import { usePlatformStore } from "@/store/platform-store";
import { useWorkspaceStore } from "@/store/workspace-store";

type Props = {
  children: ReactNode;
  mainLabel?: string;
  /** Default split on platform pages */
  defaultSplit?: boolean;
};

function PlatformShellInner({
  children,
  mainLabel = "Learning OS",
  defaultSplit = true,
}: Props) {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);
  const setSection = usePlatformStore((s) => s.setSection);
  const mode = useWorkspaceStore((s) => s.mode);
  const setMode = useWorkspaceStore((s) => s.setMode);

  useEffect(() => {
    const item = learnNavItems.find(
      (n) =>
        pathname === n.href ||
        (n.href !== "/learn" && pathname.startsWith(n.href))
    );
    if (item) setSection(item.section);
  }, [pathname, setSection]);

  useEffect(() => {
    if (defaultSplit && mode === "focus") {
      setMode("split");
    }
  }, [defaultSplit, mode, setMode]);

  return (
    <div className="arc-platform">
      <div className="arc-platform-mobile-bar lg:hidden">
        <button
          type="button"
          onClick={() => setMobileNav((o) => !o)}
          className="arc-workspace-layout__mode-btn gap-2"
          aria-expanded={mobileNav}
        >
          <Menu className="h-4 w-4" aria-hidden />
          Sections
        </button>
        <span className="arc-mono text-[10px] text-[var(--arc-muted)]">
          Learn OS
        </span>
      </div>
      {mobileNav && (
        <nav className="arc-platform-mobile-nav lg:hidden" aria-label="Platform sections">
          {learnNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileNav(false)}
              className={cn(
                "arc-platform-sidebar__link",
                (pathname === item.href ||
                  (item.href !== "/learn" && pathname.startsWith(item.href))) &&
                  "arc-platform-sidebar__link--active"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
      <aside className="arc-platform-sidebar" aria-label="Platform sections">
        <p className="arc-platform-sidebar__brand arc-mono">ARC · Learn OS</p>
        <nav className="arc-platform-sidebar__nav">
          {learnNavItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/learn" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "arc-platform-sidebar__link",
                  active && "arc-platform-sidebar__link--active"
                )}
              >
                <span className="arc-platform-sidebar__label">{item.label}</span>
                <span className="arc-platform-sidebar__desc">{item.description}</span>
              </Link>
            );
          })}
        </nav>
        <Link href="/cognitive" className="arc-platform-sidebar__footer">
          Cognitive OS →
        </Link>
      </aside>

      <div className="arc-platform-body">
        <WorkspaceLayout
          mainLabel={mainLabel}
          instructor={<PlatformInstructor />}
        >
          {children}
        </WorkspaceLayout>
      </div>
    </div>
  );
}

export const PlatformShell = memo(PlatformShellInner);
