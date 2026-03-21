export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a2a]/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="text-[#c9a84c] font-bold text-lg tracking-wide">
          Stackup Studio
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#f5f0e8]/80">
          <a href="#o-mne" className="hover:text-[#c9a84c] transition-colors">O mně</a>
          <a href="#reference" className="hover:text-[#c9a84c] transition-colors">Reference</a>
          <a href="#cenik" className="hover:text-[#c9a84c] transition-colors">Ceník</a>
          <a href="#kontakt" className="hover:text-[#c9a84c] transition-colors bg-[#c9a84c] text-[#1a3a2a] px-4 py-1.5 rounded-full font-medium">
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  );
}
