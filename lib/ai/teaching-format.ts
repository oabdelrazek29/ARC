import { buildResourceUrl } from "@/lib/ai/professor-prompt";

export type TeachingPayload = {
  summary: string;
  lessonSteps?: { title: string; detail: string }[];
  learningObjectives?: string[];
  studyTimeline?: { when: string; task: string }[];
  weaknessesDetected?: string[];
  resources?: { title: string; type: string; searchQuery: string }[];
  flashcards?: { front: string; back: string }[];
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
  assignments?: { title: string; description: string; estimatedMinutes?: number }[];
  projects?: { title: string; description: string; deliverables?: string[] }[];
  tutorHint?: {
    subject: string;
    topic: string;
    reason: string;
  };
  nextStep?: string;
  connectToGraph?: string;
};

export function parseTeachingPayload(raw: string): TeachingPayload | null {
  try {
    const parsed = JSON.parse(raw) as TeachingPayload;
    if (!parsed.summary) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Turn structured teaching JSON into readable markdown for the UI */
export function teachingPayloadToMarkdown(p: TeachingPayload): string {
  const parts: string[] = [];

  parts.push(p.summary.trim());
  parts.push("");

  if (p.learningObjectives?.length) {
    parts.push("## Learning objectives");
    p.learningObjectives.forEach((o) => parts.push(`- ${o}`));
    parts.push("");
  }

  if (p.studyTimeline?.length) {
    parts.push("## Study timeline");
    p.studyTimeline.forEach((t) => parts.push(`- **${t.when}:** ${t.task}`));
    parts.push("");
  }

  if (p.weaknessesDetected?.length) {
    parts.push("## Focus areas");
    p.weaknessesDetected.forEach((w) => parts.push(`- ${w}`));
    parts.push("");
  }

  if (p.lessonSteps?.length) {
    parts.push("## Lesson");
    p.lessonSteps.forEach((s, i) => {
      parts.push(`### ${i + 1}. ${s.title}`);
      parts.push(s.detail.trim());
      parts.push("");
    });
  }

  if (p.assignments?.length) {
    parts.push("## Assignments");
    p.assignments.forEach((a) => {
      parts.push(`### ${a.title}`);
      parts.push(a.description.trim());
      if (a.estimatedMinutes)
        parts.push(`_~${a.estimatedMinutes} min_`);
      parts.push("");
    });
  }

  if (p.projects?.length) {
    parts.push("## Projects");
    p.projects.forEach((pr) => {
      parts.push(`### ${pr.title}`);
      parts.push(pr.description.trim());
      pr.deliverables?.forEach((d) => parts.push(`- ${d}`));
      parts.push("");
    });
  }

  if (p.resources?.length) {
    parts.push("## Resources");
    p.resources.forEach((r) => {
      const url = buildResourceUrl(r.searchQuery);
      parts.push(`- **${r.title}** (${r.type}) — [Search & open](${url})`);
    });
    parts.push("");
  }

  if (p.flashcards?.length) {
    parts.push("## Flashcards (Quizlet-style)");
    p.flashcards.forEach((c, i) => {
      parts.push(`**Card ${i + 1}**`);
      parts.push(`- Front: ${c.front}`);
      parts.push(`- Back: ${c.back}`);
      parts.push("");
    });
  }

  if (p.quizQuestions?.length) {
    parts.push("## Practice quiz");
    p.quizQuestions.forEach((q, i) => {
      parts.push(`**Q${i + 1}.** ${q.question}`);
      q.options.forEach((opt, j) => {
        const mark = j === q.correctIndex ? " ✓" : "";
        parts.push(`${String.fromCharCode(65 + j)}. ${opt}${mark}`);
      });
      if (q.explanation) parts.push(`_Why:_ ${q.explanation}`);
      parts.push("");
    });
  }

  if (p.tutorHint) {
    parts.push("## Voice tutor");
    parts.push(
      `Subject: **${p.tutorHint.subject}** · Topic: **${p.tutorHint.topic}**`
    );
    parts.push(p.tutorHint.reason);
    parts.push(
      `[Open tutors →](/companions?subject=${encodeURIComponent(p.tutorHint.subject)})`
    );
    parts.push("");
  }

  if (p.connectToGraph) {
    parts.push("## Your learning graph");
    parts.push(p.connectToGraph.trim());
    parts.push("");
  }

  if (p.nextStep) {
    parts.push("## Your next step (20 min)");
    parts.push(p.nextStep.trim());
  }

  return parts.join("\n").trim();
}

export function isStudyIntent(message: string): boolean {
  const m = message.toLowerCase();
  return (
    /\b(quizlet|flashcard|flash card|memorize|quiz me|test me|exam prep|drill)\b/.test(
      m
    ) || /\b(study|review cards)\b/.test(m)
  );
}
