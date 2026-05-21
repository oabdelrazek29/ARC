import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
