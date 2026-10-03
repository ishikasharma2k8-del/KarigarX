import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Store,
  Eye,
  Plus,
  Share2,
  MapPin,
  Tag,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PublishedListing, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';
import officialLogoImg from '../assets/images/karigarx_official_logo_1788090855222.jpg';

interface PublishSuccessModalProps {
  isOpen: boolean;
  isPublishing: boolean;
  listing: PublishedListing | null;
  currentLang: SupportedLanguage;
  onViewInMarketplace: (listingId: string) => void;
  onViewMyListings: () => void;
  onCreateAnother: () => void;
  onClose: () => void;
}

export const PublishSuccessModal: React.FC<PublishSuccessModalProps> = ({
  isOpen,
  isPublishing,
  listing,
  currentLang,
  onViewInMarketplace,
  onViewMyListings,
  onCreateAnother,
  onClose,
}) => {
  if (!isOpen) return null;
  const t = UI_STRINGS[currentLang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#E8E2D6] relative">
        {isPublishing ? (
          /* Publishing Loading Animation State */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-[#b84c28] animate-spin" />
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] p-1 flex items-center justify-center shadow-inner">
                <img
                  src={officialLogoImg}
                  alt="KarigarX Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-full bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-serif font-bold text-[#2B231D]">
                {t.publishingListing}
              </h3>
              <p className="text-xs text-[#7A6E63] max-w-xs mx-auto">
                Validating craft provenance, tags, and syncing with KarigarX National Artisan Marketplace...
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6] space-y-2 text-left text-xs text-stone-600">
              <div className="flex items-center gap-2 font-medium text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Catalog Metadata Formatted</span>
              </div>
              <div className="flex items-center gap-2 font-medium text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fair Trade Price & INR Currency Verified</span>
              </div>
              <div className="flex items-center gap-2 font-medium text-[#b84c28] animate-pulse">
                <span className="w-4 h-4 rounded-full border-2 border-[#b84c28] border-t-transparent animate-spin inline-block shrink-0" />
                <span>Deploying Live Listing & Artisan Badge...</span>
              </div>
            </div>
          </div>
        ) : listing ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 space-y-5 text-center">
            {/* Top Confetti & Trophy Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto shadow-sm ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>STATUS: LIVE IN MARKETPLACE</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231D]">
                🎉 Your product is now live on KarigarX Marketplace!
              </h2>
              <p className="text-xs text-[#7A6E63] max-w-sm mx-auto">
                Buyers across India can now discover, view, and directly inquire about your authentic handcrafted creation.
              </p>
            </div>

            {/* Live Product Preview Snippet */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8E2D6] flex items-center gap-3.5 text-left">
              <img
                src={listing.imageUrl}
                alt={listing.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border border-[#E8E2D6] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] uppercase font-bold text-[#b84c28] tracking-wider truncate">
                    {listing.category}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded-md">
                    LIVE
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#2B231D] truncate">{listing.name}</h4>
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <span className="font-serif font-bold text-[#2B231D]">₹{listing.price}</span>
                  <span className="text-[11px] text-stone-500 flex items-center gap-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#b84c28]" />
                    {listing.artisanLocation}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                id="modal-view-marketplace-btn"
                onClick={() => onViewInMarketplace(listing.id)}
                className="w-full py-3 px-5 rounded-xl bg-[#b84c28] hover:bg-[#a23f1e] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
              >
                <Store className="w-4 h-4" />
                <span>View Product on Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="modal-view-my-listings-btn"
                  onClick={onViewMyListings}
                  className="py-2.5 px-3 bg-white hover:bg-stone-50 text-[#2B231D] border border-[#E8E2D6] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[#b84c28]" />
                  <span>My Published Listings</span>
                </button>

                <button
                  type="button"
                  id="modal-create-another-btn"
                  onClick={onCreateAnother}
                  className="py-2.5 px-3 bg-[#FAF7F2] hover:bg-[#EDE5DA] text-[#2B231D] border border-[#E8E2D6] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5 text-[#b84c28]" />
                  <span>Create Another</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
