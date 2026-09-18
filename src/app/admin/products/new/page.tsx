"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Check, Loader2 } from "lucide-react";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    basePrice: 4499,
    comparePrice: 5299,
    categorySlug: "birthday",
    sku: "AYRA-BDAY-",
    stock: 25,
    isFeatured: true,
    isNew: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate creation
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/products");
    }, 800);
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
            Create Luxury Hamper
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
        {/* Basic Information */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            1. Hamper Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Hamper Title *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({
                    ...formData,
                    name: val,
                    slug: val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                  });
                }}
                placeholder="e.g. Velvet Rose & Champagne Celebration Box"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. velvet-rose-champagne-box"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Occasion / Category *</label>
              <select
                value={formData.categorySlug}
                onChange={(e) => setFormData({ ...formData, categorySlug: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878] cursor-pointer"
              >
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="diwali-gifts">Diwali Gifts</option>
                <option value="new-born">New Born</option>
                <option value="thank-you">Thank You</option>
                <option value="corporate-gifting">Corporate Gifting</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Short Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Handcrafted truffles, peach blooms & crystal flutes"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Full Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the inclusions, aesthetic, packaging, and emotional touch of this hamper..."
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            2. Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Selling Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Compare-at Price (₹)</label>
              <input
                type="number"
                value={formData.comparePrice}
                onChange={(e) => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">SKU Code *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
              />
            </div>
          </div>
        </div>

        {/* Image Upload Area (Supabase Storage: ayra-products) */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            3. Product Images (Supabase Storage: ayra-products)
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-[#B97878] mx-auto mb-2" />
            <p className="font-medium text-gray-800">Click to upload product photography</p>
            <p className="text-[11px] text-gray-400 mt-1">
              Supports JPEG, PNG, WebP up to 5MB. Uploaded directly to <span className="font-mono">ayra-products/{formData.categorySlug}/</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#B97878] text-white font-semibold hover:bg-[#8C4A4A] shadow-sm flex items-center gap-1.5"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>Publish Hamper</span>
          </button>
        </div>
      </form>
    </div>
  );
}
