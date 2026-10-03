export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface ProductAnalysis {
  id: string;
  name: string;
  title?: string;
  category: string;
  description: string;
  materials: string[];
  material?: string;
  colors: string[];
  craftStyle: string;
  tags: string[];
  suggestedPriceINR: number;
  price?: number;
  priceRangeINR: {
    min: number;
    max: number;
  };
  priceExplanation?: string;
  targetCustomers: string;
  suitableMarket: 'Local' | 'Retail' | 'Wholesale' | 'Export' | string;
  sellingPoints: [string, string, string] | string[];
  highlights?: string[];
  artisanTip?: string;
  imageUrl: string;
  image?: string;
  language: SupportedLanguage;
  scannedAt: string;
  createdAt?: string;
  artisanName?: string;
  artisanLocation?: string;
  artisanContact?: string;
  artisan?: {
    name: string;
    location: string;
    contact?: string;
  };
  status?: ListingStatus | 'LIVE' | 'DRAFT' | 'SOLD_OUT' | 'PUBLISHED';
  isPublished?: boolean;
}

export type ListingStatus = 'LIVE' | 'DRAFT' | 'SOLD_OUT' | 'PUBLISHED';

export interface PublishedListing {
  id: string;
  productId: string;
  name: string;
  title?: string;
  category: string;
  description: string;
  materials: string[];
  material?: string;
  colors: string[];
  craftStyle: string;
  tags: string[];
  price: number;
  priceRangeINR?: {
    min: number;
    max: number;
  };
  priceExplanation?: string;
  suitableMarket?: string;
  sellingPoints: string[];
  highlights?: string[];
  imageUrl: string;
  image?: string;
  artisanName: string;
  artisanLocation: string;
  artisanContact?: string;
  artisan?: {
    name: string;
    location: string;
    contact?: string;
  };
  artisanStory?: string;
  publishedAt: string;
  createdAt?: string;
  status: ListingStatus;
  isPublished?: boolean;
  isUserListing: boolean;
  viewsCount?: number;
  inquiriesCount?: number;
  stock?: number;
}

export interface AnalyzeRequestPayload {
  image?: string; // base64 string or url
  mimeType?: string;
  voiceTranscript?: string;
  language: SupportedLanguage;
}

export interface AnalyzeResponsePayload {
  success: boolean;
  product?: ProductAnalysis;
  error?: string;
  agentActivity?: string[];
  instagramPost?: AgentInstagramPost;
}

export interface AgentProductInfo {
  title: string;
  category: string;
  material: string;
  description: string;
  highlights: string[];
  tags: string[];
  craftType: string;
  estimatedLabourDays: number;
}

export interface AgentPriceSuggestion {
  suggestedPrice: number;
  priceRangeINR?: { min: number; max: number };
  priceExplanation: string;
}

export interface AgentInstagramPost {
  caption: string;
  hashtags: string[];
  image: string;
  platform: 'Instagram';
  status: 'READY_FOR_APPROVAL';
}

export interface AgentWorkflowResponse {
  success: boolean;
  status: 'WAITING_FOR_ARTISAN_APPROVAL' | 'PUBLISHED' | 'ERROR';
  workflowStage: string;
  product?: ProductAnalysis;
  listing?: PublishedListing | any;
  instagramPost?: AgentInstagramPost;
  priceRecommendation?: AgentPriceSuggestion;
  agentActivity: string[];
  agentThoughts?: string;
  toolsUsed: string[];
  pendingActions: string[];
  error?: string;
}

export type InstagramPublishStatus =
  | 'NOT_CONNECTED'
  | 'READY'
  | 'PUBLISHING'
  | 'PUBLISHED'
  | 'FAILED';

export interface InstagramPublishResult {
  success: boolean;
  platform: 'Instagram';
  status: InstagramPublishStatus;
  publicationId?: string;
  message: string;
  permalink?: string;
  postId?: string;
}

export interface AgentPublishResponse {
  success: boolean;
  status: 'PUBLISHED' | 'FAILED';
  publicationId?: string;
  publishedAt?: string;
  karigarx: {
    success: boolean;
    publicationId: string;
    publishedAt: string;
    platform: 'KarigarX';
    verified: boolean;
    listing?: PublishedListing | any;
  };
  instagram: InstagramPublishResult;
  verification: {
    verified: boolean;
    publicationId: string;
    platform: string;
    message: string;
  };
  agentActivity: string[];
  error?: string;
}

export type OrderProgressStep = 'received' | 'shipped' | 'delivered';

export interface ArtisanOrder {
  id: string;
  productName: string;
  imageUrl: string;
  price: number;
  customerName: string;
  customerCity: string;
  orderDate: string;
  status: OrderProgressStep;
  trackingNumber?: string;
}
