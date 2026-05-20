"use client";

import { useCallback, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type ArcCoachProps = {
  goal?: string;
  nodeTitle?: string;
  nodeDescription?: string;
};

export function ArcCoach({ goal, nodeTitle, nodeDescription }: ArcCoachProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setMessages((m) => [...m, { role: "user", text: trimmed }]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/ai/coach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            goal,
            nodeTitle,
            nodeDescription,
          }),
        });

        const data = (await res.json()) as { reply?: string; error?: string };

        const assistantText = data.reply
          ? data.reply
          : data.error
            ? data.error
            : !res.ok
              ? `Request failed (${res.status}).`
              : "Something went wrong.";

        setMessages((m) => [
          ...m,
          { role: "assistant", text: assistantText },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: "Could not reach ARC Coach. Is the dev server running?",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [goal, nodeTitle, nodeDescription, loading]
  );

  const quickPrompts = [
    "What should I study next?",
    "Explain this node simply",
    "Give me a 30-min study plan",
  ];

  return (
    <>
      <Button
        type="button"
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg shadow-cyan-500/20"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open ARC Coach"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="fixed bottom-20 right-6 z-40 flex h-[min(420px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          <div className="border-b border-zinc-800 px-4 py-3">
            <p className="font-semibold text-white">ARC Coach</p>
            <p className="text-xs text-zinc-500">
              Ask about your goal or selected skill node
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && !loading && (
              <div className="space-y-2">
                <p className="text-xs text-zinc-500">Quick asks:</p>
                {quickPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    disabled={loading}
                    className="block w-full rounded-lg border border-zinc-800 px-3 py-2 text-left text-xs text-zinc-300 hover:border-cyan-500/30 hover:bg-zinc-800/50 disabled:opacity-50"
                    onClick={() => void send(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === "user"
                    ? "ml-8 rounded-lg bg-cyan-500/15 px-3 py-2 text-sm text-cyan-100"
                    : "mr-4 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300"
                }
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <p className="flex items-center gap-2 text-xs text-cyan-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                ARC is thinking…
              </p>
            )}
          </div>

          <form
            className="flex gap-2 border-t border-zinc-800 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ARC…"
              disabled={loading}
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/40 focus:outline-none disabled:opacity-50"
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
