import { NODE_TYPE_XP } from "@/constants/arc";
import { analyzeAndGenerate as mockAnalyze } from "@/lib/ai/skill-tree-generator";
import { layoutSkillNodes } from "@/lib/ai/layout-nodes";
import { getOpenAIClient, hasOpenAI } from "@/lib/ai/openai-client";
import type {
  AIGenerationResult,
  GoalContext,
  SkillNode,
  SkillTree,
} from "@/types/arc";

const SYSTEM = `You are ARC, an adaptive learning architect. You design RPG-style skill trees for ANY subject (STEM, humanities, languages, arts, test prep, etc.).
Rules:
- If the goal is vague AND context.clarificationAnswers is empty or missing, return needsClarification true with 2-4 targeted questions. Each question MUST have a unique string "id" (e.g. "aspects", "level", "focus").
- If context.clarificationAnswers has 2+ entries, NEVER ask more questions — return needsClarification false and build the tree using those answers.
- When context is enough, return needsClarification false and a skill tree with 8-14 nodes.
- Nodes must have: id, title, description, xpReward, difficulty (beginner|intermediate|advanced), nodeType (lesson|practice|quiz|project|bossBattle), estimatedTime (minutes), resources (string array), dependencies (node ids), unlocked (only root nodes true), completed false.
- Include at least one quiz (with quiz array: id, question, options, correctIndex) and one bossBattle (bossBattle.challenge).
- First node(s) with no dependencies must have unlocked true; others unlocked false.
- XP: lesson 40-80, practice 60, quiz 80, project 150, bossBattle 300.
- Output ONLY valid JSON matching the schema.`;

function normalizeNode(raw: Record<string, unknown>, index: number): SkillNode {
  const nodeType = (raw.nodeType as SkillNode["nodeType"]) ?? "lesson";
  return {
    id: String(raw.id ?? `node-${index}`),
    title: String(raw.title ?? "Skill"),
    description: String(raw.description ?? ""),
    xpReward: Number(raw.xpReward) || NODE_TYPE_XP[nodeType] || 50,
    difficulty: (raw.difficulty as SkillNode["difficulty"]) ?? "beginner",
    unlocked: Boolean(raw.unlocked),
    completed: false,
    nodeType,
    estimatedTime: Number(raw.estimatedTime) || 30,
    resources: Array.isArray(raw.resources)
      ? raw.resources.map(String)
      : [],
    dependencies: Array.isArray(raw.dependencies)
      ? raw.dependencies.map(String)
      : [],
    quiz: raw.quiz as SkillNode["quiz"],
    bossBattle: raw.bossBattle as SkillNode["bossBattle"],
  };
}

export async function analyzeGoalWithAI(
  goalId: string,
  rawInput: string,
  context: GoalContext
): Promise<AIGenerationResult> {
  if (!hasOpenAI()) {
    return mockAnalyze(goalId, rawInput, context);
  }

  const client = getOpenAIClient();
  if (!client) return mockAnalyze(goalId, rawInput, context);

  const userPayload = JSON.stringify({
    goal: rawInput,
    context,
    goalId,
  });

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.6,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: `Analyze and respond with JSON: { "needsClarification": boolean, "questions"?: [{ "id", "question", "type", "options"? }], "tree"?: { "title", "nodes": [...] } }\n\n${userPayload}`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Empty AI response");

    const parsed = JSON.parse(text) as {
      needsClarification?: boolean;
      questions?: AIGenerationResult["questions"];
      tree?: { title?: string; nodes?: Record<string, unknown>[] };
    };

    const answered = context.clarificationAnswers
      ? Object.keys(context.clarificationAnswers).length
      : 0;

    if (
      parsed.needsClarification &&
      parsed.questions?.length &&
      answered < 2
    ) {
      return {
        needsClarification: true,
        questions: parsed.questions,
      };
    }

    if (!parsed.tree?.nodes?.length) {
      throw new Error("Invalid tree");
    }

    const nodes = layoutSkillNodes(
      parsed.tree.nodes.map((n, i) => normalizeNode(n, i))
    );

    const tree: SkillTree = {
      id: `tree-${goalId}`,
      goalId,
      title: parsed.tree.title ?? `${rawInput.slice(0, 48)} Skill Tree`,
      nodes,
      createdAt: new Date().toISOString(),
    };

    return { needsClarification: false, tree };
  } catch (e) {
    console.error("[ARC AI]", e);
    return mockAnalyze(goalId, rawInput, context);
  }
}

export async function coachWithAI(
  message: string,
  context?: {
    goal?: string;
    nodeTitle?: string;
    nodeDescription?: string;
    topic?: string;
    graphSummary?: string;
    weakNodes?: string[];
  }
): Promise<string> {
  const { professorTeach } = await import("@/lib/ai/professor-teach");
  try {
    const result = await professorTeach(message, {
      goal: context?.goal,
      topic:
        context?.topic ??
        context?.nodeTitle ??
        context?.goal,
      graphSummary: context?.graphSummary,
      weakNodes: context?.weakNodes,
      mode: "home",
    });
    return result.markdown;
  } catch (err: unknown) {
    const status =
      err && typeof err === "object" && "status" in err
        ? Number((err as { status: number }).status)
        : 0;
    if (status === 429) {
      return "OpenAI quota exceeded. Add billing or credits at platform.openai.com, then restart `npm run dev`.";
    }
    if (status === 401) {
      return "Invalid OpenAI API_KEY in .env.local and restart the dev server.";
    }
    console.error("[ARC Coach]", err);
    return "ARC Professor hit an error. Check your API key and billing, then try again.";
  }
}
