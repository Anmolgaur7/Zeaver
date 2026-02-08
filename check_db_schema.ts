
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
  console.log('--- CHECKING REVIEWS TABLE ---');
  
  // Fetch one review to see its structure
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('*')
    .limit(1);

  if (error) {
    console.log('Error fetching reviews:', error);
  } else {
    console.log('Reviews Sample:', JSON.stringify(reviews, null, 2));
  }
  
  // Check user_profiles too
  console.log('\n--- CHECKING USER_PROFILES TABLE ---');
  const { data: profiles, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .limit(1);

  if (profileError) {
    console.log('Error fetching user_profiles:', profileError);
  } else {
    console.log('User Profiles Sample:', JSON.stringify(profiles, null, 2));
  }
}

checkSchema();
