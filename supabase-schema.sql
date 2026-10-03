create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'New Design',
  category text,
  price numeric(12, 2) not null default 0,
  description text,
  image_url text not null,
  images jsonb not null default '[]'::jsonb,
  author_email text,
  author_name text not null default 'Anonymous',
  author_handle text not null default '@user',
  stock integer not null default 0,
  created_at timestamptz not null default now()
);

-- For databases created before `stock` existed:
alter table public.posts add column if not exists stock integer not null default 0;
alter table public.posts add column if not exists views integer not null default 0;
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

alter table public.posts enable row level security;
drop policy if exists "Anyone can read posts" on public.posts;
create policy "Anyone can read posts" on public.posts for select using (true);
drop policy if exists "Anyone can create posts" on public.posts;
create policy "Anyone can create posts" on public.posts for insert with check (true);
drop policy if exists "Anyone can update posts" on public.posts;
create policy "Anyone can update posts" on public.posts for update using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('fashion-posts', 'fashion-posts', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can read fashion post images" on storage.objects;
create policy "Anyone can read fashion post images"
on storage.objects for select
using (bucket_id = 'fashion-posts');

drop policy if exists "Anyone can upload fashion post images" on storage.objects;
create policy "Anyone can upload fashion post images"
on storage.objects for insert
with check (bucket_id = 'fashion-posts');

create table if not exists public.download_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  design_id text,
  design_title text not null default 'Untitled design',
  created_at timestamptz not null default now()
);

create index if not exists download_events_created_at_idx
  on public.download_events (created_at desc);

create index if not exists download_events_user_id_idx
  on public.download_events (user_id);

alter table public.download_events enable row level security;
revoke all on table public.download_events from anon, authenticated;
grant insert on table public.download_events to authenticated;
grant all on table public.download_events to service_role;

drop policy if exists "Users can record their own design downloads" on public.download_events;
create policy "Users can record their own design downloads"
on public.download_events for insert
to authenticated
with check ((select auth.uid()) = user_id);

create or replace function public.admin_dashboard()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  dashboard_data jsonb;
begin
  if lower(coalesce(auth.jwt() ->> 'email', '')) <> 'buttawais2000@gmail.com' then
    raise exception 'Forbidden' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'generatedAt', now(),
    'stats', jsonb_build_object(
      'registeredUsers', (select count(*) from auth.users),
      'publishedDesigns', (select count(*) from public.posts),
      'designDownloads', (select count(*) from public.download_events),
      'trackedTables', jsonb_build_array('public.posts', 'public.download_events'),
      'storageBuckets', jsonb_build_array('fashion-posts')
    ),
    'users', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', users.id,
          'email', coalesce(users.email, 'No email'),
          'createdAt', users.created_at,
          'lastSignInAt', users.last_sign_in_at,
          'emailConfirmed', users.email_confirmed_at is not null,
          'provider', coalesce(users.raw_app_meta_data ->> 'provider', 'email')
        ) order by users.created_at desc
      )
      from auth.users as users
    ), '[]'::jsonb),
    'recentDownloads', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', recent.id,
          'designTitle', recent.design_title,
          'createdAt', recent.created_at,
          'email', coalesce(users.email, 'Deleted account')
        ) order by recent.created_at desc
      )
      from (
        select id, user_id, design_title, created_at
        from public.download_events
        order by created_at desc
        limit 20
      ) as recent
      left join auth.users as users on users.id = recent.user_id
    ), '[]'::jsonb)
  ) into dashboard_data;

  return dashboard_data;
end;
$$;

revoke all on function public.admin_dashboard() from public, anon, authenticated;
grant execute on function public.admin_dashboard() to authenticated;

create or replace function public.increment_post_view(target_post_id uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_views integer;
begin
  update public.posts
  set views = coalesce(public.posts.views, 0) + 1
  where public.posts.id = target_post_id
  returning public.posts.views into updated_views;

  return updated_views;
end;
$$;

revoke all on function public.increment_post_view(uuid) from public;
grant execute on function public.increment_post_view(uuid) to anon, authenticated;
