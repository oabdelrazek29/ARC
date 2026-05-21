/** Instructor Master — adaptive teaching context (all subjects) */

import type { TeachingPayload } from "@/lib/ai/teaching-format";

export type WorkspaceMode = "focus" | "split" | "teaching";

export type InstructorTab =
  | "overview"
  | "lesson"
  | "practice"
  | "plan"
  | "connect";

export interface LearningWeakness {
  id: string;
  concept: string;
  subject?: string;
  detectedAt: string;
  severity: "low" | "medium" | "high";
  note?: string;
}

export interface InstructorMemory {
  strengths: string[];
  weaknesses: LearningWeakness[];
  learningStyle?: string;
  pacing?: "slow" | "balanced" | "fast";
  preferredTeaching?: string;
  lastTopics: string[];
}

export interface InstructorSession {
  topic?: string;
  goal?: string;
  courseId?: string;
  lessonId?: string;
  nodeTitle?: string;
  graphId?: string;
}

export type InstructorMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  teaching?: TeachingPayload;
};

export const INSTRUCTOR_TAB_LABELS: Record<InstructorTab, string> = {
  overview: "Mission",
  lesson: "Teach",
  practice: "Practice",
  plan: "Roadmap",
  connect: "Graph",
};
