import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryPhoto, Language } from '../data/tripsData';
import { SafeImage } from './SafeImage';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  activeIndex: number | null;
  lang: Language;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function GalleryLightbox({
  photos,
  activeIndex,
  lang,
  onClose,
  onSelect,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelect((activeIndex + 1) % photos.length);
      if (e.key === 'ArrowLeft') onSelect((activeIndex - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, photos.length, onClose, onSelect]);

  if (activeIndex === null) return null;
  const current = photos[activeIndex];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={current.title[lang]}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery viewer"
          className="self-end mb-3 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full aspect-[16/10] bg-[#10261a] rounded-[10px] overflow-hidden shadow-2xl">
          <SafeImage
            src={current.src}
            alt={current.alt}
            fallbackLabel={current.title[lang]}
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={() => onSelect((activeIndex - 1 + photos.length) % photos.length)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => onSelect((activeIndex + 1) % photos.length)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-4 text-center text-white">
          <div className="font-display font-bold text-lg">{current.title[lang]}</div>
          <div className="text-sm text-white/75 mt-0.5 tabular-nums">
            {current.location[lang]} · {activeIndex + 1} / {photos.length}
          </div>
        </div>
      </div>
    </div>
  );
}
