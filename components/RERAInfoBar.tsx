"use client";

export default function RERAInfoBar() {
  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden" style={{ backgroundColor: "var(--ink)" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="flex items-center gap-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ color: "var(--champagne)" }}>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-display" style={{ color: "var(--champagne)" }}>RERA Registered</p>
              <p className="text-[11px] font-mono opacity-70" style={{ color: "var(--stone)" }}>RERA No: P52100012345 | MahaRERA Reg: MAGIC-PN-2026-001</p>
            </div>
          </div>

          <a
            href="/brochure.pdf"
            download
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-display transition-all duration-500"
            style={{
              backgroundColor: "var(--champagne)",
              color: "var(--ink)",
              border: "1px solid var(--champagne)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--cloud)";
              e.currentTarget.style.borderColor = "var(--cloud)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--champagne)";
              e.currentTarget.style.borderColor = "var(--champagne)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Brochure
          </a>
        </div>
      </div>
    </section>
  );
}
