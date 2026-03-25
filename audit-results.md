# Audit Report — Stackup Studio Next.js

_Datum auditu: 25. března 2026_

## Anti-Patterns Verdict: PASS — Nevypadá to AI-generovaně

Paleta forest green + gold + beige je neobvyklá a záměrná. Žádné gradientové texty, glassmorphismus, hero metriky, neon ani fialová. Design má osobitost. Jeden warn: subtilní grid pattern v Heru (`rgba(255,255,255,0.03)`) je na hraně „texture pro texturu" — je tak jemný, že přidává komplexitu bez viditelného přínosu.

---

## Executive Summary

| Závažnost | Počet |
|-----------|-------|
| Critical  | 1     |
| High      | 3     |
| Medium    | 4     |
| Low       | 4     |
| **Celkem** | **12** |

**Top 3 kritické body:**
1. Mobilní navigace zcela chybí — uživatel na telefonu nemá jak procházet web
2. `<img>` místo `<Image>` — způsobuje layout shift a blokuje výkon
3. Gold labely selhávají v kontrastu na světlých pozadích

---

## Detailní nálezy

### Critical

**C-01 — Chybí mobilní navigace**
- **Soubor:** `components/Navbar.tsx:8`
- **Kategorie:** Responsive / Accessibility
- **Popis:** `hidden md:flex` skrývá všechny nav odkazy pod 768px bez jakékoliv alternativy. Na mobilu vidí uživatel pouze logo. Žádný hamburger menu neexistuje.
- **Dopad:** Mobilní uživatelé (hlavní cílová skupina — lokální firmy na telefonu) nemají žádný způsob navigace mimo ruční scrollování. Návštěvníci nemohou přeskočit na Ceník nebo Kontakt přímo.
- **Doporučení:** Přidat hamburger menu s `useState` pro open/close, overlay nebo slide-in s kotvicovými odkazemi. Tlačítko musí mít `aria-label="Otevřít menu"` a `aria-expanded`.
- **Skill:** `/adapt`

---

### High

**H-01 — `<img>` místo `next/image`**
- **Soubory:** `components/About.tsx:7`, `components/References.tsx:31`
- **Kategorie:** Performance
- **Popis:** Obě fotky (profilová fotka, screenshot CQB HELL) používají HTML `<img>` bez `width`/`height` atributů a bez `loading="lazy"`.
- **Dopad:** Chybějící rozměry způsobují **Cumulative Layout Shift (CLS)** — stránka se přeskupuje při načítání. Obraz se načítá vždy, i když je pod fold. Chybí automatická optimalizace (responsive srcset, blur placeholder). Next.js `<Image>` by vše vyřešil automaticky.
- **Standard:** Core Web Vitals — CLS
- **Doporučení:** Nahradit `<img>` za `import Image from "next/image"`, přidat `fill` nebo explicitní `width`/`height`, pro profilovou fotku `priority={false}`, pro hero screenshot zvážit `priority={true}` pokud je nad foldem.
- **Skill:** `/optimize`

---

**H-02 — Gold labely selhávají v kontrastu na světlých pozadích**
- **Soubory:** `components/About.tsx:17`, `components/Contact.tsx:40`, `components/References.tsx:18`, `app/gdpr/page.tsx:13`
- **Kategorie:** Accessibility
- **WCAG:** 1.4.3 Contrast (Minimum) — Level AA
- **Popis:** Zlaté overline labely (`text-[#c9a84c]`) na beige (`#f5f0e8`) mají kontrast ~**2.1:1**. Na beige-dark (`#ebe4d6`) v sekci Reference je to ~**1.9:1**. Požadované minimum pro malý text je **4.5:1**.
- **Dopad:** Labely jako „O mně", „Reference", „Kontakt", „Právní informace" jsou pro uživatele se zhoršeným zrakem nečitelné nebo velmi obtížně čitelné.
- **Poznámka:** Gold na forest greenu (`#1a3a2a`) má kontrast ~5.8:1 — tam je vše v pořádku ✓
- **Doporučení:** Na světlých sekcích buď ztmavit gold (např. `#8B6914` splňuje kontrast na beige), nebo změnit labely na forest green `#1a3a2a` a vyhradit zlatou pouze pro tmavá pozadí.
- **Skill:** `/normalize`

