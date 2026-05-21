"use client";

import { useCallback, useState } from "react";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { useInstructorStore } from "@/store/instructor-store";
import { usePlatformStore } from "@/store/platform-store";

const STARTER = `# Practice any language — Instructor explains bugs inline
def greet(name):
    return f"Hello, {name}"

print(greet("ARC"))
`;

export function CodeLabSection() {
  const recordEvent = usePlatformStore((s) => s.recordEvent);
  const setTab = useInstructorStore((s) => s.setTab);

  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = useCallback(() => {
    setOutput(
      "Live execution sandbox (browser-safe preview).\n" +
        "Full Replit-style runner ships next — use Explain for AI debugging now.\n\n" +
        `Lines: ${code.split("\n").length}`
    );
  }, [code]);

  const explain = useCallback(async () => {
    setLoading(true);
    setTab("lesson");
    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Explain this code, find bugs, and teach improvements:\n\`\`\`\n${code}\n\`\`\``,
          mode: "instructor",
        }),
      });
      const data = (await res.json()) as { reply?: string };
      setOutput(data.reply ?? "No response");
      recordEvent(
        "study_session",
        "Code lab",
        "AI code review completed",
        "code"
      );
    } catch {
      recordEvent(
        "code_error",
        "Code lab",
        "Could not reach AI — check API key",
        "code"
      );
    } finally {
      setLoading(false);
    }
  }, [code, recordEvent, setTab]);

  const reportBug = useCallback(() => {
    recordEvent(
      "concept_struggle",
      "Debugging",
      "Requested help on code implementation",
      "code"
    );
    setTab("lesson");
    void explain();
  }, [recordEvent, setTab, explain]);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Code lab"
        title="Coding workspace"
        lead="Cursor-style AI explanations, debugging, and project walkthroughs — connected to your courses and dashboard."
      />

      <div className="arc-code-lab mt-8">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="arc-code-lab__editor"
          spellCheck={false}
        />
        <div className="arc-code-lab__toolbar">
          <ArcButton onClick={run}>Run preview</ArcButton>
          <ArcButton variant="ghost" onClick={() => void explain()} disabled={loading}>
            {loading ? "Explaining…" : "AI explain + debug"}
          </ArcButton>
          <ArcButton variant="ghost" onClick={reportBug}>
            I&apos;m stuck
          </ArcButton>
        </div>
        <pre className="arc-code-lab__output">{output || "Output appears here"}</pre>
      </div>
    </div>
  );
}
