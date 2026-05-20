-- Optional Supabase persistence for ARC Cognitive OS (additive)
-- Run after schema.sql if you want server-side graph storage

create table if not exists cognitive_graphs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text not null,
  goal_input text not null,
  version int not null default 1,
  nodes jsonb not null default '[]',
  edges jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists cognitive_graph_patches (
  id uuid primary key default gen_random_uuid(),
  graph_id uuid references cognitive_graphs(id) on delete cascade,
  patch jsonb not null,
  created_at timestamptz default now()
);

create table if not exists cognitive_behavioral_memory (
  user_id text not null,
  graph_id uuid references cognitive_graphs(id) on delete cascade,
  payload jsonb not null default '{}',
  primary key (user_id, graph_id)
);
