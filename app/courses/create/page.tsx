import { GoalWizard } from "@/components/arc/GoalWizard";
import { TypewriterLabel } from "@/components/TypewriterLabel";

export default function CreateCoursePage() {
  return (
    <div className="max-w-2xl">
      <TypewriterLabel
        text="§ Create a course · AI curriculum · Edition MMXXVI"
        className="arc-section-marker block"
        delay={200}
        speed={22}
      />
      <h1 className="arc-section-title mt-4 text-3xl">Build a new course</h1>
      <p className="arc-body mt-3 text-sm">
        Tell ARC what you want to learn. It generates modules, lessons, quizzes,
        and projects — any subject.
      </p>
      <div className="mt-8">
        <GoalWizard />
      </div>
    </div>
  );
}
