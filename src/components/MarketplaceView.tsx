import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Sparkles,
  Share2,
  PhoneCall,
  Search,
  Filter,
  CheckCircle2,
  IndianRupee,
  ShoppingBag,
  Eye,
  ShieldCheck,
  Tag,
  Plus,
  Trash2,
  Edit3,
  Layers,
  Check,
  Flame,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';
import { PublishedListing, ProductAnalysis, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';
import officialLogoImg from '../assets/images/karigarx_official_logo_1788090855222.jpg';

interface MarketplaceViewProps {
  currentLang: SupportedLanguage;
  publishedListings: PublishedListing[];
  userCatalog: ProductAnalysis[];
  onViewProduct: (listing: PublishedListing) => void;
  onEditListing: (listing: PublishedListing) => void;
  onDeleteListing: (listingId: string) => void;
  onOpenScanner: () => void;
  initialTab?: 'all' | 'my-listings';
  highlightListingId?: string | null;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  currentLang,
  publishedListings,
  userCatalog,
  onViewProduct,
  onEditListing,
  onDeleteListing,
  onOpenScanner,
  initialTab = 'all',
  highlightListingId = null,
}) => {
  const t = UI_STRINGS[currentLang];
  const [activeTab, setActiveTab] = useState<'all' | 'my-listings'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Pottery & Clay Art',
    'Metal Craft',
    'Textiles & Weaving',
    'Woodwork & Toys',
    'Ceramics & Glaze',
    'Eco & Natural Fiber',
  ];

  const userListingsCount = publishedListings.filter((item) => item.isUserListing).length;

  const displayedListings = publishedListings.filter((item) => {
    // Tab filter
    if (activeTab === 'my-listings' && !item.isUserListing) {
      return false;
    }

    // Category filter
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (item.craftStyle && item.craftStyle.toLowerCase().includes(selectedCategory.toLowerCase()));

    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artisanLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleShare = (listing: PublishedListing, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Explore handcrafted "${listing.name}" (₹${listing.price}) by ${listing.artisanName} from ${listing.artisanLocation} on KarigarX Marketplace!`;
    if (navigator.share) {
      navigator.share({ title: listing.name, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(listing.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Marketplace Top Hero Banner */}
      <div className="bg-gradient-to-br from-[#2B231D] via-[#3D2D23] to-[#8C4626] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Right side floating logo badge on larger screens */}
        <div className="order-2 md:order-2 shrink-0 hidden sm:flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-white/10 backdrop-blur-md border border-amber-300/30 shadow-xl flex items-center justify-center">
            <img
              src={officialLogoImg}
              alt="KarigarX Marketplace Emblem"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain rounded-full bg-[#FAF7F2]"
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200 mt-1.5">
            Verified Origin
          </span>
        </div>

        <div className="order-1 md:order-1 relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold border border-white/20 backdrop-blur-xs">
            <img
              src={officialLogoImg}
              alt="KarigarX Logo"
              referrerPolicy="no-referrer"
              className="w-4 h-4 rounded-full object-contain bg-white shrink-0"
            />
            <span>KarigarX National Artisan Marketplace</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
            Direct from India's Master Artisans to Conscious Buyers
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            Eliminating middlemen. Every purchase directly empowers verified rural karigars, weavers, and craft clusters with 100% fair trade realization.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="marketplace-create-listing-btn"
              onClick={onOpenScanner}
              className="py-2.5 px-5 bg-[#b84c28] hover:bg-[#a23f1e] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Product</span>
            </button>

            <button
              type="button"
              id="marketplace-my-listings-toggle-btn"
              onClick={() => setActiveTab('my-listings')}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition flex items-center gap-2 ${
                activeTab === 'my-listings'
                  ? 'bg-amber-100 text-stone-900 border-amber-300 shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>My Published Listings ({userListingsCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs: All Marketplace vs My Listings */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-[#E8E2D6] shadow-2xs">
        <div className="flex gap-2">
          <button
            type="button"
            id="tab-all-marketplace-btn"
            onClick={() => setActiveTab('all')}
            className={`flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'all'
                ? 'bg-[#2B231D] text-white shadow-xs'
                : 'text-[#5A5046] hover:bg-stone-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>All Marketplace ({publishedListings.length})</span>
          </button>

          <button
            type="button"
            id="tab-my-listings-btn"
            onClick={() => setActiveTab('my-listings')}
            className={`flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'my-listings'
                ? 'bg-[#b84c28] text-white shadow-xs'
                : 'text-[#5A5046] hover:bg-stone-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>My Listings ({userListingsCount})</span>
            {userListingsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>

        <div className="text-xs text-stone-500 px-2 font-medium flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>0% Platform Commission • 100% Direct Artisan Trade</span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="marketplace-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, artisan, region, or tags..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E2D6] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#b84c28] text-stone-900 shadow-2xs"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#b84c28] text-white shadow-xs'
                    : 'bg-white text-[#6E645A] border border-[#E8E2D6] hover:bg-[#FAF7F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State when no items match */}
      {displayedListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D6] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] text-[#b84c28] border border-[#E8E2D6] flex items-center justify-center mx-auto">
            <Store className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-bold text-[#2B231D]">
              {activeTab === 'my-listings'
                ? 'No Published Listings in Your Store Yet'
                : 'No Products Match Your Filter'}
            </h3>
            <p className="text-xs sm:text-sm text-[#7A6E63] max-w-sm mx-auto">
              {activeTab === 'my-listings'
                ? 'Scan your handcrafted craft or speak to create an instant listing, then click "Publish Listing" to go live on KarigarX Marketplace.'
                : 'Try adjusting your search keyword or selecting a different craft category.'}
            </p>
          </div>
          {activeTab === 'my-listings' && (
            <button
              type="button"
              onClick={onOpenScanner}
              className="py-3 px-6 bg-[#b84c28] hover:bg-[#a23f1e] text-white text-xs sm:text-sm font-bold rounded-2xl transition shadow-md inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create & Publish Your First Listing</span>
            </button>
          )}
        </div>
      ) : (
        /* Professional Marketplace Product Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedListings.map((listing) => {
            const isHighlighted = highlightListingId === listing.id;

            return (
              <div
                key={listing.id}
                id={`marketplace-card-${listing.id}`}
                className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-xl ${
                  isHighlighted
                    ? 'ring-4 ring-[#b84c28] border-[#b84c28] shadow-lg animate-pulse'
                    : 'border-[#E8E2D6] shadow-xs hover:border-[#b84c28]'
                }`}
              >
                {/* Product Image Section */}
                <div className="relative aspect-[4/3] w-full bg-stone-900 overflow-hidden">
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges: Category & LIVE Status */}
                  <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2 z-10">
                    <span className="bg-black/80 backdrop-blur text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                      {listing.category}
                    </span>

                    {/* LIVE Status Badge as required */}
                    <span className="bg-emerald-600/90 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-400 flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>{listing.status}</span>
                    </span>
                  </div>

                  {/* Location Pin Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur text-stone-200 text-xs font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1 border border-white/15">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate max-w-[170px]">{listing.artisanLocation}</span>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 text-[#2B231D] text-sm font-serif font-black px-3 py-1 rounded-xl shadow-md">
                    ₹{listing.price}
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Artisan Name with Verified Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#7A6E63]">
                        <span className="w-5 h-5 rounded-full bg-[#FAF7F2] text-[#b84c28] border border-[#E8E2D6] flex items-center justify-center font-bold text-[10px]">
                          {listing.artisanName.charAt(0)}
                        </span>
                        <span className="font-bold text-[#2B231D] truncate max-w-[140px]">
                          {listing.artisanName}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </div>

                      {listing.isUserListing ? (
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                          My Listing
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-500 font-medium">
                          GI Heritage
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base font-serif font-bold text-[#2B231D] group-hover:text-[#b84c28] transition line-clamp-1 leading-snug">
                      {listing.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#5A5046] line-clamp-2 leading-relaxed">
                      {listing.description}
                    </p>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {listing.tags?.slice(0, 3).map((tg, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-mono"
                        >
                          {tg.startsWith('#') ? tg : `#${tg}`}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Buttons */}
                  <div className="space-y-2 pt-3 border-t border-stone-100">
                    {/* Primary Button: View Product as requested */}
                    <button
                      type="button"
                      id={`view-product-btn-${listing.id}`}
                      onClick={() => onViewProduct(listing)}
                      className="w-full py-2.5 px-4 bg-[#2B231D] hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-98"
                    >
                      <Eye className="w-4 h-4 text-amber-300" />
                      <span>{t.viewProduct}</span>
                    </button>

                    {/* Secondary Actions for Artisan (Edit / Delete if user's listing, or WhatsApp Share) */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      {listing.isUserListing ? (
                        <>
                          <button
                            type="button"
                            id={`edit-listing-btn-${listing.id}`}
                            onClick={() => onEditListing(listing)}
                            className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg flex items-center justify-center gap-1 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#b84c28]" />
                            <span>{t.editListing}</span>
                          </button>

                          <button
                            type="button"
                            id={`delete-listing-btn-${listing.id}`}
                            onClick={() => onDeleteListing(listing.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                            title="Remove listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleShare(listing, e)}
                          className="flex-1 py-1.5 px-2 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition border border-stone-200"
                        >
                          {copiedId === listing.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-stone-600" />
                              <span>Share Listing</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
