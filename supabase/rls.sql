-- Run once in Supabase SQL Editor (after schema.sql)
-- Lets everyone browse tutors; signed-in users can create; allows demo seed rows

alter table companions enable row level security;
alter table session_history enable row level security;
alter table bookmarks enable row level security;

drop policy if exists "Public read companions" on companions;
create policy "Public read companions"
  on companions for select
  using (true);

drop policy if exists "Auth insert companions" on companions;
create policy "Auth insert companions"
  on companions for insert
  to authenticated
  with check (true);

drop policy if exists "Seed insert companions" on companions;
create policy "Seed insert companions"
  on companions for insert
  to anon
  with check (author is null);

drop policy if exists "Auth insert session_history" on session_history;
create policy "Auth insert session_history"
  on session_history for insert
  to authenticated
  with check (true);

drop policy if exists "Auth read own session_history" on session_history;
create policy "Auth read own session_history"
  on session_history for select
  to authenticated
  using (user_id = auth.jwt() ->> 'sub');

drop policy if exists "Auth manage bookmarks" on bookmarks;
create policy "Auth manage bookmarks"
  on bookmarks for all
  to authenticated
  using (user_id = auth.jwt() ->> 'sub')
  with check (user_id = auth.jwt() ->> 'sub');
