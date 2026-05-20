"use client";

import { useState } from "react";
import { GitMerge, Pin, Split, StickyNote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCognitiveStore } from "@/store/cognitive-store";
import type { CognitiveNode } from "@/types/cognitive";

type Props = {
  graphId: string;
  selected: CognitiveNode | null;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
};

export function WorkspaceToolbar({
  graphId,
  selected,
  selectedIds,
  onToggleSelect,
}: Props) {
  const [annotation, setAnnotation] = useState("");
  const mergeNodes = useCognitiveStore((s) => s.mergeNodes);
  const splitNode = useCognitiveStore((s) => s.splitNode);
  const pinNode = useCognitiveStore((s) => s.pinNode);
  const annotateNode = useCognitiveStore((s) => s.annotateNode);
  const recordOutcome = useCognitiveStore((s) => s.recordOutcome);

  return (
    <div className="flex flex-col gap-3 arc-card">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-400/90">
        Workspace
      </h3>
      <p className="text-xs text-[var(--arc-muted)]">
        Co-owned by you and AI — drag, merge, split, annotate
      </p>

      {selected ? (
        <>
          <p className="text-sm font-medium text-[var(--arc-fg)]">{selected.label}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="gap-1"
              onClick={() => pinNode(graphId, selected.id, !selected.pinned)}
            >
              <Pin className="h-3 w-3" />
              {selected.pinned ? "Unpin" : "Pin"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => recordOutcome(graphId, selected.id, "success")}
            >
              + Mastery
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => recordOutcome(graphId, selected.id, "failure")}
            >
              Mark confusion
            </Button>
          </div>
          <div className="flex gap-2">
            <input
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              placeholder="Annotate understanding…"
              className="flex-1 rounded border border-[var(--arc-border)] bg-[var(--arc-bg)] px-2 py-1 text-xs text-[var(--arc-fg)]"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                annotateNode(graphId, selected.id, annotation);
                setAnnotation("");
              }}
            >
              <StickyNote className="h-3 w-3" />
            </Button>
          </div>
        </>
      ) : (
        <p className="text-xs text-[var(--arc-muted)]">Select a node on the graph</p>
      )}

      {selectedIds.length >= 2 && (
        <Button
          size="sm"
          className="gap-1"
          onClick={() =>
            mergeNodes(
              graphId,
              selectedIds,
              `Merged: ${selectedIds.length} nodes`
            )
          }
        >
          <GitMerge className="h-3 w-3" />
          Merge {selectedIds.length} nodes
        </Button>
      )}

      {selected && (
        <Button
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() =>
            splitNode(graphId, selected.id, [
              `${selected.label} (A)`,
              `${selected.label} (B)`,
            ])
          }
        >
          <Split className="h-3 w-3" />
          Split node
        </Button>
      )}

      <p className="text-[10px] text-[var(--arc-muted)]">
        Shift+click nodes to multi-select for merge
      </p>
      {selected && (
        <button
          type="button"
          className="text-left text-[10px] text-[var(--arc-accent)] hover:text-[var(--arc-accent)]"
          onClick={() => onToggleSelect(selected.id)}
        >
          Toggle multi-select
        </button>
      )}
    </div>
  );
}
