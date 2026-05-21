import type { Course, CourseLesson, CourseModule, CoursePhase } from "@/types/course";
import type { SkillNode, SkillTree } from "@/types/arc";
import { NODE_TYPE_XP } from "@/constants/arc";

const NODE_TO_CONTENT: Record<
  SkillNode["nodeType"],
  CourseLesson["contentType"]
> = {
  lesson: "reading",
  practice: "practice",
  quiz: "quiz",
  project: "project",
  bossBattle: "checkpoint",
};

function groupNodesIntoModules(nodes: SkillNode[]): CourseModule[] {
  const chunkSize = 4;
  const modules: CourseModule[] = [];

  for (let i = 0; i < nodes.length; i += chunkSize) {
    const slice = nodes.slice(i, i + chunkSize);
    const completed = slice.filter((n) => n.completed).length;
    const moduleId = `mod-${i / chunkSize}`;

    modules.push({
      id: moduleId,
      title: `Module ${Math.floor(i / chunkSize) + 1}`,
      description: slice.map((n) => n.title).join(" · "),
      order: Math.floor(i / chunkSize),
      masteryPercent: Math.round((completed / slice.length) * 100),
      checkpointLabel:
        slice.some((n) => n.nodeType === "bossBattle")
          ? "Milestone"
          : slice.some((n) => n.nodeType === "quiz")
            ? "Checkpoint"
            : undefined,
      lessons: slice.map((node, j) => {
        const videoResource = node.resources.find((r) =>
          /youtube|youtu\.be|mux|\.mp4/i.test(r)
        );
        return {
          id: node.id,
          moduleId,
          chapterId: moduleId,
          title: node.title,
          description: node.description,
          contentType: NODE_TO_CONTENT[node.nodeType],
          nodeType: node.nodeType,
          estimatedMinutes: node.estimatedTime,
          xpReward: node.xpReward || NODE_TYPE_XP[node.nodeType],
          completed: node.completed,
          unlocked: node.unlocked,
          resources: node.resources,
          videoUrl: videoResource,
          isFree: j === 0 && i === 0,
          position: i * chunkSize + j,
          quiz: node.quiz,
          skillNodeId: node.id,
        } satisfies CourseLesson;
      }),
    });
  }

  return modules;
}

export function skillTreeToCourse(
  tree: SkillTree,
  earnedXp = 0
): Course {
  const nodes = [...tree.nodes].sort((a, b) => {
    const ay = a.position?.y ?? 0;
    const by = b.position?.y ?? 0;
    if (ay !== by) return ay - by;
    return (a.position?.x ?? 0) - (b.position?.x ?? 0);
  });

  const modules = groupNodesIntoModules(nodes);
  const totalXp = nodes.reduce((s, n) => s + n.xpReward, 0);
  const completed = nodes.filter((n) => n.completed).length;
  const masteryPercent =
    nodes.length > 0 ? Math.round((completed / nodes.length) * 100) : 0;
  const current = nodes.find((n) => n.unlocked && !n.completed);

  const phase: CoursePhase = {
    id: "phase-1",
    title: "Learning path",
    order: 0,
    modules,
    estimatedWeeks: Math.max(1, Math.ceil(nodes.length / 5)),
  };

  const estimatedHours = Math.round(
    nodes.reduce((s, n) => s + n.estimatedTime, 0) / 60
  );

  return {
    id: `course-${tree.id}`,
    goalId: tree.goalId,
    treeId: tree.id,
    title: tree.title,
    description: `Structured path for ${tree.title}`,
    phases: [phase],
    masteryPercent,
    totalXp,
    earnedXp,
    estimatedHours: estimatedHours || 1,
    currentLessonId: current?.id,
    createdAt: tree.createdAt,
  };
}

export function flattenCourseLessons(course: Course): CourseLesson[] {
  return course.phases.flatMap((p) =>
    p.modules.flatMap((m) => m.lessons)
  );
}
