"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "buy",
    title: "Buy",
    italic: false,
    label: "Find your dream property in Pune. From apartments to villas — we make it effortless.",
    image: "/images/services/buy.png",
  },
  {
    id: "rent",
    title: "Rent",
    italic: true,
    label: "Flexible rental options across all of Pune. Move in on your terms.",
    image: "/images/services/rent.png",
  },
  {
    id: "sell",
    title: "Sell",
    italic: false,
    label: "List your property with India's most trusted real estate platform. Reach millions of buyers.",
    image: "/images/services/sell.png",
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="w-full flex flex-row overflow-hidden"
      style={{
        height: "100vh",
        backgroundColor: "var(--background)",
        borderTop: "1px solid rgba(180,170,155,0.2)",
        borderBottom: "1px solid rgba(180,170,155,0.2)",
      }}
    >
      {SERVICES.map((service, index) => {
        const isHovered = hoveredIndex === index;
        const isOthersHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <div
            key={service.id}
            className="relative cursor-pointer overflow-hidden group"
            style={{
              flex: isHovered ? "2.5 1 0%" : isOthersHovered ? "0.5 1 0%" : "1 1 0%",
              transition: "flex 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              borderRight: index < 2 ? "1px solid rgba(180,170,155,0.2)" : "none",
              height: "100%",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="absolute inset-0 z-0"
              style={{
                transform: isHovered ? "scale(1)" : "scale(1.1)",
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="50vw"
                style={{
                  objectFit: "cover",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.8s ease",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.8s ease",
                }}
              />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center"
              style={{ padding: "2rem" }}
            >
              <h2
                className={cn(
                  service.italic ? "font-editorial italic" : "font-display font-bold uppercase"
                )}
                style={{
                  fontSize: isHovered
                    ? "clamp(6rem, 12vw, 15rem)"
                    : isOthersHovered
                      ? "clamp(2rem, 4vw, 5rem)"
                      : "clamp(4rem, 8vw, 10rem)",
                  color: isHovered
                    ? "var(--cloud)"
                    : isOthersHovered
                      ? "var(--stone)"
                      : "var(--ink)",
                  letterSpacing: service.italic ? "normal" : "-0.04em",
                  lineHeight: 0.8,
                  whiteSpace: "nowrap",
                  transform: isHovered ? "translateY(-3rem)" : "translateY(0)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {service.title}
              </h2>

              <div
                className="absolute flex flex-col items-center text-center"
                style={{
                  bottom: "4rem",
                  left: "2rem",
                  right: "2rem",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(2.5rem)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isHovered ? "0.1s" : "0s",
                  pointerEvents: isHovered ? "auto" : "none",
                }}
              >
                <div className="flex items-center gap-4" style={{ marginBottom: "1rem" }}>
                  <div style={{ width: "2rem", height: "1px", backgroundColor: "var(--bronze)" }} />
                  <span className="font-display" style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bronze)" }}>
                    Explore
                  </span>
                  <div style={{ width: "2rem", height: "1px", backgroundColor: "var(--bronze)" }} />
                </div>
                <p className="font-editorial" style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", color: "rgba(255,255,255,0.9)", maxWidth: "24rem" }}>
                  {service.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
