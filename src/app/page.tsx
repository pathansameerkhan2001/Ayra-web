import React from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ExploreByOccasion } from "@/components/ExploreByOccasion";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { NewArrivals } from "@/components/NewArrivals";
import { BrandStory } from "@/components/BrandStory";
import { InstagramReels } from "@/components/InstagramReels";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Luxury Header with Search & Bag Badges */}
      <Header />

      {/* 3. Hero Section Slider */}
      <Hero />

      {/* 4. Explore By Occasion Section (Large Perfect Circles ~150px Desktop) */}
      <div id="occasions">
        <ExploreByOccasion />
      </div>

      {/* 5. Featured Signature Hampers */}
      <div id="shop">
        <FeaturedProducts />
      </div>

      {/* 6. Brand Story & Craftsmanship Pillars */}
      <div id="about">
        <BrandStory />
      </div>

      {/* 7. Fresh New Arrivals */}
      <NewArrivals />

      {/* 8. Instagram Reels Section ("Follow the Ayra Moments") */}
      <InstagramReels />

      {/* 9. Verified Customer Testimonials */}
      <Testimonials />

      {/* 10. Luxury Footer */}
      <Footer />
    </main>
  );
}
