"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";

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
  return (
    <div className="absolute inset-0 w-full h-full flex items-center overflow-hidden">
      
      {/* 1. FULL-WIDTH CINEMATIC BACKGROUND IMAGE (Crossfade + Subtle Scale) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.015 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={slide.image}
          alt={`${slide.eyebrow} - ${slide.headline1} ${slide.headline2}`}
          fill
          priority={isFirst}
          quality={90}
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-right"
        />

        {/* Desktop Left-to-Right Subtle Warm Ivory Gradient Overlay (Prevents text from merging with image) */}
        <div
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/96 via-[#FAF7F2]/75 to-transparent w-[72%] lg:w-[56%] pointer-events-none"
          aria-hidden="true"
        />

        {/* Mobile Vertical Subtle Warm Ivory Gradient Overlay */}
        <div
          className="md:hidden absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/25 via-[#FAF7F2]/80 to-[#FAF7F2] pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* 2. HTML TEXT LAYER (Layered Directly On Top, Enters from RIGHT -> LEFT) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-14">
        <div className="max-w-xl lg:max-w-2xl text-left" style={{ transform: "translateZ(0)" }}>
          
          {/* 1. Eyebrow (Enters from RIGHT at 0.1s) */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.35, ease: "easeIn" } }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: LUXURY_EASE,
            }}
            className="flex items-center space-x-2.5 mb-3 sm:mb-4"
          >
            <span className="w-7 h-[1px] bg-[#C88A88]/80" />
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.28em] text-[#8C5E5C] uppercase font-semibold">
              {slide.eyebrow}
            </span>
            <span className="w-7 h-[1px] bg-[#C88A88]/80" />
          </motion.div>

          {/* 2. Main Headline */}
          <div className="mb-4 sm:mb-5">
            {/* Line 1: Serif (Enters from RIGHT at 0.2s) */}
            <motion.h1
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.35, ease: "easeIn" } }}
              transition={{
                duration: 0.85,
                delay: 0.2,
                ease: LUXURY_EASE,
              }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-serif font-normal text-[#2D2424] tracking-tight leading-[1.04]"
            >
              {slide.headline1}
            </motion.h1>

            {/* Line 2: Elegant Script Accent (Enters from RIGHT at 0.35s) */}
            <motion.span
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.35, ease: "easeIn" } }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: LUXURY_EASE,
              }}
              className="block font-script text-5xl sm:text-6xl md:text-7xl lg:text-[86px] xl:text-[96px] text-[#B26E6C] font-normal tracking-wide -mt-1 sm:-mt-2 pb-1"
            >
              {slide.headline2}
            </motion.span>
          </div>

          {/* 3. Supporting Heading & Delicate Rose Heart Divider (Enters from RIGHT at 0.5s) */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.35, ease: "easeIn" } }}
            transition={{
              duration: 0.85,
              delay: 0.5,
              ease: LUXURY_EASE,
            }}
            className="space-y-3.5 mb-8 sm:mb-10"
          >
            <p className="text-xs sm:text-sm tracking-[0.22em] text-[#5A4545] uppercase font-medium">
              {slide.supporting}
            </p>

            {/* Delicate Rose Heart Line Divider Motif */}
            <div className="flex items-center space-x-3 max-w-xs">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#DEB2B2]" />
              <Heart className="w-3.5 h-3.5 text-[#C88A88] fill-[#C88A88]/30" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#DEB2B2]" />
            </div>

            {/* Description (Enters from RIGHT at 0.65s) */}
            <motion.p
              initial={{ opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.35, ease: "easeIn" } }}
              transition={{
                duration: 0.85,
                delay: 0.65,
                ease: LUXURY_EASE,
              }}
              className="text-sm sm:text-base text-[#524141] font-light leading-relaxed max-w-lg"
            >
              {slide.description}
            </motion.p>
          </motion.div>

          {/* 4. Minimal Editorial CTA Link (Enters from RIGHT at 0.8s) */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.35, ease: "easeIn" } }}
            transition={{
              duration: 0.85,
              delay: 0.8,
              ease: LUXURY_EASE,
            }}
          >
            <Link
              href={slide.href}
              className="group inline-flex items-center space-x-3 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase font-medium text-[#2D2424] hover:text-[#B26E6C] transition-colors duration-300 py-2 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
              aria-label={`Explore ${slide.theme} collection`}
            >
              <span className="relative">
                EXPLORE OUR COLLECTIONS
                {/* Expanding Underline on Hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C88A88] origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </span>
              <ArrowRight className="w-4 h-4 text-[#B26E6C] transform transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
