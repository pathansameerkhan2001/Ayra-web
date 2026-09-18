"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Sparkles, Heart, Package, ArrowRight } from "lucide-react";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = (params?.id as string) || "AYRA-ORD-001";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex-1 w-full text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-ayra-blush-200 shadow-2xl space-y-6">
          {/* Animated Success Icon */}
          <div className="w-20 h-20 rounded-full bg-ayra-peach-100 mx-auto flex items-center justify-center text-ayra-rose shadow-inner animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-ayra-champagne-dark" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-ayra-rose-medium">
                ORDER PLACED SUCCESSFULLY
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ayra-charcoal font-normal">
              Thank You for Your Order
            </h1>
            <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-2 font-light">
              Your luxury hamper is now being handcrafted with love and utmost care by our gifting artisans.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-ayra-blush-100 text-xs font-sans text-left space-y-2.5">
            <div className="flex justify-between pb-2 border-b border-ayra-blush-200/60">
              <span className="text-ayra-charcoal/60">Order Reference:</span>
              <span className="font-semibold text-ayra-charcoal font-mono uppercase">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ayra-charcoal/60">Status:</span>
              <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Confirmed & Preparing
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ayra-charcoal/60">Estimated Delivery:</span>
              <span className="font-medium text-ayra-charcoal">3–5 Business Days</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 py-3.5 px-4 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold hover:bg-ayra-rose-deep transition-all shadow-subtle hover:shadow-luxury flex items-center justify-center gap-1.5"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/account"
              className="flex-1 py-3.5 px-4 rounded-full bg-white border border-ayra-blush-200 text-ayra-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-ayra-peach-50 transition-all flex items-center justify-center gap-1.5"
            >
              <Package className="w-4 h-4 text-ayra-rose" />
              <span>View Account</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1 text-[11px] text-ayra-charcoal/50 font-sans pt-2">
            <span>Crafted with love for cherished stories</span>
            <Heart className="w-3.5 h-3.5 text-ayra-rose fill-ayra-rose" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
