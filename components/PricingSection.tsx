"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import MagneticButton from "./ui/MagneticButton";

const PLANS = [
  {
    name: "Luxury Apartments",
    range: "₹1.2 Cr – ₹3.8 Cr",
    size: "1,800 – 4,200 sq. ft.",
    emi: "₹58,000/mo*",
    tag: "Most Popular",
  },
  {
    name: "Premium Villas",
    range: "₹4.5 Cr – ₹12 Cr",
    size: "3,500 – 8,000 sq. ft.",
    emi: "₹2.1L/mo*",
    tag: "Private Access",
  },
  {
    name: "Penthouse Collection",
    range: "₹8 Cr – ₹25 Cr",
    size: "4,500 – 12,000 sq. ft.",
    emi: "₹3.8L/mo*",
    tag: "Ultra Luxury",
  },
];

const HIGHLIGHTS = [
  { label: "Min. Down Payment", value: "10%" },
  { label: "Flexible Tenure", value: "5 – 30 yrs" },
  { label: "Interest Rate", value: "8.5% p.a.*" },
  { label: "Pre-EMI Offer", value: "6 Months" },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [labelRef.current, headingRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" } }
      );
      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: cardsRef.current, start: "top 75%", toggleActions: "play none none none" } }
        );
      }
      if (highlightsRef.current) {
        gsap.fromTo(
          Array.from(highlightsRef.current.children),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out", scrollTrigger: { trigger: highlightsRef.current, start: "top 80%", toggleActions: "play none none none" } }
        );
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={labelRef} className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
          <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--bronze)]">Investment</span>
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
        </div>

        <h2 ref={headingRef} className="font-editorial italic text-3xl md:text-5xl text-center mb-16" style={{ color: "var(--ink)" }}>
          Pricing & Payment Plans
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className="relative rounded-sm p-8 flex flex-col"
              style={{
                backgroundColor: i === 1 ? "var(--bronze)" : "var(--surface)",
                border: i === 1 ? "none" : "1px solid rgba(200,169,106,0.15)",
              }}
            >
              {plan.tag && (
                <span
                  className="absolute -top-2.5 left-6 px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-display rounded-sm"
                  style={{
                    backgroundColor: i === 1 ? "var(--champagne)" : "var(--bronze)",
                    color: i === 1 ? "var(--ink)" : "var(--cloud)",
                  }}
                >
                  {plan.tag}
                </span>
              )}
              <h3 className="font-display text-sm tracking-[0.15em] uppercase mb-2" style={{ color: i === 1 ? "var(--cloud)" : "var(--ink)" }}>
                {plan.name}
              </h3>
              <p className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: i === 1 ? "var(--champagne)" : "var(--bronze)" }}>
                {plan.range}
              </p>
              <div className="space-y-2 mb-8 flex-1">
                <div className="flex justify-between text-xs" style={{ color: i === 1 ? "rgba(255,255,255,0.7)" : "var(--muted-ink)" }}>
                  <span>Size</span>
                  <span className="font-medium" style={{ color: i === 1 ? "var(--cloud)" : "var(--ink)" }}>{plan.size}</span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: i === 1 ? "rgba(255,255,255,0.7)" : "var(--muted-ink)" }}>
                  <span>Est. EMI</span>
                  <span className="font-medium" style={{ color: i === 1 ? "var(--cloud)" : "var(--ink)" }}>{plan.emi}</span>
                </div>
              </div>
              <MagneticButton
                id={`pricing-cta-${i}`}
                className={i === 1 ? "bg-[var(--champagne)] text-[var(--ink)] border-[var(--champagne)] hover:bg-[var(--cloud)] hover:border-[var(--cloud)] w-full" : "w-full"}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {i === 1 ? "Get Priority Access" : "Inquire Now"}
              </MagneticButton>
            </div>
          ))}
        </div>

        <div ref={highlightsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} className="text-center p-4" style={{ borderRight: i < HIGHLIGHTS.length - 1 ? "1px solid rgba(200,169,106,0.15)" : "none" }}>
              <p className="font-display text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--bronze)" }}>{h.value}</p>
              <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--muted-ink)" }}>{h.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[9px] mt-8" style={{ color: "var(--muted-ink)" }}>
          *EMI and interest rates are indicative. Actual rates depend on lender discretion and credit profile.
        </p>
      </div>
    </section>
  );
}