---

**H-03 — Placeholder testimonial na produkčním webu**
- **Soubor:** `components/References.tsx:158`
- **Kategorie:** Content / UX
- **Popis:** `"Citát klienta bude doplněn."` je viditelný každému návštěvníkovi webu.
- **Dopad:** Podkopává důvěryhodnost — prezentace Filipovy práce klientovi nebo potenciálnímu zákazníkovi narazí na nedokončenou sekci. Brand je „výsledkový", ale sekce výsledků vypadá nedokončeně.
- **Doporučení:** Buď získat skutečný citát, nebo celou sekci recenze dočasně odstranit do doby, než citát existuje.
- **Skill:** `/harden`

---

### Medium

**M-01 — Všechny barvy jsou hard-coded místo design tokenů**
- **Soubory:** Všechny komponenty — 40+ výskytů `#1a3a2a`, `#c9a84c`, `#f5f0e8` atd.
- **Kategorie:** Theming
- **Popis:** `globals.css` definuje tokeny `--color-forest`, `--color-gold`, `--color-beige` atd., ale žádná komponenta je nepoužívá. Místo `bg-forest` se používá `bg-[#1a3a2a]`.
- **Dopad:** Jakákoliv budoucí změna palety vyžaduje ruční find-replace napříč všemi soubory. Syntaxe `bg-[#1a3a2a]` není prohledávatelná ani sémanticky čitelná.
- **Doporučení:** V Tailwind v4 s `@theme inline` stačí nahradit arbitrary hodnoty třídami jako `bg-forest`, `text-gold`, `bg-beige`.
- **Skill:** `/normalize`

---

**M-02 — Chybí Open Graph / social metadata**
- **Soubor:** `app/layout.tsx:10`
- **Kategorie:** SEO / Sharing
- **Popis:** Metadata obsahují pouze `title` a `description`. Chybí `og:image`, `og:type`, `og:url`, `twitter:card`.
- **Dopad:** Při sdílení odkazu na LinkedIn nebo Facebooku se zobrazí generické náhledy bez obrázku — ztrácí se první dojem v momentě, kdy si někdo web posílá dál jako doporučení.
- **Doporučení:** Přidat do `layout.tsx` blok `openGraph` a `twitter` v Next.js Metadata API, vytvořit statický `og-image.png` (1200×630px) s logem a tagline.
- **Skill:** `/harden`

---

**M-03 — Chybí skip navigation link**
- **Soubor:** `app/page.tsx`
- **Kategorie:** Accessibility
- **WCAG:** 2.4.1 Bypass Blocks — Level A
- **Popis:** Není žádný „Přejít na obsah" odkaz pro klávesnicové a screenreader uživatele.
- **Dopad:** Klávesnicový uživatel musí projít celou navigací při každém načtení stránky.
- **Doporučení:** Přidat `<a href="#main-content" className="sr-only focus:not-sr-only ...">Přejít na hlavní obsah</a>` jako první element v `<body>` a `id="main-content"` na `<main>`.
- **Skill:** `/harden`

---

**M-04 — Kontaktní formulář: chybí live region pro stavové zprávy**
- **Soubor:** `components/Contact.tsx:89`
- **Kategorie:** Accessibility
- **WCAG:** 4.1.3 Status Messages — Level AA
- **Popis:** Po úspěšném odeslání formuláře se zobrazí success stav, ale bez `aria-live="polite"` ho screen readery neohlásí.
- **Dopad:** Uživatelé se screenreaderem nevědí, zda se formulář odeslal.
- **Doporučení:** Přidat `aria-live="polite"` na wrapper okolo podmíněně renderovaného stavu (sent/error).
- **Skill:** `/harden`

---

### Low

