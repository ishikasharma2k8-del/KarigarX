export interface SampleCraft {
  id: string;
  name: string;
  category: string;
  region: string;
  price: number;
  thumbnail: string;
  image: string;
}

export const SAMPLE_CRAFTS: SampleCraft[] = [
  {
    id: 'sample-terracotta',
    name: 'Bankura Terracotta Clay Horse & Planter',
    category: 'Pottery & Clay Art',
    region: 'Bankura, West Bengal',
    price: 850,
    thumbnail: '🏺',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-brass',
    name: 'Dhokra Tribal Lost-Wax Brass Figurine',
    category: 'Metal Craft',
    region: 'Bastar, Chhattisgarh',
    price: 1450,
    thumbnail: '🪔',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-woodcarving',
    name: 'Channapatna Lacquer Wooden Toy Set',
    category: 'Woodwork & Toys',
    region: 'Ramanagara, Karnataka',
    price: 680,
    thumbnail: '🪵',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-handloom',
    name: 'Pochampally Ikat Silk & Cotton Stole',
    category: 'Textiles & Weaving',
    region: 'Pochampally, Telangana',
    price: 1850,
    thumbnail: '🧣',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-jute',
    name: 'Handcrafted Golden Jute Artisan Tote',
    category: 'Eco & Natural Fiber',
    region: 'Kolkata, West Bengal',
    price: 450,
    thumbnail: '👜',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-bluepottery',
    name: 'Jaipur Blue Pottery Hand-Painted Tile',
    category: 'Ceramics & Glaze',
    region: 'Jaipur, Rajasthan',
    price: 920,
    thumbnail: '🎨',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
  }
];

