import { useState, FormEvent } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Mail, Phone, Globe } from 'lucide-react';
import {
  GALLERY_PHOTOS,
  HERO_IMAGE,
  ITINERARY_PLANS,
  Language,
  TRIPS,
  TripCategory,
  TripItem,
  UI_COPY,
} from './data/tripsData';
import { Header } from './components/Header';
import { SafeImage } from './components/SafeImage';
import { TripDetailModal } from './components/TripDetailModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { FaqSection } from './components/FaqSection';

interface InquiryFormState {
  name: string;
  email: string;
  phone: string;
  tripId: string;
  travelers: string;
  preferredDate: string;
  notes: string;
}

export default function App() {
  const [lang, setLang] = useState<Language>('ne');
  const [categoryFilter, setCategoryFilter] = useState<TripCategory>('all');
  const [selectedTripModal, setSelectedTripModal] = useState<TripItem | null>(null);
  const [activePlanId, setActivePlanId] = useState<string>(ITINERARY_PLANS[0].id);
  const [expandedDayIdx, setExpandedDayIdx] = useState<number | null>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [formState, setFormState] = useState<InquiryFormState>({
    name: '',
    email: '',
    phone: '',
    tripId: 'abc-trek',
    travelers: '2',
    preferredDate: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof InquiryFormState, string>>>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<InquiryFormState | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInquireForTrip = (tripId: string) => {
    setSelectedTripModal(null);
    setSubmittedInquiry(null);
    setFormState((prev) => ({
      ...prev,
      tripId,
    }));
    scrollToSection('contact');
  };

  const handleRequestCustomItinerary = () => {
    setSubmittedInquiry(null);
    setFormState((prev) => ({
      ...prev,
      tripId: 'custom',
      notes:
        prev.notes ||
        (lang === 'ne'
          ? 'मलाई मेरो समय र रुचिअनुसार custom itinerary चाहिएको छ।'
          : 'I would like a custom itinerary tailored to my dates and interests.'),
    }));
    scrollToSection('contact');
  };

  const filteredTrips =
    categoryFilter === 'all' ? TRIPS : TRIPS.filter((t) => t.category === categoryFilter);

  const activePlan = ITINERARY_PLANS.find((p) => p.id === activePlanId) || ITINERARY_PLANS[0];

  const selectedTripObj = TRIPS.find((t) => t.id === formState.tripId);
  const selectedTripDisplayName =
    formState.tripId === 'custom'
      ? lang === 'ne'
        ? 'Custom Itinerary'
        : 'Custom Itinerary'
      : selectedTripObj?.title[lang] || 'Nepal Trip';

  const whatsappDirectHref = `https://wa.me/9779841851742?text=${encodeURIComponent(
    `Namaste! I want to book a Nepal trip (${selectedTripDisplayName}).`
  )}`;

  const validateAndSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof InquiryFormState, string>> = {};

    if (!formState.name.trim()) {
      errors.name = lang === 'ne' ? 'कृपया आफ्नो नाम लेख्नुहोस्।' : 'Please enter your name.';
    }

    const emailTrimmed = formState.email.trim();
    const phoneTrimmed = formState.phone.trim();

    if (!emailTrimmed && !phoneTrimmed) {
      errors.email =
        lang === 'ne'
          ? 'कृपया इमेल वा WhatsApp/फोन नम्बर दिनुहोस्।'
          : 'Please provide an email or WhatsApp/phone number.';
    } else if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errors.email =
        lang === 'ne' ? 'मान्य इमेल ठेगाना लेख्नुहोस्।' : 'Please enter a valid email address.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmittedInquiry({ ...formState });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f2937]">
      <Header lang={lang} onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-[470px] sm:min-h-[520px] flex items-center text-white overflow-hidden"
        >
          <SafeImage
            src={HERO_IMAGE}
            alt="Panoramic Himalayan mountain peaks in Nepal"
            fallbackLabel="Nepal Adventure Guide"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.62) 100%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[5%] py-16">
            <div className="max-w-2xl">
              <h1
                className="font-display font-bold text-white leading-[1.15] mb-3"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  textWrap: 'balance',
                }}
              >
                {UI_COPY.hero.title[lang]}
              </h1>
              <p className="text-base sm:text-lg text-white/95 mb-6 leading-relaxed">
                {UI_COPY.hero.subtitle[lang]}
              </p>
              <a
                href="#trips"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('trips');
                }}
                className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-bold px-[22px] py-[14px] rounded-[6px] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {UI_COPY.hero.cta[lang]}
              </a>
            </div>
          </div>
        </section>

        {/* Trips Section */}
        <section id="trips" className="py-[60px] px-[5%] max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#14532d] text-center mb-5">
              {UI_COPY.tripsSection.heading[lang]}
            </h2>

            <div className="w-full flex flex-wrap items-center justify-between gap-4">
              <div
                className="inline-flex items-center gap-1 p-1 bg-[#f4f7f5] rounded-[8px] border border-black/5"
                role="tablist"
                aria-label="Filter trips by category"
              >
                {(['all', 'trekking', 'cultural', 'sightseeing'] as TripCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={categoryFilter === cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-[6px] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-white text-[#14532d] shadow-sm'
                        : 'text-[#1f2937]/75 hover:text-[#14532d]'
                    }`}
                  >
                    {UI_COPY.tripsSection.filters[cat][lang]}
                  </button>
                ))}
              </div>

              <div
                className="inline-flex items-center gap-1 p-1 bg-[#f4f7f5] rounded-[8px] border border-black/5"
                role="group"
                aria-label="Language switch"
              >
                <Globe className="w-3.5 h-3.5 text-[#14532d] ml-2 mr-1" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setLang('ne')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[6px] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'ne'
                      ? 'bg-white text-[#14532d] shadow-sm'
                      : 'text-[#1f2937]/75 hover:text-[#14532d]'
                  }`}
                >
                  नेपाली
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[6px] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'en'
                      ? 'bg-white text-[#14532d] shadow-sm'
                      : 'text-[#1f2937]/75 hover:text-[#14532d]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {filteredTrips.map((trip) => (
              <article
                key={trip.id}
                className="bg-white rounded-[10px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
              >
                <button
                  type="button"
                  onClick={() => setSelectedTripModal(trip)}
                  className="block w-full h-[210px] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#14532d]"
                  aria-label={`View details for ${trip.title[lang]}`}
                >
                  <SafeImage
                    src={trip.image}
                    alt={trip.imageAlt}
                    fallbackLabel={trip.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                </button>
                <div className="p-[18px] flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-bold text-[#1f2937] mb-2">
                    {trip.title[lang]}
                  </h3>
                  <p className="text-sm text-[#1f2937] mb-2 leading-relaxed tabular-nums">
                    <strong>{UI_COPY.tripsSection.durationLabel[lang]}:</strong>{' '}
                    {trip.duration[lang]}
                    <br />
                    <strong>{UI_COPY.tripsSection.difficultyLabel[lang]}:</strong>{' '}
                    {trip.difficulty[lang]}
                  </p>
                  <p className="text-sm text-[#1f2937]/85 mb-4 leading-relaxed flex-1">
                    {trip.summary[lang]}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => handleInquireForTrip(trip.id)}
                      className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm px-[18px] py-[10px] rounded-[6px] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                    >
                      {UI_COPY.tripsSection.inquireBtn[lang]}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTripModal(trip)}
                      className="inline-block border border-black/15 hover:bg-[#f4f7f5] text-[#14532d] font-semibold text-sm px-4 py-[10px] rounded-[6px] transition-colors duration-150 whitespace-nowrap cursor-pointer"
                    >
                      {UI_COPY.tripsSection.detailsBtn[lang]}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Itinerary Section */}
        <section id="itinerary" className="py-[60px] px-[5%] max-w-[1200px] mx-auto">
          <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#14532d] text-center mb-6">
            {activePlan.tripTitle[lang]}
          </h2>

          <div className="flex justify-center mb-6">
            <div
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#f4f7f5] rounded-[8px] border border-black/5"
              role="tablist"
              aria-label="Choose itinerary plan"
            >
              {ITINERARY_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  role="tab"
                  aria-selected={activePlanId === plan.id}
                  onClick={() => {
                    setActivePlanId(plan.id);
                    setExpandedDayIdx(0);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-[6px] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    activePlanId === plan.id
                      ? 'bg-white text-[#14532d] shadow-sm'
                      : 'text-[#1f2937]/75 hover:text-[#14532d]'
                  }`}
                >
                  {plan.tripTitle[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#f4f7f5] rounded-[12px] p-6 sm:p-7 max-w-[850px] mx-auto divide-y divide-black/[0.06]">
            {activePlan.days.map((day, idx) => {
              const isOpen = expandedDayIdx === idx;
              return (
                <div key={idx} className="py-3 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setExpandedDayIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-1.5 cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#14532d] rounded"
                  >
                    <div className="text-[15px] sm:text-base text-[#1f2937]">
                      <strong className="text-[#14532d]">{day.dayLabel[lang]}:</strong>{' '}
                      <span className="group-hover:text-[#14532d] transition-colors">
                        {day.title[lang]}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline text-xs text-gray-500 tabular-nums">
                        {day.elevationOrRoute}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#14532d]" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pt-2 pb-1 text-sm text-[#1f2937]/85 leading-relaxed">
                      <div className="sm:hidden text-xs text-gray-500 mb-1 tabular-nums">
                        {day.elevationOrRoute}
                      </div>
                      <p>{day.details[lang]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleRequestCustomItinerary}
              className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-bold px-[22px] py-[14px] rounded-[6px] transition-colors duration-150 whitespace-nowrap cursor-pointer"
            >
              {UI_COPY.itinerarySection.cta[lang]}
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-[60px] px-[5%] max-w-[1200px] mx-auto">
          <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#14532d] text-center mb-6">
            {UI_COPY.aboutSection.heading[lang]}
          </h2>
          <p className="max-w-[800px] mx-auto text-center text-base leading-[1.7] text-[#1f2937]">
            {UI_COPY.aboutSection.body[lang]}
          </p>

          <div className="max-w-[850px] mx-auto mt-10 pt-8 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {UI_COPY.aboutSection.facts.map((fact, index) => (
              <div key={index}>
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  {fact.label[lang]}
                </div>
                <div className="text-sm font-bold text-[#14532d]">{fact.value[lang]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-[60px] px-[5%] max-w-[1200px] mx-auto">
          <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#14532d] text-center mb-8">
            {UI_COPY.gallerySection.heading[lang]}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[22px]">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative block rounded-[8px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532d] text-left"
                aria-label={`Open ${photo.title[lang]} in gallery`}
              >
                <SafeImage
                  src={photo.src}
                  alt={photo.alt}
                  fallbackLabel={photo.title[lang]}
                  className="w-full h-[220px] object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent text-white">
                  <div className="text-sm font-bold">{photo.title[lang]}</div>
                  <div className="text-xs text-white/80">{photo.location[lang]}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <FaqSection lang={lang} onAskQuestion={() => scrollToSection('contact')} />

        {/* Contact / Booking Section */}
        <section id="contact" className="py-[60px] px-[5%] bg-[#f4f7f5]">
          <div className="max-w-[850px] mx-auto">
            <h2 className="font-display text-2xl sm:text-[28px] font-bold text-[#14532d] text-center mb-8">
              {UI_COPY.contactSection.heading[lang]}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
              {/* Direct Contact Info Box */}
              <div className="md:col-span-2 bg-white rounded-[12px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)] space-y-4">
                <div className="space-y-3 text-sm text-[#1f2937]">
                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-0.5">
                      {UI_COPY.contactSection.phoneLabel[lang]}
                    </div>
                    <div className="font-bold flex items-center gap-2 tabular-nums">
                      <Phone className="w-4 h-4 text-[#14532d]" aria-hidden="true" />
                      <span>+977-9841851742</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-0.5">
                      {UI_COPY.contactSection.emailLabel[lang]}
                    </div>
                    <a
                      href="mailto:rajumaharjan@gmail.com"
                      className="font-bold text-[#14532d] hover:underline flex items-center gap-2 break-all"
                    >
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>rajumaharjan@gmail.com</span>
                    </a>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 font-medium mb-0.5">
                      {UI_COPY.contactSection.socialLabel[lang]}
                    </div>
                    <div className="font-semibold text-[#1f2937]">
                      {UI_COPY.contactSection.socialValue[lang]}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappDirectHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm px-4 py-3.5 rounded-[6px] transition-colors duration-150 text-center"
                  >
                    {UI_COPY.contactSection.whatsappBtn[lang]}
                  </a>
                </div>
              </div>

              {/* Interactive Inquiry / Booking Form */}
              <div className="md:col-span-3 bg-white rounded-[12px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                {submittedInquiry ? (
                  <div className="py-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-6 h-6 text-[#14532d] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display font-bold text-lg text-[#14532d]">
                          {lang === 'ne'
                            ? 'तपाईंको सोधपुछ प्राप्त भयो!'
                            : 'Inquiry Ready to Send!'}
                        </h3>
                        <p className="text-sm text-[#1f2937]/80 mt-1">
                          {lang === 'ne'
                            ? 'धन्यवाद! तलको विवरण सहित सिधै WhatsApp वा Email मार्फत पठाउन सक्नुहुन्छ।'
                            : 'Thank you! Your trip summary is confirmed below. You can also forward it directly via WhatsApp or email.'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#f4f7f5] rounded-[8px] p-4 text-sm space-y-1.5">
                      <div>
                        <strong>{lang === 'ne' ? 'नाम' : 'Name'}:</strong> {submittedInquiry.name}
                      </div>
                      <div>
                        <strong>{lang === 'ne' ? 'Trip' : 'Trip'}:</strong> {selectedTripDisplayName}
                      </div>
                      <div className="tabular-nums">
                        <strong>{lang === 'ne' ? 'समूह संख्या' : 'Travelers'}:</strong>{' '}
                        {submittedInquiry.travelers}
                      </div>
                      {submittedInquiry.preferredDate && (
                        <div className="tabular-nums">
                          <strong>{lang === 'ne' ? 'मिति' : 'Preferred Date'}:</strong>{' '}
                          {submittedInquiry.preferredDate}
                        </div>
                      )}
                      {submittedInquiry.notes && (
                        <div>
                          <strong>{lang === 'ne' ? 'सन्देश' : 'Notes'}:</strong>{' '}
                          {submittedInquiry.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`https://wa.me/9779841851742?text=${encodeURIComponent(
                          `Namaste! Name: ${submittedInquiry.name}, Trip: ${selectedTripDisplayName}, Travelers: ${submittedInquiry.travelers}${
                            submittedInquiry.preferredDate
                              ? `, Date: ${submittedInquiry.preferredDate}`
                              : ''
                          }${submittedInquiry.notes ? `, Notes: ${submittedInquiry.notes}` : ''}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold text-sm px-4 py-2.5 rounded-[6px] transition-colors"
                      >
                        {lang === 'ne' ? 'WhatsApp मा पठाउनुहोस्' : 'Send via WhatsApp'}
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmittedInquiry(null)}
                        className="px-4 py-2.5 rounded-[6px] border border-black/15 hover:bg-[#f4f7f5] text-sm font-semibold text-[#1f2937] transition-colors cursor-pointer"
                      >
                        {lang === 'ne' ? 'अर्को सोधपुछ पठाउनुहोस्' : 'Send Another Inquiry'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={validateAndSubmit} noValidate className="space-y-4">
                    <h3 className="font-display font-bold text-lg text-[#14532d]">
                      {UI_COPY.contactSection.formTitle[lang]}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inq-name"
                          className="block text-xs font-semibold text-[#1f2937] mb-1"
                        >
                          {lang === 'ne' ? 'पूरा नाम *' : 'Full Name *'}
                        </label>
                        <input
                          id="inq-name"
                          type="text"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder={lang === 'ne' ? 'तपाईंको नाम' : 'Your full name'}
                          className="w-full rounded-[6px] border border-black/15 px-3 py-2.5 text-sm focus:outline-2 focus:outline-[#14532d]"
                        />
                        {formErrors.name && (
                          <p className="text-xs text-red-700 mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="inq-email"
                          className="block text-xs font-semibold text-[#1f2937] mb-1"
                        >
                          {lang === 'ne' ? 'Email वा WhatsApp *' : 'Email *'}
                        </label>
                        <input
                          id="inq-email"
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, email: e.target.value }))
                          }
                          placeholder="you@example.com"
                          className="w-full rounded-[6px] border border-black/15 px-3 py-2.5 text-sm focus:outline-2 focus:outline-[#14532d]"
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-700 mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="inq-trip"
                          className="block text-xs font-semibold text-[#1f2937] mb-1"
                        >
                          {lang === 'ne' ? 'Trip छान्नुहोस्' : 'Select Trip'}
                        </label>
                        <select
                          id="inq-trip"
                          value={formState.tripId}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, tripId: e.target.value }))
                          }
                          className="w-full rounded-[6px] border border-black/15 px-3 py-2.5 text-sm bg-white focus:outline-2 focus:outline-[#14532d]"
                        >
                          {TRIPS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.title[lang]} ({t.duration[lang]})
                            </option>
                          ))}
                          <option value="custom">
                            {lang === 'ne'
                              ? 'Custom Itinerary (कस्टमाइज्ड यात्रा)'
                              : 'Custom Itinerary'}
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="inq-travelers"
                          className="block text-xs font-semibold text-[#1f2937] mb-1"
                        >
                          {lang === 'ne' ? 'यात्रु संख्या' : 'Travelers'}
                        </label>
                        <select
                          id="inq-travelers"
                          value={formState.travelers}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, travelers: e.target.value }))
                          }
                          className="w-full rounded-[6px] border border-black/15 px-3 py-2.5 text-sm bg-white tabular-nums focus:outline-2 focus:outline-[#14532d]"
                        >
                          <option value="1">1 (Solo / Private)</option>
                          <option value="2">2</option>
                          <option value="3-5">3–5</option>
                          <option value="6+">6+ (Group)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inq-phone"
                          className="block text-xs font-semibold text-[#1f2937] mb-1"
                        >
                          {lang === 'ne' ? 'Phone / WhatsApp (ऐच्छिक)' : 'Phone / WhatsApp'}
                        </label>
                        <input
                          id="inq-phone"
                          type="tel"
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="+977-98..."
                          className="w-full rounded-[6px] border border-black/15 px-3 py-2.5 text-sm focus:outline-2 focus:outline-[#14532d]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="inq-date"
                          className="block text-xs font-semibold text-[#1f2937] mb-1"
                        >
                          {lang === 'ne' ? 'अनुमानित यात्रा मिति' : 'Preferred Travel Date'}
                        </label>
                        <input
                          id="inq-date"
                          type="date"
                          value={formState.preferredDate}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, preferredDate: e.target.value }))
                          }
                          className="w-full rounded-[6px] border border-black/15 px-3 py-2.5 text-sm tabular-nums focus:outline-2 focus:outline-[#14532d]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="inq-notes"
                        className="block text-xs font-semibold text-[#1f2937] mb-1"
                      >
                        {lang === 'ne' ? 'थप जानकारी / प्रश्न' : 'Trip Notes or Questions'}
                      </label>
                      <textarea
                        id="inq-notes"
                        rows={3}
                        value={formState.notes}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, notes: e.target.value }))
                        }
                        placeholder={
                          lang === 'ne'
                            ? 'यात्रा दिन, समूह वा विशेष अनुरोध लेख्नुहोस्...'
                            : 'Share your dates, pace preferences, or custom requests...'
                        }
                        className="w-full rounded-[6px] border border-black/15 px-3 py-2 text-sm focus:outline-2 focus:outline-[#14532d] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#14532d] hover:bg-[#10261a] text-white font-bold text-sm px-6 py-3 rounded-[6px] transition-colors duration-150 cursor-pointer"
                    >
                      {UI_COPY.contactSection.submitBtn[lang]}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#10261a] text-white py-[30px] px-[5%]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div>{UI_COPY.footer}</div>
          <nav className="flex flex-wrap items-center gap-5 text-white/80" aria-label="Footer navigation">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="hover:text-white transition-colors"
            >
              {UI_COPY.nav.home[lang]}
            </a>
            <a
              href="#trips"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('trips');
              }}
              className="hover:text-white transition-colors"
            >
              {UI_COPY.nav.trips[lang]}
            </a>
            <a
              href="#itinerary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('itinerary');
              }}
              className="hover:text-white transition-colors"
            >
              {UI_COPY.nav.itinerary[lang]}
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('faq');
              }}
              className="hover:text-white transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="hover:text-white transition-colors"
            >
              {UI_COPY.nav.contact[lang]}
            </a>
          </nav>
        </div>
      </footer>

      <TripDetailModal
        trip={selectedTripModal}
        lang={lang}
        onClose={() => setSelectedTripModal(null)}
        onInquire={handleInquireForTrip}
      />

      <GalleryLightbox
        photos={GALLERY_PHOTOS}
        activeIndex={lightboxIndex}
        lang={lang}
        onClose={() => setLightboxIndex(null)}
        onSelect={setLightboxIndex}
      />

      <WhatsAppWidget lang={lang} selectedTripName={selectedTripDisplayName} />
    </div>
  );
}
