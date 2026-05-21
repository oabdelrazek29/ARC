export type DashboardNavItem = {
  href: string;
  label: string;
};

/** Clarity-style app sidebar (160px) */
export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses", label: "Courses" },
  { href: "/notes", label: "Notes" },
  { href: "/files", label: "Files & Lectures" },
  { href: "/tutor", label: "AI Tutor" },
  { href: "/settings", label: "Settings" },
];
