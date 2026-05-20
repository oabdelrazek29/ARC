"use client";

import { ArcCard } from "@/components/arc-ui/ArcCard";

export function NotificationsSettings() {
  return (
    <>
      <h2 className="arc-heading text-2xl">Notifications</h2>
      <p className="arc-settings-hint mt-2">
        Email and in-app alerts for your learning rhythm.
      </p>

      <ArcCard title="Email" className="mt-8">
        <label className="mt-4 flex items-center gap-3 text-sm text-[var(--arc-muted)]">
          <input type="checkbox" disabled className="rounded border-[var(--arc-border)]" />
          Weekly progress summary
        </label>
        <label className="mt-3 flex items-center gap-3 text-sm text-[var(--arc-muted)]">
          <input type="checkbox" disabled className="rounded border-[var(--arc-border)]" />
          Streak reminders
        </label>
        <p className="arc-settings-hint mt-4">Notification delivery is not enabled yet.</p>
      </ArcCard>
    </>
  );
}
