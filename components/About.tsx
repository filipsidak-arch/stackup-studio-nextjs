"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const { ref, inView } = useInView();

  const reveal = (delay = 0) => ({
    className: `transition-[opacity,transform] duration-[900ms] ease-gentle ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
    }`,
    style: {
      transitionDelay: inView ? `${delay}ms` : "0ms",
      willChange: "opacity, transform",
    },
  });

  return (
    <section id="o-mne" className="py-24 bg-beige px-6 section-enter">
      <div ref={ref} className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Foto */}
        <div
          className={`shrink-0 w-48 h-48 rounded-full border-2 border-gold overflow-hidden ${reveal(0).className}`}
          style={reveal(0).style}
        >
          <Image
            src="/IMG_3853.webp"
            alt="Filip Šidák"
            width={192}
            height={192}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>

        {/* Text */}
        <div className={reveal(150).className} style={reveal(150).style}>
          <p className="text-forest text-sm font-medium tracking-[0.2em] uppercase mb-3">
            O mně
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-5">
            Filip Šidák
          </h2>
          <p className="text-forest/70 text-lg leading-relaxed mb-4">
            Pomáhám podnikatelům a lokálním firmám získat web, který skutečně funguje.
            Žádná velká agentura, žádné zbytečné čekání. Jen rychlý, moderní web
            navržený přesně pro vaše potřeby.
          </p>
          <p className="text-forest/70 text-lg leading-relaxed">
            Specializuji se na weby s chytrými funkcemi – rezervační systémy,
            CMS přes Google Sheets, kapacitní semafory a další řešení, která
            šetří váš čas a zlepšují zákaznickou zkušenost.
          </p>
        </div>
      </div>
    </section>
  );
}
