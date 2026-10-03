alter table public.posts
  add column if not exists views integer not null default 0;

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