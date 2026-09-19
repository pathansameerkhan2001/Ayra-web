"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { ProductWithDetails } from "@/types/database";
import { getStoragePublicUrl } from "@/lib/supabase/storage";

interface ProductCardProps {
  product: ProductWithDetails;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const rawImage = product.images?.[0]?.image_url || "/images/occasions/birthday.jpg";
  const primaryImage = getStoragePublicUrl(rawImage);

  const hasDiscount =
    product.compare_at_price && product.compare_at_price > product.base_price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.compare_at_price! - product.base_price) /
          product.compare_at_price!) *
          100
      )
    : 0;

  return (
    <div className="group flex flex-col justify-between bg-white rounded-2xl p-3 sm:p-4 border border-ayra-blush-100/80 shadow-subtle hover:shadow-luxury hover:border-ayra-blush-300 transition-all duration-500 relative">
      <div>
        {/* Image Container with Badges & Quick Action Floating Buttons */}
        <div className="relative aspect-[4/4.5] w-full rounded-xl overflow-hidden bg-[#FAF7F2] mb-3.5">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              priority={false}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {product.is_bestseller && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-ayra-rose text-white shadow-sm">
                Bestseller
              </span>
            )}
            {hasDiscount && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-ayra-champagne-dark text-white shadow-sm">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-ayra-charcoal hover:text-ayra-rose transition-all shadow-sm z-10 active:scale-90"
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? "fill-ayra-rose text-ayra-rose" : ""
              }`}
            />
          </button>

          {/* Quick View Link overlay */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 z-10 translate-y-2 group-hover:translate-y-0">
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 py-2 px-3 rounded-full bg-white/95 backdrop-blur-sm text-ayra-charcoal text-[11px] font-medium tracking-wide uppercase flex items-center justify-center gap-1.5 hover:bg-ayra-ivory transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </Link>
          </div>
        </div>

        {/* Category Tag */}
        {product.category && (
          <p className="text-[11px] uppercase tracking-widest text-ayra-rose-medium font-medium mb-1">
            {product.category.name}
          </p>
        )}

        {/* Product Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-[15px] sm:text-base text-ayra-charcoal font-medium line-clamp-2 hover:text-ayra-rose transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Short Tagline */}
        {product.tagline && (
          <p className="text-xs text-ayra-charcoal/60 line-clamp-1 mt-1 font-sans">
            {product.tagline}
          </p>
        )}
      </div>

      {/* Price & Add to Bag CTA */}
      <div className="mt-4 pt-3 border-t border-ayra-blush-100/60 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-semibold text-ayra-charcoal">
              ₹{product.base_price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-ayra-charcoal/40 line-through font-sans">
                ₹{product.compare_at_price!.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => addItem(product, 1)}
          className="p-2.5 rounded-full bg-ayra-rose text-white hover:bg-ayra-rose-deep transition-all shadow-subtle hover:shadow-glow active:scale-95 flex items-center justify-center"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
