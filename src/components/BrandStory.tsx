import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Truck } from "lucide-react";

export function BrandStory() {
  const pillars = [
    {
      icon: Sparkles,
      title: "Artisanal Perfection",
      description: "Handpicked gourmet treats, everlasting florals, and handcrafted packaging.",
    },
    {
      icon: Heart,
      title: "Crafted with Love",
      description: "Every hamper is assembled by hand with bespoke handwritten notes.",
    },
    {
      icon: Truck,
      title: "Pan-India Luxury Delivery",
      description: "Temperature-controlled secure transit ensuring pristine arrival.",
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Quality",
      description: "Premium materials, velvet rigid boxes, and satin ribbon finishes.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white/60 border-b border-ayra-blush-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Luxury Editorial Image Grid */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-ayra-blush-200">
            <Image
              src="/images/hero-slide-1.jpg"
              alt="Ayra Hampers Craftsmanship and Presentation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ayra-charcoal/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="font-script text-3xl text-ayra-peach-100">Bespoke Elegance</span>
              <p className="text-xs sm:text-sm font-light mt-1 text-white/90">
                &ldquo;A gift isn&apos;t just what is inside the box—it is the feeling of being truly cherished.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-ayra-rose-medium">
                THE AYRA PROMISE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ayra-charcoal font-normal mt-2 leading-tight">
                The Art of Thoughtful Gifting
              </h2>
              <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-3 font-light leading-relaxed">
                At Ayra Hampers, we believe gifting is an intimate expression of gratitude, love, and celebration. Each curation is thoughtfully tailored with premium keepsakes, fine confections, and signature botanical touches to create lasting memories.
              </p>
            </div>

            {/* 4 Feature Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAF7F2] border border-ayra-blush-100 flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-white text-ayra-rose shrink-0 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm font-medium text-ayra-charcoal">
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] text-ayra-charcoal/70 font-sans mt-0.5 leading-snug">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/collections/corporate-gifting"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-ayra-rose text-white text-xs uppercase tracking-widest font-semibold hover:bg-ayra-rose-deep transition-all shadow-subtle hover:shadow-glow"
              >
                Inquire for Bespoke Bulk & Corporate Hampers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
