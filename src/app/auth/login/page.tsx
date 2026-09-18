"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-md mx-auto px-4 py-16 sm:py-20 flex-1 w-full flex items-center justify-center">
        <div className="w-full p-8 sm:p-10 rounded-3xl bg-white border border-ayra-blush-200 shadow-xl space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-ayra-champagne-dark" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-ayra-rose-medium">
                WELCOME BACK
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-ayra-charcoal font-normal">
              Sign In to Ayra
            </h1>
            <p className="font-sans text-xs text-ayra-charcoal/60 mt-1">
              Access your saved hampers, addresses, and order history.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-ayra-charcoal font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ayra-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#FAF7F2] border border-ayra-blush-200 outline-none focus:border-ayra-rose"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-ayra-charcoal font-medium">Password</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] text-ayra-rose font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-ayra-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#FAF7F2] border border-ayra-blush-200 outline-none focus:border-ayra-rose"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-ayra-rose-deep transition-all shadow-luxury hover:shadow-glow disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-ayra-blush-100 text-xs text-ayra-charcoal/70 font-sans">
            Don&apos;t have an account yet?{" "}
            <Link href="/auth/signup" className="text-ayra-rose font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
