import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, Category } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface CategoryQueryResult {
  data: Category[] | null;
  error: Error | null;
}

export interface SingleCategoryQueryResult {
  data: Category | null;
  error: Error | null;
}

/**
 * Fetches all active categories ordered by `sort_order` ascending.
 */
export async function getActiveCategories(
  client?: SupabaseClient<Database>
): Promise<CategoryQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[Categories Service] Failed to fetch active categories:", error.message);
      return { data: null, error: new Error(error.message) };
    }

    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching categories";
    console.error("[Categories Service] Unexpected error:", message);
    return { data: null, error: new Error(message) };
  }
}

/**
 * Fetches a single category by its URL slug.
 */
export async function getCategoryBySlug(
  slug: string,
  client?: SupabaseClient<Database>
): Promise<SingleCategoryQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error(`[Categories Service] Failed to fetch category by slug "${slug}":`, error.message);
      return { data: null, error: new Error(error.message) };
    }

    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching category";
    console.error("[Categories Service] Unexpected error:", message);
    return { data: null, error: new Error(message) };
  }
}

/**
 * Fetches a single category by its primary ID.
 */
export async function getCategoryById(
  id: string,
  client?: SupabaseClient<Database>
): Promise<SingleCategoryQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`[Categories Service] Failed to fetch category by ID "${id}":`, error.message);
      return { data: null, error: new Error(error.message) };
    }

    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching category";
    console.error("[Categories Service] Unexpected error:", message);
    return { data: null, error: new Error(message) };
  }
}
