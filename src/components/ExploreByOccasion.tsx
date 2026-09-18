"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export interface OccasionItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  alt: string;
}

export const DEFAULT_OCCASIONS: OccasionItem[] = [
  {
    id: "birthday",
    name: "Birthday",
    slug: "birthday",
    image: "/images/occasions/birthday.jpg",
    alt: "Luxury Birthday gift hamper with flowers and artisanal treats",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    slug: "anniversary",
    image: "/images/occasions/anniversary.jpg",
    alt: "Romantic Anniversary floral hamper with blush blooms and luxury gifts",
  },
  {
    id: "diwali-gifts",
    name: "Diwali Gifts",
    slug: "diwali-gifts",
    image: "/images/occasions/diwali-gifts.jpg",
    alt: "Festive Indian Diwali hamper with traditional brass diya and sweets",
  },
  {
    id: "new-born",
    name: "New Born",
    slug: "new-born",
    image: "/images/occasions/new-born.jpg",
    alt: "Soft pastel New Born baby hamper with plush teddy and keepsakes",
  },
  {
    id: "thank-you",
    name: "Thank You",
    slug: "thank-you",
    image: "/images/occasions/thank-you.jpg",
    alt: "Elegant Thank You appreciation hamper with florals and treats",
  },
  {
    id: "corporate-gifting",
    name: "Corporate Gifting",
    slug: "corporate-gifting",
    image: "/images/occasions/corporate-gifting.jpg",
    alt: "Sophisticated executive Corporate gift hamper with premium black and gold box",
  },
];

interface ExploreByOccasionProps {
  occasions?: OccasionItem[];
}

