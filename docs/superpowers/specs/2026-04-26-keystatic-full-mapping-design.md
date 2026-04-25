# Keystatic Full Content Mapping — Design Spec

## Goal

Přesunout veškerý editovatelný textový obsah webu do Keystatic CMS tak, aby Filip mohl upravovat obsah na stackupstudio.cz/keystatic bez zásahu do kódu.

## Scope

**Zahrnuto:**
- Hero sekce — nadpis, podtitulek, text CTA tlačítka
- About sekce — bio text
- Contact sekce — e-mail, LinkedIn URL a zobrazovaný text LinkedIn

**Nezahrnuto:**
- Profilová fotka (IMG_3853.webp) — není v Keystaticu, řeší se výměnou souboru
- Navigační odkazy (Navbar) — statické, mění se výjimečně
- Patička / Footer — statická, mění se výjimečně
- Formspree endpoint — konfigurační hodnota, ne obsah

## Architektura

Vzor odpovídá existující implementaci References a Pricing:

- Každá sekce dostane vlastní **singleton** v `keystatic.config.ts`
- Data jsou uložena jako **YAML soubory** v `content/`
- Komponenta se rozdělí na **server část** (čte Keystatic Reader API) a **client část** (animace, interaktivita)
- `page.tsx` se nemění — nadále importuje `Hero`, `About`, `Contact`

## Nové Keystatic singletons

### hero
Cesta: `content/hero/index.yaml`

| Pole | Label | Typ | Výchozí hodnota |
|---|---|---|---|
| `headline` | Nadpis | text | Weby, které fungují |
| `subtitle` | Podtitulek | text (multiline) | Profesionální webové stránky pro podnikatele a lokální firmy. Bez agentury, rychle a za férovou cenu. |
| `ctaText` | Text tlačítka | text | Nezávazná konzultace zdarma |

### about
Cesta: `content/about/index.yaml`

| Pole | Label | Typ | Výchozí hodnota |
|---|---|---|---|
| `bio` | Bio text | text (multiline) | (aktuální text z About.tsx) |

### contactInfo
Cesta: `content/contact-info/index.yaml`

| Pole | Label | Typ | Výchozí hodnota |
|---|---|---|---|
| `email` | E-mail | text | filip@stackupstudio.cz |
| `linkedinUrl` | LinkedIn URL | url | https://linkedin.com/in/filipsidak |
| `linkedinLabel` | LinkedIn zobrazovaný text | text | linkedin.com/in/filipsidak |

## Změny komponent

### Hero
- `Hero.tsx` (současný) → přejmenovat na `HeroClient.tsx`, přidat props interface pro `headline`, `subtitle`, `ctaText`
- Nový `Hero.tsx` → server komponenta, čte `hero` singleton z Keystatic, renderuje `<HeroClient />`

### About
- `About.tsx` (současný) → přejmenovat na `AboutClient.tsx`, přidat props interface pro `bio`
- Nový `About.tsx` → server komponenta, čte `about` singleton z Keystatic, renderuje `<AboutClient />`

### Contact
- `Contact.tsx` (současný) → přejmenovat na `ContactClient.tsx`, přidat props interface pro `email`, `linkedinUrl`, `linkedinLabel`
- Nový `Contact.tsx` → server komponenta, čte `contactInfo` singleton z Keystatic, renderuje `<ContactClient />`

## Soubory — přehled změn

| Akce | Soubor |
|---|---|
| Modify | `keystatic.config.ts` — přidat 3 singletons |
| Create | `content/hero/index.yaml` |
| Create | `content/about/index.yaml` |
| Create | `content/contact-info/index.yaml` |
| Rename + modify | `components/Hero.tsx` → `HeroClient.tsx` |
| Create | `components/Hero.tsx` (server) |
| Rename + modify | `components/About.tsx` → `AboutClient.tsx` |
| Create | `components/About.tsx` (server) |
| Rename + modify | `components/Contact.tsx` → `ContactClient.tsx` |
| Create | `components/Contact.tsx` (server) |

`page.tsx` — beze změny.

## Testování

Po implementaci:
1. Web vypadá identicky jako před změnou (obsah z YAML = původní hardcoded hodnoty)
2. Úprava pole v `content/hero/index.yaml` → změna se projeví na webu po rebuildu
3. Pole jsou viditelná a editovatelná v Keystatic admin UI na stackupstudio.cz/keystatic
