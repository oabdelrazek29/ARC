/**
 * Seeds demo tutors into Supabase. Requires rls.sql run once in SQL Editor.
 * Usage: node scripts/seed-tutors.mjs
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const text = readFileSync(".env.local", "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const tutors = [
  {
    name: "Neura the Brainy Explorer",
    subject: "science",
    topic: "Neural Network of the Brain",
    voice: "ZIlrSGI4jZqobxRKprJz",
    style: "casual",
    duration: 45,
  },
  {
    name: "Countsy the Number Wizard",
    subject: "maths",
    topic: "Derivatives & Integrals",
    voice: "2BJW5coyhAzSr8STdHbE",
    style: "casual",
    duration: 30,
  },
  {
    name: "Verba the Vocabulary Builder",
    subject: "language",
    topic: "English Literature",
    voice: "sarah",
    style: "formal",
    duration: 30,
  },
  {
    name: "Codey the Logic Hacker",
    subject: "coding",
    topic: "Intro to If-Else Statements",
    voice: "c6SfcYrb2t09NHXiT80T",
    style: "formal",
    duration: 45,
  },
  {
    name: "Memo, the Memory Keeper",
    subject: "history",
    topic: "World Wars: Causes & Consequences",
    voice: "2BJW5coyhAzSr8STdHbE",
    style: "casual",
    duration: 15,
  },
  {
    name: "The Market Maestro",
    subject: "economics",
    topic: "The Basics of Supply & Demand",
    voice: "c6SfcYrb2t09NHXiT80T",
    style: "formal",
    duration: 10,
  },
];

loadEnv();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const sb = createClient(url, key);

const { data: existing } = await sb.from("companions").select("name");
const names = new Set((existing ?? []).map((r) => r.name));

for (const t of tutors) {
  if (names.has(t.name)) {
    console.log("Skip (exists):", t.name);
    continue;
  }
  const { error } = await sb.from("companions").insert({ ...t, author: null });
  if (error) {
    console.error("\nFailed:", t.name, "—", error.message);
    console.error("\nRun supabase/rls.sql once in Supabase SQL Editor, then run this script again.");
    console.error("(The app still shows demo tutors from code if the table is empty.)\n");
    process.exit(1);
  }
  console.log("Added:", t.name);
}

const { count } = await sb.from("companions").select("*", { count: "exact", head: true });
console.log("\nDone. Tutors in Supabase:", count);
