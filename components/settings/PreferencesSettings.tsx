"use client";

import { ArcCard } from "@/components/arc-ui/ArcCard";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

export function PreferencesSettings() {
  const { theme } = useTheme();

  return (
    <>
      <h2 className="arc-heading text-2xl">Preferences</h2>
      <p className="arc-settings-hint mt-2">
        Appearance and how ARC behaves on this device.
      </p>

      <ArcCard title="Appearance" className="mt-8">
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--arc-fg)]">Color theme</p>
            <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
              Current: {theme}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </ArcCard>

      <ArcCard title="Adviser" description="Homepage and cognitive adviser." className="mt-6">
        <div className="arc-settings-field">
          <label htmlFor="pref-adviser">Default adviser panel</label>
          <select id="pref-adviser" defaultValue="closed" disabled>
            <option value="closed">Closed until opened</option>
            <option value="open">Open on homepage</option>
          </select>
        </div>
        <p className="arc-settings-hint">More controls coming soon.</p>
      </ArcCard>

      <ArcCard title="Language" className="mt-6">
        <div className="arc-settings-field">
          <label htmlFor="pref-lang">Interface language</label>
          <select id="pref-lang" defaultValue="en" disabled>
            <option value="en">English</option>
          </select>
        </div>
      </ArcCard>
    </>
  );
}
