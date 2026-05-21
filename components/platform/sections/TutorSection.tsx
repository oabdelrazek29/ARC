"use client";

import { useEffect } from "react";

import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { useInstructorStore } from "@/store/instructor-store";
import { useWorkspaceStore } from "@/store/workspace-store";

export function TutorSection() {
  const setTab = useInstructorStore((s) => s.setTab);
  const setMode = useWorkspaceStore((s) => s.setMode);

  useEffect(() => {
    setTab("lesson");
    setMode("teaching");
    return () => setMode("split");
  }, [setTab, setMode]);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="AI Tutor"
        title="Your private AI professor"
        lead="Teaching Mode is active on the right — lesson plans, weakness analysis, roadmaps, and recall training. The instructor monitors all platform activity."
      />
      <p className="arc-lead mt-6 max-w-xl text-sm text-[var(--arc-muted)]">
        Use the panel on the right (or full Teaching Mode) to ask for courses,
        explain concepts, generate exams, or recover weak topics. Activity from
        courses, files, lectures, and code lab updates recommendations here
        automatically.
      </p>
    </div>
  );
}
