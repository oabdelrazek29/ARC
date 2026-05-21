"use client";

import { memo, useCallback, useState } from "react";

import { InstructorConnect } from "@/components/instructor/InstructorConnect";
import { InstructorLessonChat } from "@/components/instructor/InstructorLessonChat";
import { InstructorOverview } from "@/components/instructor/InstructorOverview";
import { InstructorPlan } from "@/components/instructor/InstructorPlan";
import { InstructorPractice } from "@/components/instructor/InstructorPractice";
import type { TeachingPayload } from "@/lib/ai/teaching-format";
import { cn } from "@/lib/utils";
import { useInstructorStore } from "@/store/instructor-store";
import type { Course } from "@/types/course";
import {
  INSTRUCTOR_TAB_LABELS,
  type InstructorTab,
} from "@/types/instructor";

type Props = {
  course?: Course;
  context?: {
    goal?: string;
    topic?: string;
    nodeTitle?: string;
    nodeDescription?: string;
    graphId?: string;
  };
};

const TABS: InstructorTab[] = [
  "overview",
  "lesson",
  "practice",
  "plan",
  "connect",
];

function InstructorMasterPanelInner({ course, context }: Props) {
  const activeTab = useInstructorStore((s) => s.activeTab);
  const setTab = useInstructorStore((s) => s.setTab);
  const [lastTeaching, setLastTeaching] = useState<TeachingPayload | null>(null);

  const onTeaching = useCallback((payload: TeachingPayload) => {
    setLastTeaching(payload);
  }, []);

  return (
    <div className="arc-instructor-master flex h-full min-h-0 flex-col">
      <nav className="arc-instructor-tabs" aria-label="Instructor sections">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setTab(tab)}
            className={cn(
              "arc-instructor-tabs__btn",
              activeTab === tab && "arc-instructor-tabs__btn--active"
            )}
          >
            {INSTRUCTOR_TAB_LABELS[tab]}
          </button>
        ))}
      </nav>

      <div className="arc-instructor-master__content flex-1 min-h-0 overflow-y-auto">
        {activeTab === "overview" && <InstructorOverview course={course} />}
        {activeTab === "lesson" && (
          <InstructorLessonChat context={context} onTeaching={onTeaching} />
        )}
        {activeTab === "practice" && (
          <InstructorPractice teaching={lastTeaching} />
        )}
        {activeTab === "plan" && (
          <InstructorPlan course={course} teaching={lastTeaching} />
        )}
        {activeTab === "connect" && (
          <InstructorConnect
            graphId={context?.graphId}
            connectHint={lastTeaching?.connectToGraph}
          />
        )}
      </div>
    </div>
  );
}

export const InstructorMasterPanel = memo(InstructorMasterPanelInner);
