"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[999] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        backgroundColor: "var(--bronze)",
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 20}px)`,
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-label="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0806" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15L12 9L6 15" />
      </svg>
    </button>
  );
}
