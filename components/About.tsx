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
