"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroControlsProps {
  totalSlides: number;
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export const HeroControls: React.FC<HeroControlsProps> = ({
  totalSlides,
  currentSlide,
  onPrev,
  onNext,
  onSelect,
}) => {
  return (
    <div
      className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12 z-30 flex items-center space-x-3.5 bg-[#FFFDF9]/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#F0DDD8] shadow-[0_4px_16px_rgba(45,36,36,0.06)]"
      role="group"
      aria-label="Carousel navigation controls"
    >
      {/* Previous Slide Arrow */}
      <button
        type="button"
        onClick={onPrev}
        className="p-1 text-[#5A4545] hover:text-[#B26E6C] transition-colors rounded-full hover:bg-[#FAF0ED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2]" />
      </button>

      {/* 5 Pagination Indicator Dots */}
      <div className="flex items-center space-x-2 px-1">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C] ${
                isActive
                  ? "w-6 h-1.5 bg-[#B26E6C]"
                  : "w-1.5 h-1.5 bg-[#D4B5B3] hover:bg-[#B26E6C]/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={isActive ? "true" : "false"}
            />
          );
        })}
      </div>

      {/* Next Slide Arrow */}
      <button
        type="button"
        onClick={onNext}
        className="p-1 text-[#5A4545] hover:text-[#B26E6C] transition-colors rounded-full hover:bg-[#FAF0ED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 stroke-[2]" />
      </button>
    </div>
  );
};
