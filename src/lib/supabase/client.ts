import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates or retrieves the singleton Supabase client for Browser / Client Components.
 * Strictly uses environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
 */
export function createClient() {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseUrl || !supabaseKey) {
    if (typeof window !== "undefined") {
      console.warn(
        "[Supabase Client] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local"
      );
    }
  }

  client = createBrowserClient<Database>(supabaseUrl, supabaseKey);

  return client;
}

export const supabase = createClient();
