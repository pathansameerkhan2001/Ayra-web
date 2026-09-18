"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { getActiveProducts } from "@/services/products";
import type { ProductWithDetails } from "@/types/database";
import { Heart, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { wishlistIds } = useWishlist();
  const [allProducts, setAllProducts] = useState<ProductWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const res = await getActiveProducts({ limit: 50 });
        setAllProducts((res.data as unknown as ProductWithDetails[]) || []);
      } catch (e) {
        console.error("Error loading products for wishlist", e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const wishlistedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="w-12 h-12 rounded-full bg-ayra-blush-100 mx-auto flex items-center justify-center text-ayra-rose mb-3">
            <Heart className="w-6 h-6 fill-ayra-rose" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ayra-charcoal font-normal">
            Your Saved Hampers
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-2 font-light">
            Keep track of all your favorite luxury gifting curations for upcoming special moments.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-white rounded-2xl animate-pulse border border-ayra-blush-100" />
            ))}
          </div>
        ) : wishlistedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-ayra-blush-100 p-8 max-w-md mx-auto shadow-subtle">
            <h2 className="font-serif text-lg text-ayra-charcoal">Your wishlist is currently empty</h2>
            <p className="text-xs text-ayra-charcoal/60 mt-1 font-sans">
              Tap the heart icon on any luxury hamper to save it here for later.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold hover:bg-ayra-rose-deep transition-all shadow-luxury"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Hampers</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
