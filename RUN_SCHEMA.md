# 🚀 Run Database Schema - Step by Step

## ✅ What You Need:
- ✅ Supabase account created
- ✅ Project created
- ✅ `.env.local` file created (DONE!)

---

## 📋 **Follow These Steps:**

### Step 1: Open SQL Editor
1. Go to your Supabase dashboard: https://app.supabase.com
2. Click on your project (`zeaver-ecommerce`)
3. In the left sidebar, click **"SQL Editor"**

### Step 2: Create New Query
1. Click the **"New Query"** button (top right)
2. You'll see an empty SQL editor

### Step 3: Copy the Schema
1. Open the file: `supabase/schema.sql` in your project
2. **Select ALL** the code (Ctrl+A)
3. **Copy** it (Ctrl+C)

### Step 4: Paste and Run
1. Go back to Supabase SQL Editor
2. **Paste** the code (Ctrl+V)
3. Click **"Run"** button (or press Ctrl+Enter)
4. Wait 10-20 seconds

### Step 5: Verify Success
You should see: **"Success. No rows returned"**

---

## ✅ **Verify Tables Were Created:**

1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ categories (with 5 default categories)
   - ✅ products (with 5 sample products)
   - ✅ carts
   - ✅ cart_items
   - ✅ orders
   - ✅ order_items
   - ✅ reviews
   - ✅ wishlists
   - ✅ user_profiles
   - ✅ newsletter_subscribers
   - ✅ promo_codes

3. Click on **"products"** table
4. You should see 5 sample products!

---

## 🎉 **You're Done!**

Your database is now set up with:
- ✅ All tables created
- ✅ Security policies enabled
- ✅ Sample data loaded
- ✅ Ready to use!

---

## 🔥 **Next Step: Test the Connection**

Run your development server:
```bash
npm run dev
```

Open http://localhost:3000 - your site should load!

---

## ❌ **Troubleshooting:**

**If you see an error:**
1. Make sure you copied the ENTIRE schema file
2. Check that you're in the correct project
3. Try running the query again

**If tables don't appear:**
1. Refresh the page
2. Check the SQL Editor for error messages
3. Make sure the query completed successfully

---

## 📞 **Need Help?**

Let me know if you encounter any issues!
