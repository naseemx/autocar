'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AcquisitionBar from '@/components/AcquisitionBar';
import TrustIntro from '@/components/TrustIntro';
import LifestyleBanner from '@/components/LifestyleBanner';
import TrustFeatures from '@/components/TrustFeatures';
import ClientTrustBento from '@/components/ClientTrustBento';
import VehicleMakesMarquee from '@/components/VehicleMakesMarquee';
import NationwideAcquisition from '@/components/NationwideAcquisition';
import EngineDamageSection from '@/components/EngineDamageSection';
import BetterAlternativeSection from '@/components/BetterAlternativeSection';
import MarketInsights from '@/components/MarketInsights';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  const scrollToForm = () => {
    document.getElementById('acquisition')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Header (Navbar matching design) */}
      <Header
        onOpenCalculator={scrollToForm}
      />

      {/* 2. Hero Section (Screenshot 1: Dark curved container, white SUV, navigation dots, controls) */}
      <HeroSection
        onOpenCalculator={scrollToForm}
      />

      {/* 3. Floating Acquisition Search Bar (Screenshot 1: Overlapping pill card with Cars/Vans tabs, dates, locations) */}
      <AcquisitionBar />

      {/* 4. Trust Intro (Screenshot 1 bottom: "Acquire with trust" dual column text layout) */}
      <TrustIntro />

      {/* 5. Lifestyle Travel Banner & 3 Features (Screenshot 2: Photo banner + floating inset badge + 3 feature cards) */}
      <LifestyleBanner />
      <TrustFeatures />

      {/* 6. Why Clients Trust Us (3x2 Bento Grid with Alternating Cards, Rims, Steering Wheel, and Giant Watermark) */}
      <ClientTrustBento />

      {/* 7. We Accept Vehicles of All Makes (Dual-line Logo Marquee) */}
      <VehicleMakesMarquee />

      {/* 8. Nationwide Acquisition & How It Works (Image 1 Layout + Image 2 German Context) */}
      <NationwideAcquisition />

      {/* 9. Selling a car with engine damage - Finding a fair solution (Image 1 '02' Design + Image 2 Context) */}
      <EngineDamageSection />

      {/* 10. The Better Alternative to wirkaufendeinauto (Dual Image Grid + 2 Advantages + TO THE FORM CTA) */}
      <BetterAlternativeSection />

      {/* 11. Market Insights & Buyer Guides (Screenshot 3: News & Insights, filter pills, carousel arrows, 4 cards) */}
      <MarketInsights />

      {/* 7. Real Testimonials Carousel (Screenshot 4 top: Ukrainian/English reviews, center floating dark card, stars) */}
      <Testimonials />

      {/* 8. FAQ Accordion (Screenshot 4 bottom: "FAQ", 01-05 numbered cards with smooth accordion expand/collapse) */}
      <FaqSection />

      {/* 9. Footer with Escrow Badges & Hotline */}
      <Footer />
    </main>
  );
}
