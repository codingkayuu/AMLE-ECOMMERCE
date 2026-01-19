-- Create stores table
create table if not exists stores (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references auth.users not null,
  name text not null,
  username text unique not null,
  description text,
  category text,
  logo_url text,
  banner_url text,
  settings jsonb default '{}'::jsonb,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint unique_owner unique (owner_id)
);

-- Create products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references stores(id) on delete cascade not null,
  title text not null,
  description text,
  price numeric not null,
  condition text,
  stock integer default 0,
  images text[],
  category text,
  specifications jsonb default '{}'::jsonb,
  status text default 'draft', -- 'draft', 'published', 'archived'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table stores enable row level security;
alter table products enable row level security;

-- Policies for Stores
create policy "Public stores are viewable by everyone"
  on stores for select
  using ( true );

create policy "Users can create their own store"
  on stores for insert
  with check ( auth.uid() = owner_id );

create policy "Users can update their own store"
  on stores for update
  using ( auth.uid() = owner_id );

create policy "Users can delete their own store"
  on stores for delete
  using ( auth.uid() = owner_id );

-- Policies for Products
create policy "Public products are viewable by everyone if published"
  on products for select
  using ( status = 'published' or auth.uid() in (select owner_id from stores where id = products.store_id) );

create policy "Store owners can insert products"
  on products for insert
  with check ( auth.uid() in (select owner_id from stores where id = store_id) );

create policy "Store owners can update products"
  on products for update
  using ( auth.uid() in (select owner_id from stores where id = store_id) );

create policy "Store owners can delete products"
  on products for delete
  using ( auth.uid() in (select owner_id from stores where id = store_id) );

-- Storage Buckets (Execute this in SQL editor if your project permits, otherwise use Storage UI)
-- Note: Configuring storage buckets via SQL is not always standard in Supabase, 
-- but you can create 'store-assets' and 'product-images' buckets in the dashboard.
-- Ensure they are Public.

-- Policy for Storage (assuming bucket 'store-assets')
-- create policy "Store Owner Images" on storage.objects for insert with check ( bucket_id = 'store-assets' and auth.uid()::text = (storage.foldername(name))[1] );
