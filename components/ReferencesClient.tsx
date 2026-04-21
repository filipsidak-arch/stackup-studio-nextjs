"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export interface ReferenceProps {
  name: string;
  subtitle: string;
  websiteUrl: string;
  quote: string;
  quoteAuthor: string;
  challenge: string;
  solution: string;
  tags: string[];
  beforeAfter: { before: string; after: string }[];
}

export function ReferenceClient({
  name,
  subtitle,
  websiteUrl,
  quote,
  quoteAuthor,
  challenge,
  solution,
  tags,
  beforeAfter,
}: ReferenceProps) {
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
    <section id="reference" className="py-24 bg-beige-dark px-6 section-enter">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Hlavička */}
        <div className={reveal(0).className} style={reveal(0).style}>
          <p className="text-forest text-sm font-medium tracking-[0.2em] uppercase mb-3 text-center">
            Reference
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-forest text-center mb-14">
            Projekty, které fungují
          </h2>
        </div>

        {/* Case study karta — container bez animace, internals se staggerují */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-forest/8">

          {/* Screenshot */}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block relative h-80 overflow-hidden ${reveal(150).className}`}
            style={reveal(150).style}
          >
            <Image
              src="/cqbhell-preview.webp"
              alt="Náhled webu cqbhell.cz"
              fill
              className="object-cover rounded-t-2xl transition-transform duration-500 ease-smooth hover:scale-[1.02]"
              style={{ objectPosition: "center 15%" }}
            />
          </a>

          {/* Hlavička projektu */}
          <div
            className={`px-8 md:px-12 py-8 border-b border-forest/8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${reveal(300).className}`}
            style={reveal(300).style}
          >
            <div>
              <h3 className="text-2xl font-bold text-forest mb-1">{name}</h3>
              <p className="text-forest/50 text-sm">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, ti) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-forest/8 text-forest"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : "translateY(8px)",
                    transition: "opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transitionDelay: inView ? `${360 + ti * 60}ms` : "0ms",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Výzva + Řešení */}
          <div
            className={`px-8 md:px-12 py-10 grid md:grid-cols-2 gap-10 ${reveal(480).className}`}
            style={reveal(480).style}
          >
            {/* 01 Výzva */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-forest tracking-widest">01</span>
                <div className="h-px flex-1 bg-gold/30" />
              </div>
              <h4 className="text-lg font-bold text-forest mb-3">Výzva</h4>
              <p className="text-forest/65 text-sm leading-relaxed">
                {challenge}
              </p>
            </div>

            {/* 02 Řešení */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-forest tracking-widest">02</span>
                <div className="h-px flex-1 bg-gold/30" />
              </div>
              <h4 className="text-lg font-bold text-forest mb-3">Řešení</h4>
              <p className="text-forest/65 text-sm leading-relaxed">
                {solution}
              </p>
            </div>
          </div>

          {/* 03 Výsledky — Před / Po */}
          <div className="px-8 md:px-12 pb-10">
            <div
              className={`flex items-center gap-3 mb-6 ${reveal(620).className}`}
              style={reveal(620).style}
            >
              <span className="text-xs font-bold text-forest tracking-widest">03</span>
              <div className="h-px flex-1 bg-gold/30" />
            </div>
            <h4
              className={`text-lg font-bold text-forest mb-5 ${reveal(660).className}`}
              style={reveal(660).style}
            >
              Výsledky
            </h4>

            {/* Tabulka — desktop */}
            <div className="hidden md:block rounded-2xl overflow-hidden border border-forest/10">
              <div
                className={`grid grid-cols-2 text-xs font-bold uppercase tracking-wider ${reveal(700).className}`}
                style={reveal(700).style}
              >
                <div className="bg-beige text-forest/50 px-5 py-3">Před</div>
                <div className="bg-forest text-gold px-5 py-3">Po</div>
              </div>
              {beforeAfter.map((row, i) => (
                <div
                  key={row.before}
                  className={`grid grid-cols-2 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-forest/3"
                  }`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : "translateY(8px)",
                    transition:
                      "opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transitionDelay: inView ? `${760 + i * 75}ms` : "0ms",
                  }}
                >
                  <div className="px-5 py-4 text-forest/50">
                    {row.before}
                  </div>
                  <div className="px-5 py-4 text-forest font-medium bg-forest/5 border-l border-forest/8">
                    {row.after}
                  </div>
                </div>
              ))}
            </div>

            {/* Karty — mobil */}
            <div className="flex flex-col gap-3 md:hidden">
              {beforeAfter.map((row, i) => (
                <div
                  key={row.before}
                  className="rounded-2xl border border-forest/10 bg-white px-5 py-4"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : "translateY(8px)",
                    transition:
                      "opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transitionDelay: inView ? `${760 + i * 75}ms` : "0ms",
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest/40 w-12 shrink-0">Před</span>
                      <span className="text-sm text-forest/50">{row.before}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-forest-light w-12 shrink-0">Po</span>
                      <span className="text-sm text-forest-light font-medium">{row.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA tlačítko */}
            <div
              className={`mt-8 flex justify-end ${reveal(1040).className}`}
              style={reveal(1040).style}
            >
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-forest text-gold font-semibold text-sm px-6 py-3 rounded-full hover:bg-forest-light hover:scale-[1.03] active:scale-[0.98] transition-[transform,background-color] duration-150 ease-smooth"
              >
                Navštívit web
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Recenze klienta */}
            <div
              className={`mt-8 border-t border-forest/10 pt-8 ${reveal(1140).className}`}
              style={reveal(1140).style}
            >
              <span className="text-3xl font-serif text-gold leading-none">&ldquo;</span>
              <p className="italic text-forest/70 text-sm leading-relaxed mt-1">
                {quote}
              </p>
              <p className="mt-3 text-sm font-semibold text-forest">— {quoteAuthor}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
