import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, InstagramReel } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export const DEFAULT_INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: "reel-1",
    title: "Unboxing the Royal Velvet Rose Hamper",
    reel_url: "https://www.instagram.com/reel/ayrahampers_1",
    thumbnail_url: "/images/occasions/birthday.jpg",
    likes_count: 2450,
    comments_count: 142,
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "reel-2",
    title: "Handcrafting Luxury Festive Moments",
    reel_url: "https://www.instagram.com/reel/ayrahampers_2",
    thumbnail_url: "/images/occasions/diwali-gifts.jpg",
    likes_count: 3820,
    comments_count: 219,
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "reel-3",
    title: "Pastel Sweet Beginnings for New Borns",
    reel_url: "https://www.instagram.com/reel/ayrahampers_3",
    thumbnail_url: "/images/occasions/new-born.jpg",
    likes_count: 1980,
    comments_count: 98,
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "reel-4",
    title: "The Art of Romantic Anniversary Gifting",
    reel_url: "https://www.instagram.com/reel/ayrahampers_4",
    thumbnail_url: "/images/occasions/anniversary.jpg",
    likes_count: 4210,
    comments_count: 304,
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "reel-5",
    title: "Bespoke Corporate VIP Hampers",
    reel_url: "https://www.instagram.com/reel/ayrahampers_5",
    thumbnail_url: "/images/occasions/corporate-gifting.jpg",
    likes_count: 1540,
    comments_count: 67,
    display_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "reel-6",
    title: "Gratitude Wrapped in Cream & Satin",
    reel_url: "https://www.instagram.com/reel/ayrahampers_6",
    thumbnail_url: "/images/occasions/thank-you.jpg",
    likes_count: 2890,
    comments_count: 173,
    display_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/**
 * Fetches active Instagram reels from database or returns luxury presets.
 */
export async function getActiveReels(
  client?: SupabaseClient<Database>
): Promise<InstagramReel[]> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("instagram_reels")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_INSTAGRAM_REELS;
    }

    return (data as unknown as InstagramReel[]) || DEFAULT_INSTAGRAM_REELS;
  } catch (err) {
    return DEFAULT_INSTAGRAM_REELS;
  }
}
