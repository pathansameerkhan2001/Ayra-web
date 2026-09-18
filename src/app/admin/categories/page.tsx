"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, Edit2, ArrowUpDown } from "lucide-react";
import { DEFAULT_OCCASIONS } from "@/components/ExploreByOccasion";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(
    DEFAULT_OCCASIONS.map((occ, idx) => ({
      ...occ,
      sortOrder: idx + 1,
      isActive: true,
      productCount: 1,
    }))
  );

  const toggleActive = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
          Occasion & Category Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage the 6 signature occasions featured on the Ayra Hampers homepage.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
            <tr>
              <th className="p-4">Sort</th>
              <th className="p-4">Occasion / Category</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-4 font-mono font-semibold text-gray-400">#{cat.sortOrder}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#FAF7F2] border border-gray-200 shrink-0">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                    </div>
                    <span className="font-serif font-semibold text-gray-900 text-sm">
                      {cat.name}
                    </span>
                  </div>
                </td>
                <td className="p-4 font-mono text-gray-500">/collections/{cat.slug}</td>
                <td className="p-4">
                  <button
                    onClick={() => toggleActive(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                      cat.isActive
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.isActive ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{cat.isActive ? "Active on Homepage" : "Hidden"}</span>
                  </button>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-[#FAF1EC] text-[#B97878] hover:bg-[#F2DDD4]">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
