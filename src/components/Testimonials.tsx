import React from "react";
import { Star, Quote, Heart } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Ananya Sharma",
      city: "Mumbai",
      occasion: "Anniversary Celebration",
      text: "The Eternal Rose hamper left my husband and me completely speechless. The packaging, the gold flutes, the handwritten note—every single detail was pure luxury!",
      rating: 5,
    },
    {
      name: "Rohan & Priya Mehta",
      city: "Bangalore",
      occasion: "New Born Gifting",
      text: "We ordered the Sweet Dreams hamper for our best friends’ baby shower. The heirloom teddy and silver rattle were so exquisite. Truly the best gifting service in India.",
      rating: 5,
    },
    {
      name: "Siddharth Singhania",
      city: "Delhi NCR",
      occasion: "Corporate VIP Gifting",
      text: "Ayra Hampers delivered 45 executive matte black hampers for our board directors. The feedback was phenomenal. Seamless coordination and impeccable finish.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#FAF7F2] border-b border-ayra-blush-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-ayra-champagne-accent text-ayra-champagne-accent" />
            ))}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ayra-charcoal font-normal">
            Loved by Givers & Receivers
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/70 mt-2 font-light">
            Over 5,000+ cherished moments crafted with elegance and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white/80 border border-ayra-blush-100 shadow-subtle flex flex-col justify-between relative group hover:shadow-luxury transition-all duration-500 hover:-translate-y-1"
            >
              <div>
                <Quote className="w-8 h-8 text-ayra-rose-light/40 mb-3" />
                <p className="font-sans text-xs sm:text-sm text-ayra-charcoal/80 font-light leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ayra-blush-100/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-ayra-charcoal">{item.name}</h4>
                  <p className="text-[11px] text-ayra-charcoal/50 font-sans">{item.city} • {item.occasion}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-ayra-blush-100/80 flex items-center justify-center text-ayra-rose">
                  <Heart className="w-3.5 h-3.5 fill-ayra-rose" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
