"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export interface AboutClientProps {
  bio1: string;
  bio2: string;
}

export function AboutClient({ bio1, bio2 }: AboutClientProps) {
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

        <div className={reveal(150).className} style={reveal(150).style}>
          <p className="text-forest text-sm font-medium tracking-[0.2em] uppercase mb-3">
            O mně
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-5">
            Filip Šidák
          </h2>
          <p className="text-forest/70 text-lg leading-relaxed mb-4">
            {bio1}
          </p>
          <p className="text-forest/70 text-lg leading-relaxed">
            {bio2}
          </p>
        </div>
      </div>
    </section>
  );
}
