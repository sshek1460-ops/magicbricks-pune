"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const IMAGES = [
  { src: "/images/projects/villa-01.webp", alt: "Luxury Villa" },
  { src: "/images/projects/tower-01.webp", alt: "Premium Tower" },
  { src: "/images/projects/estate-01.webp", alt: "Grand Estate" },
  { src: "/images/amenities/pool.png", alt: "Infinity Pool" },
  { src: "/images/amenities/spa.png", alt: "Spa & Wellness" },
  { src: "/images/amenities/vault.png", alt: "Private Vault" },
];

export default function GalleryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(".gallery-item");
    if (!items) return;

    items.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#0f0d0a" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
          <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--bronze)]">Portfolio</span>
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
        </div>
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-center mb-16" style={{ color: "var(--cloud)" }}>
          A glimpse of <span className="font-editorial italic" style={{ color: "var(--champagne)" }}>excellence</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-sm cursor-pointer opacity-0 will-change-transform group ${i === 0 || i === 5 ? "col-span-2 row-span-1" : ""}`}
              style={{ aspectRatio: i === 0 || i === 5 ? "16/9" : "4/5" }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" style={{ display: "block" }} />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transition-transform duration-500 group-hover:translate-y-0 translate-y-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)" }}>
                <span className="font-display text-xs tracking-[0.2em] uppercase text-white">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6 cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6L18 18" /></svg>
          </button>
          <img src={IMAGES[selected].src} alt={IMAGES[selected].alt} className="max-w-full max-h-full object-contain rounded-sm" style={{ display: "block" }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
