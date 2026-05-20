import type { LeaderboardEntry } from "@/types/arc";

export const XP_PER_LEVEL = 500;

export const NODE_TYPE_LABELS = {
  lesson: "Lesson",
  practice: "Practice",
  quiz: "Quiz",
  project: "Project",
  bossBattle: "Boss Battle",
} as const;

export const NODE_TYPE_XP = {
  lesson: 40,
  practice: 60,
  quiz: 80,
  project: 150,
  bossBattle: 300,
} as const;

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: "1", name: "Nova", level: 24, xp: 11840, streak: 12 },
  { id: "2", name: "Kai", level: 21, xp: 10200, streak: 8 },
  { id: "3", name: "Mira", level: 19, xp: 9400, streak: 15 },
  { id: "4", name: "You", level: 1, xp: 0, streak: 0 },
  { id: "5", name: "Echo", level: 17, xp: 8100, streak: 5 },
];

export const ACHIEVEMENTS = [
  { id: "first-node", title: "First Step", desc: "Complete your first skill node" },
  { id: "streak-3", title: "On Fire", desc: "3-day learning streak" },
  { id: "boss-slayer", title: "Boss Slayer", desc: "Win your first boss battle" },
  { id: "tree-complete", title: "Path Master", desc: "Complete an entire skill tree" },
];
