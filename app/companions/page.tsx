import CompanionCard from "@/components/CompanionCard";
import { SetupRequired } from "@/components/lms/SetupRequired";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  if (!isSupabaseConfigured()) {
    return (
      <div className="arc-lms-page py-12">
        <SetupRequired
          title="Tutor library needs Supabase"
          items={[
            "NEXT_PUBLIC_SUPABASE_URL",
            "NEXT_PUBLIC_SUPABASE_ANON_KEY",
            "Run supabase/schema.sql in your Supabase project",
          ]}
        />
      </div>
    );
  }

  const filters = await searchParams;
  const subject = filters.subject ? String(filters.subject) : "";
  const topic = filters.topic ? String(filters.topic) : "";

  let companions: Companion[] = [];
  try {
    companions = await getAllCompanions({ subject, topic });
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : "";
    const missingTables =
      message.includes("Could not find the table") ||
      message.includes("relation") ||
      message.includes("does not exist");
    return (
      <div className="arc-lms-page py-12">
        <SetupRequired
          title={
            missingTables
              ? "Create Supabase tables (one-time setup)"
              : "Could not load tutors"
          }
          items={
            missingTables
              ? [
                  "Open supabase.com → your project → SQL Editor → New query",
                  "In Cursor: open arc/supabase/schema.sql → copy ALL → paste in SQL Editor",
                  "Click Run — you should see Success",
                  "Restart: Ctrl+C in terminal, then npm run dev",
                ]
              : [
                  "Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
                  "Run supabase/schema.sql in Supabase SQL Editor",
                  "Sign in with Clerk if tutors still fail after tables exist",
                ]
          }
        />
      </div>
    );
  }

  return (
    <div className="arc-lms-page">
      <section className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h1 className="arc-heading text-3xl">Voice tutors</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.length === 0 ? (
          <p className="text-[var(--arc-muted)]">
            No tutors match your filters. Clear search or try another subject.
          </p>
        ) : (
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              bookmarked={companion.bookmarked ?? false}
              color={getSubjectColor(String(companion.subject))}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default CompanionsLibrary;
