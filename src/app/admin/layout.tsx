"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Warehouse,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Sliders,
  Instagram,
  Settings,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Inventory", href: "/admin/inventory", icon: Warehouse },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Coupons", href: "/admin/coupons", icon: Tag },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
    { name: "Hero Slider", href: "/admin/hero", icon: Sliders },
    { name: "Instagram Reels", href: "/admin/instagram", icon: Instagram },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EC] text-slate-800 flex flex-col lg:flex-row font-sans">
      {/* Mobile Admin Header */}
      <header className="lg:hidden h-16 bg-[#1A1514] text-white px-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-serif text-lg tracking-wider font-semibold text-white">
            AYRA ADMIN
          </span>
        </div>
        <Link
          href="/"
          target="_blank"
          className="text-xs text-rose-300 hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </header>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1514] text-white flex flex-col justify-between p-4 transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Logo / Admin Header */}
          <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="font-serif text-xl tracking-wider font-semibold text-white block">
                AYRA HAMPERS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#E8B7B5] font-medium">
                Store Operations Portal
              </span>
            </div>
          </div>

          {/* Nav items */}
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#B97878] text-white shadow-md"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-[11px] text-white/60 px-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authenticated Admin Role</span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Admin Top Header */}
        <header className="hidden lg:flex h-16 bg-white border-b border-gray-200 px-8 items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans">
              Admin Portal
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-800 capitalize">
              {pathname === "/admin" ? "Overview" : pathname?.replace("/admin/", "").replace("/", " / ")}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
              ● Supabase Connected
            </span>
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8C7B7] flex items-center justify-center text-[#B97878] font-serif font-bold text-sm">
              A
            </div>
          </div>
        </header>

        {/* Children Pages */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
