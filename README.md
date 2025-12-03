# Nuit de l'Info 2025 - Challenge #483: Hidden Snake Game

> **Defi #483** - *"Cachez au sein de votre site un jeu de snake"*

## Le Concept

Notre solution: une boutique de jeux retro fictive **"RetroCollect"** avec un secret. Parmi les cartouches en vente, une cartouche mysterieuse (#483) revele un jeu Snake cache lorsqu'elle est inseree dans la console GameBoy interactive.

## Comment Trouver le Secret

1. Visitez la section **"Le Coffre-Fort"** (Boutique)
2. Reperer la cartouche mysterieuse **"??? #483"** avec le label "NON DISPONIBLE"
3. **Glissez-deposez** la cartouche vers la console GameBoy
4. Le jeu Snake secret se lance!

## Tech Stack

| Technologie | Version |
|-------------|---------|
| Next.js | 16.0.6 |
| React | 19.2.0 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Framer Motion | 12 |
| shadcn/ui | new-york |

## Installation

```bash
# Cloner le repo
git clone https://github.com/ahmed-abdat/nuit_de_linfo_hidden_snak_gam_challange.git

# Installer les dependances
pnpm install

# Lancer le serveur de developpement
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
src/
├── app/                 # Routes et pages Next.js
├── components/
│   ├── GameBoy.tsx      # Console GameBoy interactive
│   ├── SnakeGame.tsx    # Le jeu Snake cache
│   ├── Cartridge.tsx    # Cartouches draggables
│   └── ui/              # Composants shadcn/ui
├── hooks/               # Hooks React personnalises
└── lib/                 # Utilitaires
```

## Fonctionnalites

- Interface de boutique retro gaming elegante
- Console GameBoy interactive avec ecran fonctionnel
- Systeme drag-and-drop pour inserer les cartouches
- Jeu Snake complet avec:
  - Controles clavier (fleches directionnelles)
  - Systeme de score
  - Sauvegarde du meilleur score (localStorage)
  - Detection de collision
- Animations fluides avec Framer Motion
- Design responsive (mobile-first)

## Nuit de l'Info 2025

Ce projet a ete developpe dans le cadre de la **Nuit de l'Info 2025**, une competition de developpement web qui se deroule sur une nuit entiere.

**Challenge #483**: *"Cachez au sein de votre site un jeu de snake"*

## Licence

MIT
