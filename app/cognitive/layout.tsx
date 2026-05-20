import type { Metadata } from "next";

import { CognitiveNav } from "@/components/cognitive/CognitiveNav";
import { CognitiveStoreHydration } from "@/components/cognitive/CognitiveStoreHydration";

import "./cognitive.css";

export const metadata: Metadata = {
  title: "Cognitive OS | ARC",
  description:
    "ARC Cognitive Learning Operating System — adaptive mental model graphs, AI advisor, and drift tracking.",
};

export default function CognitiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="arc-cognitive-bg min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <CognitiveNav />
        <CognitiveStoreHydration>{children}</CognitiveStoreHydration>
      </div>
    </div>
  );
}
