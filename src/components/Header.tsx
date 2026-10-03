import React from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_STRINGS, LANGUAGES } from '../translations';
import { speakText, stopSpeech } from '../utils/speech';
import officialLogoImg from '../assets/images/karigarx_official_logo_1788090855222.jpg';

interface HeaderProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const t = UI_STRINGS[currentLang];

  const handleWelcomeAudio = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const introTexts: Record<SupportedLanguage, string> = {
        en: 'Namaste artisan! Welcome to KarigarX. Scan your handmade craft or choose a sample to get instant fair Indian market pricing and catalog descriptions.',
        hi: 'नमस्ते कारीगर! कारीगर-एक्स में आपका स्वागत है। अपने हस्तशिल्प को स्कैन करें और तुरंत सही मूल्य और उत्पाद विवरण प्राप्त करें।',
        te: 'నమస్కారం చేతివృత్తిదారుడా! కారిగర్‌ఎక్స్ కు స్వాగతం. మీ చేతితో చేసిన వస్తువును స్కాన్ చేసి సరసమైన ధరను తెలుసుకోండి.',
        ta: 'வணக்கம் கைவினைஞரே! காரிகர்-எக்ஸ் உங்களை வரவேற்கிறது. உங்கள் கைவினைப் பொருளை ஸ்கேன் செய்து சரியான விலையை உடனே பெறுங்கள்.',
      };

      speakText(
        introTexts[currentLang] || introTexts.en,
        currentLang,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <header className="bg-[#FAF7F2] border-b border-[#E8E2D6] px-4 py-2.5 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity with Official Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="relative shrink-0">
            <img
              src={officialLogoImg}
              alt="KarigarX Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain shadow-2xs border border-[#E8E2D6] bg-white transition-transform hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#2B231D] tracking-tight leading-none">
                Karigar<span className="text-[#b84c28]">X</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#ECE4D8] text-[#8C4626] border border-[#DDD3C4]">
                AI ARTISAN
              </span>
            </div>
            <span className="text-[11px] text-[#7A6E63] font-medium leading-none mt-1 hidden sm:block">
              AI Product Scanner for Rural Indian Artisans
            </span>
          </div>
        </div>

        {/* Right: Audio Speaker & Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Welcome voice audio button */}
          <button
            type="button"
            onClick={handleWelcomeAudio}
            title="Audio Guidance / आवाज सुनें"
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
              isPlayingAudio
                ? 'bg-[#b84c28] text-white border-[#b84c28] animate-pulse shadow-sm'
                : 'bg-white text-[#7A6E63] border-[#DDD3C4] hover:bg-[#F3EDE3] hover:text-[#2B231D]'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Segmented Language Selector Pill: EN | हि | తె | த */}
          <div className="flex items-center bg-white border border-[#DDD3C4] rounded-full p-0.5 shadow-2xs">
            {LANGUAGES.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                    isActive
                      ? 'bg-[#2B231D] text-white shadow-2xs'
                      : 'text-[#6E645A] hover:text-[#2B231D] hover:bg-[#F4EFE7]'
                  }`}
                >
                  {lang.code === 'en'
                    ? 'EN'
                    : lang.code === 'hi'
                    ? 'हि'
                    : lang.code === 'te'
                    ? 'తె'
                    : 'த'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
