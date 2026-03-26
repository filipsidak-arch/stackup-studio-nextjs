"use client";

import { useInView } from "@/hooks/useInView";

const plans = [
  {
    name: "Starter",
    price: "7 000",
    description: "Ideální pro živnostníky a malé podnikatele.",
    features: [
      "Jednostránkový web",
      "Mobilní optimalizace",
      "Kontaktní formulář",
      "Základní SEO",
    ],
    highlight: false,
  },
  {
    name: "Standard",
    price: "12 000",
    description: "Pro firmy, které chtějí více než základní prezentaci.",
    features: [
      "Vícestránkový web",
      "Mobilní optimalizace",
      "Kontaktní formulář",
      "SEO nastavení",
      "Google Analytics",
      "1 chytrá funkce",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "19 000",
    description: "Plně vybavený web s vlastními funkcemi na míru.",
    features: [
      "Vícestránkový web",
      "Mobilní optimalizace",
      "Pokročilé SEO",
      "Google Analytics",
      "Rezervační systém",
      "CMS přes Google Sheets",
      "Kapacitní semafor",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  const { ref, inView } = useInView();

  const reveal = (delay = 0) => ({
    className: `transition-[opacity,transform] duration-700 ease-smooth ${
      inView ? "opacity-100 translate-y-0" : "opacity-[0.01] translate-y-7"
    }`,
    style: {
      transitionDelay: inView ? `${delay}ms` : "0ms",
      willChange: "opacity, transform",
    },
  });

  return (
    <section id="cenik" className="py-24 bg-forest px-6 section-enter">
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Hlavička — každý element staggeruje zvlášť */}
        <div className="text-center mb-14">
          <p
            className={`text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3 ${reveal(0).className}`}
            style={reveal(0).style}
          >
            Ceník
          </p>
          <h2
            className={`text-3xl md:text-4xl font-bold text-beige mb-4 ${reveal(90).className}`}
            style={reveal(90).style}
          >
            Transparentní ceny
          </h2>
          <p
            className={`text-beige/60 ${reveal(180).className}`}
            style={reveal(180).style}
          >
            Měsíční správa webu:{" "}
            <span className="text-gold font-semibold">1 500 Kč / měs.</span>
          </p>
        </div>

        {/* Karty se staggerem */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`flex flex-col ${reveal(280 + i * 130).className}`}
              style={reveal(280 + i * 130).style}
            >
              {/* Badge nad kartou */}
              <div className="h-7 mb-2 flex items-center justify-center text-center">
                {plan.highlight && (
                  <span className="text-xs font-bold tracking-widest uppercase text-gold">
                    Nejoblíbenější
                  </span>
                )}
              </div>

              <div
                className={`rounded-2xl p-8 flex flex-col flex-1 bg-forest-light text-beige hover:-translate-y-1 hover:shadow-lg transition-[transform,box-shadow] duration-200 ease-smooth ${
                  plan.highlight ? "border-2 border-gold" : "border-2 border-transparent"
                }`}
              >
                <h3 className="text-xl font-bold mb-1 text-beige">
                  {plan.name}
                </h3>
                <p className="text-sm mb-6 text-beige/60">
                  {plan.description}
                </p>

                <div className="mb-8 flex items-baseline gap-1.5 flex-nowrap min-w-0">
                  <span className="text-3xl font-bold whitespace-nowrap text-gold">
                    {plan.price} Kč
                  </span>
                  <span className="text-sm whitespace-nowrap text-beige/50">
                    jednorázově
                  </span>
                </div>

                {/* Feature items — stagger uvnitř každé karty */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, fi) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm transition-[opacity,transform] duration-500 ease-smooth"
                      style={{
                        opacity: inView ? 1 : 0.01,
                        transform: inView ? "none" : "translateY(10px)",
                        transitionDelay: inView
                          ? `${360 + i * 130 + fi * 55}ms`
                          : "0ms",
                        willChange: "opacity, transform",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 text-gold"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-beige/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 flex justify-center">
                  <a
                    href="#kontakt"
                    className="inline-block px-8 py-3 min-w-[160px] rounded-full font-semibold text-sm text-center bg-gold text-forest hover:bg-gold-light hover:scale-[1.03] active:scale-[0.98] transition-[transform,background-color] duration-150 ease-smooth"
                  >
                    Mám zájem
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
