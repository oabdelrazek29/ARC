import { NODE_TYPE_XP } from "@/constants/arc";
import type {
  AIGenerationResult,
  ClarificationQuestion,
  GoalContext,
  SkillNode,
  SkillTree,
} from "@/types/arc";

const VAGUE_PATTERNS =
  /\b(ai|machine learning|coding|programming|tech|science|math|learn)\b/i;

function needsMoreContext(input: string, context: GoalContext): boolean {
  const words = input.trim().split(/\s+/).length;
  const isVague = words < 6 || VAGUE_PATTERNS.test(input);
  if (!isVague) return false;
  return !context.level || !context.objective || !context.hoursPerWeek;
}

export function getClarificationQuestions(
  _input: string
): ClarificationQuestion[] {
  return [
    {
      id: "level",
      question: "What is your current level?",
      type: "select",
      options: ["beginner", "intermediate", "advanced"],
    },
    {
      id: "objective",
      question: "What is your primary goal?",
      type: "select",
      options: [
        "Get a job",
        "Build a project",
        "Research / academics",
        "General knowledge",
      ],
    },
    {
      id: "hoursPerWeek",
      question: "How many hours per week can you dedicate?",
      type: "number",
    },
    {
      id: "preference",
      question: "Do you prefer projects or theory?",
      type: "select",
      options: ["projects", "theory", "balanced"],
    },
  ];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

function buildNode(
  partial: Omit<SkillNode, "unlocked" | "completed" | "xpReward"> & {
    xpReward?: number;
    unlocked?: boolean;
    completed?: boolean;
  },
  index: number
): SkillNode {
  const xp =
    partial.xpReward ?? NODE_TYPE_XP[partial.nodeType] ?? 50;
  return {
    ...partial,
    xpReward: xp,
    unlocked: partial.unlocked ?? false,
    completed: partial.completed ?? false,
    position: partial.position ?? {
      x: (index % 4) * 220,
      y: Math.floor(index / 4) * 140,
    },
  };
}

export function generateSkillTree(
  goalId: string,
  title: string,
  context: GoalContext
): SkillTree {
  const base = slugify(title) || "goal";
  const level = context.level ?? "beginner";

  const nodes: SkillNode[] = [
    buildNode(
      {
        id: `${base}-foundation`,
        title: "Core Foundations",
        description: `Establish essential ${title} fundamentals for a ${level} learner.`,
        difficulty: "beginner",
        nodeType: "lesson",
        estimatedTime: 45,
        resources: ["Concept map", "Starter reading"],
        dependencies: [],
        unlocked: true,
      },
      0
    ),
    buildNode(
      {
        id: `${base}-practice-1`,
        title: "Guided Practice",
        description: "Apply foundations through structured exercises.",
        difficulty: "beginner",
        nodeType: "practice",
        estimatedTime: 60,
        resources: ["Exercise set"],
        dependencies: [`${base}-foundation`],
      },
      1
    ),
    buildNode(
      {
        id: `${base}-quiz-1`,
        title: "Knowledge Check",
        description: "Validate understanding before advancing.",
        difficulty: "intermediate",
        nodeType: "quiz",
        estimatedTime: 20,
        resources: [],
        dependencies: [`${base}-practice-1`],
        quiz: [
          {
            id: "q1",
            question: "Which step comes first in mastering a new skill?",
            options: [
              "Jump to advanced topics",
              "Build foundations",
              "Skip practice",
              "Ignore feedback",
            ],
            correctIndex: 1,
          },
        ],
      },
      2
    ),
    buildNode(
      {
        id: `${base}-intermediate`,
        title: "Intermediate Layer",
        description: "Deepen skills with real-world patterns and workflows.",
        difficulty: "intermediate",
        nodeType: "lesson",
        estimatedTime: 50,
        resources: ["Case studies"],
        dependencies: [`${base}-quiz-1`],
      },
      3
    ),
    buildNode(
      {
        id: `${base}-project`,
        title: "Capstone Project",
        description: `Ship a ${context.preference === "theory" ? "research" : "hands-on"} project demonstrating mastery.`,
        difficulty: "advanced",
        nodeType: "project",
        estimatedTime: 180,
        resources: ["Project brief", "Rubric"],
        dependencies: [`${base}-intermediate`],
      },
      4
    ),
    buildNode(
      {
        id: `${base}-boss`,
        title: "Mastery Boss Battle",
        description: "Final challenge — prove end-to-end mastery of your goal.",
        difficulty: "advanced",
        nodeType: "bossBattle",
        estimatedTime: 90,
        resources: [],
        dependencies: [`${base}-project`],
        bossBattle: {
          challenge: `Design and defend a complete solution for: ${title}`,
        },
      },
      5
    ),
  ];

  return {
    id: `tree-${goalId}`,
    goalId,
    title: `${title} Skill Tree`,
    nodes,
    createdAt: new Date().toISOString(),
  };
}

/** Debounced entry — call once per goal after context is ready. */
export async function analyzeAndGenerate(
  goalId: string,
  rawInput: string,
  context: GoalContext
): Promise<AIGenerationResult> {
  await new Promise((r) => setTimeout(r, 600));

  if (needsMoreContext(rawInput, context)) {
    return {
      needsClarification: true,
      questions: getClarificationQuestions(rawInput),
    };
  }

  const title =
    rawInput.length > 60 ? `${rawInput.slice(0, 57)}...` : rawInput;

  return {
    needsClarification: false,
    tree: generateSkillTree(goalId, title, context),
  };
}
