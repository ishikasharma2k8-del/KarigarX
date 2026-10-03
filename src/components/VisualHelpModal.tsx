import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Camera,
  Mic,
  Sparkles,
  Store,
  IndianRupee,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sun,
  HandMetal,
  Lightbulb,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';
import { speakText, stopSpeech } from '../utils/speech';

interface VisualHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: SupportedLanguage;
}

export const VisualHelpModal: React.FC<VisualHelpModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const t = UI_STRINGS[currentLang];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const handlePlayAudioHelp = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    let helpSpeech = '';
    if (currentLang === 'hi') {
      helpSpeech =
        'कारीगरएक्स में आपका स्वागत है। यहां आप 5 सरल चरणों में अपना शिल्प बेच सकते हैं। पहला: कैमरे से साफ फोटो लें। दूसरा: माइक दबाकर शिल्प के बारे में बोलें। तीसरा: AI आपके लिए सही दाम और सुंदर विवरण बनाएगा। चौथा: मार्केटप्लेस पर लिस्ट करें। पांचवां: ग्राहक से ऑर्डर पाएं और सीधे पैसे कमाएं। फोटो लेते समय अच्छी रोशनी रखें और धुंधली फोटो न लें।';
    } else if (currentLang === 'te') {
      helpSpeech =
        'కారికర్ఎక్స్‌కు స్వాగతం. ఇక్కడ మీరు 5 సులభమైన దశల్లో మీ చేతివృత్తుల వస్తువులను అమ్మవచ్చు. ఒకటి: కెమెరాతో మంచి ఫోటో తీయండి. రెండు: మైక్ నొక్కి మాట్లాడండి. మూడు: AI సరసమైన ధర మరియు పూర్తి వివరాలు సృష్టిస్తుంది. నాలుగు: మార్కెట్‌లో ప్రచురించండి. ఐదు: నేరుగా కొనుగోలుదారుల నుండి డబ్బు సంపాదించండి. మంచి వెలుతురులో స్పష్టమైన ఫోటో తీయండి.';
    } else if (currentLang === 'ta') {
      helpSpeech =
        'காரிகர்எக்ஸிற்கு வரவேற்கிறோம். நீங்கள் 5 எளிய படிகளில் உங்கள் கைவினைப் பொருட்களை விற்கலாம். ஒன்று: கேமராவில் தெளிவான படம் எடுக்கவும். இரண்டு: மைக்கை அழுத்தி பேசவும். மூன்று: AI நியாயமான விலை மற்றும் விவரங்களை உருவாக்கும். நான்கு: சந்தையில் வெளியிடவும். ஐந்து: வாடிக்கையாளர்களிடம் இருந்து நேரடியாக பணம் பெறுங்கள். நல்ல வெளிச்சத்தில் படம் எடுக்கவும்.';
    } else {
      helpSpeech =
        'Welcome to KarigarX. See, Tap, Speak, Done. Step 1: Take a clear photo in bright light. Step 2: Tap the mic and speak about your craft. Step 3: AI automatically generates fair pricing and descriptions. Step 4: List on marketplace. Step 5: Receive buyer orders and earn directly without commission!';
    }

    speakText(
      helpSpeech,
      currentLang,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#E8E2D6] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-[#FAF7F2] p-5 border-b border-[#E8E2D6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2B231D]">
                {t.actionHelp} • {t.photoGuideTitle}
              </h2>
              <p className="text-xs text-[#7A6E63]">
                SEE → TAP → SPEAK → DONE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlayAudioHelp}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                isPlayingAudio
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 {t.listenAudioHelp}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* 5-Step Visual Flow */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#2B231D] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b84c28]" />
              <span>5 Simple Pictorial Steps</span>
            </h3>

            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8E2D6] flex flex-col items-center justify-between gap-1">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-[#b84c28] flex items-center justify-center font-bold text-lg">
                  📷
                </div>
                <span className="text-[11px] font-bold text-[#2B231D] leading-tight">
                  1. {t.flowShowUs}
                </span>
                <span className="text-[9px] text-[#7A6E63] hidden sm:block">Take Photo</span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8E2D6] flex flex-col items-center justify-between gap-1">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                  🎤
                </div>
                <span className="text-[11px] font-bold text-[#2B231D] leading-tight">
                  2. {t.flowTellUs}
                </span>
                <span className="text-[9px] text-[#7A6E63] hidden sm:block">Speak Details</span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8E2D6] flex flex-col items-center justify-between gap-1">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                  🤖
                </div>
                <span className="text-[11px] font-bold text-[#2B231D] leading-tight">
                  3. {t.flowWeCreate}
                </span>
                <span className="text-[9px] text-[#7A6E63] hidden sm:block">AI Price & Story</span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8E2D6] flex flex-col items-center justify-between gap-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  🛍️
                </div>
                <span className="text-[11px] font-bold text-[#2B231D] leading-tight">
                  4. {t.flowYouSell}
                </span>
                <span className="text-[9px] text-[#7A6E63] hidden sm:block">Live Marketplace</span>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8E2D6] flex flex-col items-center justify-between gap-1">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                  💰
                </div>
                <span className="text-[11px] font-bold text-[#2B231D] leading-tight">
                  5. {t.flowYouEarn}
                </span>
                <span className="text-[9px] text-[#7A6E63] hidden sm:block">Direct Cash</span>
              </div>
            </div>
          </div>

          {/* Visual Photo DOs & DONTs */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#2B231D] flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>{t.photoGuideTitle} (DOs & DONTs)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Bad: Dark */}
              <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-4 flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-xl bg-stone-900 text-stone-500 flex items-center justify-center relative overflow-hidden border border-stone-800">
                  <span className="text-2xl opacity-40">🏺</span>
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-rose-500" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-rose-800 flex items-center justify-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>❌ {t.photoDark}</span>
                  </span>
                  <p className="text-[11px] text-rose-700">
                    Avoid dark rooms or shadows
                  </p>
                </div>
              </div>

              {/* Bad: Blurry */}
              <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-4 flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-xl bg-stone-200 text-stone-400 flex items-center justify-center relative overflow-hidden border border-stone-300">
                  <span className="text-2xl blur-[3px]">🏺</span>
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-rose-500" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-rose-800 flex items-center justify-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>❌ {t.photoBlurry}</span>
                  </span>
                  <p className="text-[11px] text-rose-700">
                    Hold phone steady for sharp focus
                  </p>
                </div>
              </div>

              {/* Good: Clear & Bright */}
              <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 flex flex-col items-center text-center space-y-2 shadow-xs">
                <div className="w-16 h-16 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center relative overflow-hidden border-2 border-emerald-400">
                  <span className="text-3xl">🏺</span>
                  <div className="absolute top-1 right-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>✅ {t.photoClear}</span>
                  </span>
                  <p className="text-[11px] text-emerald-700">
                    Daylight & clean background
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Low-Literacy Quick Tips */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6] flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-[#2B231D] space-y-1">
              <p className="font-bold">No typing needed!</p>
              <p className="text-[#7A6E63] leading-relaxed">
                You can speak in <strong>Hindi, Telugu, Tamil, or English</strong>. KarigarX AI recognizes craft heritage, calculates fair marketplace pricing, and writes your entire product story automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E2D6] flex justify-end">
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#b84c28] hover:bg-[#a23f1e] text-white font-bold rounded-2xl text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span>✓ Got It / {t.close}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
