"use client";

export default function MarqueeStrip() {
  return (
    <section className="relative w-full overflow-hidden py-8" style={{ backgroundColor: "var(--surface)", borderTop: "1px solid rgba(200,169,106,0.08)", borderBottom: "1px solid rgba(200,169,106,0.08)" }}>
      <div className="flex whitespace-nowrap gap-0 animate-marquee" style={{ animation: "marquee 30s linear infinite" }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="flex items-center gap-12 mx-6">
            <span className="font-display text-sm tracking-[0.3em] uppercase" style={{ color: "var(--muted-ink)" }}>Luxury</span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--bronze)", opacity: 0.4 }} />
            <span className="font-editorial italic text-lg" style={{ color: "var(--champagne)" }}>Bespoke</span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--bronze)", opacity: 0.4 }} />
            <span className="font-display text-sm tracking-[0.3em] uppercase" style={{ color: "var(--muted-ink)" }}>Exclusive</span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--bronze)", opacity: 0.4 }} />
            <span className="font-editorial italic text-lg" style={{ color: "var(--champagne)" }}>Premium</span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--bronze)", opacity: 0.4 }} />
            <span className="font-display text-sm tracking-[0.3em] uppercase" style={{ color: "var(--muted-ink)" }}>Curated</span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--bronze)", opacity: 0.4 }} />
            <span className="font-editorial italic text-lg" style={{ color: "var(--champagne)" }}>Refined</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
