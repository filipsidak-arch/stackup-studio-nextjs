"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import Footer from "@/components/Footer";

export interface ContactClientProps {
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
}

export function ContactClient({ email, linkedinUrl, linkedinLabel }: ContactClientProps) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("https://formspree.io/f/xzdjgngl", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });

    setSubmitting(false);

    if (res.ok) {
      setSent(true);
    } else {
      setError("Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.");
    }
  }

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
    <section id="kontakt" className="py-24 bg-beige px-6 section-enter">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className={reveal(0).className} style={reveal(0).style}>
          <p className="text-forest text-sm font-medium tracking-[0.2em] uppercase mb-3 text-center">
            Kontakt
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-forest text-center mb-14">
            Pojďme si popovídat
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6 justify-center">
            <a
              href={`mailto:${email}`}
              className={`flex items-center gap-4 group ${reveal(150).className}`}
              style={reveal(150).style}
            >
              <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center shrink-0 transition-transform duration-150 ease-smooth group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                  <path d="M3 5h14l-7 7-7-7zm0 0v10h14V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-forest/50 mb-0.5">E-mail</p>
                <p className="text-forest font-medium group-hover:text-gold transition-colors duration-150">
                  {email}
                </p>
              </div>
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 group ${reveal(270).className}`}
              style={reveal(270).style}
            >
              <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center shrink-0 transition-transform duration-150 ease-smooth group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                  <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 8.5V14M6 5.5V6M10 14v-3a2 2 0 0 1 4 0v3M10 8.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-forest/50 mb-0.5">LinkedIn</p>
                <p className="text-forest font-medium group-hover:text-gold transition-colors duration-150">
                  {linkedinLabel}
                </p>
              </div>
            </a>
          </div>

          <div aria-live="polite" className={reveal(150).className} style={reveal(150).style}>
            {sent ? (
              <div className="flex items-center justify-center bg-forest rounded-2xl p-10 text-center">
                <div>
                  <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-4 animate-fade-up">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-forest">
                      <path d="M4 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-beige font-semibold text-lg mb-1">Zpráva odeslána!</p>
                  <p className="text-beige/60 text-sm">Ozveme se vám co nejdříve.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-forest/60 mb-1.5">
                      Jméno
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jan Novák"
                      className="w-full px-4 py-3 rounded-xl border border-forest/15 bg-white text-forest placeholder-forest/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-[border-color,box-shadow] duration-150 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-forest/60 mb-1.5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jan@firma.cz"
                      className="w-full px-4 py-3 rounded-xl border border-forest/15 bg-white text-forest placeholder-forest/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-[border-color,box-shadow] duration-150 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-forest/60 mb-1.5">
                    Zpráva
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Popište váš projekt nebo se zeptejte na cokoliv..."
                    className="w-full px-4 py-3 rounded-xl border border-forest/15 bg-white text-forest placeholder-forest/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-[border-color,box-shadow] duration-150 text-sm resize-none"
                  />
                </div>
                {error && (
                  <p className="text-error text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-forest text-gold font-semibold py-3.5 rounded-full hover:bg-forest-light hover:scale-[1.02] active:scale-[0.98] transition-[transform,background-color] duration-150 ease-smooth text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? "Odesílám…" : "Odeslat zprávu"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
