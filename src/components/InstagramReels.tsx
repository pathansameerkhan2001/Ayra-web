"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram, Play, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { getActiveReels, OFFICIAL_INSTAGRAM_URL } from "@/services/instagram";
import type { InstagramReel } from "@/types/database";

export function InstagramReels() {
  const [reels, setReels] = useState<InstagramReel[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getActiveReels();
      setReels(data);
    }
    load();
  }, []);

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-[#FAF7F2] border-b border-ayra-blush-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram className="w-4 h-4 text-[#B97878]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-[#8C4A4A]">
              #AYRAMOMENTS
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ayra-charcoal font-normal">
            Follow Our Gifting Journey
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-2 font-light">
            More beautiful hampers, gifting inspiration and behind-the-scenes moments.
          </p>
        </div>

        {/* Reels Grid on Desktop (6 columns) / Swipe Carousel on Mobile */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4 lg:gap-5 overflow-x-auto sm:overflow-x-visible no-scrollbar snap-x snap-mandatory px-2 sm:px-0 py-2">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={reel.reel_url || OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-center shrink-0 w-[180px] sm:w-auto group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-subtle hover:shadow-luxury border border-ayra-blush-200/80 bg-white transition-all duration-500 hover:-translate-y-1 block"
            >
              <Image
                src={reel.thumbnail_url}
                alt={reel.title}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={false}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ayra-charcoal/85 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Instagram & Link Badges */}
              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between text-white/90">
                <span className="p-1 rounded-full bg-black/35 backdrop-blur-md">
                  <Instagram className="w-3.5 h-3.5" />
                </span>
                <span className="p-1 rounded-full bg-black/35 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Play Button Center Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white ring-1 ring-white/60 group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </div>

              {/* Bottom Info: Title, Likes & Comments */}
              <div className="absolute bottom-3 inset-x-3 text-white">
                <p className="text-xs font-serif line-clamp-2 leading-snug drop-shadow-sm font-medium">
                  {reel.title}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10.5px] text-white/80">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                    {reel.likes_count.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-white/90" />
                    {reel.comments_count}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow on Instagram CTA Button */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href={OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white border border-ayra-blush-200 text-[#292321] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-ayra-peach-50 hover:border-[#B97878] hover:text-[#B97878] transition-all shadow-subtle hover:shadow-luxury group active:scale-[0.98]"
          >
            <Instagram className="w-4 h-4 text-[#B97878] group-hover:scale-110 transition-transform" />
            <span>FOLLOW US ON INSTAGRAM</span>
          </a>
        </div>
      </div>
    </section>
  );
}
