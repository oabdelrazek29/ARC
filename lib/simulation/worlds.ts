import type { SimEdge, SimNode, SimUserWorld } from "@/lib/simulation/types";
import { seeded } from "@/lib/simulation/seed";

const WORLD_DEFS = [
  { id: "a", label: "User A", topic: "AI engineering" },
  { id: "b", label: "User B", topic: "calculus" },
  { id: "c", label: "User C", topic: "cybersecurity" },
] as const;

const NODE_LABELS: Record<string, string[]> = {
  a: [
    "Neural intuition",
    "Weak backprop grasp",
    "Confuses loss vs metric",
    "Transformer mental model",
    "MLOps cluster",
  ],
  b: [
    "Limit intuition",
    "Integration patterns",
    "Confuses rate vs value",
    "Series convergence",
    "Proof strategies",
  ],
  c: [
    "Threat modeling",
    "Weak crypto intuition",
    "Confuses auth vs authz",
    "Network attack surfaces",
    "Incident response",
  ],
};

function buildNodes(worldId: string, count: number): SimNode[] {
  const labels = NODE_LABELS[worldId] ?? NODE_LABELS.a;
  const nodes: SimNode[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = 0.28 + seeded(i, worldId.charCodeAt(0)) * 0.12;
    nodes.push({
      id: `${worldId}-n${i}`,
      label: labels[i % labels.length]!,
      x: 0.5 + Math.cos(angle) * r,
      y: 0.5 + Math.sin(angle) * r,
      state: i % 3 === 0 ? "unstable" : "stable",
      confidence: 0.35 + seeded(worldId.charCodeAt(0), i) * 0.5,
    });
  }
  return nodes;
}

function buildEdges(nodes: SimNode[]): SimEdge[] {
  const edges: SimEdge[] = [];
  for (let i = 1; i < nodes.length; i++) {
    edges.push({
      id: `e-${nodes[i - 1]!.id}-${nodes[i]!.id}`,
      from: nodes[i - 1]!.id,
      to: nodes[i]!.id,
    });
  }
  if (nodes.length > 2) {
    edges.push({
      id: `e-${nodes[0]!.id}-${nodes[nodes.length - 1]!.id}`,
      from: nodes[0]!.id,
      to: nodes[nodes.length - 1]!.id,
    });
  }
  return edges;
}

export function createInitialWorlds(): SimUserWorld[] {
  return WORLD_DEFS.map((w) => {
    const nodes = buildNodes(w.id, 5);
    return {
      ...w,
      nodes,
      edges: buildEdges(nodes),
      progress: 0.42,
      unstableCount: nodes.filter((n) => n.state === "unstable").length,
    };
  });
}

export function createBackgroundNodes(count = 48): import("@/lib/simulation/types").BackgroundNode[] {
  const nodes: import("@/lib/simulation/types").BackgroundNode[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: `bg-${i}`,
      x: seeded(i, 1),
      y: seeded(i, 2),
      radius: 2 + seeded(i, 3) * 3,
      opacity: 0.15 + seeded(i, 4) * 0.35,
      pulse: seeded(i, 5),
    });
  }
  return nodes;
}
