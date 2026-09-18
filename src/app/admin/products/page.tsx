"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Eye, Star, CheckCircle, XCircle } from "lucide-react";
import { FALLBACK_PRODUCTS } from "@/services/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku || "").toLowerCase().includes(search.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
            Product & Hamper Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your luxury catalog, pricing, SKUs, and inventory.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B97878] text-white text-xs font-semibold hover:bg-[#8C4A4A] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hamper</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hampers by title, SKU, or occasion..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#B97878]"
          />
        </div>
        <span className="text-xs text-gray-500 font-medium">
          {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Hamper Details</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF7F2] border border-gray-200 shrink-0">
                        <Image
                          src={product.images[0]?.image_url || "/images/occasions/birthday.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-serif font-semibold text-gray-900 block text-sm">
                          {product.name}
                        </span>
                        {product.is_featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.2 rounded-full font-medium">
                            <Star className="w-2.5 h-2.5 fill-current" /> Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-medium text-gray-500">{product.sku}</td>
                  <td className="p-4 font-medium text-gray-800">{product.category?.name || "General"}</td>
                  <td className="p-4">
                    <span className="font-serif font-bold text-gray-900 text-sm">
                      ₹{product.base_price.toLocaleString()}
                    </span>
                    {product.compare_at_price && (
                      <span className="text-[11px] text-gray-400 line-through block">
                        ₹{product.compare_at_price.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(product.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                        product.is_active
                          ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {product.is_active ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-gray-400" /> Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-[#B97878] inline-block"
                      title="View Live Product"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="p-1.5 rounded-lg bg-[#FAF1EC] text-[#B97878] hover:bg-[#F2DDD4] inline-block"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
