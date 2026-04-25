# Keystatic Full Content Mapping — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přesunout editovatelný textový obsah Hero, About a Contact sekcí do Keystatic CMS jako tři samostatné singletons.

**Architecture:** Každá sekce dostane vlastní singleton v `keystatic.config.ts` a YAML soubor v `content/`. Každá komponenta se rozdělí na server část (čte Keystatic Reader API) a client část (animace, interaktivita) — stejný vzor jako existující Pricing.tsx / PricingClient.tsx. `page.tsx` se nemění.

**Tech Stack:** Next.js 16 App Router, @keystatic/core ^0.5.50, @keystatic/next ^5.0.4, TypeScript

---

## Soubory

| Akce | Soubor |
|---|---|
| Modify | `keystatic.config.ts` — přidat singletons hero, about, contactInfo |
| Create | `content/hero/index.yaml` |
| Create | `content/about/index.yaml` |
| Create | `content/contact-info/index.yaml` |
| Create | `components/HeroClient.tsx` (přejmenovaný + rozšířený Hero.tsx) |
| Replace | `components/Hero.tsx` (nová server komponenta) |
| Create | `components/AboutClient.tsx` (přejmenovaný + rozšířený About.tsx) |
| Replace | `components/About.tsx` (nová server komponenta) |
| Create | `components/ContactClient.tsx` (přejmenovaný + rozšířený Contact.tsx) |
| Replace | `components/Contact.tsx` (nová server komponenta) |

---

### Task 1: Hero — Keystatic singleton + server/client split

**Files:**
- Modify: `keystatic.config.ts`
- Create: `content/hero/index.yaml`
- Create: `components/HeroClient.tsx`
- Replace: `components/Hero.tsx`

- [ ] **Step 1: Přidat hero singleton do keystatic.config.ts**

Otevři `keystatic.config.ts`. Za blokem `singletons: {` přidej `hero` singleton (před `pricing`):

```ts
// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'filipsidak-arch/stackup-studio-nextjs',
  },
  collections: {
    references: collection({
      label: 'Reference',
      slugField: 'name',
      path: 'content/references/*',
      schema: {
        name: fields.slug({ name: { label: 'Název klienta' } }),
        subtitle: fields.text({ label: 'Podtitul (např. Největší CQB aréna v ČR)' }),
        websiteUrl: fields.url({ label: 'URL webu klienta' }),
        quote: fields.text({ label: 'Citát klienta', multiline: true }),
        quoteAuthor: fields.text({ label: 'Autor citátu (např. Jakub, CQB HELL)' }),
        challenge: fields.text({ label: 'Výzva', multiline: true }),
        solution: fields.text({ label: 'Řešení', multiline: true }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tagy', itemLabel: props => props.value }
        ),
        beforeAfter: fields.array(
          fields.object({
            before: fields.text({ label: 'Před' }),
            after: fields.text({ label: 'Po' }),
          }),
          { label: 'Před/Po', itemLabel: props => props.fields.before.value }
        ),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: 'Hero sekce',
      path: 'content/hero',
      schema: {
        tagline: fields.text({ label: 'Tagline (malý text nad nadpisem)' }),
        subtitle: fields.text({ label: 'Podtitulek', multiline: true }),
        ctaText: fields.text({ label: 'Text tlačítka' }),
      },
    }),
    about: singleton({
      label: 'O mně',
      path: 'content/about',
      schema: {
        bio1: fields.text({ label: 'Bio — první odstavec', multiline: true }),
        bio2: fields.text({ label: 'Bio — druhý odstavec', multiline: true }),
      },
    }),
    contactInfo: singleton({
      label: 'Kontaktní údaje',
      path: 'content/contact-info',
      schema: {
        email: fields.text({ label: 'E-mail' }),
        linkedinUrl: fields.url({ label: 'LinkedIn URL' }),
        linkedinLabel: fields.text({ label: 'LinkedIn zobrazovaný text' }),
      },
    }),
    pricing: singleton({
      label: 'Ceník',
      path: 'content/pricing',
      schema: {
        starterPrice: fields.integer({ label: 'Starter cena (Kč)' }),
        standardPrice: fields.integer({ label: 'Standard cena (Kč)' }),
        proPrice: fields.integer({ label: 'Pro cena (Kč)' }),
        maintenancePrice: fields.integer({ label: 'Měsíční správa cena (Kč)' }),
      },
    }),
  },
});
```

- [ ] **Step 2: Vytvoř content/hero/index.yaml**

