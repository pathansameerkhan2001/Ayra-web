"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Package, ArrowLeft, ChevronRight, Truck, CheckCircle2 } from "lucide-react";

export default function CustomerOrdersPage() {
  const [orders] = useState([
    {
      id: "AYRA-ORD-9842",
      date: "18 Sep 2026",
      status: "In Transit",
      total: 6899,
      itemCount: 1,
      itemsSummary: "Eternal Rose & Gold Anniversary Trunk",
    },
    {
      id: "AYRA-ORD-7215",
      date: "04 Aug 2026",
      status: "Delivered",
      total: 4499,
      itemCount: 1,
      itemsSummary: "The Royal Blush Birthday Hamper",
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs text-ayra-rose-medium font-medium mb-3 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account</span>
          </Link>
          <h1 className="font-serif text-3xl text-ayra-charcoal font-normal">
            Your Order History
          </h1>
          <p className="font-sans text-xs text-ayra-charcoal/60 mt-1">
            Track deliveries and view itemized invoices for your luxury orders.
          </p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-white border border-ayra-blush-100 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-ayra-blush-100 flex items-center justify-center text-ayra-rose shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-ayra-charcoal">
                      {order.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-medium ${
                        order.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-blue-50 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="font-serif text-sm font-medium text-ayra-charcoal mt-1">
                    {order.itemsSummary}
                  </p>
                  <p className="text-[11px] text-ayra-charcoal/50 font-sans">
                    Placed on {order.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-ayra-blush-100/60">
                <span className="font-serif text-lg font-semibold text-ayra-charcoal">
                  ₹{order.total.toLocaleString()}
                </span>
                <Link
                  href={`/order-confirmation/${order.id}`}
                  className="px-4 py-2 rounded-full border border-ayra-blush-200 text-xs text-ayra-charcoal hover:bg-ayra-peach-50 font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
