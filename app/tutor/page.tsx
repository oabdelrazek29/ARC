"use client";

import { AiTutorPanel } from "@/components/tutor/AiTutorPanel";
import { TutorReasonsSection } from "@/components/tutor/TutorReasonsSection";
import { TypewriterLabel } from "@/components/TypewriterLabel";

import "@/components/tutor/tutor.css";

export default function TutorPage() {
  return (
    <div className="arc-tutor-page">
      <TypewriterLabel
        text="§ Instructor — Your connected AI tutor · Edition MMXXVI"
        className="arc-section-marker block"
      />
      <h1 className="arc-section-title mt-3 text-2xl md:text-3xl">
        AI Tutor
      </h1>
      <p className="arc-body mt-2 mb-6 text-sm text-[var(--arc-muted)]">
        A focused study session — not a chatbot in the corner. Ask, attach files
        or photos, and get structured teaching every time.
      </p>

      <AiTutorPanel />

      <TutorReasonsSection showHeader />
    </div>
  );
}
