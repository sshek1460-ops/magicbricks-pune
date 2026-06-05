"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const LANDMARKS = [
  { label: "Koregaon Park", time: "4 min", active: true },
  { label: "Kalyani Nagar", time: "7 min", active: false },
  { label: "Phoenix Marketcity", time: "10 min", active: false },
  { label: "YMCA International", time: "6 min", active: false },
  { label: "Pune Airport", time: "15 min", active: false },
  { label: "Hinjewadi IT Park", time: "25 min", active: false },
];

export default function LocationMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current ? Array.from(contentRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" } }
      );
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 65%", toggleActions: "play none none none" } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={contentRef}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[var(--bronze)]" />
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--bronze)]">Location</span>
            <div className="w-12 h-[1px] bg-[var(--bronze)]" />
          </div>

          <h2 className="font-editorial italic text-3xl md:text-5xl text-center mb-4" style={{ color: "var(--ink)" }}>
            Prime Pune Address
          </h2>
          <p className="text-center text-sm max-w-lg mx-auto mb-16" style={{ color: "var(--muted-ink)" }}>
            Situated in the heart of Pune&apos;s most sought-after corridor — moments from business districts, retail, and recreation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div ref={mapRef} className="lg:col-span-3 relative rounded-sm overflow-hidden" style={{ aspectRatio: "4/3", backgroundColor: "var(--mist)", border: "1px solid rgba(200,169,106,0.15)" }}>
            <svg viewBox="0 0 600 450" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,169,106,0.08)" strokeWidth="1" />
                </pattern>
                <radialGradient id="glow">
                  <stop offset="0%" stopColor="rgba(200,169,106,0.15)" />
                  <stop offset="100%" stopColor="rgba(200,169,106,0)" />
                </radialGradient>
              </defs>

              <rect width="600" height="450" fill="url(#grid)" />

              <circle cx="300" cy="225" r="150" fill="url(#glow)" />
              <circle cx="300" cy="225" r="100" fill="url(#glow)" />
              <circle cx="300" cy="225" r="50" fill="url(#glow)" />

              <ellipse cx="300" cy="225" rx="160" ry="120" fill="none" stroke="rgba(200,169,106,0.2)" strokeWidth="1" strokeDasharray="6 4" />
              <ellipse cx="300" cy="225" rx="220" ry="170" fill="none" stroke="rgba(200,169,106,0.12)" strokeWidth="1" strokeDasharray="4 6" />

              <path d="M 300 225 L 240 160" stroke="rgba(200,169,106,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 300 225 L 370 180" stroke="rgba(200,169,106,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 300 225 L 380 280" stroke="rgba(200,169,106,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 300 225 L 420 130" stroke="rgba(200,169,106,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 300 225 L 180 290" stroke="rgba(200,169,106,0.15)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 300 225 L 460 310" stroke="rgba(200,169,106,0.15)" strokeWidth="1" strokeDasharray="3 3" />

              <circle cx="300" cy="225" r="8" fill="var(--bronze)" stroke="var(--champagne)" strokeWidth="2" />
              <circle cx="300" cy="225" r="14" fill="none" stroke="var(--bronze)" strokeWidth="1" opacity="0.4">
                <animate attributeName="r" values="14;22;14" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
              </circle>

              <circle cx="240" cy="160" r="4" fill="var(--champagne)" />
              <circle cx="370" cy="180" r="4" fill="var(--champagne)" />
              <circle cx="380" cy="280" r="4" fill="var(--champagne)" />
              <circle cx="420" cy="130" r="4" fill="var(--champagne)" />
              <circle cx="180" cy="290" r="4" fill="var(--champagne)" />
              <circle cx="460" cy="310" r="4" fill="var(--champagne)" />

              <text x="300" y="218" textAnchor="middle" fontSize="7" fill="var(--cloud)" fontWeight="bold" fontFamily="Inter, sans-serif">MAGICBRICKS</text>
              <text x="300" y="228" textAnchor="middle" fontSize="5" fill="var(--cloud)" fontFamily="Inter, sans-serif">PUNE</text>
            </svg>

            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-sm text-[9px] uppercase tracking-[0.2em]" style={{ backgroundColor: "rgba(23,19,15,0.75)", color: "var(--cloud)" }}>
              Kalyani Nagar Corridor
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm uppercase tracking-[0.2em] mb-6" style={{ color: "var(--bronze)" }}>Nearby Landmarks</h3>
            <div className="space-y-2">
              {LANDMARKS.map((lm, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between px-4 py-3 rounded-sm transition-all duration-300 cursor-default"
                  style={{
                    backgroundColor: lm.active ? "rgba(200,169,106,0.08)" : "transparent",
                    borderLeft: lm.active ? "2px solid var(--bronze)" : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => { if (!lm.active) { e.currentTarget.style.backgroundColor = "rgba(200,169,106,0.04)"; e.currentTarget.style.borderLeftColor = "rgba(200,169,106,0.3)"; } }}
                  onMouseLeave={(e) => { if (!lm.active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderLeftColor = "transparent"; } }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lm.active ? "var(--bronze)" : "var(--stone)" }} />
                    <span className="text-xs font-display tracking-[0.1em]" style={{ color: lm.active ? "var(--ink)" : "var(--muted-ink)" }}>{lm.label}</span>
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: lm.active ? "var(--bronze)" : "var(--muted-ink)" }}>{lm.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(200,169,106,0.12)" }}>
              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--bronze)" }}>
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <div>
                  <p className="text-xs font-display" style={{ color: "var(--ink)" }}>Magicbricks Pune</p>
                  <p className="text-[10px]" style={{ color: "var(--muted-ink)" }}>North Main Road, Koregaon Park, Pune — 411001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
