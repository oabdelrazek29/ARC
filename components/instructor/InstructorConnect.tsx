"use client";

import { memo } from "react";
import Link from "next/link";
import { GitBranch, Network } from "lucide-react";

type Props = {
  graphId?: string;
  connectHint?: string;
};

function InstructorConnectInner({ graphId, connectHint }: Props) {
  return (
    <div className="arc-instructor-panel-section">
      <p className="arc-instructor-panel-section__label flex items-center gap-1.5">
        <Network className="h-3.5 w-3.5" aria-hidden />
        Knowledge graph
      </p>
      <p className="arc-instructor-hint mt-2">
        Every note, lesson, and concept links into your graph — like Obsidian with
        an adaptive instructor on top. Weak areas surface as heat; dependencies
        show what to learn next.
      </p>

      {connectHint && (
        <div className="mt-4 rounded-xl border border-[var(--arc-border)] bg-[var(--arc-surface)] p-3 text-sm">
          {connectHint}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2">
        {graphId ? (
          <Link
            href={`/cognitive/${graphId}`}
            className="arc-btn arc-btn-primary text-xs"
          >
            Open your graph →
          </Link>
        ) : (
          <Link href="/cognitive/new" className="arc-btn arc-btn-primary text-xs">
            Create knowledge graph →
          </Link>
        )}
        <Link
          href="/cognitive"
          className="arc-btn arc-btn-ghost text-xs flex items-center gap-1.5"
        >
          <GitBranch className="h-3 w-3" aria-hidden />
          Cognitive OS hub
        </Link>
      </div>

      <p className="arc-instructor-hint mt-6">
        Upload lectures, PDFs, and notes (coming soon) — the instructor will
        auto-transcribe, summarize, and wire concepts into this graph.
      </p>
    </div>
  );
}

export const InstructorConnect = memo(InstructorConnectInner);