```yaml
tagline: Webové stránky na míru
subtitle: Weby, které fungují. Bez agentury.
ctaText: Zobrazit reference
```

- [ ] **Step 3: Vytvoř components/HeroClient.tsx**

Zkopíruj obsah `components/Hero.tsx` do nového souboru `components/HeroClient.tsx` a přidej props:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface HeroClientProps {
  tagline: string;
  subtitle: string;
  ctaText: string;
}

export function HeroClient({ tagline, subtitle, ctaText }: HeroClientProps) {
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let t = 0;

    function tick() {
      t += 0.003;
      const fx = 0.65 + Math.sin(t * 0.6) * 0.07 + Math.sin(t * 0.23) * 0.03;
      const fy = 0.65 + Math.sin(t * 0.45 + 2.1) * 0.07 + Math.sin(t * 0.31) * 0.03;
      turbRef.current?.setAttribute(
        "baseFrequency",
        `${fx.toFixed(5)} ${fy.toFixed(5)}`
      );
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="min-h-screen bg-forest flex items-center justify-center text-center px-6 relative overflow-hidden">
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="hero-noise"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="linearRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.65 0.65"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: "url(#hero-noise)",
          opacity: 0.055,
          mixBlendMode: "soft-light",
        }}
      />

      <div className="max-w-3xl relative z-10 hero-parallax">
        <p
          className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", willChange: "opacity, transform" }}
        >
          {tagline}
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold text-beige leading-tight mb-6 animate-fade-up"
          style={{ animationDelay: "0.35s", willChange: "opacity, transform" }}
        >
          Stackup Studio
        </h1>
        <p
          className="text-xl md:text-2xl text-beige/70 mb-10 font-light animate-fade-up"
          style={{ animationDelay: "0.65s", willChange: "opacity, transform" }}
        >
          {subtitle}
        </p>
        <a
          href="#reference"
          className="inline-block bg-gold text-forest font-semibold px-8 py-4 rounded-full text-base hover:bg-gold-light hover:scale-[1.03] active:scale-[0.98] transition-[transform,background-color] duration-150 ease-smooth animate-fade-up"
          style={{ animationDelay: "0.95s", willChange: "opacity, transform" }}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Nahraď components/Hero.tsx server komponentou**

```tsx
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { HeroClient } from './HeroClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Hero() {
  const hero = await reader.singletons.hero.read();
  return (
    <HeroClient
      tagline={hero?.tagline ?? 'Webové stránky na míru'}
      subtitle={hero?.subtitle ?? 'Weby, které fungují. Bez agentury.'}
      ctaText={hero?.ctaText ?? 'Zobrazit reference'}
    />
  );
}
```

- [ ] **Step 5: Ověř build**

```bash
cd ~/claude-projekty/projekty/stackup-studio-nextjs && npm run build 2>&1 | tail -20
```

Očekávaný výstup: `✓ Compiled successfully` bez chyb. Pokud jsou TypeScript chyby, oprav je.

- [ ] **Step 6: Commit**

```bash
cd ~/claude-projekty/projekty/stackup-studio-nextjs && git add keystatic.config.ts content/hero/index.yaml components/Hero.tsx components/HeroClient.tsx && git commit -m "Hero sekce přesunuta do Keystatic"
```

---

### Task 2: About — Keystatic singleton + server/client split

**Files:**
- Create: `content/about/index.yaml`
- Create: `components/AboutClient.tsx`
- Replace: `components/About.tsx`

*(keystatic.config.ts je již aktualizovaný z Task 1)*

- [ ] **Step 1: Vytvoř content/about/index.yaml**

```yaml
bio1: >-
  Pomáhám podnikatelům a lokálním firmám získat web, který skutečně funguje.
  Žádná velká agentura, žádné zbytečné čekání. Jen rychlý, moderní web
  navržený přesně pro vaše potřeby.
bio2: >-
  Specializuji se na weby s chytrými funkcemi – rezervační systémy,
  správa obsahu bez programátora a další řešení na míru, která
  šetří váš čas a zlepšují zákaznickou zkušenost.
```

- [ ] **Step 2: Vytvoř components/AboutClient.tsx**

