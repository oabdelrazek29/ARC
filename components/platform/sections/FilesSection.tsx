"use client";

import { useCallback, useState } from "react";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { useInstructorStore } from "@/store/instructor-store";
import { usePlatformStore } from "@/store/platform-store";

export function FilesSection() {
  const files = usePlatformStore((s) => s.files);
  const addFile = usePlatformStore((s) => s.addFile);
  const updateFile = usePlatformStore((s) => s.updateFile);
  const recordEvent = usePlatformStore((s) => s.recordEvent);
  const setTab = useInstructorStore((s) => s.setTab);

  const [loading, setLoading] = useState(false);

  const onUpload = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList?.length) return;
      const file = fileList[0];
      const text =
        file.type.startsWith("text/") || file.name.endsWith(".md")
          ? await file.text()
          : `[Binary file: ${file.name} — paste text content in Notes for full AI analysis]`;

      const id = addFile({
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        excerpt: text.slice(0, 500),
        concepts: [],
      });

      setLoading(true);
      setTab("lesson");
      try {
        const res = await fetch("/api/ai/analyze-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: text.slice(0, 12000),
            title: file.name,
            kind: "file",
          }),
        });
        const data = (await res.json()) as {
          reply?: string;
          payload?: { summary?: string; weaknessesDetected?: string[] };
        };
        updateFile(id, {
          analysis: data.reply ?? data.payload?.summary,
          concepts: data.payload?.weaknessesDetected ?? [],
        });
        recordEvent(
          "file_analyzed",
          file.name,
          "File analyzed — lessons and quizzes synced to Instructor",
          "files"
        );
        setTab("practice");
      } finally {
        setLoading(false);
      }
    },
    [addFile, updateFile, recordEvent, setTab]
  );

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Files"
        title="Educational file intelligence"
        lead="Upload PDFs, papers, slides, code, or text — AI builds lessons, flashcards, and weak-point drills."
      />

      <div className="arc-card mt-8 border-dashed p-8 text-center">
        <input
          type="file"
          accept=".pdf,.txt,.md,.doc,.docx,.json,.py,.js,.ts,.csv"
          className="mx-auto block text-sm"
          onChange={(e) => void onUpload(e.target.files)}
          disabled={loading}
        />
        <p className="arc-mono mt-4 text-[10px] text-[var(--arc-muted)]">
          {loading ? "Analyzing with Instructor Master…" : "Drag or select a file"}
        </p>
      </div>

      <ul className="mt-8 space-y-3">
        {files.map((f) => (
          <li key={f.id} className="arc-card p-4">
            <p className="font-medium">{f.name}</p>
            <p className="arc-mono mt-1 text-[10px] text-[var(--arc-muted)]">
              {(f.size / 1024).toFixed(1)} KB
            </p>
            {f.analysis && (
              <p className="mt-3 text-sm text-[var(--arc-muted)] line-clamp-4">
                {f.analysis.slice(0, 400)}…
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
