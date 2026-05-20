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

import { SkillNodeCard, type SkillNodeFlowData } from "@/components/skill-tree/SkillNode";
import type { SkillTree } from "@/types/arc";

const nodeTypes: NodeTypes = {
  skill: SkillNodeCard,
};

type Props = {
  tree: SkillTree;
  onNodeSelect?: (nodeId: string) => void;
};

function SkillTreeCanvasInner({ tree, onNodeSelect }: Props) {
  const onSelect = useCallback(
    (id: string) => onNodeSelect?.(id),
    [onNodeSelect]
  );

  const nodes: Node<SkillNodeFlowData>[] = useMemo(
    () =>
      tree.nodes.map((n) => ({
        id: n.id,
        type: "skill",
        position: n.position ?? { x: 0, y: 0 },
        data: { node: n, onSelect },
      })),
    [tree.nodes, onSelect]
  );

  const edges: Edge[] = useMemo(
    () =>
      tree.nodes.flatMap((n) =>
        n.dependencies.map((dep) => ({
          id: `${dep}-${n.id}`,
          source: dep,
          target: n.id,
          animated: n.unlocked && !n.completed,
          className: n.completed ? "arc-edge--done" : "arc-edge",
        }))
      ),
    [tree.nodes]
  );

  return (
    <div className="h-full min-h-[480px] w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/80">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ type: "smoothstep" }}
      >
        <Background gap={20} color="#27272a" />
        <Controls className="!bg-zinc-900 !border-zinc-700" />
        <MiniMap
          className="!bg-zinc-900"
          nodeColor={(n) =>
            (n.data as SkillNodeFlowData)?.node?.completed
              ? "#34d399"
              : (n.data as SkillNodeFlowData)?.node?.unlocked
                ? "#22d3ee"
                : "#52525b"
          }
        />
      </ReactFlow>
    </div>
  );
}

export const SkillTreeCanvas = memo(SkillTreeCanvasInner);
