/**
 * Supabase Storage Helpers for Ayra Hampers
 * Bucket: ayra-products (Strictly SINGLE storage bucket for all website media)
 */

export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "ayra-products";

export type StorageFolder =
  | "products/birthday"
  | "products/anniversary"
  | "products/diwali"
  | "products/diwali-gifts"
  | "products/new-born"
  | "products/thank-you"
  | "products/corporate"
  | "products/corporate-gifting"
  | "categories"
  | "hero"
  | "banners"
  | "collections"
  | "instagram"
  | "brand"
  | "videos";

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number; // 1 - 100
  resize?: "cover" | "contain" | "fill";
  format?: "origin" | "avif" | "webp";
}

/**
 * Returns the fully qualified public URL for an asset stored in the `ayra-products` Supabase Storage bucket.
 * Supports image transformations (render endpoint) when requested.
 * Safely handles:
 *  1. Supabase storage-relative paths (e.g. "products/birthday/hamper.jpg", "hero/slide-1.jpg", "instagram/reel-1.jpg")
 *  2. Full Supabase URLs (e.g. "https://naolcrdbuargepkojglu.supabase.co/storage/v1/object/public/ayra-products/...")
 *  3. Local static asset paths (e.g. "/images/hero-slide-1.jpg")
 */
export function getStoragePublicUrl(
  path: string,
  transform?: ImageTransformOptions
): string {
  if (!path) return "";

  const trimmed = path.trim();
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");

  // If already a full HTTP/HTTPS URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (!transform || !supabaseUrl || !trimmed.includes(supabaseUrl)) {
      return trimmed;
    }
    // If it's a Supabase storage URL and transformations are requested, convert to render endpoint
    if (trimmed.includes(`/storage/v1/object/public/${STORAGE_BUCKET}/`)) {
      const relativePath = trimmed.split(`/storage/v1/object/public/${STORAGE_BUCKET}/`)[1];
      return buildTransformedUrl(supabaseUrl, relativePath, transform);
    }
    return trimmed;
  }

  // If it's a local public path (e.g. "/images/hero-slide-1.jpg")
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // Relative storage path in bucket
  const cleanPath = trimmed.replace(/^\/+/, "");

  if (!supabaseUrl) {
    return `/images/${cleanPath.split("/").pop() || ""}`;
  }

  if (transform && (transform.width || transform.height || transform.quality || transform.format)) {
    return buildTransformedUrl(supabaseUrl, cleanPath, transform);
  }

  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${cleanPath}`;
}

/**
 * Helper to build Supabase render/image URL with transformations
 */
function buildTransformedUrl(
  supabaseUrl: string,
  relativePath: string,
  options: ImageTransformOptions
): string {
  const params = new URLSearchParams();
  if (options.width) params.set("width", options.width.toString());
  if (options.height) params.set("height", options.height.toString());
  if (options.quality) params.set("quality", options.quality.toString());
  if (options.resize) params.set("resize", options.resize);
  if (options.format) params.set("format", options.format);

  const queryString = params.toString();
  return `${supabaseUrl}/storage/v1/render/image/public/${STORAGE_BUCKET}/${relativePath}${
    queryString ? `?${queryString}` : ""
  }`;
}

/**
 * Backward-compatible alias for getStoragePublicUrl
 */
export const getPublicStorageUrl = getStoragePublicUrl;

/**
 * Helper for constructing Product image paths inside `products/{category-slug}/`
 */
export function getProductImagePath(categorySlug: string, fileName: string): string {
  const normalizedCategory = (categorySlug || "general")
    .toLowerCase()
    .trim()
    .replace(/^products\//, "");
  const cleanFileName = fileName.replace(/^\/+/, "");
  return `products/${normalizedCategory}/${cleanFileName}`;
}

/**
 * Helper for category thumbnail paths
 */
export function getCategoryImagePath(slugOrName: string): string {
  const clean = slugOrName.toLowerCase().trim().replace(/^\/+/, "");
  return `categories/${clean}`;
}

/**
 * Helper for hero slide image paths
 */
export function getHeroImagePath(fileName: string): string {
  const clean = fileName.replace(/^\/+/, "");
  return `hero/${clean}`;
}

/**
 * Helper for Instagram reel thumbnail / video paths
 */
export function getInstagramMediaPath(fileName: string): string {
  const clean = fileName.replace(/^\/+/, "");
  return `instagram/${clean}`;
}

/**
 * Helper for brand & collection paths
 */
export function getBrandMediaPath(fileName: string): string {
  const clean = fileName.replace(/^\/+/, "");
  return `brand/${clean}`;
}

/**
 * Client-side file validator for upload forms
 */
export function validateMediaFile(
  file: File,
  type: "image" | "video" = "image"
): { valid: boolean; error?: string } {
  if (type === "image") {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Invalid file format. Please upload JPEG, PNG, WebP, or AVIF image.",
      };
    }
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
      };
    }
  } else if (type === "video") {
    const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Invalid video format. Please upload MP4, WebM, or MOV video.",
      };
    }
    const maxSizeBytes = 25 * 1024 * 1024; // 25 MB
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `Video size exceeds 25MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
      };
    }
  }

  return { valid: true };
}
