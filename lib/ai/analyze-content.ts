import { ARC_PROFESSOR_SYSTEM } from "@/lib/ai/professor-prompt";
import { getOpenAIClient, hasOpenAI } from "@/lib/ai/openai-client";
import {
  parseTeachingPayload,
  teachingPayloadToMarkdown,
  type TeachingPayload,
} from "@/lib/ai/teaching-format";

const ANALYZE_SYSTEM = `${ARC_PROFESSOR_SYSTEM}

You are analyzing uploaded educational content (any subject). Return the same JSON schema. Focus on:
- summary of the material
- learningObjectives from the content
- flashcards and quizQuestions from key facts
- weaknessesDetected if material implies common student struggles
- connectToGraph: related concepts to link in a knowledge graph
- studyTimeline: suggested review schedule`;

export async function analyzeEducationalContent(
  content: string,
  meta: { title: string; kind: "file" | "lecture" | "note" }
): Promise<{ markdown: string; payload: TeachingPayload; demo: boolean }> {
  const excerpt = content.slice(0, 12000);

  if (!hasOpenAI()) {
    const payload: TeachingPayload = {
      summary: `Preview analysis for "${meta.title}". Add OPENAI_API_KEY for full file intelligence.`,
      lessonSteps: [
        {
          title: "Core ideas",
          detail: excerpt.slice(0, 400) || "Upload or paste content to analyze.",
        },
      ],
      flashcards: [
        { front: meta.title, back: "Main topic from your upload" },
      ],
      connectToGraph: "Link this material in Knowledge Graph after review.",
    };
    return {
      markdown: teachingPayloadToMarkdown(payload),
      payload,
      demo: true,
    };
  }

  const client = getOpenAIClient();
  if (!client) {
    return analyzeEducationalContent("", meta);
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 2000,
      messages: [
        { role: "system", content: ANALYZE_SYSTEM },
        {
          role: "user",
          content: JSON.stringify({
            kind: meta.kind,
            title: meta.title,
            content: excerpt,
          }),
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    const payload = text ? parseTeachingPayload(text) : null;
    if (!payload) throw new Error("Invalid JSON");

    return {
      markdown: teachingPayloadToMarkdown(payload),
      payload,
      demo: false,
    };
  } catch (e) {
    console.error("[analyze-content]", e);
    return analyzeEducationalContent(excerpt, meta);
  }
}
