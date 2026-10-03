import { ArtisanOrder } from '../types';

const INITIAL_ARTISAN_ORDERS: ArtisanOrder[] = [
  {
    id: 'ord-881',
    productName: 'Bankura Terracotta Clay Horse',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    price: 850,
    customerName: 'Amit Verma',
    customerCity: 'Bengaluru, Karnataka',
    orderDate: 'Today, 09:30 AM',
    status: 'received',
    trackingNumber: 'IND-POST-9921',
  },
  {
    id: 'ord-882',
    productName: 'Dhokra Tribal Brass Figurine',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    price: 1450,
    customerName: 'Priya Nair',
    customerCity: 'Mumbai, Maharashtra',
    orderDate: 'Yesterday',
    status: 'shipped',
    trackingNumber: 'IND-POST-7742',
  },
  {
    id: 'ord-883',
    productName: 'Pochampally Ikat Silk Stole',
    imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    price: 1850,
    customerName: 'Rajesh Kumar',
    customerCity: 'New Delhi',
    orderDate: '3 days ago',
    status: 'delivered',
    trackingNumber: 'IND-POST-5519',
  },
  {
    id: 'ord-884',
    productName: 'Channapatna Wooden Toy Set',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    price: 680,
    customerName: 'Sunita Mehra',
    customerCity: 'Chennai, Tamil Nadu',
    orderDate: '5 days ago',
    status: 'delivered',
    trackingNumber: 'IND-POST-4431',
  },
];

const ORDERS_STORAGE_KEY = 'karigarx_artisan_orders_data';

export const getArtisanOrders = (): ArtisanOrder[] => {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading orders from localStorage', e);
  }
  return INITIAL_ARTISAN_ORDERS;
};

export const getSavedOrders = getArtisanOrders;

export const saveArtisanOrders = (orders: ArtisanOrder[]): void => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to localStorage', e);
  }
};

export const saveOrders = saveArtisanOrders;
