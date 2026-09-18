"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Sparkles,
  ChevronRight,
  Gift,
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUserEmail(data.user.email || null);
        setUserName(data.user.user_metadata?.full_name || "Valued Client");
      } else {
        // Provide gentle guest mode or fallback
        setUserEmail("guest@ayrahampers.com");
        setUserName("Guest Patron");
      }
      setIsLoading(false);
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        {/* Profile Card Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-ayra-blush-200 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-ayra-peach-100 border-2 border-ayra-blush-200 flex items-center justify-center text-ayra-rose text-2xl font-serif">
              {userName?.charAt(0) || "A"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl text-ayra-charcoal font-normal">
                  {userName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-ayra-champagne-light text-ayra-champagne-dark">
                  VIP Patron
                </span>
              </div>
              <p className="text-xs text-ayra-charcoal/60 font-sans mt-0.5">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-ayra-blush-200 text-xs text-ayra-charcoal/70 hover:text-rose-600 hover:border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Orders */}
          <Link
            href="/account/orders"
            className="p-6 rounded-3xl bg-white border border-ayra-blush-100 shadow-subtle hover:shadow-luxury hover:border-ayra-blush-300 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-ayra-blush-100 flex items-center justify-center text-ayra-rose mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-lg text-ayra-charcoal font-medium">Order History</h2>
              <p className="text-xs text-ayra-charcoal/60 font-sans mt-1">
                Track your luxury hamper deliveries and view past receipts.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-ayra-rose font-medium mt-6">
              <span>View Orders</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-6 rounded-3xl bg-white border border-ayra-blush-100 shadow-subtle hover:shadow-luxury hover:border-ayra-blush-300 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-ayra-blush-100 flex items-center justify-center text-ayra-rose mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 fill-ayra-rose" />
              </div>
              <h2 className="font-serif text-lg text-ayra-charcoal font-medium">Saved Hampers</h2>
              <p className="text-xs text-ayra-charcoal/60 font-sans mt-1">
                Your curated personal collection of favorite gift boxes.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-ayra-rose font-medium mt-6">
              <span>View Wishlist</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Addresses */}
          <Link
            href="/account/addresses"
            className="p-6 rounded-3xl bg-white border border-ayra-blush-100 shadow-subtle hover:shadow-luxury hover:border-ayra-blush-300 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-ayra-blush-100 flex items-center justify-center text-ayra-rose mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-lg text-ayra-charcoal font-medium">Address Book</h2>
              <p className="text-xs text-ayra-charcoal/60 font-sans mt-1">
                Manage your primary and recipient shipping addresses.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-ayra-rose font-medium mt-6">
              <span>Manage Addresses</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
