export default function About() {
  return (
    <section id="o-mne" className="py-24 bg-[#f5f0e8] px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Foto */}
        <div className="shrink-0 w-48 h-48 rounded-full border-2 border-[#c9a84c] overflow-hidden">
          <img
            src="/IMG_3853.webp"
            alt="Filip Šidák"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-[#c9a84c] text-sm font-medium tracking-[0.2em] uppercase mb-3">
            O mně
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a2a] mb-5">
            Filip Šidák
          </h2>
          <p className="text-[#1a3a2a]/70 text-lg leading-relaxed mb-4">
            Pomáhám podnikatelům a lokálním firmám získat web, který skutečně funguje.
            Žádná velká agentura, žádné zbytečné čekání. Jen rychlý, moderní web
            navržený přesně pro vaše potřeby.
          </p>
          <p className="text-[#1a3a2a]/70 text-lg leading-relaxed">
            Specializuji se na weby s chytrými funkcemi – rezervační systémy,
            CMS přes Google Sheets, kapacitní semafory a další řešení, která
            šetří váš čas a zlepšují zákaznickou zkušenost.
          </p>
        </div>
      </div>
    </section>
  );
}
