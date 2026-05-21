import { ARC_PROFESSOR_SYSTEM } from "@/lib/ai/professor-prompt";
import { getOpenAIClient, hasOpenAI } from "@/lib/ai/openai-client";
import {
  isStudyIntent,
  parseTeachingPayload,
  teachingPayloadToMarkdown,
  type TeachingPayload,
} from "@/lib/ai/teaching-format";

export type TeachContext = {
  goal?: string;
  topic?: string;
  graphSummary?: string;
  weakNodes?: string[];
  mode?: "home" | "cognitive" | "tutor" | "instructor";
  advisorMode?: string;
};

export type TeachResult = {
  markdown: string;
  payload: TeachingPayload;
  demo: boolean;
};

function demoTeach(message: string, ctx: TeachContext): TeachResult {
  const study = isStudyIntent(message);
  const payload: TeachingPayload = {
    summary:
      "Add OPENAI_API_KEY in .env.local to unlock full ARC Professor lessons, resources, and Quizlet-style cards. Here is a preview of how teaching works.",
    lessonSteps: [
      {
        title: "Name one outcome",
        detail:
          "Pick a single skill you want in two weeks — not the whole field. Example: 'Explain derivatives' not 'learn all of calculus'.",
      },
      {
        title: "Learn in layers",
        detail:
          "Concept → example → practice → explain aloud. ARC sequences these so you are never staring at a wall of theory.",
      },
    ],
    resources: [
      {
        title: "Search curated lessons",
        type: "article",
        searchQuery: ctx.topic ?? message.slice(0, 40),
      },
    ],
    flashcards: study
      ? [
          { front: "What is a learning objective?", back: "A clear, measurable outcome you can prove." },
          { front: "First step in ARC?", back: "One outcome, then a lesson plan — not everything at once." },
        ]
      : undefined,
    tutorHint: {
      subject: "science",
      topic: ctx.topic ?? "core concepts",
      reason: "Voice practice helps you explain ideas without reading notes.",
    },
    nextStep:
      "Open Cognitive OS and build a graph for your topic, then ask the adviser for a lesson plan.",
    connectToGraph: ctx.weakNodes?.length
      ? `Focus on: ${ctx.weakNodes.join(", ")}`
      : undefined,
  };
  return {
    markdown: teachingPayloadToMarkdown(payload),
    payload,
    demo: true,
  };
}

export async function professorTeach(
  message: string,
  ctx: TeachContext = {}
): Promise<TeachResult> {
  if (!hasOpenAI()) {
    return demoTeach(message, ctx);
  }

  const client = getOpenAIClient();
  if (!client) return demoTeach(message, ctx);

  const study = isStudyIntent(message);

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.65,
      max_tokens: study ? 1800 : 1400,
      messages: [
        { role: "system", content: ARC_PROFESSOR_SYSTEM },
        {
          role: "user",
          content: JSON.stringify({
            userMessage: message,
            studyMode: study,
            goal: ctx.goal,
            topic: ctx.topic,
            graph: ctx.graphSummary,
            weakNodes: ctx.weakNodes,
            channel: ctx.mode ?? "home",
            advisorMode: ctx.advisorMode,
          }),
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Empty response");

    const payload = parseTeachingPayload(text);
    if (!payload) throw new Error("Invalid teaching JSON");

    return {
      markdown: teachingPayloadToMarkdown(payload),
      payload,
      demo: false,
    };
  } catch (e) {
    console.error("[ARC Professor]", e);
    return demoTeach(message, ctx);
  }
}
