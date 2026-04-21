import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import { PricingClient } from './PricingClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Pricing() {
  const pricing = await reader.singletons.pricing.read();
  return (
    <PricingClient
      starterPrice={pricing?.starterPrice ?? 7000}
      standardPrice={pricing?.standardPrice ?? 12000}
      proPrice={pricing?.proPrice ?? 22000}
      maintenancePrice={pricing?.maintenancePrice ?? 1500}
    />
  );
}
