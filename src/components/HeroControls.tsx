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
    <>
      {/* 1. DESKTOP CONTROLS (>=768px): Fixed bottom-right of full-width cinematic hero */}
      <div
        className="hidden md:flex absolute bottom-8 right-10 z-30 items-center space-x-3 bg-[#FFFDF9]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#F2DDD4] shadow-[0_4px_16px_rgba(41,35,33,0.06)] select-none"
        role="group"
        aria-label="Desktop carousel navigation controls"
      >
        <button
          type="button"
          onClick={onPrev}
          className="w-9 h-9 flex items-center justify-center text-[#5C4A48] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <div className="flex items-center space-x-2 px-1">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelect(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878] ${
                  isActive
                    ? "w-6 h-1.5 bg-[#B97878]"
                    : "w-1.5 h-1.5 bg-[#E8C7B7] hover:bg-[#B97878]/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : "false"}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          className="w-9 h-9 flex items-center justify-center text-[#5C4A48] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* 2. MOBILE CONTROLS (<768px): Centered dots & arrows bar below image without overlapping text */}
      <div
        className="md:hidden flex items-center justify-between w-full px-4 pt-1 pb-2 select-none"
        role="group"
        aria-label="Mobile carousel navigation controls"
      >
        {/* Slide Counter */}
        <span className="text-[11px] font-mono text-[#7A6664] font-medium">
          {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>

        {/* Center Indicator Dots */}
        <div className="flex items-center space-x-1.5 bg-[#FFFDF9]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#F2DDD4]/80 shadow-xs">
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelect(idx)}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  isActive ? "w-5 h-1.5 bg-[#B97878]" : "w-1.5 h-1.5 bg-[#E8C7B7]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : "false"}
              />
            );
          })}
        </div>

        {/* Mini Arrows */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={onPrev}
            className="w-7 h-7 flex items-center justify-center text-[#5C4A48] hover:text-[#B97878] rounded-full bg-white border border-[#F2DDD4] shadow-xs active:scale-90 transition-transform"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="w-7 h-7 flex items-center justify-center text-[#5C4A48] hover:text-[#B97878] rounded-full bg-white border border-[#F2DDD4] shadow-xs active:scale-90 transition-transform"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>
    </>
  );
};
