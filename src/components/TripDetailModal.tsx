import { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Language, TripItem, UI_COPY } from '../data/tripsData';
import { SafeImage } from './SafeImage';

interface TripDetailModalProps {
  trip: TripItem | null;
  lang: Language;
  onClose: () => void;
  onInquire: (tripId: string) => void;
}

export function TripDetailModal({ trip, lang, onClose, onInquire }: TripDetailModalProps) {
  useEffect(() => {
    if (!trip) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [trip, onClose]);

  if (!trip) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trip-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-[12px] overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-60 sm:h-72 w-full">
          <SafeImage
            src={trip.image}
            alt={trip.imageAlt}
            fallbackLabel={trip.title[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close trip details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="text-xs sm:text-sm text-white/85 font-medium mb-1">
              <span>{trip.region[lang]}</span>
              <span aria-hidden="true"> · </span>
              <span>{trip.duration[lang]}</span>
              <span aria-hidden="true"> · </span>
              <span>{trip.difficulty[lang]}</span>
            </div>
            <h3 id="trip-modal-title" className="font-display text-2xl sm:text-3xl font-bold">
              {trip.title[lang]}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-[#1f2937] text-base leading-relaxed">{trip.summary[lang]}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-black/10 text-sm">
            <div>
              <div className="text-gray-500 text-xs mb-0.5">
                {lang === 'ne' ? 'अवधि (Duration)' : 'Duration'}
              </div>
              <div className="font-semibold text-[#1f2937] tabular-nums">{trip.duration[lang]}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-0.5">
                {lang === 'ne' ? 'उचाइ (Max Elevation)' : 'Max Elevation'}
              </div>
              <div className="font-semibold text-[#1f2937] tabular-nums">{trip.maxElevation}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-0.5">
                {lang === 'ne' ? 'उपयुक्त समय (Season)' : 'Best Season'}
              </div>
              <div className="font-semibold text-[#1f2937]">{trip.bestSeason[lang]}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-display font-bold text-[#14532d] text-base mb-3">
                {lang === 'ne' ? 'मुख्य आकर्षणहरू' : 'Trip Highlights'}
              </h4>
              <ul className="space-y-2 text-sm text-[#1f2937]">
                {trip.highlights[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#f97316] font-bold mt-0.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-[#14532d] text-base mb-3">
                {lang === 'ne' ? 'सेवा समावेश' : 'Guide & Support'}
              </h4>
              <ul className="space-y-2 text-sm text-[#1f2937]">
                {trip.included[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <Check className="w-4 h-4 text-[#14532d] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[6px] border border-black/15 text-sm font-semibold text-[#1f2937] hover:bg-[#f4f7f5] transition-colors cursor-pointer"
            >
              {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
            <button
              type="button"
              onClick={() => onInquire(trip.id)}
              className="px-6 py-2.5 rounded-[6px] bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              {UI_COPY.tripsSection.inquireBtn[lang]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
