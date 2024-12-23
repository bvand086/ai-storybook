-- Create books table
create table if not exists public.books (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  cover_image_url text,
  reading_level integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  status text check (status in ('draft', 'published')) default 'draft' not null,
  content jsonb not null default '{"pages": []}',
  metadata jsonb not null default '{}'
);

-- Set up row level security
alter table public.books enable row level security;

-- Create policies
create policy "Users can view their own books"
  on public.books for select
  using (auth.uid() = user_id);

create policy "Users can insert their own books"
  on public.books for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own books"
  on public.books for update
  using (auth.uid() = user_id);

create policy "Users can delete their own books"
  on public.books for delete
  using (auth.uid() = user_id);

-- Create indexes
create index books_user_id_idx on public.books(user_id);
create index books_created_at_idx on public.books(created_at desc); 