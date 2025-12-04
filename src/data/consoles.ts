export type ConsoleId = 'gameboy' | 'neogeo-pocket';

export interface ConsoleData {
  id: ConsoleId;
  name: string;
  brand: string;
  year: number;
  price: string;
  isPlayable: boolean; // Only GameBoy = true
  screenWidth: number;
  screenHeight: number;
  bodyColor: string;
  accentColor: string;
  errorMessages: {
    title: string;
    subtitle: string;
  };
}

export const consoles: ConsoleData[] = [
  {
    id: 'gameboy',
    name: 'Game Boy',
    brand: 'Nintendo',
    year: 1989,
    price: '129€',
    isPlayable: true,
    screenWidth: 160,
    screenHeight: 144,
    bodyColor: '#c4c4b4',
    accentColor: '#9c1b4d',
    errorMessages: {
      title: 'ERREUR',
      subtitle: 'Cartouche incompatible',
    },
  },
  {
    id: 'neogeo-pocket',
    name: 'Neo Geo Pocket',
    brand: 'SNK',
    year: 1998,
    price: '179€',
    isPlayable: false,
    screenWidth: 160,
    screenHeight: 144, // Match GameBoy screen for consistency
    bodyColor: '#2d2d3d',
    accentColor: '#e94560',
    errorMessages: {
      title: 'ERREUR FORMAT',
      subtitle: 'Cartouche SNK requise',
    },
  },
];

/**
 * Get the default starting index for the carousel
 * Returns NeoGeoPocket (index 1) to hide the GameBoy and Snake game
 */
export const getDefaultStartIndex = (): number => 1;

/**
 * Check if a console can play games (only GameBoy)
 */
export const isConsolePlayable = (id: ConsoleId): boolean =>
  consoles.find(c => c.id === id)?.isPlayable ?? false;

/**
 * Get console data by ID
 */
export const getConsoleById = (id: ConsoleId): ConsoleData | undefined =>
  consoles.find(c => c.id === id);
