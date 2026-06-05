"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const TOTAL_FRAMES = 480;
const FRAME_PATH = "/hero-frames/ezgif-frame-";
const FRAME_EXT = ".jpg";

const pad = (n: number) => String(n).padStart(3, "0");
const frameUrl = (i: number) => `${FRAME_PATH}${pad(i)}${FRAME_EXT}`;

const COPY_SEQUENCE = [
  { text: "MAGICBRICKS", type: "title" as const, start: 0, end: 15 },
  { text: "Pune's finest properties.", type: "line" as const, start: 12, end: 26 },
  { text: "One click away.", type: "line" as const, start: 23, end: 36 },
  { text: "Your dream home.", type: "accent" as const, start: 33, end: 46 },
  { text: "Waiting for you.", type: "line" as const, start: 43, end: 58 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const cloudBackRef = useRef<HTMLDivElement>(null);
  const cloudMidRef = useRef<HTMLDivElement>(null);
  const cloudForeRef = useRef<HTMLDivElement>(null);
  const cloudUltraRef = useRef<HTMLDivElement>(null);
  const newCloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const images = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrame = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = images.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      drawFrame(currentFrame.current);
    };
    resize();
    window.addEventListener("resize", resize);

    let loadedCount = 0;
    let cancelled = false;

    const loadImage = (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (cancelled || images.current[index]) { resolve(); return; }
        const img = new Image();
        img.onload = () => {
          if (cancelled) { resolve(); return; }
          images.current[index] = img;
          loadedCount++;
          const currentProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          setLoadProgress(currentProgress);
          window.dispatchEvent(new CustomEvent("hero-progress", { detail: { percent: currentProgress } }));
          if (index === currentFrame.current) {
            drawFrame(index);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameUrl(index);
      });

    const indices = (step: number) =>
      Array.from({ length: Math.ceil(TOTAL_FRAMES / step) }, (_, k) => k * step);

    const preload = async () => {
      await loadImage(0);
      drawFrame(0);
      if (cancelled) return;
      await Promise.all(indices(20).map(loadImage));
      if (cancelled) return;
      await Promise.all(indices(10).map(loadImage));
      if (cancelled) return;
      await Promise.all(indices(5).map(loadImage));
      for (let i = 0; i < TOTAL_FRAMES; i += 60) {
        if (cancelled) return;
        await Promise.all(
          Array.from({ length: 30 }, (_, k) => i + k * 2).filter((n) => n < TOTAL_FRAMES).map(loadImage)
        );
      }
      for (let i = 0; i < TOTAL_FRAMES; i += 30) {
        if (cancelled) return;
        await Promise.all(
          Array.from({ length: 30 }, (_, k) => i + k).filter((n) => n < TOTAL_FRAMES).map(loadImage)
        );
      }
    };

    preload();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
    };
  }, [drawFrame]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const wrapper = document.getElementById("hero-root");
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const frameProgress = self.progress;
          const targetIndex = Math.min(
            Math.floor(frameProgress * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );

          let bestIndex = targetIndex;
          if (!images.current[targetIndex]) {
            bestIndex = 0;
            for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
              const lo = targetIndex - offset;
              const hi = targetIndex + offset;
              if (lo >= 0 && images.current[lo]) { bestIndex = lo; break; }
              if (hi < TOTAL_FRAMES && images.current[hi]) { bestIndex = hi; break; }
            }
          }

          if (bestIndex !== currentFrame.current) {
            currentFrame.current = bestIndex;
            drawFrame(bestIndex);
          }
        },
      });

      if (bloomRef.current) {
        gsap.fromTo(
          bloomRef.current,
          { opacity: 0.05 },
          {
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: "55% bottom",
              scrub: 1,
            },
          }
        );
      }

      if (cloudBackRef.current && cloudMidRef.current && cloudForeRef.current && cloudUltraRef.current && fogRef.current) {
        const cloudTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "55% top",
            end: "95% top",
            scrub: true,
          },
        });

        cloudTl.fromTo(
          cloudBackRef.current,
          { y: "100vh", opacity: 0 },
          { y: "-150vh", opacity: 0.8, duration: 1.5, ease: "none" },
          0
        );
        cloudTl.fromTo(
          cloudMidRef.current,
          { y: "100vh", opacity: 0 },
          { y: "-180vh", opacity: 0.9, duration: 1.5, ease: "none" },
          0.15
        );
        cloudTl.fromTo(
          cloudForeRef.current,
          { y: "110vh", opacity: 0 },
          { y: "-220vh", opacity: 1, duration: 1.5, ease: "none" },
          0.3
        );
        cloudTl.fromTo(
          cloudUltraRef.current,
          { y: "120vh", opacity: 0 },
          { y: "-260vh", opacity: 1, duration: 1.5, ease: "none" },
          0.45
        );
        cloudTl.fromTo(fogRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.in" },
          0.8
        );
      }

      if (finalTextRef.current) {
        gsap.fromTo(
          finalTextRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "75% top",
              end: "95% top",
              scrub: true,
            },
          }
        );
      }

      newCloudRefs.current.forEach((el, i) => {
        if (!el) return;
        const speed = 0.3 + (5 - i) * 0.25;
        const blur = i * 2.5;
        gsap.fromTo(el,
          { yPercent: 30 + i * 6, opacity: 0, scale: 0.6 + i * 0.06 },
          {
            yPercent: -40 - i * 8,
            opacity: 0.8,
            scale: 1.1 + i * 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "82% top",
              end: "105% top",
              scrub: 0.5 + speed,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const total = COPY_SEQUENCE.length;
      copyRefs.current.forEach((el, i) => {
        if (!el) return;

        const { start, end } = COPY_SEQUENCE[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: `${start}% top`,
            end: `${end}% top`,
            scrub: 1,
          },
        });

        const entries = [
          { rotationX: 10, rotationY: -5 },
          { rotationX: -5, rotationY: 5 },
          { rotationX: 5, rotationY: -10 },
          { rotationX: 0, rotationY: 10 },
          { rotationX: -10, rotationY: 0 },
        ];
        const entry = entries[i % entries.length];

        if (i === 4) {
          tl.fromTo(
            el,
            { opacity: 0, z: -1000, x: "20vw", scale: 0.8, ...entry },
            { opacity: 1, z: 0, x: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" }
          );
          tl.to(
            el,
            { opacity: 0, z: 800, x: "-100vw", scale: 1.5, rotationY: -30, duration: 0.6, ease: "power2.in" }
          );
        } else {
          tl.fromTo(
            el,
            { opacity: 0, z: -1500, scale: 0.6, ...entry },
            { opacity: 1, z: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" }
          );
          tl.to(
            el,
            { opacity: 0, z: 1500, scale: 2.5, duration: 0.6, ease: "power2.in" }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [drawFrame]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0.7 });
    }

    const tl = gsap.timeline({ delay: 2.0 });

    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 1, duration: 1.4 }, 0);
    }

    if (copyRefs.current[0]) {
      tl.fromTo(
        copyRefs.current[0],
        { opacity: 0, y: 60, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out" },
        0.2
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="sticky top-0 w-full h-screen overflow-hidden"
      style={{ zIndex: 10, backgroundColor: "#0a0806" }}
      aria-label="Hero — Scroll to explore"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{ opacity: 0.7,
          background: `
            linear-gradient(180deg, rgba(23,19,15,0.3) 0%, rgba(23,19,15,0.0) 30%, rgba(23,19,15,0.0) 60%, rgba(23,19,15,0.45) 100%),
            linear-gradient(90deg, rgba(23,19,15,0.2) 0%, transparent 25%, transparent 75%, rgba(23,19,15,0.2) 100%)
          `,
        }}
        aria-hidden="true"
      />

      <div
        ref={bloomRef}
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 25%, rgba(200,169,106,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={fogRef}
        className="absolute inset-0 pointer-events-none z-[4] opacity-0"
        style={{ background: "#e8e5df" }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none z-[5] overflow-visible"
        style={{ mixBlendMode: "screen" }}
      >
        <div
          ref={cloudBackRef}
          className="absolute inset-0"
          style={{ mixBlendMode: "screen", filter: "blur(8px)" }}
        >
          <img
            src="/images/cloud-overlay.png"
            alt=""
            className="w-full h-[200vh] object-cover"
            style={{
              transform: "scale(1.4)",
              objectPosition: "center",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
          />
        </div>
        <div
          ref={cloudMidRef}
          className="absolute inset-0"
          style={{ mixBlendMode: "screen", filter: "blur(4px)" }}
        >
          <img
            src="/images/cloud-overlay.png"
            alt=""
            className="w-full h-[200vh] object-cover"
            style={{
              transform: "scaleX(-1) scaleY(1.2)",
              objectPosition: "center",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
          />
        </div>
        <div
          ref={cloudForeRef}
          className="absolute inset-0"
          style={{ mixBlendMode: "screen" }}
        >
          <img
            src="/images/cloud-overlay.png"
            alt=""
            className="w-full h-[200vh] object-cover"
            style={{
              transform: "scale(1.1)",
              objectPosition: "center",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)"
            }}
          />
        </div>
        <div
          ref={cloudUltraRef}
          className="absolute inset-0"
          style={{ mixBlendMode: "screen" }}
        >
          <img
            src="/images/cloud-overlay.png"
            alt=""
            className="w-full h-[200vh] object-cover"
            style={{
              transform: "scaleX(-1.3) scaleY(1.3)",
              objectPosition: "center",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"
            }}
          />
        </div>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center z-[5]"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full max-w-[90vw] text-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {COPY_SEQUENCE.map((item, i) => (
            <div
              key={i}
              ref={(el) => { copyRefs.current[i] = el; }}
              className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
              style={{ backfaceVisibility: "hidden" }}
            >
              {item.type === "title" ? (
                <h1
                  className="font-display select-none"
                  style={{
                    fontSize: "clamp(4rem, 13vw, 13rem)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.07em",
                    fontWeight: 700,
                    color: "var(--cloud)",
                    textShadow: "0 4px 60px rgba(0,0,0,0.45), 0 0 120px rgba(200,169,106,0.12)",
                  }}
                >
                  {item.text}
                </h1>
              ) : item.type === "accent" ? (
                <p
                  className="font-editorial select-none"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 6.5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "var(--champagne)",
                    textShadow: "0 4px 40px rgba(0,0,0,0.8), 0 0 80px rgba(200,169,106,0.4)",
                  }}
                >
                  {item.text}
                </p>
              ) : (
                <p
                  className="font-display select-none max-w-4xl mx-auto uppercase"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.4rem)",
                    lineHeight: 1.5,
                    letterSpacing: "0.2em",
                    fontWeight: 500,
                    color: "var(--cloud)",
                    textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 0 100px rgba(0,0,0,0.6)",
                  }}
                >
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        ref={finalTextRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[6] opacity-0 pointer-events-none"
        style={{ perspective: "1400px" }}
      >
        <div className="text-center px-6 md:px-14 flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
          <div className="relative z-10" style={{ lineHeight: 0.85 }}>
            <h2
              className="font-display select-none uppercase"
              style={{
                fontSize: "clamp(3.5rem, 11vw, 13rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                color: "#161412",
              }}
            >
              Properties
            </h2>
          </div>
          <div className="relative z-20" style={{ lineHeight: 0.7, marginTop: "-0.25em", marginBottom: "3rem" }}>
            <p
              className="font-editorial select-none"
              style={{
                fontSize: "clamp(2.5rem, 9.5vw, 11rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.01em",
                color: "#9a8566",
              }}
            >
              that inspire.
            </p>
          </div>
          <div className="relative z-10 opacity-70">
            <p
              className="font-display select-none mx-auto"
              style={{
                fontSize: "clamp(0.56rem, 0.9vw, 0.75rem)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#161412",
                maxWidth: "40ch",
                fontWeight: 500,
              }}
            >
              Every listing is a conversation between space and desire.
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-[7] overflow-hidden"
        style={{ mixBlendMode: "screen" }}
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            ref={(el) => { newCloudRefs.current[i] = el; }}
            className="absolute will-change-transform"
            style={{
              inset: `-${6 + i * 4}% -${8 + i * 5}%`,
              filter: i > 0 ? `blur(${i * 2.5}px)` : undefined,
              opacity: 0,
            }}
          >
            <img
              src="/images/378443174955100855.jpg"
              alt=""
              className="w-full h-full object-cover"
              style={{
                transform: i % 2 === 0 ? "scaleX(-1)" : undefined,
                objectPosition: `center ${(i + 1) * 12}%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[6] flex flex-col items-center gap-3 opacity-60">
        <span
          className="uppercase font-medium"
          style={{ fontSize: "0.5625rem", letterSpacing: "0.3em", color: "var(--cloud)" }}
        >
          Scroll to explore
        </span>
        <div className="w-[1px] h-10 relative overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 left-0 w-full h-full bg-white/40"
            style={{ animation: "heroScrollPulse 2.4s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes heroScrollPulse {
          0%, 100% { transform: scaleY(0.2); opacity: 0.2; transform-origin: top; }
          50% { transform: scaleY(1); opacity: 0.6; transform-origin: top; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes heroScrollPulse { 0%, 100% { opacity: 0.4; } }
        }
      `}</style>
    </section>
  );
}
