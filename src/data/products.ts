import { Product, GalleryItem, Review, Collection } from '@/types';

// Products catalog using all available images
export const products: Product[] = [
  {
    id: 'gameboy-pastel',
    name: 'Game Boy Pastel',
    subtitle: 'Édition Limitée',
    category: 'console',
    price: 189,
    image: '/images/hero/gameboy-pastel.png',
    badge: 'rare',
    condition: 'mint',
    stock: 'low_stock',
    year: 1989,
    description: 'Console originale avec coque pastel personnalisée, état mint.',
    rating: 4.9,
  },
  {
    id: 'handheld-pro',
    name: 'Handheld Pro Gaming',
    subtitle: 'Retro Moderne',
    category: 'console',
    price: 159,
    image: '/images/timeline/gem_2.png',
    badge: 'new',
    condition: 'mint',
    stock: 'in_stock',
    year: 2025,
    description: 'Console portable moderne avec émulation rétro intégrée.',
    rating: 4.7,
  },
  {
    id: 'nes-complete',
    name: 'NES Complete Setup',
    subtitle: 'Bundle Collector',
    category: 'console',
    price: 299,
    image: '/images/timeline/nes-era.jpg',
    badge: 'bestseller',
    condition: 'excellent',
    stock: 'in_stock',
    year: 1985,
    description: 'Console NES avec manette, câbles et jeu Super Mario Bros inclus.',
    rating: 4.8,
  },
  {
    id: 'console-dark',
    name: 'Console Retro Dark',
    subtitle: 'Style NES',
    category: 'console',
    price: 249,
    image: '/images/timeline/3d-era.jpg',
    condition: 'excellent',
    stock: 'in_stock',
    year: 1986,
    description: 'Console style NES avec manette sans fil moderne.',
    rating: 4.6,
  },
  {
    id: 'cartridge-pack',
    name: 'Cartridge Collection',
    subtitle: '6 Jeux Variés',
    category: 'cartridge',
    price: 199,
    image: '/images/products/mario-cartridge.png',
    condition: 'good',
    stock: 'in_stock',
    description: 'Lot de 6 cartouches Game Boy assorties, testées et fonctionnelles.',
    rating: 4.4,
  },
  {
    id: 'legends-pack',
    name: 'Pack Legendes',
    subtitle: 'Mario + Zelda + Sonic',
    category: 'collectible',
    price: 350,
    originalPrice: 420,
    image: '/images/collections/classic-cartridges.png',
    badge: 'limited',
    condition: 'excellent',
    stock: 'low_stock',
    description: 'Le trio iconique réunis : Mario, Zelda, et Sonic. Pièces de collection.',
    rating: 5.0,
  },
  {
    id: 'mario-kart-8',
    name: 'Mario Kart 8 Deluxe',
    subtitle: 'Nintendo Switch',
    category: 'cartridge',
    price: 49,
    image: '/images/products/pacman-cartridge.png',
    badge: 'bestseller',
    condition: 'mint',
    stock: 'in_stock',
    year: 2017,
    description: 'Jeu Switch en excellent état avec boîtier original.',
    rating: 4.9,
  },
];

// Gallery items for CircularGallery component (PNG images with transparent backgrounds)
// Selected for: high-quality 3D renders, perfect transparency, visual impact
export const galleryItems: GalleryItem[] = [
  { image: '/hero-console.png', text: 'Game Boy Classic' },
  { image: '/images/hero/gameboy-pastel.png', text: 'Game Boy Pastel' },
  { image: '/images/timeline/gem_1.png', text: 'Retro Station' },
  { image: '/images/products/mario-cartridge.png', text: 'Mario Kart' },
  { image: '/images/timeline/gem_2.png', text: 'Handheld Pro' },
  { image: '/images/products/pacman-cartridge.png', text: 'Pac-Man' },
  { image: '/images/timeline/gem_3.png', text: 'Console Dark' },
];

// Reviews for TestimonialSlider
export const reviews: Review[] = [
  {
    id: 1,
    name: 'Alexandre M.',
    affiliation: 'Collectionneur depuis 2015',
    quote: 'Ma cartouche Zelda est arrivée en parfait état. Le service de restauration est vraiment au top !',
    imageSrc: '/images/timeline/nes-era.jpg',
    thumbnailSrc: '/images/avatars/client-1.jpg',
  },
  {
    id: 2,
    name: 'Sophie L.',
    affiliation: 'Joueuse Rétro',
    quote: "J'ai retrouvé ma Game Boy d'enfance grâce à RetroCollect. Une émotion incroyable !",
    imageSrc: '/images/hero/gameboy-pastel.png',
    thumbnailSrc: '/images/avatars/client-2.jpg',
  },
  {
    id: 3,
    name: 'Thomas B.',
    affiliation: 'Streamer Gaming',
    quote: 'Les jeux sont authentiques et parfaitement fonctionnels. Je recommande à 100 %.',
    imageSrc: '/images/collections/classic-cartridges.png',
    thumbnailSrc: '/images/avatars/client-3.jpg',
  },
];

// Collections for category showcase
export const collections: Collection[] = [
  {
    title: "L'Age d'Or",
    era: '1985-1995',
    description: 'Classiques NES, SNES, Genesis. Les titres qui ont défini une génération.',
    gradient: 'from-amber-600 to-orange-700',
    image: '/images/consoles/snes-console.png',
  },
  {
    title: 'Légendes Portables',
    era: 'Game Boy & Beyond',
    description: 'Du DMG original au GBA SP. Aventures de poche qui ont voyagé partout.',
    gradient: 'from-emerald-600 to-teal-700',
    image: '/images/consoles/gameboy-color.png',
  },
  {
    title: 'Pièces de Collection',
    era: 'Ultra Rare',
    description: 'Éditions limitées, exemplaires scellés. Qualité investissement.',
    gradient: 'from-cyan-600 to-blue-700',
    image: '/images/consoles/playstation-1.png',
  },
];

// Products by category helper functions
export const getProductsByCategory = (category: Product['category']) =>
  products.filter((p) => p.category === category);

export const getFeaturedProducts = () =>
  products.filter((p) => p.badge);

export const getBestsellers = () =>
  products.filter((p) => p.badge === 'bestseller');

export const getRareProducts = () =>
  products.filter((p) => p.badge === 'rare' || p.badge === 'limited');
