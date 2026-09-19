"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  isFirst: boolean;
}

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export const HeroSlide: React.FC<HeroSlideProps> = ({ slide, isFirst }) => {
  const imageUrl = getStoragePublicUrl(slide.image);

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. DESKTOP CINEMATIC COMPOSITION (md: and above, >=768px)                */}
      {/* Full-width image background with left gradient overlay & editorial text   */}
      {/* ========================================================================= */}
      <div className="hidden md:flex absolute inset-0 w-full h-full items-center overflow-hidden">
        {/* Background Image Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 1.012 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={`${slide.eyebrow} - ${slide.headline1} ${slide.headline2}`}
            fill
            priority={isFirst}
            quality={90}
            sizes="100vw"
            className="object-cover object-[72%_center] lg:object-right select-none"
          />

          {/* Left-to-Right Subtle Warm Ivory & Peach Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/98 via-[#FAF7F2]/88 via-45% to-transparent w-[76%] lg:w-[60%] pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>

        {/* Desktop Content Layer */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full py-12 md:py-16">
          <div className="max-w-xl lg:max-w-2xl text-left" style={{ transform: "translateZ(0)" }}>
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.65, delay: 0.06, ease: LUXURY_EASE }}
              className="flex items-center space-x-2.5 mb-3.5"
            >
              <span className="w-6 h-[1px] bg-[#B97878]/70" />
              <span className="text-xs font-sans tracking-[0.28em] text-[#8C4A4A] uppercase font-semibold">
                {slide.eyebrow}
              </span>
              <span className="w-6 h-[1px] bg-[#B97878]/70" />
            </motion.div>

            {/* Main Headline */}
            <div className="mb-4">
              <motion.h1
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, delay: 0.12, ease: LUXURY_EASE }}
                className="text-6xl lg:text-[76px] xl:text-[84px] font-serif font-normal text-[#292321] tracking-tight leading-[1.04]"
              >
                {slide.headline1}
              </motion.h1>

              <motion.span
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
                transition={{ duration: 0.75, delay: 0.2, ease: LUXURY_EASE }}
                className="block font-script text-6xl lg:text-[86px] xl:text-[96px] text-[#B97878] font-normal tracking-wide -mt-2 pb-1"
              >
                {slide.headline2}
              </motion.span>
            </div>

            {/* Supporting Heading & Divider */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, delay: 0.28, ease: LUXURY_EASE }}
              className="space-y-3 mb-8"
            >
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
            </motion.div>

            {/* Editorial CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, delay: 0.38, ease: LUXURY_EASE }}
            >
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE PURPOSE-BUILT COMPOSITION (<768px: 320px–767px)                */}
      {/* Clear vertical hierarchy: Image -> Content -> Touch CTA                   */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col w-full px-3.5 xs:px-4 sm:px-6 pt-3 pb-6">
        {/* 1. TOP: Clean, Unobstructed Hamper Photography Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.55, ease: LUXURY_EASE }}
          className="relative w-full aspect-[16/10.5] xs:aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden shadow-[0_4px_18px_rgba(217,136,109,0.12)] border border-[#EEDAD2] bg-[#FAF7F2] mb-3.5"
        >
          <Image
            src={imageUrl}
            alt={`${slide.eyebrow} - ${slide.headline1} ${slide.headline2}`}
            fill
            priority={isFirst}
            quality={88}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center select-none"
          />

          {/* Theme Pill Badge at Top-Left of Image */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#F2DDD4] text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8C4A4A] shadow-sm">
            {slide.theme}
          </div>
        </motion.div>

        {/* 2. BOTTOM: Clean Separated Text Content */}
        <div className="flex flex-col text-left space-y-2">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, delay: 0.04, ease: LUXURY_EASE }}
            className="flex items-center space-x-2"
          >
            <span className="w-4 h-[1px] bg-[#B97878]/70" />
            <span className="text-[10px] xs:text-[10.5px] font-sans tracking-[0.24em] text-[#8C4A4A] uppercase font-semibold">
              {slide.eyebrow}
            </span>
            <span className="w-4 h-[1px] bg-[#B97878]/70" />
          </motion.div>

          {/* Headline (Line 1 Serif + Line 2 Script) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, delay: 0.08, ease: LUXURY_EASE }}
            className="leading-tight"
          >
            <h1 className="text-[28px] xs:text-[32px] sm:text-[36px] font-serif font-normal text-[#292321] tracking-tight leading-[1.06]">
              {slide.headline1}
            </h1>
            <span className="block font-script text-[38px] xs:text-[44px] sm:text-[50px] text-[#B97878] font-normal tracking-wide -mt-1 leading-none">
              {slide.headline2}
            </span>
          </motion.div>

          {/* Supporting & Heart Divider */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, delay: 0.14, ease: LUXURY_EASE }}
            className="space-y-1.5 pt-0.5"
          >
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
          </motion.div>

          {/* 3. CTA Button (Comfortable touch target, minimum 44px height) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.5, delay: 0.2, ease: LUXURY_EASE }}
            className="pt-2"
          >
            <Link
              href={slide.href}
              className="inline-flex items-center justify-between w-full xs:w-auto xs:inline-flex gap-3 px-5 py-3.5 min-h-[44px] rounded-full bg-[#FAF1EC] border border-[#E8C7B7] text-[#292321] text-[11.5px] xs:text-xs font-sans tracking-[0.18em] uppercase font-semibold shadow-sm hover:bg-[#F2DDD4] active:scale-[0.98] transition-all"
              aria-label={`Explore ${slide.theme} collection`}
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight className="w-4 h-4 text-[#B97878]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
