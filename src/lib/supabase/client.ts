import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates or retrieves the singleton Supabase client for Browser / Client Components.
 * Uses environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or ANON_KEY).
 */
export function createClient() {
  if (client) return client;

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isValidUrl = Boolean(rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")));
  const supabaseUrl = isValidUrl ? (rawUrl as string) : "https://placeholder-project.supabase.co";

  const rawKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseKey = (rawKey && rawKey.length > 5) ? rawKey : "placeholder-publishable-key";

  if (!isValidUrl || !rawKey) {
    console.warn(
      "[Supabase Client] Using placeholder credentials. Configure NEXT_PUBLIC_SUPABASE_URL with a valid https:// URL in .env.local for live database connection."
    );
  }

  client = createBrowserClient<Database>(supabaseUrl, supabaseKey);

  return client;
}

export const supabase = createClient();
