
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

async function checkSchema() {
  console.log('--- CHECKING ORDERS TABLE ---');
  
  // Try to insert a dummy order without user_id to see if it fails (dry run if possible, or just check error)
  // Actually, better to just check if we can fetch structure or infer from error.
  // Since we can't easily query information_schema with supabase-js directly without SQL editor access usually,
  // I'll try to insert a dummy row with everything valid but NO user_id, and see if it throws a specific constraint error.
  
  const dummyOrder = {
    order_number: `TEST-${Date.now()}`,
    status: 'pending',
    subtotal: 10,
    shipping_cost: 5,
    tax: 0,
    total: 15,
    shipping_name: 'Test Guest',
    shipping_email: 'test@guest.com',
    shipping_address: '123 Test St',
    shipping_city: 'Test City',
    shipping_state: 'Test State',
    shipping_postal_code: '12345',
    shipping_country: 'India',
    payment_status: 'pending'
    // user_id omitted
  };

  console.log('Attempting to insert guest order...');
  const { data, error } = await supabase
    .from('orders')
    .insert(dummyOrder)
    .select()
    .single();

  if (error) {
    console.log('Insert failed:', error.message);
    if (error.message.includes('null value in column "user_id"')) {
      console.log('CONCLUSION: user_id is NOT nullable. Guest checkout needs schema change.');
    } else {
      console.log('CONCLUSION: Error is unrelated to user_id, or user_id IS nullable.');
    }
  } else {
    console.log('Insert SUCCESS. Guest checkout is supported!');
    // Clean up
    await supabase.from('orders').delete().eq('id', data.id);
    console.log('Cleaned up test order.');
  }
}

checkSchema();
