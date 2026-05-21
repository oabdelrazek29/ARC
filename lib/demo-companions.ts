import { recentSessions, voices } from "@/constants";

/** Built-in demo tutors from constants — used when Supabase table is empty */
export function getDemoCompanions({
  limit = 10,
  page = 1,
  subject,
  topic,
}: {
  limit?: number;
  page?: number;
  subject?: string;
  topic?: string;
}): Companion[] {
  let list: Companion[] = recentSessions.map((s) => ({
    id: `demo-${s.id}`,
    name: s.name,
    subject: s.subject,
    topic: s.topic,
    duration: s.duration,
    voice: voices.male.casual,
    style: "casual",
    author: undefined,
    bookmarked: false,
  }));

  if (subject) {
    const q = subject.toLowerCase();
    list = list.filter((c) => String(c.subject).toLowerCase().includes(q));
  }
  if (topic) {
    const q = topic.toLowerCase();
    list = list.filter(
      (c) =>
        c.topic.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
    );
  }

  const start = (page - 1) * limit;
  return list.slice(start, start + limit);
}
