"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export default function EditorialBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (img1Ref.current) {
        gsap.fromTo(img1Ref.current, { yPercent: -15, scale: 1.1 }, {
          yPercent: 15, scale: 1, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      }
      if (img2Ref.current) {
        gsap.fromTo(img2Ref.current, { yPercent: 15, scale: 1.15 }, {
          yPercent: -15, scale: 1, ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.8 },
        });
      }
      if (textRef.current) {
        gsap.fromTo(textRef.current, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none none" },
        });
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[90vh] md:h-screen overflow-hidden" style={{ backgroundColor: "#050505" }}>
      <div className="absolute inset-0 grid grid-cols-2 gap-0">
        <div ref={img1Ref} className="relative overflow-hidden will-change-transform">
          <img src="/images/editorial/staircase.png" alt="" className="w-full h-full object-cover" style={{ display: "block", objectPosition: "center" }} />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div ref={img2Ref} className="relative overflow-hidden will-change-transform">
          <img src="/images/editorial/living.png" alt="" className="w-full h-full object-cover" style={{ display: "block", objectPosition: "center" }} />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6 opacity-0 will-change-transform">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
          <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--bronze)]">The Lifestyle</span>
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
        </div>
        <h2 className="font-editorial italic text-4xl md:text-7xl text-white max-w-3xl leading-[1.1]">
          Where every corner <br />tells a story
        </h2>
      </div>
    </section>
  );
}
