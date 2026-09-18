/**
 * Supabase Storage Helpers for Ayra Hampers
 * Bucket: ayra-products
 */

export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "ayra-products";

export type StorageCategoryFolder =
  | "products/birthday"
  | "products/anniversary"
  | "products/diwali"
  | "products/new-born"
  | "products/thank-you"
  | "products/corporate"
  | "categories"
  | "hero"
  | "banners"
  | "collections"
  | "brand";

/**
 * Returns the public URL for an asset stored in the `ayra-products` Supabase Storage bucket.
 * 
 * @param path Relative path inside the bucket (e.g. "products/birthday/hamper-1.jpg" or "categories/anniversary.jpg")
 * @returns Fully-qualified public URL string
 */
export function getPublicStorageUrl(path: string): string {
  if (!path) return "";
  
  // If it's already a full HTTP(S) URL or local path (/images/...), return as-is
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseUrl) {
    return `/images/${path.split("/").pop() || ""}`;
  }

  // Remove leading slash if present
  const cleanPath = path.replace(/^\//, "");
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanPath}`;
}

/**
 * Helper to construct product image paths by category slug
 */
export function getProductImagePath(categorySlug: string, fileName: string): string {
  const normalizedCategory = categorySlug.toLowerCase().trim();
  return `products/${normalizedCategory}/${fileName.replace(/^\//, "")}`;
}
