import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export interface SupabaseConnectionTestResult {
  success: boolean;
  projectUrl: string;
  hasUrl: boolean;
  hasKey: boolean;
  bucket: string;
  categoriesFound: string[];
  expectedCategoriesPresent: boolean;
  rawCategoriesCount: number;
  message: string;
  error?: string;
}

const EXPECTED_CATEGORIES = [
  "Birthday",
  "Anniversary",
  "Diwali Gifts",
  "New Born",
  "Thank You",
  "Corporate Gifting",
];

/**
 * Internal utility to test Supabase production database connectivity and verify categories table retrieval.
 */
export async function testSupabaseConnection(): Promise<SupabaseConnectionTestResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "ayra-products";

  const hasUrl = Boolean(supabaseUrl && !supabaseUrl.includes("YOUR_SUPABASE_PROJECT_URL"));
  const hasKey = Boolean(supabaseKey && !supabaseKey.includes("YOUR_SUPABASE_PUBLISHABLE_KEY"));

  if (!hasUrl || !hasKey) {
    return {
      success: false,
      projectUrl: supabaseUrl,
      hasUrl,
      hasKey,
      bucket,
      categoriesFound: [],
      expectedCategoriesPresent: false,
      rawCategoriesCount: 0,
      message:
        "Supabase credentials are using placeholder values in .env.local. Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY with your live project keys to connect.",
    };
  }

  try {
    const supabase = createClient<Database>(supabaseUrl, supabaseKey);

    const { data: categories, error } = await supabase
      .from("categories")
      .select("name, slug, sort_order, is_active")
      .order("sort_order", { ascending: true });

    if (error) {
      return {
        success: false,
        projectUrl: supabaseUrl,
        hasUrl,
        hasKey,
        bucket,
        categoriesFound: [],
        expectedCategoriesPresent: false,
        rawCategoriesCount: 0,
        message: `Database query error: ${error.message}`,
        error: error.message,
      };
    }

    const categoryNames = categories ? categories.map((c) => c.name) : [];
    
    // Check if expected categories are present
    const matchedCategories = EXPECTED_CATEGORIES.filter((expected) =>
      categoryNames.some(
        (name) => name.toLowerCase().trim() === expected.toLowerCase().trim()
      )
    );

    const expectedCategoriesPresent = matchedCategories.length === EXPECTED_CATEGORIES.length;

    return {
      success: true,
      projectUrl: supabaseUrl,
      hasUrl,
      hasKey,
      bucket,
      categoriesFound: categoryNames,
      expectedCategoriesPresent,
      rawCategoriesCount: categories ? categories.length : 0,
      message: `Successfully connected to Supabase! Retrieved ${categoryNames.length} categories (${categoryNames.join(", ")}).`,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected connection error";
    return {
      success: false,
      projectUrl: supabaseUrl,
      hasUrl,
      hasKey,
      bucket,
      categoriesFound: [],
      expectedCategoriesPresent: false,
      rawCategoriesCount: 0,
      message: `Connection exception: ${message}`,
      error: message,
    };
  }
}
