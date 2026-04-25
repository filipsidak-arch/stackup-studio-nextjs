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
