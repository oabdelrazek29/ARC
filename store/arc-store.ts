"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { XP_PER_LEVEL } from "@/constants/arc";
import { usePlatformStore } from "@/store/platform-store";
import type { Goal, SkillTree, UserProgress } from "@/types/arc";

function levelFromXp(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

interface ArcState {
  goals: Goal[];
  trees: Record<string, SkillTree>;
  progress: UserProgress;
  activeGoalId: string | null;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, patch: Partial<Goal>) => void;
  setTree: (tree: SkillTree) => void;
  setActiveGoal: (id: string | null) => void;
  completeNode: (
    nodeId: string,
    xp: number,
    nodeTitle?: string,
    treeId?: string,
    goalTitle?: string
  ) => void;
  unlockDependentNodes: (treeId: string, completedId: string) => void;
}

const defaultProgress: UserProgress = {
  totalXp: 0,
  level: 1,
  streak: 1,
  completedNodeIds: [],
  achievements: [],
};

export const useArcStore = create<ArcState>()(
  persist(
    (set, get) => ({
      goals: [],
      trees: {},
      progress: defaultProgress,
      activeGoalId: null,

      addGoal: (goal) =>
        set((s) => ({ goals: [goal, ...s.goals], activeGoalId: goal.id })),

      updateGoal: (id, patch) =>
        set((s) => ({
          goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
        })),

      setTree: (tree) =>
        set((s) => ({
          trees: { ...s.trees, [tree.id]: tree },
          goals: s.goals.map((g) =>
            g.id === tree.goalId ? { ...g, treeId: tree.id, contextComplete: true } : g
          ),
        })),

      setActiveGoal: (id) => set({ activeGoalId: id }),

      completeNode: (nodeId, xp, nodeTitle, treeId, goalTitle) => {
        const state = get();
        if (state.progress.completedNodeIds.includes(nodeId)) return;

        set((s) => {
          const totalXp = s.progress.totalXp + xp;
          const achievements = [...s.progress.achievements];
          if (!achievements.includes("first-node")) {
            achievements.push("first-node");
          }
          return {
            progress: {
              ...s.progress,
              totalXp,
              level: levelFromXp(totalXp),
              completedNodeIds: [...s.progress.completedNodeIds, nodeId],
              achievements,
            },
          };
        });

        const meta: Record<string, string> = {};
        if (goalTitle) meta.goal = goalTitle;
        if (treeId) meta.treeId = treeId;

        usePlatformStore.getState().recordEvent(
          "lesson_complete",
          nodeTitle ?? nodeId,
          `Lesson completed (+${xp} XP) — synced to dashboard & instructor`,
          "courses",
          Object.keys(meta).length ? meta : undefined
        );
        if (treeId) {
          usePlatformStore.getState().setContext({
            section: "courses",
            courseId: treeId,
            lessonId: nodeId,
          });
        }
      },

      unlockDependentNodes: (treeId, completedId) => {
        set((s) => {
          const tree = s.trees[treeId];
          if (!tree) return s;
          const completedIds = new Set([
            ...s.progress.completedNodeIds,
            completedId,
          ]);
          const nodes = tree.nodes.map((n) => {
            const isDone = n.id === completedId ? true : n.completed;
            const depsMet =
              n.dependencies.length === 0 ||
              n.dependencies.every((d) => completedIds.has(d));
            return {
              ...n,
              completed: isDone,
              unlocked: n.unlocked || depsMet || isDone,
            };
          });
          return { trees: { ...s.trees, [treeId]: { ...tree, nodes } } };
        });
      },
    }),
    { name: "arc-storage" }
  )
);
