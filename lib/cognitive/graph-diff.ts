import type {
  CognitiveEdge,
  CognitiveGraph,
  CognitiveNode,
  GraphPatch,
} from "@/types/cognitive";

export function applyGraphPatch(
  graph: CognitiveGraph,
  patch: GraphPatch
): CognitiveGraph {
  const nodeMap = new Map(graph.nodes.map((n) => [n.id, { ...n }]));
  const edgeMap = new Map(graph.edges.map((e) => [e.id, { ...e }]));

  for (const id of patch.removedNodeIds) nodeMap.delete(id);
  for (const n of patch.addedNodes) nodeMap.set(n.id, n);
  for (const partial of patch.updatedNodes) {
    const existing = nodeMap.get(partial.id);
    if (existing) {
      nodeMap.set(partial.id, {
        ...existing,
        ...partial,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  for (const id of patch.removedEdgeIds) edgeMap.delete(id);
  for (const e of patch.addedEdges) edgeMap.set(e.id, e);
  for (const partial of patch.updatedEdges) {
    const existing = edgeMap.get(partial.id);
    if (existing) edgeMap.set(partial.id, { ...existing, ...partial });
  }

  const nodes = Array.from(nodeMap.values());
  const nodeIds = new Set(nodes.map((n) => n.id));
  const edges = Array.from(edgeMap.values()).filter(
    (e) => nodeIds.has(e.source) && nodeIds.has(e.target)
  );

  return {
    ...graph,
    nodes,
    edges,
    version: graph.version + 1,
    updatedAt: new Date().toISOString(),
  };
}

export function identifyWeakNodes(
  nodes: CognitiveNode[],
  limit = 5
): CognitiveNode[] {
  return [...nodes]
    .filter((n) => n.type === "weakness" || n.type === "misconception" || n.state === "unstable" || n.state === "decaying")
    .sort(
      (a, b) =>
        a.confidence_score - b.confidence_score ||
        b.failure_count - a.failure_count
    )
    .slice(0, limit);
}

export function graphToFlowSubset(
  graph: CognitiveGraph,
  visibleNodeIds?: Set<string>
): { nodes: CognitiveNode[]; edges: CognitiveEdge[] } {
  if (!visibleNodeIds) {
    return { nodes: graph.nodes, edges: graph.edges };
  }
  const nodes = graph.nodes.filter((n) => visibleNodeIds.has(n.id));
  const ids = new Set(nodes.map((n) => n.id));
  const edges = graph.edges.filter(
    (e) => ids.has(e.source) && ids.has(e.target)
  );
  return { nodes, edges };
}
