# Stackup Studio — Projektové poznámky

_Tento soubor je pouze pro lokální použití. Není součástí gitu._

## Rozhodnutí a kontext

### Ceník (duben 2026)
- Pro tier zdražen z 19 000 na 22 000 Kč — snazší jít dolů než nahoru
- GA4 vyřazen z ceníku — pro cílový segment overkill, řešit ad hoc
- Features zobecněny — žádné konkrétní nástroje (CMS, Keystatic) neuvedeny

### Keystatic CMS (duben 2026)
- Nainstalován local mode — funguje na localhost:3000/keystatic
- GitHub mode zatím nenastavený — nutné pro editaci na produkci
- References jako Collection, Pricing jako Singleton
- Data v content/ složce jako YAML soubory

### Reference — CQB HELL
- Klient: Jakub (kamarád z airsoftu) — nepaid projekt, slouží jako reference
- Citát varianta 2 — vybrán Jakubem
- Web: cqbhell.cz

## Technické poznámky

- iOS Safari: testovat vždy na produkčním buildu (npm run build && npm run start)
- TypeScript Set iteration: použít Array.from() místo spread
- Po změnách: rm -rf .next && npm run dev pokud jsou problémy s cache

## TODO

- [ ] Keystatic GitHub mode
- [x] Open Graph metadata — přidáno do layout.tsx, og-image.png (1200×630) v /public
- [x] Footer jako standalone komponenta — přesunuto do components/Footer.tsx, Contact.tsx ho importuje
