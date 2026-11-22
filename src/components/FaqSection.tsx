import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS, Language, UI_COPY } from '../data/tripsData';

interface FaqSectionProps {
  lang: Language;
  onAskQuestion: () => void;
}

export function FaqSection({ lang, onAskQuestion }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-[60px] px-[5%] max-w-[1200px] mx-auto">
      <div className="max-w-[850px] mx-auto">
        <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#14532d] text-center mb-2">
          {UI_COPY.faqSection.heading[lang]}
        </h2>
        <p className="text-center text-sm sm:text-base text-[#1f2937]/75 mb-8">
          {UI_COPY.faqSection.subtitle[lang]}
        </p>

        <div className="bg-[#f4f7f5] rounded-[12px] p-6 sm:p-7 divide-y divide-black/[0.06]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-4 text-left py-1.5 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#14532d] rounded"
                  >
                    <span className="font-display text-[15px] sm:text-base font-bold text-[#1f2937] group-hover:text-[#14532d] transition-colors">
                      {item.question[lang]}
                    </span>
                    <span className="shrink-0 text-[#14532d]">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#14532d]" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pt-2 pb-1 text-sm sm:text-[15px] text-[#1f2937]/85 leading-[1.7]"
                  >
                    <p>{item.answer[lang]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-[#1f2937]/80 mt-6">
          <span>{UI_COPY.faqSection.ctaPrompt[lang]}</span>{' '}
          <button
            type="button"
            onClick={onAskQuestion}
            className="font-bold text-[#14532d] hover:text-[#f97316] underline underline-offset-4 transition-colors cursor-pointer"
          >
            {UI_COPY.faqSection.ctaLink[lang]}
          </button>
        </p>
      </div>
    </section>
  );
}
