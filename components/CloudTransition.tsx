"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export default function CloudTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);
  const cloud3Ref = useRef<HTMLDivElement>(null);
  const cloud4Ref = useRef<HTMLDivElement>(null);
  const cloud5Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const layers = [
        { ref: cloud1Ref, blur: 10, speed: 1.8 },
        { ref: cloud2Ref, blur: 6, speed: 1.4 },
        { ref: cloud3Ref, blur: 3, speed: 1.0 },
        { ref: cloud4Ref, blur: 1, speed: 0.6 },
        { ref: cloud5Ref, blur: 0, speed: 0.3 },
      ];

      layers.forEach(({ ref, blur, speed }) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
          { yPercent: 40 + speed * 15, opacity: 0, scale: 0.7 + speed * 0.1 },
          {
            yPercent: -50 - speed * 20,
            opacity: 0.85,
            scale: 1.1 + (5 - blur) * 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6 + speed * 0.3,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current,
          { opacity: 0 },
          {
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 20%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "130vh", zIndex: 15, background: "#050505" }}
      aria-label="Cloud Transition"
    >
      {[
        { ref: cloud1Ref, blur: 10, flip: false, y: 0 },
        { ref: cloud2Ref, blur: 6, flip: true, y: 5 },
        { ref: cloud3Ref, blur: 3, flip: false, y: 10 },
        { ref: cloud4Ref, blur: 1, flip: true, y: 15 },
        { ref: cloud5Ref, blur: 0, flip: false, y: 20 },
      ].map((layer, i) => (
        <div
          key={i}
          ref={layer.ref}
          className="absolute will-change-transform pointer-events-none"
          style={{
            inset: `-${8 + i * 4}% -${10 + i * 6}%`,
            mixBlendMode: "screen",
            filter: layer.blur > 0 ? `blur(${layer.blur}px)` : undefined,
            opacity: 0,
          }}
        >
          <img
            src="/images/378443174955100855.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{
              transform: layer.flip ? "scaleX(-1)" : undefined,
              objectPosition: `center ${layer.y}%`,
            }}
            aria-hidden="true"
          />
        </div>
      ))}

      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, rgba(5,5,5,0.6) 60%, #050505 100%)",
          opacity: 0,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
