"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getNewProducts } from "@/services/products";
import type { ProductWithDetails } from "@/types/database";

export function NewArrivals() {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getNewProducts(4);
        setProducts((res.data as unknown as ProductWithDetails[]) || []);
      } catch (err) {
        console.error("Failed to load new products", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white/50 border-b border-ayra-blush-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Gift className="w-4 h-4 text-ayra-rose" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-ayra-rose-medium">
                FRESH CURATIONS
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ayra-charcoal font-normal">
              New In Gifting
            </h2>
            <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-1.5 font-light">
              Discover our latest creations crafted for unforgettable gifting moments.
            </p>
          </div>

          <Link
            href="/products?sort=newest"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ayra-rose-medium font-semibold hover:text-ayra-rose transition-colors mt-4 sm:mt-0 group"
          >
            <span>Explore New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-white rounded-2xl animate-pulse border border-ayra-blush-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
