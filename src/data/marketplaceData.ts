import { PublishedListing, ProductAnalysis } from '../types';

export const LOCAL_STORAGE_LISTINGS_KEY = 'karigarx_published_listings_v1';
export const LOCAL_STORAGE_ARTISAN_PROFILE_KEY = 'karigarx_artisan_profile_v1';

export interface ArtisanProfile {
  name: string;
  location: string;
  phone: string;
  craftTradition: string;
  bio: string;
  experienceYears: number;
  badge: string;
}

export const DEFAULT_ARTISAN_PROFILE: ArtisanProfile = {
  name: 'Rameshwar Das',
  location: 'Varanasi, Uttar Pradesh',
  phone: '+91 98765 43210',
  craftTradition: 'Traditional Heritage Craft & Handloom',
  bio: '3rd generation master artisan preserving indigenous Indian handicraft traditions with sustainable raw materials.',
  experienceYears: 24,
  badge: 'Certified Master Karigar',
};

export const INITIAL_MARKETPLACE_LISTINGS: PublishedListing[] = [
  {
    id: 'kx-listing-101',
    productId: 'sample-terracotta',
    name: 'Bankura Terracotta Clay Horse & Planter',
    category: 'Pottery & Clay Art',
    description:
      'Handcrafted using alluvial clay from riverbeds, this iconic Bankura horse represents the ancient folk terracotta heritage of West Bengal. Fired in traditional wood-burning kilns for authentic earthy resonance.',
    materials: ['Alluvial River Clay', 'Natural Mineral Slip', 'Terracotta Red'],
    colors: ['Earthy Terracotta Red', 'Ochre Brown'],
    craftStyle: 'Bankura Terracotta Heritage',
    tags: ['terracotta', 'clayplanter', 'bankuracraft', 'handmade', 'homedecor', 'ecofriendly'],
    price: 850,
    priceRangeINR: { min: 750, max: 1100 },
    suitableMarket: 'Retail & Boutiques',
    sellingPoints: [
      '100% biodegradable and natural sun-baked alluvial clay',
      'Hand-molded by rural master potters of Panchmura village',
      'Perfect centerpiece for sustainable bohemian home and garden decor',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    artisanName: 'Biren Kumbhakar',
    artisanLocation: 'Bankura, West Bengal',
    artisanContact: '+91 98451 22340',
    artisanStory: 'Biren Kumbhakar comes from a family of terracotta artisans spanning five generations in Panchmura.',
    publishedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    status: 'LIVE',
    isUserListing: false,
    viewsCount: 142,
    inquiriesCount: 18,
    stock: 15,
  },
  {
    id: 'kx-listing-102',
    productId: 'sample-brass',
    name: 'Dhokra Tribal Lost-Wax Brass Figurine',
    category: 'Metal Craft',
    description:
      'Ancient non-ferrous metal casting using the 4,000-year-old lost-wax (cire perdue) metallurgical technique. Every piece is unique as the clay mold is broken after casting.',
    materials: ['Recycled Brass', 'Natural Beeswax', 'Clay Core'],
    colors: ['Antique Golden Brass', 'Burnished Bronze'],
    craftStyle: 'Dhokra Lost-Wax Bell Metal',
    tags: ['dhokrametal', 'tribalart', 'lostwaxcasting', 'bastarbrass', 'vintagefigurine'],
    price: 1450,
    priceRangeINR: { min: 1300, max: 1800 },
    suitableMarket: 'Wholesale & Export',
    sellingPoints: [
      'Authentic non-ferrous lost wax casting with zero seam lines',
      'Each handcrafted sculpture is one-of-a-kind',
      'Certified authentic GI tag Bastar tribal craft',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    artisanName: 'Sukhdev Jhankar',
    artisanLocation: 'Bastar, Chhattisgarh',
    artisanContact: '+91 97123 45678',
    artisanStory: 'Tribal metal smith from Kondagaon dedicated to preserving ancestral bell metal craft.',
    publishedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    status: 'LIVE',
    isUserListing: false,
    viewsCount: 289,
    inquiriesCount: 34,
    stock: 8,
  },
  {
    id: 'kx-listing-103',
    productId: 'sample-handloom',
    name: 'Pochampally Ikat Pure Silk Stole',
    category: 'Textiles & Weaving',
    description:
      'Geometric resist-dye warp and weft handloom stole woven on traditional pit looms in the historic weaving cluster of Pochampally. Silk threads are precisely dyed prior to weaving.',
    materials: ['Pure Mulberry Silk', 'Natural Azo-Free Dyes'],
    colors: ['Royal Indigo', 'Crimson Red', 'Zari Gold'],
    craftStyle: 'Pochampally Ikat (Telia Rumal Heritage)',
    tags: ['pochampallyikat', 'puresilk', 'handloomweaving', 'traditionalstole', 'sustainablefashion'],
    price: 1850,
    priceRangeINR: { min: 1650, max: 2400 },
    suitableMarket: 'Retail & Boutiques',
    sellingPoints: [
      'Intricate double-ikat geometric alignment woven on wooden pit-looms',
      '100% natural pure silk with Silk Mark certification',
      'Directly empowers female weavers cooperative in Telangana',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    artisanName: 'Devi Handloom Self-Help Group',
    artisanLocation: 'Pochampally, Telangana',
    artisanContact: '+91 94401 98765',
    artisanStory: 'A collective of 12 rural women weavers practicing traditional Ikat resist-dyeing.',
    publishedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    status: 'LIVE',
    isUserListing: false,
    viewsCount: 310,
    inquiriesCount: 42,
    stock: 20,
  },
  {
    id: 'kx-listing-104',
    productId: 'sample-woodcarving',
    name: 'Channapatna Organic Lacquer Wooden Toy Set',
    category: 'Woodwork & Toys',
    description:
      'Turned on high-speed wooden lathes and coated with non-toxic organic vegetable lacquer derived from natural tree resins and turmeric/kumkum dyes. Safe and sensory for children.',
    materials: ['Hale Wood (Wrightia Tinctoria)', 'Natural Lac Resin', 'Vegetable Dyes'],
    colors: ['Canary Yellow', 'Natural Coral Red', 'Emerald Green'],
    craftStyle: 'Channapatna Lathe-Turned Wood',
    tags: ['channapatnatoys', 'woodencraft', 'nontoxic', 'montessori', 'ecotoys', 'gi_tagged'],
    price: 680,
    priceRangeINR: { min: 580, max: 850 },
    suitableMarket: 'Local & Retail',
    sellingPoints: [
      '100% child-safe, lead-free with natural vegetable resin finish',
      'Smooth hand-buffed organic ivory wood with zero sharp edges',
      'GI tagged authentic Karnataka toy town heritage',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    artisanName: 'Syed Khaleel',
    artisanLocation: 'Channapatna, Karnataka',
    artisanContact: '+91 98860 11223',
    artisanStory: 'Master woodturner with 30 years of lathe craftsmanship making non-toxic educational toys.',
    publishedAt: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
    status: 'LIVE',
    isUserListing: false,
    viewsCount: 195,
    inquiriesCount: 22,
    stock: 25,
  },
  {
    id: 'kx-listing-105',
    productId: 'sample-bluepottery',
    name: 'Jaipur Hand-Painted Glazed Blue Pottery Tile',
    category: 'Ceramics & Glaze',
    description:
      'Turquoise blue quartz pottery made without clay using Egyptian paste formula of quartz powder, Fuller earth, and natural glass. Kiln-fired with Persian floral motifs.',
    materials: ['Quartz Powder', 'Cullet Glass', 'Natural Gum', 'Copper Oxide'],
    colors: ['Cobalt Blue', 'Turquoise', 'Ivory White'],
    craftStyle: 'Jaipur Blue Pottery Tradition',
    tags: ['bluepottery', 'jaipurcraft', 'glazedtiles', 'handpainted', 'floralmotifs', 'wallart'],
    price: 920,
    priceRangeINR: { min: 800, max: 1200 },
    suitableMarket: 'Retail & Export',
    sellingPoints: [
      'Clay-free quartz ceramic that does not crack or chip under heat',
      'Hand-painted Persian motifs with natural metal oxides',
      'Versatile as ornamental wall accents or beverage coasters',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    artisanName: 'Girraj Prasad Sharma',
    artisanLocation: 'Jaipur, Rajasthan',
    artisanContact: '+91 94140 33445',
    artisanStory: 'National Award-winning master ceramicist continuing ancestral Rajput-Mughal pottery.',
    publishedAt: new Date(Date.now() - 96 * 3600 * 1000).toISOString(),
    status: 'LIVE',
    isUserListing: false,
    viewsCount: 215,
    inquiriesCount: 29,
    stock: 12,
  },
  {
    id: 'kx-listing-106',
    productId: 'sample-jute',
    name: 'Handcrafted Golden Jute Artisan Tote Bag',
    category: 'Eco & Natural Fiber',
    description:
      'Eco-friendly braided tote bag made from 100% natural golden jute fiber grown in the Ganga delta. Strong hand-stitched handles with vegan cotton lining.',
    materials: ['Golden Jute Fiber', 'Organic Cotton Canvas', 'Vegetable Tanned Accents'],
    colors: ['Golden Tan', 'Earthy Beige'],
    craftStyle: 'Bengal Golden Jute Weaving',
    tags: ['juteproducts', 'ecobags', 'goldenfiber', 'sustainableliving', 'zerowaste'],
    price: 450,
    priceRangeINR: { min: 380, max: 600 },
    suitableMarket: 'Local & Retail',
    sellingPoints: [
      'High-tensile golden jute with biodegradable natural vegetable fibers',
      'Reinforced cross-stitch stitching supporting up to 10kg weight',
      'Ethically handcrafted by women artisans in rural Bengal',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    artisanName: 'Shampa Mondal',
    artisanLocation: 'Kolkata, West Bengal',
    artisanContact: '+91 98310 99887',
    artisanStory: 'Founder of rural jute self-help group empowering 40 women artisans.',
    publishedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    status: 'LIVE',
    isUserListing: false,
    viewsCount: 160,
    inquiriesCount: 19,
    stock: 30,
  },
];

/**
 * Storage helpers for published listings (Local persistence / database mock)
 */
export function getSavedPublishedListings(): PublishedListing[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LISTINGS_KEY);
    if (!raw) {
      // Seed initial sample marketplace listings
      localStorage.setItem(LOCAL_STORAGE_LISTINGS_KEY, JSON.stringify(INITIAL_MARKETPLACE_LISTINGS));
      return INITIAL_MARKETPLACE_LISTINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MARKETPLACE_LISTINGS;
  } catch (err) {
    console.error('Failed to load published listings from localStorage', err);
    return INITIAL_MARKETPLACE_LISTINGS;
  }
}

export function savePublishedListings(listings: PublishedListing[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_LISTINGS_KEY, JSON.stringify(listings));
  } catch (err) {
    console.error('Failed to save published listings to localStorage', err);
  }
}

export function getArtisanProfile(): ArtisanProfile {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ARTISAN_PROFILE_KEY);
    if (!raw) return DEFAULT_ARTISAN_PROFILE;
    return { ...DEFAULT_ARTISAN_PROFILE, ...JSON.parse(raw) };
  } catch (err) {
    return DEFAULT_ARTISAN_PROFILE;
  }
}

export function saveArtisanProfile(profile: ArtisanProfile): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_ARTISAN_PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save artisan profile', err);
  }
}

