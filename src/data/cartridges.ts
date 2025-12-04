import { CartridgeData } from '@/types';

// Extended CartridgeData with compatibility flag and history
export interface ExtendedCartridgeData extends CartridgeData {
  isCompatible?: boolean; // Only snake cartridge is compatible with the GameBoy
  year?: number;
  developer?: string;
  history?: string;
  funFact?: string;
  salesInfo?: string;
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
    year: 1993,
    developer: 'Nintendo EAD',
    history: "Premier Zelda portable, developpe par l'equipe de Takashi Tezuka. Initialement prevu comme un portage de A Link to the Past, il est devenu un jeu original unique.",
    funFact: "C'est le premier Zelda ou Zelda n'apparait pas ! Le jeu se deroule entierement sur l'ile Cocolint.",
    salesInfo: '6.08 millions de copies vendues',
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
    year: 1989,
    developer: 'Nintendo R&D1',
    history: "Jeu de lancement du Game Boy, concu par Gunpei Yokoi. Premier Mario portable de l'histoire, avec des niveaux plus compacts adaptes au petit ecran.",
    funFact: "Les ennemis sont differents des jeux NES : des Goombos au lieu de Goombas, et des vehicules comme un avion et un sous-marin !",
    salesInfo: '+25 millions de copies vendues',
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
    year: 1997,
    developer: 'Taneli Armanto (Nokia)',
    history: "Le concept de Snake remonte a 1976 avec Blockade en arcade. Le jeu est devenu iconique grace aux telephones Nokia en 1997, jouable par plus de 400 millions de personnes.",
    funFact: "Le record mondial du Snake Nokia est de 99 999 points ! Le jeu original tournait a 8 images/seconde.",
    salesInfo: 'Pre-installe sur 350+ millions de Nokia',
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
    year: 1989,
    developer: 'Bullet-Proof Software',
    history: "Cree par Alexey Pajitnov en URSS en 1984. La version Game Boy, developpee par Henk Rogers, est devenue le jeu le plus vendu de la console.",
    funFact: "Le nom vient du prefixe grec 'tetra' (quatre) car toutes les pieces ont 4 carres. Pajitnov n'a recu aucun royalty jusqu'en 1996 !",
    salesInfo: '35 millions de copies sur Game Boy',
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
    year: 1996,
    developer: 'Game Freak',
    history: "Satoshi Tajiri a mis 6 ans a developper le jeu, inspire par sa passion pour la collection d'insectes. Nintendo a failli abandonner le projet plusieurs fois.",
    funFact: "Mew a ete ajoute secretement par Shigeki Morimoto juste avant le lancement, dans l'espace libere par la suppression du mode debug !",
    salesInfo: '31.38 millions de copies (Rouge + Bleu)',
  },
];

// Get the snake cartridge (the only compatible one)
export const getSnakeCartridge = () => cartridges.find(c => c.id === 'snake');

// Check if a cartridge is compatible
export const isCartridgeCompatible = (cartridgeId: string) => {
  const cartridge = cartridges.find(c => c.id === cartridgeId);
  return cartridge?.isCompatible ?? false;
};
