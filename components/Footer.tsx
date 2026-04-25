export default function Footer() {
  return (
    <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-forest/15 text-center text-sm text-forest/40">
      © {new Date().getFullYear()} Stackup Studio · Filip Šidák
      <span className="mx-2">·</span>
      <a href="/gdpr" className="hover:text-gold transition-colors duration-150">
        Zásady ochrany osobních údajů
      </a>
    </div>
  );
}
