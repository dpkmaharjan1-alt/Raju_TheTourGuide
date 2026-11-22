import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Language, UI_COPY } from '../data/tripsData';

interface HeaderProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export function Header({ lang, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: UI_COPY.nav.home[lang] },
    { id: 'trips', label: UI_COPY.nav.trips[lang] },
    { id: 'itinerary', label: UI_COPY.nav.itinerary[lang] },
    { id: 'about', label: UI_COPY.nav.about[lang] },
    { id: 'gallery', label: UI_COPY.nav.gallery[lang] },
  ];

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1200px] mx-auto px-[5%] h-16 flex items-center justify-between gap-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-display text-[20px] sm:text-[22px] font-bold text-[#14532d] tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532d] rounded"
        >
          {UI_COPY.brand}
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className="text-[15px] font-bold text-[#1f2937] hover:text-[#14532d] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#f97316] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532d]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-[6px] bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-bold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532d]"
          >
            {UI_COPY.nav.contact[lang]}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-[6px] text-[#1f2937] hover:bg-[#f4f7f5] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#14532d]"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-[5%] py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className="py-2.5 px-2 text-base font-bold text-[#1f2937] hover:text-[#14532d] hover:bg-[#f4f7f5] rounded-[6px] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="mt-2 w-full py-3 px-4 rounded-[6px] bg-[#f97316] hover:bg-[#ea580c] text-white text-base font-bold transition-colors text-center cursor-pointer"
          >
            {UI_COPY.nav.contact[lang]}
          </button>
        </div>
      )}
    </header>
  );
}
