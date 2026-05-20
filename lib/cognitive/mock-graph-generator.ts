import {
  DEFAULT_CONFIDENCE,
  DEFAULT_RETENTION,
} from "@/constants/cognitive";
import { layoutCognitiveNodesFromEdges } from "@/lib/cognitive/layout-cognitive-nodes";
import type {
  CognitiveEdge,
  CognitiveGraph,
  CognitiveGoalRequest,
  CognitiveNode,
  ThinkingScenario,
} from "@/types/cognitive";

function node(
  partial: Pick<CognitiveNode, "id" | "label" | "type"> &
    Partial<CognitiveNode>
): CognitiveNode {
  const now = new Date().toISOString();
  return {
    state: "unstable",
    difficulty: 0.5,
    confidence_score: DEFAULT_CONFIDENCE,
    retention_score: DEFAULT_RETENTION,
    xp_value: 25,
    failure_count: 0,
    success_count: 0,
    createdAt: now,
    updatedAt: now,
    ...partial,
  };
}

function edge(
  source: string,
  target: string,
  relationship_type: CognitiveEdge["relationship_type"],
  strength = 0.6
): CognitiveEdge {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
    relationship_type,
    strength,
    decay_rate: 0.05,
  };
}

export function generateMockCognitiveGraph(
  request: CognitiveGoalRequest
): { graph: CognitiveGraph; scenarios: ThinkingScenario[] } {
  const graphId = crypto.randomUUID();
  const topic = request.rawInput.slice(0, 80) || "Learning goal";

  const nodes: CognitiveNode[] = [
    node({
      id: "n-visual",
      label: "Strong visual learner",
      type: "reasoning_pattern",
      state: "stable",
      confidence_score: 0.85,
    }),
    node({
      id: "n-core",
      label: `Core mental model: ${topic}`,
      type: "concept",
      state: "unstable",
    }),
    node({
      id: "n-weak",
      label: "Weak pattern recognition under time pressure",
      type: "weakness",
      state: "unstable",
      confidence_score: 0.28,
    }),
    node({
      id: "n-mis",
      label: "Confuses correlation with causation",
      type: "misconception",
      state: "unstable",
      confidence_score: 0.22,
    }),
    node({
      id: "n-skill",
      label: `Applied skill path for ${topic.split(" ")[0] ?? "topic"}`,
      type: "skill",
      state: "strengthening",
      confidence_score: 0.55,
    }),
    node({
      id: "n-mastery",
      label: "Foundational mastery checkpoint",
      type: "mastery",
      state: "decaying",
      confidence_score: 0.4,
    }),
    node({
      id: "n-project",
      label: `Build: ${topic.slice(0, 40)} project`,
      type: "project",
      state: "stable",
      confidence_score: 0.5,
    }),
    node({
      id: "n-memory",
      label: "Prior study session recall",
      type: "memory_trace",
      state: "decaying",
      retention_score: 0.3,
    }),
  ];

  const edges: CognitiveEdge[] = [
    edge("n-visual", "n-core", "reinforces"),
    edge("n-core", "n-skill", "depends_on"),
    edge("n-mis", "n-core", "causes_confusion", 0.8),
    edge("n-weak", "n-skill", "contradicts", 0.7),
    edge("n-skill", "n-mastery", "unlocks"),
    edge("n-mastery", "n-project", "strengthens"),
    edge("n-memory", "n-core", "derived_from"),
    edge("n-weak", "n-mis", "reinforces", 0.5),
  ];

  const deps = new Map<string, string[]>();
  for (const e of edges) {
    if (e.relationship_type === "depends_on" || e.relationship_type === "unlocks") {
      const list = deps.get(e.target) ?? [];
      list.push(e.source);
      deps.set(e.target, list);
    }
  }

  const laid = layoutCognitiveNodesFromEdges(nodes, deps);
  const now = new Date().toISOString();

  const graph: CognitiveGraph = {
    id: graphId,
    title: `Cognitive map: ${topic}`,
    goalInput: request.rawInput,
    version: 1,
    nodes: laid,
    edges,
    createdAt: now,
    updatedAt: now,
  };

  const scenarios: ThinkingScenario[] = [
    {
      id: "sc-1",
      title: "Contradiction test",
      kind: "contradiction",
      prompt: `Two statements about "${topic}" seem true but conflict. Which assumption breaks?`,
      targetNodeIds: ["n-mis", "n-core"],
    },
    {
      id: "sc-2",
      title: "Reasoning trap",
      kind: "reasoning_trap",
      prompt: "You're given convincing anecdotal evidence. What cognitive node is at risk?",
      targetNodeIds: ["n-mis", "n-weak"],
    },
    {
      id: "sc-3",
      title: "System design challenge",
      kind: "system_design",
      prompt: `Design a minimal system that demonstrates mastery of ${topic}.`,
      targetNodeIds: ["n-project", "n-mastery"],
    },
  ];

  return { graph, scenarios };
}
