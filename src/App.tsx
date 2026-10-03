/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopNav, MainNavTab } from './components/TopNav';
import { HomeScreen } from './components/HomeScreen';
import { CameraScanner } from './components/CameraScanner';
import { LoadingAnalysis } from './components/LoadingAnalysis';
import { ProductCardView } from './components/ProductCardView';
import { EditProductModal } from './components/EditProductModal';
import { CatalogView } from './components/CatalogView';
import { MarketplaceView } from './components/MarketplaceView';
import { DashboardView } from './components/DashboardView';
import { VisualOrdersView } from './components/VisualOrdersView';
import { VisualHelpModal } from './components/VisualHelpModal';
import { PublishSuccessModal } from './components/PublishSuccessModal';
import { BuyerProductModal } from './components/BuyerProductModal';
import {
  ProductAnalysis,
  PublishedListing,
  SupportedLanguage,
  AnalyzeResponsePayload,
  ArtisanOrder,
  AgentInstagramPost,
} from './types';
import {
  getSavedPublishedListings,
  savePublishedListings,
  convertAnalysisToPublishedListing,
} from './data/marketplaceData';
import { getSavedOrders, saveOrders } from './data/ordersData';
import { UI_STRINGS } from './translations';
import { AlertCircle, RotateCcw } from 'lucide-react';

