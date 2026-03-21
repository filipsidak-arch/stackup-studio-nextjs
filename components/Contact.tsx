"use client";

import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section id="kontakt" className="py-24 bg-[#f5f0e8] px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#c9a84c] text-sm font-medium tracking-[0.2em] uppercase mb-3 text-center">
          Kontakt
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a2a] text-center mb-14">
          Pojďme si popovídat
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Kontaktní info */}
          <div className="flex flex-col gap-6 justify-center">
            <a
              href="mailto:filip@stackupstudio.cz"
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a3a2a] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5h14l-7 7-7-7zm0 0v10h14V5" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#1a3a2a]/50 mb-0.5">E-mail</p>
                <p className="text-[#1a3a2a] font-medium group-hover:text-[#c9a84c] transition-colors">
                  filip@stackupstudio.cz
                </p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/filipsidak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a3a2a] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="16" height="16" rx="3" stroke="#c9a84c" strokeWidth="1.5"/>
                  <path d="M6 8.5V14M6 5.5V6M10 14v-3a2 2 0 0 1 4 0v3M10 8.5V14" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#1a3a2a]/50 mb-0.5">LinkedIn</p>
                <p className="text-[#1a3a2a] font-medium group-hover:text-[#c9a84c] transition-colors">
                  linkedin.com/in/filipsidak
                </p>
              </div>
            </a>
          </div>

          {/* Formulář */}
          {sent ? (
            <div className="flex items-center justify-center bg-[#1a3a2a] rounded-2xl p-10 text-center">
              <div>
                <div className="w-14 h-14 rounded-full bg-[#c9a84c] flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12l5 5L20 7" stroke="#1a3a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[#f5f0e8] font-semibold text-lg mb-1">Zpráva odeslána!</p>
                <p className="text-[#f5f0e8]/60 text-sm">Ozveme se vám co nejdříve.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1a3a2a]/60 mb-1.5">
                    Jméno
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jan Novák"
                    className="w-full px-4 py-3 rounded-xl border border-[#1a3a2a]/15 bg-white text-[#1a3a2a] placeholder-[#1a3a2a]/30 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1a3a2a]/60 mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jan@firma.cz"
                    className="w-full px-4 py-3 rounded-xl border border-[#1a3a2a]/15 bg-white text-[#1a3a2a] placeholder-[#1a3a2a]/30 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1a3a2a]/60 mb-1.5">
                  Zpráva
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Popište váš projekt nebo se zeptejte na cokoliv..."
                  className="w-full px-4 py-3 rounded-xl border border-[#1a3a2a]/15 bg-white text-[#1a3a2a] placeholder-[#1a3a2a]/30 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 text-sm resize-none"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#1a3a2a] text-[#c9a84c] font-semibold py-3.5 rounded-full hover:bg-[#2d5a42] transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Odesílám…" : "Odeslat zprávu"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-[#1a3a2a]/15 text-center text-sm text-[#1a3a2a]/40">
        © {new Date().getFullYear()} Stackup Studio · Filip Šidák
        <span className="mx-2">·</span>
        <a href="/gdpr" className="hover:text-[#c9a84c] transition-colors">
          Zásady ochrany osobních údajů
        </a>
      </div>
    </section>
  );
}
