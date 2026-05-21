"use client";

import { useCallback, useState } from "react";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { useInstructorStore } from "@/store/instructor-store";
import { usePlatformStore } from "@/store/platform-store";

export function LecturesSection() {
  const lectures = usePlatformStore((s) => s.lectures);
  const addLecture = usePlatformStore((s) => s.addLecture);
  const updateLecture = usePlatformStore((s) => s.updateLecture);
  const recordEvent = usePlatformStore((s) => s.recordEvent);
  const setTab = useInstructorStore((s) => s.setTab);

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = lectures.find((l) => l.id === activeId);

  const process = useCallback(async () => {
    const content = transcript.trim() || `YouTube or lecture: ${url}\nTitle: ${title}`;
    if (!content.trim()) return;
    setLoading(true);
    setTab("lesson");

    const id = addLecture({
      title: title || "Lecture",
      sourceUrl: url || undefined,
      concepts: [],
    });

    try {
      const res = await fetch("/api/ai/analyze-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          title: title || "Lecture",
          kind: "lecture",
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        payload?: {
          summary?: string;
          lessonSteps?: { title: string; detail: string }[];
        };
      };
      const chapters =
        data.payload?.lessonSteps?.map((s, i) => ({
          time: `${i * 5}:00`,
          title: s.title,
          summary: s.detail.slice(0, 120),
        })) ?? [];

      updateLecture(id, {
        summary: data.payload?.summary ?? data.reply?.slice(0, 500),
        transcript: transcript || undefined,
        chapters,
        concepts: chapters.map((c) => c.title),
      });
      setActiveId(id);
      recordEvent(
        "lecture_processed",
        title || "Lecture",
        "Transcript analyzed — quizzes synced platform-wide",
        "lectures"
      );
      setTab("practice");
    } finally {
      setLoading(false);
    }
  }, [
    transcript,
    url,
    title,
    addLecture,
    updateLecture,
    recordEvent,
    setTab,
  ]);

  const embedId = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
  )?.[1];

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Lectures"
        title="Video & lecture intelligence"
        lead="Paste YouTube links or transcripts — auto chapters, quizzes, and exam-topic prediction."
      />

      <div className="arc-platform-split-content mt-8">
        <div className="flex-1 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Lecture title"
            className="arc-advisor-input w-full"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="YouTube URL"
            className="arc-advisor-input w-full"
          />
          {embedId && (
            <div className="aspect-video w-full border border-[var(--arc-border)]">
              <iframe
                title="Lecture player"
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${embedId}`}
                allowFullScreen
              />
            </div>
          )}
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste transcript (optional — AI will still process from title/URL context)"
            className="arc-advisor-input min-h-[120px] w-full resize-y text-sm"
          />
          <ArcButton onClick={() => void process()} disabled={loading}>
            {loading ? "Processing…" : "Process lecture"}
          </ArcButton>
        </div>

        <aside className="arc-card w-full shrink-0 lg:w-72">
          <p className="arc-mono text-[10px] text-[var(--arc-muted)]">Library</p>
          <ul className="mt-3 space-y-2 text-sm">
            {lectures.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  className="text-left hover:text-[var(--arc-accent)]"
                  onClick={() => setActiveId(l.id)}
                >
                  {l.title}
                </button>
              </li>
            ))}
          </ul>
          {active?.chapters && (
            <div className="mt-6 border-t border-[var(--arc-border)] pt-4">
              <p className="arc-mono text-[10px]">Chapters</p>
              <ol className="mt-2 space-y-2 text-xs text-[var(--arc-muted)]">
                {active.chapters.map((c, i) => (
                  <li key={i}>
                    <span className="text-[var(--arc-accent)]">{c.time}</span>{" "}
                    {c.title}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
