import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Edit3,
  BookmarkPlus,
  BookmarkCheck,
  RotateCcw,
  Share2,
  Tag,
  CheckCircle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Eye,
  ShoppingBag,
  Award,
  MapPin,
  Bot,
  Instagram,
  Check,
  MessageCircle,
} from 'lucide-react';
import { ProductAnalysis, SupportedLanguage, AgentInstagramPost } from '../types';
import { UI_STRINGS } from '../translations';
import { speakProductDetails, stopSpeech } from '../utils/speech';

interface ProductCardViewProps {
  product: ProductAnalysis;
  currentLang: SupportedLanguage;
  isSavedInCatalog: boolean;
  isPublished?: boolean;
  isPublishing?: boolean;
  publishingStep?: number;
  publishError?: string | null;
  onSaveToCatalog: () => void;
  onEditDetails: () => void;
  onPublishListing: () => void;
  onScanAnother: () => void;
  onViewMyProducts?: () => void;
  artisanName?: string;
  artisanLocation?: string;
  agentActivity?: string[];
  instagramPost?: AgentInstagramPost | null;
  publicationResult?: any;
}

export const ProductCardView: React.FC<ProductCardViewProps> = ({
  product,
  currentLang,
  isSavedInCatalog,
  isPublished = false,
  isPublishing = false,
  publishingStep = 0,
  publishError = null,
  onSaveToCatalog,
  onEditDetails,
  onPublishListing,
  onScanAnother,
  onViewMyProducts,
  artisanName = 'Rameshwar Das',
  artisanLocation = 'Varanasi, Uttar Pradesh',
  agentActivity,
  instagramPost,
  publicationResult,
}) => {
  const t = UI_STRINGS[currentLang];
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [draftToast, setDraftToast] = useState<boolean>(false);
  const [customerInquirySent, setCustomerInquirySent] = useState<boolean>(false);
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);

  // Default agent activity if not provided
  const displayAgentActivity: string[] =
    agentActivity && agentActivity.length > 0
      ? agentActivity
      : isPublished
      ? [
          'Human approval received',
          'Publishing to KarigarX',
          'KarigarX publication completed',
          'Attempting Instagram publication',
          'Verifying publication',
          'Publication verified',
        ]
      : [
          'Product received',
          'Product identified',
          'Material detected',
          'Listing created',
          'Price recommendation generated',
          'Instagram post prepared',
          'Waiting for artisan approval',
        ];

  // Fallback artisan information
  const displayArtisanName = product.artisan?.name || product.artisanName || artisanName;
  const displayArtisanLocation = product.artisan?.location || product.artisanLocation || artisanLocation;

  // Title, Price & Image
  const displayTitle = product.title || product.name || 'Handcrafted Artisan Product';
  const displayPrice = product.price || product.suggestedPriceINR || 500;
  const displayImage =
    product.image ||
    product.imageUrl ||
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80';

  // Material extraction
  const displayMaterial =
    product.material ||
    (Array.isArray(product.materials) && product.materials.length > 0 ? product.materials[0] : null);

  // Highlights extraction (3 to 5 short bullet points)
  const displayHighlights: string[] =
    Array.isArray(product.highlights) && product.highlights.length > 0
      ? product.highlights
      : Array.isArray(product.sellingPoints) && product.sellingPoints.length > 0
      ? product.sellingPoints
      : [];

  // Instagram Post Data (from agent response or generated fallback)
  const effectiveInstagramPost: AgentInstagramPost = instagramPost || {
    caption: `✨ Introducing "${displayTitle}" by Master Artisan ${displayArtisanName} from ${displayArtisanLocation}.\n\n🎨 Craft Tradition: ${
      product.craftStyle || 'Indian Handicraft'
    }\n🧵 Material: ${displayMaterial || 'Natural Materials'}\n💰 Fair Price: ₹${displayPrice}\n\n"${
      product.description || 'Artisanal craft handmade using ancestral techniques.'
    }"\n\n🤝 Direct Karigar Trade • 0% Middlemen\n🛒 Inquire directly on KarigarX.`,
    hashtags:
      product.tags && product.tags.length > 0
        ? product.tags
        : ['#KarigarX', '#HandmadeInIndia', '#VocalForLocal', '#IndianArtisans', '#HandcraftedArt'],
    image: displayImage,
    platform: 'Instagram',
    status: 'READY_FOR_APPROVAL',
  };

  // Audio Toggle with Telugu (te-IN), Tamil (ta-IN), Hindi (hi-IN), English (en-IN)
  const handleAudioToggle = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      speakProductDetails(
        product,
        currentLang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleSaveDraftClick = () => {
    onSaveToCatalog();
    setDraftToast(true);
    setTimeout(() => setDraftToast(false), 3000);
  };

  const handleCopyCaption = () => {
    const fullPost = `${effectiveInstagramPost.caption}\n\n${effectiveInstagramPost.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullPost);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleShareClick = () => {
    const text = `✨ ${displayTitle}
🏷️ Category: ${product.category}
🧵 Material: ${displayMaterial || 'Natural Materials'}
💰 Fair Price: ₹${displayPrice}
👤 Artisan: ${displayArtisanName} (${displayArtisanLocation})

${product.description}

Handmade with KarigarX Agent`;

    if (navigator.share) {
      navigator.share({ title: displayTitle, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // =========================================================================
  // STATE 2: PUBLISHED SUCCESS STATE ("🎉 Product Published")
  // =========================================================================
  if (isPublished) {
    const actualPubId =
      publicationResult?.publicationId ||
      publicationResult?.karigarx?.publicationId ||
      product.id ||
      'kx-pub-live';

    const instagramResult = publicationResult?.instagram;
    const isInstagramPublished =
      instagramResult?.success === true && instagramResult?.status === 'PUBLISHED';

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-24">
        {/* Publication Result Banner */}
        <div className="bg-emerald-50 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md text-3xl">
                🎉
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif font-black text-emerald-950">
                  🎉 Product Published
                </h2>
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="text-xs font-bold text-emerald-800">Publication ID:</span>
                  <code className="text-xs font-mono font-bold text-emerald-900 bg-white border border-emerald-300 px-2.5 py-0.5 rounded-lg shadow-2xs">
                    {actualPubId}
                  </code>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onViewMyProducts && (
                <button
                  type="button"
                  id="success-view-my-products-btn"
                  onClick={onViewMyProducts}
                  className="flex-1 sm:flex-initial py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-300" />
                  <span>My Products</span>
                </button>
              )}
              <button
                type="button"
                id="success-scan-another-btn"
                onClick={onScanAnother}
                className="flex-1 sm:flex-initial py-2.5 px-4 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-emerald-700" />
                <span>Scan Another</span>
              </button>
            </div>
          </div>

          {/* Platform Status */}
          <div className="p-4 bg-white/95 backdrop-blur rounded-2xl border border-emerald-200/80 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-950 block">
              Platform:
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>✓ KarigarX Marketplace</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                  Verified & Live
                </span>
              </div>

              <div
                className={`flex items-center justify-between text-xs sm:text-sm font-bold p-2.5 rounded-xl border ${
                  isInstagramPublished
                    ? 'bg-emerald-50/80 text-emerald-800 border-emerald-200'
                    : instagramResult?.status === 'FAILED'
                    ? 'bg-rose-50/80 text-rose-900 border-rose-200'
                    : 'bg-amber-50/80 text-amber-900 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isInstagramPublished ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>✓ Instagram</span>
                    </>
                  ) : instagramResult?.status === 'FAILED' ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>⚠ Instagram: Publishing Failed</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>⚠ Instagram: Not connected</span>
                    </>
                  )}
                </div>
                <span className="text-[11px] font-medium text-stone-600">
                  {isInstagramPublished
                    ? `Post #${instagramResult?.publicationId || instagramResult?.postId || 'Live'}`
                    : instagramResult?.status === 'FAILED'
                    ? instagramResult?.message || 'Meta API error'
                    : 'Instagram is not connected yet.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Activity Section in Published State */}
        <div className="bg-[#FAF7F2] border border-[#E8E2D6] rounded-3xl p-5 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#E8E2D6] pb-2">
            <div className="flex items-center gap-2 text-[#2B231D]">
              <span className="text-base">🤖</span>
              <h3 className="font-bold text-xs sm:text-sm font-sans tracking-tight">
                KarigarX Agent Publishing Activity
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Verified Pipeline
            </span>
          </div>

          <div className="space-y-2">
            {displayAgentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-xs text-stone-800 bg-white p-2.5 rounded-xl border border-stone-200/70"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Storefront View Card */}
        <div className="bg-white rounded-3xl border border-[#E8E2D6] shadow-md overflow-hidden">
          <div className="bg-[#2B231D] text-amber-200 px-5 py-2.5 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="font-bold tracking-wide">Customer View • Public Marketplace Listing</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Direct Trade</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left: Product Image */}
            <div className="md:col-span-6 relative bg-stone-950 flex flex-col justify-between min-h-[380px]">
              <img
                src={displayImage}
                alt={displayTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-4 inset-x-4 flex items-start justify-between gap-2 z-10">
                <span className="bg-black/75 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  {product.craftStyle}
                </span>
                <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-400 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between z-10 gap-2">
                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl text-[#2B231D] shadow-lg">
                  <span className="text-[10px] text-[#7A6E63] font-bold block uppercase tracking-wider">
                    Customer Price
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-serif font-black text-[#2B231D]">
                      ₹{displayPrice}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">Free Delivery</span>
                  </div>
                </div>

                {displayMaterial && (
                  <div className="bg-black/75 backdrop-blur-md text-stone-200 text-xs font-bold px-3 py-2 rounded-xl border border-white/20">
                    {displayMaterial}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Customer Product Details */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b84c28] bg-amber-100 px-2.5 py-1 rounded-lg">
                    {product.category}
                  </span>

                  <button
                    type="button"
                    onClick={handleAudioToggle}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 border ${
                      isSpeaking
                        ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                        : 'bg-[#FAF7F2] text-[#2B231D] border-[#E8E2D6] hover:bg-stone-200'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>{t.stopSpeaking || 'Stop Voice'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#b84c28]" />
                        <span>{t.speakDetails || 'Listen Audio'}</span>
                      </>
                    )}
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B231D] leading-tight">
                  {displayTitle}
                </h1>

                {displayMaterial && (
                  <div className="flex items-center gap-2 text-xs text-[#5A5046]">
                    <span className="font-bold text-[#2B231D]">Material:</span>
                    <span className="bg-[#FAF7F2] px-2.5 py-0.5 rounded-md border border-[#E8E2D6] font-medium text-[#b84c28]">
                      {displayMaterial}
                    </span>
                  </div>
                )}

                {product.description && (
                  <p className="text-xs sm:text-sm text-[#5A5046] leading-relaxed">
                    {product.description}
                  </p>
                )}

                {displayHighlights.length > 0 && (
                  <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8E2D6] space-y-2">
                    <span className="text-xs font-bold text-[#2B231D] block">
                      Product Highlights:
                    </span>
                    <div className="space-y-1.5">
                      {displayHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#b84c28] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                      {displayArtisanName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#2B231D]">{displayArtisanName}</span>
                        <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      </div>
                      <span className="text-[11px] text-[#7A6E63] flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-[#b84c28]" />
                        {displayArtisanLocation}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-white text-emerald-800 font-extrabold px-2 py-1 rounded-md border border-emerald-200">
                    Verified Karigar
                  </span>
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-mono"
                      >
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomerInquirySent(true);
                      setTimeout(() => setCustomerInquirySent(false), 3000);
                    }}
                    className="py-3 px-4 rounded-xl bg-[#2B231D] hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-amber-400" />
                    <span>{customerInquirySent ? '✓ Inquiry Sent' : 'Inquire / Buy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareClick}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-stone-50 text-[#2B231D] border border-[#E8E2D6] font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <Share2 className="w-4 h-4 text-[#b84c28]" />
                    <span>{copied ? '✓ Copied' : 'Share Product'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onEditDetails}
                    className="text-xs font-bold text-[#b84c28] hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Listing</span>
                  </button>

                  {onViewMyProducts && (
                    <button
                      type="button"
                      onClick={onViewMyProducts}
                      className="text-xs font-bold text-stone-700 hover:text-stone-900 flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>View in My Products</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE 1: PRODUCT LISTING PREVIEW (Before Publishing)
  // =========================================================================
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-24">
      {/* Toast Notification when Draft is Saved */}
      {draftToast && (
        <div className="bg-emerald-500 text-white p-3.5 rounded-2xl shadow-lg flex items-center justify-between text-xs font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>✓ Product saved as Draft in "My Products"!</span>
          </div>
          {onViewMyProducts && (
            <button
              type="button"
              onClick={onViewMyProducts}
              className="bg-white text-emerald-800 px-3 py-1 rounded-lg text-xs hover:bg-emerald-50 font-bold"
            >
              View My Products
            </button>
          )}
        </div>
      )}

      {/* Screen Header & Audio Guidance */}
      <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-3xl border border-[#E8E2D6] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-[#b84c28] border border-[#E8E2D6] flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b84c28] bg-amber-100/80 px-2 py-0.5 rounded-md">
                Agentic Workflow
              </span>
              <span className="text-[11px] font-bold text-stone-600 bg-stone-200/80 px-2 py-0.5 rounded-md">
                Awaiting Approval
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#2B231D]">
              Generated Product Listing
            </h2>
            <p className="text-xs text-[#7A6E63]">
              Review the AI-generated craft title, description, material, highlights, fair price, and Instagram post.
            </p>
          </div>
        </div>

        {/* Audio Speech Button (English, Hindi, Telugu, Tamil) */}
        <button
          type="button"
          id="listen-review-audio-btn"
          onClick={handleAudioToggle}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition active:scale-95 border ${
            isSpeaking
              ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
              : 'bg-[#2B231D] text-amber-200 border-[#2B231D] hover:bg-stone-800'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>{t.stopSpeaking || 'Stop Voice'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{t.speakDetails || 'Listen Audio'}</span>
            </>
          )}
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. AGENT ACTIVITY SECTION                                      */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl border border-[#E8E2D6] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base">🤖</span>
            <span className="font-serif font-extrabold text-sm text-[#2B231D]">KarigarX Agent</span>
          </div>
          <span className="text-[10px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
            Pipeline Executed
          </span>
        </div>

        <div className="space-y-2">
          {displayAgentActivity.map((activity, idx) => {
            const isWaiting = activity.toLowerCase().includes('waiting');

            return (
              <div
                key={idx}
                className={`flex items-center gap-2.5 text-xs transition-colors ${
                  isWaiting
                    ? 'text-amber-950 font-bold bg-amber-50/90 p-2 rounded-xl border border-amber-200/70'
                    : 'text-stone-800 font-medium'
                }`}
              >
                {isWaiting ? (
                  <span className="text-sm shrink-0">⏳</span>
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>
                  {isWaiting
                    ? `⏳ ${activity}`
                    : activity.startsWith('✓')
                    ? activity
                    : `✓ ${activity}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. COMPLETE PRODUCT LISTING CARD                               */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl border border-[#E8E2D6] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left Column: Product Image */}
        <div className="md:col-span-5 relative bg-stone-900 overflow-hidden flex flex-col justify-between min-h-[380px]">
          <img
            src={displayImage}
            alt={displayTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

          {/* Badges atop the image */}
          <div className="absolute top-4 inset-x-4 flex items-start justify-between gap-2 z-10">
            {product.craftStyle && (
              <span className="bg-black/85 backdrop-blur-sm text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-white/20 shadow-xs">
                {product.craftStyle}
              </span>
            )}
            <span className="bg-black/85 backdrop-blur-sm text-stone-200 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
              {product.category}
            </span>
          </div>

          {/* Bottom Bar: Suggested Price Badge */}
          <div className="absolute bottom-4 inset-x-4 z-10 space-y-2">
            <div className="bg-black/90 backdrop-blur-md border border-amber-400/50 p-3.5 rounded-2xl text-white shadow-lg">
              <span className="text-[10px] text-amber-300 font-bold block uppercase tracking-wider">
                Suggested Selling Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-black text-amber-400">
                  ₹{displayPrice}
                </span>
                {product.priceRangeINR && (
                  <span className="text-[11px] text-stone-300">
                    (₹{product.priceRangeINR.min} - ₹{product.priceRangeINR.max})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Listing Details */}
        <div className="md:col-span-7 p-6 sm:p-8 space-y-5">
          {/* Artisan Information */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8E2D6] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#b84c28] text-white flex items-center justify-center font-serif font-bold text-xs">
                {displayArtisanName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#2B231D]">{displayArtisanName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
                <span className="text-[11px] text-[#7A6E63] flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-[#b84c28]" />
                  {displayArtisanLocation}
                </span>
              </div>
            </div>

            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-md border border-amber-200">
              Verified Artisan
            </span>
          </div>

          {/* Product Title & Category */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b84c28]">
                {product.category}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231D] leading-tight">
              {displayTitle}
            </h1>
          </div>

          {/* Material */}
          {displayMaterial && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#7A6E63]">Material:</span>
              <span className="font-bold text-[#2B231D] bg-[#FAF7F2] border border-[#E8E2D6] px-3 py-1 rounded-lg">
                {displayMaterial}
              </span>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#7A6E63] block">Description</span>
              <p className="text-xs sm:text-sm text-[#5A5046] leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Highlights (3 to 5 bullet points) */}
          {displayHighlights.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-[#8C4626] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#b84c28]" />
                <span>Product Highlights</span>
              </span>
              <div className="space-y-1.5">
                {displayHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Price & Explanation */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D6] space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-[#2B231D]">Suggested Price:</span>
              <span className="text-base font-serif font-bold text-[#b84c28]">₹{displayPrice}</span>
            </div>
            {product.priceExplanation && (
              <div className="pt-2 border-t border-[#E8E2D6] text-xs text-[#5A5046]">
                <span className="font-bold text-[#2B231D] block mb-0.5">
                  How this price was determined:
                </span>
                <p className="text-[11px] leading-relaxed text-[#7A6E63] italic">
                  {product.priceExplanation}
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#7A6E63] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#b84c28]" />
                <span>Tags</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full border border-stone-200 font-mono"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. INSTAGRAM POST PREVIEW (Caption & Hashtags)                  */}
      {/* ============================================================== */}
      <div className="bg-white rounded-3xl border border-[#E8E2D6] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Instagram Post Prepared</h3>
              <p className="text-[11px] text-stone-500">
                Story, caption, and hashtags prepared by the agent for Meta integration.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
              Ready for Approval
            </span>
            <button
              type="button"
              onClick={handleCopyCaption}
              className="py-1 px-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              {copiedCaption ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
              <span>{copiedCaption ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Instagram Caption */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-stone-700 block">Instagram Caption:</span>
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-800 whitespace-pre-line leading-relaxed font-sans">
            {effectiveInstagramPost.caption}
          </div>
        </div>

        {/* Instagram Hashtags */}
        {effectiveInstagramPost.hashtags && effectiveInstagramPost.hashtags.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-stone-700 block">Instagram Hashtags:</span>
            <div className="flex flex-wrap gap-1.5">
              {effectiveInstagramPost.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] bg-pink-50 text-pink-700 border border-pink-200 px-2.5 py-0.5 rounded-full font-mono font-medium"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. HUMAN APPROVAL SECTION ("Your product is ready to publish") */}
      {/* Buttons: [ Edit ]    [ Save Draft ]    [ Approve & Publish ]     */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/80 border-2 border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                Human-in-the-Loop Approval
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-black text-stone-900">
              Your product is ready to publish
            </h3>
            <p className="text-xs text-stone-600">
              The agent has prepared your KarigarX listing and Instagram post. Review the details above and give your final approval to publish.
            </p>
          </div>
        </div>

        {/* Publication Error Banner (if publication failed) */}
        {publishError && (
          <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start gap-3 text-rose-900 text-xs shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-bold text-sm">KarigarX Publishing Error</p>
              <p className="text-rose-800">{publishError}</p>
              <button
                type="button"
                onClick={onPublishListing}
                className="mt-2 inline-flex items-center gap-1.5 font-bold text-rose-700 bg-white px-3 py-1.5 rounded-lg border border-rose-300 hover:bg-rose-100 transition shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Publication</span>
              </button>
            </div>
          </div>
        )}

        {/* Publishing Progress State Indicator */}
        {isPublishing && (
          <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-4 space-y-2.5 animate-pulse">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
              <Bot className="w-4 h-4 text-amber-700 animate-spin" />
              <span>Executing KarigarX Agent Publishing Pipeline...</span>
            </div>
            <div className="space-y-1.5 text-xs text-stone-800 font-medium pl-6">
              <div className="flex items-center gap-2">
                {publishingStep >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="shrink-0">⏳</span>
                )}
                <span className={publishingStep >= 2 ? 'font-bold text-emerald-900' : 'text-stone-800'}>
                  {publishingStep >= 2 ? '✓ Published to KarigarX' : 'Publishing to KarigarX...'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="shrink-0">⏳</span>
                <span>Publishing to Instagram...</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="shrink-0">⏳</span>
                <span>Verifying publication...</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons: [ Edit ]  [ Save Draft ]  [ Approve & Publish ] */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Edit Button */}
          <button
            type="button"
            id="edit-listing-btn"
            onClick={onEditDetails}
            disabled={isPublishing}
            className="py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-white hover:bg-stone-50 text-[#2B231D] border-2 border-stone-200 flex items-center justify-center gap-2 transition active:scale-98 shadow-xs disabled:opacity-50"
          >
            <Edit3 className="w-4 h-4 text-[#b84c28]" />
            <span>Edit</span>
          </button>

          {/* Save Draft Button */}
          <button
            type="button"
            id="save-draft-btn"
            onClick={handleSaveDraftClick}
            disabled={isPublishing}
            className={`py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm border-2 flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-50 ${
              isSavedInCatalog
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white hover:bg-stone-50 text-[#5A5046] border-stone-200'
            }`}
          >
            {isSavedInCatalog ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                <span>✓ Draft Saved</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4 text-stone-600" />
                <span>Save Draft</span>
              </>
            )}
          </button>

          {/* Approve & Publish Button */}
          <button
            type="button"
            id="approve-and-publish-btn"
            onClick={onPublishListing}
            disabled={isPublishing}
            className="py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm bg-[#b84c28] hover:bg-[#a23f1e] text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition active:scale-98 disabled:opacity-60"
          >
            {isPublishing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Approve & Publish</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Secondary utilities */}
        <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
          <button
            type="button"
            onClick={onScanAnother}
            className="hover:text-[#b84c28] font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another Item</span>
          </button>

          {onViewMyProducts && (
            <button
              type="button"
              onClick={onViewMyProducts}
              className="hover:text-[#b84c28] font-semibold flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Go to My Products</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
