"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#o-mne", label: "O mně" },
  { href: "#reference", label: "Reference" },
  { href: "#cenik", label: "Ceník" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-forest/95 backdrop-blur-sm border-b transition-colors duration-200 ${
      scrolled ? "border-beige/10" : "border-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="text-gold font-bold text-lg tracking-wide">
          Stackup Studio
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-beige/80">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gold transition-colors">
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="bg-gold text-forest px-4 py-1.5 rounded-full font-medium hover:bg-gold-light transition-colors"
          >
            Kontakt
          </a>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
        >
          <span
            className={`block w-6 h-0.5 bg-beige transition-all duration-200 origin-center ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-beige transition-all duration-200 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-beige transition-all duration-200 origin-center ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="bg-forest border-t border-beige/10 px-6 py-4 flex flex-col gap-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-beige/80 hover:text-gold transition-colors py-3.5 text-base border-b border-beige/8 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-4 text-center bg-gold text-forest font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-gold-light transition-colors"
          >
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  );
}
