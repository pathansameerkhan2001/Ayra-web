import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, Review } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface ReviewQueryResult {
  data: Review[] | null;
  error: Error | null;
}

export interface ReviewSubmissionInput {
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
}

/**
 * Fetches approved reviews for a specific product.
 */
export async function getProductReviews(
  productId: string,
  client?: SupabaseClient<Database>
): Promise<ReviewQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Reviews Service] Error fetching reviews:", error.message);
      return { data: [], error: new Error(error.message) };
    }

    return { data: data || [], error: null };
  } catch (err) {
    console.error("[Reviews Service] Unexpected error:", err);
    return { data: [], error: err as Error };
  }
}

/**
 * Submits a new customer review (defaults to unapproved for moderation).
 */
export async function submitReview(
  input: ReviewSubmissionInput,
  client?: SupabaseClient<Database>
): Promise<{ success: boolean; message: string }> {
  const supabase = client || createBrowserClient();

  try {
    const { error } = await supabase.from("reviews").insert({
      product_id: input.productId,
      customer_id: null,
      reviewer_name: input.customerName,
      rating: input.rating,
      title: input.title,
      comment: input.comment,
      is_approved: false, // Moderated
      is_verified_buyer: true,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return {
      success: true,
      message: "Thank you! Your review has been submitted for moderation.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to submit review. Please try again.",
    };
  }
}
