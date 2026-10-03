import React, { useState } from 'react';
import {
  X,
  MapPin,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  Share2,
  Heart,
  Volume2,
  VolumeX,
  Layers,
  Palette,
  Tag,
  Store,
  Clock,
  Package,
  Award,
  Check,
  ExternalLink,
} from 'lucide-react';
import { PublishedListing, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';
import { speakListingDetails, stopSpeech } from '../utils/speech';
import { VisualMaterialGrid } from './VisualMaterialGrid';

interface BuyerProductModalProps {
  listing: PublishedListing | null;
  currentLang: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
  onEditListing?: (listing: PublishedListing) => void;
}

export const BuyerProductModal: React.FC<BuyerProductModalProps> = ({
  listing,
  currentLang,
  isOpen,
  onClose,
  onEditListing,
}) => {
  if (!isOpen || !listing) return null;
  const t = UI_STRINGS[currentLang];

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleAudioToggle = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      speakListingDetails(
        listing,
        currentLang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = `Namaste ${listing.artisanName}! I am interested in purchasing your handcrafted product "${listing.name}" (₹${listing.price}) listed on KarigarX Artisan Marketplace. Please share availability, crafting timeline, and shipping details.`;
    const url = `https://api.whatsapp.com/send?phone=${listing.artisanContact?.replace(/[^0-9]/g, '') || ''}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    const text = `Check out this authentic handmade craft: "${listing.name}" by ${listing.artisanName} from ${listing.artisanLocation} on KarigarX Artisan Marketplace for ₹${listing.price}!`;
    if (navigator.share) {
      navigator.share({ title: listing.name, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-[#E8E2D6] overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-[#E8E2D6] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {listing.status === 'LIVE' ? 'LIVE ON MARKETPLACE' : listing.status}
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-bold text-[#b84c28]">{listing.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAudioToggle}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                isSpeaking
                  ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                  : 'bg-white hover:bg-stone-100 text-[#2B231D] border-[#E8E2D6]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{t.stopSpeaking || 'Stop Voice'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.speakDetails || 'Listen Audio'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="close-buyer-modal-btn"
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* Main Visual & Key Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Image Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-[#E8E2D6] shadow-sm">
                <img
                  src={listing.imageUrl}
                  alt={listing.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {listing.craftStyle}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-8 h-8 rounded-full bg-black/70 backdrop-blur text-white hover:text-rose-400 flex items-center justify-center transition"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur border border-white/20 p-2.5 rounded-xl text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-300 block uppercase font-bold tracking-wider">
                      Fair Price (100% to Artisan)
                    </span>
                    <span className="text-xl font-serif font-bold text-white">₹{listing.price}</span>
                  </div>
                  <span className="text-xs text-emerald-300 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct Price</span>
                  </span>
                </div>
              </div>

              {/* Artisan Profile Box */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#b84c28] text-white flex items-center justify-center font-bold text-sm font-serif">
                      {listing.artisanName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-[#2B231D]">
                          {listing.artisanName}
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                      <span className="text-[11px] text-[#7A6E63] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#b84c28]" />
                        {listing.artisanLocation}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                    Master Karigar
                  </span>
                </div>

                {listing.artisanStory && (
                  <p className="text-[11px] text-stone-600 italic leading-relaxed pt-1 border-t border-stone-200/70">
                    "{listing.artisanStory}"
                  </p>
                )}
              </div>
            </div>

            {/* Right Information Column */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#b84c28] tracking-wider block">
                  {listing.category} • {listing.craftStyle}
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231D] mt-1 leading-snug">
                  {listing.name}
                </h1>
              </div>

              {/* Product Story / Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#2B231D] uppercase tracking-wider">
                  Handcraft Story & Provenance
                </h4>
                <p className="text-xs sm:text-sm text-[#5A5046] leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Visual Materials Breakdown */}
              <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8E2D6] space-y-2.5">
                <VisualMaterialGrid
                  materials={listing.materials}
                  title="Raw Materials / सामग्री"
                  subtitle="Artisan Craft Materials"
                  showCategoryTag={false}
                />

                {listing.colors && listing.colors.length > 0 && (
                  <div className="pt-2 border-t border-[#E8E2D6] flex items-center justify-between flex-wrap gap-1.5">
                    <span className="text-[11px] font-bold text-[#2B231D] flex items-center gap-1">
                      <Palette className="w-3 h-3 text-[#b84c28]" />
                      <span>Colors:</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {listing.colors.map((c, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-white text-stone-800 px-2 py-0.5 rounded-md border border-[#E8E2D6] font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Key Selling Points for Buyer */}
              {listing.sellingPoints && listing.sellingPoints.length > 0 && (
                <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3.5 space-y-1.5">
                  <span className="text-[11px] font-bold text-[#8C4626] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#b84c28]" />
                    <span>Artisan Highlights</span>
                  </span>
                  <div className="space-y-1">
                    {listing.sellingPoints.map((sp, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-500 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Keywords & Heritage Tags</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {listing.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200"
                    >
                      {t.startsWith('#') ? t : `#${t}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Artisan Guarantee & Fair Trade Banner */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900 block text-xs sm:text-sm">
                  100% Authentic Indian Craft Guarantee
                </span>
                <span className="text-emerald-800 text-[11px]">
                  Direct artisan trade • Zero middleman deduction • Traditional indigenous craftsmanship
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] bg-white font-extrabold text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-300">
                0% Platform Fee
              </span>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-[#E8E2D6] bg-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs text-stone-500">Price:</span>
            <span className="text-2xl font-serif font-black text-[#2B231D]">
              ₹{listing.price}
            </span>
            {listing.priceRangeINR && (
              <span className="text-xs text-stone-400">
                (Fair range: ₹{listing.priceRangeINR.min} - ₹{listing.priceRangeINR.max})
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {listing.isUserListing && onEditListing && (
              <button
                type="button"
                id="buyer-modal-edit-listing-btn"
                onClick={() => {
                  onClose();
                  onEditListing(listing);
                }}
                className="py-2.5 px-3 bg-white hover:bg-stone-100 text-[#2B231D] font-bold text-xs rounded-xl border border-[#E8E2D6] transition"
              >
                Edit Listing
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs rounded-xl border border-[#E8E2D6] flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-600" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="buyer-modal-whatsapp-inquire-btn"
              onClick={handleWhatsAppInquiry}
              className="flex-1 sm:flex-initial py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Artisan on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
