import { FilesSection } from "@/components/platform/sections/FilesSection";
import { TypewriterLabel } from "@/components/TypewriterLabel";

export default function FilesPage() {
  return (
    <div className="max-w-4xl">
      <TypewriterLabel
        text="§ Files and Lectures · Turn material into study tools"
        className="arc-section-marker block"
      />
      <h1 className="arc-section-title mt-4 text-3xl">Files &amp; Lectures</h1>
      <p className="arc-body mt-3 mb-8 text-sm">
        Upload PDFs, videos, and slides — summaries, quizzes, and study guides on demand.
      </p>
      <FilesSection />
    </div>
  );
}
