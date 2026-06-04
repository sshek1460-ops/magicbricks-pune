"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.fromTo(bar, { scaleX: 0 }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[99999] pointer-events-none" aria-hidden="true">
      <div ref={barRef} className="h-full bg-[var(--bronze)] origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
