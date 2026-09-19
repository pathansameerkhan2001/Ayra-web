import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { getStoragePublicUrl } from "@/lib/supabase/storage";
import type {
  Database,
  Product,
  ProductImage,
  ProductVariant,
  ProductWithDetails,
} from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface ProductsQueryOptions {
  limit?: number;
  offset?: number;
  sortBy?: "sort_order" | "created_at" | "base_price" | "name";
  sortOrder?: "asc" | "desc";
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  featuredOnly?: boolean;
}

export interface ProductsQueryResult {
  data: Product[] | null;
  count?: number | null;
  error: Error | null;
}

export interface SingleProductQueryResult {
  data: ProductWithDetails | null;
  error: Error | null;
}

// Fallback high-luxury catalog presets (for immediate SSR hydration & zero-empty states)
export const FALLBACK_PRODUCTS: ProductWithDetails[] = [
  {
    id: "prod-1",
    category_id: "birthday",
    name: "The Royal Blush Birthday Hamper",
    slug: "royal-blush-birthday-hamper",
    tagline: "Blush blooms, handcrafted artisanal chocolates & scented soy candle",
    description:
      "A breathtaking celebration of beauty and delight. The Royal Blush Hamper combines handcrafted Belgian truffles, our signature rose petal scented candle, artisanal almond crunch, and a bespoke gold-foiled keepsake box finished with a double-satin ribbon.",
    details: {
      inclusions: [
        "Handcrafted Belgian Truffles Box (12 pcs)",
        "Rose Petal & Amber Soy Wax Candle (220g)",
        "Artisanal Almond Butter Cookies (180g)",
        "Gold-Embossed Keepsake Greeting Card",
        "Luxury Rigid Ivory Gift Box with Satin Bow",
      ],
      dimensions: "32cm x 26cm x 14cm",
      care: "Store confections in a cool, dry place away from direct sunlight.",
    },
    base_price: 4499,
    compare_at_price: 5299,
    is_active: true,
    is_featured: true,
    is_new: true,
    is_bestseller: true,
    sku: "AYRA-BDAY-001",
    barcode: "890123456001",
    sort_order: 1,
    meta_title: "The Royal Blush Birthday Hamper | Ayra Luxury Gifting",
    meta_description: "Celebrate birthdays with luxury. Blush floral hamper with artisanal sweets and gifts.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "img-1",
        product_id: "prod-1",
        image_url: "/images/occasions/birthday.jpg",
        alt_text: "The Royal Blush Birthday Hamper Primary View",
        is_primary: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
    variants: [
      {
        id: "var-1-1",
        product_id: "prod-1",
        name: "Classic Ivory Box",
        sku: "AYRA-BDAY-001-IV",
        price_adjustment: 0,
        is_active: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "var-1-2",
        product_id: "prod-1",
        name: "Blush Rose Velvet Box",
        sku: "AYRA-BDAY-001-BL",
        price_adjustment: 500,
        is_active: true,
        sort_order: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    category: {
      id: "birthday",
      name: "Birthday",
      slug: "birthday",
      description: "Celebrate milestones with handcrafted elegance.",
      image_url: "/images/occasions/birthday.jpg",
      is_active: true,
      sort_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "prod-2",
    category_id: "anniversary",
    name: "Eternal Rose & Gold Anniversary Trunk",
    slug: "eternal-rose-gold-anniversary-trunk",
    tagline: "Romantic peach florals, crystal champagne flutes & gourmet treats",
    description:
      "Designed for romance that lasts forever. Features twin gold-rimmed crystal flutes, sparkling organic elderflower blend, rose-scented bath elixir, and French macaron treats encased in a velvet-lined luxury trunk.",
    details: {
      inclusions: [
        "Pair of 24k Gold-Rimmed Crystal Champagne Flutes",
        "French Rose Macaron Selection (8 pcs)",
        "Romantic Rose & Jasmine Bath Elixir (250ml)",
        "Artisanal Single-Origin Dark Chocolate Bar (100g)",
        "Embossed Love Keepsake Certificate Card",
      ],
      dimensions: "36cm x 30cm x 16cm",
    },
    base_price: 6899,
    compare_at_price: 7999,
    is_active: true,
    is_featured: true,
    is_new: false,
    is_bestseller: true,
    sku: "AYRA-ANNV-002",
    barcode: "890123456002",
    sort_order: 2,
    meta_title: "Eternal Rose & Gold Anniversary Trunk | Ayra Hampers",
    meta_description: "Celebrate your love story with handcrafted luxury romantic gift hampers.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "img-2",
        product_id: "prod-2",
        image_url: "/images/occasions/anniversary.jpg",
        alt_text: "Eternal Rose & Gold Anniversary Trunk",
        is_primary: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
    variants: [],
    category: {
      id: "anniversary",
      name: "Anniversary",
      slug: "anniversary",
      description: "Cherish love stories with romantic luxury hampers.",
      image_url: "/images/occasions/anniversary.jpg",
      is_active: true,
      sort_order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "prod-3",
    category_id: "diwali-gifts",
    name: "Grand Imperial Diwali Royal Chest",
    slug: "grand-imperial-diwali-royal-chest",
    tagline: "Brass diya lantern, royal saffron sweets, silver coins & dry fruits",
    description:
      "An opulent tribute to the festival of lights. Handcrafted brass diya lamp, 24k edible gold foil motichoor laddus, roasted Iranian pistachios, Afghani cashews, and aromatic botanical dhoop cones in a majestic emerald and gold festive chest.",
    details: {
      inclusions: [
        "Solid Handcrafted Brass Diya Lantern",
        "Royal Saffron Motichoor Laddus (500g)",
        "Jumbo Iranian Roasted Salted Pistachios (200g)",
        "Premium Kashmiri Walnuts & Afghani Cashews (400g)",
        "Natural Botanical Dhoop Cones & Brass Stand",
      ],
      dimensions: "40cm x 32cm x 18cm",
    },
    base_price: 5999,
    compare_at_price: 6999,
    is_active: true,
    is_featured: true,
    is_new: true,
    is_bestseller: true,
    sku: "AYRA-DWL-003",
    barcode: "890123456003",
    sort_order: 3,
    meta_title: "Grand Imperial Diwali Royal Chest | Ayra Festive Hampers",
    meta_description: "Luxury Indian festive gifting with brass diya, sweets, and gourmet nuts.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "img-3",
        product_id: "prod-3",
        image_url: "/images/occasions/diwali-gifts.jpg",
        alt_text: "Grand Imperial Diwali Royal Chest",
        is_primary: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
    variants: [],
    category: {
      id: "diwali-gifts",
      name: "Diwali Gifts",
      slug: "diwali-gifts",
      description: "Celebrate the warmth and light of Diwali.",
      image_url: "/images/occasions/diwali-gifts.jpg",
      is_active: true,
      sort_order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "prod-4",
    category_id: "new-born",
    name: "Sweet Dreams Pastel Newborn Welcome Set",
    slug: "sweet-dreams-pastel-newborn-set",
    tagline: "Organic cotton swaddle, plush teddy, silver rattle & keepsake journal",
    description:
      "A heavenly gift basket crafted to welcome precious new life. Includes an ultra-soft organic muslin swaddle, plush heirloom teddy bear, pure silver keepsake rattle, baby knit booties, and a milestone memory journal.",
    details: {
      inclusions: [
        "Heirloom Plush Cashmere-Touch Teddy Bear",
        "100% Organic Bamboo-Cotton Muslin Swaddle",
        "Solid Silver-Plated Keepsake Baby Rattle",
        "Hand-Knitted Soft Merino Wool Booties",
        "Baby Milestones Hardcover Memory Book",
      ],
      dimensions: "34cm x 28cm x 15cm",
    },
    base_price: 3799,
    compare_at_price: 4499,
    is_active: true,
    is_featured: true,
    is_new: true,
    is_bestseller: false,
    sku: "AYRA-BBY-004",
    barcode: "890123456004",
    sort_order: 4,
    meta_title: "Sweet Dreams Pastel Newborn Welcome Set | Ayra Hampers",
    meta_description: "Celebrate new beginnings with our gentle, organic luxury newborn hampers.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "img-4",
        product_id: "prod-4",
        image_url: "/images/occasions/new-born.jpg",
        alt_text: "Sweet Dreams Pastel Newborn Welcome Set",
        is_primary: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
    variants: [],
    category: {
      id: "new-born",
      name: "New Born",
      slug: "new-born",
      description: "Gentle pastel hampers for precious new beginnings.",
      image_url: "/images/occasions/new-born.jpg",
      is_active: true,
      sort_order: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "prod-5",
    category_id: "thank-you",
    name: "Artisan Gratitude & Gourmet Keepsake",
    slug: "artisan-gratitude-gourmet-keepsake",
    tagline: "Single-origin preserves, peach candle, artisan biscuits & linen tote",
    description:
      "A graceful and heartfelt expression of appreciation. Presented in an artisan cream structured linen tote with satin ribbon, featuring honeyed peach conserve, Earl Grey biscuits, aromatic candle, and hand-tied dried florals.",
    details: {
      inclusions: [
        "Artisan Peach & Wild Blossom Honey Conserve (220g)",
        "Peach Blossom & Amber Scented Soy Candle",
        "Artisanal French Butter Sablés (180g)",
        "Everlasting Dried Floral Posy",
        "Structured Cream Artisan Canvas Tote Bag",
      ],
      dimensions: "30cm x 24cm x 12cm",
    },
    base_price: 3299,
    compare_at_price: 3899,
    is_active: true,
    is_featured: true,
    is_new: false,
    is_bestseller: true,
    sku: "AYRA-THX-005",
    barcode: "890123456005",
    sort_order: 5,
    meta_title: "Artisan Gratitude & Gourmet Keepsake | Ayra Hampers",
    meta_description: "Say thank you with curated artisan confections, florals, and keepsakes.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "img-5",
        product_id: "prod-5",
        image_url: "/images/occasions/thank-you.jpg",
        alt_text: "Artisan Gratitude & Gourmet Keepsake",
        is_primary: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
    variants: [],
    category: {
      id: "thank-you",
      name: "Thank You",
      slug: "thank-you",
      description: "Heartfelt gratitude wrapped in luxury.",
      image_url: "/images/occasions/thank-you.jpg",
      is_active: true,
      sort_order: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "prod-6",
    category_id: "corporate-gifting",
    name: "Executive Heritage Matte Black & Gold Trunk",
    slug: "executive-heritage-corporate-trunk",
    tagline: "Gold fountain pen, Italian leather journal, dark truffles & almonds",
    description:
      "A distinguished statement of prestige and professional excellence. Encased in a matte black gold-embossed executive trunk with gold hardware, containing an executive pen, Italian leather notebook, dark roast coffee beans, and gold dusted truffles.",
    details: {
      inclusions: [
        "Weighted 24k Gold Accented Executive Fountain Pen",
        "Hand-Bound Italian Leather A5 Daily Journal",
        "Gold-Dusted Single-Origin Dark Truffles (8 pcs)",
        "Roasted Smoked Californian Almonds (200g)",
        "Matte Black Presentation Box with Gold Ribbon",
      ],
      dimensions: "38cm x 30cm x 15cm",
    },
    base_price: 7499,
    compare_at_price: 8999,
    is_active: true,
    is_featured: true,
    is_new: true,
    is_bestseller: true,
    sku: "AYRA-CORP-006",
    barcode: "890123456006",
    sort_order: 6,
    meta_title: "Executive Heritage Corporate Trunk | Ayra Hampers",
    meta_description: "Prestige corporate gifting for executives, partners, and VIP clients.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: [
      {
        id: "img-6",
        product_id: "prod-6",
        image_url: "/images/occasions/corporate-gifting.jpg",
        alt_text: "Executive Heritage Matte Black & Gold Trunk",
        is_primary: true,
        sort_order: 1,
        created_at: new Date().toISOString(),
      },
    ],
    variants: [],
    category: {
      id: "corporate-gifting",
      name: "Corporate Gifting",
      slug: "corporate-gifting",
      description: "Sophisticated executive gifting for distinguished partners.",
      image_url: "/images/occasions/corporate-gifting.jpg",
      is_active: true,
      sort_order: 6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
];

/**
 * Fetches all active products with pagination, sorting, and category filters.
 */
export async function getActiveProducts(
  options: ProductsQueryOptions = {},
  client?: SupabaseClient<Database>
): Promise<ProductsQueryResult> {
  const supabase = client || createBrowserClient();
  const {
    limit = 24,
    offset = 0,
    sortBy = "sort_order",
    sortOrder = "asc",
    categorySlug,
    minPrice,
    maxPrice,
    featuredOnly,
  } = options;

  try {
    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("is_active", true);

    if (featuredOnly) {
      query = query.eq("is_featured", true);
    }

    if (minPrice !== undefined) {
      query = query.gte("base_price", minPrice);
    }

    if (maxPrice !== undefined) {
      query = query.lte("base_price", maxPrice);
    }

    query = query.order(sortBy, { ascending: sortOrder === "asc" }).range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error || !data || data.length === 0) {
      // Return fallback dataset with filters applied
      let filtered = [...FALLBACK_PRODUCTS];
      if (categorySlug) {
        filtered = filtered.filter((p) => p.category?.slug === categorySlug || p.category_id === categorySlug);
      }
      if (featuredOnly) {
        filtered = filtered.filter((p) => p.is_featured);
      }
      if (minPrice !== undefined) {
        filtered = filtered.filter((p) => p.base_price >= minPrice);
      }
      if (maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.base_price <= maxPrice);
      }
      if (sortBy === "base_price") {
        filtered.sort((a, b) => (sortOrder === "asc" ? a.base_price - b.base_price : b.base_price - a.base_price));
      }
      return { data: filtered, count: filtered.length, error: null };
    }

    return { data, count, error: null };
  } catch (err) {
    return { data: FALLBACK_PRODUCTS, count: FALLBACK_PRODUCTS.length, error: null };
  }
}

/**
 * Fetches featured products for the storefront homepage & highlights.
 */
export async function getFeaturedProducts(
  limit: number = 8,
  client?: SupabaseClient<Database>
): Promise<ProductsQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(limit);

    if (error || !data || data.length === 0) {
      const fallbackFeatured = FALLBACK_PRODUCTS.filter((p) => p.is_featured).slice(0, limit);
      return { data: fallbackFeatured, error: null };
    }

    return { data, error: null };
  } catch (err) {
    const fallbackFeatured = FALLBACK_PRODUCTS.filter((p) => p.is_featured).slice(0, limit);
    return { data: fallbackFeatured, error: null };
  }
}

/**
 * Fetches newly arrived products.
 */
export async function getNewProducts(
  limit: number = 8,
  client?: SupabaseClient<Database>
): Promise<ProductsQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("is_new", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) {
      const fallbackNew = FALLBACK_PRODUCTS.filter((p) => p.is_new).slice(0, limit);
      return { data: fallbackNew, error: null };
    }

    return { data, error: null };
  } catch (err) {
    const fallbackNew = FALLBACK_PRODUCTS.filter((p) => p.is_new).slice(0, limit);
    return { data: fallbackNew, error: null };
  }
}

/**
 * Fetches a single product by its unique slug.
 */
export async function getProductBySlug(
  slug: string,
  client?: SupabaseClient<Database>
): Promise<SingleProductQueryResult> {
  const supabase = client || createBrowserClient();

  try {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    if (productError || !product) {
      const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
      if (fallback) return { data: fallback, error: null };
      return { data: null, error: null };
    }

    const [imagesRes, variantsRes, categoryRes] = await Promise.all([
      supabase
        .from("product_images")
        .select("*")
        .eq("product_id", product.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", product.id)
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      product.category_id
        ? supabase.from("categories").select("*").eq("id", product.category_id).maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);

    const productWithDetails: ProductWithDetails = {
      ...product,
      images: imagesRes.data && imagesRes.data.length > 0 ? imagesRes.data : [
        {
          id: `img-${product.id}`,
          product_id: product.id,
          image_url: "/images/occasions/birthday.jpg",
          alt_text: product.name,
          is_primary: true,
          sort_order: 1,
          created_at: new Date().toISOString(),
        },
      ],
      variants: variantsRes.data || [],
      category: categoryRes.data || null,
    };

    return { data: productWithDetails, error: null };
  } catch (err) {
    const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    return { data: fallback || null, error: null };
  }
}

/**
 * Fetches products belonging to a specific category.
 */
export async function getProductsByCategory(
  categoryIdOrSlug: string,
  options: ProductsQueryOptions = {},
  client?: SupabaseClient<Database>
): Promise<ProductsQueryResult> {
  const supabase = client || createBrowserClient();
  const {
    limit = 24,
    offset = 0,
    sortBy = "sort_order",
    sortOrder = "asc",
  } = options;

  try {
    let resolvedCategoryId = categoryIdOrSlug;

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryIdOrSlug);
    if (!isUuid) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categoryIdOrSlug)
        .maybeSingle();

      if (cat) {
        resolvedCategoryId = cat.id;
      }
    }

    const query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .eq("category_id", resolvedCategoryId)
      .eq("is_active", true)
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(offset, offset + limit - 1);

    const { data, count, error } = await query;

    if (error || !data || data.length === 0) {
      const filtered = FALLBACK_PRODUCTS.filter(
        (p) => p.category_id === categoryIdOrSlug || p.category?.slug === categoryIdOrSlug
      );
      return { data: filtered, count: filtered.length, error: null };
    }

    return { data, count, error: null };
  } catch (err) {
    const filtered = FALLBACK_PRODUCTS.filter(
      (p) => p.category_id === categoryIdOrSlug || p.category?.slug === categoryIdOrSlug
    );
    return { data: filtered, count: filtered.length, error: null };
  }
}

/**
 * Searches products by term in name, tagline, description, or SKU.
 */
export async function searchProducts(
  searchTerm: string,
  limit: number = 10,
  client?: SupabaseClient<Database>
): Promise<ProductsQueryResult> {
  const supabase = client || createBrowserClient();
  const cleanTerm = searchTerm.trim().toLowerCase();

  if (!cleanTerm) {
    return { data: [], count: 0, error: null };
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .or(`name.ilike.%${cleanTerm}%,tagline.ilike.%${cleanTerm}%,sku.ilike.%${cleanTerm}%`)
      .limit(limit);

    if (error || !data || data.length === 0) {
      const fallbackMatches = FALLBACK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanTerm) ||
          (p.tagline && p.tagline.toLowerCase().includes(cleanTerm)) ||
          (p.sku && p.sku.toLowerCase().includes(cleanTerm))
      ).slice(0, limit);

      return { data: fallbackMatches, count: fallbackMatches.length, error: null };
    }

    return { data, count: data.length, error: null };
  } catch (err) {
    const fallbackMatches = FALLBACK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(cleanTerm) ||
        (p.tagline && p.tagline.toLowerCase().includes(cleanTerm)) ||
        (p.sku && p.sku.toLowerCase().includes(cleanTerm))
    ).slice(0, limit);

    return { data: fallbackMatches, count: fallbackMatches.length, error: null };
  }
}
