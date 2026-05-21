import { ADVISOR_CACHE_TTL_MS } from "@/constants/cognitive";
import { driftPatchFromOutcome, emptyPatch } from "@/lib/cognitive/drift-engine";
import { identifyWeakNodes } from "@/lib/cognitive/graph-diff";
import {
  cacheKey,
  getCached,
  setCached,
} from "@/lib/cognitive/response-cache";
import { getOpenAIClient, hasOpenAI } from "@/lib/ai/openai-client";
import type {
  AdvisorMode,
  AdvisorResponse,
  CognitiveGraph,
  GraphPatch,
  LearningRealityMode,
  NodeDriftState,
} from "@/types/cognitive";

const MODE_INSTRUCTIONS: Record<AdvisorMode, string> = {
  tutor: "Teach concepts clearly. Fix misconceptions before expanding.",
  debug: "Diagnose misunderstandings. Target weak nodes first.",
  socratic: "Only ask questions. Never give direct answers.",
  builder: "Guide project construction using graph nodes as building blocks.",
  analyst: "Break down external content into graph-ready mental models.",
};

const REALITY_INSTRUCTIONS: Record<LearningRealityMode, string> = {
  exploration: "Encourage curiosity and free graph navigation.",
  compression: "Help compress clusters into core principles.",
  stress_test: "Use rapid, challenging questions.",
  construction: "Focus on building with existing nodes.",
  reflection: "Suggest how the graph structure should evolve.",
};

function mockAdvisorReply(
  message: string,
  weakLabels: string[],
  mode: AdvisorMode
): string {
  const weak = weakLabels.length
    ? `I see unstable areas: ${weakLabels.join(", ")}. `
    : "";
  if (mode === "socratic") {
    return `${weak}What evidence would change your mind about: "${message.slice(0, 60)}"?`;
  }
  return `${weak}[${mode}] Let's strengthen your mental model. ${message.slice(0, 80)} — start by revisiting the weakest node before adding new concepts.`;
}

function buildPatchFromAI(
  graph: CognitiveGraph,
  parsed: { updatedNodes?: { id: string; confidence_score?: number; state?: string }[] }
): GraphPatch {
  const base = emptyPatch(graph.id);
  if (!parsed.updatedNodes?.length) return base;
  return {
    ...base,
    updatedNodes: parsed.updatedNodes.map((u) => ({
      id: u.id,
      confidence_score: u.confidence_score,
      state: u.state as NodeDriftState | undefined,
      updatedAt: new Date().toISOString(),
    })),
    reason: "advisor",
  };
}

export async function adviseWithCognitiveAI(
  graph: CognitiveGraph,
  message: string,
  mode: AdvisorMode,
  realityMode: LearningRealityMode
): Promise<AdvisorResponse> {
  const weak = identifyWeakNodes(graph.nodes);
  const weakIds = weak.map((n) => n.id);
  const weakLabels = weak.map((n) => n.label);

  const key = cacheKey([
    graph.id,
    String(graph.version),
    mode,
    realityMode,
    message.trim().toLowerCase(),
  ]);
  const cached = getCached<AdvisorResponse>(key);
  if (cached) return cached;

  if (!hasOpenAI()) {
    const { professorTeach } = await import("@/lib/ai/professor-teach");
    const taught = await professorTeach(message, {
      mode: "cognitive",
      advisorMode: mode,
      topic: graph.title,
      weakNodes: weakLabels,
    });
    const drift = weak[0]
      ? driftPatchFromOutcome(graph.id, weak[0].id, "neutral", graph.nodes)
      : emptyPatch(graph.id);
    const result: AdvisorResponse = {
      reply: taught.markdown,
      patch: drift,
      weakNodesAddressed: weakIds,
      teaching: taught.payload,
    };
    setCached(key, result, ADVISOR_CACHE_TTL_MS);
    return result;
  }

  const client = getOpenAIClient();
  if (!client) {
    return {
      reply: mockAdvisorReply(message, weakLabels, mode),
      patch: emptyPatch(graph.id),
      weakNodesAddressed: weakIds,
    };
  }

  const graphSummary = {
    nodes: graph.nodes.map((n) => ({
      id: n.id,
      label: n.label,
      type: n.type,
      state: n.state,
      confidence: n.confidence_score,
    })),
    edges: graph.edges.map((e) => ({
      source: e.source,
      target: e.target,
      type: e.relationship_type,
    })),
    weakNodeIds: weakIds,
  };

  try {
    const { professorTeach } = await import("@/lib/ai/professor-teach");
    const taught = await professorTeach(message, {
      mode: "cognitive",
      advisorMode: mode,
      topic: graph.title,
      graphSummary: JSON.stringify(graphSummary),
      weakNodes: weakLabels,
    });

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content: `You update cognitive graph node confidence after a teaching turn.
Return JSON only: { "updatedNodes": [{ "id", "confidence_score"?, "state"? }] }
Rules: bump confidence slightly on nodes the user engaged with; lower on misconceptions if user still confused.
Mode context: ${MODE_INSTRUCTIONS[mode]} · ${REALITY_INSTRUCTIONS[realityMode]}`,
        },
        {
          role: "user",
          content: JSON.stringify({
            graph: graphSummary,
            message,
            lessonSummary: taught.payload.summary,
          }),
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    const parsed = text
      ? (JSON.parse(text) as {
          updatedNodes?: { id: string; confidence_score?: number; state?: string }[];
        })
      : {};

    const result: AdvisorResponse = {
      reply: taught.markdown,
      patch: buildPatchFromAI(graph, parsed),
      weakNodesAddressed: weakIds,
      teaching: taught.payload,
    };
    setCached(key, result, ADVISOR_CACHE_TTL_MS);
    return result;
  } catch (e) {
    console.error("[ARC Cognitive Advisor]", e);
    const result: AdvisorResponse = {
      reply: mockAdvisorReply(message, weakLabels, mode),
      patch: weak[0]
        ? driftPatchFromOutcome(graph.id, weak[0].id, "failure", graph.nodes)
        : emptyPatch(graph.id),
      weakNodesAddressed: weakIds,
    };
    return result;
  }
}

