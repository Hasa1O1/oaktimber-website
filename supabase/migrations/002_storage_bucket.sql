insert into storage.buckets (id, name, public)
values ('card-images', 'card-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read card images" on storage.objects;
create policy "Public can read card images"
  on storage.objects
  for select
  using (bucket_id = 'card-images');

drop policy if exists "Authenticated users can upload card images" on storage.objects;
create policy "Authenticated users can upload card images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'card-images'
    and auth.role() = 'authenticated'
  );

drop policy if exists "Authenticated users can update card images" on storage.objects;
create policy "Authenticated users can update card images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'card-images'
    and auth.role() = 'authenticated'
  )
  with check (
    bucket_id = 'card-images'
    and auth.role() = 'authenticated'
  );

drop policy if exists "Authenticated users can delete card images" on storage.objects;
create policy "Authenticated users can delete card images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'card-images'
    and auth.role() = 'authenticated'
  );

