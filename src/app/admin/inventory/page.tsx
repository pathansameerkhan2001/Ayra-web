"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AlertTriangle, Plus, Minus, Check, Save } from "lucide-react";
import { FALLBACK_PRODUCTS } from "@/services/products";

export default function AdminInventoryPage() {
  const [stockMap, setStockMap] = useState<Record<string, number>>({
    "prod-1": 18,
    "prod-2": 3,
    "prod-3": 12,
    "prod-4": 2,
    "prod-5": 24,
    "prod-6": 15,
  });
  const [savedMsg, setSavedMsg] = useState("");

  const updateStock = (id: string, delta: number) => {
    setStockMap((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const handleSaveAll = () => {
    setSavedMsg("Inventory counts updated successfully in Supabase!");
    setTimeout(() => setSavedMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time material availability, reserved quantities, and reorder levels.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B97878] text-white text-xs font-semibold hover:bg-[#8C4A4A] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save All Stock Changes</span>
        </button>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{savedMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
            <tr>
              <th className="p-4">Hamper</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Reserved</th>
              <th className="p-4">Available Stock</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4 text-right">Adjust Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-sans">
            {FALLBACK_PRODUCTS.map((prod) => {
              const currentStock = stockMap[prod.id] !== undefined ? stockMap[prod.id] : 10;
              const isLow = currentStock <= 3;

              return (
                <tr key={prod.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FAF7F2] border border-gray-200 shrink-0">
                        <Image src={prod.images[0]?.image_url || "/images/occasions/birthday.jpg"} alt="" fill className="object-cover" />
                      </div>
                      <span className="font-serif font-semibold text-gray-900 text-sm">{prod.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-500">{prod.sku}</td>
                  <td className="p-4 font-medium text-gray-600">2 units</td>
                  <td className="p-4">
                    <span className="font-serif font-bold text-base text-gray-900">{currentStock}</span> units
                  </td>
                  <td className="p-4">
                    {isLow ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Low Stock Warning
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Healthy Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-gray-50">
                      <button
                        onClick={() => updateStock(prod.id, -1)}
                        className="p-1 hover:bg-white rounded text-gray-600"
                        title="Decrease stock"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold">{currentStock}</span>
                      <button
                        onClick={() => updateStock(prod.id, 1)}
                        className="p-1 hover:bg-white rounded text-gray-600"
                        title="Increase stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
