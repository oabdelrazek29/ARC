import { NotesSection } from "@/components/platform/sections/NotesSection";
import { TypewriterLabel } from "@/components/TypewriterLabel";

export default function NotesPage() {
  return (
    <div className="max-w-5xl">
      <TypewriterLabel
        text="§ Notes Workspace · Capture and connect your ideas"
        className="arc-section-marker block"
      />
      <h1 className="arc-section-title mt-4 text-3xl">Notes</h1>
      <p className="arc-body mt-3 mb-8 text-sm">
        Write, organize, and connect ideas with AI summaries and concept linking.
      </p>
      <NotesSection />
    </div>
  );
}
