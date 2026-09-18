"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Plus,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Products", value: "6", change: "+2 this month", icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Active Orders", value: "8", change: "4 pending shipment", icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Registered Patrons", value: "142", change: "+18 this week", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Low Stock Items", value: "2", change: "Requires reorder", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const recentOrders = [
    { id: "AYRA-ORD-9842", customer: "Radhika Merchant", date: "Today, 2:15 PM", total: 6899, status: "Processing", items: "Eternal Rose & Gold Anniversary Trunk" },
    { id: "AYRA-ORD-9841", customer: "Vikram Singhania", date: "Today, 11:30 AM", total: 7499, status: "Pending", items: "Executive Heritage Matte Black & Gold Trunk" },
    { id: "AYRA-ORD-9840", customer: "Ayesha Kapoor", date: "Yesterday", total: 4499, status: "Shipped", items: "The Royal Blush Birthday Hamper" },
    { id: "AYRA-ORD-9839", customer: "Karan Johar", date: "Yesterday", total: 5999, status: "Delivered", items: "Grand Imperial Diwali Royal Chest" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
            Store Operations Overview
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time catalog metrics, customer orders, and inventory status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#B97878] text-white text-xs font-semibold hover:bg-[#8C4A4A] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Hamper</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#B97878]" />
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</span>
                <p className="text-[11px] text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Orders & Inventory / Reviews alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-gray-900">Recent Customer Orders</h2>
              <p className="text-xs text-gray-500">Live order activity across all channels</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#B97878] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Curated Hamper</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-sans">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-3 font-mono font-semibold text-gray-900">{ord.id}</td>
                    <td className="p-3 font-medium text-gray-900">{ord.customer}</td>
                    <td className="p-3 truncate max-w-[180px]">{ord.items}</td>
                    <td className="p-3 font-semibold text-gray-900">₹{ord.total.toLocaleString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          ord.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-800"
                            : ord.status === "Processing"
                            ? "bg-blue-50 text-blue-800"
                            : ord.status === "Shipped"
                            ? "bg-purple-50 text-purple-800"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Quick Panel: Low Stock & Review Moderation */}
        <div className="space-y-6">
          {/* Low Stock Warning Box */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-serif text-base font-bold">Stock Reorder Alerts</h3>
            </div>
            <p className="text-xs text-gray-500">
              2 luxury hampers are running low on inventory materials.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-center">
                <span className="font-medium text-gray-900">Eternal Rose Trunk</span>
                <span className="font-bold text-amber-700">3 units left</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-center">
                <span className="font-medium text-gray-900">Sweet Dreams Newborn</span>
                <span className="font-bold text-amber-700">2 units left</span>
              </div>
            </div>
            <Link
              href="/admin/inventory"
              className="inline-block mt-2 text-xs font-semibold text-[#B97878] hover:underline"
            >
              Manage Inventory →
            </Link>
          </div>

          {/* Pending Reviews Box */}
          <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-purple-900">
              <Star className="w-5 h-5 text-purple-600" />
              <h3 className="font-serif text-base font-bold">Pending Reviews</h3>
            </div>
            <p className="text-xs text-gray-500">
              New customer reviews waiting for approval.
            </p>
            <Link
              href="/admin/reviews"
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 text-purple-800 text-xs font-semibold hover:bg-purple-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Moderate Reviews (3)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
