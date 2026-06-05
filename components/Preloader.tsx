"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleProgress = (e: CustomEvent<{ percent: number }>) => {
      setProgress(e.detail.percent);
      if (e.detail.percent >= 100 && !isLoaded) {
        setIsLoaded(true);
      }
    };

    window.addEventListener("hero-progress", handleProgress as EventListener);

    const fallbackTimeout = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true);
    }, 3000);

    return () => {
      window.removeEventListener("hero-progress", handleProgress as EventListener);
      clearTimeout(fallbackTimeout);
    };
  }, [isLoaded]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (logoRef.current) {
      tl.fromTo(logoRef.current,
        { opacity: 0, y: 40, scale: 0.9, filter: "blur(8px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
      );
    }

    if (taglineRef.current) {
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    }

    if (barWrapRef.current) {
      tl.fromTo(barWrapRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out", transformOrigin: "left" },
        "-=0.3"
      );
    }

    if (pctRef.current) {
      tl.fromTo(pctRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.2"
      );
    }

    if (glintRef.current) {
      tl.to(glintRef.current,
        { x: "200%", duration: 1.5, ease: "power2.inOut", repeat: -1 },
        "-=0.5"
      );
    }
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      const tl = gsap.timeline();

      tl.to([logoRef.current, taglineRef.current, barWrapRef.current, pctRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.06,
        ease: "power2.inOut",
      }, 0)
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0.4)
      .set(containerRef.current, { display: "none" });
    }
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-none"
      style={{ backgroundColor: "#0f0d0a" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div ref={logoRef} className="flex flex-col items-center gap-2">
          <div className="text-[var(--champagne)] font-display text-3xl md:text-4xl tracking-[0.25em] font-light opacity-0">
            MAGICBRICKS
          </div>
          <div className="w-16 h-[1px]" style={{ backgroundColor: "var(--bronze)", opacity: 0.4 }} />
        </div>

        <div ref={taglineRef} className="text-[var(--muted-ink)] font-editorial italic text-base md:text-lg tracking-wide opacity-0">
          Pune&rsquo;s finest, revealed
        </div>

        <div ref={barWrapRef} className="w-48 h-[1px] mt-4 relative overflow-hidden opacity-0" style={{ backgroundColor: "rgba(255,255,255,0.06)", transformOrigin: "left" }}>
          <div
            ref={barRef}
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "var(--bronze)",
              transition: "width 0.3s ease-out",
            }}
          />
          <div
            ref={glintRef}
            className="absolute top-0 left-0 h-full w-12"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(200,169,106,0.6) 50%, transparent 100%)",
              transform: "translateX(-100%)",
            }}
          />
        </div>

        <div ref={pctRef} className="text-[var(--stone)] text-xs tracking-[0.2em] font-mono opacity-0">
          {progress}%
        </div>
      </div>
    </div>
  );
}
