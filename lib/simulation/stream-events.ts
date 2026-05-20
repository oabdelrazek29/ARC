import type { SimEventKind, SimUserWorld } from "@/lib/simulation/types";
import { pick, seeded } from "@/lib/simulation/seed";

const BREAKTHROUGHS = [
  "Node stabilized: {node}",
  "Mastery checkpoint reached: {node}",
  "Retention spike on {node}",
];

const CONFUSIONS = [
  "Confusion detected: {node}",
  "Unstable link between concepts",
  "Misconception flagged: {node}",
];

const RESTRUCTURES = [
  "Graph reorganized for {user}",
  "Cluster merged in {user}'s map",
  "New dependency edge formed",
];

const MASTERY = [
  "Domain mastery rising: {topic}",
  "Weak node resolved: {node}",
];

const INTERVENTIONS = [
  "Advisor shifted to Socratic mode",
  "Explanation strategy adapted",
  "Debug mode targeting {node}",
];

export function generateStreamMessage(
  kind: SimEventKind,
  world: SimUserWorld,
  nodeLabel: string,
  tick: number
): string {
  const seed = tick + world.id.charCodeAt(0);
  const user = world.label;
  const topic = world.topic;

  const fill = (t: string) =>
    t
      .replace("{node}", nodeLabel)
      .replace("{user}", user)
      .replace("{topic}", topic);

  switch (kind) {
    case "breakthrough":
      return fill(pick(BREAKTHROUGHS, seed, 1));
    case "confusion":
      return fill(pick(CONFUSIONS, seed, 2));
    case "restructure":
      return fill(pick(RESTRUCTURES, seed, 3));
    case "mastery":
      return fill(pick(MASTERY, seed, 4));
    case "intervention":
      return fill(pick(INTERVENTIONS, seed, 5));
    default:
      return `Learning event in ${user}`;
  }
}

export function nextEventKind(tick: number, worldIndex: number): SimEventKind {
  const kinds: SimEventKind[] = [
    "breakthrough",
    "confusion",
    "restructure",
    "mastery",
    "intervention",
  ];
  const i = Math.floor(seeded(tick, worldIndex) * kinds.length);
  return kinds[i]!;
}
