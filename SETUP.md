# Step-by-Step Setup Guide

## 🚀 Quick Start (30 minutes)

### Step 1: Create Supabase Account (5 min)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Create a new organization (or use existing)

### Step 2: Create New Project (3 min)

1. Click "New Project"
2. Fill in:
   - **Name:** `zeaver-ecommerce`
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to you (e.g., Mumbai for India)
3. Click "Create new project"
4. Wait 2-3 minutes for setup

### Step 3: Get API Keys (2 min)

1. In your project dashboard, go to **Settings** (⚙️ icon in sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
4. Copy both values

### Step 4: Set Up Environment Variables (2 min)

1. In your project root, create a file named `.env.local`
2. Copy this and replace with your actual values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 5: Create Database Tables (10 min)

1. In Supabase dashboard, click **SQL Editor** in sidebar
2. Click **New Query**
3. Open the file `supabase/schema.sql` in your project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl+Enter)
7. Wait for completion (10-20 seconds)
8. You should see: "Success. No rows returned"

### Step 6: Verify Setup (3 min)

1. Go to **Table Editor** in Supabase
2. You should see these tables:
   - products
   - categories
   - carts
   - cart_items
   - orders
   - order_items
   - reviews
   - wishlists
   - user_profiles
   - newsletter_subscribers
   - promo_codes

3. Click on **categories** - you should see 5 default categories

### Step 7: Test Connection (5 min)

1. Start your development server:
```bash
npm run dev
```

2. Open http://localhost:3000
3. Your site should load!

---

## ✅ You're Done!

Your backend is now set up and ready to use!

### Next Steps:
1. Add products through Supabase Table Editor
2. Create an admin user
3. Start building features

### Need Help?
- Check Supabase docs: https://supabase.com/docs
- Join Supabase Discord: https://discord.supabase.com
