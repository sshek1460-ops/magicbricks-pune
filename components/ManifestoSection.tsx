"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const MANIFESTO_STATEMENTS = [
  { text: "We connect people to places they'll love.", highlight: false },
  { text: "Across Pune, every neighbourhood, every dream.", highlight: false },
  { text: "A home. An office. A new beginning.", highlight: true },
  { text: "Every Magicbricks listing is verified, transparent, and ready for you.", highlight: false },
  { text: "Your search ends here.", highlight: true },
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, index) => {
        if (!line) return;

        const words = line.querySelectorAll<HTMLElement>(".manifesto-word");
        gsap.set(words, { opacity: 0, y: 50, scale: 0.85 });

        gsap.to(words, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-[200vh] flex flex-col items-center justify-center overflow-hidden py-32"
      style={{ backgroundColor: "var(--surface)" }}
      aria-label="Manifesto — What We Believe"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle 800px at 50% 50%, rgba(200,169,106,0.1) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
        <span
          className="uppercase font-medium block text-center"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            color: "var(--muted-ink)",
            opacity: 0.6,
          }}
        >
          Our Promise
        </span>
        <div className="w-8 h-[1px] mx-auto mt-3" style={{ backgroundColor: "var(--champagne)", opacity: 0.5 }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16">
        <div className="flex flex-col gap-24 md:gap-32 items-center text-center">
          {MANIFESTO_STATEMENTS.map((item, itemIdx) => {
            const words = item.text.split(" ");
            return (
              <div
                key={itemIdx}
                ref={(el) => { lineRefs.current[itemIdx] = el; }}
                className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2"
              >
                {words.map((word, wordIdx) => (
                  <span
                    key={wordIdx}
                    className={`manifesto-word inline-block will-change-transform ${item.highlight ? "font-editorial" : "font-display"}`}
                    style={{
                      fontSize: item.highlight ? "clamp(3rem, 7vw, 6.5rem)" : "clamp(1.5rem, 3.5vw, 2.5rem)",
                      lineHeight: 1.1,
                      letterSpacing: item.highlight ? "-0.04em" : "0.1em",
                      fontWeight: item.highlight ? 400 : 500,
                      fontStyle: item.highlight ? "italic" : "normal",
                      color: item.highlight ? "var(--champagne)" : "var(--ink)",
                      textTransform: item.highlight ? "none" : "uppercase",
                      textShadow: item.highlight ? "0 4px 30px rgba(200,169,106,0.3)" : "none",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-[1px] z-20"
        style={{ backgroundColor: "var(--stone)", opacity: 0.25 }}
        aria-hidden="true"
      />
    </section>
  );
}
