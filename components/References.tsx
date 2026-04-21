import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { ReferenceClient } from './ReferencesClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function References() {
  const refs = await reader.collections.references.all();
if (!refs.length) return null;
  const ref = refs[0];
  return (
    <ReferenceClient
      name={ref.entry.name}
      subtitle={ref.entry.subtitle ?? ''}
      websiteUrl={ref.entry.websiteUrl ?? ''}
      quote={ref.entry.quote ?? ''}
      quoteAuthor={ref.entry.quoteAuthor ?? ''}
      challenge={ref.entry.challenge ?? ''}
      solution={ref.entry.solution ?? ''}
      tags={[...(ref.entry.tags ?? [])]}
      beforeAfter={[...(ref.entry.beforeAfter ?? [])].map(item => ({ ...item }))}
    />
  );
}
