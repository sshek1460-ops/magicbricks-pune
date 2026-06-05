"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { AnimatePresence, motion } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";
import MagneticButton from "./ui/MagneticButton";

export default function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [visitType, setVisitType] = useState<"virtual" | "physical" | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current ? Array.from(contentRef.current.children) : [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none none" } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(200,169,106,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
          <span className="font-display text-xs tracking-[0.3em] uppercase text-[var(--bronze)]">Connect</span>
          <div className="w-12 h-[1px] bg-[var(--bronze)]" />
        </div>

        <h2 className="font-editorial italic text-3xl md:text-5xl text-center mb-4" style={{ color: "var(--ink)" }}>
          Begin Your Journey
        </h2>
        <p className="text-center text-sm max-w-md mx-auto mb-14" style={{ color: "var(--muted-ink)" }}>
          Fill in the details below and our team will reach out within 24 hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cf-name" className="text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--muted-ink)" }}>Full Name *</label>
                  <input id="cf-name" type="text" required className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300" style={{ borderColor: "var(--stone)", color: "var(--ink)" }} placeholder="Your name" onFocus={(e) => e.target.style.borderColor = "var(--champagne)"} onBlur={(e) => e.target.style.borderColor = "var(--stone)"} />
                </div>
                <div>
                  <label htmlFor="cf-email" className="text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--muted-ink)" }}>Email *</label>
                  <input id="cf-email" type="email" required className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300" style={{ borderColor: "var(--stone)", color: "var(--ink)" }} placeholder="your@email.com" onFocus={(e) => e.target.style.borderColor = "var(--champagne)"} onBlur={(e) => e.target.style.borderColor = "var(--stone)"} />
                </div>
              </div>
              <div>
                <label htmlFor="cf-phone" className="text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--muted-ink)" }}>Phone *</label>
                <input id="cf-phone" type="tel" required className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300" style={{ borderColor: "var(--stone)", color: "var(--ink)" }} placeholder="+91 98765 43210" onFocus={(e) => e.target.style.borderColor = "var(--champagne)"} onBlur={(e) => e.target.style.borderColor = "var(--stone)"} />
              </div>
              <div>
                <label htmlFor="cf-budget" className="text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--muted-ink)" }}>Budget Range</label>
                <select id="cf-budget" className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 cursor-pointer" style={{ borderColor: "var(--stone)", color: "var(--ink)" }} onFocus={(e) => e.target.style.borderColor = "var(--champagne)"} onBlur={(e) => e.target.style.borderColor = "var(--stone)"}>
                  <option value="">Select range</option>
                  <option value="1-3">₹1 Cr – ₹3 Cr</option>
                  <option value="3-5">₹3 Cr – ₹5 Cr</option>
                  <option value="5-10">₹5 Cr – ₹10 Cr</option>
                  <option value="10+">₹10 Cr+</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] block mb-3" style={{ color: "var(--muted-ink)" }}>Prefer a site visit?</label>
                <div className="flex gap-3">
                  {(["virtual", "physical"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setVisitType(visitType === type ? null : type)}
                      className="px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-display transition-all duration-300"
                      style={{
                        backgroundColor: visitType === type ? "var(--bronze)" : "transparent",
                        color: visitType === type ? "var(--cloud)" : "var(--muted-ink)",
                        border: `1px solid ${visitType === type ? "var(--bronze)" : "var(--stone)"}`,
                      }}
                    >
                      {type === "virtual" ? "Virtual Tour" : "Physical Visit"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="cf-message" className="text-[10px] uppercase tracking-[0.2em] block mb-2" style={{ color: "var(--muted-ink)" }}>Message</label>
                <textarea id="cf-message" rows={3} className="w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-300 resize-none" style={{ borderColor: "var(--stone)", color: "var(--ink)" }} placeholder="Your requirements..." onFocus={(e) => e.target.style.borderColor = "var(--champagne)"} onBlur={(e) => e.target.style.borderColor = "var(--stone)"} />
              </div>
              <div>
                <MagneticButton id="cf-submit" className="w-full bg-[var(--ink)] text-[var(--cloud)] border-[var(--ink)] hover:bg-[var(--bronze)] hover:border-[var(--bronze)]">
                  {submitted ? "✓ Inquiry Sent" : "Submit Inquiry"}
                </MagneticButton>
              </div>
            </form>
          </div>

          <div className="md:col-span-2 md:pl-8 md:border-l" style={{ borderColor: "rgba(200,169,106,0.15)" }}>
            <h3 className="font-display text-sm uppercase tracking-[0.2em] mb-6" style={{ color: "var(--bronze)" }}>Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--bronze)" }}>
                  <path d="M22 16.92V19A2 2 0 0 1 20 21H19C10.163 21 3 13.837 3 5V4A2 2 0 0 1 5 2H7.18A1 1 0 0 1 8.16 2.82L9.44 5.38A1 1 0 0 1 9.27 6.51L7.9 7.88C9.2 10.18 11.82 12.8 14.12 14.1L15.49 12.73A1 1 0 0 1 16.62 12.56L19.18 13.84A1 1 0 0 1 20 14.82V16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--muted-ink)" }}>Phone</p>
                  <a href="tel:+919999988888" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "var(--ink)" }}>+91 99999 88888</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--bronze)" }}>
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--muted-ink)" }}>Email</p>
                  <a href="mailto:hello@magicbrickspune.com" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "var(--ink)" }}>hello@magicbrickspune.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: "var(--bronze)" }}>
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--muted-ink)" }}>Office</p>
                  <p className="text-xs" style={{ color: "var(--ink)" }}>North Main Road, Koregaon Park, Pune — 411001</p>
                </div>
              </div>

              <div className="pt-4" style={{ borderTop: "1px solid rgba(200,169,106,0.12)" }}>
                <h4 className="font-display text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--muted-ink)" }}>Office Hours</h4>
                <div className="text-[11px] space-y-1" style={{ color: "var(--ink)" }}>
                  <div className="flex justify-between"><span>Mon – Sat</span><span>10:00 AM – 7:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span>By appointment</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-modal)] px-6 py-3 rounded-sm shadow-lg text-xs tracking-[0.1em]"
            style={{ backgroundColor: "var(--bronze)", color: "var(--cloud)" }}
          >
            Thank you! We&apos;ll get back to you within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
