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
    <div className="h-full min-h-[480px] w-full">
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
        <Background gap={20} color="var(--arc-dot)" />
        <Controls />
        <MiniMap
          nodeColor={(n) =>
            (n.data as SkillNodeFlowData)?.node?.completed
              ? "#22c55e"
              : (n.data as SkillNodeFlowData)?.node?.unlocked
                ? "#737373"
                : "#404040"
          }
          maskColor="var(--arc-bg)"
        />
      </ReactFlow>
    </div>
  );
}

export const SkillTreeCanvas = memo(SkillTreeCanvasInner);
