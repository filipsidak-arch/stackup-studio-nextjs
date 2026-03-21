const tags = [
  "Google Sheets CMS",
  "Registrační systém",
  "Kapacitní semafor",
];

const beforeAfter = [
  { metric: "Správa termínů", before: "Ručně přes SMS/telefon", after: "Online rezervační systém" },
  { metric: "Kapacita hřiště", before: "Neviditelná, časté přetížení", after: "Semafor v reálném čase" },
  { metric: "Aktualizace cen & info", before: "Zásah programátora", after: "Editace v Google Sheets" },
  { metric: "Mobilní zobrazení", before: "Nefunkční na mobilu", after: "Plně responzivní" },
];

export default function References() {
  return (
    <section id="reference" className="py-24 bg-[#ebe4d6] px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#c9a84c] text-sm font-medium tracking-[0.2em] uppercase mb-3 text-center">
          Reference
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a2a] text-center mb-14">
          Projekty, které fungují
        </h2>

        {/* Case study karta */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#1a3a2a]/8">

          {/* Screenshot */}
          <a href="https://cqbhell.cz" target="_blank" rel="noopener noreferrer" className="block relative h-80">
            <img
              src="/cqbhell-preview.webp"
              alt="Náhled webu cqbhell.cz"
              className="w-full h-full object-cover rounded-t-2xl"
              style={{ objectPosition: "center 15%" }}
            />
          </a>

          {/* Hlavička projektu */}
          <div className="px-8 md:px-12 py-8 border-b border-[#1a3a2a]/8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#1a3a2a] mb-1">CQB HELL</h3>
              <p className="text-[#1a3a2a]/50 text-sm">Největší CQB airsoftová aréna v České Republice</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#1a3a2a]/8 text-[#1a3a2a]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="px-8 md:px-12 py-10 grid md:grid-cols-2 gap-10">
            {/* 01 Výzva */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-[#c9a84c] tracking-widest">01</span>
                <div className="h-px flex-1 bg-[#c9a84c]/30" />
              </div>
              <h4 className="text-lg font-bold text-[#1a3a2a] mb-3">Výzva</h4>
              <p className="text-[#1a3a2a]/65 text-sm leading-relaxed">
                CQB HELL provozuje airsoft arénu s proměnlivou kapacitou a pravidelnými
                akcemi. Správa rezervací probíhala telefonicky a přes SMS, kapacita hřiště
                nebyla online viditelná a aktualizace webu vyžadovala programátora.
              </p>
            </div>

            {/* 02 Řešení */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-[#c9a84c] tracking-widest">02</span>
                <div className="h-px flex-1 bg-[#c9a84c]/30" />
              </div>
              <h4 className="text-lg font-bold text-[#1a3a2a] mb-3">Řešení</h4>
              <p className="text-[#1a3a2a]/65 text-sm leading-relaxed">
                Postavil jsem web s online registračním systémem, kapacitním semaforem
                v reálném čase a Google Sheets CMS — majitel mění ceny, termíny a texty
                přímo v tabulce, bez dotyku kódu.
              </p>
            </div>
          </div>

          {/* 03 Výsledky — Před / Po */}
          <div className="px-8 md:px-12 pb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-[#c9a84c] tracking-widest">03</span>
              <div className="h-px flex-1 bg-[#c9a84c]/30" />
            </div>
            <h4 className="text-lg font-bold text-[#1a3a2a] mb-5">Výsledky</h4>

            {/* Tabulka — desktop */}
            <div className="hidden md:block rounded-2xl overflow-hidden border border-[#1a3a2a]/10">
              {/* Hlavička tabulky */}
              <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-wider">
                <div className="bg-[#1a3a2a]/5 text-[#1a3a2a]/50 px-5 py-3">Oblast</div>
                <div className="bg-[#f5f0e8] text-[#1a3a2a]/50 px-5 py-3">Před</div>
                <div className="bg-[#1a3a2a] text-[#c9a84c] px-5 py-3">Po</div>
              </div>
              {/* Řádky */}
              {beforeAfter.map((row, i) => (
                <div
                  key={row.metric}
                  className={`grid grid-cols-3 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-[#1a3a2a]/3"
                  }`}
                >
                  <div className="px-5 py-4 font-medium text-[#1a3a2a]">
                    {row.metric}
                  </div>
                  <div className="px-5 py-4 text-[#1a3a2a]/50 border-l border-[#1a3a2a]/8">
                    {row.before}
                  </div>
                  <div className="px-5 py-4 text-[#1a3a2a] font-medium bg-[#1a3a2a]/5 border-l border-[#1a3a2a]/8">
                    {row.after}
                  </div>
                </div>
              ))}
            </div>

            {/* Karty — mobil */}
            <div className="flex flex-col gap-3 md:hidden">
              {beforeAfter.map((row) => (
                <div
                  key={row.metric}
                  className="rounded-2xl border border-[#1a3a2a]/10 bg-white px-5 py-4"
                >
                  <p className="font-bold text-[#1a3a2a] text-sm mb-3">{row.metric}</p>
                  <div className="flex flex-col gap-1.5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1a3a2a]/40 mr-2">Před</span>
                      <span className="text-sm text-[#1a3a2a]/50">{row.before}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2d5a42] mr-2">Po</span>
                      <span className="text-sm text-[#2d5a42] font-medium">{row.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <a
                href="https://cqbhell.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a3a2a] text-[#c9a84c] font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#2d5a42] transition-colors"
              >
                Navštívit web
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
