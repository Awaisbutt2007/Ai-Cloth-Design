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
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
create policy "Anyone can read posts" on public.posts for select using (true);
create policy "Anyone can create posts" on public.posts for insert with check (true);

insert into storage.buckets (id, name, public)
values ('fashion-posts', 'fashion-posts', true)
on conflict (id) do nothing;

create policy "Anyone can read fashion post images"
on storage.objects for select
using (bucket_id = 'fashion-posts');

create policy "Anyone can upload fashion post images"
on storage.objects for insert
with check (bucket_id = 'fashion-posts');
