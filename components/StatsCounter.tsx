"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const STATS = [
  { value: 500, suffix: "+", label: "Properties Sold" },
  { value: 25, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Premium Locations" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedNumber({ target }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) { if (el) el.textContent = `${target}`; return; }

    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 2.5,
      ease: "power3.out",
      onUpdate: () => { el.textContent = Math.round(proxy.val).toString(); },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [target]);

  return <span ref={ref}>0</span>;
}

export default function StatsCounter() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "var(--ink)" }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--champagne) 0%, transparent 60%)" }} aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-display text-5xl md:text-6xl lg:text-7xl font-bold" style={{ color: "var(--champagne)", lineHeight: 1 }}>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                {stat.suffix}
              </span>
              <span className="font-display text-xs tracking-[0.25em] uppercase mt-4" style={{ color: "var(--muted-ink)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
