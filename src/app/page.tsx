import React from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Luxury Header */}
      <Header />

      {/* Hero Section */}
      <Hero />
    </main>
  );
}
