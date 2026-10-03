alter table public.posts add column if not exists is_private boolean not null default false;

create table if not exists public.user_profiles (
  email text primary key,
  is_private boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;
drop policy if exists "Anyone can read user profiles" on public.user_profiles;
create policy "Anyone can read user profiles" on public.user_profiles for select using (true);
drop policy if exists "Anyone can create user profiles" on public.user_profiles;
create policy "Anyone can create user profiles" on public.user_profiles for insert with check (true);
drop policy if exists "Anyone can update user profiles" on public.user_profiles;
create policy "Anyone can update user profiles" on public.user_profiles for update using (true) with check (true);

drop policy if exists "Anyone can update posts" on public.posts;
create policy "Anyone can update posts" on public.posts for update using (true) with check (true);
