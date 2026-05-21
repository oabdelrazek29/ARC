"use client";

import { useCallback, useState } from "react";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { usePlatformStore } from "@/store/platform-store";

export function PlannerSection() {
  const tasks = usePlatformStore((s) => s.plannerTasks);
  const addPlannerTasks = usePlatformStore((s) => s.addPlannerTasks);
  const togglePlannerTask = usePlatformStore((s) => s.togglePlannerTask);
  const recordEvent = usePlatformStore((s) => s.recordEvent);

  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlan = useCallback(async () => {
    if (!goal.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Create an adaptive study schedule with deadlines for: ${goal}. Include weekly phases.`,
          mode: "instructor",
        }),
      });
      const data = (await res.json()) as {
        payload?: { studyTimeline?: { when: string; task: string }[] };
      };
      const timeline = data.payload?.studyTimeline ?? [];
      if (timeline.length) {
        addPlannerTasks(
          timeline.map((t) => ({
            title: t.task,
            when: t.when,
            durationMinutes: 45,
            done: false,
            source: "ai" as const,
            linkedConcept: goal.slice(0, 60),
          }))
        );
        recordEvent(
          "study_session",
          goal.slice(0, 80),
          "AI study plan generated",
          "planner"
        );
      }
    } finally {
      setLoading(false);
    }
  }, [goal, addPlannerTasks, recordEvent]);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Planner"
        title="Adaptive study planner"
        lead="AI balances workload, exam prep, and focus sessions — synced with Instructor Master."
      />

      <div className="arc-card mt-8 flex flex-wrap gap-2 p-4">
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Exam in 2 weeks on organic chemistry"
          className="arc-advisor-input min-w-[200px] flex-1"
        />
        <ArcButton onClick={() => void generatePlan()} disabled={loading}>
          {loading ? "Planning…" : "Generate schedule"}
        </ArcButton>
      </div>

      <ul className="mt-8 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="arc-card flex items-start gap-3 p-4">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => togglePlannerTask(t.id)}
              className="mt-1"
            />
            <div>
              <p className="arc-mono text-[10px] text-[var(--arc-accent)]">{t.when}</p>
              <p className={t.done ? "text-sm line-through opacity-60" : "text-sm"}>
                {t.title}
              </p>
              <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
                ~{t.durationMinutes}m · {t.source}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
