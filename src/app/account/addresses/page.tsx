"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, ArrowLeft, Plus, Trash2, Edit2 } from "lucide-react";

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      name: "Radhika Merchant",
      phone: "+91 98765 43210",
      line1: "Flat 402, Royale Palms, Bandra West",
      line2: "Near Sea Breeze Cafe",
      city: "Mumbai",
      state: "Maharashtra",
      pin: "400050",
      isDefault: true,
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-xs text-ayra-rose-medium font-medium mb-3 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Account</span>
            </Link>
            <h1 className="font-serif text-3xl text-ayra-charcoal font-normal">
              Saved Delivery Addresses
            </h1>
            <p className="font-sans text-xs text-ayra-charcoal/60 mt-1">
              Add and manage recipient addresses for faster gifting checkouts.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold hover:bg-ayra-rose-deep transition-all shadow-subtle self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-6 rounded-3xl bg-white border border-ayra-blush-100 shadow-subtle relative flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-semibold text-ayra-charcoal">
                    {addr.name}
                  </h3>
                  {addr.isDefault && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium bg-ayra-peach-100 text-ayra-rose">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-ayra-charcoal/80 font-sans leading-relaxed">
                  {addr.line1}, {addr.line2 && `${addr.line2}, `}
                  <br />
                  {addr.city}, {addr.state} - {addr.pin}
                </p>
                <p className="text-xs text-ayra-charcoal/60 font-sans pt-1">
                  Phone: {addr.phone}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-ayra-blush-100/60 text-xs font-sans text-ayra-charcoal/70">
                <button className="flex items-center gap-1 hover:text-ayra-rose">
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center gap-1 hover:text-rose-600">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
