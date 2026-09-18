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
      className="absolute bottom-4 right-4 sm:bottom-8 sm:right-10 z-30 flex items-center space-x-2 sm:space-x-3 bg-[#FFFDF9]/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-[#F2DDD4] shadow-[0_4px_16px_rgba(41,35,33,0.06)] select-none"
      role="group"
      aria-label="Carousel navigation controls"
    >
      {/* Previous Slide Arrow */}
      <button
        type="button"
        onClick={onPrev}
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#5C4A48] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2]" />
      </button>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 px-1">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = currentSlide === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878] ${
                isActive
                  ? "w-5 sm:w-6 h-1.5 bg-[#B97878]"
                  : "w-1.5 h-1.5 bg-[#E8C7B7] hover:bg-[#B97878]/60"
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
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[#5C4A48] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 stroke-[2]" />
      </button>
    </div>
  );
};
