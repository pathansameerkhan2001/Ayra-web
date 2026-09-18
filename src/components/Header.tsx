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
  Phone,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "@/components/SearchModal";

interface NavItem {
  name: string;
  href: string;
  dropdown?: { title: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    href: "/products",
    dropdown: [
      { title: "All Hampers", href: "/products", description: "Discover our full luxury collection" },
      { title: "Birthday Collection", href: "/collections/birthday", description: "Celebration hampers with florals" },
      { title: "Anniversary Trunks", href: "/collections/anniversary", description: "Romantic champagne & flower boxes" },
      { title: "Diwali & Festive Hampers", href: "/collections/diwali-gifts", description: "Saffron sweets, brass diyas & nuts" },
      { title: "New Born Welcome Sets", href: "/collections/new-born", description: "Gentle keepsakes for mama & baby" },
      { title: "Thank You Keepsakes", href: "/collections/thank-you", description: "Artisan gourmet gratitude gifts" },
    ],
  },
  {
    name: "Occasions",
    href: "/#occasions",
    dropdown: [
      { title: "Birthday", href: "/collections/birthday", description: "Make their special day unforgettable" },
      { title: "Anniversary", href: "/collections/anniversary", description: "Cherished moments for couples" },
      { title: "Diwali Gifts", href: "/collections/diwali-gifts", description: "Warm festive radiance & sweet blessings" },
      { title: "New Born", href: "/collections/new-born", description: "Gentle keepsakes for babies" },
      { title: "Thank You", href: "/collections/thank-you", description: "Express heartfelt appreciation" },
      { title: "Corporate Gifting", href: "/collections/corporate-gifting", description: "Executive black & gold trunks" },
    ],
  },
  { name: "Corporate Gifts", href: "/collections/corporate-gifting" },
  { name: "Wishlist", href: "/wishlist" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { openCart, totalItems } = useCart();
  const { totalWishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
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
    <>
      <header
        className={`sticky top-0 z-[10000] w-full h-[72px] sm:h-[76px] transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-[#FFFDF9]/96 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(41,35,33,0.06)] border-b border-[#F2DDD4]"
            : "bg-[#FFFDF9] border-b border-[#F7EAE3]"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* MOBILE HEADER: LEFT (Hamburger Menu) */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-[#4A3B3A] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>

          {/* BRAND LOGO */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start">
            <Link
              href="/"
              className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878] rounded-sm py-1"
              aria-label="Ayra Hampers Home"
            >
              <div className="relative h-[38px] min-w-[140px] w-[145px] xs:w-[155px] sm:h-[48px] sm:w-[185px] md:w-[195px] transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/images/ayra-hampers-logo.svg"
                  alt="Ayra Hampers - Luxury Gifting"
                  fill
                  sizes="(max-width: 640px) 155px, 195px"
                  className="object-contain object-center lg:object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-7 xl:space-x-9"
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
                    className="inline-flex items-center text-[13.5px] tracking-[0.03em] font-normal text-[#382B29] hover:text-[#B97878] transition-colors duration-200 py-1"
                  >
                    <span>{item.name}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 ml-1 text-[#8C6D6B] transition-transform duration-200 ${
                          isHovered ? "rotate-180 text-[#B97878]" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && isHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-[#FFFDF9] rounded-2xl shadow-xl border border-[#F2DDD4] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="space-y-1">
                        {item.dropdown?.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block p-2.5 rounded-xl hover:bg-[#FAF4EF] transition-colors group"
                          >
                            <p className="font-serif text-sm font-medium text-[#292321] group-hover:text-[#B97878] transition-colors">
                              {subItem.title}
                            </p>
                            {subItem.description && (
                              <p className="text-[11px] text-[#7A6664] font-sans mt-0.5">
                                {subItem.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ACTION ICONS */}
          <div className="flex items-center space-x-1 sm:space-x-2.5 text-[#3D302E]">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#4A3B3A] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
              aria-label="Search hampers and gifts"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.65]" />
            </button>

            {/* Account Icon */}
            <Link
              href="/account"
              className="p-2 text-[#4A3B3A] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
              aria-label="Customer account"
            >
              <User className="w-[18px] h-[18px] stroke-[1.65]" />
            </Link>

            {/* Wishlist Icon with Dynamic Rose Badge */}
            <Link
              href="/wishlist"
              className="p-2 text-[#4A3B3A] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
              aria-label={`Wishlist (${totalWishlist} items)`}
            >
              <Heart className="w-[18px] h-[18px] stroke-[1.65]" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 bg-[#B97878] text-white text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#FFFDF9] animate-in zoom-in">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart Icon with Dynamic Dark Badge */}
            <button
              type="button"
              onClick={openCart}
              className="p-2 text-[#4A3B3A] hover:text-[#B97878] transition-colors rounded-full hover:bg-[#FAF1EC] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B97878]"
              aria-label={`Shopping Cart (${totalItems} items)`}
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.65]" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#292321] text-[#FAF7F2] text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#FFFDF9] animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-OVER DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-[11000] lg:hidden"
                aria-hidden="true"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 240 }}
                className="fixed inset-y-0 left-0 w-[84%] max-w-sm bg-[#FFFDF9] z-[11000] lg:hidden shadow-2xl flex flex-col justify-between border-r border-[#F2DDD4]"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
              >
                <div className="p-5 overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-[#F2DDD4]">
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
                      className="p-2 text-[#5C4A48] hover:text-[#B97878] rounded-full hover:bg-[#FAF1EC] transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-3 p-3 bg-[#FAF1EC] rounded-xl flex items-center justify-between border border-[#F2DDD4]">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FFFDF9] flex items-center justify-center text-[#B97878] border border-[#F2DDD4]">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-[#292321]">Customer Account</span>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[11.5px] font-medium text-[#B97878] hover:underline"
                    >
                      View
                    </Link>
                  </div>

                  <div className="py-4 space-y-1">
                    {navItems.map((item) => {
                      const hasDropdown = Boolean(item.dropdown);
                      const isOpen = mobileDropdownOpen === item.name;

                      return (
                        <div key={item.name} className="border-b border-[#FAF1EC] last:border-none">
                          {hasDropdown ? (
                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileDropdownOpen(isOpen ? null : item.name)
                                }
                                className="w-full flex items-center justify-between py-3 text-sm text-[#382B29] font-normal hover:text-[#B97878] transition-colors"
                              >
                                <span>{item.name}</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-[#A37877] transition-transform duration-300 ${
                                    isOpen ? "rotate-180 text-[#B97878]" : ""
                                  }`}
                                />
                              </button>
                              {isOpen && (
                                <div className="pl-3 pb-2 space-y-1 bg-[#FAF4EF] rounded-lg p-2.5 my-1 border border-[#F2DDD4]/60">
                                  {item.dropdown?.map((drop) => (
                                    <Link
                                      key={drop.title}
                                      href={drop.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block py-1.5 text-xs text-[#523F3D] hover:text-[#B97878] transition-colors"
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
                              className="block py-3 text-sm text-[#382B29] font-normal hover:text-[#B97878] transition-colors"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-5 bg-[#FAF1EC] border-t border-[#F2DDD4] space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-[#5C4A48]">
                    <Sparkles className="w-4 h-4 text-[#B97878]" />
                    <span>Handcrafted luxury gifting across India</span>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-xs text-[#7A6664]">
                    <Link
                      href="/collections/corporate-gifting"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-[#B97878] underline underline-offset-2 transition-colors"
                    >
                      Corporate Inquiries
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-[#B97878] underline underline-offset-2 transition-colors"
                    >
                      Admin
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Global Real-time Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
