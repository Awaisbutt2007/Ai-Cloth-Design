import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ktihjcuqvybztmezhadl.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_lqHGW4gIZTJSex4UsbnjXg_NkNmm-cs';

export const supabase = createClient(supabaseUrl, supabaseKey);