const CATALOG_STORAGE_KEY = 'karigarx_artisan_catalog';
const LANG_STORAGE_KEY = 'karigarx_artisan_lang';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as SupportedLanguage;
    return saved && ['en', 'hi', 'te', 'ta'].includes(saved) ? saved : 'en';
  });

  const [activeTab, setActiveTab] = useState<MainNavTab>('home');
  const [scannerView, setScannerView] = useState<'scanner' | 'analyzing' | 'result'>('scanner');
  const [scannerInitialMode, setScannerInitialMode] = useState<'photo' | 'voice'>('photo');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentVoiceTranscript, setCurrentVoiceTranscript] = useState<string | null>(null);
  const [analyzedProduct, setAnalyzedProduct] = useState<ProductAnalysis | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [editingTargetProduct, setEditingTargetProduct] = useState<ProductAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishingStep, setPublishingStep] = useState<number>(0);
  const [currentAgentActivity, setCurrentAgentActivity] = useState<string[]>([]);
  const [currentInstagramPost, setCurrentInstagramPost] = useState<AgentInstagramPost | null>(null);
  const [currentPublicationResult, setCurrentPublicationResult] = useState<any>(null);

  // Orders State
  const [orders, setOrders] = useState<ArtisanOrder[]>(() => getSavedOrders());

  // Save orders to localStorage
  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const handleUpdateOrderStatus = (
    orderId: string,
    newStatus: 'received' | 'shipped' | 'delivered'
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Marketplace & Published Listings State
  const [publishedListings, setPublishedListings] = useState<PublishedListing[]>(() =>
    getSavedPublishedListings()
  );
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const [isPublishLoading, setIsPublishLoading] = useState<boolean>(false);
  const [lastPublishedListing, setLastPublishedListing] = useState<PublishedListing | null>(null);
  const [viewingBuyerListing, setViewingBuyerListing] = useState<PublishedListing | null>(null);
  const [marketplaceInitialTab, setMarketplaceInitialTab] = useState<'all' | 'my-listings'>('all');
  const [highlightListingId, setHighlightListingId] = useState<string | null>(null);

  // Catalog State
  const [catalog, setCatalog] = useState<ProductAnalysis[]>(() => {
    try {
      const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save catalog to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
    } catch (e) {
      console.error('Failed to save catalog to localStorage', e);
    }
  }, [catalog]);

  // Save published listings to localStorage
  useEffect(() => {
    savePublishedListings(publishedListings);
  }, [publishedListings]);

  // Save language preference
  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setCurrentLang(newLang);
    localStorage.setItem(LANG_STORAGE_KEY, newLang);

    // If currently viewing a product in scan tab and user switches language, re-analyze for new language
    if (analyzedProduct && (selectedImage || currentVoiceTranscript) && scannerView === 'result') {
      analyzeProduct({
        image: selectedImage || undefined,
        voiceTranscript: currentVoiceTranscript || undefined,
        language: newLang,
      });
    }
  };

  // Perform AI Craft & Market Analysis via KarigarX Agent API (Multi-modal: Photo, Voice, or Both)
  const analyzeProduct = async ({
    image,
    voiceTranscript,
    language = currentLang,
  }: {
    image?: string;
    voiceTranscript?: string;
    language?: SupportedLanguage;
  }) => {
    setSelectedImage(image || null);
    setCurrentVoiceTranscript(voiceTranscript || null);
    setScannerView('analyzing');
    setActiveTab('scanner');
    setErrorMsg(null);
    setCurrentPublicationResult(null);

    try {
      // Connect to the new Agentic AI endpoint
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          image: image || undefined,
          mimeType: image ? 'image/jpeg' : undefined,
          voiceTranscript: voiceTranscript || undefined,
          language: language,
          artisanName: 'Rameshwar Das',
          artisanLocation: 'Varanasi, Uttar Pradesh',
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      let data: any = null;

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response received from /api/agent:', text.substring(0, 300));
        throw new Error(
          `Server returned HTTP ${response.status} (${response.statusText || 'Non-JSON response'}). The backend service may still be initializing.`
        );
      }

      if (!response.ok || !data.success || !data.product) {
        throw new Error(data?.error || 'Failed to analyze product. Please try again.');
      }

      if (data.agentActivity && data.agentActivity.length > 0) {
        setCurrentAgentActivity(data.agentActivity);
      }
      if (data.instagramPost) {
        setCurrentInstagramPost(data.instagramPost);
      }

      setAnalyzedProduct(data.product);
      setScannerView('result');
    } catch (err: any) {
      console.error('KarigarX Agent Analysis error:', err);
      // Fallback attempt to /api/analyze-product if agent had a transient error
      try {
        const fallbackRes = await fetch('/api/analyze-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            image: image || undefined,
            mimeType: image ? 'image/jpeg' : undefined,
            voiceTranscript: voiceTranscript || undefined,
            language: language,
          }),
        });

        const fallbackType = fallbackRes.headers.get('content-type') || '';
        if (fallbackType.includes('application/json')) {
          const fallbackData = await fallbackRes.json();
          if (fallbackRes.ok && fallbackData.success && fallbackData.product) {
            if (fallbackData.agentActivity) setCurrentAgentActivity(fallbackData.agentActivity);
            if (fallbackData.instagramPost) setCurrentInstagramPost(fallbackData.instagramPost);
            setAnalyzedProduct(fallbackData.product);
            setScannerView('result');
            return;
          }
        }
      } catch (fallbackErr) {
        console.warn('Fallback analysis also errored:', fallbackErr);
      }

      setErrorMsg(
        err?.message ||
          'Could not complete product analysis with KarigarX Agent. Please check your connection and retry.'
      );
      setScannerView('scanner');
    }
  };

  // Quick photo analysis helper
  const analyzeImage = (imageDataUrl: string, langToUse = currentLang) => {
    analyzeProduct({ image: imageDataUrl, language: langToUse });
  };

  // Quick voice listing helper
  const handleVoiceListingRequested = (payload: {
    voiceTranscript: string;
    imageDataUrl?: string;
  }) => {
    analyzeProduct({
      voiceTranscript: payload.voiceTranscript,
      image: payload.imageDataUrl,
      language: currentLang,
    });
  };

  // Handle Save / Toggle in Catalog
  const handleSaveToCatalog = (productToSave?: ProductAnalysis) => {
    const target = productToSave || analyzedProduct;
    if (!target) return;
    const draftProduct: ProductAnalysis = {
      ...target,
      status: target.isPublished ? 'PUBLISHED' : 'DRAFT',
    };
    setAnalyzedProduct(draftProduct);
    setCatalog((prev) => {
      const exists = prev.some((item) => item.id === target.id);
      if (!exists) {
        return [draftProduct, ...prev];
      } else {
        return prev.map((item) => (item.id === target.id ? draftProduct : item));
      }
    });
  };

  const isCurrentProductSaved = Boolean(
    analyzedProduct && catalog.some((item) => item.id === analyzedProduct.id)
  );

  const isCurrentProductPublished = Boolean(
    analyzedProduct &&
      (analyzedProduct.isPublished ||
        analyzedProduct.status === 'PUBLISHED' ||
        publishedListings.some((l) => l.productId === analyzedProduct.id || l.id === analyzedProduct.id))
  );

  // Publish Listing Workflow - Human-in-the-loop approval triggers POST /api/agent/publish
  const handlePublishListing = async (productToPublish?: ProductAnalysis) => {
    const target = productToPublish || analyzedProduct;
    if (!target) return;

    setPublishError(null);
    setIsPublishLoading(true);
    setPublishingStep(1); // 1: Publishing to KarigarX...

    const newPublished = convertAnalysisToPublishedListing(target);

    // Initial human-in-the-loop confirmation sent to agentic backend
    setCurrentAgentActivity([
      'Human approval received',
      'Publishing to KarigarX',
    ]);

    try {
      const response = await fetch('/api/agent/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          listing: newPublished,
          instagramPost: currentInstagramPost,
          approvedByArtisan: true,
          publishToInstagram: true,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      let pubData: any = null;

      if (contentType.includes('application/json')) {
        pubData = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response from /api/agent/publish:', text.substring(0, 300));
        throw new Error(
          `Publication service returned HTTP ${response.status} (${response.statusText || 'Non-JSON response'}).`
        );
      }

      if (!response.ok || !pubData.success) {
        throw new Error(pubData?.error || 'KarigarX publishing failed.');
      }

      setPublishingStep(2); // KarigarX succeeded, Instagram/verification completed

      const actualPublicationId =
        pubData.publicationId || pubData.karigarx?.publicationId || newPublished.id;

      const publishedRecord: PublishedListing = {
        ...newPublished,
        id: actualPublicationId,
        productId: target.id || actualPublicationId,
        status: 'PUBLISHED',
        isPublished: true,
        publishedAt: pubData.publishedAt || new Date().toISOString(),
      };

      const updatedProduct: ProductAnalysis = {
        ...target,
        id: target.id || actualPublicationId,
        isPublished: true,
        status: 'PUBLISHED',
      };

      // Set analyzed product to published state
      setAnalyzedProduct(updatedProduct);

      // Update Catalog State
      setCatalog((prevCatalog) => {
        const exists = prevCatalog.some((c) => c.id === target.id || c.id === actualPublicationId);
        if (exists) {
          return prevCatalog.map((c) =>
            c.id === target.id || c.id === actualPublicationId ? updatedProduct : c
          );
        } else {
          return [updatedProduct, ...prevCatalog];
        }
      });

      // Update Published Listings State so newly published product appears in My Products / Published Products
      setPublishedListings((prev) => {
        const filtered = prev.filter(
          (p) => p.productId !== target.id && p.id !== target.id && p.id !== actualPublicationId
        );
        return [publishedRecord, ...filtered];
      });

      setLastPublishedListing(publishedRecord);
      setCurrentPublicationResult(pubData);
      if (pubData.agentActivity && pubData.agentActivity.length > 0) {
        setCurrentAgentActivity(pubData.agentActivity);
      }
    } catch (err: any) {
      console.error('Agent publish error:', err);
      // Strictly show actual error, never claim success on failure
      setPublishError(
        err?.message ||
          'Failed to publish product to KarigarX. Please verify your connection and try again.'
      );
    } finally {
      setIsPublishLoading(false);
      setPublishingStep(0);
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (product?: ProductAnalysis) => {
    setEditingTargetProduct(product || analyzedProduct);
    setIsEditModalOpen(true);
  };

  // Handle Edit Product Save
  const handleSaveEditedProduct = (updatedProduct: ProductAnalysis) => {
    if (analyzedProduct && analyzedProduct.id === updatedProduct.id) {
      setAnalyzedProduct(updatedProduct);
    }

    setCatalog((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );

    setPublishedListings((prev) =>
      prev.map((item) => {
        if (item.id === updatedProduct.id) {
          return {
            ...item,
            name: updatedProduct.name,
            category: updatedProduct.category,
            craftStyle: updatedProduct.craftStyle,
            price: updatedProduct.suggestedPriceINR,
            description: updatedProduct.description,
            materials: updatedProduct.materials,
            colors: updatedProduct.colors,
            tags: updatedProduct.tags,
            artisanName: updatedProduct.artisanName || item.artisanName,
            artisanLocation: updatedProduct.artisanLocation || item.artisanLocation,
            sellingPoints: updatedProduct.sellingPoints,
          };
        }
        return item;
      })
    );

    setIsEditModalOpen(false);
    setEditingTargetProduct(null);
  };

  // Delete from catalog
  const handleDeleteFromCatalog = (id: string) => {
    setCatalog((prev) => prev.filter((item) => item.id !== id));
    setPublishedListings((prev) => prev.filter((item) => item.id !== id));
  };

  // Delete from published listings
  const handleDeletePublishedListing = (id: string) => {
    setPublishedListings((prev) => prev.filter((item) => item.id !== id));
    setCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPublished: false } : item))
    );
  };

  // Edit from published listing
  const handleEditPublishedListing = (listing: PublishedListing) => {
    const analysisRepresentation: ProductAnalysis = {
      id: listing.id,
      name: listing.name,
      category: listing.category,
      craftStyle: listing.craftStyle || 'Traditional Craft',
      suggestedPriceINR: listing.price,
      priceRangeINR: { min: Math.round(listing.price * 0.85), max: Math.round(listing.price * 1.2) },
      materials: listing.materials,
      colors: listing.colors,
      description: listing.description,
      sellingPoints: listing.sellingPoints,
      suitableMarket: 'Online Direct & Heritage Export',
      targetCustomers: 'Art & Craft Connoisseurs',
      tags: listing.tags,
      imageUrl: listing.imageUrl,
      scannedAt: listing.publishedAt,
      artisanName: listing.artisanName,
      artisanLocation: listing.artisanLocation,
      language: currentLang,
      isPublished: true,
    };

    handleOpenEditModal(analysisRepresentation);
  };

  // Select item from catalog or home
  const handleSelectCatalogItem = (product: ProductAnalysis) => {
    setAnalyzedProduct(product);
    setSelectedImage(product.imageUrl);
    setCurrentVoiceTranscript(null);
    setScannerView('result');
    setActiveTab('scanner');
  };

  // Reset to scanner (Photo mode)
  const handleResetScanner = () => {
    setSelectedImage(null);
    setCurrentVoiceTranscript(null);
    setAnalyzedProduct(null);
    setScannerInitialMode('photo');
    setScannerView('scanner');
    setErrorMsg(null);
    setPublishError(null);
    setPublishingStep(0);
    setActiveTab('scanner');
  };

  // Open scanner directly in Voice mode
  const handleStartVoice = () => {
    setSelectedImage(null);
    setCurrentVoiceTranscript(null);
    setAnalyzedProduct(null);
    setScannerInitialMode('voice');
    setScannerView('scanner');
    setErrorMsg(null);
    setPublishError(null);
    setPublishingStep(0);
    setActiveTab('scanner');
  };

  // View Listing in Marketplace
  const handleViewInMarketplace = (listingId?: string) => {
    setIsPublishModalOpen(false);
    setActiveTab('marketplace');
    setMarketplaceInitialTab('all');
    if (listingId) {
      setHighlightListingId(listingId);
      setTimeout(() => setHighlightListingId(null), 3000);
    }
  };

  // View My Listings in Marketplace
  const handleViewMyListings = (listingId?: string) => {
    setIsPublishModalOpen(false);
    setActiveTab('marketplace');
    setMarketplaceInitialTab('my-listings');
    if (listingId) {
      setHighlightListingId(listingId);
      setTimeout(() => setHighlightListingId(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] flex flex-col font-sans selection:bg-amber-100 selection:text-[#8C4626]">
      {/* Top Header */}
      <Header currentLang={currentLang} onLanguageChange={handleLanguageChange} />

      {/* Navigation Bar */}
      <TopNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setErrorMsg(null);
        }}
        catalogCount={catalog.length}
        ordersCount={orders.length}
        marketplaceCount={publishedListings.length}
        currentLang={currentLang}
      />

      {/* Main Container */}
      <main className="flex-1 w-full pb-12">
        {/* Error Alert Banner if any */}
        {errorMsg && (
          <div className="max-w-6xl mx-auto px-4 mt-4">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-900 text-xs shadow-xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="font-bold text-sm">Analysis Note</p>
                <p className="text-rose-800">{errorMsg}</p>
                <button
                  type="button"
                  onClick={() => {
                    analyzeProduct({
                      image: selectedImage || undefined,
                      voiceTranscript: currentVoiceTranscript || undefined,
                    });
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 font-bold text-rose-700 bg-white px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-100 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Analysis</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Home Screen */}
        {activeTab === 'home' && (
          <HomeScreen
            currentLang={currentLang}
            catalog={catalog}
            onStartScan={handleResetScanner}
            onStartVoice={handleStartVoice}
            onOpenCatalog={() => setActiveTab('catalog')}
            onOpenOrders={() => setActiveTab('orders')}
            onOpenEarnings={() => setActiveTab('dashboard')}
            onOpenHelp={() => setIsHelpModalOpen(true)}
            onOpenMarketplace={() => setActiveTab('marketplace')}
            onImageSelected={(imgData) => analyzeImage(imgData)}
            onSelectProduct={handleSelectCatalogItem}
            onViewAllCatalog={() => setActiveTab('catalog')}
          />
        )}

        {/* Tab 2: AI Scanner / Result Screen */}
        {activeTab === 'scanner' && (
          <>
            {scannerView === 'scanner' && (
              <CameraScanner
                currentLang={currentLang}
                initialMode={scannerInitialMode}
                onImageSelected={(imgData) => analyzeImage(imgData)}
                onVoiceListingRequested={handleVoiceListingRequested}
              />
            )}

            {scannerView === 'analyzing' && (
              <LoadingAnalysis
                currentLang={currentLang}
                imagePreview={selectedImage}
                voiceTranscript={currentVoiceTranscript}
              />
            )}

            {scannerView === 'result' && analyzedProduct && (
              <ProductCardView
                product={analyzedProduct}
                currentLang={currentLang}
                isSavedInCatalog={isCurrentProductSaved}
                isPublished={isCurrentProductPublished}
                isPublishing={isPublishLoading}
                publishingStep={publishingStep}
                publishError={publishError}
                onSaveToCatalog={handleSaveToCatalog}
                onEditDetails={() => handleOpenEditModal(analyzedProduct)}
                onPublishListing={() => handlePublishListing(analyzedProduct)}
                onScanAnother={handleResetScanner}
                onViewMyProducts={() => setActiveTab('catalog')}
                artisanName="Rameshwar Das"
                artisanLocation="Varanasi, Uttar Pradesh"
                agentActivity={currentAgentActivity}
                instagramPost={currentInstagramPost}
                publicationResult={currentPublicationResult}
              />
            )}
          </>
        )}

        {/* Tab 3: Product Catalog */}
        {activeTab === 'catalog' && (
          <CatalogView
            catalog={catalog}
            currentLang={currentLang}
            onSelectProduct={handleSelectCatalogItem}
            onDeleteProduct={handleDeleteFromCatalog}
            onPublishDirect={handlePublishListing}
            onStartScan={handleResetScanner}
            onNavigateToMarketplace={() => setActiveTab('marketplace')}
          />
        )}

        {/* Tab 4: Orders Tracking */}
        {activeTab === 'orders' && (
          <VisualOrdersView
            orders={orders}
            currentLang={currentLang}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onOpenScanner={handleResetScanner}
          />
        )}

        {/* Tab 5: Marketplace & My Listings */}
        {activeTab === 'marketplace' && (
          <MarketplaceView
            currentLang={currentLang}
            publishedListings={publishedListings}
            userCatalog={catalog}
            initialTab={marketplaceInitialTab}
            highlightListingId={highlightListingId}
            onViewProduct={(listing) => setViewingBuyerListing(listing)}
            onEditListing={handleEditPublishedListing}
            onDeleteListing={handleDeletePublishedListing}
            onOpenScanner={handleResetScanner}
          />
        )}

        {/* Tab 6: Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
            catalog={catalog}
            onOpenScanner={handleResetScanner}
          />
        )}
      </main>

      {/* Visual Help & Photo Guide Modal */}
      <VisualHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Edit Details Modal */}
      {isEditModalOpen && (editingTargetProduct || analyzedProduct) && (
        <EditProductModal
          product={editingTargetProduct || analyzedProduct!}
          currentLang={currentLang}
          onSave={handleSaveEditedProduct}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTargetProduct(null);
          }}
        />
      )}

      {/* Publish Listing Modal (Loading + Success Confirmation) */}
      <PublishSuccessModal
        isOpen={isPublishModalOpen}
        isLoading={isPublishLoading}
        publishedListing={lastPublishedListing}
        currentLang={currentLang}
        onClose={() => setIsPublishModalOpen(false)}
        onViewMarketplace={() => handleViewInMarketplace(lastPublishedListing?.id)}
        onViewMyListings={() => handleViewMyListings(lastPublishedListing?.id)}
        onCreateAnother={handleResetScanner}
      />

      {/* Buyer / Detailed Product View Modal */}
      {viewingBuyerListing && (
        <BuyerProductModal
          listing={viewingBuyerListing}
          currentLang={currentLang}
          onClose={() => setViewingBuyerListing(null)}
          onEdit={() => {
            const target = viewingBuyerListing;
            setViewingBuyerListing(null);
            handleEditPublishedListing(target);
          }}
        />
      )}
    </div>
  );
}
