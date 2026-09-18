"use client";

import React, { useState } from "react";
import { Plus, Tag, CheckCircle, XCircle, Trash2 } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    {
      id: "coup-1",
      code: "AYRALUXE10",
      discountType: "percentage",
      value: "10%",
      minSpend: 1000,
      usedCount: 24,
      limit: 100,
      isActive: true,
    },
    {
      id: "coup-2",
      code: "WELCOME500",
      discountType: "fixed_amount",
      value: "₹500",
      minSpend: 3000,
      usedCount: 58,
      limit: 200,
      isActive: true,
    },
  ]);

  const [newCode, setNewCode] = useState("");
  const [newValue, setNewValue] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    setCoupons([
      ...coupons,
      {
        id: `coup-${Date.now()}`,
        code: newCode.toUpperCase(),
        discountType: "percentage",
        value: `${newValue}%`,
        minSpend: 2000,
        usedCount: 0,
        limit: 100,
        isActive: true,
      },
    ]);
    setNewCode("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
            Promo Codes & VIP Coupons
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create percentage discounts, fixed reductions, and minimum spend rules.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B97878] text-white text-xs font-semibold hover:bg-[#8C4A4A] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
            <tr>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Min. Spend</th>
              <th className="p-4">Usage</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-sans">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-4 font-mono font-bold text-gray-900 text-sm">
                  {c.code}
                </td>
                <td className="p-4 font-semibold text-emerald-700">{c.value} OFF</td>
                <td className="p-4 font-medium text-gray-600">₹{c.minSpend.toLocaleString()}</td>
                <td className="p-4 text-gray-600">
                  {c.usedCount} / {c.limit} used
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Active
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setCoupons(coupons.filter((x) => x.id !== c.id))}
                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white max-w-sm w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-gray-900">Create New Coupon</h3>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. DIWALI20"
                  className="w-full p-2.5 rounded-xl border border-gray-200 uppercase outline-none focus:border-[#B97878]"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Discount %</label>
                <input
                  type="number"
                  required
                  value={newValue}
                  onChange={(e) => setNewValue(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#B97878]"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#B97878] text-white font-semibold hover:bg-[#8C4A4A]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
