"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { CourseWorkspace } from "@/components/course/CourseWorkspace";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { PillBadge } from "@/components/arc-ui/PillBadge";
import { useArcStore } from "@/store/arc-store";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const tree = useArcStore((s) => s.trees[id]);
  const goalTitle = useArcStore((s) =>
    tree ? s.goals.find((g) => g.id === tree.goalId)?.title : undefined
  );

  if (!tree) {
    return (
      <div className="arc-page arc-dot-grid py-20 text-center text-[var(--arc-muted)]">
        Course not found.{" "}
        <Link href="/learn/create" className="text-[var(--arc-accent)] hover:underline">
          Create a learning path
        </Link>
      </div>
    );
  }

  return (
    <PlatformShell mainLabel={tree.title}>
      <div className="arc-page arc-dot-grid !py-4">
        <PillBadge>Structured course</PillBadge>
        <p className="arc-mono mt-2 text-[10px] text-[var(--arc-tertiary)]">
          Modules · checkpoints · projects — Instructor synced
        </p>
        <CourseWorkspace tree={tree} goalTitle={goalTitle} />
      </div>
    </PlatformShell>
  );
}
