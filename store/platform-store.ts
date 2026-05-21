"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useInstructorStore } from "@/store/instructor-store";
import type { StudyModeId } from "@/types/course";
import type {
  FocusSession,
  LearningEvent,
  LearningEventType,
  PlatformContext,
  PlatformFile,
  PlatformLecture,
  PlatformNote,
  PlatformSection,
  PlannerTask,
} from "@/types/platform";

function syncInstructorFromEvent(event: LearningEvent) {
  const instructor = useInstructorStore.getState();
  instructor.recordTopic(event.concept);

  if (
    event.type === "quiz_fail" ||
    event.type === "concept_struggle" ||
    event.type === "code_error" ||
    event.type === "weakness_detected"
  ) {
    instructor.addWeakness({
      concept: event.concept,
      severity:
        event.type === "quiz_fail" || event.type === "code_error"
          ? "high"
          : "medium",
      note: event.message,
      subject: event.metadata?.subject,
    });
  }

  if (event.type === "quiz_pass" || event.type === "lesson_complete") {
    instructor.addStrength(event.concept);
  }

  instructor.setSession({
    topic: event.concept,
    goal: event.metadata?.goal,
  });
}

interface PlatformState {
  context: PlatformContext;
  studyMode: StudyModeId;
  events: LearningEvent[];
  notes: PlatformNote[];
  files: PlatformFile[];
  lectures: PlatformLecture[];
  plannerTasks: PlannerTask[];
  focusSessions: FocusSession[];
  retentionScore: number;

  setSection: (section: PlatformSection) => void;
  setContext: (patch: Partial<PlatformContext>) => void;
  setStudyMode: (mode: StudyModeId) => void;
  recordEvent: (
    type: LearningEventType,
    concept: string,
    message: string,
    section?: PlatformSection,
    metadata?: Record<string, string>
  ) => void;
  addNote: (note: Omit<PlatformNote, "id" | "createdAt" | "updatedAt">) => string;
  updateNote: (id: string, patch: Partial<PlatformNote>) => void;
  addFile: (file: Omit<PlatformFile, "id" | "createdAt">) => string;
  updateFile: (id: string, patch: Partial<PlatformFile>) => void;
  addLecture: (lecture: Omit<PlatformLecture, "id" | "createdAt">) => string;
  updateLecture: (id: string, patch: Partial<PlatformLecture>) => void;
  addPlannerTasks: (tasks: Omit<PlannerTask, "id">[]) => void;
  togglePlannerTask: (id: string) => void;
  logFocusSession: (section: PlatformSection, minutes: number) => void;
}

export const usePlatformStore = create<PlatformState>()(
  persist(
    (set, get) => ({
      context: { section: "dashboard" },
      studyMode: "deepFocus",
      events: [],
      notes: [],
      files: [],
      lectures: [],
      plannerTasks: [],
      focusSessions: [],
      retentionScore: 72,

      setSection: (section) =>
        set((s) => ({ context: { ...s.context, section } })),

      setContext: (patch) =>
        set((s) => ({ context: { ...s.context, ...patch } })),

      setStudyMode: (mode) => set({ studyMode: mode }),

      recordEvent: (type, concept, message, section, metadata) => {
        const event: LearningEvent = {
          id: `ev-${Date.now()}`,
          type,
          concept,
          message,
          section: section ?? get().context.section,
          createdAt: new Date().toISOString(),
          metadata,
        };
        set((s) => ({
          events: [event, ...s.events].slice(0, 80),
          retentionScore: Math.min(
            99,
            Math.max(
              40,
              s.retentionScore +
                (type === "quiz_pass" || type === "lesson_complete" ? 2 : -3)
            )
          ),
        }));
        syncInstructorFromEvent(event);
      },

      addNote: (note) => {
        const id = `note-${Date.now()}`;
        const now = new Date().toISOString();
        set((s) => ({
          notes: [
            {
              ...note,
              id,
              createdAt: now,
              updatedAt: now,
            },
            ...s.notes,
          ],
        }));
        get().recordEvent(
          "note_created",
          note.title,
          "New note added to knowledge base",
          "notes"
        );
        return id;
      },

      updateNote: (id, patch) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id
              ? { ...n, ...patch, updatedAt: new Date().toISOString() }
              : n
          ),
        })),

      addFile: (file) => {
        const id = `file-${Date.now()}`;
        set((s) => ({
          files: [{ ...file, id, createdAt: new Date().toISOString() }, ...s.files],
        }));
        return id;
      },

      updateFile: (id, patch) =>
        set((s) => ({
          files: s.files.map((f) => (f.id === id ? { ...f, ...patch } : f)),
        })),

      addLecture: (lecture) => {
        const id = `lec-${Date.now()}`;
        set((s) => ({
          lectures: [
            { ...lecture, id, createdAt: new Date().toISOString() },
            ...s.lectures,
          ],
        }));
        return id;
      },

      updateLecture: (id, patch) =>
        set((s) => ({
          lectures: s.lectures.map((l) =>
            l.id === id ? { ...l, ...patch } : l
          ),
        })),

      addPlannerTasks: (tasks) =>
        set((s) => ({
          plannerTasks: [
            ...tasks.map((t, i) => ({ ...t, id: `plan-${Date.now()}-${i}` })),
            ...s.plannerTasks,
          ].slice(0, 40),
        })),

      togglePlannerTask: (id) =>
        set((s) => ({
          plannerTasks: s.plannerTasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),

      logFocusSession: (section, minutes) =>
        set((s) => ({
          focusSessions: [
            {
              id: `focus-${Date.now()}`,
              section,
              minutes,
              startedAt: new Date().toISOString(),
            },
            ...s.focusSessions,
          ].slice(0, 30),
        })),
    }),
    { name: "arc-platform" }
  )
);
