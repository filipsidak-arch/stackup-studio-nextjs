import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Zásady ochrany osobních údajů — Stackup Studio",
};

export default function GdprPage() {
  return (
    <>
      <Navbar />
      <main className="bg-beige min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-forest text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Právní informace
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-forest mb-12">
            Zásady ochrany osobních údajů
          </h1>

          <div className="flex flex-col gap-10 text-forest/80 text-sm leading-relaxed">

            {/* Správce */}
            <section>
              <h2 className="text-lg font-bold text-forest mb-4">Správce osobních údajů</h2>
              <ul className="flex flex-col gap-1.5">
                <li><span className="font-medium text-forest">Jméno:</span> Filip Šidák</li>
                <li><span className="font-medium text-forest">IČO:</span> 02089939</li>
                <li><span className="font-medium text-forest">Sídlo:</span> Lidická 358, Polabiny, 530 09 Pardubice</li>
                <li>
                  <span className="font-medium text-forest">E-mail:</span>{" "}
                  <a href="mailto:filip@stackupstudio.cz" className="text-forest underline hover:text-gold transition-colors">
                    filip@stackupstudio.cz
                  </a>
                </li>
                <li>
                  <span className="font-medium text-forest">Web:</span>{" "}
                  <a href="https://stackupstudio.cz" target="_blank" rel="noopener noreferrer" className="text-forest underline hover:text-gold transition-colors">
                    stackupstudio.cz
                  </a>
                </li>
              </ul>
            </section>

            <div className="border-t border-forest/10" />

            {/* Jaké údaje */}
            <section>
              <h2 className="text-lg font-bold text-forest mb-4">Jaké údaje sbíráme a proč</h2>
              <div className="flex flex-col gap-5">
                <div>
                  <p className="font-medium text-forest mb-1">Kontaktní formulář</p>
                  <p>Sbíráme jméno, e-mail a obsah zprávy. Právní základ: oprávněný zájem. Uchováváme 1 rok.</p>
                </div>
                <div>
                  <p className="font-medium text-forest mb-1">Zakázky a fakturace</p>
                  <p>Zpracováváme jméno nebo název firmy, IČO, adresu, e-mail a telefon. Právní základ: plnění smlouvy. Uchováváme 10 let.</p>
                </div>
              </div>
            </section>

            <div className="border-t border-forest/10" />

            {/* Příjemci */}
            <section>
              <h2 className="text-lg font-bold text-forest mb-4">Komu data předáváme</h2>
              <ul className="flex flex-col gap-1.5 list-disc list-inside">
                <li>Formspree Inc. (USA, standardní smluvní doložky EU)</li>
                <li>Fakturoid s.r.o. (ČR)</li>
                <li>Orgány veřejné moci dle zákonné povinnosti</li>
              </ul>
            </section>

            <div className="border-t border-forest/10" />

            {/* Práva */}
            <section>
              <h2 className="text-lg font-bold text-forest mb-4">Vaše práva</h2>
              <p className="mb-3">
                Máte právo na přístup ke svým údajům, jejich opravu, výmaz, přenositelnost a právo vznést námitku.
                Stížnost můžete podat u Úřadu pro ochranu osobních údajů na{" "}
                <a href="https://uoou.cz" target="_blank" rel="noopener noreferrer" className="text-forest underline hover:text-gold transition-colors">
                  uoou.cz
                </a>.
              </p>
              <p>
                Žádosti zasílejte na{" "}
                <a href="mailto:filip@stackupstudio.cz" className="text-forest underline hover:text-gold transition-colors">
                  filip@stackupstudio.cz
                </a>
                . Odpovíme do 30 dnů.
              </p>
            </section>

            <div className="border-t border-forest/10" />

            {/* Cookies */}
            <section>
              <h2 className="text-lg font-bold text-forest mb-4">Cookies</h2>
              <p>
                Web nepoužívá analytické ani marketingové cookies. Používáme pouze technické cookies
                nezbytné pro správné fungování webu.
              </p>
            </section>

            <div className="border-t border-forest/10" />

            {/* Bezpečnost */}
            <section>
              <h2 className="text-lg font-bold text-forest mb-4">Bezpečnost</h2>
              <p>
                Veškerá data jsou přenášena šifrovaně prostřednictvím HTTPS.
                Přístup k osobním údajům mají pouze oprávněné osoby.
              </p>
            </section>

            <div className="border-t border-forest/10" />

            {/* Změny */}
            <section>
              <h2 className="text-lg font-bold text-forest mb-4">Změny zásad</h2>
              <p>
                Aktuální verze zásad je vždy dostupná na této stránce.
                Datum poslední aktualizace: březen 2026.
              </p>
            </section>

            <p className="text-forest/40 text-xs pt-2">Platné od března 2026.</p>
          </div>
        </div>
      </main>
    </>
  );
}
