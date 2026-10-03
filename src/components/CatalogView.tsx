import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  Trash2,
  Share2,
  Eye,
  IndianRupee,
  Download,
  Filter,
  CheckCircle2,
  Rocket,
  Store,
  Bookmark,
  ShoppingBag,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ProductAnalysis, SupportedLanguage } from '../types';
import { UI_STRINGS } from '../translations';

interface CatalogViewProps {
  catalog: ProductAnalysis[];
  currentLang: SupportedLanguage;
  onSelectProduct: (product: ProductAnalysis) => void;
  onDeleteProduct: (id: string) => void;
  onPublishDirect?: (product: ProductAnalysis) => void;
  onStartScan: () => void;
  onNavigateToMarketplace?: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  catalog,
  currentLang,
  onSelectProduct,
  onDeleteProduct,
  onPublishDirect,
  onStartScan,
  onNavigateToMarketplace,
}) => {
  const t = UI_STRINGS[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'drafts'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(catalog.map((item) => item.category)))];

  const publishedCount = catalog.filter((c) => c.isPublished || c.status === 'PUBLISHED').length;
  const draftsCount = catalog.length - publishedCount;

  const filteredCatalog = catalog.filter((item) => {
    // Status filter
    const isPub = Boolean(item.isPublished || item.status === 'PUBLISHED');
    if (statusFilter === 'published' && !isPub) return false;
    if (statusFilter === 'drafts' && isPub) return false;

    // Search filter
    const titleToSearch = (item.title || item.name || '').toLowerCase();
    const materialToSearch = (item.material || (item.materials && item.materials.join(' ')) || '').toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      titleToSearch.includes(query) ||
      item.craftStyle.toLowerCase().includes(query) ||
      materialToSearch.includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query));

    // Category filter
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const exportCatalogCSV = () => {
    if (catalog.length === 0) return;
    const headers = [
      'Title',
      'Category',
      'Material',
      'Craft Style',
      'Price INR',
      'Status',
      'Highlights Count',
      'Created Date',
    ];
    const rows = catalog.map((item) => [
      `"${(item.title || item.name).replace(/"/g, '""')}"`,
      `"${item.category}"`,
      `"${item.material || (item.materials && item.materials[0]) || ''}"`,
      `"${item.craftStyle}"`,
      item.price || item.suggestedPriceINR,
      item.isPublished || item.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      (item.highlights || item.sellingPoints || []).length,
      item.createdAt || item.scannedAt || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `KarigarX_Artisan_Products_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E2D6] shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231D]">
              My Products / Published Products
            </h1>
            {publishedCount > 0 && (
              <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {publishedCount} Published
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#7A6E63] mt-0.5">
            Manage your saved product drafts, view AI-generated listings, and check published items.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {catalog.length > 0 && (
            <button
              type="button"
              id="export-catalog-csv-btn"
              onClick={exportCatalogCSV}
              className="py-2.5 px-3.5 bg-white hover:bg-stone-50 text-[#2B231D] text-xs font-bold rounded-xl border border-[#E8E2D6] flex items-center gap-1.5 transition shadow-2xs"
            >
              <Download className="w-4 h-4 text-[#b84c28]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          )}

          <button
            type="button"
            id="catalog-scan-new-btn"
            onClick={onStartScan}
            className="flex-1 sm:flex-initial py-2.5 px-4 bg-[#b84c28] hover:bg-[#a23f1e] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Product</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs: All Products | Published Products | Saved Drafts */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-[#E8E2D6] shadow-2xs">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              statusFilter === 'all'
                ? 'bg-[#2B231D] text-white shadow-xs'
                : 'text-[#5A5046] hover:bg-stone-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>All Products ({catalog.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('published')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              statusFilter === 'published'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[#5A5046] hover:bg-stone-100'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Published ({publishedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('drafts')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              statusFilter === 'drafts'
                ? 'bg-[#b84c28] text-white shadow-xs'
                : 'text-[#5A5046] hover:bg-stone-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Drafts ({draftsCount})</span>
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title, material..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#E8E2D6] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#b84c28] text-[#2B231D]"
          />
        </div>
      </div>

      {/* Category Pills if more than 1 category exists */}
      {categories.length > 2 && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#b84c28] text-white'
                  : 'bg-white text-[#7A6E63] border border-[#E8E2D6] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {catalog.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D6] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] text-[#b84c28] border border-[#E8E2D6] flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-serif font-bold text-[#2B231D]">
              No Products Created Yet
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6E63] max-w-sm mx-auto">
              Scan your handcrafted craft or speak to generate product listings. You can review pricing, edit details, and publish directly.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartScan}
            className="py-3 px-6 bg-[#b84c28] hover:bg-[#a23f1e] text-white text-xs sm:text-sm font-bold rounded-2xl transition shadow-md inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Product</span>
          </button>
        </div>
      ) : filteredCatalog.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-[#E8E2D6] space-y-2">
          <h3 className="text-base font-bold text-[#2B231D]">No products found matching filter</h3>
          <p className="text-xs text-[#7A6E63]">
            Try changing the status tab or clearing the search keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatusFilter('all');
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-2 text-xs font-bold text-[#b84c28] underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Structured Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredCatalog.map((product) => {
            const isLive = Boolean(product.isPublished || product.status === 'PUBLISHED');
            const title = product.title || product.name || 'Handcrafted Product';
            const price = product.price || product.suggestedPriceINR;
            const material =
              product.material ||
              (product.materials && product.materials[0]) ||
              'Natural Materials';
            const highlights = product.highlights || product.sellingPoints || [];
            const displayImg = product.image || product.imageUrl;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white rounded-3xl border border-[#E8E2D6] overflow-hidden shadow-xs hover:border-[#b84c28] hover:shadow-md transition flex flex-col justify-between group"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                  <img
                    src={displayImg}
                    alt={title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />

                  {/* Top Badges: Category & Status */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between gap-1.5 z-10">
                    <span className="bg-black/75 backdrop-blur-sm text-stone-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20 truncate max-w-[150px]">
                      {product.category}
                    </span>

                    {/* Status Badge: PUBLISHED vs DRAFT */}
                    {isLive ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="bg-stone-800/85 text-stone-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        DRAFT
                      </span>
                    )}
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white text-[#2B231D] text-xs font-serif font-black px-2.5 py-1 rounded-xl shadow-xs">
                    ₹{price}
                  </div>

                  {/* Material Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-white/15">
                    {material}
                  </div>
                </div>

                {/* Structured Card Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-serif font-bold text-[#2B231D] line-clamp-1 group-hover:text-[#b84c28] transition">
                      {title}
                    </h3>
                    <p className="text-xs text-[#7A6E63] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Highlights bullet count */}
                    {highlights.length > 0 && (
                      <div className="pt-1 flex items-center gap-1 text-[11px] text-[#8C4626] font-medium">
                        <Sparkles className="w-3 h-3 text-[#b84c28]" />
                        <span>{highlights.length} Product Highlights</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 py-2 px-3 bg-[#FAF7F2] hover:bg-[#EFE5D7] text-[#2B231D] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#b84c28]" />
                        <span>View Product Listing</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteProduct(product.id)}
                        className="p-2 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Direct Publish button if currently a Draft */}
                    {!isLive && onPublishDirect && (
                      <button
                        type="button"
                        onClick={() => onPublishDirect(product)}
                        className="w-full py-1.5 px-3 bg-[#b84c28]/10 hover:bg-[#b84c28]/20 text-[#b84c28] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                      >
                        <Rocket className="w-3.5 h-3.5" />
                        <span>Publish to Store</span>
                      </button>
                    )}
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
