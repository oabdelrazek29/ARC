/** ARC Cognitive Learning Operating System — mental-model graph domain */

export type CognitiveNodeType =
  | "concept"
  | "skill"
  | "project"
  | "misconception"
  | "weakness"
  | "mastery"
  | "memory_trace"
  | "reasoning_pattern";

export type CognitiveEdgeType =
  | "depends_on"
  | "reinforces"
  | "contradicts"
  | "causes_confusion"
  | "unlocks"
  | "derived_from"
  | "strengthens";

export type NodeDriftState =
  | "stable"
  | "unstable"
  | "decaying"
  | "strengthening";

export type LearningRealityMode =
  | "exploration"
  | "compression"
  | "stress_test"
  | "construction"
  | "reflection";

export type AdvisorMode =
  | "tutor"
  | "debug"
  | "socratic"
  | "builder"
  | "analyst";

export type ReasoningStyle =
  | "visual"
  | "verbal"
  | "procedural"
  | "conceptual"
  | "mixed";

export interface CognitiveUserProfile {
  id: string;
  learning_velocity: number;
  reasoning_style: ReasoningStyle;
  cognitive_profile: string;
  weak_domains: string[];
  mastery_domains: string[];
}

export interface CognitiveNode {
  id: string;
  label: string;
  type: CognitiveNodeType;
  state: NodeDriftState;
  difficulty: number;
  confidence_score: number;
  retention_score: number;
  xp_value: number;
  annotation?: string;
  pinned?: boolean;
  subgraphId?: string;
  position?: { x: number; y: number };
  failure_count: number;
  success_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface CognitiveEdge {
  id: string;
  source: string;
  target: string;
  relationship_type: CognitiveEdgeType;
  strength: number;
  decay_rate: number;
}

export interface GraphPatch {
  id: string;
  graphId: string;
  timestamp: string;
  addedNodes: CognitiveNode[];
  updatedNodes: (Partial<CognitiveNode> & { id: string })[];
  removedNodeIds: string[];
  addedEdges: CognitiveEdge[];
  updatedEdges: (Partial<CognitiveEdge> & { id: string })[];
  removedEdgeIds: string[];
  reason?: string;
}

export interface CognitiveGraph {
  id: string;
  title: string;
  goalInput: string;
  version: number;
  nodes: CognitiveNode[];
  edges: CognitiveEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface SessionMemory {
  graphId: string;
  messages: { role: "user" | "assistant"; content: string; at: string }[];
}

export interface BehavioralMemory {
  graphId: string;
  mistakes: { nodeId: string; context: string; at: string }[];
  confusion_patterns: string[];
  avg_response_ms: number;
  retention_events: { nodeId: string; score: number; at: string }[];
}

export interface ThinkingScenario {
  id: string;
  title: string;
  kind:
    | "real_world"
    | "contradiction"
    | "reasoning_trap"
    | "constrained"
    | "system_design";
  prompt: string;
  targetNodeIds: string[];
}

export interface CognitiveGoalRequest {
  rawInput: string;
  context?: {
    level?: string;
    objective?: string;
  };
}

export interface CognitiveGoalResult {
  graph: CognitiveGraph;
  scenarios: ThinkingScenario[];
}

export interface AdvisorRequest {
  graphId: string;
  message: string;
  mode: AdvisorMode;
  realityMode: LearningRealityMode;
  weakNodeIds?: string[];
}

export interface AdvisorResponse {
  reply: string;
  patch: GraphPatch;
  weakNodesAddressed: string[];
}
