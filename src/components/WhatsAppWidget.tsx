import { useState } from 'react';
import { Phone, X, Send, Check } from 'lucide-react';
import { Language } from '../data/tripsData';

interface WhatsAppWidgetProps {
  lang: Language;
  selectedTripName?: string;
}

export function WhatsAppWidget({ lang, selectedTripName }: WhatsAppWidgetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const defaultMessage = selectedTripName
    ? `Namaste! I want to inquire about ${selectedTripName} with Nepal Adventure Guide.`
    : 'Namaste! I want to book a Nepal trip with Nepal Adventure Guide.';

  const messageToSend = customMessage.trim() || defaultMessage;
  const whatsappUrl = `https://wa.me/9779841851742?text=${encodeURIComponent(messageToSend)}`;

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('+977-9841851742');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed right-[18px] bottom-[18px] z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[300px] sm:w-[320px] bg-white rounded-[12px] shadow-2xl border border-black/10 overflow-hidden"
          role="dialog"
          aria-label="WhatsApp quick message"
        >
          <div className="bg-[#14532d] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-display font-bold text-sm">Nepal Adventure Guide</div>
              <div className="text-xs text-white/80">+977-9841851742</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp popup"
              className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <label className="block text-xs font-medium text-gray-600" htmlFor="wa-quick-msg">
              {lang === 'ne' ? 'WhatsApp सन्देश लेख्नुहोस्:' : 'Quick message for WhatsApp:'}
            </label>
            <textarea
              id="wa-quick-msg"
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={defaultMessage}
              className="w-full rounded-[6px] border border-black/15 px-3 py-2 text-sm text-[#1f2937] focus:outline-2 focus:outline-[#14532d] resize-none"
            />
            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-[6px] bg-[#25D366] hover:bg-[#1ebe5a] text-white text-sm font-bold transition-colors"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{lang === 'ne' ? 'WhatsApp खोल्नुहोस्' : 'Open WhatsApp'}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="py-2.5 px-3 rounded-[6px] border border-black/15 hover:bg-[#f4f7f5] text-xs font-semibold text-[#1f2937] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-[#14532d]">
                    <Check className="w-3.5 h-3.5" />
                    {lang === 'ne' ? 'कपी भयो' : 'Copied'}
                  </span>
                ) : lang === 'ne' ? (
                  'नम्बर कपी'
                ) : (
                  'Copy No.'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="WhatsApp"
        aria-expanded={open}
        className="w-[56px] h-[56px] rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532d]"
      >
        {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
}
