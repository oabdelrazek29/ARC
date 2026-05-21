import { GoalWizard } from "@/components/arc/GoalWizard";
import { IntegrationStatusPanel } from "@/components/lms/IntegrationStatusPanel";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";

export default function CreateCoursePage() {
  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Create"
        title="Build a new course"
        lead="AI generates chapters, lessons, quizzes, and projects — any subject."
      />
      <div className="mt-8">
        <GoalWizard />
      </div>
      <IntegrationStatusPanel />
    </div>
  );
}
