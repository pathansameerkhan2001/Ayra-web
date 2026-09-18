"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  dropdown?: { title: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    href: "#shop",
    dropdown: [
      { title: "All Hampers", href: "#all-hampers", description: "Discover our full luxury collection" },
      { title: "Bespoke Gift Boxes", href: "#bespoke", description: "Handcrafted custom arrangements" },
      { title: "Luxury Gourmet & Wine", href: "#gourmet", description: "Artisanal treats and fine indulgences" },
      { title: "Wellness & Self-Care", href: "#wellness", description: "Aromatherapy, candles & skincare" },
      { title: "New Born & Maternity", href: "#new-born", description: "Gentle keepsakes for mama & baby" },
      { title: "Limited Festive Editions", href: "#festive", description: "Curated for seasonal celebrations" },
    ],
  },
  { name: "Custom Hampers", href: "#custom-hampers" },
  {
    name: "Occasions",
    href: "#occasions",
    dropdown: [
      { title: "Birthday Celebrations", href: "#birthday", description: "Make their special day unforgettable" },
      { title: "Anniversary & Romance", href: "#anniversary", description: "Cherished moments for couples" },
      { title: "Wedding & Trousseau", href: "#wedding", description: "Grand hampers for vows & celebrations" },
      { title: "Diwali & Festivals", href: "#diwali", description: "Warm festive radiance & sweet blessings" },
      { title: "Thank You & Gratitude", href: "#thank-you", description: "Express heartfelt appreciation" },
      { title: "Housewarming Joy", href: "#housewarming", description: "Warm comforts for a new beginning" },
    ],
  },
  { name: "Corporate Gifts", href: "#corporate" },
  { name: "About Us", href: "#about" },
  { name: "Track Order", href: "#track-order" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle purely visual styling without altering geometry
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[10000] w-full h-[76px] transition-colors duration-300 ease-in-out ${
        isScrolled
          ? "bg-[#FFFDF9]/95 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(45,36,36,0.05)] border-b border-[#F0DDD8]"
          : "bg-[#FFFDF9] border-b border-[#F7ECE8]"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Mobile: Left Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-[#4A3D3D] hover:text-[#B26E6C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        {/* LEFT: Authentic Ayra Hampers Brand Logo (Fixed Dimensions, No Jitter) */}
        <div className="flex-shrink-0 flex items-center justify-center lg:justify-start">
          <Link
            href="/"
            className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C] rounded-sm"
            aria-label="Ayra Hampers Home"
          >
            <div className="relative h-[48px] sm:h-[52px] w-[170px] sm:w-[185px] md:w-[195px] transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/images/ayra-hampers-logo.svg"
                alt="Ayra Hampers"
                fill
                sizes="(max-width: 640px) 170px, 195px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* CENTER: Desktop Navigation (Stable Height & Coordinates) */}
        <nav
          className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const hasDropdown = Boolean(item.dropdown);
            const isHovered = activeDropdown === item.name;

            return (
              <div
                key={item.name}
                className="relative py-2"
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`relative inline-flex items-center text-[13.5px] tracking-[0.03em] px-3.5 py-1.5 font-normal transition-colors duration-200 ${
                    item.name === "Home"
                      ? "text-[#B26E6C] font-medium"
                      : "text-[#4A3D3D] hover:text-[#B26E6C]"
                  }`}
                >
                  <span>{item.name}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`ml-1 w-3.5 h-3.5 stroke-[1.75] transition-transform duration-300 text-[#8C6D6C] ${
                        isHovered ? "rotate-180 text-[#B26E6C]" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  {item.name === "Home" && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#B26E6C] rounded-full" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasDropdown && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 top-full pt-1 w-64 z-50"
                      >
                        <div className="bg-[#FFFDF9] rounded-xl shadow-[0_12px_30px_-5px_rgba(45,36,36,0.12)] border border-[#F2E3DF] p-2.5 overflow-hidden">
                          <div className="space-y-1">
                            {item.dropdown?.map((dropItem) => (
                              <Link
                                key={dropItem.title}
                                href={dropItem.href}
                                className="group/drop flex flex-col px-3 py-2 rounded-lg hover:bg-[#FDF6F5] transition-colors"
                              >
                                <div className="flex items-center justify-between text-xs font-medium text-[#2D2424] group-hover/drop:text-[#B26E6C]">
                                  <span>{dropItem.title}</span>
                                  <span className="opacity-0 -translate-x-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 transition-all text-[#B26E6C] text-[10px]">
                                    →
                                  </span>
                                </div>
                                {dropItem.description && (
                                  <span className="text-[10.5px] text-[#8C7B7B] font-light mt-0.5 line-clamp-1">
                                    {dropItem.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* RIGHT: Action Icons (Stable, No Layout Shifts) */}
        <div className="flex items-center space-x-1 sm:space-x-3 text-[#3E3232]">
          {/* Search Icon */}
          <button
            type="button"
            className="p-2 text-[#4A3D3D] hover:text-[#B26E6C] transition-colors rounded-full hover:bg-[#FAF2EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
            aria-label="Search hampers and gifts"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.6]" />
          </button>

          {/* Account Icon */}
          <button
            type="button"
            className="hidden sm:inline-flex p-2 text-[#4A3D3D] hover:text-[#B26E6C] transition-colors rounded-full hover:bg-[#FAF2EF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
            aria-label="Customer account"
          >
            <User className="w-[18px] h-[18px] stroke-[1.6]" />
          </button>

          {/* Wishlist Icon */}
          <button
            type="button"
            className="p-2 text-[#4A3D3D] hover:text-[#B26E6C] transition-colors rounded-full hover:bg-[#FAF2EF] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
            aria-label="Wishlist (0 items)"
          >
            <Heart className="w-[18px] h-[18px] stroke-[1.6]" />
            <span className="absolute top-1 right-1 bg-[#C88A88] text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#FFFDF9]">
              0
            </span>
          </button>

          {/* Cart Icon */}
          <button
            type="button"
            className="p-2 text-[#4A3D3D] hover:text-[#B26E6C] transition-colors rounded-full hover:bg-[#FAF2EF] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B26E6C]"
            aria-label="Shopping Cart (0 items)"
          >
            <ShoppingBag className="w-[18px] h-[18px] stroke-[1.6]" />
            <span className="absolute top-1 right-1 bg-[#2D2424] text-[#FAF7F2] text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#FFFDF9]">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[11000] lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[82%] max-w-sm bg-[#FFFDF9] z-[11000] lg:hidden shadow-2xl flex flex-col justify-between border-r border-[#F0DDD8]"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="p-5 overflow-y-auto">
                {/* Header in Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F0DDD8]">
                  <div className="relative h-[40px] w-[145px]">
                    <Image
                      src="/images/ayra-hampers-logo.svg"
                      alt="Ayra Hampers"
                      fill
                      sizes="145px"
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-[#5C4D4D] hover:text-[#B26E6C] rounded-full hover:bg-[#FAF0ED]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="py-4 space-y-1">
                  {navItems.map((item) => {
                    const hasDropdown = Boolean(item.dropdown);
                    const isOpen = mobileDropdownOpen === item.name;

                    return (
                      <div key={item.name} className="border-b border-[#FAF0ED]/60 last:border-none">
                        {hasDropdown ? (
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                setMobileDropdownOpen(isOpen ? null : item.name)
                              }
                              className="w-full flex items-center justify-between py-3 text-sm text-[#382C2C] font-normal hover:text-[#B26E6C]"
                            >
                              <span>{item.name}</span>
                              <ChevronDown
                                className={`w-4 h-4 text-[#8C6D6C] transition-transform duration-300 ${
                                  isOpen ? "rotate-180 text-[#B26E6C]" : ""
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="pl-3 pb-2 space-y-1 bg-[#FDF8F7] rounded-lg p-2 my-1">
                                {item.dropdown?.map((drop) => (
                                  <Link
                                    key={drop.title}
                                    href={drop.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1.5 text-xs text-[#594747] hover:text-[#B26E6C]"
                                  >
                                    {drop.title}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-3 text-sm text-[#382C2C] font-normal hover:text-[#B26E6C]"
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Drawer Footer */}
              <div className="p-5 bg-[#FAF3F0] border-t border-[#F0DDD8] space-y-3">
                <div className="flex items-center space-x-2 text-xs text-[#6A5757]">
                  <Sparkles className="w-4 h-4 text-[#C88A88]" />
                  <span>Personalized gifting specialists</span>
                </div>
                <div className="pt-1 flex items-center justify-between text-xs text-[#8C7777]">
                  <Link
                    href="#track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#B26E6C] underline underline-offset-2"
                  >
                    Track Your Order
                  </Link>
                  <Link
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#B26E6C] underline underline-offset-2"
                  >
                    Need Help?
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
