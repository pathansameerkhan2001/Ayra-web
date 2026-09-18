"use client";

import React, { useState, useEffect } from "react";
import { Truck, Heart, Gift } from "lucide-react";

const announcements = [
  {
    icon: <Truck className="w-3.5 h-3.5 text-[#B97878]" aria-hidden="true" />,
    text: "Cash On Delivery Available",
    subtext: "Across India",
  },
  {
    icon: <Heart className="w-3.5 h-3.5 text-[#B97878] fill-[#B97878]/25" aria-hidden="true" />,
    text: "Thoughtful Gifts for Every Occasion",
    subtext: "Handcrafted with Love",
  },
  {
    icon: <Gift className="w-3.5 h-3.5 text-[#B97878]" aria-hidden="true" />,
    text: "Bulk Orders | Corporate Gifting",
    subtext: "Custom Branding Available",
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="w-full bg-[#FAF1EC] text-[#4A3B3A] border-b border-[#F2DDD4] py-2 px-4 text-xs font-sans tracking-wide transition-colors duration-300 relative z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout: Clean 3-Item Luxury Bar */}
        <div className="hidden md:flex items-center justify-between font-normal text-[11.5px] text-[#4A3B3A]">
          <div className="flex items-center space-x-2">
            <Truck className="w-3.5 h-3.5 text-[#B97878]" aria-hidden="true" />
            <span>Cash On Delivery Available</span>
          </div>

          <div className="flex items-center space-x-2 text-[#292321] font-medium">
            <Heart className="w-3.5 h-3.5 text-[#B97878] fill-[#B97878]/30 animate-pulse" aria-hidden="true" />
            <span className="tracking-wider">Thoughtful Gifts for Every Occasion</span>
          </div>

          <div className="flex items-center space-x-2">
            <Gift className="w-3.5 h-3.5 text-[#B97878]" aria-hidden="true" />
            <a
              href="#corporate"
              className="hover:text-[#B97878] transition-colors underline-offset-4 hover:underline"
            >
              Bulk Orders | Corporate Gifting
            </a>
          </div>
        </div>

        {/* Mobile Layout: Elegant Smooth Rotator */}
        <div className="md:hidden flex items-center justify-center py-0.5">
          <div className="flex items-center space-x-2 transition-all duration-500 ease-in-out">
            {announcements[currentIndex].icon}
            <span className="font-medium text-[11px] text-[#292321] text-center">
              {announcements[currentIndex].text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
