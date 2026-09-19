"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Instagram, Play, CheckCircle, XCircle, Trash2, Heart, MessageCircle } from "lucide-react";
import { DEFAULT_INSTAGRAM_REELS } from "@/services/instagram";
import { MediaUploadZone } from "@/components/admin/MediaUploadZone";

export default function AdminInstagramPage() {
  const [reels, setReels] = useState(DEFAULT_INSTAGRAM_REELS);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    setReels([
      ...reels,
      {
        id: `reel-${Date.now()}`,
        title: newTitle,
        reel_url: newUrl,
        thumbnail_url: uploadedThumbnailUrl || "/images/occasions/birthday.jpg",
        likes_count: 1200,
        comments_count: 45,
        display_order: reels.length + 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    setNewTitle("");
    setNewUrl("");
    setUploadedThumbnailUrl("");
    setModalOpen(false);
  };

  const toggleActive = (id: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_active: !r.is_active } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
            Instagram Reels & Moments Showcase
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage the social proof video cards displayed on the homepage. Media stored in <span className="font-mono font-semibold text-gray-700">ayra-products/instagram/</span>.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B97878] text-white text-xs font-semibold hover:bg-[#8C4A4A] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Reel</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="p-3 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image src={reel.thumbnail_url} alt="" fill className="object-cover" />
                <div className="absolute top-2 left-2 p-1 rounded-full bg-black/40 text-white">
                  <Instagram className="w-3 h-3" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-white">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <h4 className="font-serif text-xs font-semibold text-gray-900 mt-2 line-clamp-2">
                {reel.title}
              </h4>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => toggleActive(reel.id)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  reel.is_active ? "bg-emerald-50 text-emerald-800" : "bg-gray-100 text-gray-500"
                }`}
              >
                {reel.is_active ? "Live" : "Draft"}
              </button>
              <button
                onClick={() => setReels(reels.filter((r) => r.id !== reel.id))}
                className="text-gray-400 hover:text-rose-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-lg font-bold text-gray-900">Add Instagram Reel</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Reel Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Unboxing Royal Rose Hamper"
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#B97878]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Instagram Reel URL *</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#B97878]"
                />
              </div>

              <div>
                <MediaUploadZone
                  folder="instagram"
                  acceptType="image"
                  onUploadSuccess={(url) => setUploadedThumbnailUrl(url)}
                  currentUrl={uploadedThumbnailUrl}
                  label="Thumbnail / Poster Image (Optional)"
                  helperText="Upload custom poster image. Stored in ayra-products/instagram/."
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#B97878] text-white font-semibold hover:bg-[#8C4A4A]"
                >
                  Save Reel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
