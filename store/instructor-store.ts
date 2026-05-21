"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  InstructorMemory,
  InstructorSession,
  InstructorTab,
  LearningWeakness,
} from "@/types/instructor";

interface InstructorState {
  activeTab: InstructorTab;
  memory: InstructorMemory;
  session: InstructorSession;
  setTab: (tab: InstructorTab) => void;
  setSession: (patch: Partial<InstructorSession>) => void;
  recordTopic: (topic: string) => void;
  addWeakness: (w: Omit<LearningWeakness, "id" | "detectedAt">) => void;
  addStrength: (concept: string) => void;
}

const defaultMemory: InstructorMemory = {
  strengths: [],
  weaknesses: [],
  lastTopics: [],
  pacing: "balanced",
};

export const useInstructorStore = create<InstructorState>()(
  persist(
    (set) => ({
      activeTab: "overview",
      memory: defaultMemory,
      session: {},

      setTab: (tab) => set({ activeTab: tab }),

      setSession: (patch) =>
        set((s) => ({ session: { ...s.session, ...patch } })),

      recordTopic: (topic) =>
        set((s) => {
          const trimmed = topic.trim().slice(0, 120);
          if (!trimmed) return s;
          const lastTopics = [
            trimmed,
            ...s.memory.lastTopics.filter((t) => t !== trimmed),
          ].slice(0, 12);
          return { memory: { ...s.memory, lastTopics } };
        }),

      addWeakness: (w) =>
        set((s) => ({
          memory: {
            ...s.memory,
            weaknesses: [
              {
                ...w,
                id: `w-${Date.now()}`,
                detectedAt: new Date().toISOString(),
              },
              ...s.memory.weaknesses,
            ].slice(0, 24),
          },
        })),

      addStrength: (concept) =>
        set((s) => {
          const c = concept.trim();
          if (!c || s.memory.strengths.includes(c)) return s;
          return {
            memory: {
              ...s.memory,
              strengths: [c, ...s.memory.strengths].slice(0, 24),
            },
          };
        }),
    }),
    { name: "arc-instructor" }
  )
);