```tsx
"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

interface AboutClientProps {
  bio1: string;
  bio2: string;
}

export function AboutClient({ bio1, bio2 }: AboutClientProps) {
  const { ref, inView } = useInView();

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
    <section id="o-mne" className="py-24 bg-beige px-6 section-enter">
      <div ref={ref} className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div
          className={`shrink-0 w-48 h-48 rounded-full border-2 border-gold overflow-hidden ${reveal(0).className}`}
          style={reveal(0).style}
        >
          <Image
            src="/IMG_3853.webp"
            alt="Filip Šidák"
            width={192}
            height={192}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>

        <div className={reveal(150).className} style={reveal(150).style}>
          <p className="text-forest text-sm font-medium tracking-[0.2em] uppercase mb-3">
            O mně
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-5">
            Filip Šidák
          </h2>
          <p className="text-forest/70 text-lg leading-relaxed mb-4">
            {bio1}
          </p>
          <p className="text-forest/70 text-lg leading-relaxed">
            {bio2}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Nahraď components/About.tsx server komponentou**

```tsx
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { AboutClient } from './AboutClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function About() {
  const about = await reader.singletons.about.read();
  return (
    <AboutClient
      bio1={about?.bio1 ?? 'Pomáhám podnikatelům a lokálním firmám získat web, který skutečně funguje. Žádná velká agentura, žádné zbytečné čekání. Jen rychlý, moderní web navržený přesně pro vaše potřeby.'}
      bio2={about?.bio2 ?? 'Specializuji se na weby s chytrými funkcemi – rezervační systémy, správa obsahu bez programátora a další řešení na míru, která šetří váš čas a zlepšují zákaznickou zkušenost.'}
    />
  );
}
```

- [ ] **Step 4: Ověř build**

```bash
cd ~/claude-projekty/projekty/stackup-studio-nextjs && npm run build 2>&1 | tail -20
```

Očekávaný výstup: `✓ Compiled successfully` bez chyb.

- [ ] **Step 5: Commit**

```bash
cd ~/claude-projekty/projekty/stackup-studio-nextjs && git add content/about/index.yaml components/About.tsx components/AboutClient.tsx && git commit -m "About sekce přesunuta do Keystatic"
```

---

### Task 3: Contact — Keystatic singleton + server/client split

**Files:**
- Create: `content/contact-info/index.yaml`
- Create: `components/ContactClient.tsx`
- Replace: `components/Contact.tsx`

*(keystatic.config.ts je již aktualizovaný z Task 1)*

- [ ] **Step 1: Vytvoř content/contact-info/index.yaml**

```yaml
email: filip@stackupstudio.cz
linkedinUrl: https://linkedin.com/in/filipsidak
linkedinLabel: linkedin.com/in/filipsidak
```

- [ ] **Step 2: Vytvoř components/ContactClient.tsx**

```tsx
"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import Footer from "@/components/Footer";

interface ContactClientProps {
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
```

- [ ] **Step 3: Nahraď components/Contact.tsx server komponentou**

```tsx
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { ContactClient } from './ContactClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Contact() {
  const contactInfo = await reader.singletons.contactInfo.read();
  return (
    <ContactClient
      email={contactInfo?.email ?? 'filip@stackupstudio.cz'}
      linkedinUrl={contactInfo?.linkedinUrl ?? 'https://linkedin.com/in/filipsidak'}
      linkedinLabel={contactInfo?.linkedinLabel ?? 'linkedin.com/in/filipsidak'}
    />
  );
}
```

- [ ] **Step 4: Ověř build**

```bash
cd ~/claude-projekty/projekty/stackup-studio-nextjs && npm run build 2>&1 | tail -20
```

Očekávaný výstup: `✓ Compiled successfully` bez chyb.

- [ ] **Step 5: Commit**

```bash
cd ~/claude-projekty/projekty/stackup-studio-nextjs && git add content/contact-info/index.yaml components/Contact.tsx components/ContactClient.tsx && git commit -m "Contact sekce přesunuta do Keystatic" && git push
```

---

### Task 4: Ověření v Keystatic admin UI

**Files:** žádné

- [ ] **Step 1: Otevři Keystatic admin**

Přejdi na https://stackupstudio.cz/keystatic po deployi (Vercel deployuje automaticky po push z Task 3).

- [ ] **Step 2: Zkontroluj přítomnost nových singletons**

V levém menu musí být viditelné:
- Hero sekce
- O mně
- Kontaktní údaje
- Ceník (existující)

- [ ] **Step 3: Ověř editaci Hero**

Klikni na "Hero sekce" → uprav Tagline na "Test tagline" → ulož. Zkontroluj na stackupstudio.cz, že se změna projevila (Vercel deployuje po commitu do main).

- [ ] **Step 4: Vrať tagline zpět**

Tagline vrať na "Webové stránky na míru" → ulož.
