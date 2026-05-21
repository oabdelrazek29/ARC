"use client";

import { useCallback, useState } from "react";

import { ArcButton } from "@/components/arc-ui/ArcButton";
import { PlatformSectionHeader } from "@/components/platform/PlatformSectionHeader";
import { useInstructorStore } from "@/store/instructor-store";
import { usePlatformStore } from "@/store/platform-store";

export function NotesSection() {
  const notes = usePlatformStore((s) => s.notes);
  const addNote = usePlatformStore((s) => s.addNote);
  const updateNote = usePlatformStore((s) => s.updateNote);
  const recordEvent = usePlatformStore((s) => s.recordEvent);
  const setTab = useInstructorStore((s) => s.setTab);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const active = notes.find((n) => n.id === activeId) ?? notes[0];

  const save = useCallback(() => {
    if (!title.trim()) return;
    if (activeId) {
      updateNote(activeId, { title, content, tags: extractTags(content) });
    } else {
      const id = addNote({
        title,
        content,
        tags: extractTags(content),
        linkedConcepts: [],
      });
      setActiveId(id);
    }
  }, [title, content, activeId, addNote, updateNote]);

  const aiSummarize = useCallback(async () => {
    if (!content.trim()) return;
    setLoading(true);
    setTab("lesson");
    try {
      const res = await fetch("/api/ai/analyze-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          title: title || "Note",
          kind: "note",
        }),
      });
      const data = (await res.json()) as { payload?: { summary?: string } };
      if (data.payload?.summary && activeId) {
        updateNote(activeId, { summary: data.payload.summary });
      }
      recordEvent(
        "file_analyzed",
        title || "Note",
        "AI summarized note — flashcards in Practice tab",
        "notes"
      );
      setTab("practice");
    } finally {
      setLoading(false);
    }
  }, [content, title, activeId, updateNote, recordEvent, setTab]);

  return (
    <div className="arc-platform-section arc-page arc-dot-grid !py-6">
      <PlatformSectionHeader
        marker="Notes"
        title="Smart notes workspace"
        lead="Block-style notes with AI summaries, tags, and graph linking — any subject."
      />

      <div className="arc-platform-split-content mt-8">
        <aside className="arc-card w-full shrink-0 lg:w-56">
          <p className="arc-mono text-[10px] text-[var(--arc-muted)]">All notes</p>
          <ul className="mt-3 space-y-1">
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(n.id);
                    setTitle(n.title);
                    setContent(n.content);
                  }}
                  className="w-full truncate text-left text-xs hover:text-[var(--arc-accent)]"
                >
                  {n.title}
                </button>
              </li>
            ))}
          </ul>
          <ArcButton
            variant="ghost"
            className="mt-4 w-full text-xs"
            onClick={() => {
              setActiveId(null);
              setTitle("");
              setContent("");
            }}
          >
            + New note
          </ArcButton>
        </aside>

        <div className="arc-card flex-1 p-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="arc-advisor-input mb-3 w-full"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write in markdown — use #tags and [[concept links]]"
            className="arc-advisor-input min-h-[280px] w-full resize-y font-mono text-sm"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <ArcButton onClick={save}>Save</ArcButton>
            <ArcButton variant="ghost" onClick={() => void aiSummarize()} disabled={loading}>
              {loading ? "Analyzing…" : "AI summarize + quiz"}
            </ArcButton>
          </div>
          {active?.summary && (
            <p className="mt-4 text-sm text-[var(--arc-muted)] border-t border-[var(--arc-border)] pt-4">
              <strong className="text-[var(--arc-fg)]">Summary:</strong> {active.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function extractTags(text: string): string[] {
  const tags = text.match(/#([\w-]+)/g);
  return tags ? [...new Set(tags.map((t) => t.slice(1)))] : [];
}
