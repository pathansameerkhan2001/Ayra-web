"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Check, Star } from "lucide-react";
import { FALLBACK_PRODUCTS } from "@/services/products";

export default function AdminEditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const product = FALLBACK_PRODUCTS.find((p) => p.id === id) || FALLBACK_PRODUCTS[0];

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.base_price);
  const [comparePrice, setComparePrice] = useState(product.compare_at_price || 0);
  const [tagline, setTagline] = useState(product.tagline || "");
  const [description, setDescription] = useState(product.description || "");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      router.push("/admin/products");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-gray-900">
            Edit: {product.name}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs font-sans">
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            Product Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Hamper Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Compare Price (₹)</label>
              <input
                type="number"
                value={comparePrice}
                onChange={(e) => setComparePrice(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>
          </div>
        </div>

        {/* Current Image */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            Primary Image
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={product.images[0]?.image_url || "/images/occasions/birthday.jpg"}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">ayra-products/{product.category?.slug || "general"}/</p>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
                Primary Image Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#B97878] text-white font-semibold hover:bg-[#8C4A4A] shadow-sm flex items-center gap-1.5"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? "Saved Changes!" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
