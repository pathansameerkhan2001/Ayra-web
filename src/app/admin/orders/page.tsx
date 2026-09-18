"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Eye, Filter, CheckCircle, Clock, Truck, XCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "AYRA-ORD-9842",
      customer: "Radhika Merchant",
      email: "radhika@example.com",
      phone: "+91 98765 43210",
      city: "Mumbai",
      date: "Today, 2:15 PM",
      total: 6899,
      status: "processing",
      itemsCount: 1,
      itemsSummary: "Eternal Rose & Gold Anniversary Trunk",
    },
    {
      id: "AYRA-ORD-9841",
      customer: "Vikram Singhania",
      email: "vikram@example.com",
      phone: "+91 98220 11223",
      city: "Delhi NCR",
      date: "Today, 11:30 AM",
      total: 7499,
      status: "pending",
      itemsCount: 1,
      itemsSummary: "Executive Heritage Matte Black & Gold Trunk",
    },
    {
      id: "AYRA-ORD-9840",
      customer: "Ayesha Kapoor",
      email: "ayesha@example.com",
      phone: "+91 98450 55667",
      city: "Bangalore",
      date: "Yesterday",
      total: 4499,
      status: "shipped",
      itemsCount: 1,
      itemsSummary: "The Royal Blush Birthday Hamper",
    },
    {
      id: "AYRA-ORD-9839",
      customer: "Karan Johar",
      email: "karan@example.com",
      phone: "+91 98111 88990",
      city: "Mumbai",
      date: "16 Sep 2026",
      total: 5999,
      status: "delivered",
      itemsCount: 1,
      itemsSummary: "Grand Imperial Diwali Royal Chest",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((o) => {
    if (filterStatus !== "all" && o.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
          Customer Orders Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review, fulfill, and update order statuses in real-time.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by ID, client name, or city..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#B97878]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-500">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#B97878] cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Order Reference</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Delivery City</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-sans">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-gray-900 block">{ord.id}</span>
                    <span className="text-[11px] text-gray-400">{ord.date}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-gray-900 block">{ord.customer}</span>
                    <span className="text-[11px] text-gray-500">{ord.phone}</span>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{ord.city}</td>
                  <td className="p-4 font-serif font-bold text-sm text-gray-900">
                    ₹{ord.total.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => updateStatus(ord.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border outline-none cursor-pointer ${
                        ord.status === "delivered"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : ord.status === "processing"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : ord.status === "shipped"
                          ? "bg-purple-50 text-purple-800 border-purple-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="p-1.5 rounded-lg bg-[#FAF1EC] text-[#B97878] hover:bg-[#F2DDD4] inline-flex items-center gap-1 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
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
