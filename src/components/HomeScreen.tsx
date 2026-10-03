import React, { useState } from 'react';
import {
  Camera,
  ShoppingBag,
  Package,
  IndianRupee,
  HelpCircle,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  MapPin,
  TrendingUp,
  Zap,
  Store,
} from 'lucide-react';
import { ProductAnalysis, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';
import { SAMPLE_CRAFTS, SampleCraft } from '../data/samples';
import { speakText, stopSpeech } from '../utils/speech';
import officialLogoImg from '../assets/images/karigarx_official_logo_1788090855222.jpg';
import { HomeCarousel } from './HomeCarousel';
import { VoiceWaveIcon } from './VoiceWaveIcon';

interface HomeScreenProps {
  currentLang: SupportedLanguage;
  catalog: ProductAnalysis[];
  onStartScan: () => void;
  onStartVoice?: () => void;
  onOpenCatalog?: () => void;
  onOpenOrders?: () => void;
  onOpenEarnings?: () => void;
  onOpenHelp?: () => void;
  onOpenMarketplace: () => void;
  onImageSelected: (dataUrl: string) => void;
  onSelectProduct: (product: ProductAnalysis) => void;
  onViewAllCatalog: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentLang,
  catalog,
  onStartScan,
  onStartVoice,
  onOpenCatalog,
  onOpenOrders,
  onOpenEarnings,
  onOpenHelp,
  onOpenMarketplace,
  onImageSelected,
  onSelectProduct,
  onViewAllCatalog,
}) => {
  const t = UI_STRINGS[currentLang];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Live stats
  const totalProducts = catalog.length > 0 ? catalog.length : 3;
  const totalMarketValue =
    catalog.reduce((acc, curr) => acc + (curr.suggestedPriceINR || 0), 0) || 2980;
  const scansToday = 21 + (catalog.length > 0 ? catalog.length : 0);

  const handleHeroSpeech = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      let speech = '';
      if (currentLang === 'hi') {
        speech =
          'नमस्ते कारीगर! कारीगर-एक्स में आपका स्वागत है। देखें, दबाएं, बोलें और बेचें। शिल्प का फोटो लेने के लिए कैमरा दबाएं, या बोलकर लिस्टिंग बनाने के लिए बोलें बटन दबाएं।';
      } else if (currentLang === 'te') {
        speech =
          'నమస్కారం కళాకారుడా! కారిగర్‌ఎక్స్‌కు స్వాగతం. చూడండి, నొక్కండి, మాట్లాడండి, అమ్మండి. ఫోటో కోసం కెమెరా నొక్కండి లేదా మాట్లాడటానికి మాట్లాడండి బటన్ నొక్కండి.';
      } else if (currentLang === 'ta') {
        speech =
          'வணக்கம் கைவினைஞரே! காரிகர்-எக்ஸ் உங்களை வரவேற்கிறது. படம் எடுக்க கேமராவை அழுத்தவும், பேசி விவரங்களைச் சேர்க்க பேசு பொத்தானை அழுத்தவும்.';
      } else {
        speech =
          'Namaste Artisan! Welcome to KarigarX. See, Tap, Speak, Done. Tap Camera to photograph your craft, or tap Speak to create a product listing with your voice.';
      }

      speakText(
        speech,
        currentLang,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6 animate-fade-in">
      {/* 3-Slide Horizontal Onboarding Carousel */}
      <HomeCarousel
        currentLang={currentLang}
        onStartScan={onStartScan}
        onOpenMarketplace={onOpenMarketplace}
      />

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#943d22] via-[#a34b2c] to-[#455c47] text-white shadow-xl border border-amber-900/30">
        {/* Desktop Emblem */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center text-center pointer-events-none z-10">
          <div className="w-36 h-36 rounded-full p-2 bg-white/10 backdrop-blur-md border-2 border-amber-300/40 shadow-2xl flex items-center justify-center">
            <img
              src={officialLogoImg}
              alt="Official KarigarX Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain rounded-full bg-[#FAF7F2] shadow-inner"
            />
          </div>
          <p className="mt-2 text-[11px] font-serif font-bold text-amber-200 tracking-wide bg-black/40 px-3 py-1 rounded-full border border-white/15">
            &ldquo;Your Craft. Your Story. Your Market.&rdquo;
          </p>
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          {/* Logo, Badge, Slogan */}
          <div className="flex items-center gap-3.5">
            <img
              src={officialLogoImg}
              alt="KarigarX Logo"
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain bg-[#FAF7F2] border-2 border-amber-300/70 shadow-md shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-amber-200 text-[11px] font-bold shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Smart India Hackathon Edition • AI Karigar</span>
              </div>
              <p className="text-xs sm:text-sm font-serif font-semibold text-amber-100 tracking-wide mt-1">
                &ldquo;Your Craft. Your Story. Your Market.&rdquo;
              </p>
            </div>
          </div>

          {/* Heading + Large Audio Speaker Button */}
          <div className="flex items-center gap-3 pt-1">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Namaste, Artisan!
            </h1>
            <button
              type="button"
              onClick={handleHeroSpeech}
              title="Listen in Audio"
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border font-bold text-xs transition-all active:scale-95 shrink-0 ${
                isPlayingAudio
                  ? 'bg-amber-400 text-stone-950 border-amber-300 animate-pulse shadow-md'
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Stop Voice' : '🔊 Listen Audio'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            {t.homeSubtitle}
          </p>
        </div>
      </div>

      {/* 6 Large Pictorial Touch-Friendly Action Cards */}
      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-serif font-bold text-[#2B231D] flex items-center gap-2">
          <span>✨</span>
          <span>Quick Actions / मुख्य कार्य</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Tile 1: Camera (Take Photo) */}
          <button
            id="action-tile-camera"
            type="button"
            onClick={onStartScan}
            className="group bg-white hover:bg-orange-50/50 p-5 rounded-3xl border-2 border-[#E8E2D6] hover:border-[#b84c28] shadow-xs hover:shadow-md transition-all active:scale-95 text-left flex flex-col items-start justify-between min-h-[140px] sm:min-h-[160px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#b84c28] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
              📷
            </div>
            <div className="space-y-0.5 mt-3">
              <span className="text-base sm:text-lg font-bold text-[#2B231D] block group-hover:text-[#b84c28] transition-colors">
                {t.actionCamera}
              </span>
              <span className="text-xs text-[#7A6E63] block">
                {t.actionCameraDesc}
              </span>
            </div>
          </button>

          {/* Tile 2: Speak (Modern Voice Waveform Icon) */}
          <button
            id="action-tile-speak"
            type="button"
            onClick={onStartVoice || onStartScan}
            className="group bg-white hover:bg-emerald-50/50 p-5 rounded-3xl border-2 border-[#E8E2D6] hover:border-emerald-600 shadow-xs hover:shadow-md transition-all active:scale-95 text-left flex flex-col items-start justify-between min-h-[140px] sm:min-h-[160px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/90 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                <VoiceWaveIcon size="md" />
              </div>
            </div>
            <div className="space-y-0.5 mt-3">
              <span className="text-base sm:text-lg font-bold text-[#2B231D] block group-hover:text-emerald-800 transition-colors">
                {t.actionSpeak}
              </span>
              <span className="text-xs text-[#7A6E63] block">
                {t.actionSpeakDesc}
              </span>
            </div>
          </button>

          {/* Tile 3: My Products (Catalog & Store) */}
          <button
            id="action-tile-products"
            type="button"
            onClick={onOpenCatalog || onViewAllCatalog}
            className="group bg-white hover:bg-purple-50/50 p-5 rounded-3xl border-2 border-[#E8E2D6] hover:border-purple-600 shadow-xs hover:shadow-md transition-all active:scale-95 text-left flex flex-col items-start justify-between min-h-[140px] sm:min-h-[160px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
              🛍️
            </div>
            <div className="space-y-0.5 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-bold text-[#2B231D] block group-hover:text-purple-800 transition-colors">
                  {t.actionProducts}
                </span>
                {catalog.length > 0 && (
                  <span className="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">
                    {catalog.length}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#7A6E63] block">
                {t.actionProductsDesc}
              </span>
            </div>
          </button>

          {/* Tile 4: Orders (Track Buyer Orders) */}
          <button
            id="action-tile-orders"
            type="button"
            onClick={onOpenOrders || onOpenMarketplace}
            className="group bg-white hover:bg-blue-50/50 p-5 rounded-3xl border-2 border-[#E8E2D6] hover:border-blue-600 shadow-xs hover:shadow-md transition-all active:scale-95 text-left flex flex-col items-start justify-between min-h-[140px] sm:min-h-[160px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
              📦
            </div>
            <div className="space-y-0.5 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg font-bold text-[#2B231D] block group-hover:text-blue-800 transition-colors">
                  {t.actionOrders}
                </span>
                <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                  4 Active
                </span>
              </div>
              <span className="text-xs text-[#7A6E63] block">
                {t.actionOrdersDesc}
              </span>
            </div>
          </button>

          {/* Tile 5: Earnings (Sales & Money Earned) */}
          <button
            id="action-tile-earnings"
            type="button"
            onClick={onOpenEarnings || onOpenMarketplace}
            className="group bg-white hover:bg-amber-50/50 p-5 rounded-3xl border-2 border-[#E8E2D6] hover:border-amber-500 shadow-xs hover:shadow-md transition-all active:scale-95 text-left flex flex-col items-start justify-between min-h-[140px] sm:min-h-[160px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
              💰
            </div>
            <div className="space-y-0.5 mt-3">
              <span className="text-base sm:text-lg font-bold text-[#2B231D] block group-hover:text-amber-800 transition-colors">
                {t.actionEarnings}
              </span>
              <span className="text-xs text-[#7A6E63] block">
                {t.actionEarningsDesc}
              </span>
            </div>
          </button>

          {/* Tile 6: Help (Visual & Audio Guide) */}
          <button
            id="action-tile-help"
            type="button"
            onClick={onOpenHelp}
            className="group bg-white hover:bg-rose-50/50 p-5 rounded-3xl border-2 border-[#E8E2D6] hover:border-rose-500 shadow-xs hover:shadow-md transition-all active:scale-95 text-left flex flex-col items-start justify-between min-h-[140px] sm:min-h-[160px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
              🆘
            </div>
            <div className="space-y-0.5 mt-3">
              <span className="text-base sm:text-lg font-bold text-[#2B231D] block group-hover:text-rose-800 transition-colors">
                {t.actionHelp}
              </span>
              <span className="text-xs text-[#7A6E63] block">
                {t.actionHelpDesc}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col items-center justify-center text-center space-y-1 hover:border-amber-400 transition">
          <div className="w-7 h-7 text-[#b84c28] flex items-center justify-center mb-1">
            <Package className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className="text-3xl font-serif font-bold text-[#2B231D]">
            {totalProducts}
          </span>
          <span className="text-xs text-[#7A6E63] font-medium uppercase tracking-wider">
            Products Listed
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col items-center justify-center text-center space-y-1 hover:border-amber-400 transition">
          <div className="w-7 h-7 text-emerald-700 flex items-center justify-center mb-1">
            <TrendingUp className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-3xl font-serif font-bold text-[#204E36]">
            ₹{totalMarketValue.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-[#7A6E63] font-medium uppercase tracking-wider">
            Market Value
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D6] shadow-xs flex flex-col items-center justify-center text-center space-y-1 hover:border-amber-400 transition">
          <div className="w-7 h-7 text-amber-600 flex items-center justify-center mb-1">
            <Zap className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-3xl font-serif font-bold text-[#2B231D]">
            {scansToday}
          </span>
          <span className="text-xs text-[#7A6E63] font-medium uppercase tracking-wider">
            AI Scans Today
          </span>
        </div>
      </div>

      {/* Section: Try Sample Handicrafts */}
      <div className="space-y-3.5 pt-2">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#2B231D] flex items-center gap-2">
              <span>🏺</span>
              <span>Try Sample Handicrafts / नमूना शिल्प</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6E63]">
              Tap any master craft to test the AI scanner instantly:
            </p>
          </div>
        </div>

        {/* Grid of Sample Crafts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SAMPLE_CRAFTS.map((sample: SampleCraft) => (
            <div
              key={sample.id}
              onClick={() => onImageSelected(sample.image)}
              className="group bg-white rounded-2xl border border-[#E8E2D6] overflow-hidden shadow-xs hover:border-[#b84c28] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                <img
                  src={sample.image}
                  alt={sample.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{sample.region}</span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#2B231D] text-xs font-serif font-bold px-2.5 py-0.5 rounded-lg shadow-sm border border-stone-200">
                  ₹{sample.price}
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#b84c28] uppercase tracking-wider">
                    {sample.category}
                  </span>
                  <span className="text-xs text-[#7A6E63] group-hover:text-[#b84c28] font-bold flex items-center gap-0.5">
                    <span>Scan</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#2B231D] line-clamp-1 group-hover:text-[#b84c28] transition-colors">
                  {sample.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
