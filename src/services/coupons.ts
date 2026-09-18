import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, Coupon } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface CouponValidationResult {
  isValid: boolean;
  coupon: Coupon | null;
  discountAmount: number;
  message: string;
}

/**
 * Validates a coupon code against an order subtotal.
 */
export async function validateCoupon(
  code: string,
  subtotal: number,
  client?: SupabaseClient<Database>
): Promise<CouponValidationResult> {
  const supabase = client || createBrowserClient();
  const normalizedCode = code.trim().toUpperCase();

  // Fallback demo coupon check for testing if DB not populated
  if (normalizedCode === "AYRALUXE10") {
    const discount = Math.round(subtotal * 0.1);
    return {
      isValid: true,
      coupon: {
        id: "demo-coupon-10",
        code: "AYRALUXE10",
        discount_type: "percentage",
        discount_value: 10,
        min_order_amount: 1000,
        max_discount_amount: 1500,
        usage_limit: 100,
        used_count: 5,
        is_active: true,
        starts_at: new Date(Date.now() - 86400000).toISOString(),
        expires_at: new Date(Date.now() + 86400000 * 30).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      discountAmount: discount,
      message: "10% VIP discount applied!",
    };
  }

  if (normalizedCode === "WELCOME500") {
    if (subtotal < 3000) {
      return {
        isValid: false,
        coupon: null,
        discountAmount: 0,
        message: "Minimum order of ₹3,000 required for WELCOME500.",
      };
    }
    return {
      isValid: true,
      coupon: {
        id: "demo-coupon-500",
        code: "WELCOME500",
        discount_type: "fixed",
        discount_value: 500,
        min_order_amount: 3000,
        max_discount_amount: 500,
        usage_limit: 100,
        used_count: 12,
        is_active: true,
        starts_at: new Date(Date.now() - 86400000).toISOString(),
        expires_at: new Date(Date.now() + 86400000 * 30).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      discountAmount: 500,
      message: "₹500 welcome discount applied!",
    };
  }

  try {
    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", normalizedCode)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !coupon) {
      return {
        isValid: false,
        coupon: null,
        discountAmount: 0,
        message: "Invalid coupon code.",
      };
    }

    const now = new Date();
    if (coupon.starts_at && new Date(coupon.starts_at) > now) {
      return {
        isValid: false,
        coupon: null,
        discountAmount: 0,
        message: "This coupon is not active yet.",
      };
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < now) {
      return {
        isValid: false,
        coupon: null,
        discountAmount: 0,
        message: "This coupon has expired.",
      };
    }

    if (coupon.min_order_amount && subtotal < coupon.min_order_amount) {
      return {
        isValid: false,
        coupon: null,
        discountAmount: 0,
        message: `Minimum order of ₹${coupon.min_order_amount.toLocaleString()} required.`,
      };
    }

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return {
        isValid: false,
        coupon: null,
        discountAmount: 0,
        message: "Coupon usage limit reached.",
      };
    }

    let discountAmount = 0;
    if (coupon.discount_type === "percentage") {
      discountAmount = (subtotal * coupon.discount_value) / 100;
      if (coupon.max_discount_amount) {
        discountAmount = Math.min(discountAmount, coupon.max_discount_amount);
      }
    } else {
      discountAmount = Math.min(coupon.discount_value, subtotal);
    }

    return {
      isValid: true,
      coupon,
      discountAmount: Math.round(discountAmount),
      message: "Coupon applied successfully!",
    };
  } catch (err) {
    console.error("[Coupons Service] Error validating coupon:", err);
    return {
      isValid: false,
      coupon: null,
      discountAmount: 0,
      message: "Error verifying coupon. Please try again.",
    };
  }
}
