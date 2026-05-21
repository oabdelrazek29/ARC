"use client";

import Link from "next/link";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { useCognitiveStore } from "@/store/cognitive-store";
import { usePlatformStore } from "@/store/platform-store";

export function GraphSection() {
  const graphs = useCognitiveStore((s) => s.graphs);
  const notes = usePlatformStore((s) => s.notes);
  const files = usePlatformStore((s) => s.files);
  const lectures = usePlatformStore((s) => s.lectures);

  const graphList = Object.values(graphs);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Knowledge graph"
        title="Connected understanding"
        lead="Notes, lessons, files, and lectures link into Cognitive OS — weak areas heat up, dependencies show what to learn next."
      />

      <div className="arc-mission-grid mt-8">
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Graphs</p>
          <p className="mt-2 text-2xl font-semibold">{graphList.length}</p>
          <ArcButton href="/cognitive/new" className="mt-3 text-xs">
            New graph
          </ArcButton>
        </div>
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Linked notes</p>
          <p className="mt-2 text-2xl font-semibold">{notes.length}</p>
        </div>
        <div className="arc-mission-widget">
          <p className="arc-mission-widget__title">Files & lectures</p>
          <p className="mt-2 text-2xl font-semibold">
            {files.length + lectures.length}
          </p>
        </div>
      </div>

      <ul className="mt-8 space-y-2">
        {graphList.map((g) => (
          <li key={g.id}>
            <Link
              href={`/cognitive/${g.id}`}
              className="arc-card block p-4 hover:border-[var(--arc-hover-border)]"
            >
              <p className="font-medium">{g.title}</p>
              <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
                {g.nodes.length} concepts · {g.edges.length} links
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
