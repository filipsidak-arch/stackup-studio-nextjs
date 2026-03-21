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
  return (
    <section id="cenik" className="py-24 bg-[#1a3a2a] px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#c9a84c] text-sm font-medium tracking-[0.2em] uppercase mb-3 text-center">
          Ceník
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#f5f0e8] text-center mb-4">
          Transparentní ceny
        </h2>
        <p className="text-[#f5f0e8]/60 text-center mb-14">
          Měsíční správa webu:{" "}
          <span className="text-[#c9a84c] font-semibold">1 500 Kč / měs.</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col">
              {/* Badge nad kartou */}
              <div className="h-7 mb-2 flex items-center justify-center text-center">
                {plan.highlight && (
                  <span className="text-xs font-bold tracking-widest uppercase text-[#c9a84c]">
                    Nejoblíbenější
                  </span>
                )}
              </div>

              <div
                className={`rounded-2xl p-8 flex flex-col flex-1 bg-[#2d5a3d] text-[#f5f0e8] ${
                  plan.highlight ? "border-2 border-[#c9a84c]" : "border-2 border-transparent"
                }`}
              >
                <h3 className="text-xl font-bold mb-1 text-[#f5f0e8]">
                  {plan.name}
                </h3>
                <p className="text-sm mb-6 text-[#f5f0e8]/60">
                  {plan.description}
                </p>

                {/* Cena — vše na jednom řádku, no-wrap */}
                <div className="mb-8 flex items-baseline gap-1.5 flex-nowrap min-w-0">
                  <span className="text-3xl font-bold whitespace-nowrap text-[#c9a84c]">
                    {plan.price} Kč
                  </span>
                  <span className="text-sm whitespace-nowrap text-[#f5f0e8]/50">
                    jednorázově
                  </span>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 4.5"
                          stroke="#c9a84c"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[#f5f0e8]/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 flex justify-center">
                  <a
                    href="#kontakt"
                    className="inline-block px-8 py-3 min-w-[160px] rounded-full font-semibold text-sm text-center transition-colors bg-[#c9a84c] text-[#1a3a2a] hover:bg-[#d9be7a]"
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
