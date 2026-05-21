import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SettingsShell } from "@/components/settings/SettingsShell";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      <SettingsShell>{children}</SettingsShell>
    </DashboardShell>
  );
}
