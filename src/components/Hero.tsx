"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { SlideContent, DesktopHeroContent, MobileHeroContent } from "./HeroSlide";
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
  // Slide indices
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [incomingSlideIndex, setIncomingSlideIndex] = useState<number | null>(null);
  const [isFadeInActive, setIsFadeInActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // References
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const loadedImagesRef = useRef<Set<string>>(new Set());

  /**
   * Robust Image Preloader helper
   * Resolves immediately if already cached, or when image finish decoding
   */
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !src) return resolve();
      if (loadedImagesRef.current.has(src)) return resolve();

      const img = new window.Image();
      img.src = src;

      if (img.complete) {
        loadedImagesRef.current.add(src);
        resolve();
      } else {
        img.onload = () => {
          loadedImagesRef.current.add(src);
          resolve();
        };
        img.onerror = () => {
          // Even on error, resolve so transition logic doesn't hang
          resolve();
        };
      }
    });
  }, []);

  // Preload initial slides on mount
  useEffect(() => {
    const firstImg = getStoragePublicUrl(HERO_SLIDES[0].image);
    const secondImg = getStoragePublicUrl(HERO_SLIDES[1].image);

    preloadImage(firstImg).then(() => {
      preloadImage(secondImg);
    });
  }, [preloadImage]);

  /**
   * Two-Layer Crossfade Transition Trigger
   *
   * 1. Keeps current image 100% visible on Layer 1 (z-index 10).
   * 2. Checks if target image is loaded. If not, waits with current image visible.
   * 3. Mounts Layer 2 (z-index 20) with target image at opacity 0.
   * 4. Fades Layer 2 from 0 -> 1 over 750ms.
   * 5. Layer 1 remains solid underneath throughout the entire transition.
   * 6. Once Layer 2 reaches opacity 1, Layer 1 updates to target slide, Layer 2 is removed.
   * 7. Preloads next upcoming slide into browser memory.
   */
  const triggerTransition = useCallback(
    (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentSlideIndex) return;

      const targetSlide = HERO_SLIDES[targetIndex];
      const targetImageUrl = getStoragePublicUrl(targetSlide.image);

      const executeFade = () => {
        setIsTransitioning(true);
        setIncomingSlideIndex(targetIndex);
        setIsFadeInActive(false);

        // Allow browser one paint frame to register initial opacity 0
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsFadeInActive(true);
          });
        });

        // Finalize crossfade after 780ms (750ms duration + 30ms buffer)
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          setCurrentSlideIndex(targetIndex);
          setIncomingSlideIndex(null);
          setIsFadeInActive(false);
          setIsTransitioning(false);

          // Preload the next upcoming slide immediately
          const nextUpcomingIndex = (targetIndex + 1) % HERO_SLIDES.length;
          const nextUpcomingUrl = getStoragePublicUrl(HERO_SLIDES[nextUpcomingIndex].image);
          preloadImage(nextUpcomingUrl);
        }, 780);
      };

      // If target image is already loaded, transition immediately
      if (loadedImagesRef.current.has(targetImageUrl)) {
        executeFade();
      } else {
        // Keep current slide 100% visible while loading target image in background
        preloadImage(targetImageUrl).then(() => {
          executeFade();
        });
      }
    },
    [currentSlideIndex, isTransitioning, preloadImage]
  );

  const nextSlide = useCallback(() => {
    const nextIdx = (currentSlideIndex + 1) % HERO_SLIDES.length;
    triggerTransition(nextIdx);
  }, [currentSlideIndex, triggerTransition]);

  const prevSlide = useCallback(() => {
    const prevIdx = (currentSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    triggerTransition(prevIdx);
  }, [currentSlideIndex, triggerTransition]);

  const goToSlide = useCallback(
    (index: number) => {
      triggerTransition(index);
    },
    [triggerTransition]
  );

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      else if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto Slider rotation (every 6.5 seconds)
  useEffect(() => {
    if (isPaused || isTransitioning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isTransitioning, nextSlide]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

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

  const currentSlide = HERO_SLIDES[currentSlideIndex];
  const incomingSlide = incomingSlideIndex !== null ? HERO_SLIDES[incomingSlideIndex] : null;

  // Next slide for preloading
  const nextSlideIdx = (currentSlideIndex + 1) % HERO_SLIDES.length;
  const nextPreloadUrl = getStoragePublicUrl(HERO_SLIDES[nextSlideIdx].image);

  // Active indicator index (updates smoothly as crossfade starts)
  const displayIndicatorIndex =
    incomingSlideIndex !== null && isFadeInActive ? incomingSlideIndex : currentSlideIndex;

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
      {/* Background Next.js hidden preloader */}
      <div className="hidden" aria-hidden="true">
        <Image
          src={nextPreloadUrl}
          alt=""
          width={10}
          height={10}
          priority={false}
          quality={50}
          onLoad={() => loadedImagesRef.current.add(nextPreloadUrl)}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. DESKTOP CINEMATIC COMPOSITION (md: and above, >=768px)                */}
      {/* Full-width image background with two-layer crossfade & left editorial text */}
      {/* ========================================================================= */}
      <div className="hidden md:flex absolute inset-0 w-full h-full items-center overflow-hidden">
        {/* DESKTOP BACKGROUND IMAGE TWO-LAYER STACK */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ transform: "translateZ(0)", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* LAYER 1: CURRENT IMAGE (Solid base layer, always z-10, 100% visible) */}
          <div
            className="hero-image-layer absolute inset-0 w-full h-full"
            style={{
              zIndex: 10,
              transform: "translateZ(0)",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <Image
              src={getStoragePublicUrl(currentSlide.image)}
              alt={`${currentSlide.eyebrow} - ${currentSlide.headline1} ${currentSlide.headline2}`}
              fill
              priority={currentSlide.id === 1}
              quality={90}
              sizes="100vw"
              className="object-cover object-[72%_center] lg:object-right select-none"
            />
          </div>

          {/* LAYER 2: INCOMING IMAGE (Over layer, z-20, fades from opacity 0 -> 1 over 750ms) */}
          {incomingSlide && (
            <div
              className="hero-image-layer absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
              style={{
                zIndex: 20,
                opacity: isFadeInActive ? 1 : 0,
                willChange: "opacity",
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <Image
                src={getStoragePublicUrl(incomingSlide.image)}
                alt={`${incomingSlide.eyebrow} - ${incomingSlide.headline1} ${incomingSlide.headline2}`}
                fill
                quality={90}
                sizes="100vw"
                className="object-cover object-[72%_center] lg:object-right select-none"
              />
            </div>
          )}

          {/* Left-to-Right Subtle Warm Ivory & Peach Gradient Overlay (z-25) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/98 via-[#FAF7F2]/88 via-45% to-transparent w-[76%] lg:w-[60%] pointer-events-none"
            style={{ zIndex: 25 }}
            aria-hidden="true"
          />
        </div>

        {/* DESKTOP EDITORIAL TEXT CONTAINER (z-30) */}
        <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 w-full py-12 md:py-16">
          <div
            className="max-w-xl lg:max-w-2xl text-left relative min-h-[380px]"
            style={{ transform: "translateZ(0)" }}
          >
            {/* CURRENT DESKTOP TEXT (Fades out smoothly during transition) */}
            <div
              className={`transition-all duration-400 ease-out ${
                isFadeInActive ? "opacity-0 -translate-x-3 pointer-events-none" : "opacity-100 translate-x-0"
              }`}
            >
              <DesktopHeroContent slide={currentSlide} />
            </div>

            {/* INCOMING DESKTOP TEXT (Fades and slides in smoothly) */}
            {incomingSlide && (
              <div
                className={`absolute inset-0 transition-all duration-550 ease-out ${
                  isFadeInActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6 pointer-events-none"
                }`}
              >
                <DesktopHeroContent slide={incomingSlide} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE PURPOSE-BUILT COMPOSITION (<768px: 320px–767px)                */}
      {/* Strict Vertical Stack: Photo Card -> Editorial Text -> CTA -> Controls   */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col w-full px-3.5 xs:px-4 sm:px-6 pt-3 pb-3">
        {/* 1. TOP: Clean, Unobstructed Hamper Photography Container with Two-Layer Crossfade */}
        <div
          className="relative w-full aspect-[16/10.5] xs:aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden shadow-[0_4px_18px_rgba(217,136,109,0.12)] border border-[#EEDAD2] bg-[#FAF7F2] mb-3.5"
          style={{ transform: "translateZ(0)", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* MOBILE LAYER 1: CURRENT IMAGE (always visible, z-10, never removed early) */}
          <div
            className="hero-image-layer absolute inset-0 w-full h-full"
            style={{
              zIndex: 10,
              transform: "translateZ(0)",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <Image
              src={getStoragePublicUrl(currentSlide.image)}
              alt={`${currentSlide.eyebrow} - ${currentSlide.headline1} ${currentSlide.headline2}`}
              fill
              priority={currentSlide.id === 1}
              quality={88}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center select-none"
            />
          </div>

          {/* MOBILE LAYER 2: INCOMING IMAGE (fades in 0 -> 1 over 750ms on top of Layer 1) */}
          {incomingSlide && (
            <div
              className="hero-image-layer absolute inset-0 w-full h-full transition-opacity duration-700 ease-out"
              style={{
                zIndex: 20,
                opacity: isFadeInActive ? 1 : 0,
                willChange: "opacity",
                transform: "translateZ(0)",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <Image
                src={getStoragePublicUrl(incomingSlide.image)}
                alt={`${incomingSlide.eyebrow} - ${incomingSlide.headline1} ${incomingSlide.headline2}`}
                fill
                quality={88}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center select-none"
              />
            </div>
          )}

          {/* Theme Pill Badge at Top-Left of Image Card */}
          <div
            className="absolute top-2.5 left-2.5 z-30 px-2.5 py-1 rounded-full bg-[#FAF7F2]/95 backdrop-blur-md border border-[#F2DDD4] text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8C4A4A] shadow-sm transition-opacity duration-300"
          >
            {(incomingSlide && isFadeInActive ? incomingSlide : currentSlide).theme}
          </div>
        </div>

        {/* 2. BOTTOM: Clean Separated Text Content with Stable Height & Coordinated Transition */}
        <div className="relative w-full min-h-[220px] xs:min-h-[235px]">
          {/* CURRENT MOBILE TEXT */}
          <div
            className={`transition-all duration-350 ease-out ${
              isFadeInActive ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
            }`}
          >
            <MobileHeroContent slide={currentSlide} />
          </div>

          {/* INCOMING MOBILE TEXT */}
          {incomingSlide && (
            <div
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                isFadeInActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <MobileHeroContent slide={incomingSlide} />
            </div>
          )}
        </div>
      </div>

      {/* 3. MINIMAL LUXURY SLIDER CONTROLS (Desktop Bottom-Right & Mobile Bottom Bar) */}
      <HeroControls
        totalSlides={HERO_SLIDES.length}
        currentSlide={displayIndicatorIndex}
        onPrev={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
    </section>
  );
};
