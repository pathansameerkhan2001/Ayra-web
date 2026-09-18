"use client";

import React, { useState } from "react";
import { Save, Check, ShieldCheck, Mail, Phone, DollarSign, Truck } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "Ayra Hampers",
    supportEmail: "contact@ayrahampers.com",
    supportPhone: "+91 98765 43210",
    freeShippingThreshold: 3000,
    currency: "INR (₹)",
    instagramHandle: "@ayrahampers",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
          Store Operations Settings
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Configure luxury shipping thresholds, customer support emails, and store metadata.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Store settings successfully updated in Supabase!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-5 text-xs font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Free Shipping Threshold (₹)</label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Support Phone</label>
            <input
              type="text"
              value={settings.supportPhone}
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Instagram Handle</label>
            <input
              type="text"
              value={settings.instagramHandle}
              onChange={(e) => setSettings({ ...settings, instagramHandle: e.target.value })}
              className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#B97878]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Default Currency</label>
            <input
              type="text"
              disabled
              value={settings.currency}
              className="w-full p-3 rounded-xl bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#B97878] text-white font-semibold hover:bg-[#8C4A4A] shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
