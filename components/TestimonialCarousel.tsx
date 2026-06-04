"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const TESTIMONIALS = [
  { quote: "They found us a home that felt like it was already ours. Every detail, every corner — perfect.", name: "Ananya & Rohit Mehra", role: "Homebuyers, Kalyani Nagar" },
  { quote: "Selling through Magicbricks Pune was seamless. The valuation was spot-on and the close came in weeks, not months.", name: "Vikram Rajan", role: "Seller, Baner" },
  { quote: "As an investor, I need precision. Their market insight and off-market access gave me an edge I hadn't found anywhere else.", name: "Neha Kapoor", role: "Investor, Koregaon Park" },
  { quote: "From first visit to handing over the keys — absolute class. This isn't a real estate agency, it's a concierge service.", name: "Aditya Singhania", role: "Buyer, Hinjewadi" },
];

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const next = useCallback(() => setActive((a) => (a + 1) % TESTIMONIALS.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#0f0d0a" }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, var(--champagne) 0%, transparent 60%)" }} aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
          <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--bronze)]">Kind Words</span>
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
        </div>

        <div className="relative min-h-[300px] md:min-h-[240px]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                opacity: i === active ? 1 : 0,
                visibility: i === active ? "visible" : "hidden",
                transition: "opacity 0.6s ease, visibility 0.6s ease",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <svg className="w-8 h-8 mb-6" viewBox="0 0 24 24" fill="none" style={{ color: "var(--bronze)", opacity: 0.5 }}>
                <path d="M3 21C3 21 4 12 7 6C10 0 14 0 14 0C14 0 11 3 10 6C9 9 10 12 10 12L3 21Z" fill="currentColor" />
                <path d="M13 21C13 21 14 12 17 6C20 0 24 0 24 0C24 0 21 3 20 6C19 9 20 12 20 12L13 21Z" fill="currentColor" />
              </svg>
              <blockquote className="font-editorial italic text-2xl md:text-3xl leading-[1.4] text-white/90 max-w-2xl mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <cite className="not-italic">
                <span className="font-display text-sm tracking-[0.15em] uppercase text-[var(--champagne)] block">{t.name}</span>
                <span className="font-editorial text-xs" style={{ color: "var(--muted-ink)" }}>{t.role}</span>
              </cite>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i === active ? "var(--bronze)" : "rgba(200,169,106,0.2)",
                width: i === active ? 24 : 8,
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
