"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const { items, totalItems, subtotal, removeItem, updateQuantity } = useCart();

  const FREE_SHIPPING_THRESHOLD = 3000;
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <h1 className="font-serif text-3xl sm:text-4xl text-ayra-charcoal font-normal mb-8 text-center sm:text-left">
          Your Shopping Bag ({totalItems})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-ayra-blush-100 p-8 max-w-md mx-auto shadow-subtle">
            <div className="w-16 h-16 rounded-full bg-ayra-blush-100 mx-auto flex items-center justify-center text-ayra-rose mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-xl text-ayra-charcoal">Your bag is empty</h2>
            <p className="text-xs text-ayra-charcoal/60 mt-1.5 font-sans">
              Discover our thoughtfully curated luxury hampers for life&apos;s special moments.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold hover:bg-ayra-rose-deep transition-all shadow-luxury"
            >
              <span>Explore Collection</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Items Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Alert */}
              <div className="p-4 rounded-2xl bg-white border border-ayra-blush-100">
                {remainingForFreeShipping > 0 ? (
                  <p className="text-xs text-ayra-charcoal/80 font-sans">
                    Add <span className="font-semibold text-ayra-rose">₹{remainingForFreeShipping.toLocaleString()}</span> more to unlock <span className="font-medium text-ayra-charcoal">Free Luxury Delivery</span>
                  </p>
                ) : (
                  <p className="text-xs text-emerald-800 font-medium font-sans flex items-center gap-1.5">
                    <span>✨</span> You have qualified for <span className="font-semibold">Free Luxury Delivery!</span>
                  </p>
                )}
                <div className="w-full bg-ayra-blush-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full bg-ayra-rose rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-3xl bg-white border border-ayra-blush-100 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-ayra-ivory shrink-0 border border-ayra-blush-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-serif text-base font-medium text-ayra-charcoal hover:text-ayra-rose transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        {item.variantName && (
                          <p className="text-xs text-ayra-charcoal/60 font-sans mt-0.5">{item.variantName}</p>
                        )}
                        <p className="text-sm font-semibold text-ayra-rose font-sans mt-1">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-ayra-blush-100/60">
                      <div className="flex items-center border border-ayra-blush-200 rounded-full px-2.5 py-1 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-ayra-charcoal/60 hover:text-ayra-charcoal p-1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-semibold px-3 text-ayra-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-ayra-charcoal/60 hover:text-ayra-charcoal p-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif text-base font-semibold text-ayra-charcoal min-w-[80px] text-right">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-ayra-charcoal/40 hover:text-rose-600 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="p-6 rounded-3xl bg-white border border-ayra-blush-100 shadow-subtle space-y-5">
              <h2 className="font-serif text-lg font-semibold text-ayra-charcoal border-b border-ayra-blush-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs font-sans text-ayra-charcoal/70">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-ayra-charcoal">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-emerald-700">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? "FREE" : "₹150"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-ayra-blush-100 pt-3 text-sm">
                  <span className="font-semibold text-ayra-charcoal">Estimated Total</span>
                  <span className="font-serif text-lg font-bold text-ayra-charcoal">
                    ₹{(subtotal >= FREE_SHIPPING_THRESHOLD ? subtotal : subtotal + 150).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 px-4 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-ayra-rose-deep transition-all shadow-luxury hover:shadow-glow group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="space-y-2 pt-2 border-t border-ayra-blush-100 text-[11px] text-ayra-charcoal/60 font-sans">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-ayra-rose" />
                  <span>Pan-India luxury safe delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Encrypted 256-bit secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
