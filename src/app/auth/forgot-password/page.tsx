"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/account`,
    });

    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-md mx-auto px-4 py-16 sm:py-20 flex-1 w-full flex items-center justify-center">
        <div className="w-full p-8 sm:p-10 rounded-3xl bg-white border border-ayra-blush-200 shadow-xl space-y-6">
          <div className="text-center">
            <h1 className="font-serif text-2xl sm:text-3xl text-ayra-charcoal font-normal">
              Reset Password
            </h1>
            <p className="font-sans text-xs text-ayra-charcoal/60 mt-1">
              Enter your email and we&apos;ll send you password reset instructions.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-sans text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
              <p>Password reset instructions have been sent to your email.</p>
              <Link
                href="/auth/login"
                className="inline-block mt-2 font-semibold text-emerald-900 underline"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4 text-xs font-sans">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-center">
                  {errorMessage}
                </div>
              )}

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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-ayra-rose-deep transition-all shadow-luxury disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs text-ayra-charcoal/60 hover:text-ayra-rose font-sans"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
