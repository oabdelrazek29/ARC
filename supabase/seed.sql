-- Demo tutors from constants/index.ts (recentSessions)
-- Run AFTER schema.sql in Supabase → SQL Editor → Run

insert into companions (name, subject, topic, voice, style, duration, author)
select 'Neura the Brainy Explorer', 'science', 'Neural Network of the Brain', 'ZIlrSGI4jZqobxRKprJz', 'casual', 45, null
where not exists (select 1 from companions where name = 'Neura the Brainy Explorer');

insert into companions (name, subject, topic, voice, style, duration, author)
select 'Countsy the Number Wizard', 'maths', 'Derivatives & Integrals', '2BJW5coyhAzSr8STdHbE', 'casual', 30, null
where not exists (select 1 from companions where name = 'Countsy the Number Wizard');

insert into companions (name, subject, topic, voice, style, duration, author)
select 'Verba the Vocabulary Builder', 'language', 'English Literature', 'sarah', 'formal', 30, null
where not exists (select 1 from companions where name = 'Verba the Vocabulary Builder');

insert into companions (name, subject, topic, voice, style, duration, author)
select 'Codey the Logic Hacker', 'coding', 'Intro to If-Else Statements', 'c6SfcYrb2t09NHXiT80T', 'formal', 45, null
where not exists (select 1 from companions where name = 'Codey the Logic Hacker');

insert into companions (name, subject, topic, voice, style, duration, author)
select 'Memo, the Memory Keeper', 'history', 'World Wars: Causes & Consequences', '2BJW5coyhAzSr8STdHbE', 'casual', 15, null
where not exists (select 1 from companions where name = 'Memo, the Memory Keeper');

insert into companions (name, subject, topic, voice, style, duration, author)
select 'The Market Maestro', 'economics', 'The Basics of Supply & Demand', 'c6SfcYrb2t09NHXiT80T', 'formal', 10, null
where not exists (select 1 from companions where name = 'The Market Maestro');
