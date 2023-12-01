import { createClient } from "@supabase/supabase-js";

const supabaseAnonKey = import.meta.env.VITE_REACT_APP_ANON_KEY as string;
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL as string;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
