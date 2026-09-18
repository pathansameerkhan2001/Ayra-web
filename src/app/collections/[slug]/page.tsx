"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/services/products";
import type { ProductWithDetails } from "@/types/database";
import { Sparkles, ArrowLeft } from "lucide-react";

const OCCASION_TITLES: Record<string, { title: string; subtitle: string }> = {
  birthday: {
    title: "Birthday Hampers",
    subtitle: "Turn milestone birthdays into unforgettable memories with handcrafted sweets, florals & gifts.",
  },
  anniversary: {
    title: "Anniversary & Romance",
    subtitle: "Cherished gifts crafted for couples, golden milestones, and romantic celebrations.",
  },
  "diwali-gifts": {
    title: "Diwali & Festive Hampers",
    subtitle: "Opulent festive hampers with handcrafted brass diyas, saffron sweets & gourmet dry fruits.",
  },
  "new-born": {
    title: "New Born & Maternity",
    subtitle: "Gentle pastel welcome gifts, heirloom teddy keepsakes, and organic cotton swaddles.",
  },
  "thank-you": {
    title: "Thank You & Gratitude",
    subtitle: "Heartfelt gratitude wrapped in luxury with artisan preserves, confections, and botanicals.",
  },
  "corporate-gifting": {
    title: "Corporate & VIP Gifting",
    subtitle: "Distinguished matte black & gold executive trunks for esteemed clients, partners, and teams.",
  },
};

export default function CollectionPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "birthday";

  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const occasionInfo = OCCASION_TITLES[slug] || {
    title: `${slug.replace(/-/g, " ").toUpperCase()} Hampers`,
    subtitle: "Thoughtfully curated hampers for life's special moments.",
  };

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const res = await getProductsByCategory(slug);
        setProducts((res.data as unknown as ProductWithDetails[]) || []);
      } catch (err) {
        console.error("Failed to load collection products", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      {/* Hero Header */}
      <section className="bg-white/60 border-b border-ayra-blush-100 py-12 sm:py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs text-ayra-rose-medium font-medium mb-3 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Hampers</span>
          </Link>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-ayra-champagne-dark" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-ayra-rose-medium">
              CURATED OCCASION
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-ayra-charcoal font-normal capitalize">
            {occasionInfo.title}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-2 font-light">
            {occasionInfo.subtitle}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-white rounded-2xl animate-pulse border border-ayra-blush-100"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-ayra-blush-100 p-8 max-w-lg mx-auto">
            <p className="font-serif text-lg text-ayra-charcoal">No hampers currently found</p>
            <p className="text-xs text-ayra-charcoal/60 mt-1 font-sans">
              Discover other bespoke collections or view our full luxury catalog.
            </p>
            <Link
              href="/products"
              className="inline-block mt-5 px-6 py-2.5 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold hover:bg-ayra-rose-deep transition-colors shadow-subtle"
            >
              Browse All Hampers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
