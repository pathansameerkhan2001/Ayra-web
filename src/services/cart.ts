import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, Cart, CartItemWithProduct } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface CartQueryResult {
  data: Cart | null;
  error: Error | null;
}

export interface CartItemsQueryResult {
  data: CartItemWithProduct[] | null;
  subtotal: number;
  itemCount: number;
  error: Error | null;
}

/**
 * Fetches an existing cart by its primary ID.
 */
export async function getCartById(
  cartId: string,
  client?: SupabaseClient<Database>
): Promise<CartQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("carts")
      .select("*")
      .eq("id", cartId)
      .maybeSingle();

    if (error) {
      console.error(`[Cart Service] Failed to fetch cart "${cartId}":`, error.message);
      return { data: null, error: new Error(error.message) };
    }

    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching cart";
    console.error("[Cart Service] Unexpected error:", message);
    return { data: null, error: new Error(message) };
  }
}

/**
 * Fetches all items in a cart with verified database product details, images, and variants.
 * Computes official database-backed subtotal (never trusts client-supplied prices).
 */
export async function getCartItems(
  cartId: string,
  client?: SupabaseClient<Database>
): Promise<CartItemsQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data: rawItems, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        product:products (
          *,
          images:product_images (*)
        ),
        variant:product_variants (*)
      `)
      .eq("cart_id", cartId);

    if (error) {
      console.error(`[Cart Service] Failed to fetch items for cart "${cartId}":`, error.message);
      return { data: null, subtotal: 0, itemCount: 0, error: new Error(error.message) };
    }

    if (!rawItems) {
      return { data: [], subtotal: 0, itemCount: 0, error: null };
    }

    const items = rawItems as unknown as CartItemWithProduct[];

    // Calculate subtotal from validated database prices
    let subtotal = 0;
    let itemCount = 0;

    for (const item of items) {
      if (item.product && item.product.is_active) {
        const basePrice = Number(item.product.base_price) || 0;
        const variantAdjustment = Number(item.variant?.price_adjustment) || 0;
        const unitPrice = Math.max(0, basePrice + variantAdjustment);
        const qty = Math.max(1, item.quantity);

        subtotal += unitPrice * qty;
        itemCount += qty;
      }
    }

    return { data: items, subtotal, itemCount, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error fetching cart items";
    console.error("[Cart Service] Unexpected error:", message);
    return { data: null, subtotal: 0, itemCount: 0, error: new Error(message) };
  }
}
