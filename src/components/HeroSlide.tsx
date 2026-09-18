"use client";

import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Motion variants: subtle vertical translation on mobile, smooth horizontal on desktop
  const getInitial = (xOffset = 60, yOffset = 16) => {
    return isMobile ? { opacity: 0, y: yOffset } : { opacity: 0, x: xOffset };
  };

  const getExit = () => {
    return isMobile
      ? { opacity: 0, y: -8, transition: { duration: 0.25, ease: "easeIn" } }
      : { opacity: 0, x: -16, transition: { duration: 0.3, ease: "easeIn" } };
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center overflow-hidden">
      
      {/* 1. CINEMATIC BACKGROUND IMAGE LAYER (Crossfade + High Quality Responsive Fit) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.012 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.1,
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
          className="object-cover object-[75%_center] sm:object-[70%_center] md:object-[68%_center] lg:object-right select-none"
        />

        {/* Desktop Left-to-Right Subtle Warm Ivory & Peach Gradient Overlay */}
        <div
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/97 via-[#FAF7F2]/85 via-45% to-transparent w-[76%] lg:w-[60%] pointer-events-none"
          aria-hidden="true"
        />

        {/* Mobile Vertical Subtle Warm Ivory & Peach Gradient Overlay */}
        <div
          className="md:hidden absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/20 via-[#FAF7F2]/82 via-40% to-[#FAF7F2]/98 pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* 2. HTML CONTENT LAYER (Vertical Mobile Composition / Luxury Desktop Alignment) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 md:py-16">
        <div className="max-w-xl lg:max-w-2xl text-left" style={{ transform: "translateZ(0)" }}>
          
          {/* 1. Eyebrow Badge (0.08s entrance) */}
          <motion.div
            initial={getInitial(50, 12)}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={getExit()}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: LUXURY_EASE,
            }}
            className="flex items-center space-x-2 sm:space-x-2.5 mb-2.5 sm:mb-4"
          >
            <span className="w-5 sm:w-7 h-[1px] bg-[#B97878]/70" />
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.24em] sm:tracking-[0.28em] text-[#8C4A4A] uppercase font-semibold">
              {slide.eyebrow}
            </span>
            <span className="w-5 sm:w-7 h-[1px] bg-[#B97878]/70" />
          </motion.div>

          {/* 2. Main Headline (Serif Line 1 + Script Accent Line 2) */}
          <div className="mb-3.5 sm:mb-5">
            {/* Line 1: Timeless Serif */}
            <motion.h1
              initial={getInitial(55, 16)}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={getExit()}
              transition={{
                duration: 0.8,
                delay: 0.16,
                ease: LUXURY_EASE,
              }}
              className="text-[36px] xs:text-[42px] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-serif font-normal text-[#292321] tracking-tight leading-[1.04]"
            >
              {slide.headline1}
            </motion.h1>

            {/* Line 2: Elegant Script Accent */}
            <motion.span
              initial={getInitial(60, 16)}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={getExit()}
              transition={{
                duration: 0.85,
                delay: 0.28,
                ease: LUXURY_EASE,
              }}
              className="block font-script text-[44px] xs:text-[52px] sm:text-6xl md:text-7xl lg:text-[86px] xl:text-[96px] text-[#B97878] font-normal tracking-wide -mt-1.5 sm:-mt-2 pb-1"
            >
              {slide.headline2}
            </motion.span>
          </div>

          {/* 3. Supporting Heading & Delicate Heart Divider */}
          <motion.div
            initial={getInitial(50, 14)}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={getExit()}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: LUXURY_EASE,
            }}
            className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-9"
          >
            <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.22em] text-[#4D3F3D] uppercase font-medium">
              {slide.supporting}
            </p>

            {/* Rose Heart Line Divider Motif */}
            <div className="flex items-center space-x-2.5 max-w-[200px] sm:max-w-xs">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#E8B7B5]" />
              <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#B97878] fill-[#B97878]/30" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#E8B7B5]" />
            </div>

            {/* Description */}
            <motion.p
              initial={getInitial(45, 12)}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={getExit()}
              transition={{
                duration: 0.8,
                delay: 0.52,
                ease: LUXURY_EASE,
              }}
              className="text-[13px] sm:text-sm md:text-base text-[#4D3F3D] font-light leading-relaxed max-w-md sm:max-w-lg"
            >
              {slide.description}
            </motion.p>
          </motion.div>

          {/* 4. Minimal Editorial CTA Link (0.64s entrance) */}
          <motion.div
            initial={getInitial(40, 12)}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={getExit()}
            transition={{
              duration: 0.8,
              delay: 0.64,
              ease: LUXURY_EASE,
            }}
          >
            <Link
              href={slide.href}
              className="group inline-flex items-center space-x-2.5 sm:space-x-3 text-[11.5px] sm:text-xs md:text-sm font-sans tracking-[0.18em] sm:tracking-[0.2em] uppercase font-medium text-[#292321] hover:text-[#B97878] transition-colors duration-300 py-1.5 sm:py-2 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
              aria-label={`Explore ${slide.theme} collection`}
            >
              <span className="relative">
                EXPLORE OUR COLLECTIONS
                {/* Expanding Underline on Hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B97878] origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </span>
              <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#B97878] transform transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
