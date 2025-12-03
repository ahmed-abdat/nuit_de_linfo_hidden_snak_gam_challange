// Product and Cartridge Types for RetroCollect

// Re-export console types
export type { ConsoleId, ConsoleData } from '@/data/consoles';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'console' | 'cartridge' | 'accessory' | 'collectible';
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'new' | 'rare' | 'bestseller' | 'limited' | 'sale';
  condition: 'mint' | 'excellent' | 'good';
  stock: 'in_stock' | 'low_stock' | 'out_of_stock';
  year?: number;
  description: string;
  rating?: number;
}

export interface CartridgeData {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  color: string;
  labelColor: string;
}

export interface GalleryItem {
  image: string;
  text: string;
}

export interface Review {
  id: string | number;
  name: string;
  affiliation: string;
  quote: string;
  imageSrc: string;
  thumbnailSrc: string;
}

export interface Collection {
  title: string;
  era: string;
  description: string;
  gradient: string;
  image?: string;
}

export interface TrustSignal {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
  color: string;
}
