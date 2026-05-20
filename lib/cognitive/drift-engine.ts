import type {
  CognitiveNode,
  GraphPatch,
  NodeDriftState,
} from "@/types/cognitive";

function nextState(
  node: CognitiveNode,
  outcome: "success" | "failure" | "neutral"
): NodeDriftState {
  if (outcome === "success") {
    if (node.success_count >= 2) return "strengthening";
    if (node.state === "decaying") return "unstable";
    return node.confidence_score > 0.7 ? "stable" : "strengthening";
  }
  if (outcome === "failure") {
    if (node.failure_count >= 2) return "unstable";
    if (node.failure_count >= 4) return "decaying";
    return "unstable";
  }
  return node.state;
}

export function driftPatchFromOutcome(
  graphId: string,
  nodeId: string,
  outcome: "success" | "failure" | "neutral",
  nodes: CognitiveNode[]
): GraphPatch {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) {
    return emptyPatch(graphId);
  }

  const failure_count =
    outcome === "failure" ? node.failure_count + 1 : node.failure_count;
  const success_count =
    outcome === "success" ? node.success_count + 1 : node.success_count;

  const confidence_score =
    outcome === "success"
      ? Math.min(1, node.confidence_score + 0.08)
      : outcome === "failure"
        ? Math.max(0, node.confidence_score - 0.12)
        : node.confidence_score;

  const retention_score =
    outcome === "success"
      ? Math.min(1, node.retention_score + 0.05)
      : outcome === "failure"
        ? Math.max(0, node.retention_score - 0.1)
        : node.retention_score;

  const state = nextState(
    { ...node, failure_count, success_count },
    outcome
  );

  return {
    id: `patch-${Date.now()}`,
    graphId,
    timestamp: new Date().toISOString(),
    addedNodes: [],
    updatedNodes: [
      {
        id: nodeId,
        failure_count,
        success_count,
        confidence_score,
        retention_score,
        state,
        updatedAt: new Date().toISOString(),
      },
    ],
    removedNodeIds: [],
    addedEdges: [],
    updatedEdges: [],
    removedEdgeIds: [],
    reason: `drift:${outcome}`,
  };
}

export function emptyPatch(graphId: string): GraphPatch {
  return {
    id: `patch-${Date.now()}`,
    graphId,
    timestamp: new Date().toISOString(),
    addedNodes: [],
    updatedNodes: [],
    removedNodeIds: [],
    addedEdges: [],
    updatedEdges: [],
    removedEdgeIds: [],
  };
}
