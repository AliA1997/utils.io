import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const useSupabase = (): SupabaseClient | null => {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    // Replace with your Supabase project URL and key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const client = createClient(supabaseUrl, supabaseKey);
    setSupabase(client);

  }, []);

  return supabase;
};

export default useSupabase;
