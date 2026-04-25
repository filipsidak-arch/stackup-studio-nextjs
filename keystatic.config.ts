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
