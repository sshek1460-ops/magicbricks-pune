"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export default function ParallaxDivider() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { yPercent: -20, scale: 1.15 }, {
          yPercent: 20, scale: 1, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <div ref={imgRef} className="absolute inset-[-10%] will-change-transform">
        <img src="/images/378443174955100855.jpg" alt="" className="w-full h-full object-cover" style={{ display: "block" }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(5,5,5,0.55)" }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div>
          <p className="font-display text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--bronze)" }}>Beyond the ordinary</p>
          <h2 className="font-editorial italic text-3xl md:text-6xl text-white max-w-2xl leading-[1.15]">
            Every property has a <span style={{ color: "var(--champagne)" }}>purpose</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
