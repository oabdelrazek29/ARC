"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PillBadge } from "@/components/arc-ui/PillBadge";
import { settingsNavLinks } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

export function SettingsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="arc-page arc-dot-grid">
      <div className="arc-section arc-settings-layout">
        <aside className="arc-settings-sidebar">
          <PillBadge>Settings</PillBadge>
          <h1 className="arc-heading mt-4 text-2xl md:text-3xl">Your account</h1>
          <p className="arc-settings-hint mt-2 max-w-xs">
            Profile, security, preferences, and privacy in one place.
          </p>
          <nav className="mt-8" aria-label="Settings sections">
            <p className="arc-settings-sidebar__title">Sections</p>
            {settingsNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "arc-settings-nav-link",
                  pathname === link.href && "arc-settings-nav-link--active"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="arc-settings-panel">{children}</div>
      </div>
    </div>
  );
}
