/** Structured coursework — subject-agnostic (coding, math, languages, etc.) */

import type { NodeType, QuizQuestion } from "@/types/arc";

export type LessonContentType =
  | "reading"
  | "video"
  | "interactive"
  | "coding"
  | "practice"
  | "quiz"
  | "project"
  | "checkpoint"
  | "exam";

export interface CourseLesson {
  id: string;
  moduleId: string;
  /** Chapter id (same as moduleId — NextLMS parity) */
  chapterId: string;
  title: string;
  description: string;
  contentType: LessonContentType;
  nodeType?: NodeType;
  estimatedMinutes: number;
  xpReward: number;
  completed: boolean;
  unlocked: boolean;
  resources: string[];
  videoUrl?: string;
  isFree?: boolean;
  position: number;
  quiz?: QuizQuestion[];
  skillNodeId?: string;
}

/** Alias: NextLMS "Chapter" = ARC module */
export type CourseChapter = CourseModule;

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
  masteryPercent: number;
  checkpointLabel?: string;
}

export interface CoursePhase {
  id: string;
  title: string;
  order: number;
  modules: CourseModule[];
  estimatedWeeks?: number;
}

export interface Course {
  id: string;
  goalId: string;
  treeId: string;
  title: string;
  subject?: string;
  description: string;
  phases: CoursePhase[];
  masteryPercent: number;
  totalXp: number;
  earnedXp: number;
  estimatedHours: number;
  currentLessonId?: string;
  createdAt: string;
}

export type StudyModeId =
  | "deepFocus"
  | "recall"
  | "examCrunch"
  | "conceptRecovery"
  | "projectBuilder";

export const STUDY_MODE_LABELS: Record<StudyModeId, string> = {
  deepFocus: "Deep Focus",
  recall: "Recall Training",
  examCrunch: "Exam Crunch",
  conceptRecovery: "Concept Recovery",
  projectBuilder: "Project Builder",
};
