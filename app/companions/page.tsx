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
    return (
      <div className="arc-lms-page py-12">
        <SetupRequired
          title="Could not load tutors"
          items={[
            "Verify Supabase tables exist (companions, bookmarks, session_history)",
            "Sign in with Clerk if RLS requires auth",
          ]}
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
            No tutors found. Create one or adjust filters.
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
