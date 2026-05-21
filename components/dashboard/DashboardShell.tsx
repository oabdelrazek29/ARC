"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLink } from "@/components/brand/BrandLink";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { dashboardNavItems } from "@/constants/dashboard-nav";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: Props) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isLessonReader = /\/courses\/[^/]+\/lessons\//.test(pathname ?? "");

  if (isLessonReader) {
    return <div className="min-h-screen bg-[var(--arc-bg)]">{children}</div>;
  }

  return (
    <div className="arc-dashboard-layout">
      <aside className="arc-dashboard-sidebar" aria-label="App navigation">
        <div className="px-3 pb-4">
          <BrandLink logoSize={24} />
        </div>
        <nav className="arc-dashboard-sidebar__nav">
          {dashboardNavItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "arc-dashboard-sidebar__link",
                  active && "arc-dashboard-sidebar__link--active"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex items-center gap-2 px-3 pt-6">
          <ThemeToggle />
          <span className="arc-mono hidden text-[10px] text-[var(--arc-tertiary)] sm:inline">
            {theme === "dark" ? "Dark" : "Light"}
          </span>
        </div>
      </aside>
      <div
        className={cn(
          "arc-dashboard-main",
          pathname.startsWith("/tutor") && "arc-dashboard-main--wide"
        )}
      >
        {children}
      </div>
    </div>
  );
}
