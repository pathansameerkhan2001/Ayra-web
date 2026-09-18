"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone, ShoppingBag } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers] = useState([
    {
      id: "cust-1",
      name: "Radhika Merchant",
      email: "radhika@example.com",
      phone: "+91 98765 43210",
      city: "Mumbai",
      ordersCount: 4,
      totalSpent: 24296,
      joinedDate: "12 Jan 2026",
    },
    {
      id: "cust-2",
      name: "Vikram Singhania",
      email: "vikram@example.com",
      phone: "+91 98220 11223",
      city: "Delhi NCR",
      ordersCount: 2,
      totalSpent: 13498,
      joinedDate: "28 Feb 2026",
    },
    {
      id: "cust-3",
      name: "Ayesha Kapoor",
      email: "ayesha@example.com",
      phone: "+91 98450 55667",
      city: "Bangalore",
      ordersCount: 3,
      totalSpent: 16897,
      joinedDate: "15 Apr 2026",
    },
    {
      id: "cust-4",
      name: "Karan Johar",
      email: "karan@example.com",
      phone: "+91 98111 88990",
      city: "Mumbai",
      ordersCount: 6,
      totalSpent: 42194,
      joinedDate: "05 Jun 2026",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
          Customer & VIP Patrons Directory
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Registered patrons, total purchase volume, and customer relationship metrics.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Location</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4 text-right">Patron Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-sans">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FAF1EC] border border-[#E8C7B7] flex items-center justify-center font-serif font-bold text-[#B97878]">
                        {cust.name.charAt(0)}
                      </div>
                      <span className="font-serif font-semibold text-gray-900 text-sm">
                        {cust.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{cust.email}</p>
                    <p className="text-[11px] text-gray-500">{cust.phone}</p>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{cust.city}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-800">
                      {cust.ordersCount} Orders
                    </span>
                  </td>
                  <td className="p-4 font-serif font-bold text-sm text-gray-900">
                    ₹{cust.totalSpent.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-gray-500">{cust.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