export function ExploreByOccasion({
  occasions = DEFAULT_OCCASIONS,
}: ExploreByOccasionProps) {
  return (
    <section
      aria-label="Explore Hampers by Occasion"
      className="relative w-full bg-[#FAF7F2] py-11 md:py-14 lg:py-16 overflow-hidden border-b border-ayra-blush-100/60"
    >
      {/* Decorative Botanical Left Branch (Pointer-events none, aria-hidden) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 pointer-events-none select-none opacity-40 lg:opacity-60 z-0 transition-opacity duration-700"
      >
        <svg
          width="120"
          height="260"
          viewBox="0 0 110 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto"
        >
          <path
            d="M5 230 C20 180, 25 120, 15 10 C35 70, 30 150, 10 230"
            stroke="#E8B7B5"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M16 35 C28 20, 48 24, 52 38 C42 50, 24 45, 16 35 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M18 36 Q34 32 48 37" stroke="#E8B7B5" strokeWidth="0.75" />
          <path
            d="M20 70 C38 52, 68 58, 72 75 C58 90, 32 84, 20 70 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M23 72 Q46 68 66 74" stroke="#E8B7B5" strokeWidth="0.75" />
          <path
            d="M18 115 C34 95, 62 102, 65 120 C50 134, 28 128, 18 115 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M21 117 Q42 112 60 119" stroke="#E8B7B5" strokeWidth="0.75" />
          <path
            d="M14 165 C30 148, 56 152, 60 168 C48 180, 26 176, 14 165 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M16 166 Q36 160 54 167" stroke="#E8B7B5" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Decorative Botanical Right Branch (Pointer-events none, aria-hidden) */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 pointer-events-none select-none opacity-40 lg:opacity-60 z-0 transition-opacity duration-700"
      >
        <svg
          width="120"
          height="260"
          viewBox="0 0 110 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto scale-x-[-1]"
        >
          <path
            d="M5 230 C20 180, 25 120, 15 10 C35 70, 30 150, 10 230"
            stroke="#E8B7B5"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M16 35 C28 20, 48 24, 52 38 C42 50, 24 45, 16 35 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M18 36 Q34 32 48 37" stroke="#E8B7B5" strokeWidth="0.75" />
          <path
            d="M20 70 C38 52, 68 58, 72 75 C58 90, 32 84, 20 70 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M23 72 Q46 68 66 74" stroke="#E8B7B5" strokeWidth="0.75" />
          <path
            d="M18 115 C34 95, 62 102, 65 120 C50 134, 28 128, 18 115 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M21 117 Q42 112 60 119" stroke="#E8B7B5" strokeWidth="0.75" />
          <path
            d="M14 165 C30 148, 56 152, 60 168 C48 180, 26 176, 14 165 Z"
            stroke="#E8B7B5"
            strokeWidth="1"
            fill="#FAF0EB"
            fillOpacity="0.4"
          />
          <path d="M16 166 Q36 160 54 167" stroke="#E8B7B5" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Decorative Right-Side Handwritten Script (Visible on wide screens 1380px+) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center justify-center absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 text-center opacity-70 -rotate-3"
      >
        <span className="font-script text-[26px] lg:text-[30px] leading-[1.08] text-[#B97878] tracking-wide">
          Spread
          <br />
          Happiness
          <br />
          One Hamper
          <br />
          at a Time
        </span>
        <span className="text-[#B97878] text-sm mt-1">♡</span>
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Eyebrow, Main Title, Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10 lg:mb-12">
          {/* Eyebrow with delicate accent lines */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-2">
            <span
              aria-hidden="true"
              className="h-[1px] w-6 sm:w-9 bg-ayra-rose-light/50"
            />
            <span className="text-[10.5px] sm:text-[11.5px] uppercase tracking-[0.28em] font-medium text-ayra-rose-medium">
              EXPLORE BY OCCASION
            </span>
            <span
              aria-hidden="true"
              className="h-[1px] w-6 sm:w-9 bg-ayra-rose-light/50"
            />
          </div>

          {/* Main Serif Heading */}
          <h2 className="font-serif text-2xl sm:text-[28px] md:text-[32px] lg:text-[34px] font-normal text-ayra-charcoal tracking-tight leading-snug">
            Every Occasion Deserves Something Special
          </h2>

          {/* Supporting text */}
          <p className="font-sans text-xs sm:text-[13.5px] md:text-[14.5px] text-ayra-charcoal/70 mt-2 font-light tracking-normal">
            Thoughtfully curated hampers for life&apos;s beautiful moments.
          </p>
        </div>

        {/* Categories Row: Exactly 6 items in ONE single row on desktop (~150px); horizontal swipe on mobile (~112px) */}
        <div className="w-full max-w-6xl mx-auto">
          <div
            className="flex md:grid md:grid-cols-6 items-start justify-start md:justify-between overflow-x-auto md:overflow-x-visible no-scrollbar snap-x snap-mandatory gap-5 sm:gap-6 md:gap-4 lg:gap-6 xl:gap-8 px-3 sm:px-4 md:px-0 py-2 -mx-3 sm:-mx-4 md:mx-0"
            role="list"
          >
            {occasions.map((occasion) => (
              <div
                key={occasion.id}
                role="listitem"
                className="snap-center shrink-0 w-[118px] sm:w-[126px] md:w-full flex flex-col items-center justify-start"
              >
                <Link
                  href={`/collections/${occasion.slug}`}
                  className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ayra-rose-medium/60 rounded-full p-1.5 transition-transform duration-300 active:scale-95 text-center w-full"
                  aria-label={`Explore ${occasion.name} gift hampers`}
                >
                  {/* PERFECT ROUND CIRCLE CONTAINER: Desktop ~145px–155px (150px target), Mobile ~108px–116px (112px target) */}
                  <div className="relative w-[112px] h-[112px] sm:w-[120px] sm:h-[120px] md:w-[134px] md:h-[134px] lg:w-[148px] lg:h-[148px] xl:w-[152px] xl:h-[152px] rounded-full overflow-hidden aspect-square bg-[#FAF7F2] shadow-[0_5px_18px_rgba(217,136,109,0.14)] ring-1 ring-ayra-blush-200/80 transition-all duration-500 ease-out group-hover:shadow-[0_10px_28px_rgba(217,136,109,0.25)] group-hover:ring-ayra-rose-light">
                    <Image
                      src={occasion.image}
                      alt={occasion.alt}
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 768px) 120px, (max-width: 1024px) 134px, 152px"
                      className="object-cover object-center rounded-full transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={false}
                    />
                    {/* Subtle warm overlay on hover */}
                    <div className="absolute inset-0 rounded-full bg-ayra-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Category Label (Elegant Serif, 14–16px, dark charcoal) */}
                  <span className="font-serif text-[14px] sm:text-[14.5px] md:text-[15px] lg:text-[16px] font-medium text-ayra-charcoal group-hover:text-ayra-rose-medium transition-colors duration-300 text-center mt-3.5 sm:mt-4 whitespace-nowrap tracking-normal">
                    {occasion.name}
                  </span>

                  {/* Tiny centered decorative horizontal underline (24–28px width, 1.5px height) */}
                  <span
                    aria-hidden="true"
                    className="w-6 h-[1.5px] bg-ayra-rose-light/65 rounded-full mt-2 transition-all duration-300 ease-out group-hover:w-8 group-hover:bg-ayra-rose"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Micro-Tagline */}
        <div className="text-center mt-8 sm:mt-9 md:mt-10 flex items-center justify-center gap-2">
          <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.28em] text-ayra-rose-medium/80 font-medium">
            GIFTS TODAY
          </span>
          <Heart
            aria-hidden="true"
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-ayra-rose fill-ayra-rose/80 inline-block -mt-0.5 animate-pulse"
          />
          <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.28em] text-ayra-rose-medium/80 font-medium">
            BRIGHTER TOMORROWS
          </span>
        </div>
      </div>
    </section>
  );
}
