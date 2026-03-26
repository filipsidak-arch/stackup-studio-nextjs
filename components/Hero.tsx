"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let t = 0;

    function tick() {
      t += 0.003;
      // Two overlapping sine waves at incommensurable frequencies → no perceptible loop
      const fx = 0.65 + Math.sin(t * 0.6) * 0.07 + Math.sin(t * 0.23) * 0.03;
      const fy = 0.65 + Math.sin(t * 0.45 + 2.1) * 0.07 + Math.sin(t * 0.31) * 0.03;
      turbRef.current?.setAttribute(
        "baseFrequency",
        `${fx.toFixed(5)} ${fy.toFixed(5)}`
      );
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="min-h-screen bg-forest flex items-center justify-center text-center px-6 relative overflow-hidden">
      {/* SVG filter definition — animated fractal noise */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="hero-noise"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="linearRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.65 0.65"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      {/* Subtle grid lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated organic noise texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: "url(#hero-noise)",
          opacity: 0.055,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Content — scroll parallax via .hero-parallax CSS class */}
      <div className="max-w-3xl relative z-10 hero-parallax">
        <p
          className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", willChange: "opacity, transform" }}
        >
          Webové stránky na míru
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold text-beige leading-tight mb-6 animate-fade-up"
          style={{ animationDelay: "0.35s", willChange: "opacity, transform" }}
        >
          Stackup Studio
        </h1>
        <p
          className="text-xl md:text-2xl text-beige/70 mb-10 font-light animate-fade-up"
          style={{ animationDelay: "0.65s", willChange: "opacity, transform" }}
        >
          Weby, které fungují. Bez agentury.
        </p>
        <a
          href="#reference"
          className="inline-block bg-gold text-forest font-semibold px-8 py-4 rounded-full text-base hover:bg-gold-light hover:scale-[1.03] active:scale-[0.98] transition-[transform,background-color] duration-150 ease-smooth animate-fade-up"
          style={{ animationDelay: "0.95s", willChange: "opacity, transform" }}
        >
          Zobrazit reference
        </a>
      </div>
    </section>
  );
}
