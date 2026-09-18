import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

/**
 * Creates a Supabase client for Server Components, Server Actions, and Route Handlers.
 * Uses next/headers cookies to manage authentication session tokens securely.
 */
export function createClient() {
  const cookieStore = cookies();

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isValidUrl = Boolean(rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")));
  const supabaseUrl = isValidUrl ? (rawUrl as string) : "https://placeholder-project.supabase.co";

  const rawKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseKey = (rawKey && rawKey.length > 5) ? rawKey : "placeholder-publishable-key";

  if (!isValidUrl || !rawKey) {
    console.warn(
      "[Supabase Server] Using placeholder credentials. Configure NEXT_PUBLIC_SUPABASE_URL with a valid https:// URL in .env.local for live database connection."
    );
  }

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
