"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getActiveProducts } from "@/services/products";
import { getActiveCategories } from "@/services/categories";
import type { ProductWithDetails, Category } from "@/types/database";
import { Filter, SlidersHorizontal, Search, Sparkles, ChevronDown } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          getActiveProducts({ limit: 50 }),
          getActiveCategories(),
        ]);
        setProducts((prodRes.data as unknown as ProductWithDetails[]) || []);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error("Error loading catalog:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all") {
          const matchSlug = p.category?.slug === selectedCategory || p.category_id === selectedCategory;
          if (!matchSlug) return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const term = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(term);
          const matchTagline = p.tagline?.toLowerCase().includes(term);
          const matchSku = (p.sku || "").toLowerCase().includes(term);
          if (!matchName && !matchTagline && !matchSku) return false;
        }
        // Price filter
        if (p.base_price > priceRange) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.base_price - b.base_price;
        if (sortBy === "price_desc") return b.base_price - a.base_price;
        if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return a.sort_order - b.sort_order;
      });
  }, [products, selectedCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      {/* Catalog Hero Banner */}
      <section className="bg-white/60 border-b border-ayra-blush-100 py-10 sm:py-14 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-ayra-champagne-dark" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-ayra-rose-medium">
              LUXURY GIFTING CATALOG
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ayra-charcoal font-normal">
            All Curated Hampers
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-2 font-light">
            Browse our complete portfolio of handcrafted hampers for every celebration and milestone.
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        {/* Top Controls: Search & Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-ayra-blush-200/60 mb-8">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-ayra-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hampers..."
              className="w-full pl-9 pr-4 py-2 text-xs font-sans rounded-full bg-white border border-ayra-blush-200 outline-none focus:border-ayra-rose"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-ayra-blush-200 text-xs text-ayra-charcoal font-medium shadow-sm"
            >
              <Filter className="w-3.5 h-3.5 text-ayra-rose" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-ayra-charcoal/60 font-sans hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3.5 pr-8 py-2 text-xs font-sans rounded-full bg-white border border-ayra-blush-200 outline-none focus:border-ayra-rose text-ayra-charcoal cursor-pointer shadow-sm"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-ayra-charcoal/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Filter Sidebar */}
          <aside className={`lg:block ${mobileFilterOpen ? "block" : "hidden"} space-y-6`}>
            {/* Category Filter */}
            <div className="p-5 rounded-2xl bg-white border border-ayra-blush-100 shadow-subtle">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-ayra-charcoal mb-3">
                Occasions
              </h3>
              <div className="space-y-1 text-xs font-sans">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-ayra-peach-100 text-ayra-rose font-medium"
                      : "text-ayra-charcoal/70 hover:bg-[#FAF7F2]"
                  }`}
                >
                  <span>All Occasions</span>
                  <span className="text-[10px] text-ayra-charcoal/40">{products.length}</span>
                </button>
                {[
                  { slug: "birthday", name: "Birthday" },
                  { slug: "anniversary", name: "Anniversary" },
                  { slug: "diwali-gifts", name: "Diwali Gifts" },
                  { slug: "new-born", name: "New Born" },
                  { slug: "thank-you", name: "Thank You" },
                  { slug: "corporate-gifting", name: "Corporate Gifting" },
                ].map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-ayra-peach-100 text-ayra-rose font-medium"
                        : "text-ayra-charcoal/70 hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="p-5 rounded-2xl bg-white border border-ayra-blush-100 shadow-subtle">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-ayra-charcoal mb-3">
                Max Price: ₹{priceRange.toLocaleString()}
              </h3>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-ayra-rose cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-ayra-charcoal/50 font-sans mt-2">
                <span>₹2,000</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] bg-white/70 rounded-2xl animate-pulse border border-ayra-blush-100"
                  />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-ayra-blush-100 p-8">
                <p className="font-serif text-lg text-ayra-charcoal">No hampers match your filters</p>
                <p className="text-xs text-ayra-charcoal/60 mt-1 font-sans">
                  Try clearing your search term or adjusting the price filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                    setPriceRange(10000);
                  }}
                  className="mt-5 px-6 py-2.5 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold hover:bg-ayra-rose-deep transition-colors shadow-subtle"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-ayra-charcoal/60 font-sans mb-4">
                  Showing {filteredProducts.length} luxury {filteredProducts.length === 1 ? "hamper" : "hampers"}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
