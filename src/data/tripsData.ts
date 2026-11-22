export type Language = 'ne' | 'en';
export type TripCategory = 'all' | 'trekking' | 'cultural' | 'sightseeing';

export interface TripItem {
  id: string;
  category: Exclude<TripCategory, 'all'>;
  image: string;
  imageAlt: string;
  title: Record<Language, string>;
  duration: Record<Language, string>;
  difficulty: Record<Language, string>;
  maxElevation: string;
  bestSeason: Record<Language, string>;
  region: Record<Language, string>;
  summary: Record<Language, string>;
  highlights: Record<Language, string[]>;
  included: Record<Language, string[]>;
}

export interface ItineraryDay {
  dayLabel: Record<Language, string>;
  title: Record<Language, string>;
  details: Record<Language, string>;
  elevationOrRoute: string;
}

export interface ItineraryPlan {
  id: string;
  tripTitle: Record<Language, string>;
  days: ItineraryDay[];
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: Record<Language, string>;
  location: Record<Language, string>;
}

export interface FaqItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa';

export const TRIPS: TripItem[] = [
  {
    id: 'abc-trek',
    category: 'trekking',
    image: 'https://images.unsplash.com/photo-1559523182-a284c3fb6c48',
    imageAlt: 'Annapurna trekking trail in the Himalayas',
    title: {
      ne: 'Annapurna Base Camp',
      en: 'Annapurna Base Camp',
    },
    duration: {
      ne: '7–10 दिन',
      en: '7–10 Days',
    },
    difficulty: {
      ne: 'Moderate',
      en: 'Moderate',
    },
    maxElevation: '4,130 m',
    bestSeason: {
      ne: 'Spring (Mar–May) · Autumn (Sep–Nov)',
      en: 'Spring (Mar–May) · Autumn (Sep–Nov)',
    },
    region: {
      ne: 'Annapurna Conservation Area',
      en: 'Annapurna Conservation Area',
    },
    summary: {
      ne: 'हिमाल, गाउँ तथा प्राकृतिक अनुभवहरूको संयोजन।',
      en: 'A balanced blend of Himalayan peaks, Gurung villages, and rhododendron trails.',
    },
    highlights: {
      ne: [
        'अन्नपूर्ण दक्षिण, माछापुच्छ्रे र हिउँचुलीको नजिकको दृश्य',
        'घान्द्रुक र छोम्रोङ जस्ता परम्परागत पहाडी गाउँको अनुभव',
        'झिनु डाँडामा प्राकृतिक तातोपानी कुण्ड (Hot Spring)',
        'अनुभवी स्थानीय गाइडसहित सुरक्षित र सहज यात्रा',
      ],
      en: [
        '360-degree amphitheater views of Annapurna I, South, and Machapuchare',
        'Cultural stays in traditional Gurung stone villages like Ghandruk & Chhomrong',
        'Relaxing natural riverside hot springs at Jhinu Danda',
        'Paced acclimatisation with a certified local mountain guide',
      ],
    },
    included: {
      ne: [
        'लाइसेन्स प्राप्त स्थानीय गाइड (English / Hindi / नेपाली)',
        'ACAP र TIMS permit सहजीकरण',
        'Tea-house lodge तथा मार्ग योजना व्यवस्था',
      ],
      en: [
        'Licensed local guide (English / Hindi / Nepali)',
        'ACAP & TIMS permit coordination',
        'Tea-house lodging & daily route planning',
      ],
    },
  },
  {
    id: 'kathmandu-cultural',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60',
    imageAlt: 'Nepal cultural tour heritage architecture',
    title: {
      ne: 'काठमाडौं सांस्कृतिक Tour',
      en: 'Kathmandu Cultural Tour',
    },
    duration: {
      ne: '1–3 दिन',
      en: '1–3 Days',
    },
    difficulty: {
      ne: 'Easy',
      en: 'Easy',
    },
    maxElevation: '1,400 m',
    bestSeason: {
      ne: 'वर्षभरि (All Year)',
      en: 'Year-round',
    },
    region: {
      ne: 'Kathmandu, Patan & Bhaktapur',
      en: 'Kathmandu, Patan & Bhaktapur',
    },
    summary: {
      ne: 'देवालय, स्थानीय बजार तथा UNESCO heritage site।',
      en: 'Ancient temples, bustling local courtyards, and living UNESCO heritage sites.',
    },
    highlights: {
      ne: [
        'स्वयम्भूनाथ, बौद्धनाथ स्तूपा र पशुपतिनाथ क्षेत्र भ्रमण',
        'पाटन र भक्तपुर दरबार स्क्वायरको नेवारी काष्ठकला अवलोकन',
        'स्थानीय गल्ली, चिया पसल र परम्परागत नेवारी खाजा अनुभव',
        'निजी सवारी तथा लचिलो समय तालिका',
      ],
      en: [
        'Guided walks through Swayambhunath, Boudhanath Stupa, and Pashupatinath',
        'Intricate Newari woodcarving and courtyards in Patan and Bhaktapur Durbar Squares',
        'Hidden alley spice markets and authentic Newari culinary stops',
        'Flexible pacing tailored to photography or architectural history',
      ],
    },
    included: {
      ne: [
        'स्थानीय सांस्कृतिक गाइड',
        'Private vehicle यातायात विकल्प',
        'कस्टमाइज्ड आधा दिन वा पूरा दिनको तालिका',
      ],
      en: [
        'Local heritage specialist guide',
        'Optional private air-conditioned transport',
        'Custom half-day or multi-day pacing',
      ],
    },
  },
  {
    id: 'pokhara-sightseeing',
    category: 'sightseeing',
    image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b',
    imageAlt: 'Pokhara mountain reflection and sightseeing',
    title: {
      ne: 'Pokhara Sightseeing',
      en: 'Pokhara Sightseeing',
    },
    duration: {
      ne: '2–4 दिन',
      en: '2–4 Days',
    },
    difficulty: {
      ne: 'Easy',
      en: 'Easy',
    },
    maxElevation: '1,600 m',
    bestSeason: {
      ne: 'Sep–Jun',
      en: 'Sep–Jun',
    },
    region: {
      ne: 'Pokhara Valley & Sarangkot',
      en: 'Pokhara Valley & Sarangkot',
    },
    summary: {
      ne: 'ताल, गुफा, waterfall तथा sunrise viewpoint।',
      en: 'Serene alpine lakes, limestone caves, waterfalls, and Himalayan sunrise viewpoints.',
    },
    highlights: {
      ne: [
        'सराङकोटबाट अन्नपूर्ण र माछापुच्छ्रेको सूर्योदय दृश्य',
        'फेवातालमा डुङ्गा सयर र तालबाराही मन्दिर दर्शन',
        'डेभिज फल्स, गुप्तेश्वर गुफा र शान्ति स्तूपा',
        'परिवार तथा सानो समूहका लागि आरामदायी भ्रमण',
      ],
      en: [
        'Golden sunrise over Annapurna and Dhaulagiri from Sarangkot',
        'Morning wooden boat ride on Phewa Lake to Tal Barahi Temple',
        'Devi’s Fall, Gupteshwor Mahadev Cave, and World Peace Pagoda',
        'Relaxed valley itinerary ideal for families and small groups',
      ],
    },
    included: {
      ne: [
        'पोखरा स्थानीय गाइड सेवा',
        'Sunrise pickup तथा viewpoint व्यवस्था',
        'वैकल्पिक पैदल वा सवारी यात्रा',
      ],
      en: [
        'Dedicated Pokhara local guide',
        'Early-morning sunrise viewpoint transfer',
        'Optional short valley ridge hikes',
      ],
    },
  },
];

