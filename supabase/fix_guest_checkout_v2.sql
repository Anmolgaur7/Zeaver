-- ==========================================
-- FIX GUEST CHECKOUT V2 (Comprehensive)
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. DROP EXISTING POLICIES to avoid conflicts
drop policy if exists "Enable insert for everyone" on "public"."orders";
drop policy if exists "Enable read access for all users" on "public"."orders";
drop policy if exists "Enable insert for users based on user_id" on "public"."orders";

drop policy if exists "Enable insert for everyone" on "public"."order_items";
drop policy if exists "Enable read access for all users" on "public"."order_items";

-- 2. FORCE RLS ON (to ensure policies work as expected)
alter table "public"."orders" enable row level security;
alter table "public"."order_items" enable row level security;

-- 3. CREATE PERMISSIVE POLICIES
-- Allow ANYONE to insert (Guest + Auth)
create policy "Allow public insert orders" 
on "public"."orders" 
for INSERT 
with check (true);

create policy "Allow public insert order_items" 
on "public"."order_items" 
for INSERT 
with check (true);

-- Allow ANYONE to select (Guest retrieval)
create policy "Allow public select orders" 
on "public"."orders" 
for SELECT 
using (true);

create policy "Allow public select order_items" 
on "public"."order_items" 
for SELECT 
using (true);

-- 4. GRANT PERMISSIONS TO ANON ROLE
-- This is critical for guest users
grant usage on schema public to anon, authenticated;
grant all on "public"."orders" to anon, authenticated;
grant all on "public"."order_items" to anon, authenticated;

-- 5. FUNCTION PERMISSIONS
-- If you have a sequence or function for order numbers
grant execute on function generate_order_number() to anon, authenticated;
-- If generate_order_number doesn't exist, this line might fail, but that's okay.
