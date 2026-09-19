import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, Category } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getStoragePublicUrl } from "@/lib/supabase/storage";

export interface CategoryQueryResult {
  data: Category[] | null;
  error: Error | null;
}

export interface SingleCategoryQueryResult {
  data: Category | null;
  error: Error | null;
}

/**
 * Normalizes a category record to ensure its image_url is fully resolved via Supabase storage.
 */
function normalizeCategory(cat: Category): Category {
  return {
    ...cat,
    image_url: cat.image_url ? getStoragePublicUrl(cat.image_url) : `/images/occasions/${cat.slug}.jpg`,
  };
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
      console.warn("[Categories Service] Note fetching categories:", error.message);
      return { data: null, error: new Error(error.message) };
    }

    const normalized = (data || []).map(normalizeCategory);
    return { data: normalized, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching categories";
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
      return { data: null, error: new Error(error.message) };
    }

    return { data: data ? normalizeCategory(data) : null, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching category";
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
      return { data: null, error: new Error(error.message) };
    }

    return { data: data ? normalizeCategory(data) : null, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching category";
    return { data: null, error: new Error(message) };
  }
}
