
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = fs.readFileSync(envPath, 'utf8');
const env: Record<string, string> = {};
envConfig.split('\n').forEach((line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim().replace(/"/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function debugProducts() {
  console.log('--- DEBUGGING PRODUCTS ---');
  
  // 1. Fetch ALL products (ignoring is_active)
  console.log('1. Fetching first 5 products (ignoring is_active)...');
  const { data: allProducts, error: error1 } = await supabase
    .from('products')
    .select('id, name, is_active, price')
    .limit(5);
    
  if (error1) console.error('Error 1:', error1);
  else console.log('All Products Sample:', JSON.stringify(allProducts, null, 2));

  // 2. Fetch specific problematic ID if we knew it (we don't, so skipping)

  // 3. Test the exact query used in the app
  console.log('\n2. Testing getProductById query mechanism...');
  if (allProducts && allProducts.length > 0) {
    const testId = allProducts[0].id;
    console.log(`Testing fetch for ID: ${testId}`);
    
    const { data: singleProduct, error: error2 } = await supabase
      .from('products')
      .select('*')
      .eq('id', testId)
      .eq('is_active', true)
      .single();
      
    if (error2) console.error('Error 2 (App Query):', error2);
    else console.log('Single Product Result:', singleProduct ? 'Found' : 'Null');
  }
}

debugProducts();
