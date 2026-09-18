"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { searchProducts } from "@/services/products";
import type { Product } from "@/types/database";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const res = await searchProducts(query, 6);
      setResults(res.data || []);
      setIsLoading(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[13000] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ayra-charcoal/45 backdrop-blur-md transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-20">
        <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-ayra-blush-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Search Input Header */}
          <div className="p-4 sm:p-5 border-b border-ayra-blush-200/80 bg-white/70 flex items-center gap-3">
            <Search className="w-5 h-5 text-ayra-rose shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hampers by occasion, flower, or gift name..."
              className="flex-1 bg-transparent border-none outline-none font-sans text-sm sm:text-base text-ayra-charcoal placeholder:text-ayra-charcoal/40"
              autoFocus
            />
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-ayra-rose animate-spin shrink-0" />
            ) : query ? (
              <button
                onClick={() => setQuery("")}
                className="text-ayra-charcoal/40 hover:text-ayra-charcoal p-1"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-full text-xs font-sans bg-ayra-blush-100 text-ayra-charcoal/70 hover:bg-ayra-blush-200 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions or Live Results */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div>
                <p className="text-[11px] uppercase tracking-widest text-ayra-charcoal/50 font-medium mb-3">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Birthday Hamper", "Anniversary Flowers", "Diwali Gift Box", "Newborn Basket", "Corporate Trunk"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-sans bg-white border border-ayra-blush-200/80 text-ayra-charcoal/80 hover:bg-ayra-peach-50 hover:border-ayra-rose-light transition-all"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-widest text-ayra-charcoal/50 font-medium mb-2">
                  Results ({results.length})
                </p>
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/70 hover:bg-white border border-ayra-blush-100 hover:border-ayra-rose-light transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-ayra-ivory shrink-0 border border-ayra-blush-100">
                        <Image
                          src="/images/occasions/birthday.jpg"
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-medium text-ayra-charcoal group-hover:text-ayra-rose transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-ayra-rose-medium font-semibold font-sans mt-0.5">
                          ₹{item.base_price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ayra-charcoal/30 group-hover:text-ayra-rose group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="font-serif text-base text-ayra-charcoal">No hampers found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-ayra-charcoal/60 mt-1">
                  Try searching for Birthday, Anniversary, Diwali, or Newborn.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
