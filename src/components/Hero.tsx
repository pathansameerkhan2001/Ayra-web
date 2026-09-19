"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HeroSlide, SlideContent } from "./HeroSlide";
import { HeroControls } from "./HeroControls";
import { getStoragePublicUrl } from "@/lib/supabase/storage";

const HERO_SLIDES: SlideContent[] = [
  {
    id: 1,
    theme: "ROMANTIC LUXURY GIFTING",
    image: "/images/hero-slide-1.jpg",
    eyebrow: "MORE THAN GIFTS",
    headline1: "Moments",
    headline2: "That Matter",
    supporting: "Beautiful hampers for every story.",
    description: "Curated with love. Wrapped with care. Made to make your loved ones feel special.",
    href: "/products",
  },
  {
    id: 2,
    theme: "BIRTHDAY CELEBRATION",
    image: "/images/hero-slide-2.jpg",
    eyebrow: "FOR THEIR SPECIAL DAY",
    headline1: "Celebrate",
    headline2: "Beautifully",
    supporting: "Make their moment unforgettable.",
    description: "Thoughtfully curated gifts for birthdays worth remembering.",
    href: "/collections/birthday",
  },
  {
    id: 3,
    theme: "ANNIVERSARY / LOVE",
    image: "/images/hero-slide-3.jpg",
    eyebrow: "GIFTS FROM THE HEART",
    headline1: "A Little",
    headline2: "More Love",
    supporting: "Because some moments deserve more than words.",
    description: "Beautifully curated hampers made for meaningful moments.",
    href: "/collections/anniversary",
  },
  {
    id: 4,
    theme: "FESTIVE / DIWALI GIFTING",
    image: "/images/hero-slide-4.jpg",
    eyebrow: "GIFT THE FESTIVE SPIRIT",
    headline1: "Celebrate",
    headline2: "The Joy",
    supporting: "Beautiful hampers for beautiful celebrations.",
    description: "Thoughtful festive gifting, beautifully presented.",
    href: "/collections/diwali-gifts",
  },
  {
    id: 5,
    theme: "CORPORATE / PREMIUM GIFTING",
    image: "/images/hero-slide-5.jpg",
    eyebrow: "CORPORATE GIFTING",
    headline1: "Thoughtful",
    headline2: "By Design",
    supporting: "Gifts that leave a lasting impression.",
    description: "Premium gifting solutions for clients, teams and milestones.",
    href: "/collections/corporate-gifting",
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto Slider rotation (every 6.5s)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const activeSlide = HERO_SLIDES[currentSlide];
  const nextSlideIndex = (currentSlide + 1) % HERO_SLIDES.length;
  const nextSlideImage = getStoragePublicUrl(HERO_SLIDES[nextSlideIndex].image);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#FAF7F2] md:min-h-[640px] md:h-[78vh] lg:min-h-[700px] lg:max-h-[820px] flex flex-col md:flex-row md:items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Ayra Hampers Luxury Collection"
    >
      {/* Preload only the NEXT slide image in background for instant transition */}
      <div className="hidden" aria-hidden="true">
        <Image
          src={nextSlideImage}
          alt=""
          width={10}
          height={10}
          priority={false}
          quality={50}
        />
      </div>

      {/* ACTIVE HERO SLIDE (Crossfade & Smooth Transition) */}
      <AnimatePresence mode="wait">
        <HeroSlide
          key={activeSlide.id}
          slide={activeSlide}
          isFirst={activeSlide.id === 1}
        />
      </AnimatePresence>

      {/* MINIMAL LUXURY SLIDER CONTROLS */}
      <HeroControls
        totalSlides={HERO_SLIDES.length}
        currentSlide={currentSlide}
        onPrev={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
    </section>
  );
};
