"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

import { GraphHeatmapLegend } from "@/components/cognitive/GraphHeatmapLegend";
import { WorkspaceToolbar } from "@/components/cognitive/WorkspaceToolbar";
import { useCognitiveGraph } from "@/hooks/use-cognitive";
import { useCognitiveStore } from "@/store/cognitive-store";
import type { CognitiveNode } from "@/types/cognitive";

const CognitiveGraphCanvas = dynamic(
  () =>
    import("@/components/cognitive/CognitiveGraphCanvas").then(
      (m) => m.CognitiveGraphCanvas
    ),
  { ssr: false }
);

export default function CognitiveWorkspacePage() {
  const { id } = useParams<{ id: string }>();
  const graph = useCognitiveGraph(id);
  const moveNode = useCognitiveStore((s) => s.moveNode);
  const [selected, setSelected] = useState<CognitiveNode | null>(null);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);

  const onSelect = useCallback(
    (nodeId: string) => {
      const node = graph?.nodes.find((n) => n.id === nodeId);
      if (node) setSelected(node);
    },
    [graph]
  );

  if (!graph) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Graph not found.{" "}
        <Link href="/cognitive" className="text-cyan-400 hover:underline">
          Back to Cognitive OS
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-bricolage text-2xl font-bold text-white">
            Workspace — {graph.title}
          </h1>
          <p className="text-sm text-zinc-500">
            Full edit mode · drag, merge, split, annotate clusters
          </p>
        </div>
        <Link
          href={`/cognitive/${graph.id}`}
          className="text-sm text-cyan-500 hover:underline"
        >
          ← Graph + Advisor
        </Link>
      </header>

      <GraphHeatmapLegend />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <WorkspaceToolbar
          graphId={graph.id}
          selected={selected}
          selectedIds={multiSelect}
          onToggleSelect={(nid) =>
            setMultiSelect((prev) =>
              prev.includes(nid) ? prev.filter((x) => x !== nid) : [...prev, nid]
            )
          }
        />
        <div className="min-h-[600px]">
          <CognitiveGraphCanvas
            graph={graph}
            onNodeSelect={onSelect}
            onNodeDragStop={(nodeId, position) =>
              moveNode(graph.id, nodeId, position)
            }
            editable
          />
        </div>
      </div>
    </div>
  );
}
