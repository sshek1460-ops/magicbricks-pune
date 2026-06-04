"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const STEPS = [
  { number: "01", title: "Discover", desc: "We listen to your vision — every preference, every dream." },
  { number: "02", title: "Curate", desc: "Our team handpicks listings that match your world." },
  { number: "03", title: "Deliver", desc: "From tour to close, we make it effortless." },
];

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1, duration: 1.4, ease: "power3.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 30%", scrub: true },
      });
    }
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, x: i % 2 === 0 ? -40 : 40 }, {
        opacity: 1, x: 0, duration: 1, delay: i * 0.25, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-28 md:py-36 overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 text-center">
        <span className="uppercase font-display text-xs tracking-[0.25em]" style={{ color: "var(--muted-ink)", opacity: 0.6 }}>How It Works</span>
        <div className="w-8 h-[1px] mx-auto mt-3" style={{ backgroundColor: "var(--champagne)", opacity: 0.5 }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16">
        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-center mb-20 md:mb-28" style={{ color: "var(--ink)" }}>
          Three steps to <span className="font-editorial italic" style={{ color: "var(--champagne)" }}>your home</span>
        </h2>

        <div className="relative flex flex-col md:flex-row md:items-start gap-12 md:gap-8">
          <div ref={lineRef} className="absolute top-8 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] md:w-[70%] h-full md:h-[2px] origin-top md:origin-left" style={{ backgroundColor: "var(--bronze)", opacity: 0.3, transform: "scaleY(0) scaleX(1)" }} aria-hidden="true" />

          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="relative flex-1 flex flex-col items-center text-center opacity-0 will-change-transform"
            >
              <span className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--bronze)", opacity: 0.25 }}>{step.number}</span>
              <h3 className="font-display text-lg tracking-[0.2em] uppercase mb-3" style={{ color: "var(--ink)" }}>{step.title}</h3>
              <p className="font-editorial italic text-sm max-w-xs" style={{ color: "var(--muted-ink)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
