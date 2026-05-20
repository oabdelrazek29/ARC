-- Run in Supabase SQL editor (from adrianhajdin/saas-app tutorial)

create table if not exists companions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  topic text not null,
  voice text not null,
  style text not null,
  duration int not null default 30,
  author text,
  created_at timestamptz default now()
);

create table if not exists session_history (
  id uuid primary key default gen_random_uuid(),
  companion_id uuid references companions(id) on delete cascade,
  user_id text not null,
  created_at timestamptz default now()
);

create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  companion_id uuid references companions(id) on delete cascade,
  user_id text not null,
  created_at timestamptz default now(),
  unique (companion_id, user_id)
);

create index if not exists idx_companions_author on companions(author);
create index if not exists idx_session_history_user on session_history(user_id);
create index if not exists idx_bookmarks_user on bookmarks(user_id);
