export type NodeType =
  | "lesson"
  | "practice"
  | "quiz"
  | "project"
  | "bossBattle";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface BossBattle {
  challenge: string;
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: Difficulty;
  unlocked: boolean;
  completed: boolean;
  nodeType: NodeType;
  estimatedTime: number;
  resources: string[];
  quiz?: QuizQuestion[];
  bossBattle?: BossBattle;
  dependencies: string[];
  position?: { x: number; y: number };
}

export interface SkillTree {
  id: string;
  goalId: string;
  title: string;
  nodes: SkillNode[];
  createdAt: string;
}

export interface GoalContext {
  level?: "beginner" | "intermediate" | "advanced";
  objective?: string;
  hoursPerWeek?: number;
  preference?: "projects" | "theory" | "balanced";
}

export interface Goal {
  id: string;
  rawInput: string;
  title: string;
  context: GoalContext;
  contextComplete: boolean;
  treeId?: string;
  createdAt: string;
}

export interface UserProgress {
  totalXp: number;
  level: number;
  streak: number;
  completedNodeIds: string[];
  achievements: string[];
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  options?: string[];
  type: "select" | "text" | "number";
}

export interface AIGenerationResult {
  needsClarification: boolean;
  questions?: ClarificationQuestion[];
  tree?: SkillTree;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  xp: number;
  streak: number;
}
