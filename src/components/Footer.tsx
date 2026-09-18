"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Instagram, Mail, Phone, MapPin, Send, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-ayra-blush-200/80 text-ayra-charcoal">
      {/* 3 Top Luxury Guarantees */}
      <div className="border-b border-ayra-blush-200/60 bg-white/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-full bg-ayra-blush-100 flex items-center justify-center text-ayra-rose shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold">Pan-India Express Shipping</h4>
                <p className="text-xs text-ayra-charcoal/60 font-sans mt-0.5">Complimentary delivery over ₹3,000</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-full bg-ayra-blush-100 flex items-center justify-center text-ayra-rose shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold">100% Quality Guarantee</h4>
                <p className="text-xs text-ayra-charcoal/60 font-sans mt-0.5">Handcrafted & temperature controlled</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 rounded-full bg-ayra-blush-100 flex items-center justify-center text-ayra-rose shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold">Bespoke Customization</h4>
                <p className="text-xs text-ayra-charcoal/60 font-sans mt-0.5">Personalized ribbons & greetings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.18em] font-normal uppercase text-ayra-charcoal">
                AYRA HAMPERS
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-ayra-charcoal/70 font-light font-sans max-w-sm leading-relaxed">
              Curated luxury hampers crafted with love for life&apos;s most meaningful stories. Handcrafted gifting for weddings, birthdays, anniversaries, corporate milestones, and festive celebrations.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/ayrahampers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-ayra-blush-200 flex items-center justify-center text-ayra-charcoal hover:text-ayra-rose hover:border-ayra-rose transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@ayrahampers.com"
                className="w-9 h-9 rounded-full bg-white border border-ayra-blush-200 flex items-center justify-center text-ayra-charcoal hover:text-ayra-rose hover:border-ayra-rose transition-colors"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Occasions Col */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-ayra-charcoal mb-4">
              Occasions
            </h4>
            <ul className="space-y-2.5 text-xs text-ayra-charcoal/70 font-sans">
              <li><Link href="/collections/birthday" className="hover:text-ayra-rose transition-colors">Birthday Hampers</Link></li>
              <li><Link href="/collections/anniversary" className="hover:text-ayra-rose transition-colors">Anniversary Gifts</Link></li>
              <li><Link href="/collections/diwali-gifts" className="hover:text-ayra-rose transition-colors">Diwali & Festive</Link></li>
              <li><Link href="/collections/new-born" className="hover:text-ayra-rose transition-colors">New Born Baby</Link></li>
              <li><Link href="/collections/thank-you" className="hover:text-ayra-rose transition-colors">Thank You Keepsakes</Link></li>
              <li><Link href="/collections/corporate-gifting" className="hover:text-ayra-rose transition-colors">Corporate Gifting</Link></li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-ayra-charcoal mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-ayra-charcoal/70 font-sans">
              <li><Link href="/products" className="hover:text-ayra-rose transition-colors">All Hampers</Link></li>
              <li><Link href="/wishlist" className="hover:text-ayra-rose transition-colors">My Wishlist</Link></li>
              <li><Link href="/account" className="hover:text-ayra-rose transition-colors">My Account</Link></li>
              <li><Link href="/admin" className="hover:text-ayra-rose transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-ayra-charcoal mb-4">
              Ayra VIP Club
            </h4>
            <p className="text-xs text-ayra-charcoal/70 font-sans font-light leading-relaxed mb-3">
              Subscribe to receive exclusive festive previews and 10% off your first luxury order.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-full text-xs font-sans bg-white border border-ayra-blush-200 outline-none focus:border-ayra-rose transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-ayra-rose text-white flex items-center justify-center hover:bg-ayra-rose-deep transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright & Tagline */}
        <div className="mt-12 pt-8 border-t border-ayra-blush-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-ayra-charcoal/60 font-sans gap-4">
          <p>© {new Date().getFullYear()} Ayra Hampers. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-ayra-rose fill-ayra-rose inline" />
            <span>for cherished moments.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
