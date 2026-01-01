import aminata from "./assets/aminata.png";

// Type
export type objet = {
  id: number;
  name: string;
  img: string | null;
  effect: string;
  bonus: number | null;
};

// objets
export const objets: Record<number, objet> = {
  1: {
    id: 1,
    name: "Champignon rouge d'Aminata",
    img: aminata,
    effect: "Restaure 5 points de vie",
    bonus: 5,

  },

  2: {
    id : 2,
    name: "Piège à ours",
    img: null,
    effect: "Immobilise la victime qui marche sur le piège. Les attaques pour le prochain tour font +2 de dégâts",
    bonus: +2,
  },

  3: {
    id: 3,
    name: "Antitoxine",
    img: null,
    effect: "Permet de retirer une condition d’empoisonnement.",
    bonus: null,
  },

};

