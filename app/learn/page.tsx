"use client";

import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { MissionControl } from "@/components/dashboard/MissionControl";
import { IntegrationStatusPanel } from "@/components/lms/IntegrationStatusPanel";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { usePlatformStore } from "@/store/platform-store";

export default function LearnMissionControlPage() {
  const events = usePlatformStore((s) => s.events);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Mission control"
        title="Learning command center"
        lead="Everything connected — courses, instructor, files, lectures, code, analytics, and graph update together."
      />

      <MissionControl />

      <IntegrationStatusPanel />

      <div className="arc-card mt-8">
        <p className="arc-mission-widget__title">Live activity stream</p>
        {events.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--arc-muted)]">
            Complete a lesson, upload a file, or process a lecture — activity
            appears here and updates the Instructor.
          </p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {events.slice(0, 12).map((e) => (
              <li
                key={e.id}
                className="flex justify-between gap-4 border-b border-[var(--arc-border)] py-2 last:border-0"
              >
                <span>
                  <span className="text-[var(--arc-accent)]">{e.concept}</span>
                  {" — "}
                  {e.message}
                </span>
                <span className="arc-mono shrink-0 text-[10px] text-[var(--arc-tertiary)]">
                  {e.section}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ArcButton href="/learn/tutor">Open Instructor →</ArcButton>
        <ArcButton href="/learn/courses" variant="ghost">
          Courses
        </ArcButton>
        <Link href="/learn/create" className="arc-btn arc-btn-ghost">
          Create course
        </Link>
      </div>
    </div>
  );
}
