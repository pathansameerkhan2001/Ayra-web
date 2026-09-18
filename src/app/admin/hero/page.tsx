"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, CheckCircle, XCircle, Edit2, Sliders, ArrowUpDown } from "lucide-react";
import { DEFAULT_HERO_SLIDES } from "@/services/hero";

export default function AdminHeroPage() {
  const [slides, setSlides] = useState(DEFAULT_HERO_SLIDES);

  const toggleActive = (id: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
            Homepage Hero Slider Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Customize hero photography, headline typography, badges, and CTA links.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image src={slide.image_url} alt="" fill className="object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-gray-800">
                  Slide #{slide.sort_order}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#B97878] uppercase tracking-widest block">
                  {slide.badge}
                </span>
                <h3 className="font-serif text-lg font-bold text-gray-900 mt-1 leading-snug whitespace-pre-line">
                  {slide.title}
                </h3>
                <p className="text-xs text-gray-600 font-sans mt-1.5 leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => toggleActive(slide.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  slide.is_active ? "bg-emerald-50 text-emerald-800" : "bg-gray-100 text-gray-500"
                }`}
              >
                {slide.is_active ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5" />}
                <span>{slide.is_active ? "Live on Storefront" : "Draft"}</span>
              </button>

              <button className="p-2 rounded-lg bg-[#FAF1EC] text-[#B97878] hover:bg-[#F2DDD4] flex items-center gap-1 text-xs font-semibold">
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Slide</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
