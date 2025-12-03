import { CartridgeData } from '@/types';

// Extended CartridgeData with compatibility flag
export interface ExtendedCartridgeData extends CartridgeData {
  isCompatible?: boolean; // Only snake cartridge is compatible with the GameBoy
}

// Cartridge data for the gallery/carousel
// Only the SNAKE cartridge activates the hidden game - others show "incompatible"
export const cartridges: ExtendedCartridgeData[] = [
  {
    id: 'zelda',
    title: 'ZELDA',
    subtitle: "Link's Awakening",
    price: '189€',
    description: 'Edition collector - Tres rare',
    color: '#d4a574',
    labelColor: '#8b6914',
    isCompatible: false,
  },
  {
    id: 'mario',
    title: 'MARIO',
    subtitle: 'Land',
    price: '74€',
    description: 'Cartouche testee et fonctionnelle',
    color: '#4a4a4a',
    labelColor: '#e53935',
    isCompatible: false,
  },
  {
    id: 'snake',
    title: 'SNAKE',
    subtitle: 'Classic',
    price: '29€',
    description: 'Cartouche en excellent etat',
    color: '#2d5a2d',
    labelColor: '#4caf50',
    isCompatible: true,
  },
  {
    id: 'tetris',
    title: 'TETRIS',
    subtitle: 'Original',
    price: '45€',
    description: 'Version originale complete',
    color: '#2d2d2d',
    labelColor: '#1565c0',
    isCompatible: false,
  },
  {
    id: 'pokemon',
    title: 'POKEMON',
    subtitle: 'Red',
    price: '89€',
    description: 'Import japonais authentique',
    color: '#c62828',
    labelColor: '#b71c1c',
    isCompatible: false,
  },
];

// Get the snake cartridge (the only compatible one)
export const getSnakeCartridge = () => cartridges.find(c => c.id === 'snake');

// Check if a cartridge is compatible
export const isCartridgeCompatible = (cartridgeId: string) => {
  const cartridge = cartridges.find(c => c.id === cartridgeId);
  return cartridge?.isCompatible ?? false;
};
