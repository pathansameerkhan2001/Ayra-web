"use client";

import React, { useState } from "react";
import { Star, Check, X, Trash2, ShieldCheck } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      customer: "Ananya Sharma",
      product: "The Royal Blush Birthday Hamper",
      rating: 5,
      title: "Simply breathtaking!",
      comment: "The presentation, delicate flower tones, and chocolate quality were beyond expectations.",
      isApproved: true,
      date: "Yesterday",
    },
    {
      id: "rev-2",
      customer: "Rohan & Priya Mehta",
      product: "Sweet Dreams Newborn Set",
      rating: 5,
      title: "Perfect baby shower gift",
      comment: "The silver rattle and heirloom plush teddy are of sublime quality. Everyone loved it!",
      isApproved: true,
      date: "14 Sep 2026",
    },
    {
      id: "rev-3",
      customer: "Siddharth Singhania",
      product: "Executive Heritage Corporate Trunk",
      rating: 5,
      title: "Unparalleled corporate finish",
      comment: "Our board members were thoroughly impressed by the gold pen and leather notebook packaging.",
      isApproved: false, // Pending moderation
      date: "Today, 10:45 AM",
    },
  ]);

  const toggleApproval = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: !r.isApproved } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
          Customer Review Moderation
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Approve or hide customer reviews before they appear on live product pages.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-gray-900">{rev.customer}</span>
                <span className="text-xs text-gray-400">• on {rev.product}</span>
                <span className="text-xs text-gray-400">• {rev.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="font-semibold text-xs text-gray-900 ml-1.5">{rev.title}</span>
              </div>

              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 w-full sm:w-auto justify-end">
              <button
                onClick={() => toggleApproval(rev.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  rev.isApproved
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                    : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                {rev.isApproved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Approved</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Approve Now</span>
                  </>
                )}
              </button>

              <button
                onClick={() => deleteReview(rev.id)}
                className="p-2 text-gray-400 hover:text-rose-600 rounded-lg transition-colors"
                title="Delete review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
