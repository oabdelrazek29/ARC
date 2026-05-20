"use client";

import Link from "next/link";

import { ArcCard } from "@/components/arc-ui/ArcCard";
import { PillBadge } from "@/components/arc-ui/PillBadge";
import { StatBlock } from "@/components/arc-ui/StatBlock";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function SettingsPage() {
  const { theme } = useTheme();

  return (
    <div className="arc-page arc-dot-grid">
      <section className="arc-section !pt-10">
        <PillBadge>Preferences</PillBadge>
        <h1 className="arc-heading mt-4 text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-[var(--arc-muted)]">
          Appearance and system preferences.
        </p>

        <hr className="arc-divider my-10" />

        <div className="arc-feature-grid">
          <ArcCard
            title="Appearance"
            description="Toggle between dark and light cognitive interfaces."
          >
            <div className="mt-4 flex items-center justify-between">
              <span className="arc-mono text-xs text-[var(--arc-muted)]">
                Current: {theme}
              </span>
              <ThemeToggle />
            </div>
          </ArcCard>

          <ArcCard
            title="Accent"
            description="Green signals live intelligence, mastery, and progress."
          >
            <div className="mt-4 flex items-center gap-2">
              <span
                className="h-8 w-8 rounded-full"
                style={{ background: "var(--arc-accent)" }}
              />
              <span className="arc-mono text-xs text-[var(--arc-muted)]">
                #22c55e
              </span>
            </div>
          </ArcCard>

          <ArcCard
            title="Typography"
            description="Syne headings · DM Sans body · DM Mono labels."
          >
            <p className="arc-heading mt-4 text-lg">ARC</p>
            <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
              cognitive learning OS
            </p>
          </ArcCard>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatBlock value="28px" label="Dot grid" />
          <StatBlock value="900px" label="Content width" />
          <StatBlock value="16px" label="Card radius" />
        </div>

        <hr className="arc-divider my-10" />

        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/dashboard" className="text-[var(--arc-muted)] hover:text-[var(--arc-fg)]">
            Dashboard
          </Link>
          <Link href="/cognitive" className="text-[var(--arc-muted)] hover:text-[var(--arc-fg)]">
            Cognitive OS
          </Link>
          <Link href="/" className="text-[var(--arc-muted)] hover:text-[var(--arc-fg)]">
            Home simulation
          </Link>
        </div>
      </section>
    </div>
  );
}
