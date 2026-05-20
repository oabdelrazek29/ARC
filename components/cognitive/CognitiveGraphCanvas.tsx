"use client";

import { memo, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  CognitiveNodeCard,
  type CognitiveNodeFlowData,
} from "@/components/cognitive/CognitiveNodeCard";
import type { CognitiveGraph } from "@/types/cognitive";

const nodeTypes: NodeTypes = {
  cognitive: CognitiveNodeCard,
};

type Props = {
  graph: CognitiveGraph;
  onNodeSelect?: (nodeId: string) => void;
  onNodeDragStop?: (nodeId: string, position: { x: number; y: number }) => void;
  editable?: boolean;
};

function CognitiveGraphCanvasInner({
  graph,
  onNodeSelect,
  onNodeDragStop,
  editable = false,
}: Props) {
  const onSelect = useCallback(
    (id: string) => onNodeSelect?.(id),
    [onNodeSelect]
  );

  const heatmap = useMemo(() => {
    const map = new Map<string, number>();
    for (const n of graph.nodes) {
      map.set(n.id, 1 - n.confidence_score);
    }
    return map;
  }, [graph.nodes]);

  const nodes: Node<CognitiveNodeFlowData>[] = useMemo(
    () =>
      graph.nodes.map((n) => ({
        id: n.id,
        type: "cognitive",
        position: n.position ?? { x: 0, y: 0 },
        data: {
          node: n,
          onSelect,
          heatmapIntensity: heatmap.get(n.id) ?? 0,
        },
        draggable: editable,
      })),
    [graph.nodes, onSelect, heatmap, editable]
  );

  const edges: Edge[] = useMemo(
    () =>
      graph.edges.map((e) => {
        const weak =
          e.relationship_type === "causes_confusion" ||
          e.relationship_type === "contradicts";
        const strong =
          e.relationship_type === "strengthens" ||
          e.relationship_type === "reinforces";
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          className: weak
            ? "arc-cognitive-edge--weak"
            : strong
              ? "arc-cognitive-edge--strong"
              : "arc-cognitive-edge",
          style: { opacity: 0.4 + e.strength * 0.6 },
        };
      }),
    [graph.edges]
  );

  const onNodeDragStopHandler = useCallback(
    (_: unknown, node: Node) => {
      onNodeDragStop?.(node.id, node.position);
    },
    [onNodeDragStop]
  );

  if (!graph.nodes.length) {
    return (
      <div className="flex h-[520px] items-center justify-center text-[var(--arc-muted)]">
        No nodes in this graph yet.
      </div>
    );
  }

  return (
    <div className="arc-cognitive-flow h-[520px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        onlyRenderVisibleElements={graph.nodes.length > 80}
        onNodeDragStop={editable ? onNodeDragStopHandler : undefined}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} color="var(--arc-dot)" />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            const state = (n.data as CognitiveNodeFlowData)?.node?.state;
            if (state === "unstable") return "#a3a3a3";
            if (state === "stable") return "#22c55e";
            return "#737373";
          }}
          maskColor="var(--arc-bg)"
        />
      </ReactFlow>
    </div>
  );
}

export const CognitiveGraphCanvas = memo(CognitiveGraphCanvasInner);
