-- ==========================================
-- ENABLE GUEST CHECKOUT
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Allow anyone (including guests/anon users) to insert into orders
create policy "Enable insert for everyone" on "public"."orders" 
as PERMISSIVE for INSERT 
with check (true);

-- 2. Allow anyone (including guests/anon users) to insert into order_items
create policy "Enable insert for everyone" on "public"."order_items" 
as PERMISSIVE for INSERT 
with check (true);

-- 3. (Optional) Allow guests to view their own orders by order_number (if you implement tracking)
-- create policy "Allow public read by order_number" on "public"."orders"
-- as PERMISSIVE for SELECT
-- using (true); 
-- Note: Be careful with SELECT policies. For now, INSERT is the blocker.
