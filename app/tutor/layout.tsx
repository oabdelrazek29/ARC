import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
