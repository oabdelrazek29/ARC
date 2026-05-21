import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function FilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
