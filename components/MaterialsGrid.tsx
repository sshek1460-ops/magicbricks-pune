"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const MATERIALS = [
  { name: "Bronze", desc: "Warmth cast in metal", src: "/images/materials/bronze.png" },
  { name: "Travertine", desc: "Ancient stone, modern form", src: "/images/materials/travertine.png" },
  { name: "Oak", desc: "Strength in every grain", src: "/images/materials/oak.png" },
];

export default function MaterialsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 80, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1,
        duration: 1.2, delay: i * 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-28 md:py-36 overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 text-center">
        <span className="uppercase font-display text-xs tracking-[0.25em]" style={{ color: "var(--muted-ink)", opacity: 0.6 }}>The Craft</span>
        <div className="w-8 h-[1px] mx-auto mt-3" style={{ backgroundColor: "var(--champagne)", opacity: 0.5 }} />
      </div>
      <h2 className="font-editorial italic text-4xl md:text-5xl text-center pt-16 pb-12 md:pb-16 px-6" style={{ color: "var(--champagne)" }}>
        Materials that matter
      </h2>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATERIALS.map((m, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group relative overflow-hidden rounded-sm opacity-0 will-change-transform"
              style={{ backgroundColor: "var(--ink)" }}
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={m.src} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)" }}>
                <h3 className="font-display text-lg tracking-[0.15em] uppercase text-white">{m.name}</h3>
                <p className="font-editorial italic text-sm mt-1" style={{ color: "var(--champagne)", opacity: 0.8 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
