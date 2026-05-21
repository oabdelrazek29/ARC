import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
