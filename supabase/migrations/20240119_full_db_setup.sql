-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. USERS TABLE
-- ==========================================
create table if not exists public.users (
  id uuid references auth.users not null primary key,
  name text,
  email text,
  image text,
  role text default 'buyer',
  cart jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.users enable row level security;

-- User Policies (Idempotent)
do $$ begin
  drop policy if exists "Users can view their own profile" on public.users;
  drop policy if exists "Users can update their own profile" on public.users;
end $$;

create policy "Users can view their own profile" 
  on public.users for select 
  using ( auth.uid() = id );

create policy "Users can update their own profile" 
  on public.users for update 
  using ( auth.uid() = id );

-- ==========================================
-- 2. AUTH TRIGGER FOR NEW USERS
-- ==========================================
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, name, role, image)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'buyer'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger definition
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- 3. STORES TABLE
-- ==========================================
create table if not exists public.stores (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.users(id) not null,
  name text not null,
  username text unique not null,
  description text,
  category text,
  logo_url text,
  banner_url text,
  status text default 'active',
  settings jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint unique_store_owner unique (owner_id)
);

-- Enable RLS
alter table public.stores enable row level security;

-- Store Policies (Idempotent)
do $$ begin
  drop policy if exists "Public stores are viewable by everyone" on public.stores;
  drop policy if exists "Users can create their own store" on public.stores;
  drop policy if exists "Owners can update their store" on public.stores;
end $$;

create policy "Public stores are viewable by everyone" 
  on public.stores for select 
  using ( true );

create policy "Users can create their own store" 
  on public.stores for insert 
  with check ( auth.uid() = owner_id );

create policy "Owners can update their store" 
  on public.stores for update 
  using ( auth.uid() = owner_id );

-- ==========================================
-- 4. PRODUCTS TABLE
-- ==========================================
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  title text not null,
  description text,
  price numeric not null,
  condition text,
  stock integer default 0,
  images text[],
  category text,
  specifications jsonb default '{}'::jsonb,
  status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.products enable row level security;

-- Product Policies (Idempotent)
do $$ begin
  drop policy if exists "Public products are viewable by everyone" on public.products;
  drop policy if exists "Store owners can manage products" on public.products;
end $$;

create policy "Public products are viewable by everyone" 
  on public.products for select 
  using ( status = 'published' or auth.uid() in (select owner_id from public.stores where id = products.store_id) );

create policy "Store owners can manage products" 
  on public.products for all 
  using ( auth.uid() in (select owner_id from public.stores where id = store_id) );

-- ==========================================
-- 5. STORAGE BUCKETS SETUP
-- ==========================================
-- Inserting into storage.buckets (requires 'service_role' or high privileges)
-- If this fails in the Dashboard, you can manually create these in the Storage UI
insert into storage.buckets (id, name, public)
values ('store-assets', 'store-assets', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Storage Policies for 'store-assets'
do $$ begin
  drop policy if exists "Anyone can view store assets" on storage.objects;
  drop policy if exists "Authenticated users can upload store assets" on storage.objects;
end $$;

create policy "Anyone can view store assets"
  on storage.objects for select
  using ( bucket_id = 'store-assets' );

create policy "Authenticated users can upload store assets"
  on storage.objects for insert
  with check ( bucket_id = 'store-assets' and auth.role() = 'authenticated' );

-- Storage Policies for 'product-images'
do $$ begin
  drop policy if exists "Anyone can view product images" on storage.objects;
  drop policy if exists "Authenticated users can upload product images" on storage.objects;
end $$;

create policy "Anyone can view product images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' and auth.role() = 'authenticated' );