export const ITINERARY_PLANS: ItineraryPlan[] = [
  {
    id: 'sample-7-day',
    tripTitle: {
      ne: 'नमूना 7-दिनको Itinerary',
      en: 'Sample 7-Day Itinerary',
    },
    days: [
      {
        dayLabel: { ne: 'दिन १', en: 'Day 1' },
        title: { ne: 'काठमाडौँ arrival तथा briefing', en: 'Kathmandu arrival & trip briefing' },
        details: {
          ne: 'त्रिभुवन अन्तर्राष्ट्रिय विमानस्थल आगमन, होटल चेक-इन, गाइडसँग भेट र यात्रा सम्बन्धी आवश्यक सामग्री तथा रुट जानकारी।',
          en: 'Airport pickup, hotel check-in, gear check, and orientation briefing with your guide over Nepali tea.',
        },
        elevationOrRoute: '1,400 m · Kathmandu',
      },
      {
        dayLabel: { ne: 'दिन २', en: 'Day 2' },
        title: { ne: 'काठमाडौँ–पोखरा ड्राइभ', en: 'Kathmandu to Pokhara scenic drive' },
        details: {
          ne: 'त्रिशूली नदीको किनार हुँदै सुन्दर पहाडी दृश्य अवलोकन गर्दै पोखरा प्रस्थान र साँझ फेवाताल किनार घुमघाम।',
          en: 'Scenic highway journey alongside the Trishuli River into Pokhara valley, followed by an evening walk by Phewa Lake.',
        },
        elevationOrRoute: '820 m · ~6–7 hrs drive',
      },
      {
        dayLabel: { ne: 'दिन ३', en: 'Day 3' },
        title: { ne: 'Trek start point बाट पहिलो trekking', en: 'First day on the trail from trailhead' },
        details: {
          ne: 'बिहान छोटो सवारीपछि पदयात्रा सुरु। पहाडी बाटो, झोलुङ्गे पुल र हरियाली वन हुँदै पहिलो रातको विश्राम स्थलमा बास।',
          en: 'Short transfer to the trailhead, crossing suspension bridges and terraced farmlands to your first mountain lodge.',
        },
        elevationOrRoute: '1,940 m · ~4–5 hrs trek',
      },
      {
        dayLabel: { ne: 'दिन ४–६', en: 'Days 4–6' },
        title: { ne: 'Ghumphir तथा local village घुम्न', en: 'High trail exploration & local village immersion' },
        details: {
          ne: 'परम्परागत गाउँ, स्थानीय संस्कृति, सूर्योदय viewpoint र हिमाली काखको पदयात्रा। स्थानीय परिकार र न्यानो आतिथ्यको अनुभव।',
          en: 'Steady ascents through mountain villages, sunrise ridge viewpoints, cultural homestay hospitality, and alpine scenery.',
        },
        elevationOrRoute: '2,800–4,130 m · Alpine valleys',
      },
      {
        dayLabel: { ne: 'दिन ७', en: 'Day 7' },
        title: { ne: 'पोखरा वा काठमाडौँ फर्कने', en: 'Return to Pokhara or Kathmandu' },
        details: {
          ne: 'बिहानीको अन्तिम हिमाली दृश्यपछि पोखरा वा काठमाडौँ फिर्ता तथा यात्रा समापन।',
          en: 'Final morning mountain views followed by return transport to Pokhara or Kathmandu for departure.',
        },
        elevationOrRoute: '820 m / 1,400 m · Return',
      },
    ],
  },
  {
    id: 'kathmandu-3-day',
    tripTitle: {
      ne: 'काठमाडौं 3-दिन सांस्कृतिक योजना',
      en: 'Kathmandu 3-Day Cultural Plan',
    },
    days: [
      {
        dayLabel: { ne: 'दिन १', en: 'Day 1' },
        title: { ne: 'स्वयम्भूनाथ र काठमाडौं दरबार क्षेत्र', en: 'Swayambhunath & Kathmandu Durbar Square' },
        details: {
          ne: 'उपत्यकाको मनोरम दृश्य देखिने स्वयम्भूनाथ स्तूपा र ऐतिहासिक हनुमानढोका दरबार स्क्वायर भ्रमण।',
          en: 'Morning climb up Swayambhunath hill overlooking the valley, then walking tour through Hanuman Dhoka and local bazaars.',
        },
        elevationOrRoute: '1,400 m · Heritage Walk',
      },
      {
        dayLabel: { ne: 'दिन २', en: 'Day 2' },
        title: { ne: 'पाटन र भक्तपुर दरबार स्क्वायर', en: 'Patan & Bhaktapur Heritage Squares' },
        details: {
          ne: 'ललितपुरको पाटन सङ्ग्रहालय र भक्तपुरको न्यातपोल मन्दिर, कुम्हाले टोल र जुजु धौ स्वाद अनुभव।',
          en: 'Explore Patan’s bronze craft courtyards before continuing to medieval Bhaktapur’s Nyatapola Temple and pottery square.',
        },
        elevationOrRoute: '1,400 m · Full Day',
      },
      {
        dayLabel: { ne: 'दिन ३', en: 'Day 3' },
        title: { ne: 'पशुपतिनाथ र बौद्धनाथ स्तूपा', en: 'Pashupatinath & Boudhanath Stupa' },
        details: {
          ne: 'बागमती किनारको पशुपतिनाथ मन्दिर र बौद्धनाथ स्तूपामा शान्त साँझको कोरा परिक्रमा।',
          en: 'Sacred riverside heritage walk at Pashupatinath followed by afternoon kora around Boudhanath Stupa.',
        },
        elevationOrRoute: '1,400 m · Spiritual Circuit',
      },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'mountains',
    src: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227',
    alt: 'Nepal mountains at dawn',
    title: { ne: 'हिमाली सूर्योदय दृश्य', en: 'High Himalayan Dawn' },
    location: { ne: 'Annapurna Range, Nepal', en: 'Annapurna Range, Nepal' },
  },
  {
    id: 'landscape',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    alt: 'Nepal mountain valley landscape',
    title: { ne: 'पहाडी उपत्यका र ताल', en: 'Alpine Valley & Lake' },
    location: { ne: 'Mid-Hill Trail, Nepal', en: 'Mid-Hill Trail, Nepal' },
  },
  {
    id: 'lake',
    src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    alt: 'Mountain lake reflection',
    title: { ne: 'शान्त हिमताल प्रतिविम्ब', en: 'Serene Mountain Reflection' },
    location: { ne: 'Pokhara & Lake Region', en: 'Pokhara & Lake Region' },
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'best-time',
    question: {
      ne: 'नेपाल भ्रमण तथा Trekking को लागि सबैभन्दा उपयुक्त समय कुन हो?',
      en: 'When is the best time to visit Nepal for trekking and tours?',
    },
    answer: {
      ne: 'पर्वतीय ट्रेकिङ्ग (जस्तै Annapurna Base Camp) को लागि शरद ऋतु (September–November) र वसन्त ऋतु (March–May) सबैभन्दा उत्तम मानिन्छन्, जहाँ मौसम सफा र हिमालको दृश्य स्पष्ट हुन्छ। काठमाडौं र पोखरा सांस्कृतिक तथा sightseeing भ्रमण भने वर्षभरि नै आरामदायी रूपमा गर्न सकिन्छ।',
      en: 'Autumn (September–November) and Spring (March–May) offer the clearest mountain skies and mild trail temperatures for treks like Annapurna Base Camp. Cultural tours in Kathmandu and sightseeing in Pokhara are enjoyable year-round, with crisp winter sun from December to February.',
    },
  },
  {
    id: 'visa',
    question: {
      ne: 'नेपाल आउन Visa चाहिन्छ? Visa कहाँ र कसरी पाइन्छ?',
      en: 'Do I need a visa to visit Nepal, and how do I get one?',
    },
    answer: {
      ne: 'अधिकांश विदेशी यात्रुहरूले काठमाडौंस्थित त्रिभुवन अन्तर्राष्ट्रिय विमानस्थल (TIA) वा प्रमुख स्थल सीमानाकामा नै On-Arrival Tourist Visa (15, 30, वा 90 दिन) प्राप्त गर्न सक्नुहुन्छ। कम्तीमा ६ महिना म्याद भएको पासपोर्ट र पासपोर्ट साइजको फोटो साथमा राख्नुहोस्। भारतीय नागरिकहरूलाई प्रवेशका लागि भिसा आवश्यक पर्दैन (मान्य पासपोर्ट वा मतदाता परिचयपत्र पर्याप्त हुन्छ)।',
      en: 'Most travelers can obtain a 15-, 30-, or 90-day Tourist Visa on Arrival directly at Tribhuvan International Airport in Kathmandu or major land borders—bring a passport with at least 6 months validity and USD/card for the fee. Indian nationals do not require a visa (a valid passport or Voter ID is sufficient).',
    },
  },
  {
    id: 'permits',
    question: {
      ne: 'Trekking को लागि के-कस्ता permit चाहिन्छन् र कसले मिलाउँछ?',
      en: 'What trekking permits are required, and do you arrange them?',
    },
    answer: {
      ne: 'अन्नपूर्ण क्षेत्रको पदयात्राका लागि ACAP (Annapurna Conservation Area Permit) र TIMS कार्ड आवश्यक पर्छ। हामी तपाईंको पासपोर्ट विवरण र फोटोको आधारमा यात्रा सुरु हुनुअघि नै काठमाडौं वा पोखराबाट सबै permit सहजीकरण र व्यवस्था गरिदिन्छौं।',
      en: 'Treks in the Annapurna region require an ACAP (Annapurna Conservation Area Permit) and TIMS card. We handle all permit paperwork and processing in Kathmandu or Pokhara before your trek starts—you just provide your passport copy and photos.',
    },
  },
  {
    id: 'private-custom',
    question: {
      ne: 'के म Private वा आफ्नै समयअनुसार Custom trip बुक गर्न सक्छु?',
      en: 'Can I book a private trip or customise the itinerary pace?',
    },
    answer: {
      ne: 'अवश्य! हामी एकल यात्रु, परिवार र सानो समूहका लागि पूर्ण रूपमा private तथा customisable यात्रा योजना बनाउँछौं। तपाईंको उमेर, हिँड्ने गति, मनपर्ने होटल वा tea-house स्तर र समयसीमा अनुसार दिनहरू थपघट गर्न सकिन्छ।',
      en: 'Yes. Whether you are traveling solo, as a couple, or with family, every itinerary can be run privately and tailored to your walking pace, preferred accommodation style, and available travel dates.',
    },
  },
  {
    id: 'fitness-altitude',
    question: {
      ne: 'Annapurna Base Camp जस्ता trek गर्न कत्तिको शारीरिक तन्दुरुस्ती चाहिन्छ?',
      en: 'How fit do I need to be for Annapurna Base Camp?',
    },
    answer: {
      ne: 'सामान्य मध्यम स्तरको फिटनेस पर्याप्त हुन्छ। दैनिक ४ देखि ६ घण्टा ढुङ्गे सिँढी र पहाडी बाटो हिँड्ने बानी भए सहज हुन्छ। हाम्रो तालिका बिस्तारै उचाइ चढ्ने र पर्याप्त आराम मिल्ने गरी तयार गरिएको हुन्छ, जसमा गाइडले स्वास्थ्य र गतिको नियमित ध्यान राख्नुहुन्छ।',
      en: 'Moderate everyday fitness is enough—expect 4 to 6 hours of steady walking per day along stone steps and forest trails. Our routes follow gradual acclimatisation profiles with daily hydration and pace check-ins from your guide.',
    },
  },
  {
    id: 'booking-confirm',
    question: {
      ne: 'Trip कन्फर्म गर्न र गाइड बुक गर्न कति समय अघि सम्पर्क गर्नुपर्छ?',
      en: 'How far in advance should I book, and how does inquiry work?',
    },
    answer: {
      ne: 'मुख्य सिजन (Spring र Autumn) मा २ देखि ४ हप्ता अघि सोधपुछ गर्नु उत्तम हुन्छ, तर छोटो अवधिको Cultural वा Pokhara भ्रमणका लागि केही दिन अघि पनि व्यवस्था गर्न सकिन्छ। तलको फारम वा WhatsApp मार्फत मिति पठाएपछि हामी २४ घण्टाभित्र विस्तृत योजना पठाउँछौं।',
      en: 'For peak trekking seasons (Spring & Autumn), reaching out 2–4 weeks ahead ensures the best lodges and guide availability; Kathmandu and Pokhara tours can often be arranged within days. Submit the inquiry form or message us on WhatsApp and we will reply with a tailored plan.',
    },
  },
];

export const UI_COPY = {
  brand: 'Nepal Adventure Guide',
  nav: {
    home: { ne: 'Home', en: 'Home' },
    trips: { ne: 'Trips', en: 'Trips' },
    itinerary: { ne: 'Itinerary', en: 'Itinerary' },
    about: { ne: 'About', en: 'About' },
    gallery: { ne: 'Gallery', en: 'Gallery' },
    contact: { ne: 'Contact', en: 'Contact' },
  },
  hero: {
    title: {
      ne: 'Nepal को सम्झनामा रहिरहने यात्रा',
      en: 'Unforgettable Journeys Across Nepal',
    },
    subtitle: {
      ne: 'Private, group तथा customised trekking/tours',
      en: 'Private, small-group, and custom trekking & cultural tours',
    },
    cta: {
      ne: 'Trip छनोट गर्नुहोस्',
      en: 'Explore Trips',
    },
  },
  tripsSection: {
    heading: { ne: 'लोकप्रिय Trips', en: 'Popular Trips' },
    filters: {
      all: { ne: 'All Trips', en: 'All Trips' },
      trekking: { ne: 'Trekking', en: 'Trekking' },
      cultural: { ne: 'Cultural', en: 'Cultural' },
      sightseeing: { ne: 'Sightseeing', en: 'Sightseeing' },
    },
    durationLabel: { ne: 'Duration', en: 'Duration' },
    difficultyLabel: { ne: 'Difficulty', en: 'Difficulty' },
    inquireBtn: { ne: 'Inquiry गर्नुहोस्', en: 'Inquire Now' },
    detailsBtn: { ne: 'विवरण हेर्नुहोस्', en: 'Trip Details' },
  },
  itinerarySection: {
    cta: { ne: 'Custom itinerary माग्नुहोस्', en: 'Request Custom Itinerary' },
  },
  aboutSection: {
    heading: { ne: 'मेरो बारेमा', en: 'About Your Guide' },
    body: {
      ne: 'नेपालका हिमाल, संस्कृति तथा गाउँलाई सुरक्षित, जिम्मेवार र स्थानीय अनुभवका रूपमा प्रस्तुत गर्ने उद्देश्यले तपाईंलाई छुट्टै guide service प्रदान गरिन्छ। Language English/Hindi/Chinese/Japanese/Nepali, Private तथा small group trip booking उपलब्ध छ।',
      en: 'Dedicated to sharing Nepal’s Himalayas, living culture, and mountain villages safely and responsibly. Personalised guiding is available in English, Hindi, Chinese , Japanese and Nepali for private travelers and small groups.',
    },
    facts: [
      {
        label: { ne: 'Languages', en: 'Languages' },
        value: { ne: 'English · Hindi · नेपाली . Chinese . Japanese', en: 'English · Hindi · Nepali . Chineses . Japanese' },
      },
      {
        label: { ne: 'Trip Formats', en: 'Trip Formats' },
        value: { ne: 'Private · Small Group · Custom', en: 'Private · Small Group · Custom' },
      },
      {
        label: { ne: 'Specialties', en: 'Specialties' },
        value: { ne: 'Himalayan Treks · UNESCO Heritage · Pokhara', en: 'Himalayan Treks · UNESCO Heritage · Pokhara' },
      },
    ],
  },
  gallerySection: {
    heading: { ne: 'Gallery', en: 'Gallery' },
  },
  faqSection: {
    heading: { ne: 'सामान्य प्रश्नहरू (FAQ)', en: 'Frequently Asked Questions' },
    subtitle: {
      ne: 'यात्रा योजना छिटो र सहज बनाउन धेरै सोधिने प्रश्नहरूको उत्तर।',
      en: 'Quick answers on seasons, visas, permits, and trip planning.',
    },
    ctaPrompt: {
      ne: 'थप प्रश्न छ?',
      en: 'Have another question?',
    },
    ctaLink: {
      ne: 'सिधै सोधपुछ गर्नुहोस्',
      en: 'Ask your guide directly',
    },
  },
  contactSection: {
    heading: { ne: 'सोधपुछ / Booking', en: 'Inquiry & Booking' },
    phoneLabel: { ne: 'Phone / WhatsApp', en: 'Phone / WhatsApp' },
    emailLabel: { ne: 'Email', en: 'Email' },
    socialLabel: { ne: 'Facebook', en: 'Facebook' },
    socialValue: { ne: 'www.facebook.com/raju.maharjan.925', en: 'www.facebook.com/raju.maharjan.925' },
    whatsappBtn: {
      ne: 'WhatsApp मा सन्देश पठाउनुहोस्',
      en: 'Message on WhatsApp',
    },
    formTitle: {
      ne: 'Trip सोधपुछ फारम',
      en: 'Send a Trip Inquiry',
    },
    submitBtn: {
      ne: 'Inquiry पठाउनुहोस्',
      en: 'Submit Inquiry',
    },
  },
  footer: '© 2026 Nepal Adventure Guide',
};
