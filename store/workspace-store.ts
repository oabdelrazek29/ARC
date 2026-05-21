"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WorkspaceMode } from "@/types/instructor";

interface WorkspaceState {
  mode: WorkspaceMode;
  instructorOpen: boolean;
  setMode: (mode: WorkspaceMode) => void;
  cycleMode: () => void;
  setInstructorOpen: (open: boolean) => void;
}

const MODES: WorkspaceMode[] = ["focus", "split", "teaching"];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      mode: "focus",
      instructorOpen: false,

      setMode: (mode) =>
        set({
          mode,
          instructorOpen: mode !== "focus",
        }),

      cycleMode: () => {
        const idx = MODES.indexOf(get().mode);
        const next = MODES[(idx + 1) % MODES.length];
        set({
          mode: next,
          instructorOpen: next !== "focus",
        });
      },

      setInstructorOpen: (open) =>
        set({
          instructorOpen: open,
          mode: open ? (get().mode === "focus" ? "split" : get().mode) : "focus",
        }),
    }),
    { name: "arc-workspace" }
  )
);
