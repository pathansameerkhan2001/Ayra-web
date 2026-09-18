import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, Wishlist, WishlistItemWithProduct } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface WishlistQueryResult {
  data: Wishlist | null;
  error: Error | null;
}

export interface WishlistItemsQueryResult {
  data: WishlistItemWithProduct[] | null;
  count: number;
  error: Error | null;
}

/**
 * Fetches the primary wishlist for a given customer ID.
 */
export async function getWishlistByCustomerId(
  customerId: string,
  client?: SupabaseClient<Database>
): Promise<WishlistQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("customer_id", customerId)
      .maybeSingle();

    if (error) {
      console.error(`[Wishlist Service] Failed to fetch wishlist for customer "${customerId}":`, error.message);
      return { data: null, error: new Error(error.message) };
    }

    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching wishlist";
    console.error("[Wishlist Service] Unexpected error:", message);
    return { data: null, error: new Error(message) };
  }
}

/**
 * Fetches all items in a wishlist with active product info and primary images.
 */
export async function getWishlistItems(
  wishlistId: string,
  client?: SupabaseClient<Database>
): Promise<WishlistItemsQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data: rawItems, error } = await supabase
      .from("wishlist_items")
      .select(`
        *,
        product:products (
          *,
          images:product_images (*)
        )
      `)
      .eq("wishlist_id", wishlistId);

    if (error) {
      console.error(`[Wishlist Service] Failed to fetch items for wishlist "${wishlistId}":`, error.message);
      return { data: null, count: 0, error: new Error(error.message) };
    }

    if (!rawItems) {
      return { data: [], count: 0, error: null };
    }

    const items = rawItems as unknown as WishlistItemWithProduct[];
    return { data: items, count: items.length, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching wishlist items";
    console.error("[Wishlist Service] Unexpected error:", message);
    return { data: null, count: 0, error: new Error(message) };
  }
}
