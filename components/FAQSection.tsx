"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQS = [
  { q: "How do I schedule a property visit?", a: "Simply click 'Request Access' on any listing or reach out via our contact form. We'll arrange a private tour within 24 hours." },
  { q: "Are all listings verified?", a: "Yes. Every property on Magicbricks Pune goes through a thorough verification process to ensure accuracy, legality, and quality." },
  { q: "Do you help with documentation?", a: "Absolutely. Our team guides you through every step — from agreement drafting to registration, so the process is stress-free." },
  { q: "What areas do you cover?", a: "We cover all premium neighbourhoods in Pune — Kalyani Nagar, Koregaon Park, Baner, Hinjewadi, Viman Nagar, and beyond." },
  { q: "Is there a consultation fee?", a: "No. Initial consultations are completely complimentary. We only charge when you move forward with a property." },
  { q: "Can I sell through Magicbricks Pune?", a: "Yes. We offer end-to-end selling services including valuation, staging, marketing, and negotiation. Contact us for a free valuation." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
          <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--bronze)]">Questions?</span>
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
        </div>
        <h2 className="font-editorial italic text-3xl md:text-5xl text-center mb-16" style={{ color: "var(--ink)" }}>
          Frequently asked
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="overflow-hidden rounded-sm" style={{ border: "1px solid rgba(200,169,106,0.1)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-300"
                style={{ backgroundColor: open === i ? "rgba(200,169,106,0.04)" : "transparent" }}
              >
                <span className="font-display text-sm tracking-[0.1em] pr-4" style={{ color: "var(--ink)" }}>{faq.q}</span>
                <motion.svg
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" style={{ color: "var(--bronze)" }}
                >
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="px-6 pb-5 font-editorial text-sm leading-relaxed" style={{ color: "var(--muted-ink)" }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
