import { TutorSection } from "@/components/platform/sections/TutorSection";
import { TypewriterLabel } from "@/components/TypewriterLabel";

export default function TutorPage() {
  return (
    <div className="max-w-3xl">
      <TypewriterLabel
        text="§ Instructor — Your connected AI tutor · Edition MMXXVI"
        className="arc-section-marker block"
      />
      <h1 className="arc-section-title mt-4 text-3xl">AI Tutor</h1>
      <p className="arc-body mt-3 mb-8 text-sm">
        Ask anything about your courses, lessons, and notes — full-height chat,
        not a corner widget.
      </p>
      <TutorSection />
    </div>
  );
}
