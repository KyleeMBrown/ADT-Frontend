
import { createClient } from '@supabase/supabase-js';
// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Your Supabase URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Your Supabase Anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_ANON_KEY);