# Claude Code – Konfigurace pro Filipa

## O uživateli
- Jméno: Filip
- Role: Akviziční obchodník a konzultant v IT firmě zaměřené na vývoj softwaru na míru
- Používá Claude Code k automatizaci obchodních úkolů a osobních projektů

## Jazyk
Vždy odpovídej **česky**, pokud Filip výslovně nepožádá o jiný jazyk.

## Formáty souborů
Primárně pracujeme s:
- Dokumenty Word (.docx)
- PDF soubory (.pdf)
- Excel tabulky (.xlsx, .csv)

## Struktura výstupů
Výstupy vždy ukládej do příslušné složky podle typu:

| Typ výstupu | Složka |
|---|---|
| Dokumenty (Word, PDF, Excel, texty) | `/dokumenty` |
| Skripty (Python, Bash, JS, atd.) | `/skripty` |
| Projekty (větší celky, aplikace) | `/projekty` |

## Projekty

### Stackup Studio Next.js (`/projekty/stackup-studio-nextjs`) — aktivní
Portfolio web pro službu tvorby webů na míru. Postavený od nuly.

- **Doména:** stackupstudio.cz (registrováno přes Czechia.com)
- **Technologie:** Next.js, Tailwind CSS v4, TypeScript
- **Hosting:** Vercel
- **GitHub:** filipsidak-arch/stackup-studio-nextjs
- **Kontaktní formulář:** Formspree — https://formspree.io/f/xzdjgngl
- **GDPR stránka:** `/gdpr` (`app/gdpr/page.tsx`)

#### Struktura komponent (`/components`)
| Soubor | Popis |
|---|---|
| `Navbar.tsx` | Navigační lišta (fixed, logo + odkazy) |
| `Hero.tsx` | Úvodní sekce |
| `About.tsx` | O mně — foto + text |
| `References.tsx` | Reference — case study CQB HELL |
| `Pricing.tsx` | Ceník — tři karty |
| `Contact.tsx` | Kontaktní formulář + patička |

#### Assety (`/public`)
- `IMG_3853.webp` — profilová fotka Filipa (použita v About.tsx)
- `cqbhell-preview.webp` — screenshot webu CQB HELL (použit v References.tsx)

### Stackup Studio Lovable (`/projekty/stackup-studio`) — neaktivní
Původní verze webu vygenerovaná v Lovable.

- **GitHub:** filipsidak-arch/stackup-studio-showcase
- **Původ kódu:** Lovable → export na GitHub, React + Vite
- **Poznámka:** Repozitář zůstává na GitHubu, ale web již není aktivní. Nahrazen Next.js verzí.

---

## Projekt: Western Doly – Hill Valley City

**Status:** V produkci na western-doly.vercel.app
**GitHub:** github.com/filipsidak-arch/western-doly (private)
**Stack:** Next.js 15 + TypeScript + Tailwind CSS
**Pracovní složka:** ~/claude-projekty/projekty/western-doly

### Co je hotovo
- Kompletní single-page web (Hero, O místě, Aktivity, Galerie, Ubytování, Kontakt, Footer)
- Galerie s carouselem a lightboxem (13 fotek areálu)
- Ubytování — dvě karty (Taverna + Doctor) s modal overlayem, carouselem fotek a lightboxem
- Samostatná stránka /okoli s 19 tipy na výlety, každé místo má carousel + lightbox
- Google Maps embed na přesné GPS souřadnice (49.865639, 16.058111)
- iOS Safari touch fixy (production build funguje, dev server má problémy s touch eventy)
- Favicon — podkova (provizorní)
- Deploy na Vercel: western-doly.vercel.app

### Co zbývá
- Formspree napojení (až se klient rozhodne)
- Ověřit správné tel. číslo: starý web má 728 822 337, Google Maps má 731 334 227
- Opravit cursor: pointer na html/body (globals.css) — debug pozůstatek
- Optimalizace obrázků (odstranit unoptimized prop)
- Případně napojit na doménu westerndoly.cz

### Klíčové poznatky a řešené problémy

**iOS Safari touch eventy nefungují na dev serveru**
- Symptom: onClick, hamburger menu, carousel swipe, modal karty — nic nereaguje na iPhonu
- Příčina: Next.js dev server má jiné chování React hydration než production build
- Řešení: Vždy testovat mobilní touch eventy přes `npm run build && npm run start`, ne přes `npm run dev`
- Na production buildu vše funguje správně

**iOS Safari — div elementy nereagují na touch**
- Symptom: klikatelné div elementy nefungují na iOS
- Řešení: Použít nativní `<button>` element místo `<div role="button">`, přidat `style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}`

**iOS Safari — text se označuje místo klikání**
- Symptom: long press označí text místo spuštění onClick
- Řešení: Přidat `WebkitUserSelect: "none", userSelect: "none"` na interaktivní elementy + globálně v globals.css: `* { -webkit-tap-highlight-color: transparent; }` a `button { -webkit-user-select: none; user-select: none; touch-action: manipulation; }`

**Carousel swipe nefunguje na iOS**
- Řešení: `touchStartX` musí být `useRef<number>(0)` (ne useState, ne null), práh snížit na 30px místo 50px, přidat `style={{ touchAction: "pan-y", userSelect: "none" }}` na carousel wrapper