/**
 * Converts a ProductAnalysis into a PublishedListing
 */
export function createPublishedListingFromAnalysis(
  product: ProductAnalysis,
  artisanOverride?: Partial<ArtisanProfile>
): PublishedListing {
  const currentProfile = getArtisanProfile();
  const artisanName = product.artisanName || product.artisan?.name || artisanOverride?.name || currentProfile.name;
  const artisanLocation = product.artisanLocation || product.artisan?.location || artisanOverride?.location || currentProfile.location;
  const artisanContact = product.artisanContact || product.artisan?.contact || artisanOverride?.phone || currentProfile.phone;

  const highlights = Array.isArray(product.highlights) && product.highlights.length > 0
    ? product.highlights
    : (Array.isArray(product.sellingPoints) && product.sellingPoints.length > 0
        ? product.sellingPoints
        : ['Handcrafted by local artisan', 'Eco-friendly sustainable material', 'Authentic heritage craft']);

  const primaryMaterial = product.material || (product.materials && product.materials[0]) || 'Natural Materials';

  const nowIso = new Date().toISOString();

  return {
    id: `kx-live-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    productId: product.id,
    name: product.name,
    title: product.title || product.name,
    category: product.category,
    material: primaryMaterial,
    description: product.description,
    materials: product.materials || [primaryMaterial],
    colors: product.colors || [],
    craftStyle: product.craftStyle || 'Indian Handicraft',
    tags: product.tags || [],
    price: product.price || product.suggestedPriceINR,
    priceRangeINR: product.priceRangeINR,
    priceExplanation: product.priceExplanation,
    suitableMarket: product.suitableMarket,
    sellingPoints: Array.isArray(product.sellingPoints) ? product.sellingPoints : highlights.slice(0, 3),
    highlights: highlights,
    imageUrl: product.imageUrl || product.image || '',
    image: product.image || product.imageUrl || '',
    artisanName: artisanName,
    artisanLocation: artisanLocation,
    artisanContact: artisanContact,
    artisan: {
      name: artisanName,
      location: artisanLocation,
      contact: artisanContact,
    },
    artisanStory: product.artisanTip || currentProfile.bio,
    publishedAt: nowIso,
    createdAt: product.createdAt || product.scannedAt || nowIso,
    status: 'PUBLISHED',
    isUserListing: true,
    viewsCount: 1,
    inquiriesCount: 0,
    stock: 5,
  };
}

export const convertAnalysisToPublishedListing = createPublishedListingFromAnalysis;

