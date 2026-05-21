import { ARC_PROFESSOR_SYSTEM } from "@/lib/ai/professor-prompt";
import { getOpenAIClient, hasOpenAI } from "@/lib/ai/openai-client";
import type { TutorSessionPayload } from "@/types/tutor-session";

export type TutorAttachmentInput = {
  name: string;
  type: string;
  text?: string;
  dataUrl?: string;
};

const TUTOR_JSON_SCHEMA = `Return ONLY valid JSON:
{
  "explanation": "2-4 sentences, simple and direct",
  "example": "One concrete example with specifics",
  "practiceQuestion": "One question to check understanding",
  "hint": "A nudge without giving the full answer",
  "followUp": "What to try next or a related question to explore"
}`;

function parsePayload(raw: string): TutorSessionPayload | null {
  try {
    const p = JSON.parse(raw) as TutorSessionPayload;
    if (!p.explanation || !p.example) return null;
    return {
      explanation: String(p.explanation).trim(),
      example: String(p.example).trim(),
      practiceQuestion: String(p.practiceQuestion ?? "").trim(),
      hint: String(p.hint ?? "").trim(),
      followUp: String(p.followUp ?? "").trim(),
    };
  } catch {
    return null;
  }
}

function demoPayload(message: string): TutorSessionPayload {
  return {
    explanation:
      "Add OPENAI_API_KEY to .env.local to unlock live tutoring. Here is how a real session is structured: we explain simply, show an example, then check your understanding.",
    example:
      `You asked about "${message.slice(0, 80)}". A tutor would break that into one idea at a time — definition first, then a worked example, then a short check question.`,
    practiceQuestion:
      "In your own words, what is the single hardest part of this topic for you right now?",
    hint:
      "Start with what you already know, then name one specific step where you get stuck.",
    followUp:
      "Tell me your course or exam date and I will suggest a focused 20-minute study block.",
  };
}

export async function tutorSession(
  message: string,
  opts: {
    history?: { role: "user" | "assistant"; content: string }[];
    attachments?: TutorAttachmentInput[];
    courseContext?: string;
  } = {}
): Promise<{ payload: TutorSessionPayload; demo: boolean }> {
  if (!hasOpenAI()) {
    return { payload: demoPayload(message), demo: true };
  }

  const client = getOpenAIClient();
  if (!client) return { payload: demoPayload(message), demo: true };

  const attachmentNote =
    opts.attachments?.length ?
      opts.attachments
        .map((a) => {
          if (a.text) return `[File: ${a.name}]\n${a.text.slice(0, 8000)}`;
          if (a.dataUrl) return `[Image attached: ${a.name}]`;
          return `[Attachment: ${a.name}]`;
        })
        .join("\n\n")
    : "";

  const userText = [
    opts.courseContext ? `Context: ${opts.courseContext}` : "",
    attachmentNote,
    message.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const historyMessages = (opts.history ?? []).slice(-6).map((h) => ({
    role: h.role as "user" | "assistant",
    content: h.content,
  }));

  const hasImages = opts.attachments?.some((a) => a.dataUrl?.startsWith("data:image"));

  try {
    if (hasImages) {
      const imageParts: Array<
        | { type: "text"; text: string }
        | { type: "image_url"; image_url: { url: string } }
      > = [
        {
          type: "text",
          text: `${TUTOR_JSON_SCHEMA}\n\nStudent message and files:\n${userText}`,
        },
      ];
      for (const a of opts.attachments ?? []) {
        if (a.dataUrl?.startsWith("data:image")) {
          imageParts.push({
            type: "image_url",
            image_url: { url: a.dataUrl },
          });
        }
      }

      const completion = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 1200,
        messages: [
          {
            role: "system",
            content: `${ARC_PROFESSOR_SYSTEM}\n\nYou are in TUTOR SESSION mode. Teach in steps. ${TUTOR_JSON_SCHEMA}`,
          },
          ...historyMessages,
          {
            role: "user",
            content: imageParts,
          },
        ],
      });

      const text = completion.choices[0]?.message?.content;
      const payload = text ? parsePayload(text) : null;
      if (payload) return { payload, demo: false };
    }

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 1200,
      messages: [
        {
          role: "system",
          content: `${ARC_PROFESSOR_SYSTEM}\n\nYou are in TUTOR SESSION mode. Teach in steps — explain simply, example, practice question, hint, follow-up. Never be a generic chatbot. ${TUTOR_JSON_SCHEMA}`,
        },
        ...historyMessages,
        { role: "user", content: userText },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Empty tutor response");
    const payload = parsePayload(text);
    if (!payload) throw new Error("Invalid tutor JSON");
    return { payload, demo: false };
  } catch (e) {
    console.error("[tutor-session]", e);
    return { payload: demoPayload(message), demo: true };
  }
}
