import type { Metadata } from "next";

import { CognitiveNav } from "@/components/cognitive/CognitiveNav";
import { CognitiveStoreHydration } from "@/components/cognitive/CognitiveStoreHydration";

import "./cognitive.css";

export const metadata: Metadata = {
  title: "Cognitive OS",
  description:
    "ARC Cognitive Learning Operating System — adaptive mental model graphs, AI advisor, and drift tracking.",
};

export default function CognitiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="arc-cognitive-wrap arc-dot-grid">
      <div className="arc-section-wide !max-w-[1200px] py-8">
        <CognitiveNav />
        <CognitiveStoreHydration>{children}</CognitiveStoreHydration>
      </div>
    </div>
  );
}
