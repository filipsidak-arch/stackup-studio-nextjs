export default function Hero() {
  return (
    <section
      className="min-h-screen bg-[#1a3a2a] flex items-center justify-center text-center px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div className="max-w-3xl">
        <p className="text-[#c9a84c] text-sm font-medium tracking-[0.2em] uppercase mb-6">
          Webové stránky na míru
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-[#f5f0e8] leading-tight mb-6">
          Stackup Studio
        </h1>
        <p className="text-xl md:text-2xl text-[#f5f0e8]/70 mb-10 font-light">
          Weby, které fungují. Bez agentury.
        </p>
        <a
          href="#reference"
          className="inline-block bg-[#c9a84c] text-[#1a3a2a] font-semibold px-8 py-4 rounded-full text-base hover:bg-[#d9be7a] transition-colors"
        >
          Zobrazit reference
        </a>
      </div>
    </section>
  );
}
