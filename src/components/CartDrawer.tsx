"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, subtotal, removeItem, updateQuantity } = useCart();

  const FREE_SHIPPING_THRESHOLD = 3000;
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[12000] overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-ayra-charcoal/40 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-ayra-blush-200/60 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-ayra-blush-200/60 bg-white/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-ayra-rose" />
              <h2 className="font-serif text-lg text-ayra-charcoal font-medium">Your Shopping Bag</h2>
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-ayra-blush-100 text-ayra-rose-medium font-medium">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-ayra-blush-100/70 text-ayra-charcoal/70 hover:text-ayra-charcoal transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-ayra-peach-50/80 border-b border-ayra-blush-100 text-center">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-ayra-charcoal/80 font-sans">
                Add <span className="font-semibold text-ayra-rose-medium">₹{remainingForFreeShipping.toLocaleString()}</span> more for <span className="font-medium text-ayra-charcoal">Free Luxury Delivery</span>
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-medium font-sans flex items-center justify-center gap-1.5">
                <span>✨</span> You unlocked <span className="font-semibold">Free Luxury Delivery!</span>
              </p>
            )}
            <div className="w-full bg-ayra-blush-200/50 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-ayra-peach-400 to-ayra-rose rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-ayra-blush-100/80 flex items-center justify-center mb-4 text-ayra-rose-medium">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg text-ayra-charcoal font-normal">Your bag is empty</h3>
                <p className="text-xs text-ayra-charcoal/60 mt-1 max-w-[240px] font-sans">
                  Discover our thoughtfully curated luxury hampers for life&apos;s special moments.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-medium hover:bg-ayra-rose-deep transition-colors shadow-subtle"
                >
                  Start Gifting
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 border border-ayra-blush-100/80 shadow-sm"
                >
                  <div className="relative w-18 h-18 w-[72px] h-[72px] rounded-xl overflow-hidden bg-ayra-ivory shrink-0 border border-ayra-blush-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-[14px] text-ayra-charcoal truncate font-medium">
                      {item.name}
                    </h4>
                    {item.variantName && (
                      <p className="text-[11px] text-ayra-charcoal/60 font-sans">{item.variantName}</p>
                    )}
                    <p className="text-xs font-semibold text-ayra-rose-medium mt-1 font-sans">
                      ₹{item.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-ayra-blush-200 rounded-full px-2 py-0.5 bg-white/90">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-ayra-charcoal/60 hover:text-ayra-charcoal p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium px-2.5 text-ayra-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-ayra-charcoal/60 hover:text-ayra-charcoal p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-ayra-charcoal/40 hover:text-rose-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-ayra-blush-200/60 bg-white/80 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ayra-charcoal/70 font-sans">Subtotal</span>
                <span className="font-serif text-lg font-semibold text-ayra-charcoal">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-ayra-charcoal/50 font-sans text-center">
                Taxes and delivery calculated at checkout
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3.5 px-4 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-ayra-rose-deep transition-all shadow-luxury hover:shadow-glow group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-ayra-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe & Secure Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
