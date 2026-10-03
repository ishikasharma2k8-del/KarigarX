import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Camera, Cpu, Store } from 'lucide-react';
import { SupportedLanguage } from '../types';
import slide1Img from '../assets/images/carousel_slide_1_craft_1788284334587.jpg';
import slide2Img from '../assets/images/carousel_slide_2_ai_1788284349571.jpg';
import slide3Img from '../assets/images/carousel_slide_3_market_1788284363981.jpg';

interface HomeCarouselProps {
  currentLang: SupportedLanguage;
  onStartScan: () => void;
  onOpenMarketplace: () => void;
}

interface CarouselSlideData {
  id: number;
  badge: {
    en: string;
    hi: string;
    te: string;
    ta: string;
  };
  title: {
    en: string;
    hi: string;
    te: string;
    ta: string;
  };
  subtitle: {
    en: string;
    hi: string;
    te: string;
    ta: string;
  };
  image: string;
  actionText: {
    en: string;
    hi: string;
    te: string;
    ta: string;
  };
  actionType: 'scan' | 'marketplace';
  icon: typeof Camera;
}

const CAROUSEL_SLIDES: CarouselSlideData[] = [
  {
    id: 1,
    badge: {
      en: 'KarigarX Heritage',
      hi: 'कारीगर-एक्स धरोहर',
      te: 'కారిగర్‌ఎక్స్ కళ',
      ta: 'காரிகர்-எக்ஸ் பாரம்பரியம்',
    },
    title: {
      en: 'Your Craft, Your Story',
      hi: 'आपका शिल्प, आपकी कहानी',
      te: 'మీ కళ, మీ కథ',
      ta: 'உங்கள் கைவினை, உங்கள் கதை',
    },
    subtitle: {
      en: 'From photo to listing.',
      hi: 'फोटो से सीधी लिस्टिंग तक।',
      te: 'ఫోటో నుండి లిస్టింగ్ వరకు.',
      ta: 'புகைப்படத்திலிருந்து பட்டியல் வரை.',
    },
    image: slide1Img,
    actionText: {
      en: 'Scan Craft',
      hi: 'शिल्प स्कैन करें',
      te: 'క్రాఫ్ట్ స్కాన్ చేయండి',
      ta: 'ஸ்கேன் செய்',
    },
    actionType: 'scan',
    icon: Camera,
  },
  {
    id: 2,
    badge: {
      en: 'Intelligent AI',
      hi: 'स्मार्ट एआई',
      te: 'స్మార్ట్ ఏఐ',
      ta: 'நுண்ணறிவு ஏஐ',
    },
    title: {
      en: 'AI Does the Work',
      hi: 'काम एआई करेगा',
      te: 'పనిని ఏఐ చేస్తుంది',
      ta: 'வேலையை ஏஐ செய்கிறது',
    },
    subtitle: {
      en: 'Scan. Create. List.',
      hi: 'स्कैन करें. बनाएं. लिस्ट करें.',
      te: 'స్కాన్ చేయండి. సృష్టించండి. లిస్ట్ చేయండి.',
      ta: 'ஸ்கேன் செய். உருவாக்கு. பட்டியலிடு.',
    },
    image: slide2Img,
    actionText: {
      en: 'Try AI Scan',
      hi: 'एआई स्कैन आजमाएं',
      te: 'ఏఐ స్కాన్ చేయండి',
      ta: 'ஏஐ ஸ்கேன்',
    },
    actionType: 'scan',
    icon: Cpu,
  },
  {
    id: 3,
    badge: {
      en: 'Direct Marketplace',
      hi: 'सीधा बाजार',
      te: 'నేరుగా మార్కెట్',
      ta: 'நேரடி சந்தை',
    },
    title: {
      en: 'Reach More Customers',
      hi: 'अधिक ग्राहकों तक पहुंचें',
      te: 'ఎక్కువ మంది కస్టమర్లను చేరండి',
      ta: 'அதிக வாடிக்கையாளர்களை சென்றடையுங்கள்',
    },
    subtitle: {
      en: 'Your craft, everywhere.',
      hi: 'आपका शिल्प, हर जगह।',
      te: 'మీ చేతివృత్తుల కళ, ప్రతిచోటా.',
      ta: 'உங்கள் கைவினை, எங்கும் எப்போதும்.',
    },
    image: slide3Img,
    actionText: {
      en: 'Explore Market',
      hi: 'बाजार देखें',
      te: 'మార్కెట్‌ప్లేస్',
      ta: 'சந்தை பார்க்க',
    },
    actionType: 'marketplace',
    icon: Store,
  },
];

export const HomeCarousel: React.FC<HomeCarouselProps> = ({
  currentLang,
  onStartScan,
  onOpenMarketplace,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-advance every 6 seconds if not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    if (deltaX > 40) {
      handleNext();
    } else if (deltaX < -40) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const slide = CAROUSEL_SLIDES[currentIndex];
  const langKey = currentLang in slide.title ? currentLang : 'en';

  return (
    <div
      className="relative rounded-3xl overflow-hidden bg-[#241A14] text-white shadow-xl border border-[#D9CEBF]/40 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide Container */}
      <div className="relative min-h-[360px] sm:min-h-[390px] md:min-h-[420px] flex flex-col justify-end">
        {/* Background Image Layer with Warm Earthy Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title[langKey]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform scale-100 group-hover:scale-102"
          />
          {/* Subtle multi-stop earthy vignette for optimal text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1611]/95 via-[#1F1611]/60 to-[#1F1611]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F1611]/85 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Top Progress & Slide Badges */}
        <div className="absolute top-4 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-200 text-[11px] font-bold shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{slide.badge[langKey]}</span>
          </div>

          {/* Step Pill Indicators */}
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 pointer-events-auto">
            {CAROUSEL_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Block */}
        <div className="relative z-10 p-5 sm:p-7 md:p-8 max-w-2xl space-y-2 sm:space-y-3">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              {slide.title[langKey]}
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-serif italic text-amber-200/95 font-medium leading-snug">
              {slide.subtitle[langKey]}
            </p>
          </div>

          {/* Minimal, accessible CTA */}
          <div className="pt-1.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (slide.actionType === 'scan') {
                  onStartScan();
                } else {
                  onOpenMarketplace();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-lg transition active:scale-95 border border-amber-300/60"
            >
              <slide.icon className="w-4 h-4" />
              <span>{slide.actionText[langKey]}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Side Nav Arrows (Desktop & Tablet) */}
        <div className="absolute inset-y-0 inset-x-2 sm:inset-x-3 flex items-center justify-between pointer-events-none z-20">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center pointer-events-auto transition active:scale-90 shadow-md"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white border border-white/20 backdrop-blur-md flex items-center justify-center pointer-events-auto transition active:scale-90 shadow-md"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
