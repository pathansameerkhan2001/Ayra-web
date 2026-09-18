"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle, Truck, Package, ShieldCheck, Mail, Phone, MapPin, Printer } from "lucide-react";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "AYRA-ORD-9842";

  const [orderStatus, setOrderStatus] = useState("processing");
  const [paymentStatus, setPaymentStatus] = useState("paid");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl font-bold text-gray-900">
              Order: {id}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 uppercase">
              {orderStatus}
            </span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Packing Slip</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Order Items & Delivery Note */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Curated Items in Order
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#B97878]">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-gray-900">
                      Eternal Rose & Gold Anniversary Trunk
                    </h3>
                    <p className="text-[11px] text-gray-500">SKU: AYRA-ANNV-002 • Qty: 1</p>
                  </div>
                </div>
                <span className="font-serif font-bold text-sm text-gray-900">₹6,899</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹6,899</span>
              </div>
              <div className="flex justify-between">
                <span>Luxury Express Shipping</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 border-t border-gray-100 pt-2">
                <span>Grand Total</span>
                <span className="font-serif text-base">₹6,899</span>
              </div>
            </div>
          </div>

          {/* Gift Message Card */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-2">
            <h2 className="font-serif text-base font-bold text-gray-900">
              Bespoke Gift Note Message
            </h2>
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8C7B7]/50 text-xs italic text-gray-700">
              &ldquo;Wishing you a very happy 10th anniversary! May your days ahead be filled with eternal joy and laughter. Love, Radhika & Family.&rdquo;
            </div>
          </div>
        </div>

        {/* Right Col: Customer & Status Controls */}
        <div className="space-y-6">
          {/* Status Control */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4 text-xs">
            <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Fulfillment Controls
            </h2>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Order Status</label>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              >
                <option value="pending">Pending Confirmation</option>
                <option value="processing">Processing & Assembling</option>
                <option value="shipped">Shipped via BlueDart Luxury</option>
                <option value="delivered">Delivered to Recipient</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              >
                <option value="paid">Paid (Online Transfer/UPI)</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Customer Address Card */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3 text-xs">
            <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Recipient Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold text-gray-900 text-sm">Radhika Merchant</p>
              <div className="flex items-center gap-2 text-gray-500">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="w-3.5 h-3.5" />
                <span>radhika@example.com</span>
              </div>
              <div className="flex items-start gap-2 text-gray-500 pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Flat 402, Royale Palms, Bandra West, Mumbai, Maharashtra - 400050
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
