"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";

import { CognitiveAdvisor } from "@/components/cognitive/CognitiveAdvisor";
import { GraphHeatmapLegend } from "@/components/cognitive/GraphHeatmapLegend";
import { LearningModePanel } from "@/components/cognitive/LearningModePanel";
import { ThinkingSimulatorPanel } from "@/components/cognitive/ThinkingSimulatorPanel";
import { WorkspaceToolbar } from "@/components/cognitive/WorkspaceToolbar";
import {
  useCognitiveGraph,
  useCognitiveScenarios,
} from "@/hooks/use-cognitive";
import { useCognitiveStore } from "@/store/cognitive-store";
import type { CognitiveNode } from "@/types/cognitive";

const CognitiveGraphCanvas = dynamic(
  () =>
    import("@/components/cognitive/CognitiveGraphCanvas").then(
      (m) => m.CognitiveGraphCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/60 text-[var(--arc-muted)]">
        Loading cognitive graph…
      </div>
    ),
  }
);

export default function CognitiveGraphPage() {
  const { id } = useParams<{ id: string }>();
  const graph = useCognitiveGraph(id);
  const scenarios = useCognitiveScenarios(id);
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

  const onToggleSelect = useCallback((nodeId: string) => {
    setMultiSelect((prev) =>
      prev.includes(nodeId)
        ? prev.filter((x) => x !== nodeId)
        : [...prev, nodeId]
    );
  }, []);

  const onDragStop = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      if (graph) moveNode(graph.id, nodeId, position);
    },
    [graph, moveNode]
  );

  if (!graph) {
    return (
      <div className="py-20 text-center text-[var(--arc-muted)]">
        Graph not found.{" "}
        <Link href="/cognitive/new" className="text-[var(--arc-accent)] hover:underline">
          Create one
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="arc-heading text-2xl">{graph.title}</h1>
        <GraphHeatmapLegend />
      </header>

      <LearningModePanel />

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="arc-graph-surface min-h-[520px] flex-1">
          <CognitiveGraphCanvas
            graph={graph}
            onNodeSelect={onSelect}
            onNodeDragStop={onDragStop}
            editable
          />
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-4 xl:w-80">
          <WorkspaceToolbar
            graphId={graph.id}
            selected={selected}
            selectedIds={multiSelect}
            onToggleSelect={onToggleSelect}
          />
          <ThinkingSimulatorPanel
            graphId={graph.id}
            scenarios={scenarios}
          />
        </aside>

        <div className="w-full shrink-0 xl:w-96">
          <CognitiveAdvisor graph={graph} />
        </div>
      </div>

      <p className="text-center text-xs text-[var(--arc-muted)]">
        <Link href={`/cognitive/workspace/${graph.id}`} className="text-[var(--arc-accent)] hover:underline">
          Open full workspace view →
        </Link>
      </p>
    </div>
  );
}
