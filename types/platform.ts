/** Connected learning OS — events sync dashboard, instructor, courses, graph */

export type PlatformSection =
  | "dashboard"
  | "courses"
  | "tutor"
  | "notes"
  | "files"
  | "lectures"
  | "code"
  | "analytics"
  | "graph"
  | "planner"
  | "cognitive";

export type LearningEventType =
  | "lesson_complete"
  | "quiz_fail"
  | "quiz_pass"
  | "concept_struggle"
  | "file_analyzed"
  | "lecture_processed"
  | "note_created"
  | "code_error"
  | "project_progress"
  | "study_session"
  | "weakness_detected";

export interface LearningEvent {
  id: string;
  type: LearningEventType;
  concept: string;
  message: string;
  section: PlatformSection;
  createdAt: string;
  metadata?: Record<string, string>;
}

export interface PlatformNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  linkedConcepts: string[];
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformFile {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  excerpt: string;
  analysis?: string;
  concepts: string[];
  createdAt: string;
}

export interface PlatformLecture {
  id: string;
  title: string;
  sourceUrl?: string;
  transcript?: string;
  chapters?: { time: string; title: string; summary: string }[];
  concepts: string[];
  summary?: string;
  createdAt: string;
}

export interface PlannerTask {
  id: string;
  title: string;
  when: string;
  durationMinutes: number;
  done: boolean;
  source: "ai" | "user";
  linkedConcept?: string;
}

export interface FocusSession {
  id: string;
  section: PlatformSection;
  minutes: number;
  startedAt: string;
}

export interface PlatformContext {
  section: PlatformSection;
  courseId?: string;
  lessonId?: string;
  graphId?: string;
  noteId?: string;
  fileId?: string;
  lectureId?: string;
}
