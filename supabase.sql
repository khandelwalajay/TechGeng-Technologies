create extension if not exists "pgcrypto";

create table if not exists public.products(
 id uuid primary key default gen_random_uuid(),
 name text not null,
 category text not null,
 description text default '',
 price numeric(12,2),
 stock integer not null default 0,
 image_url text,
 featured boolean not null default false,
 active boolean not null default true,
 created_at timestamptz not null default now()
);

create table if not exists public.enquiries(
 id uuid primary key default gen_random_uuid(),
 name text not null,
 email text not null,
 phone text default '',
 message text not null,
 created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.enquiries enable row level security;

drop policy if exists "public active products" on public.products;
create policy "public active products" on public.products for select to anon,authenticated using(active=true);

drop policy if exists "authenticated all products" on public.products;
create policy "authenticated all products" on public.products for all to authenticated using(true) with check(true);

drop policy if exists "public enquiries" on public.enquiries;
create policy "public enquiries" on public.enquiries for insert to anon,authenticated with check(true);

insert into storage.buckets(id,name,public) values('product-images','product-images',true)
on conflict(id) do update set public=true;

drop policy if exists "view product images" on storage.objects;
create policy "view product images" on storage.objects for select to anon,authenticated using(bucket_id='product-images');

drop policy if exists "upload product images" on storage.objects;
create policy "upload product images" on storage.objects for insert to authenticated with check(bucket_id='product-images');

drop policy if exists "update product images" on storage.objects;
create policy "update product images" on storage.objects for update to authenticated using(bucket_id='product-images') with check(bucket_id='product-images');

drop policy if exists "delete product images" on storage.objects;
create policy "delete product images" on storage.objects for delete to authenticated using(bucket_id='product-images');

-- Create your partner account in Supabase:
-- Authentication -> Users -> Add user.
-- The browser uses only the publishable/anon key. Never expose a service_role/secret key.
