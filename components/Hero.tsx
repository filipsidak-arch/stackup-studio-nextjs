export default function Hero() {
  return (
    <section
      className="min-h-screen bg-forest flex items-center justify-center text-center px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      <div className="max-w-3xl">
        <p
          className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", willChange: "opacity, transform" }}
        >
          Webové stránky na míru
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold text-beige leading-tight mb-6 animate-fade-up"
          style={{ animationDelay: "0.25s", willChange: "opacity, transform" }}
        >
          Stackup Studio
        </h1>
        <p
          className="text-xl md:text-2xl text-beige/70 mb-10 font-light animate-fade-up"
          style={{ animationDelay: "0.4s", willChange: "opacity, transform" }}
        >
          Weby, které fungují. Bez agentury.
        </p>
        <a
          href="#reference"
          className="inline-block bg-gold text-forest font-semibold px-8 py-4 rounded-full text-base hover:bg-gold-light hover:scale-[1.03] active:scale-[0.98] transition-[transform,background-color] duration-150 ease-smooth animate-fade-up"
          style={{ animationDelay: "0.55s", willChange: "opacity, transform" }}
        >
          Zobrazit reference
        </a>
      </div>
    </section>
  );
}