**Modal se ořezává na iOS Safari (safe area)**
- Symptom: obsah modalu je skrytý za notchem nebo spodní lištou Safari
- Řešení: Na modal kontejner přidat `style={{ marginTop: 'calc(env(safe-area-inset-top) + 4rem)', marginBottom: 'env(safe-area-inset-bottom)' }}`, na scrollovatelný obsah `max-height: calc(100dvh - 10rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))`

**Karta se otevře při scrollování (false click)**
- Symptom: po scrollu prst sundáš z karty a modal se otevře
- Řešení: Detekovat scroll vs klik pomocí touchStartY.current — pokud `Math.abs(touchEndY - touchStartY) > 10`, ignoruj onTouchEnd jako klik

**Přejmenování fotek s diakritikou na Macu**
- Problem: `iconv -f UTF-8 -t ASCII//TRANSLIT` na macOS špatně překládá české znaky
- Řešení: Použít Python: `unicodedata.normalize('NFD', text)` + filtrovat kategorie 'Mn'

**NVM na Macu — npm not found v novém terminálu**
- Každý nový terminal tab vyžaduje: `source ~/.zprofile && export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"`
- Pro dev server dostupný v síti (mobilní testování): `npm run dev -- -H 0.0.0.0`
- IP adresa Macu: `ipconfig getifaddr en0`

**createPortal způsobuje problémy s touch eventy na iOS**
- Symptom: modaly renderované přes createPortal do document.body nereagují na touch
- Řešení: Odstranit createPortal, renderovat modal přímo v React stromu komponenty

---

## Projekt

**Stackup Studio** — portfolio web Filipa Šidáka (webdesign freelancer)
- URL: stackupstudio.cz
- GitHub: filipsidak-arch/stackup-studio-nextjs (private)
- Hosting: Vercel (auto-deploy při git push)

## Tech Stack

- Next.js 16.2.0, TypeScript, Tailwind CSS, App Router
- Keystatic CMS (@keystatic/core, @keystatic/next) — local mode
- Formspree pro kontaktní formulář (endpoint: https://formspree.io/f/xzdjgngl)
- Node.js v24.14.0, NVM

## Struktura projektu

app/
  layout.tsx — metadata, Inter font
  page.tsx — hlavní stránka
  globals.css — design tokeny, animace, keyframes
  icon.svg — favicona (zlaté S na zeleném pozadí)
  gdpr/page.tsx — GDPR stránka
  keystatic/ — Keystatic admin UI
  api/keystatic/ — Keystatic API routes

components/
  Navbar.tsx — navigace + hamburger menu
  Hero.tsx — "use client", SVG noise, scroll parallax
  About.tsx — profilová fotka (next/image)
  References.tsx — server komponenta, čte z Keystatic
  ReferencesClient.tsx — client komponenta s animacemi
  Pricing.tsx — server komponenta, čte z Keystatic
  PricingClient.tsx — client komponenta s animacemi
  Contact.tsx — Formspree formulář + footer

hooks/
  useInView.ts — IntersectionObserver pro scroll animace

content/
  references/cqb-hell.yaml — CQB HELL reference (Keystatic)
  pricing/index.yaml — ceny ceníku (Keystatic)

public/
  IMG_3853.webp — profilová fotka (object-position: center 20%)
  cqbhell-preview.webp — screenshot CQB HELL (object-position: center 15%)

## Keystatic CMS

Admin UI: localhost:3000/keystatic (pouze local mode)
- Collection "references" — klientské reference (přidat novou = nový YAML soubor)
- Singleton "pricing" — ceny tierů

Config: keystatic.config.ts v rootu projektu

## Workflow

Každý nový terminál vyžaduje načtení NVM:
source ~/.zprofile && export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

Dev server: npm run dev
Build test: npm run build && npm run start
Git push: git add . && git commit -m "popis" && git push

## Klíčová rozhodnutí (neměnit bez důvodu)

- Barvy: forest green #1a3a2a, gold #c9a84c, beige #f5f0e8 — fixní
- Ceník: Starter 7 000 Kč / Standard 12 000 Kč / Pro 22 000 Kč / Správa 1 500 Kč
- References a Pricing jsou server komponenty — data z Keystatic Reader API
- Client komponenty mají "use client" + useInView hook pro animace
- Animace: fade-up 900ms, ease-gentle cubic-bezier(0.25, 0.1, 0.25, 1)
- Profilová fotka: object-position center 20%
- CQB HELL screenshot: prokliknutelný na cqbhell.cz, object-position center 15%

## Co zbývá dodělat

- Keystatic GitHub mode (pro editaci na produkci)
- Open Graph metadata (og:image, og:type, og:url, twitter:card)

---

## Git push

Po každém dokončeném tasku nebo feature se zeptej Filipa, jestli chce pushovat na git, a pokud ano, proveď push přímo přes Bash:

```
cd ~/claude-projekty/projekty/stackup-studio-nextjs && git add . && git commit -m "<popis změny>" && git push
```

Popis změny piš v češtině, stručně (max 1 věta).

## Projektová paměť

Po každé session nebo větší změně aktualizuj soubor _projekt-notes.md:
- Přidej rozhodnutí která jsme udělali a proč
- Aktualizuj TODO sekci (zaškrtni hotové, přidej nové)
- Zapiš technické problémy na které jsme narazili a jak jsme je vyřešili

Soubor _projekt-notes.md není součástí gitu — je to lokální paměť projektu.
