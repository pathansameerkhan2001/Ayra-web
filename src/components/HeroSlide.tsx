"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { getStoragePublicUrl } from "@/lib/supabase/storage";

export interface SlideContent {
  id: number;
  theme: string;
  image: string;
  eyebrow: string;
  headline1: string;
  headline2: string;
  supporting: string;
  description: string;
  href: string;
}

interface HeroSlideProps {
  slide: SlideContent;
  isFirst?: boolean;
}

/**
 * Editorial typography content for desktop screens (>=768px)
 */
export const DesktopHeroContent: React.FC<{ slide: SlideContent }> = ({ slide }) => {
  return (
    <div className="max-w-xl lg:max-w-2xl text-left" style={{ transform: "translateZ(0)" }}>
      {/* Eyebrow Badge */}
      <div className="flex items-center space-x-2.5 mb-3.5">
        <span className="w-6 h-[1px] bg-[#B97878]/70" />
        <span className="text-xs font-sans tracking-[0.28em] text-[#8C4A4A] uppercase font-semibold">
          {slide.eyebrow}
        </span>
        <span className="w-6 h-[1px] bg-[#B97878]/70" />
      </div>

      {/* Main Headline */}
      <div className="mb-4">
        <h1 className="text-6xl lg:text-[76px] xl:text-[84px] font-serif font-normal text-[#292321] tracking-tight leading-[1.04]">
          {slide.headline1}
        </h1>

        <span className="block font-script text-6xl lg:text-[86px] xl:text-[96px] text-[#B97878] font-normal tracking-wide -mt-2 pb-1">
          {slide.headline2}
        </span>
      </div>

      {/* Supporting Heading & Divider */}
      <div className="space-y-3 mb-8">
        <p className="text-xs md:text-sm tracking-[0.22em] text-[#4D3F3D] uppercase font-medium">
          {slide.supporting}
        </p>

        <div className="flex items-center space-x-2.5 max-w-xs">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E8B7B5]" />
          <Heart className="w-3.5 h-3.5 text-[#B97878] fill-[#B97878]/30" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E8B7B5]" />
        </div>

        <p className="text-sm md:text-base text-[#4D3F3D] font-light leading-relaxed max-w-lg">
          {slide.description}
        </p>
      </div>

      {/* Editorial CTA */}
      <div>
        <Link
          href={slide.href}
          className="group inline-flex items-center space-x-3 text-xs md:text-sm font-sans tracking-[0.2em] uppercase font-semibold text-[#292321] hover:text-[#B97878] transition-colors duration-300 py-2 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
          aria-label={`Explore ${slide.theme} collection`}
        >
          <span className="relative">
            EXPLORE OUR COLLECTIONS
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B97878] origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </span>
          <ArrowRight className="w-4 h-4 text-[#B97878] transform transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
};

/**
 * Editorial typography and action content for mobile screens (<768px)
 */
export const MobileHeroContent: React.FC<{ slide: SlideContent }> = ({ slide }) => {
  return (
    <div className="flex flex-col text-left space-y-2">
      {/* Eyebrow */}
      <div className="flex items-center space-x-2">
        <span className="w-4 h-[1px] bg-[#B97878]/70" />
        <span className="text-[10px] xs:text-[10.5px] font-sans tracking-[0.24em] text-[#8C4A4A] uppercase font-semibold">
          {slide.eyebrow}
        </span>
        <span className="w-4 h-[1px] bg-[#B97878]/70" />
      </div>

      {/* Headline (Line 1 Serif + Line 2 Script) */}
      <div className="leading-tight">
        <h1 className="text-[28px] xs:text-[32px] sm:text-[36px] font-serif font-normal text-[#292321] tracking-tight leading-[1.06]">
          {slide.headline1}
        </h1>
        <span className="block font-script text-[38px] xs:text-[44px] sm:text-[50px] text-[#B97878] font-normal tracking-wide -mt-1 leading-none">
          {slide.headline2}
        </span>
      </div>

      {/* Supporting & Heart Divider */}
      <div className="space-y-1.5 pt-0.5">
        <p className="text-[10.5px] xs:text-[11.5px] sm:text-xs tracking-[0.16em] text-[#4D3F3D] uppercase font-medium">
          {slide.supporting}
        </p>

        <div className="flex items-center space-x-2 max-w-[170px]">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E8B7B5]" />
          <Heart className="w-3 h-3 text-[#B97878] fill-[#B97878]/30" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E8B7B5]" />
        </div>

        <p className="text-[12px] xs:text-[13px] text-[#523F3D] font-light leading-relaxed pt-0.5">
          {slide.description}
        </p>
      </div>

      {/* CTA Button (Comfortable touch target, min 44px height) */}
      <div className="pt-2">
        <Link
          href={slide.href}
          className="inline-flex items-center justify-between w-full xs:w-auto xs:inline-flex gap-3 px-5 py-3.5 min-h-[44px] rounded-full bg-[#FAF1EC] border border-[#E8C7B7] text-[#292321] text-[11.5px] xs:text-xs font-sans tracking-[0.18em] uppercase font-semibold shadow-sm hover:bg-[#F2DDD4] active:scale-[0.98] transition-all"
          aria-label={`Explore ${slide.theme} collection`}
        >
          <span>EXPLORE COLLECTIONS</span>
          <ArrowRight className="w-4 h-4 text-[#B97878]" />
        </Link>
      </div>
    </div>
  );
};

/**
 * Standard single slide renderer (preserved for backwards compatibility)
 */
export const HeroSlide: React.FC<HeroSlideProps> = ({ slide, isFirst }) => {
  const imageUrl = getStoragePublicUrl(slide.image);

  return (
    <div className="w-full">
      {/* Desktop Composition */}
      <div className="hidden md:flex absolute inset-0 w-full h-full items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={imageUrl}
            alt={`${slide.eyebrow} - ${slide.headline1} ${slide.headline2}`}
            fill
            priority={isFirst}
            quality={90}
            sizes="100vw"
            className="object-cover object-[72%_center] lg:object-right select-none"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/98 via-[#FAF7F2]/88 via-45% to-transparent w-[76%] lg:w-[60%] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full py-12 md:py-16">
          <DesktopHeroContent slide={slide} />
        </div>
      </div>

      {/* Mobile Composition */}
      <div className="md:hidden flex flex-col w-full px-3.5 xs:px-4 sm:px-6 pt-3 pb-4">
        <div className="relative w-full aspect-[16/10.5] xs:aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden shadow-[0_4px_18px_rgba(217,136,109,0.12)] border border-[#EEDAD2] bg-[#FAF7F2] mb-3.5">
          <Image
            src={imageUrl}
            alt={`${slide.eyebrow} - ${slide.headline1} ${slide.headline2}`}
            fill
            priority={isFirst}
            quality={88}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center select-none"
          />
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#F2DDD4] text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8C4A4A] shadow-sm">
            {slide.theme}
          </div>
        </div>

        <MobileHeroContent slide={slide} />
      </div>
    </div>
  );
};
