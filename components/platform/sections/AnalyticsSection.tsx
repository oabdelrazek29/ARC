"use client";

import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { useArcStore } from "@/store/arc-store";
import { usePlatformStore } from "@/store/platform-store";

export function AnalyticsSection() {
  const events = usePlatformStore((s) => s.events);
  const retention = usePlatformStore((s) => s.retentionScore);
  const focusSessions = usePlatformStore((s) => s.focusSessions);
  const progress = useArcStore((s) => s.progress);
  const weaknesses = usePlatformStore((s) => s.events).filter(
    (e) => e.type === "quiz_fail" || e.type === "concept_struggle"
  );

  const totalFocus = focusSessions.reduce((s, f) => s + f.minutes, 0);
  const velocity = Math.min(100, progress.completedNodeIds.length * 8 + 20);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Analytics"
        title="Learning intelligence"
        lead="Focus patterns, retention, weak concepts, and mastery velocity — synced from every section."
      />

      <div className="arc-mission-grid mt-8">
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Memory retention</p>
          <p className="mt-2 text-3xl font-semibold text-[var(--arc-accent)]">
            {retention}%
          </p>
          <div className="arc-progress mt-3">
            <div
              className="arc-progress-fill"
              style={{ width: `${retention}%` }}
            />
          </div>
        </div>
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Learning velocity</p>
          <p className="mt-2 text-3xl font-semibold">{velocity}%</p>
          <p className="mt-1 text-xs text-[var(--arc-muted)]">
            Based on completed lessons & quiz performance
          </p>
        </div>
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Focus time</p>
          <p className="mt-2 text-3xl font-semibold">{totalFocus}m</p>
          <p className="mt-1 text-xs text-[var(--arc-muted)]">
            {focusSessions.length} sessions logged
          </p>
        </div>
        <div className="arc-mission-widget md:col-span-2">
          <p className="arc-mission-widget__title">Weak concepts (live)</p>
          <ul className="mt-3 space-y-1 text-sm text-[var(--arc-muted)]">
            {weaknesses.length === 0 ? (
              <li>No struggles detected yet — keep learning.</li>
            ) : (
              weaknesses.slice(0, 8).map((e) => (
                <li key={e.id}>
                  {e.concept} — {e.message}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Activity heatmap</p>
          <div className="arc-heatmap mt-3">
            {Array.from({ length: 28 }).map((_, i) => {
              const active = events.some(
                (e) =>
                  new Date(e.createdAt).getDate() ===
                  new Date(Date.now() - i * 86400000).getDate()
              );
              return (
                <span
                  key={i}
                  className={active ? "arc-heatmap__cell--on" : "arc-heatmap__cell"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
