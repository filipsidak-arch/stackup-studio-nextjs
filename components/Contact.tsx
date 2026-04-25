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