**L-01 — Favicon soubory z Next.js scaffoldu v `/public`**
- **Soubory:** `public/file.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`, `public/globe.svg`
- **Kategorie:** Cleanup
- **Popis:** Defaultní SVG assety z `create-next-app` jsou stále v `/public` a nikde nejsou použity.
- **Dopad:** Zvyšují velikost buildu, matou orientaci v projektu.
- **Doporučení:** Smazat nevyužité soubory.

---

**L-02 — Chyba formuláře používá `text-red-600` mimo design systém**
- **Soubor:** `components/Contact.tsx:143`
- **Kategorie:** Theming
- **Popis:** `text-red-600` je jediná barva mimo zavedený design systém.
- **Dopad:** Minimální vizuální — ale při budoucí normalizaci tokenů bude výjimka.
- **Doporučení:** Definovat `--color-error` token v `globals.css`.

---

**L-03 — Footer je součástí komponenty Contact**
- **Soubor:** `components/Contact.tsx:157`
- **Kategorie:** Architektura
- **Popis:** Footer (copyright, GDPR odkaz) je uvnitř sekce Contact, ne jako samostatná komponenta.
- **Dopad:** Footer se nezobrazuje na stránce `/gdpr`. Pokud přibyde více stránek, bude nutné footer duplikovat nebo refaktorovat.
- **Doporučení:** Přesunout footer do `app/layout.tsx` nebo samostatné `components/Footer.tsx`.

---

**L-04 — Navbar nemá active stav na podstránce GDPR**
- **Soubor:** `components/Navbar.tsx`
- **Kategorie:** UX
- **Popis:** Na `/gdpr` stránce vypadají všechny nav položky stejně bez indikace aktuální stránky.
- **Dopad:** Drobná dezorientace — GDPR stránka je nicméně okrajová.
- **Doporučení:** Použít `usePathname()` z `next/navigation` pro podmíněné stylování.

---

## Systémové vzorce

- **Hard-coded barvy v 40+ místech** — systémový problém, vyřeší `/normalize` jednou ranou
- **Plain `<img>` pattern** — 2 komponenty, potenciálně přibyde s dalšími referencemi → zavést pravidlo: vždy `next/image`
- **Chybějící ARIA live regions** — žádné dynamické stavové změny nejsou oznamovány screenreaderům

---

## Pozitivní nálezy

- `lang="cs"` správně nastaven na `<html>` ✓
- `antialiased` a `latin-ext` subset fontu ✓
- `smooth scroll` v globals.css ✓
- Responzivní tabulka v References (desktop tabulka + mobilní karty) ✓
- Formulář má HTML `required` atributy a `disabled` při odesílání ✓
- Gold na forest greenu (`#1a3a2a`) splňuje kontrast 5.8:1 ✓
- Alternující rytmus dark/light sekcí ✓
- CTA tlačítka mají dostatečnou velikost touch targetu ✓
- Metadata titulky jsou popisné a obsahují klíčová slova ✓

---

## Akční plán

### Ihned (blokuje produkci)
1. **Mobilní navigace** — hamburger menu → `/adapt`

### Krátký horizont (tento týden)
2. **Smazat placeholder testimonial** nebo doplnit reálný citát → manuálně
3. **`<img>` → `<Image>`** — dvě místa → `/optimize`
4. **Gold kontrast na světlých pozadích** → `/normalize`

### Střední horizont
5. **Normalizace barevných tokenů** — `bg-[#1a3a2a]` → `bg-forest` → `/normalize`
6. **Open Graph metadata** — ogImage + Twitter card → `/harden`
7. **ARIA live region** pro formulář → `/harden`
8. **Skip link** → `/harden`

### Dlouhý horizont
9. Footer jako standalone komponenta → manuálně
10. Cleanup `/public` scaffolding souborů → manuálně

---

## Navrhované příkazy

| Příkaz | Řeší |
|--------|------|
| `/adapt` | C-01 — mobilní navigace |
| `/optimize` | H-01 — `<img>` → `<Image>`, performance |
| `/normalize` | H-02, M-01 — kontrast, design tokeny |
| `/harden` | M-02, M-03, M-04 — OG metadata, skip link, ARIA live |
