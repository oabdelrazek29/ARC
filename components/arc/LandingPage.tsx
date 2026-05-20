"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  GitBranch,
  Swords,
  Trophy,
  Zap,
  Target,
  Users,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { MOCK_LEADERBOARD } from "@/constants/arc";
import { generateSkillTree } from "@/lib/ai/skill-tree-generator";
import { cn } from "@/lib/utils";

const SkillTreeCanvas = dynamic(
  () =>
    import("@/components/skill-tree/SkillTreeCanvas").then(
      (m) => m.SkillTreeCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-500">
        Loading skill tree…
      </div>
    ),
  }
);

const demoTree = generateSkillTree("demo", "Machine Learning", {
  level: "beginner",
  objective: "Get a job",
  hoursPerWeek: 10,
  preference: "balanced",
});

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4 },
};

export function LandingPage() {
  return (
    <div className="arc-page">
      <section className="relative overflow-hidden px-4 pb-24 pt-16 md:pt-24">
        <div className="arc-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div {...fade}>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-400">
              AI-powered adaptive learning
            </p>
            <h1 className="font-bricolage max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
              Turn Any Goal Into a{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                Skill Tree
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-400">
              ARC transforms what you want to learn into an RPG-style progression
              system — lessons, quizzes, projects, and boss battles that unlock
              as you grow.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/goals/new" className={buttonVariants({ size: "lg" })}>
                Start your path
              </Link>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                View dashboard
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SkillTreeCanvas tree={demoTree} />
          </motion.div>
        </div>
      </section>

      <Section title="How ARC works" id="how">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              icon: Target,
              title: "Define goal",
              desc: "Tell ARC what you want to master",
            },
            {
              icon: Brain,
              title: "AI context",
              desc: "Clarifying questions when input is vague",
            },
            {
              icon: GitBranch,
              title: "Skill tree",
              desc: "Dependency-based paths unlock as you progress",
            },
            {
              icon: Trophy,
              title: "Mastery",
              desc: "XP, levels, boss battles, achievements",
            },
          ].map((s) => (
            <motion.div
              key={s.title}
              {...fade}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
            >
              <s.icon className="mb-3 h-8 w-8 text-cyan-400" />
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Boss battles & milestones" id="boss">
        <motion.div
          {...fade}
          className="flex flex-col items-start gap-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 md:flex-row md:items-center"
        >
          <Swords className="h-16 w-16 shrink-0 text-amber-400" />
          <p className="text-zinc-300">
            Each mastery path ends with a{" "}
            <strong className="text-amber-300">boss battle</strong> — a capstone
            challenge that proves you can apply everything you unlocked.
          </p>
        </motion.div>
      </Section>

      <Section title="XP & leveling" id="xp">
        <motion.div {...fade} className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Lessons", xp: "40–80 XP", color: "text-cyan-300" },
            { label: "Projects", xp: "150 XP", color: "text-violet-300" },
            { label: "Boss battles", xp: "300 XP", color: "text-amber-300" },
          ].map((x) => (
            <div
              key={x.label}
              className="rounded-xl border border-zinc-800 p-6 text-center"
            >
              <Zap className={cn("mx-auto mb-2 h-8 w-8", x.color)} />
              <p className="font-semibold text-white">{x.label}</p>
              <p className={cn("mt-1 text-sm", x.color)}>{x.xp}</p>
            </div>
          ))}
        </motion.div>
      </Section>

      <Section title="Community leaderboard" id="leaderboard">
        <motion.div
          {...fade}
          className="overflow-hidden rounded-2xl border border-zinc-800"
        >
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/80 text-zinc-500">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Learner</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">XP</th>
                <th className="px-4 py-3">Streak</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((e, i) => (
                <tr key={e.id} className="border-t border-zinc-800/80">
                  <td className="px-4 py-3 text-zinc-400">#{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-white">{e.name}</td>
                  <td className="px-4 py-3">{e.level}</td>
                  <td className="px-4 py-3 text-cyan-300">
                    {e.xp.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{e.streak}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <motion.div {...fade}>
          <Users className="mx-auto mb-4 h-10 w-10 text-cyan-400" />
          <h2 className="font-bricolage text-3xl font-bold text-white">
            Ready to build your learning OS?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            One AI-generated tree per goal. Progress locally. Sync when you
            complete nodes.
          </p>
          <Link
            href="/goals/new"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}
          >
            Create your first tree
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-bricolage mb-10 text-2xl font-bold text-white md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

