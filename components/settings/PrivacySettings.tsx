"use client";

import Link from "next/link";

import { ArcCard } from "@/components/arc-ui/ArcCard";

export function PrivacySettings() {
  return (
    <>
      <h2 className="arc-heading text-2xl">Privacy & data</h2>
      <p className="arc-settings-hint mt-2">
        What ARC stores and how you can control it.
      </p>

      <ArcCard title="Your data" className="mt-8">
        <ul className="mt-4 space-y-3 text-sm text-[var(--arc-muted)]">
          <li>Learning graphs and goals are stored in your browser until cloud sync is enabled.</li>
          <li>Voice tutor sessions may use Supabase when you are signed in.</li>
          <li>AI adviser messages may be sent to configured API providers when you use coach features.</li>
        </ul>
      </ArcCard>

      <ArcCard title="Policies" className="mt-6">
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <Link href="/about" className="text-[var(--arc-fg)] hover:opacity-70">
            About ARC
          </Link>
          <span className="text-[var(--arc-muted)]">Privacy policy (coming soon)</span>
          <span className="text-[var(--arc-muted)]">Terms of use (coming soon)</span>
          <Link
            href="mailto:hello@arc.local"
            className="text-[var(--arc-fg)] hover:opacity-70"
          >
            Contact
          </Link>
        </div>
      </ArcCard>

      <ArcCard title="Export & delete" className="mt-6">
        <p className="arc-settings-hint mt-4">
          Export learning data or request account deletion will be available when
          cloud accounts are fully wired.
        </p>
      </ArcCard>
    </>
  );
}
