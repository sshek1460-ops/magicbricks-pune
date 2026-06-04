"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initLenis, destroyLenis } from "@/lib/lenis";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import FloatingNav from "@/components/FloatingNav";
import BackToTop from "@/components/BackToTop";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProcessSteps from "@/components/ProcessSteps";
import ManifestoSection from "@/components/ManifestoSection";
import GalleryGrid from "@/components/GalleryGrid";
import EditorialBreak from "@/components/EditorialBreak";
import AnthologySection from "@/components/AnthologySection";
import SignatureAmenitiesSection from "@/components/SignatureAmenitiesSection";
import StatsCounter from "@/components/StatsCounter";
import MaterialsGrid from "@/components/MaterialsGrid";
import ServicesSection from "@/components/ServicesSection";
import ParallaxDivider from "@/components/ParallaxDivider";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import PrivateAccessSection from "@/components/PrivateAccessSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = initLenis();

    let lenisRaf: ((time: number) => void) | null = null;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);

      lenisRaf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      destroyLenis();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader />
      <ScrollProgressBar />
      <FloatingNav />
      <BackToTop />
      <main ref={mainRef} id="main-content" role="main">
        <div id="hero-root" style={{ height: "450vh", position: "relative" }}>
          <HeroSection />
        </div>
        <MarqueeStrip />
        <ProcessSteps />
        <ManifestoSection />
        <GalleryGrid />
        <EditorialBreak />
        <AnthologySection />
        <SignatureAmenitiesSection />
        <StatsCounter />
        <MaterialsGrid />
        <ServicesSection />
        <ParallaxDivider />
        <TestimonialCarousel />
        <PrivateAccessSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </>
  );
}
