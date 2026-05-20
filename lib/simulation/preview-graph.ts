import { hashString, seeded } from "@/lib/simulation/seed";
import type { SimEdge, SimNode, SimNodeState } from "@/lib/simulation/types";

const PREVIEW_LABELS = [
  "Core mental model",
  "Pattern weakness",
  "Misconception risk",
  "Applied skill path",
  "Mastery checkpoint",
  "Memory trace",
];

const ADVISOR_LINES = [
  "I see an unstable cluster around your foundations — let's stabilize that before adding depth.",
  "Your graph suggests confusion between related concepts. Want to debug that node first?",
  "Strong visual reasoning pattern detected. I'll adapt explanations accordingly.",
  "Before new nodes unlock, address the weakest link in your mental model.",
];

const STATES: SimNodeState[] = [
  "unstable",
  "stable",
  "strengthening",
  "decaying",
];

export interface PreviewGraph {
  nodes: SimNode[];
  edges: SimEdge[];
  advisorLine: string;
  goal: string;
}

export function buildPreviewGraph(goal: string): PreviewGraph {
  const seed = hashString(goal.toLowerCase().trim() || "learn");
  const count = 5 + (seed % 3);
  const nodes: SimNode[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const r = 0.22 + seeded(seed, i) * 0.18;
    nodes.push({
      id: `p-${i}`,
      label: `${PREVIEW_LABELS[i % PREVIEW_LABELS.length]}: ${goal.slice(0, 28)}`,
      x: 0.5 + Math.cos(angle) * r,
      y: 0.5 + Math.sin(angle) * r,
      state: STATES[Math.floor(seeded(seed, i + 10) * STATES.length)]!,
      confidence: 0.25 + seeded(seed, i + 20) * 0.6,
    });
  }

  const edges: SimEdge[] = [];
  for (let i = 1; i < nodes.length; i++) {
    edges.push({
      id: `pe-${i}`,
      from: nodes[i - 1]!.id,
      to: nodes[i]!.id,
    });
  }

  return {
    nodes,
    edges,
    advisorLine: ADVISOR_LINES[seed % ADVISOR_LINES.length]!,
    goal,
  };
}

export function tickPreviewGraph(prev: PreviewGraph, tick: number): PreviewGraph {
  const seed = hashString(prev.goal) + tick;
  const nodes = prev.nodes.map((n, i) => {
    if (i !== tick % prev.nodes.length) return n;
    return {
      ...n,
      state: STATES[Math.floor(seeded(seed, i) * STATES.length)]!,
      confidence: Math.max(0.1, Math.min(1, n.confidence + (seeded(seed, i) - 0.5) * 0.12)),
    };
  });
  return { ...prev, nodes };
}