export async function generateCognitiveGraphWithAI(
  request: import("@/types/cognitive").CognitiveGoalRequest
): Promise<import("@/types/cognitive").CognitiveGoalResult> {
  const { generateMockCognitiveGraph } = await import(
    "@/lib/cognitive/mock-graph-generator"
  );

  if (!hasOpenAI()) {
    return generateMockCognitiveGraph(request);
  }

  const client = getOpenAIClient();
  if (!client) return generateMockCognitiveGraph(request);

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 2000,
      messages: [
        {
          role: "system",
          content: `You model the user's INTERNAL mental model — not course content.
Nodes represent beliefs, weaknesses, misconceptions, reasoning patterns (e.g. "Confuses X with Y", "Weak at Z").
Node types: concept, skill, project, misconception, weakness, mastery, memory_trace, reasoning_pattern.
Edge types: depends_on, reinforces, contradicts, causes_confusion, unlocks, derived_from, strengthens.
Each node: id, label, type, state (stable|unstable|decaying|strengthening), difficulty 0-1, confidence_score, retention_score, xp_value.
Return JSON: { "title", "nodes": [...], "edges": [{ "source", "target", "relationship_type", "strength", "decay_rate" }], "scenarios": [{ "id", "title", "kind", "prompt", "targetNodeIds" }] }`,
        },
        {
          role: "user",
          content: JSON.stringify(request),
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Empty graph response");

    const parsed = JSON.parse(text) as {
      title?: string;
      nodes?: Record<string, unknown>[];
      edges?: Record<string, unknown>[];
      scenarios?: import("@/types/cognitive").ThinkingScenario[];
    };

    if (!parsed.nodes?.length) throw new Error("Invalid cognitive graph");

    const graphId = crypto.randomUUID();
    const now = new Date().toISOString();
    const nodes = parsed.nodes.map((raw, i) => {
      const r = raw as Record<string, unknown>;
      return {
        id: String(r.id ?? `cn-${i}`),
        label: String(r.label ?? "Mental model node"),
        type: (r.type as import("@/types/cognitive").CognitiveNodeType) ?? "concept",
        state: (r.state as import("@/types/cognitive").NodeDriftState) ?? "unstable",
        difficulty: Number(r.difficulty) || 0.5,
        confidence_score: Number(r.confidence_score) || 0.35,
        retention_score: Number(r.retention_score) || 0.4,
        xp_value: Number(r.xp_value) || 25,
        failure_count: 0,
        success_count: 0,
        createdAt: now,
        updatedAt: now,
      };
    });

    const edges = (parsed.edges ?? []).map((raw, i) => {
      const r = raw as Record<string, unknown>;
      return {
        id: String(r.id ?? `ce-${i}`),
        source: String(r.source),
        target: String(r.target),
        relationship_type:
          (r.relationship_type as import("@/types/cognitive").CognitiveEdgeType) ??
          "depends_on",
        strength: Number(r.strength) || 0.5,
        decay_rate: Number(r.decay_rate) || 0.05,
      };
    });

    const deps = new Map<string, string[]>();
    for (const e of edges) {
      if (e.relationship_type === "depends_on" || e.relationship_type === "unlocks") {
        const list = deps.get(e.target) ?? [];
        list.push(e.source);
        deps.set(e.target, list);
      }
    }

    const { layoutCognitiveNodesFromEdges } = await import(
      "@/lib/cognitive/layout-cognitive-nodes"
    );

    const graph: import("@/types/cognitive").CognitiveGraph = {
      id: graphId,
      title: parsed.title ?? `Cognitive map`,
      goalInput: request.rawInput,
      version: 1,
      nodes: layoutCognitiveNodesFromEdges(nodes, deps),
      edges,
      createdAt: now,
      updatedAt: now,
    };

    return {
      graph,
      scenarios: parsed.scenarios ?? generateMockCognitiveGraph(request).scenarios,
    };
  } catch (e) {
    console.error("[ARC Cognitive Graph AI]", e);
    return generateMockCognitiveGraph(request);
  }
}
