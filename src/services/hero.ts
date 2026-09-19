import { createClient as createBrowserClient } from "@/lib/supabase/client";
import type { Database, HeroSlide } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getStoragePublicUrl } from "@/lib/supabase/storage";

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Curated with Love.\nWrapped with Care.",
    subtitle:
      "Handcrafted luxury hampers designed to turn every special occasion into an unforgettable memory.",
    badge: "Bespoke Luxury Gifting",
    image_url: "/images/hero-slide-1.jpg",
    cta_text: "Explore Hampers",
    cta_link: "/products",
    secondary_cta_text: "Custom Gifting",
    secondary_cta_link: "/collections/corporate-gifting",
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "slide-2",
    title: "Timeless Moments,\nArtfully Gifted.",
    subtitle:
      "From intimate romantic anniversaries to grandeur festive celebrations, discover perfection in every detail.",
    badge: "The Signature Collection",
    image_url: "/images/hero-slide-2.jpg",
    cta_text: "Discover Occasions",
    cta_link: "/#occasions",
    secondary_cta_text: "View Best Sellers",
    secondary_cta_link: "/products?sort=featured",
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getActiveHeroSlides(
  client?: SupabaseClient<Database>
): Promise<HeroSlide[]> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_HERO_SLIDES.map((slide) => ({
        ...slide,
        image_url: getStoragePublicUrl(slide.image_url),
      }));
    }

    return (data as unknown as HeroSlide[]).map((slide) => ({
      ...slide,
      image_url: getStoragePublicUrl(slide.image_url),
    }));
  } catch (err) {
    return DEFAULT_HERO_SLIDES.map((slide) => ({
      ...slide,
      image_url: getStoragePublicUrl(slide.image_url),
    }));
  }
}
