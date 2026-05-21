import type { PlatformSection } from "@/types/platform";

export type LearnNavItem = {
  href: string;
  label: string;
  section: PlatformSection;
  description: string;
};

export const learnNavItems: LearnNavItem[] = [
  {
    href: "/learn",
    label: "Mission control",
    section: "dashboard",
    description: "Overview across all systems",
  },
  {
    href: "/learn/courses",
    label: "Courses",
    section: "courses",
    description: "Browse & search courses",
  },
  {
    href: "/learn/create",
    label: "Create course",
    section: "courses",
    description: "AI-generated learning path",
  },
  {
    href: "/learn/teacher",
    label: "Teacher",
    section: "courses",
    description: "Manage your courses",
  },
  {
    href: "/learn/tutor",
    label: "Instructor",
    section: "tutor",
    description: "AI professor & strategist",
  },
  {
    href: "/learn/notes",
    label: "Notes",
    section: "notes",
    description: "Linked knowledge workspace",
  },
  {
    href: "/learn/files",
    label: "Files",
    section: "files",
    description: "PDFs, papers, uploads",
  },
  {
    href: "/learn/lectures",
    label: "Lectures",
    section: "lectures",
    description: "Video & transcript intelligence",
  },
  {
    href: "/learn/code",
    label: "Code lab",
    section: "code",
    description: "Practice & AI debugging",
  },
  {
    href: "/learn/analytics",
    label: "Analytics",
    section: "analytics",
    description: "Mastery & focus patterns",
  },
  {
    href: "/learn/graph",
    label: "Knowledge graph",
    section: "graph",
    description: "Concept connections",
  },
  {
    href: "/learn/planner",
    label: "Planner",
    section: "planner",
    description: "Adaptive study schedule",
  },
];
